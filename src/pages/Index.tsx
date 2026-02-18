import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Typewriter from "typewriter-effect";
import portfolioData from "@/data/portfolio.json";
import { Ghost, Gamepad2, Code, Terminal, Send, Github, Linkedin, Mail, ExternalLink } from "lucide-react";

const PacManGhost = ({ color, className }: { color: string; className?: string }) => (
  <svg
    viewBox="0 0 200 200"
    className={`w-full h-full ${className}`}
    fill={color}
  >
    <path d="M100,20C55.8,20,20,55.8,20,100v80l26.7-26.7L73.3,180L100,153.3L126.7,180l26.7-26.7L180,180V100 C180,55.8,144.2,20,100,20z M70,80c-8.3,0-15-6.7-15-15s6.7-15,15-15s15,6.7,15,15S78.3,80,70,80z M130,80c-8.3,0-15-6.7-15-15 s6.7-15,15-15s15,6.7,15,15S138.3,80,130,80z" />
  </svg>
);

const PacMan = ({ className, rotation = 0 }: { className?: string; rotation?: number }) => (
  <svg viewBox="0 0 100 100" className={className} style={{ transform: `rotate(${rotation}deg)` }}>
    <circle cx="50" cy="50" r="50" fill="#ffd166" />
    <polygon points="50,50 100,20 100,80" fill="#140a1f">
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 50 50"
        to="30 50 50"
        dur="0.2s"
        repeatCount="indefinite"
        values="0 50 50; 30 50 50; 0 50 50; -30 50 50; 0 50 50"
        keyTimes="0; 0.25; 0.5; 0.75; 1"
      />
    </polygon>
  </svg>
);

