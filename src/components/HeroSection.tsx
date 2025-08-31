import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

const HeroSection = () => {
  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background image layer */}
      <div 
        className="absolute inset-0 bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://cdn.dribbble.com/users/1162077/screenshots/3848914/programmer.gif')`,
          backgroundSize: 'cover',
          imageRendering: 'crisp-edges'
        }}
      />
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/80 to-background/90"></div>
      
      {/* Animated accent overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 animate-gradient-flow"></div>
      
      {/* Enhanced floating graphics and shapes */}
      <div className="absolute inset-0">
        {/* Animated particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${15 + i * 12}%`,
              top: `${25 + (i % 4) * 20}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
        
        {/* Geometric shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 border-2 border-primary/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-16 w-16 h-16 bg-accent/10 rounded-lg rotate-45 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 border border-primary/30 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-primary/20 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Code-like decorative elements */}
        <div className="absolute top-24 right-32 text-primary/20 text-6xl font-mono animate-pulse" style={{ animationDelay: '0.5s' }}>{'</>'}</div>
        <div className="absolute bottom-24 left-32 text-accent/20 text-4xl font-mono animate-float" style={{ animationDelay: '2.5s' }}>{'{ }'}</div>
        
        {/* Gradient orbs */}
        <div className="absolute top-16 left-1/3 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1.2s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-lg animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="block text-foreground">Navin</span>
            <span className="block hero-text">Singh</span>
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 animate-fade-in-up">
            AI Engineer
          </p>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in-up">
            Crafting digital experiences with modern technologies and innovative solutions. 
            Passionate about creating efficient, scalable, and user-friendly applications.
          </p>

          <div className="flex justify-center mb-16 animate-scale-in">
            <Button 
              variant="outline" 
              size="lg"
              className="glass-card border-border hover:border-accent text-foreground font-semibold px-8 py-3 rounded-full hover:scale-105 transition-all duration-300"
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/Navin-Singh-CV.pdf';
                link.download = 'Navin-Singh-CV.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              Download CV
            </Button>
          </div>

          <div className="flex justify-center space-x-6 mb-16 animate-scale-in">
            {[
              { icon: Github, href: 'https://github.com/Navin45' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/navin23/' },
              { icon: Mail, href: 'mailto:navinsingh04523@gmail.com' }
            ].map(({ icon: Icon, href }, index) => (
              <a
                key={index}
                href={href}
                className="p-3 glass-card rounded-full hover:bg-accent hover:scale-110 transition-all duration-300 animate-pulse-glow"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <Icon size={24} className="text-foreground hover:text-accent-foreground" />
              </a>
            ))}
          </div>
        </div>

        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a 
            href="#skills" 
            className="text-muted-foreground hover:text-primary transition-all duration-300 group"
          >
            <div className="relative">
              <ArrowDown 
                size={32} 
                className="animate-bounce group-hover:scale-110 transition-all duration-300" 
              />
              <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-75"></div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;