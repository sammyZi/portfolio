import { useEffect, useRef, useCallback } from "react";

// ─── Maze layout ───
// 0 = wall, 1 = dot path, 2 = power pellet, 3 = empty path, 4 = ghost house
const MAZE: number[][] = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
  [0,2,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,2,0],
  [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0],
  [0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0],
  [0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0],
  [0,0,0,0,0,0,1,0,0,0,0,0,3,0,0,3,0,0,0,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,0,0,0,3,0,0,3,0,0,0,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,3,3,3,3,3,3,3,3,3,3,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,3,0,0,0,4,4,0,0,0,3,0,0,1,0,0,0,0,0,0],
  [3,3,3,3,3,3,1,3,3,3,0,4,4,4,4,4,4,0,3,3,3,1,3,3,3,3,3,3],
  [0,0,0,0,0,0,1,0,0,3,0,4,4,4,4,4,4,0,3,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,3,0,0,0,0,0,0,0,0,3,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,3,3,3,3,3,3,3,3,3,3,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,3,0,0,0,0,0,0,0,0,3,0,0,1,0,0,0,0,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
  [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
  [0,2,1,1,0,0,1,1,1,1,1,1,1,3,3,1,1,1,1,1,1,1,0,0,1,1,2,0],
  [0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0],
  [0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0],
  [0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0],
  [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],
  [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

const COLS = MAZE[0].length; // 28
const ROWS = MAZE.length;    // 29

type Direction = "left" | "right" | "up" | "down";

interface Entity {
  x: number; // grid x (column)
  y: number; // grid y (row)
  px: number; // pixel x (for smooth interpolation)
  py: number; // pixel y
  dir: Direction;
  nextDir: Direction;
  speed: number;
}

interface Ghost extends Entity {
  color: string;
  scatterTarget: { x: number; y: number };
  mode: "chase" | "scatter" | "frightened" | "eaten";
  frightenedTimer: number;
  personality: "blinky" | "pinky" | "inky" | "clyde";
}

const DIR_VECTORS: Record<Direction, { dx: number; dy: number }> = {
  left:  { dx: -1, dy: 0 },
  right: { dx: 1,  dy: 0 },
  up:    { dx: 0,  dy: -1 },
  down:  { dx: 0,  dy: 1 },
};

const OPPOSITE: Record<Direction, Direction> = {
  left: "right",
  right: "left",
  up: "down",
  down: "up",
};

function isWalkable(maze: number[][], col: number, row: number): boolean {
  // Wrap horizontally (tunnel)
  const c = ((col % COLS) + COLS) % COLS;
  if (row < 0 || row >= ROWS) return false;
  return maze[row][c] !== 0;
}

function distance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function getAvailableDirections(maze: number[][], x: number, y: number, currentDir: Direction): Direction[] {
  const dirs: Direction[] = ["up", "down", "left", "right"];
  return dirs.filter((d) => {
    // Ghosts should not reverse direction (except when mode changes)
    if (d === OPPOSITE[currentDir]) return false;
    const v = DIR_VECTORS[d];
    return isWalkable(maze, x + v.dx, y + v.dy);
  });
}

function chooseGhostDirection(
  ghost: Ghost,
  targetX: number,
  targetY: number,
  maze: number[][]
): Direction {
  const available = getAvailableDirections(maze, ghost.x, ghost.y, ghost.dir);
  if (available.length === 0) {
    // Reverse if stuck
    return OPPOSITE[ghost.dir];
  }
  if (ghost.mode === "frightened") {
    // Random direction when frightened
    return available[Math.floor(Math.random() * available.length)];
  }

  // Choose direction that minimises distance to target
  let bestDir = available[0];
  let bestDist = Infinity;
  for (const d of available) {
    const v = DIR_VECTORS[d];
    const nx = ghost.x + v.dx;
    const ny = ghost.y + v.dy;
    const dist = distance(nx, ny, targetX, targetY);
    if (dist < bestDist) {
      bestDist = dist;
      bestDir = d;
    }
  }
  return bestDir;
}

// ─── Component ───
const PacManGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const stateRef = useRef<{
    maze: number[][];
    pacman: Entity;
    ghosts: Ghost[];
    score: number;
    cellSize: number;
    mouthAngle: number;
    mouthDir: number;
    modeTimer: number;
    modeIndex: number;
    globalMode: "chase" | "scatter";
    dotsRemaining: number;
    totalDots: number;
    frightenedActive: boolean;
  } | null>(null);

  const init = useCallback(() => {
    // Deep copy maze
    const maze = MAZE.map((row) => [...row]);

    let totalDots = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (maze[r][c] === 1 || maze[r][c] === 2) totalDots++;
      }
    }

    const pacman: Entity = {
      x: 14, y: 21, px: 14, py: 21,
      dir: "left", nextDir: "left", speed: 0.08,
    };

    const ghosts: Ghost[] = [
      {
        x: 14, y: 11, px: 14, py: 11,
        dir: "left", nextDir: "left", speed: 0.065,
        color: "#ff0000", // Blinky (red) - directly chases Pac-Man
        scatterTarget: { x: COLS - 3, y: 0 },
        mode: "scatter", frightenedTimer: 0, personality: "blinky",
      },
      {
        x: 14, y: 13, px: 14, py: 13,
        dir: "up", nextDir: "up", speed: 0.06,
        color: "#ffb8ff", // Pinky (pink) - targets 4 tiles ahead of Pac-Man
        scatterTarget: { x: 2, y: 0 },
        mode: "scatter", frightenedTimer: 0, personality: "pinky",
      },
      {
        x: 12, y: 13, px: 12, py: 13,
        dir: "up", nextDir: "up", speed: 0.055,
        color: "#00ffff", // Inky (cyan) - uses Blinky + Pac-Man to target
        scatterTarget: { x: COLS - 1, y: ROWS - 1 },
        mode: "scatter", frightenedTimer: 0, personality: "inky",
      },
      {
        x: 16, y: 13, px: 16, py: 13,
        dir: "up", nextDir: "up", speed: 0.05,
        color: "#ffb852", // Clyde (orange) - chases until close, then scatters
        scatterTarget: { x: 0, y: ROWS - 1 },
        mode: "scatter", frightenedTimer: 0, personality: "clyde",
      },
    ];

    // Mode cycle: scatter 7s, chase 20s, scatter 7s, chase 20s, scatter 5s, chase 20s, scatter 5s, chase ∞
    stateRef.current = {
      maze,
      pacman,
      ghosts,
      score: 0,
      cellSize: 0,
      mouthAngle: 0,
      mouthDir: 1,
      modeTimer: 0,
      modeIndex: 0,
      globalMode: "scatter",
      dotsRemaining: totalDots,
      totalDots,
      frightenedActive: false,
    };
  }, []);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !stateRef.current) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    stateRef.current.cellSize = Math.min(w / COLS, h / ROWS);
  }, []);

  useEffect(() => {
    init();
    resize();
    window.addEventListener("resize", resize);

    const modeDurations = [420, 1200, 420, 1200, 300, 1200, 300]; // in frames (~60fps)
    const modeSequence: ("scatter" | "chase")[] = [
      "scatter", "chase", "scatter", "chase", "scatter", "chase", "scatter",
    ];

    let lastTime = performance.now();

    const update = () => {
      const s = stateRef.current;
      if (!s) return;

      const now = performance.now();
      const dt = Math.min(now - lastTime, 50); // cap delta to avoid jumps
      lastTime = now;
      const frameFactor = dt / 16.67; // normalise to ~60fps

      // ── Mode timer ──
      if (!s.frightenedActive) {
        s.modeTimer += frameFactor;
        if (s.modeIndex < modeDurations.length && s.modeTimer >= modeDurations[s.modeIndex]) {
          s.modeTimer = 0;
          s.modeIndex++;
          s.globalMode = s.modeIndex < modeSequence.length ? modeSequence[s.modeIndex] : "chase";
          // Reverse ghost directions on mode change
          for (const g of s.ghosts) {
            if (g.mode !== "frightened" && g.mode !== "eaten") {
              g.mode = s.globalMode;
              g.dir = OPPOSITE[g.dir];
            }
          }
        }
      }

      // ── Mouth animation ──
      s.mouthAngle += 0.06 * s.mouthDir * frameFactor;
      if (s.mouthAngle > 0.8) { s.mouthAngle = 0.8; s.mouthDir = -1; }
      if (s.mouthAngle < 0.02) { s.mouthAngle = 0.02; s.mouthDir = 1; }

      // ── Move Pac-Man ──
      const pm = s.pacman;
      const moveEntity = (e: Entity) => {
        const v = DIR_VECTORS[e.dir];
        let nx = e.px + v.dx * e.speed * frameFactor;
        let ny = e.py + v.dy * e.speed * frameFactor;

        // Snap at grid centres and decide next direction
        const arrivedX = (v.dx > 0 && nx >= e.x + 1) || (v.dx < 0 && nx <= e.x - 1) || v.dx === 0;
        const arrivedY = (v.dy > 0 && ny >= e.y + 1) || (v.dy < 0 && ny <= e.y - 1) || v.dy === 0;

        if (arrivedX && arrivedY) {
          // Move to next cell
          e.x += v.dx;
          e.y += v.dy;
          // Tunnel wrap
          e.x = ((e.x % COLS) + COLS) % COLS;
          nx = e.x;
          ny = e.y;
          e.px = nx;
          e.py = ny;
          return true; // arrived at new cell
        }
        e.px = nx;
        e.py = ny;
        return false;
      };

      const arrivedPac = moveEntity(pm);
      if (arrivedPac) {
        // Eat dots
        const cell = s.maze[pm.y]?.[pm.x];
        if (cell === 1) {
          s.maze[pm.y][pm.x] = 3;
          s.score += 10;
          s.dotsRemaining--;
        } else if (cell === 2) {
          s.maze[pm.y][pm.x] = 3;
          s.score += 50;
          s.dotsRemaining--;
          // Frighten ghosts
          s.frightenedActive = true;
          for (const g of s.ghosts) {
            if (g.mode !== "eaten") {
              g.mode = "frightened";
              g.frightenedTimer = 600; // ~10 seconds
              g.dir = OPPOSITE[g.dir];
            }
          }
        }

        // Reset maze if all dots eaten
        if (s.dotsRemaining <= 0) {
          const newMaze = MAZE.map((row) => [...row]);
          s.maze = newMaze;
          let totalDots = 0;
          for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
              if (newMaze[r][c] === 1 || newMaze[r][c] === 2) totalDots++;
            }
          }
          s.dotsRemaining = totalDots;
        }

        // ── Pac-Man AI: choose direction at intersection ──
        // Simple AI: avoid walls, prefer continuing, occasionally turn
        const dirs: Direction[] = ["up", "down", "left", "right"];
        const walkable = dirs.filter((d) => {
          const dv = DIR_VECTORS[d];
          return isWalkable(s.maze, pm.x + dv.dx, pm.y + dv.dy);
        });

        if (walkable.length > 0) {
          // Try to continue straight
          const canContinue = walkable.includes(pm.dir);
          // At intersections (3+ options), sometimes turn toward dots
          if (walkable.length >= 3 && Math.random() < 0.4) {
            // Find direction with most dots nearby
            let bestDir = pm.dir;
            let bestScore = -1;
            for (const d of walkable) {
              const dv = DIR_VECTORS[d];
              let dotScore = 0;
              for (let step = 1; step <= 5; step++) {
                const cx = pm.x + dv.dx * step;
                const cy = pm.y + dv.dy * step;
                if (cy >= 0 && cy < ROWS && cx >= 0 && cx < COLS) {
                  const c = s.maze[cy][cx];
                  if (c === 1) dotScore += 3;
                  else if (c === 2) dotScore += 10;
                }
              }
              if (dotScore > bestScore) {
                bestScore = dotScore;
                bestDir = d;
              }
            }
            pm.dir = bestDir;
          } else if (canContinue) {
            // Keep going
          } else {
            // Must turn
            const validTurns = walkable.filter((d) => d !== OPPOSITE[pm.dir]);
            pm.dir = validTurns.length > 0
              ? validTurns[Math.floor(Math.random() * validTurns.length)]
              : walkable[Math.floor(Math.random() * walkable.length)];
          }

          // Verify chosen direction is walkable
          const fv = DIR_VECTORS[pm.dir];
          if (!isWalkable(s.maze, pm.x + fv.dx, pm.y + fv.dy)) {
            const fallback = walkable.filter((d) => d !== OPPOSITE[pm.dir]);
            pm.dir = fallback.length > 0
              ? fallback[Math.floor(Math.random() * fallback.length)]
              : walkable[0];
          }
        }
      }

      // ── Move Ghosts ──
      for (const g of s.ghosts) {
        // Frightened timer
        if (g.mode === "frightened") {
          g.frightenedTimer -= frameFactor;
          if (g.frightenedTimer <= 0) {
            g.mode = s.globalMode;
            g.frightenedTimer = 0;
          }
        }

        const arrivedGhost = moveEntity(g);
        if (arrivedGhost) {
          // Ghost AI: decide direction at intersection
          let targetX: number, targetY: number;

          if (g.mode === "scatter") {
            targetX = g.scatterTarget.x;
            targetY = g.scatterTarget.y;
          } else if (g.mode === "eaten") {
            // Head back to ghost house
            targetX = 14;
            targetY = 13;
            if (g.x === 14 && g.y === 13) {
              g.mode = s.globalMode;
            }
          } else if (g.mode === "chase") {
            // Each ghost has unique targeting
            switch (g.personality) {
              case "blinky":
                // Directly target Pac-Man
                targetX = pm.x;
                targetY = pm.y;
                break;
              case "pinky": {
                // Target 4 tiles ahead of Pac-Man
                const pv = DIR_VECTORS[pm.dir];
                targetX = pm.x + pv.dx * 4;
                targetY = pm.y + pv.dy * 4;
                break;
              }
              case "inky": {
                // Complex: mirror Blinky's position around 2 tiles ahead of Pac-Man
                const blinky = s.ghosts[0];
                const pv2 = DIR_VECTORS[pm.dir];
                const ahead2X = pm.x + pv2.dx * 2;
                const ahead2Y = pm.y + pv2.dy * 2;
                targetX = ahead2X + (ahead2X - blinky.x);
                targetY = ahead2Y + (ahead2Y - blinky.y);
                break;
              }
              case "clyde": {
                // Chase Pac-Man if far, scatter if within 8 tiles
                const dist = distance(g.x, g.y, pm.x, pm.y);
                if (dist > 8) {
                  targetX = pm.x;
                  targetY = pm.y;
                } else {
                  targetX = g.scatterTarget.x;
                  targetY = g.scatterTarget.y;
                }
                break;
              }
              default:
                targetX = pm.x;
                targetY = pm.y;
            }
          } else {
            // frightened - random (handled in chooseGhostDirection)
            targetX = 0;
            targetY = 0;
          }

          const newDir = chooseGhostDirection(g, targetX, targetY, s.maze);
          // Verify direction is walkable
          const nv = DIR_VECTORS[newDir];
          if (isWalkable(s.maze, g.x + nv.dx, g.y + nv.dy)) {
            g.dir = newDir;
          } else {
            // Fallback: any walkable direction
            const all: Direction[] = ["up", "down", "left", "right"];
            const fallback = all.filter((d) => {
              const v = DIR_VECTORS[d];
              return isWalkable(s.maze, g.x + v.dx, g.y + v.dy);
            });
            if (fallback.length > 0) {
              g.dir = fallback[Math.floor(Math.random() * fallback.length)];
            }
          }
        }

        // ── Pac-Man / Ghost collision ──
        const collDist = distance(pm.px, pm.py, g.px, g.py);
        if (collDist < 0.8) {
          if (g.mode === "frightened") {
            // Eat ghost
            g.mode = "eaten";
            g.speed = 0.15; // faster when returning home
            s.score += 200;
          } else if (g.mode !== "eaten") {
            // Pac-Man dies → reset positions
            pm.x = 14; pm.y = 21; pm.px = 14; pm.py = 21; pm.dir = "left";
            s.ghosts[0].x = 14; s.ghosts[0].y = 11; s.ghosts[0].px = 14; s.ghosts[0].py = 11;
            s.ghosts[1].x = 14; s.ghosts[1].y = 13; s.ghosts[1].px = 14; s.ghosts[1].py = 13;
            s.ghosts[2].x = 12; s.ghosts[2].y = 13; s.ghosts[2].px = 12; s.ghosts[2].py = 13;
            s.ghosts[3].x = 16; s.ghosts[3].y = 13; s.ghosts[3].px = 16; s.ghosts[3].py = 13;
            for (const gg of s.ghosts) {
              gg.mode = "scatter";
              gg.speed = gg.personality === "blinky" ? 0.065 : gg.personality === "pinky" ? 0.06 : gg.personality === "inky" ? 0.055 : 0.05;
            }
          }
        }

        // Reset speed for eaten ghosts that arrived home
        if (g.mode !== "eaten" && g.mode !== "frightened") {
          g.speed = g.personality === "blinky" ? 0.065 : g.personality === "pinky" ? 0.06 : g.personality === "inky" ? 0.055 : 0.05;
        }
      }

      // Check if frightened mode is still active
      s.frightenedActive = s.ghosts.some((g) => g.mode === "frightened");
    };

    const draw = () => {
      const canvas = canvasRef.current;
      const s = stateRef.current;
      if (!canvas || !s) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cs = s.cellSize;
      const offsetX = (w - COLS * cs) / 2;
      const offsetY = (h - ROWS * cs) / 2;

      ctx.clearRect(0, 0, w, h);

      // ── Draw maze ──
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const cell = s.maze[r][c];
          const x = offsetX + c * cs;
          const y = offsetY + r * cs;

          if (cell === 0) {
            // Wall
            ctx.fillStyle = "#1919a6";
            ctx.fillRect(x, y, cs, cs);
            // Rounded inner wall effect
            ctx.fillStyle = "#0d0d6b";
            const inset = cs * 0.15;
            ctx.fillRect(x + inset, y + inset, cs - inset * 2, cs - inset * 2);
          } else if (cell === 1) {
            // Dot
            ctx.fillStyle = "#ffb8ae";
            ctx.beginPath();
            ctx.arc(x + cs / 2, y + cs / 2, cs * 0.1, 0, Math.PI * 2);
            ctx.fill();
          } else if (cell === 2) {
            // Power pellet (pulsing)
            const pulse = 0.7 + Math.sin(Date.now() / 200) * 0.3;
            ctx.fillStyle = `rgba(255, 184, 174, ${pulse})`;
            ctx.beginPath();
            ctx.arc(x + cs / 2, y + cs / 2, cs * 0.25, 0, Math.PI * 2);
            ctx.fill();
          }
          // cell === 3 or 4: empty, draw nothing
        }
      }

      // ── Draw Pac-Man ──
      const pmX = offsetX + s.pacman.px * cs + cs / 2;
      const pmY = offsetY + s.pacman.py * cs + cs / 2;
      const pmRadius = cs * 0.45;

      let rotation = 0;
      switch (s.pacman.dir) {
        case "right": rotation = 0; break;
        case "down": rotation = Math.PI / 2; break;
        case "left": rotation = Math.PI; break;
        case "up": rotation = -Math.PI / 2; break;
      }

      ctx.save();
      ctx.translate(pmX, pmY);
      ctx.rotate(rotation);
      ctx.fillStyle = "#ffd166";
      ctx.beginPath();
      ctx.arc(0, 0, pmRadius, s.mouthAngle, Math.PI * 2 - s.mouthAngle);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fill();
      // Eye
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.arc(pmRadius * 0.25, -pmRadius * 0.4, pmRadius * 0.12, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // ── Draw Ghosts ──
      for (const g of s.ghosts) {
        const gx = offsetX + g.px * cs + cs / 2;
        const gy = offsetY + g.py * cs + cs / 2;
        const gr = cs * 0.45;

        ctx.save();
        ctx.translate(gx, gy);

        if (g.mode === "eaten") {
          // Just eyes
          drawGhostEyes(ctx, gr, g.dir);
        } else {
          const isFrightened = g.mode === "frightened";
          const isFlashing = isFrightened && g.frightenedTimer < 120;

          // Body
          ctx.fillStyle = isFrightened
            ? (isFlashing && Math.floor(Date.now() / 150) % 2 === 0 ? "#ffffff" : "#2121de")
            : g.color;

          // Ghost body shape
          ctx.beginPath();
          ctx.arc(0, -gr * 0.1, gr, Math.PI, 0, false);
          ctx.lineTo(gr, gr * 0.6);
          // Wavy bottom
          const segments = 3;
          const segW = (gr * 2) / segments;
          for (let i = 0; i < segments; i++) {
            const sx = gr - i * segW;
            const wave = Math.sin(Date.now() / 150 + i * 2) * gr * 0.15;
            ctx.quadraticCurveTo(
              sx - segW * 0.5, gr * 0.6 + gr * 0.3 + wave,
              sx - segW, gr * 0.6
            );
          }
          ctx.closePath();
          ctx.fill();

          if (isFrightened) {
            // Frightened face
            ctx.fillStyle = isFlashing ? "#ff0000" : "#ffffff";
            // Eyes
            ctx.beginPath();
            ctx.arc(-gr * 0.3, -gr * 0.2, gr * 0.12, 0, Math.PI * 2);
            ctx.arc(gr * 0.3, -gr * 0.2, gr * 0.12, 0, Math.PI * 2);
            ctx.fill();
            // Squiggly mouth
            ctx.strokeStyle = isFlashing ? "#ff0000" : "#ffffff";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(-gr * 0.4, gr * 0.15);
            for (let i = 0; i < 5; i++) {
              ctx.lineTo(-gr * 0.4 + (i + 0.5) * (gr * 0.8 / 5), gr * 0.15 + (i % 2 === 0 ? gr * 0.1 : -gr * 0.1));
            }
            ctx.stroke();
          } else {
            // Normal eyes
            drawGhostEyes(ctx, gr, g.dir);
          }
        }

        ctx.restore();
      }

      // ── Score ──
      ctx.fillStyle = "#ffffff";
      ctx.font = `bold ${Math.max(12, cs * 0.8)}px "DotGothic16", "VT323", monospace`;
      ctx.textAlign = "left";
      ctx.fillText(`SCORE`, offsetX, offsetY - cs * 0.8);
      ctx.fillText(`${s.score}`, offsetX, offsetY - cs * 0.1);
      ctx.textAlign = "center";
      const highScore = Math.max(s.score, 5000);
      ctx.fillStyle = "#ff0000";
      ctx.fillText(`HIGH SCORE`, w / 2, offsetY - cs * 0.8);
      ctx.fillStyle = "#ffffff";
      ctx.fillText(`${highScore}`, w / 2, offsetY - cs * 0.1);
    };

    function drawGhostEyes(ctx: CanvasRenderingContext2D, gr: number, dir: Direction) {
      // Eye whites
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.ellipse(-gr * 0.3, -gr * 0.2, gr * 0.2, gr * 0.25, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(gr * 0.3, -gr * 0.2, gr * 0.2, gr * 0.25, 0, 0, Math.PI * 2);
      ctx.fill();

      // Pupils - direction aware
      let pdx = 0, pdy = 0;
      switch (dir) {
        case "left": pdx = -gr * 0.08; break;
        case "right": pdx = gr * 0.08; break;
        case "up": pdy = -gr * 0.08; break;
        case "down": pdy = gr * 0.08; break;
      }
      ctx.fillStyle = "#0000ff";
      ctx.beginPath();
      ctx.arc(-gr * 0.3 + pdx, -gr * 0.2 + pdy, gr * 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(gr * 0.3 + pdx, -gr * 0.2 + pdy, gr * 0.1, 0, Math.PI * 2);
      ctx.fill();
    }

    const loop = () => {
      update();
      draw();
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [init, resize]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-50"
    />
  );
};

export default PacManGame;