const SectionDivider = () => (
  <div className="flex justify-center items-center gap-4 py-12 overflow-hidden">
    {[...Array(20)].map((_, i) => (
      <div key={i} className="w-3 h-3 bg-accent rounded-sm animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
    ))}
  </div>
);

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll("section").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-body bg-maze relative selection:bg-accent selection:text-accent-foreground overflow-x-hidden">

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b-4 border-primary">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#home" className="text-xl font-heading font-bold text-accent tracking-widest hover:scale-105 ">
            &lt;{portfolioData.navigation.brand} /&gt;
          </a>
          
          <div className="hidden md:flex gap-8 items-center">
            {portfolioData.navigation.links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`font-heading text-sm uppercase tracking-wider transition-colors hover:text-primary ${
                  activeSection === link.href.substring(1) ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <div className="md:hidden">
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col items-center justify-center pt-20 relative overflow-hidden arcade-dots-bg">

        {/* Game UI - Top Bar */}
        <div className="absolute top-24 left-0 w-full px-6 flex justify-between font-heading text-xl text-white z-20 pointer-events-none">
            <div className="flex flex-col animate-pulse">
                <span className="text-red-500">1UP</span>
                <span>00</span>
            </div>
            <div className="flex flex-col text-center">
                 <span className="text-accent">HIGH SCORE</span>
                 <span>5000</span>
            </div>
             <div className="flex flex-col text-right animate-pulse delay-150">
                <span className="text-red-500">2UP</span>
                <span>00</span>
            </div>
        </div>

        {/* Multi-Directional Background Animations */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Left to Right (Initial) */}
            <div className="animate-slide-in-right opacity-90 absolute top-[30%] flex items-center w-full" style={{ animationDuration: '20s', animationDelay: '0s' }}>
                <PacMan className="w-10 h-10 lg:w-12 lg:h-12 text-accent drop-shadow-[0_0_5px_rgba(255,209,102,0.8)]" />
                <div className="w-16 lg:w-20"></div>
                <Ghost className="w-10 h-10 lg:w-12 lg:h-12 text-red-600 animate-bounce drop-shadow-[0_0_5px_rgba(220,38,38,0.8)]" style={{ animationDuration: '0.4s' }} />
                <div className="w-2"></div>
                <Ghost className="w-10 h-10 lg:w-12 lg:h-12 text-pink-500 animate-bounce drop-shadow-[0_0_5px_rgba(236,72,153,0.8)] delay-75" style={{ animationDuration: '0.45s' }} />
            </div>

            {/* Right to Left (Wait 5s) */}
            <div className="animate-slide-in-left opacity-90 absolute top-[70%] flex items-center w-full" style={{ animationDuration: '25s', animationDelay: '5s' }}>
                <PacMan className="w-10 h-10 lg:w-12 lg:h-12 text-accent drop-shadow-[0_0_5px_rgba(255,209,102,0.8)]" rotation={180} />
                <div className="w-16 lg:w-20"></div>
                <Ghost className="w-10 h-10 lg:w-12 lg:h-12 text-cyan-400 animate-bounce drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]" style={{ animationDuration: '0.5s' }} />
                <div className="w-2"></div>
                <Ghost className="w-10 h-10 lg:w-12 lg:h-12 text-orange-500 animate-bounce drop-shadow-[0_0_5px_rgba(249,115,22,0.8)] delay-150" style={{ animationDuration: '0.55s' }} />
            </div>

            {/* Top to Bottom (Wait 10s) */}
            <div className="animate-slide-in-top opacity-90 absolute left-[20%] flex flex-col items-center h-full" style={{ animationDuration: '30s', animationDelay: '10s' }}>
                <PacMan className="w-10 h-10 lg:w-12 lg:h-12 text-accent drop-shadow-[0_0_5px_rgba(255,209,102,0.8)]" rotation={90} />
                <div className="h-16 lg:h-20"></div>
                <Ghost className="w-10 h-10 lg:w-12 lg:h-12 text-red-600 animate-bounce drop-shadow-[0_0_5px_rgba(220,38,38,0.8)]" />
            </div>

            {/* Bottom to Top (Wait 15s) */}
            <div className="animate-slide-in-bottom opacity-90 absolute right-[20%] flex flex-col items-center h-full" style={{ animationDuration: '35s', animationDelay: '15s' }}>
                <PacMan className="w-10 h-10 lg:w-12 lg:h-12 text-accent drop-shadow-[0_0_5px_rgba(255,209,102,0.8)]" rotation={270} />
                <div className="h-16 lg:h-20"></div>
                <Ghost className="w-10 h-10 lg:w-12 lg:h-12 text-pink-500 animate-bounce drop-shadow-[0_0_5px_rgba(236,72,153,0.8)]" />
            </div>
        </div>

        {/* Text Content - Positioned like a Score Box or Dialog */}
        <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center mt-20">

          <div className="flex flex-col items-center gap-6">
            <div className="mb-2 inline-block animate-bounce">
                <span className="bg-accent text-accent-foreground px-4 py-2 rounded-sm font-heading font-bold text-sm tracking-widest uppercase shadow-[0_0_15px_rgba(255,209,102,0.6)]">
                Portfolio
                </span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground tracking-tight">
                <span className="retro-text-pop text-xl md:text-2xl uppercase tracking-widest text-white"> </span>
                <span className="retro-name drop-shadow-md">{portfolioData.about.name}</span>
            </h1>

            <div className="text-xl md:text-3xl font-mono retro-typewriter h-[60px] min-w-[300px] flex items-center justify-center">
                <Typewriter
                options={{
                    strings: portfolioData.hero.typingLines.map(l => l.text),
                    autoStart: true,
                    loop: true,
                    delay: 50,
                    deleteSpeed: 30,
                    cursor: '█'
                }}
                />
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full mt-4">
                <Button size="lg" className="retro-btn-primary font-heading font-bold text-lg px-8 py-6 rounded-sm uppercase tracking-wider w-full sm:w-auto" asChild>
                <a href="#projects">
                    View Projects
                </a>
                </Button>
                <Button variant="outline" size="lg" className="retro-btn-outline font-heading font-bold text-lg px-8 py-6 rounded-sm uppercase tracking-wider w-full sm:w-auto bg-transparent" asChild>
                <a href="#contact">
                    Contact Me
                </a>
                </Button>
            </div>
          </div>

        </div>
      </section>

      <SectionDivider />

      {/* About Section */}
      <section id="about" className="py-20 relative bg-maze">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
               <div className="bg-card text-card-foreground p-8 rounded-none shadow-none retro-pixel-border border-primary relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-2 bg-primary/20"></div>
                  <div className="flex items-center gap-3 mb-6 border-b-2 border-primary/20 pb-4">
                    <div className="w-4 h-4 rounded-none bg-red-500" />
                    <div className="w-4 h-4 rounded-none bg-yellow-500" />
                    <div className="w-4 h-4 rounded-none bg-green-500" />
                    <h2 className="ml-auto font-heading font-bold text-xl uppercase text-primary tracking-widest">About Me</h2>
                  </div>

                  <p className="text-lg mb-6 leading-relaxed font-medium">
                    {portfolioData.about.description1}
                  </p>
                  <p className="text-lg mb-8 leading-relaxed font-medium opacity-90">
                    {portfolioData.about.description2}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    {portfolioData.about.details.map((detail, idx) => (
                      <div key={idx} className="bg-background/10 p-4 rounded-none backdrop-blur-sm">
                        <span className="block text-primary font-mono text-sm uppercase mb-1">{detail.label}</span>
                        <span className="font-heading font-bold text-lg">{detail.value}</span>
                      </div>
                    ))}
                  </div>

                  <PacManGhost color="#3a1f5c" className="absolute -bottom-10 -right-10 w-40 h-40 opacity-10" />
               </div>
            </div>

            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-8 text-accent">
                About Me
              </h2>
              <div className="space-y-6">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Passionate about creating intuitive and dynamic user experiences.
                  Just like Pac-Man clearing the maze, I love solving complex problems
                  and optimizing performance.
                </p>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <div className="px-6 py-3 rounded-none bg-secondary text-secondary-foreground font-heading font-bold border-2 border-secondary-foreground/20 flex items-center gap-2">
                    <Code size={20} /> Clean Code
                  </div>
                  <div className="px-6 py-3 rounded-none bg-secondary text-secondary-foreground font-heading font-bold border-2 border-secondary-foreground/20 flex items-center gap-2">
                    <Terminal size={20} /> Performance
                  </div>
                  <div className="px-6 py-3 rounded-none bg-secondary text-secondary-foreground font-heading font-bold border-2 border-secondary-foreground/20 flex items-center gap-2">
                    <Gamepad2 size={20} /> UX Design
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-maze">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-accent mb-4">Skills</h2>
            <p className="text-xl text-muted-foreground font-mono">My Tech Stack</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.skills.categories.map((category, idx) => (
              <Card key={idx} className="bg-secondary border-none p-6 rounded-none relative overflow-hidden group retro-pixel-border">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Gamepad2 size={60} className="text-primary" />
                </div>

                <h3 className="text-xl font-heading font-bold text-primary mb-2 relative z-10">{category.title}</h3>
                <p className="text-muted-foreground mb-6 relative z-10 text-sm">{category.description}</p>

                <div className="grid grid-cols-2 gap-4 relative z-10">
                  {category.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-background/30 p-3 rounded-none hover:bg-primary/20 transition-colors">
                      <img src={item.icon} alt={item.name} className="w-6 h-6" />
                      <span className="font-heading font-semibold text-sm text-foreground">{item.name}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-maze">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-accent mb-4">Projects</h2>
            <p className="text-xl text-muted-foreground font-mono">What I've Built</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {portfolioData.projects.items.map((project, idx) => (
              <Card key={idx} className="bg-card text-card-foreground p-8 rounded-none shadow-none flex flex-col h-full retro-pixel-border border-muted">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-3xl font-heading font-bold text-primary-foreground">{project.title}</h3>
                </div>

                <p className="text-lg font-medium opacity-80 mb-8 flex-grow leading-relaxed">
                  {project.description}
                </p>

                <div className="space-y-6 mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-3 py-1 bg-white/20 rounded-none text-sm font-bold font-mono text-primary-foreground">
                        #{tag.name}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-primary-foreground/10">
                    {project.buttons.map((btn, bIdx) => (
                      <Button
                        key={bIdx}
                        asChild
                        variant={btn.variant === "outline" ? "outline" : "default"}
                        className={`font-heading font-bold rounded-none w-full transition-none active:translate-y-1 ${
                          btn.variant === "outline"
                            ? "bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-card"
                            : "bg-primary-foreground text-card hover:bg-primary-foreground/90 border-b-4 border-r-4 border-black/30 active:border-none"
                        }`}
                      >
                        <a href={btn.link} target="_blank" rel="noopener noreferrer">
                          {btn.text}
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Contact Section */}
      <section id="contact" className="py-20 mb-20 bg-maze">
        <div className="container mx-auto px-6 max-w-4xl text-center">
           <div className="bg-secondary retro-pixel-border border-accent p-12 rounded-none relative overflow-hidden">
              <div className="absolute inset-0 bg-maze opacity-10"></div>

              <h2 className="text-3xl md:text-5xl font-heading font-bold text-accent mb-8 relative z-10">
                Let's Connect
              </h2>
              <p className="text-xl text-foreground mb-12 font-medium relative z-10">
                Don't let the game end here. <br/> I'm available for new opportunities
              </p>

              <div className="flex flex-wrap justify-center gap-6 relative z-10">
                <Button size="lg" className="bg-primary hover:bg-accent text-primary-foreground font-heading font-bold text-xl px-10 py-8 rounded-none shadow-none border-b-4 border-r-4 border-black transition-transform active:scale-95 active:border-none" asChild>
                  <a href={portfolioData.contact.ctaLink}>
                    <Mail className="mr-3" /> Contact Me
                  </a>
                </Button>

                <div className="flex gap-4">
                  {portfolioData.contact.info.details.filter(d => d.href.includes('github') || d.href.includes('linkedin')).map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-16 h-16 bg-muted flex items-center justify-center rounded-none border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-none hover:rotate-0"
                    >
                      {social.href.includes('github') ? <Github size={32} /> : <Linkedin size={32} />}
                    </a>
                  ))}
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-8 text-center relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <p className="font-mono text-muted-foreground">
             © {new Date().getFullYear()} {portfolioData.about.name} • Thanks for visiting
          </p>
        </div>
        <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-50"></div>
      </footer>
    </div>
  );
};

export default Index;
