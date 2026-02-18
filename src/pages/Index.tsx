import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
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

const PacMan = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
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
    <div className="min-h-screen bg-background text-foreground font-body bg-maze relative selection:bg-accent selection:text-accent-foreground">

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b-4 border-primary">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#home" className="text-xl font-heading font-bold text-accent tracking-widest hover:scale-105 transition-transform">
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
            <ThemeToggle />
          </div>
          
          <div className="md:hidden">
             <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
            {/* Animated background elements could go here */}
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="mb-6 inline-block animate-bounce">
             <span className="bg-accent text-accent-foreground px-4 py-2 rounded-sm font-heading font-bold text-sm tracking-widest uppercase shadow-[0_0_15px_rgba(255,209,102,0.6)]">
               Portfolio
             </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-foreground tracking-tight">
             <span className="text-primary block mb-2">Hello, World!</span>
             I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">{portfolioData.about.name}</span>
          </h1>

          <div className="text-xl md:text-3xl font-mono text-muted-foreground mb-12 h-[60px]">
            <Typewriter
              options={{
                strings: portfolioData.hero.typingLines.map(l => l.text),
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
              }}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground font-heading font-bold text-lg px-8 py-6 rounded-lg shadow-[4px_4px_0px_0px_rgba(255,209,102,1)] hover:shadow-[2px_2px_0px_0px_rgba(255,209,102,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all" asChild>
              <a href="#projects">
                 View Projects
              </a>
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-primary/10 font-heading font-bold text-lg px-8 py-6 rounded-lg" asChild>
              <a href="#contact">
                 Contact Me
              </a>
            </Button>
          </div>

          {/* Pacman Animation */}
          <div className="absolute bottom-10 left-0 w-full overflow-hidden h-20 pointer-events-none">
             <div className="absolute animate-slide-in-right opacity-30 flex items-center gap-10 left-full">
                <PacMan className="w-12 h-12 text-accent" />
                <div className="flex gap-4">
                  <div className="w-3 h-3 bg-accent rounded-sm" />
                  <div className="w-3 h-3 bg-accent rounded-sm" />
                  <div className="w-3 h-3 bg-accent rounded-sm" />
                </div>
                <Ghost className="w-12 h-12 text-red-500 animate-bounce" />
                <Ghost className="w-12 h-12 text-pink-500 animate-bounce delay-100" />
                <Ghost className="w-12 h-12 text-cyan-500 animate-bounce delay-200" />
                <Ghost className="w-12 h-12 text-orange-500 animate-bounce delay-300" />
             </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
               <div className="bg-card text-card-foreground p-8 rounded-xl shadow-[8px_8px_0px_0px_rgba(255,140,66,1)] border-4 border-primary relative overflow-hidden group hover:translate-y-[-5px] transition-transform duration-300">
                  <div className="absolute top-0 left-0 w-full h-2 bg-primary/20"></div>
                  <div className="flex items-center gap-3 mb-6 border-b-2 border-primary/20 pb-4">
                    <div className="w-4 h-4 rounded-sm bg-red-500" />
                    <div className="w-4 h-4 rounded-sm bg-yellow-500" />
                    <div className="w-4 h-4 rounded-sm bg-green-500" />
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
                      <div key={idx} className="bg-background/10 p-4 rounded-xl backdrop-blur-sm">
                        <span className="block text-primary font-mono text-sm uppercase mb-1">{detail.label}</span>
                        <span className="font-heading font-bold text-lg">{detail.value}</span>
                      </div>
                    ))}
                  </div>

                  <PacManGhost color="#3a1f5c" className="absolute -bottom-10 -right-10 w-40 h-40 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-500" />
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
                  <div className="px-6 py-3 rounded-sm bg-secondary text-secondary-foreground font-heading font-bold border-2 border-secondary-foreground/20 flex items-center gap-2">
                    <Code size={20} /> Clean Code
                  </div>
                  <div className="px-6 py-3 rounded-sm bg-secondary text-secondary-foreground font-heading font-bold border-2 border-secondary-foreground/20 flex items-center gap-2">
                    <Terminal size={20} /> Performance
                  </div>
                  <div className="px-6 py-3 rounded-sm bg-secondary text-secondary-foreground font-heading font-bold border-2 border-secondary-foreground/20 flex items-center gap-2">
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
      <section id="skills" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-accent mb-4">Skills</h2>
            <p className="text-xl text-muted-foreground font-mono">My Tech Stack</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.skills.categories.map((category, idx) => (
              <Card key={idx} className="bg-secondary border-none p-6 rounded-xl relative overflow-hidden group hover:shadow-[0_0_30px_rgba(255,140,66,0.3)] transition-all duration-300">
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                  <Gamepad2 size={60} className="text-primary" />
                </div>

                <h3 className="text-xl font-heading font-bold text-primary mb-2 relative z-10">{category.title}</h3>
                <p className="text-muted-foreground mb-6 relative z-10 text-sm">{category.description}</p>

                <div className="grid grid-cols-2 gap-4 relative z-10">
                  {category.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-background/30 p-3 rounded-xl hover:bg-primary/20 transition-colors">
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
      <section id="projects" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-accent mb-4">Projects</h2>
            <p className="text-xl text-muted-foreground font-mono">What I've Built</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {portfolioData.projects.items.map((project, idx) => (
              <Card key={idx} className="bg-card text-card-foreground border-4 border-muted p-8 rounded-xl shadow-lg hover:shadow-[8px_8px_0px_0px_rgba(20,10,31,0.5)] transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-3xl font-heading font-bold text-primary-foreground">{project.title}</h3>
                  <div className="bg-primary-foreground/10 p-2 rounded-lg">
                    <ExternalLink className="text-primary-foreground" size={24} />
                  </div>
                </div>

                <p className="text-lg font-medium opacity-80 mb-8 flex-grow leading-relaxed">
                  {project.description}
                </p>

                <div className="space-y-6 mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-3 py-1 bg-white/20 rounded-sm text-sm font-bold font-mono text-primary-foreground">
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
                        className={`font-heading font-bold rounded-xl ${
                          btn.variant === "outline"
                            ? "bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-card"
                            : "bg-primary-foreground text-card hover:bg-primary-foreground/90"
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
      <section id="contact" className="py-20 mb-20">
        <div className="container mx-auto px-6 max-w-4xl text-center">
           <div className="bg-secondary border-4 border-accent p-12 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-maze opacity-10"></div>

              <h2 className="text-3xl md:text-5xl font-heading font-bold text-accent mb-8 relative z-10">
                Let's Connect
              </h2>
              <p className="text-xl text-foreground mb-12 font-medium relative z-10">
                Don't let the game end here. <br/> I'm available for new opportunities
              </p>

              <div className="flex flex-wrap justify-center gap-6 relative z-10">
                <Button size="lg" className="bg-primary hover:bg-accent text-primary-foreground font-heading font-bold text-xl px-10 py-8 rounded-sm shadow-lg transition-transform hover:scale-105" asChild>
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
                      className="w-16 h-16 bg-muted flex items-center justify-center rounded-sm border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:rotate-12"
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
