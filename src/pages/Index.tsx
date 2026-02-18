import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Typewriter from "typewriter-effect";
import portfolioData from "@/data/portfolio.json";
import { Gamepad2, Code, Terminal, Github, Linkedin, Mail, Menu, X } from "lucide-react";
import PacManGame from "@/components/PacManGame";

const PacManGhost = ({ color, className }: { color: string; className?: string }) => (
  <svg viewBox="0 0 200 200" className={`w-full h-full ${className}`} fill={color}>
    <path d="M100,20C55.8,20,20,55.8,20,100v80l26.7-26.7L73.3,180L100,153.3L126.7,180l26.7-26.7L180,180V100 C180,55.8,144.2,20,100,20z M70,80c-8.3,0-15-6.7-15-15s6.7-15,15-15s15,6.7,15,15S78.3,80,70,80z M130,80c-8.3,0-15-6.7-15-15 s6.7-15,15-15s15,6.7,15,15S138.3,80,130,80z" />
  </svg>
);

const SectionDivider = () => (
  <div className="flex justify-center items-center gap-2 sm:gap-4 py-8 sm:py-12 overflow-hidden px-4">
    {[...Array(12)].map((_, i) => (
      <div key={i} className="w-2 h-2 sm:w-3 sm:h-3 bg-accent rounded-sm animate-pulse flex-shrink-0" style={{ animationDelay: `${i * 0.1}s` }} />
    ))}
  </div>
);

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    document.querySelectorAll("section").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => setMobileMenuOpen(false);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-body bg-maze relative selection:bg-accent selection:text-accent-foreground overflow-x-hidden">

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b-4 border-primary/30">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <a href="#home" className="text-base sm:text-xl font-heading font-bold text-accent tracking-widest hover:scale-105 transition-transform">
            &lt;{portfolioData.navigation.brand} /&gt;
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-6 lg:gap-8 items-center">
            {portfolioData.navigation.links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`font-heading text-sm uppercase tracking-wider transition-colors hover:text-primary ${activeSection === link.href.substring(1) ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
                  }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-accent p-2 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background/98 border-t-2 border-primary/30 px-6 py-4 flex flex-col gap-4">
            {portfolioData.navigation.links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-heading text-base uppercase tracking-wider py-2 border-b border-muted transition-colors hover:text-primary ${activeSection === link.href.substring(1) ? "text-primary" : "text-muted-foreground"
                  }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col items-center justify-center pt-16 relative overflow-hidden">
        <PacManGame />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center flex flex-col items-center mt-8 sm:mt-16">
          <div className="flex flex-col items-center gap-4 sm:gap-6">

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground tracking-tight">
              <span className="retro-name drop-shadow-md">{portfolioData.about.name}</span>
            </h1>

            <div className="text-base sm:text-xl md:text-3xl font-mono retro-typewriter h-[48px] sm:h-[60px] w-full max-w-xs sm:max-w-none flex items-center justify-center">
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

            <p className="text-sm sm:text-base text-muted-foreground max-w-sm sm:max-w-xl leading-relaxed px-2">
              {portfolioData.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center items-center w-full mt-2 sm:mt-4 px-4 sm:px-0">
              <Button size="lg" className="retro-btn-primary font-heading font-bold text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-sm uppercase tracking-wider w-full sm:w-auto" asChild>
                <a href="#projects">View Projects</a>
              </Button>
              <Button variant="outline" size="lg" className="retro-btn-outline font-heading font-bold text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-sm uppercase tracking-wider w-full sm:w-auto bg-transparent" asChild>
                <a href="#contact">Contact Me</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* About Section */}
      <section id="about" className="py-12 sm:py-20 relative bg-maze">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">

            {/* Terminal Card */}
            <div className="w-full lg:w-1/2">
              <div className="bg-card text-card-foreground p-5 sm:p-8 rounded-none shadow-none nes-border-style relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-2 bg-primary/20"></div>
                <div className="flex items-center gap-3 mb-5 sm:mb-6 border-b-2 border-primary/20 pb-4">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-none bg-red-500" />
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-none bg-yellow-500" />
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-none bg-green-500" />
                  <h2 className="ml-auto font-heading font-bold text-base sm:text-xl uppercase text-primary tracking-widest">About Me</h2>
                </div>

                <p className="text-sm sm:text-lg mb-4 sm:mb-6 leading-relaxed font-medium">
                  {portfolioData.about.description1}
                </p>
                <p className="text-sm sm:text-lg mb-6 sm:mb-8 leading-relaxed font-medium opacity-90">
                  {portfolioData.about.description2}
                </p>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {portfolioData.about.details.map((detail, idx) => (
                    <div key={idx} className="bg-background/10 p-3 sm:p-4 rounded-none backdrop-blur-sm">
                      <span className="block text-primary font-mono text-xs sm:text-sm uppercase mb-1">{detail.label}</span>
                      <span className="font-heading font-bold text-sm sm:text-lg">{detail.value}</span>
                    </div>
                  ))}
                </div>

                <PacManGhost color="#3a1f5c" className="absolute -bottom-10 -right-10 w-28 sm:w-40 h-28 sm:h-40 opacity-10" />
              </div>
            </div>

            {/* About Text */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold mb-5 sm:mb-8 text-accent">
                About Me
              </h2>
              <div className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-xl text-muted-foreground leading-relaxed">
                  Passionate about creating intuitive and dynamic user experiences.
                  Just like Pac-Man clearing the maze, I love solving complex problems
                  and optimizing performance.
                </p>
                <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
                  <div className="px-4 sm:px-6 py-2 sm:py-3 rounded-none bg-secondary text-secondary-foreground font-heading font-bold text-sm sm:text-base border-2 border-secondary-foreground/20 flex items-center gap-2">
                    <Code size={18} /> Clean Code
                  </div>
                  <div className="px-4 sm:px-6 py-2 sm:py-3 rounded-none bg-secondary text-secondary-foreground font-heading font-bold text-sm sm:text-base border-2 border-secondary-foreground/20 flex items-center gap-2">
                    <Terminal size={18} /> Performance
                  </div>
                  <div className="px-4 sm:px-6 py-2 sm:py-3 rounded-none bg-secondary text-secondary-foreground font-heading font-bold text-sm sm:text-base border-2 border-secondary-foreground/20 flex items-center gap-2">
                    <Gamepad2 size={18} /> UX Design
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Skills Section */}
      <section id="skills" className="py-12 sm:py-20 bg-maze">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold text-accent mb-3 sm:mb-4">Skills</h2>
            <p className="text-base sm:text-xl text-muted-foreground font-mono">My Tech Stack</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {portfolioData.skills.categories.map((category, idx) => (
              <Card key={idx} className="bg-muted border-none p-5 sm:p-6 rounded-none relative overflow-hidden group nes-border-style">
                <div className="absolute top-0 right-0 p-3 sm:p-4 opacity-40">
                  <Gamepad2 size={48} className="text-accent" />
                </div>

                <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#1a0b2e] mb-1 sm:mb-2 relative z-10">{category.title}</h3>
                <p className="text-[#2a1540] mb-4 sm:mb-6 relative z-10 text-sm sm:text-base font-semibold">{category.description}</p>

                <div className="grid grid-cols-2 gap-2 sm:gap-4 relative z-10">
                  {category.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 sm:gap-3 bg-background/30 p-2 sm:p-3 rounded-none hover:bg-primary/20 transition-colors">
                      <img src={item.icon} alt={item.name} className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                      <span className="font-heading font-semibold text-xs sm:text-sm text-foreground leading-tight">{item.name}</span>
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
      <section id="projects" className="py-12 sm:py-20 bg-maze">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold text-accent mb-3 sm:mb-4">Projects</h2>
            <p className="text-base sm:text-xl text-muted-foreground font-mono">What I've Built</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
            {portfolioData.projects.items.map((project, idx) => (
              <Card key={idx} className="bg-card text-card-foreground p-5 sm:p-8 rounded-none shadow-none flex flex-col h-full nes-border-style">
                <div className="flex justify-between items-start mb-4 sm:mb-6">
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-primary-foreground leading-tight">{project.title}</h3>
                </div>

                <p className="text-sm sm:text-lg font-medium opacity-80 mb-5 sm:mb-8 flex-grow leading-relaxed">
                  {project.description}
                </p>

                <div className="space-y-4 sm:space-y-6 mt-auto">
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white/20 rounded-none text-xs sm:text-sm font-bold font-mono text-primary-foreground">
                        #{tag.name}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-foreground/10">
                    {project.buttons.map((btn, bIdx) => (
                      <Button
                        key={bIdx}
                        asChild
                        variant={btn.variant === "outline" ? "outline" : "default"}
                        className={`font-heading font-bold rounded-none w-full text-sm sm:text-base transition-none active:translate-y-1 ${btn.variant === "outline"
                            ? "bg-transparent border-2 text-primary-foreground hover:bg-primary-foreground hover:text-card"
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
      <section id="contact" className="py-12 sm:py-20 mb-10 sm:mb-20 bg-maze">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <div className="bg-secondary nes-border-style p-6 sm:p-12 rounded-none relative overflow-hidden">
            <div className="absolute inset-0 bg-maze opacity-10"></div>

            <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold text-accent mb-4 sm:mb-8 relative z-10">
              Let's Connect
            </h2>
            <p className="text-base sm:text-xl text-foreground mb-8 sm:mb-12 font-medium relative z-10">
              Don't let the game end here. <br className="hidden sm:block" /> I'm available for new opportunities
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-6 relative z-10">
              <Button size="lg" className="bg-primary hover:bg-accent text-primary-foreground font-heading font-bold text-base sm:text-xl px-8 sm:px-10 py-6 sm:py-8 rounded-none shadow-none border-b-4 border-r-4 border-black transition-transform active:scale-95 active:border-none w-full sm:w-auto" asChild>
                <a href={portfolioData.contact.ctaLink}>
                  <Mail className="mr-2 sm:mr-3" size={20} /> Contact Me
                </a>
              </Button>

              <div className="flex gap-4">
                {portfolioData.contact.info.details
                  .filter(d => d.href.includes('github') || d.href.includes('linkedin'))
                  .map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 sm:w-16 sm:h-16 bg-muted flex items-center justify-center rounded-none border-2 border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {social.href.includes('github') ? <Github size={24} /> : <Linkedin size={24} />}
                    </a>
                  ))}
              </div>
            </div>

            {/* Contact details row */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-6 relative z-10">
              {portfolioData.contact.info.details
                .filter(d => d.href.includes('mailto') || d.href.includes('tel') || d.href.includes('samarthbhinge'))
                .map((detail, idx) => (
                  <a
                    key={idx}
                    href={detail.href}
                    className="text-xs sm:text-sm font-mono text-muted-foreground hover:text-accent transition-colors"
                  >
                    <span className="text-primary">{detail.label}</span> {detail.value}
                  </a>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-6 sm:py-8 text-center relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <p className="font-mono text-muted-foreground text-xs sm:text-sm">
            © {new Date().getFullYear()} {portfolioData.about.name} • Thanks for visiting
          </p>
        </div>
        <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-50"></div>
      </footer>
    </div>
  );
};

export default Index;
