import { Cpu, Sparkles } from "lucide-react";
const AboutSection = () => {
  return <section id="about" className="relative py-32 px-4 bg-background overflow-hidden">
      {/* Neural Network Background */}
      <div className="absolute inset-0 neural-network-bg animate-matrix-grid opacity-30"></div>
      <div className="absolute inset-0 quantum-grid animate-matrix-grid"></div>
      
      {/* Floating Data Streams */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/50 to-transparent animate-data-stream"></div>
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-accent/50 to-transparent animate-data-stream" style={{
      animationDelay: "1s"
    }}></div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="relative inline-block">
            <h2 className="text-6xl md:text-7xl font-bold mb-6 animate-parallax-3d">
              About <span className="hero-text">Me</span>
            </h2>
            {/* Quantum Ripple Effect */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 animate-quantum-ripple"></div>
              <div className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 animate-quantum-ripple" style={{
              animationDelay: "1s"
            }}></div>
            </div>
          </div>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
            AI Engineer specializing in agentic AI systems and intelligent automation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Enhanced Profile Section */}
          <div className="relative">
            {/* Holographic Frame */}
            <div className="relative group">
              {/* Outer Holographic Ring */}
              <div className="absolute -inset-8 holographic-gradient animate-holographic rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
              
              {/* Neural Pulse Rings */}
              <div className="absolute -inset-4 border-2 border-primary/20 rounded-full animate-neural-pulse"></div>
              <div className="absolute -inset-6 border border-accent/10 rounded-full animate-neural-pulse" style={{
              animationDelay: "2s"
            }}></div>
              
              {/* Main Image Container */}
              <div className="relative glass-card p-8 rounded-full transform hover:scale-105 transition-all duration-700 hover:shadow-[0_0_60px_hsl(160_84%_60%_/_0.4)]">
                <div className="relative overflow-hidden rounded-full">
                  <img src="/lovable-uploads/c61711c4-1c2f-4591-b138-eb7a7dbba9ab.png" alt="Navin Singh - AI Engineer" className="w-full h-auto rounded-full object-cover filter hover:saturate-110 transition-all duration-700" />
                  
                  {/* Holographic Overlay */}
                  <div className="absolute inset-0 holographic-gradient opacity-0 hover:opacity-20 transition-opacity duration-700 rounded-full mix-blend-screen"></div>
                </div>
                
                {/* Floating Tech Icons */}
                <div className="absolute -top-2 -right-2 w-12 h-12 glass-card rounded-full flex items-center justify-center animate-float">
                  <Cpu className="w-6 h-6 text-primary" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-14 h-14 glass-card rounded-full flex items-center justify-center animate-float" style={{
                animationDelay: "1s"
              }}>
                  <Sparkles className="w-7 h-7 text-accent" />
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Content Section */}
          <div className="space-y-12">
            {/* Bio Section */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full holographic-gradient animate-holographic opacity-50"></div>
              <h3 className="text-3xl font-bold mb-6 hero-text">AI Engineer </h3>
              <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
                <p className="transform hover:translate-x-2 transition-transform duration-300">
                  I am an AI Engineer passionate about building intelligent systems that can think, 
                  learn, and act autonomously. With a strong foundation in artificial intelligence 
                  and machine learning, I specialize in developing agentic AI solutions that can 
                  make decisions and perform tasks independently.
                </p>
                <p className="transform hover:translate-x-2 transition-transform duration-300">
                  I completed my B.Tech in AI & ML from Chandigarh Engineering College, Jhanjeri, 
                  where I gained comprehensive knowledge in machine learning algorithms, deep learning, 
                  neural networks, and modern AI frameworks. This academic foundation has equipped me 
                  with the theoretical and practical skills needed to tackle complex AI challenges.
                </p>
                <p className="transform hover:translate-x-2 transition-transform duration-300">
                  My current focus is on agentic AI - creating intelligent agents that can understand 
                  context, reason about problems, and take autonomous actions to achieve specific goals. 
                  I enjoy working on projects that push the boundaries of what AI can accomplish in 
                  real-world applications.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;