import { Heart, Github, Linkedin, Twitter, Mail, ArrowUp, Code2, Zap, Coffee } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/Navin45', label: 'GitHub', color: 'hover:text-gray-400' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/navin23/', label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: Twitter, href: 'https://x.com/Navin_Rajput45', label: 'Twitter', color: 'hover:text-sky-400' },
    { icon: Mail, href: 'mailto:navinsingh04523@gmail.com', label: 'Email', color: 'hover:text-green-400' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Modern gradient background with mesh effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card/50 to-background">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-accent/5"></div>
          {/* Mesh overlay */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
      </div>
      
      {/* Animated floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large decorative shapes */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-gradient-to-tl from-accent/15 to-primary/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Tech-inspired geometric elements */}
        <div className="absolute top-20 left-1/4 w-6 h-6 border-2 border-primary/30 rounded-sm rotate-45 animate-pulse"></div>
        <div className="absolute bottom-32 right-1/4 w-8 h-8 bg-accent/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-10 w-4 h-4 bg-primary/30 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-40 right-16 text-primary/20 text-3xl font-mono animate-float">{'</>'}</div>
        <div className="absolute bottom-20 left-20 text-accent/20 text-2xl font-mono animate-pulse">{'{ }'}</div>
        
        {/* Circuit-like lines */}
        <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 1 }}>
          <defs>
            <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path d="M50 50 L150 100 L250 80 L350 120" stroke="url(#circuitGradient)" strokeWidth="1" fill="none" opacity="0.3" className="animate-pulse" />
          <path d="M100 200 L200 250 L300 230 L400 270" stroke="url(#circuitGradient)" strokeWidth="1" fill="none" opacity="0.2" className="animate-pulse" style={{ animationDelay: '1s' }} />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Enhanced main footer content */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Brand section with modern card design */}
          <div className="text-center lg:text-left animate-fade-in-up">
            <div className="relative p-8 glass-card rounded-3xl border border-border hover:border-accent transition-all duration-500 group h-full flex flex-col">
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex-1 flex flex-col justify-center">
                <div className="flex items-center justify-center lg:justify-start space-x-4 mb-6">
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent p-4 animate-pulse-glow">
                    <Code2 className="w-full h-full text-primary-foreground" />
                    {/* Inner glow */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/50 to-accent/50 blur-md -z-10"></div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold hero-text mb-1">Navin Singh</h3>
                  </div>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                  Passionate about creating innovative digital solutions and bringing ideas to life through code.
                </p>
              </div>
            </div>
          </div>

          {/* Quick links with modern styling */}
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative p-8 glass-card rounded-3xl border border-border hover:border-accent transition-all duration-500 group h-full">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex-1 flex flex-col justify-center">
                <h4 className="text-2xl font-bold text-accent mb-8 flex items-center justify-center">
                  <Zap className="w-6 h-6 mr-3 animate-pulse" />
                  Quick Links
                </h4>
                <nav className="space-y-4">
                  {['Home', 'About Me', 'Skills', 'Projects', 'Contact'].map((link, index) => (
                    <a
                      key={link}
                      href={`#${link.toLowerCase()}`}
                      className="block text-lg text-muted-foreground hover:text-accent transition-all duration-300 hover:translate-x-3 hover:scale-105 relative group/link"
                      style={{ animationDelay: `${0.1 * index}s` }}
                    >
                      <span className="relative z-10">{link}</span>
                      <div className="absolute inset-0 bg-accent/10 rounded-lg scale-0 group-hover/link:scale-100 transition-transform duration-300"></div>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Contact & Social with enhanced design */}
          <div className="text-center lg:text-right animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="relative p-8 glass-card rounded-3xl border border-border hover:border-accent transition-all duration-500 group h-full">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex-1 flex flex-col justify-center">
                <h4 className="text-2xl font-bold text-accent mb-8 flex items-center justify-center lg:justify-end">
                  Let's Connect
                  <Heart className="w-6 h-6 ml-3 text-red-500 animate-pulse" />
                </h4>
                <div className="flex justify-center lg:justify-end space-x-3 mb-8">
                  {socialLinks.map(({ icon: Icon, href, label, color }, index) => (
                    <a
                      key={label}
                      href={href}
                      className={`relative p-4 glass-card rounded-2xl hover:scale-110 transition-all duration-300 group/social ${color} overflow-hidden`}
                      style={{ animationDelay: `${0.1 * index}s` }}
                      aria-label={label}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 scale-0 group-hover/social:scale-100 transition-transform duration-300"></div>
                      <Icon className="w-6 h-6 relative z-10 group-hover/social:animate-bounce" />
                    </a>
                  ))}
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Available for freelance projects and collaborations
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced divider with animated coffee beans */}
        <div className="relative mb-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="px-8 py-4 glass-card rounded-full border border-border">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Coffee className="w-5 h-5 animate-bounce text-amber-500" />
                <span className="text-lg font-medium">Fueled by coffee & passion</span>
                <Coffee className="w-5 h-5 animate-bounce text-amber-500" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Modern bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex items-center space-x-3 text-muted-foreground">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-lg">© 2025 Navin Singh. All rights reserved.</span>
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
          
          <button
            onClick={scrollToTop}
            className="relative p-4 glass-card rounded-2xl hover:bg-accent hover:scale-110 transition-all duration-300 group overflow-hidden"
            aria-label="Scroll to top"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            <ArrowUp className="w-6 h-6 relative z-10 group-hover:animate-bounce" />
          </button>
        </div>

        {/* Enhanced animated accent line */}
        <div className="mt-12 relative">
          <div className="h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-gradient-flow rounded-full"></div>
          <div className="absolute inset-0 h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent animate-gradient-flow rounded-full" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;