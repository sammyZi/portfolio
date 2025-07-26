import React, { useState, useEffect, useRef } from 'react';

interface TerminalLine {
  type: 'command' | 'output' | 'error';
  content: string;
  timestamp?: string;
}

interface CommandResponse {
  output: string[];
  type: 'success' | 'error';
}

export const Terminal: React.FC = () => {
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: (): CommandResponse => ({
      output: [
        'Available commands:',
        '',
        '  help           - Show this help message',
        '  about          - Learn about me',
        '  skills         - View my technical skills',
        '  projects       - See my projects',
        '  social         - Find me on social platforms',
        '  experience     - View my work experience',
        '  contact        - Get my contact information',
        '  clear          - Clear the terminal',
        '  whoami         - Current user info',
        '  date           - Show current date',
        '  pwd            - Show current directory',
        '',
        'Tip: Use Tab for command suggestions, ↑/↓ for command history'
      ],
      type: 'success'
    }),

    about: (): CommandResponse => ({
      output: [
        '┌─────────────────────────────────────────┐',
        '│              ABOUT ME                   │',
        '└─────────────────────────────────────────┘',
        '',
        'Name: [Your Name]',
        'Role: Full Stack Developer',
        'Location: [Your Location]',
        '',
        'I am a passionate developer who loves creating',
        'innovative solutions and learning new technologies.',
        'My expertise spans across frontend and backend',
        'development with a focus on modern web technologies.',
        '',
        'When I\'m not coding, you can find me exploring',
        'new frameworks, contributing to open source, or',
        'sharing knowledge with the developer community.',
      ],
      type: 'success'
    }),

    skills: (): CommandResponse => ({
      output: [
        '┌─────────────────────────────────────────┐',
        '│           TECHNICAL SKILLS              │',
        '└─────────────────────────────────────────┘',
        '',
        '🚀 Frontend:',
        '   • React, TypeScript, Next.js',
        '   • HTML5, CSS3, Tailwind CSS',
        '   • JavaScript (ES6+), Vue.js',
        '',
        '⚡ Backend:',
        '   • Node.js, Express.js',
        '   • Python, Django, Flask',
        '   • REST APIs, GraphQL',
        '',
        '🗄️ Database:',
        '   • PostgreSQL, MySQL',
        '   • MongoDB, Redis',
        '   • Supabase, Firebase',
        '',
        '🛠️ Tools & Others:',
        '   • Git, Docker, AWS',
        '   • Linux, CI/CD',
        '   • Figma, VS Code',
      ],
      type: 'success'
    }),

    projects: (): CommandResponse => ({
      output: [
        '┌─────────────────────────────────────────┐',
        '│               PROJECTS                  │',
        '└─────────────────────────────────────────┘',
        '',
        '📱 Project 1: E-Commerce Platform',
        '   Tech: React, Node.js, PostgreSQL',
        '   Desc: Full-stack e-commerce solution',
        '   Link: github.com/yourusername/project1',
        '',
        '🌐 Project 2: Portfolio Website',
        '   Tech: Next.js, TypeScript, Tailwind',
        '   Desc: Terminal-themed portfolio site',
        '   Link: github.com/yourusername/portfolio',
        '',
        '🔧 Project 3: Task Management App',
        '   Tech: Vue.js, Express.js, MongoDB',
        '   Desc: Collaborative task management',
        '   Link: github.com/yourusername/taskapp',
        '',
        '💡 Project 4: Weather Dashboard',
        '   Tech: React, Python, Flask',
        '   Desc: Real-time weather monitoring',
        '   Link: github.com/yourusername/weather',
        '',
        'Type "contact" to get in touch about these projects!'
      ],
      type: 'success'
    }),

    social: (): CommandResponse => ({
      output: [
        '┌─────────────────────────────────────────┐',
        '│            SOCIAL LINKS                 │',
        '└─────────────────────────────────────────┘',
        '',
        '🐙 GitHub:    github.com/yourusername',
        '💼 LinkedIn:  linkedin.com/in/yourprofile',
        '🐦 Twitter:   twitter.com/yourusername',
        '📧 Email:     your.email@example.com',
        '🌐 Website:   yourwebsite.com',
        '📝 Blog:      yourblog.com',
        '',
        'Feel free to connect with me on any platform!',
      ],
      type: 'success'
    }),

    experience: (): CommandResponse => ({
      output: [
        '┌─────────────────────────────────────────┐',
        '│           WORK EXPERIENCE               │',
        '└─────────────────────────────────────────┘',
        '',
        '💼 Senior Developer @ Tech Company',
        '   Duration: 2022 - Present',
        '   • Led development of microservices architecture',
        '   • Improved application performance by 40%',
        '   • Mentored junior developers',
        '',
        '💻 Full Stack Developer @ Startup Inc',
        '   Duration: 2020 - 2022',
        '   • Built responsive web applications',
        '   • Implemented CI/CD pipelines',
        '   • Collaborated with cross-functional teams',
        '',
        '🎓 Junior Developer @ First Company',
        '   Duration: 2019 - 2020',
        '   • Developed frontend components',
        '   • Fixed bugs and improved code quality',
        '   • Learned industry best practices',
      ],
      type: 'success'
    }),

    contact: (): CommandResponse => ({
      output: [
        '┌─────────────────────────────────────────┐',
        '│            CONTACT INFO                 │',
        '└─────────────────────────────────────────┘',
        '',
        '📧 Email:     your.email@example.com',
        '📱 Phone:     +1 (555) 123-4567',
        '📍 Location:  Your City, Country',
        '💼 LinkedIn:  linkedin.com/in/yourprofile',
        '',
        '🕒 Available for:',
        '   • Freelance projects',
        '   • Full-time opportunities',
        '   • Consulting work',
        '   • Technical discussions',
        '',
        'Feel free to reach out! I typically respond',
        'within 24 hours.',
      ],
      type: 'success'
    }),

    clear: (): CommandResponse => {
      setHistory([]);
      return { output: [], type: 'success' };
    },

    whoami: (): CommandResponse => ({
      output: ['visitor@portfolio.dev'],
      type: 'success'
    }),

    date: (): CommandResponse => ({
      output: [new Date().toString()],
      type: 'success'
    }),

    pwd: (): CommandResponse => ({
      output: ['/home/visitor/portfolio'],
      type: 'success'
    }),
  };

  const executeCommand = (cmd: string): CommandResponse => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === '') {
      return { output: [], type: 'success' };
    }

    if (commands[trimmedCmd as keyof typeof commands]) {
      return commands[trimmedCmd as keyof typeof commands]();
    }

    return {
      output: [
        `Command not found: ${cmd}`,
        'Type "help" to see available commands.'
      ],
      type: 'error'
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentCommand.trim() === '') return;

    // Add command to history
    const commandLine: TerminalLine = {
      type: 'command',
      content: `visitor@portfolio:~$ ${currentCommand}`,
      timestamp: new Date().toLocaleTimeString()
    };

    setHistory(prev => [...prev, commandLine]);

    // Execute command
    const result = executeCommand(currentCommand);

    // Add output to history
    if (result.output.length > 0) {
      const outputLines: TerminalLine[] = result.output.map(line => ({
        type: result.type === 'error' ? 'error' : 'output',
        content: line
      }));
      setHistory(prev => [...prev, ...outputLines]);
    }

    // Update command history
    setCommandHistory(prev => [currentCommand, ...prev.slice(0, 49)]);
    setCurrentCommand('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[newIndex] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    // Welcome message
    setHistory([
      {
        type: 'output',
        content: '┌─────────────────────────────────────────┐'
      },
      {
        type: 'output',
        content: '│    Welcome to My Portfolio Terminal     │'
      },
      {
        type: 'output',
        content: '└─────────────────────────────────────────┘'
      },
      {
        type: 'output',
        content: ''
      },
      {
        type: 'output',
        content: 'Type "help" to get started.'
      },
      {
        type: 'output',
        content: ''
      }
    ]);
  }, []);

  return (
    <div className="terminal-window w-full h-full">
      <div className="terminal-header">
        <div className="flex gap-2">
          <div className="terminal-button close"></div>
          <div className="terminal-button minimize"></div>
          <div className="terminal-button maximize"></div>
        </div>
        <span className="text-sm text-muted-foreground ml-4">Terminal</span>
      </div>
      <div ref={terminalRef} className="terminal-content p-2 min-h-0 max-h-48 overflow-y-auto text-xs">
        {history.map((line, index) => (
          <div key={index} className="terminal-line">
            <span className={`
              ${line.type === 'command' ? 'terminal-prompt glow-text' : ''}
              ${line.type === 'error' ? 'terminal-error' : ''}
              ${line.type === 'output' ? 'terminal-output' : ''}
            `}>
              {line.content}
            </span>
          </div>
        ))}
        
        <form onSubmit={handleSubmit} className="terminal-line">
          <span className="terminal-prompt glow-text">visitor@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-terminal-command ml-2"
            autoComplete="off"
            spellCheck="false"
          />
          <span className="cursor"></span>
        </form>
      </div>
    </div>
  );
};