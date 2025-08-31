import { useState, useEffect } from 'react';
import { Code, Database, Server, Wrench, Brain, Coffee, Layers, Zap, GitBranch, Network, BarChart3, Star, TrendingUp, Globe, Smartphone } from 'lucide-react';

const SkillsSection = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [skillMatch, setSkillMatch] = useState<string>('Full Stack Developer');

  const skillCategories = {
    'Frontend': {
      icon: Code,
      color: 'from-cyan-400 via-blue-500 to-sky-600',
      bgColor: 'bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-sky-600/20',
      skills: [
        { name: 'JavaScript', icon: Zap, description: 'ES6+, Modern frameworks, Async programming' },
        { name: 'React', icon: Code, description: 'Hooks, Context, Performance optimization' },
        { name: 'TypeScript', icon: Code, description: 'Type safety, Generic programming, Advanced types' },
        { name: 'HTML5', icon: Globe, description: 'Semantic markup, Accessibility, Web standards' },
        { name: 'CSS3', icon: Layers, description: 'Flexbox, Grid, Animations, Responsive design' },
        { name: 'Tailwind CSS', icon: Layers, description: 'Utility-first, Component design, Customization' }
      ]
    },
    'Backend': {
      icon: Server,
      color: 'from-emerald-400 via-green-500 to-teal-600',
      bgColor: 'bg-gradient-to-br from-emerald-400/20 via-green-500/20 to-teal-600/20',
      skills: [
        { name: 'Python', icon: Code, description: 'Django, FastAPI, Data processing, Automation' },
        { name: 'Java', icon: Coffee, description: 'Spring Framework, Microservices, Enterprise apps' },
        { name: 'Spring Boot', icon: Layers, description: 'REST APIs, Security, Microservices architecture' },
        { name: 'Node.js', icon: Server, description: 'Express.js, Real-time applications, API development' }
      ]
    },
    'Databases': {
      icon: Database,
      color: 'from-sky-400 via-blue-500 to-cyan-600',
      bgColor: 'bg-gradient-to-br from-sky-400/20 via-blue-500/20 to-cyan-600/20',
      skills: [
        { name: 'MySQL', icon: Database, description: 'Complex queries, Optimization, Indexing strategies' },
        { name: 'PostgreSQL', icon: Database, description: 'Advanced features, JSON handling, Performance tuning' },
        { name: 'MongoDB', icon: Database, description: 'NoSQL design, Aggregation pipelines, Scaling' }
      ]
    },
    'DevOps & Tools': {
      icon: Wrench,
      color: 'from-orange-400 via-red-500 to-pink-600',
      bgColor: 'bg-gradient-to-br from-orange-400/20 via-red-500/20 to-pink-600/20',
      skills: [
        { name: 'Docker', icon: Layers, description: 'Containerization, Multi-stage builds, Orchestration' },
        { name: 'Git', icon: GitBranch, description: 'Version control, Branching strategies, Collaboration' },
        { name: 'AWS', icon: Layers, description: 'EC2, S3, Lambda, Cloud architecture' },
        { name: 'CI/CD', icon: TrendingUp, description: 'GitHub Actions, Automated deployments, Testing pipelines' }
      ]
    },
    'AI & Libraries': {
      icon: Brain,
      color: 'from-pink-400 via-rose-500 to-red-600',
      bgColor: 'bg-gradient-to-br from-pink-400/20 via-rose-500/20 to-red-600/20',
      skills: [
        { name: 'n8n', icon: Network, description: 'Workflow automation, API integrations, Low-code solutions' },
        { name: 'LangChain', icon: Network, description: 'AI application development, LLM integration' },
        { name: 'pandas', icon: BarChart3, description: 'Data manipulation, Analysis, Processing pipelines' },
        { name: 'numpy', icon: BarChart3, description: 'Numerical computing, Array operations, Scientific computing' }
      ]
    }
  };

  // Skill matching system
  useEffect(() => {
    setSkillMatch('Full Stack Developer');
  }, []);

  const handleCategoryClick = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      {/* Interactive constellation background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Constellation lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <linearGradient id="constellation" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
          </defs>
          {[...Array(6)].map((_, i) => (
            <g key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.5}s` }}>
              <line 
                x1={`${10 + i * 15}%`} 
                y1={`${20 + i * 10}%`} 
                x2={`${30 + i * 12}%`} 
                y2={`${40 + i * 8}%`} 
                stroke="url(#constellation)" 
                strokeWidth="1"
                opacity="0.3"
              />
              <circle 
                cx={`${10 + i * 15}%`} 
                cy={`${20 + i * 10}%`} 
                r="2" 
                fill="hsl(var(--primary))" 
                opacity="0.6"
              />
            </g>
          ))}
        </svg>
        
        {/* Floating tech symbols */}
        <div className="absolute top-20 left-12 text-6xl text-primary/10 animate-float">{'{ }'}</div>
        <div className="absolute bottom-32 right-20 text-5xl text-accent/10 animate-pulse">{'</>'}</div>
        <div className="absolute top-1/2 left-1/4 text-4xl text-primary/10 animate-bounce">{'<>'}</div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with skill matching */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in-up">
            <Star className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">{skillMatch}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="hero-text">Skills & Expertise</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Interactive skill showcase featuring expertise across modern tech stacks
          </p>
        </div>

        {/* Interactive skill grid with hover dropdowns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto mb-16">
          {Object.entries(skillCategories).map(([category, data], categoryIndex) => {
            const IconComponent = data.icon;
            // Adjust dropdown position based on grid position
            const isLeftEdge = categoryIndex % 5 < 2; // First 2 columns
            const isRightEdge = categoryIndex % 5 > 2; // Last 2 columns
            
            return (
              <div key={category} className="relative group">
                {/* Main skill card */}
                <div
                  className={`relative w-32 h-32 md:w-36 md:h-36 rounded-2xl bg-gradient-to-br ${data.color} flex flex-col items-center justify-center transition-all duration-500 hover:scale-110 hover:rotate-3 shadow-2xl animate-fade-in-up cursor-pointer border-2 border-white/20`}
                  style={{ animationDelay: `${categoryIndex * 0.2}s` }}
                >
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${data.color} blur-xl opacity-30 group-hover:opacity-60 transition-all duration-500`}></div>
                  
                  {/* Icon and label */}
                  <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white z-10 drop-shadow-lg mb-2" />
                  <span className="text-white text-sm font-medium text-center px-2 z-10">{category}</span>
                  
                  {/* Hover indicator */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 animate-bounce">
                    <TrendingUp className="w-3 h-3 text-white" />
                  </div>
                </div>

                {/* Modern hover dropdown with smart positioning */}
                <div className={`absolute top-full mt-4 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 ${
                  isLeftEdge ? 'left-0' : isRightEdge ? 'right-0' : 'left-1/2 transform -translate-x-1/2'
                }`}>
                  <div className="relative">
                    {/* Arrow pointing up - positioned based on dropdown alignment */}
                    <div className={`absolute -top-2 w-4 h-4 bg-card border-l border-t border-border rotate-45 ${
                      isLeftEdge ? 'left-8' : isRightEdge ? 'right-8' : 'left-1/2 transform -translate-x-1/2'
                    }`}></div>
                    
                    {/* Dropdown content */}
                    <div className={`${data.bgColor} bg-card/95 backdrop-blur-xl border border-border/50 rounded-xl p-6 shadow-2xl animate-scale-in`}>
                      <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                        <IconComponent className="w-5 h-5 text-accent" />
                        {category} Skills
                      </h4>
                      <div className="space-y-3">
                        {data.skills.map((skill, index) => {
                          const SkillIcon = skill.icon;
                          
                          return (
                            <div
                              key={skill.name}
                              className="group/skill p-3 rounded-lg bg-background/50 hover:bg-accent/10 transition-all duration-300 cursor-pointer hover:scale-[1.02] border border-transparent hover:border-accent/20"
                              style={{ animationDelay: `${index * 0.1}s` }}
                              onMouseEnter={() => setHoveredSkill(skill.name)}
                              onMouseLeave={() => setHoveredSkill(null)}
                            >
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                                  <SkillIcon className="w-4 h-4 text-accent" />
                                </div>
                                <span className="font-medium text-foreground">{skill.name}</span>
                              </div>
                              
                              {/* Always show description in dropdown */}
                              <div className="text-xs text-muted-foreground ml-11 leading-relaxed">
                                {skill.description}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      {/* Decorative bottom accent */}
                      <div className={`mt-4 h-1 rounded-full bg-gradient-to-r ${data.color} opacity-30`}></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { label: 'Languages', value: '6+', icon: Code },
            { label: 'Frameworks', value: '10+', icon: Layers },
            { label: 'Databases', value: '5+', icon: Database },
            { label: 'Tools', value: '15+', icon: Wrench }
          ].map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <div 
                key={stat.label} 
                className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/30 hover:border-accent/50 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1 + 0.8}s` }}
              >
                <StatIcon className="w-8 h-8 text-accent mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;