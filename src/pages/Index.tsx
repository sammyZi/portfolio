import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import Typewriter from "typewriter-effect";
import portfolioData from "@/data/portfolio.json";

const Index = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll(".section-fade-in");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');

          html {
            scroll-padding-top: 64px; /* Adjust to match header height */
            scroll-behavior: smooth;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .animate-fade-in {
            animation: fadeInUp 0.8s ease-out forwards;
            opacity: 0;
          }

          .animate-slide-in-left {
            animation: slideInLeft 0.8s ease-out forwards;
            opacity: 0;
          }

          .animate-slide-in-right {
            animation: slideInRight 0.8s ease-out forwards;
            opacity: 0;
          }

          .hover-scale {
            transition: transform 0.3s ease, opacity 0.3s ease, box-shadow 0.3s ease;
          }

          .hover-scale:hover {
            transform: translateY(-6px);
            opacity: 0.95;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }

          .section-fade-in {
            opacity: 0;
            transition: opacity 0.8s ease-out;
          }

          .section-fade-in.visible {
            opacity: 1;
          }

          .terminal-button {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            transition: transform 0.2s ease;
          }

          .terminal-button:hover {
            transform: scale(1.2);
          }

          .animate-bounce {
            animation: bounce 2s infinite ease-in-out;
          }

          @keyframes bounce {
            0%, 100% { transform: translate(-50%, 0); }
            50% { transform: translate(-50%, -10px); }
          }
            @keyframes vanish-blink {
  0% { opacity: 1; }
  15% { opacity: 0; } /* Fast fade-out over 0.3s */
  60% { opacity: 0; } /* Stay invisible until 60% (0.9s) */
  100% { opacity: 1; } /* Slow fade-in over 0.8s */
}
.animate-vanish-blink {
  animation: vanish-blink 2s ease-in-out infinite;
}
        `}
      </style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-30 glass-effect">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-primary font-mono font-bold text-xl glow-text">
              {portfolioData.navigation.brand}
            </div>
            <div className="hidden md:flex gap-8">
              {portfolioData.navigation.links.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium animate-slide-in-left"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="font-mono text-primary mb-6 text-lg min-h-[30px] sm:min-h-[36px] md:min-h-[40px] animate-fade-in">
              <span className="inline-block">
                {portfolioData.hero.greeting}
              </span>
            </div>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold mb-8 animate-slide-up min-h-[120px] sm:min-h-[140px] md:min-h-[180px] flex flex-col justify-start"
              style={{ animationDelay: "0.2s" }}
            >
              {portfolioData.hero.typingLines.map((line, index) => (
                <div
                  key={index}
                  className={index === 0 ? "mb-2 sm:mb-3 md:mb-4" : ""}
                >
                  <span className={line.className}>
                    {index === 1 ? (
                      <div className="min-h-[60px] sm:min-h-[80px] md:min-h-[100px] flex items-start">
                        <Typewriter
                          options={{
                            strings: [line.text],
                            autoStart: true,
                            loop: false,
                            delay: 80,
                            deleteSpeed: Infinity,
                            cursor: "|", // Disable cursor to prevent second pipe
                          }}
                        />
                      </div>
                    ) : (
                      line.text
                    )}
                  </span>
                </div>
              ))}
            </h1>
            <p
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              {portfolioData.hero.subtitle}
            </p>
            <div
              className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in"
              style={{ animationDelay: "0.6s" }}
            >
              <Button
                asChild
                className="gradient-button px-8 py-4 text-lg font-medium transition-all duration-300 hover:scale-105 rounded-xl"
                size="lg"
              >
                <a href="#about">About Me</a>
              </Button>
              <Button
                variant="outline"
                asChild
                className="outline-button px-8 py-4 text-lg font-medium hover:scale-105 transition-all duration-300 rounded-xl"
                size="lg"
              >
                <a href="#projects">{portfolioData.hero.ctaButton}</a>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
  id="about"
  className="min-h-screen py-16 section-fade-in"
>
  <div className="container mx-auto px-6">
    <div className="grid lg:grid-cols-2 gap-16 items-start">
      <div className="animate-slide-in-left">
        <div className="font-mono text-primary mb-6 text-lg glow-text">
          {portfolioData.about.command}
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">
          {portfolioData.about.title}
        </h2>
        <div className="space-y-6 text-lg leading-relaxed">
          <p className="text-2xl md:text-3xl font-bold mb-8">
            {portfolioData.about.name}
          </p>
          <p className="text-muted-foreground">
            {portfolioData.about.description1}
          </p>
          <p className="text-muted-foreground">
            {portfolioData.about.description2}
          </p>
          <div className="grid grid-cols-2 gap-6 mt-8">
            {portfolioData.about.details.map((detail, index) => (
              <div key={index}>
                <div className="font-mono text-primary text-sm mb-2">
                  {detail.label}
                </div>
                <div
                  className={`font-semibold flex items-center ${
                    detail.className || "text-foreground"
                  } ${detail.label === "Status" ? "animate-vanish-blink" : ""}`}
                >
                  {detail.label === "Status" && (
                    <span className="inline-block w-3 h-3 mr-2 bg-green-500 rounded-full"></span>
                  )}
                  <span>{detail.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="animate-slide-in-right">
        <Card className="terminal-window glass-effect terminal-glow">
          <div className="terminal-header">
            <div className="flex gap-2">
              <div className="terminal-button close"></div>
              <div className="terminal-button minimize"></div>
              <div className="terminal-button maximize"></div>
            </div>
            <span className="text-sm text-muted-foreground ml-4 font-mono">
              {portfolioData.about.terminal.title}
            </span>
          </div>
          <div className="p-6 font-mono text-sm space-y-3">
            {portfolioData.about.terminal.lines.map((line, index) => (
              <div key={index}>
                <div className="text-primary">{line.command}</div>
                <div className={line.outputClass}>{line.output}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  </div>
</section>

      {/* Skills Section */}
      <section
        id="skills"
        className="min-h-screen flex items-center section-fade-in"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="font-mono text-primary mb-6 text-lg glow-text">
              {portfolioData.skills.command}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground animate-fade-in">
              {portfolioData.skills.title}
            </h2>
            <p
              className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              {portfolioData.skills.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {portfolioData.skills.categories.map((category, index) => (
              <Card
                key={category.title}
                className="terminal-window glass-effect hover-scale"
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                <div className="terminal-header">
                  <div className="flex gap-2">
                    <div className="terminal-button close bg-red-500"></div>
                    <div className="terminal-button minimize bg-yellow-500"></div>
                    <div className="terminal-button maximize bg-green-500"></div>
                  </div>
                  <span className="text-sm text-muted-foreground ml-4 font-mono">
                    {category.folder}
                  </span>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-primary mb-2 animate-fade-in">
                      {category.title}
                    </h3>
                    <p
                      className="text-muted-foreground text-sm animate-fade-in"
                      style={{ animationDelay: "0.1s" }}
                    >
                      {category.description}
                    </p>
                  </div>
                  <div className="space-y-3 font-mono text-sm">
                    {category.items.map((item, itemIndex) => (
                      <div
                        key={item.name}
                        className="flex items-center gap-2 animate-fade-in"
                        style={{ animationDelay: `${0.1 * itemIndex}s` }}
                      >
                        <img
                          src={item.icon}
                          alt={item.name}
                          className="w-5 h-5"
                        />
                        <span className="text-foreground">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="min-h-screen section-fade-in py-16" // Removed items-center, added padding
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="font-mono text-primary mb-6 text-lg glow-text">
              {portfolioData.projects.command}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">
              {portfolioData.projects.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {portfolioData.projects.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {portfolioData.projects.items.map((project, index) => (
              <Card
                key={index}
                className="terminal-window glass-effect project-card group flex flex-col min-h-[370px]" // Added flex-col and min-h
              >
                <div className="terminal-header">
                  <div className="flex gap-2">
                    <div className="terminal-button close"></div>
                    <div className="terminal-button minimize"></div>
                    <div className="terminal-button maximize"></div>
                  </div>
                  <span className="text-sm text-muted-foreground ml-4 font-mono">
                    {project.folder}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  {" "}
                  {/* Added flex-col and flex-grow */}
                  <h3 className="text-2xl font-bold text-primary mb-3">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="mt-auto">
                    {" "}
                    {/* Pushes tags and buttons to bottom */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className={`${tag.class} px-3 py-1 rounded-full text-sm font-mono`}
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {project.buttons.map((button, buttonIndex) => (
                        <Button
                          key={buttonIndex}
                          asChild
                          variant={button.variant}
                          size="sm"
                          className="font-mono rounded-xl"
                        >
                          <a
                            href={button.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {button.text}
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen flex items-center section-fade-in"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="font-mono text-primary mb-6 text-lg glow-text">
              {portfolioData.contact.command}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">
              {portfolioData.contact.title}
            </h2>
            <p className="text-xl text-muted-foreground mb-16 max-w-2xl mx-auto">
              {portfolioData.contact.subtitle}
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <Card className="terminal-window glass-effect">
                <div className="terminal-header">
                  <div className="flex gap-2">
                    <div className="terminal-button close"></div>
                    <div className="terminal-button minimize"></div>
                    <div className="terminal-button maximize"></div>
                  </div>
                  <span className="text-sm text-muted-foreground ml-4 font-mono">
                    {portfolioData.contact.info.title}
                  </span>
                </div>
                <div className="p-6 space-y-4">
                  {portfolioData.contact.info.details.map((detail, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 font-mono text-sm"
                    >
                      <span className="text-primary">{detail.label}</span>
                      <a
                        href={detail.href}
                        target="_blank"
                        className="text-terminal-success hover:underline transition-colors"
                      >
                        {detail.value}
                      </a>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="terminal-window glass-effect">
                <div className="terminal-header">
                  <div className="flex gap-2">
                    <div className="terminal-button close"></div>
                    <div className="terminal-button minimize"></div>
                    <div className="terminal-button maximize"></div>
                  </div>
                  <span className="text-sm text-muted-foreground ml-4 font-mono">
                    {portfolioData.contact.availability.title}
                  </span>
                </div>
                <div className="p-6 space-y-4 font-mono text-sm">
                  <div className="text-primary">
                    {portfolioData.contact.availability.command}
                  </div>
                  {portfolioData.contact.availability.lines.map(
                    (line, index) => (
                      <div key={index} className="text-terminal-success">
                        {line}
                      </div>
                    )
                  )}
                  <div className="text-muted-foreground mt-4">
                    <span className="text-terminal-success">
                      {portfolioData.contact.availability.responseTime}
                    </span>
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-12">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/80 rounded-xl text-primary-foreground px-8 py-4 text-lg font-medium hover:scale-105 transition-all duration-300"
                asChild
              >
                <a href={portfolioData.contact.ctaLink}>
                  {portfolioData.contact.ctaButton}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-6 text-center">
          <div className="font-mono text-primary mb-2 text-sm">
            {portfolioData.footer.prompt}
          </div>
          <p className="text-muted-foreground text-sm">
            Built with React + TypeScript • Styled with Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
