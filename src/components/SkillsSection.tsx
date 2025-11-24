import { useState, useEffect, useRef } from 'react';
import { Code, Database, Server, Wrench, Brain, Coffee, Layers, Zap, GitBranch, Network, BarChart3, Globe, TrendingUp, Sparkles } from 'lucide-react';

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const skillCategories = {
    'Frontend': {
      icon: Code,
      color: 'from-cyan-400 via-blue-500 to-sky-600',
      hoverColor: 'hover:from-cyan-300 hover:via-blue-400 hover:to-sky-500',
      glowColor: 'shadow-cyan-500/50',
      skills: [
        { name: 'JavaScript', level: 90, icon: Zap },
        { name: 'React', level: 95, icon: Code },
        { name: 'TypeScript', level: 85, icon: Code },
        { name: 'HTML5', level: 95, icon: Globe },
        { name: 'CSS3', level: 90, icon: Layers },
        { name: 'Tailwind CSS', level: 90, icon: Layers }
      ]
    },
    'Backend': {
      icon: Server,
      color: 'from-emerald-400 via-green-500 to-teal-600',
      hoverColor: 'hover:from-emerald-300 hover:via-green-400 hover:to-teal-500',
      glowColor: 'shadow-emerald-500/50',
      skills: [
        { name: 'Python', level: 90, icon: Code },
        { name: 'Java', level: 85, icon: Coffee },
        { name: 'Spring Boot', level: 80, icon: Layers },
        { name: 'Node.js', level: 85, icon: Server }
      ]
    },
    'Databases': {
      icon: Database,
      color: 'from-violet-400 via-purple-500 to-indigo-600',
      hoverColor: 'hover:from-violet-300 hover:via-purple-400 hover:to-indigo-500',
      glowColor: 'shadow-violet-500/50',
      skills: [
        { name: 'MySQL', level: 85, icon: Database },
        { name: 'PostgreSQL', level: 80, icon: Database },
        { name: 'MongoDB', level: 85, icon: Database }
      ]
    },
    'DevOps & Tools': {
      icon: Wrench,
      color: 'from-orange-400 via-red-500 to-pink-600',
      hoverColor: 'hover:from-orange-300 hover:via-red-400 hover:to-pink-500',
      glowColor: 'shadow-orange-500/50',
      skills: [
        { name: 'Docker', level: 80, icon: Layers },
        { name: 'Git', level: 90, icon: GitBranch },
        { name: 'AWS', level: 75, icon: Layers },
        { name: 'CI/CD', level: 80, icon: TrendingUp }
      ]
    },
    'AI & Libraries': {
      icon: Brain,
      color: 'from-pink-400 via-rose-500 to-red-600',
      hoverColor: 'hover:from-pink-300 hover:via-rose-400 hover:to-red-500',
      glowColor: 'shadow-pink-500/50',
      skills: [
        { name: 'n8n', level: 85, icon: Network },
        { name: 'LangChain', level: 80, icon: Network },
        { name: 'pandas', level: 85, icon: BarChart3 },
        { name: 'numpy', level: 85, icon: BarChart3 }
      ]
    }
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 neural-network-bg opacity-30"></div>
      <div className="absolute inset-0 quantum-grid animate-matrix-grid"></div>

      {/* Floating gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in-up backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm font-semibold text-primary">Technical Expertise</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="hero-text">Skills & Expertise</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Mastering modern technologies to build innovative solutions across the full stack
          </p>
        </div>

        {/* Skills Grid - Enhanced Modern Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 md:mb-20">
          {Object.entries(skillCategories).map(([category, data], index) => {
            const IconComponent = data.icon;
            const isActive = activeCategory === category;

            return (
              <div
                key={category}
                className="group relative animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setActiveCategory(category)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                {/* Card with 3D tilt effect */}
                <div
                  className={`relative h-full rounded-2xl bg-gradient-to-br ${data.color} p-[2px] transition-all duration-500 
                    ${isActive ? 'scale-105 shadow-2xl ' + data.glowColor : 'hover:scale-[1.02]'}
                    transform-gpu perspective-1000`}
                  style={{
                    transform: isActive ? 'rotateX(2deg) rotateY(-2deg)' : 'rotateX(0deg) rotateY(0deg)',
                  }}
                >
                  <div className="h-full rounded-2xl bg-card/95 backdrop-blur-xl p-6 md:p-7">
                    {/* Category Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${data.color} flex items-center justify-center shadow-lg transition-all duration-500 ${isActive ? 'rotate-12 scale-110 shadow-2xl' : 'group-hover:rotate-6'}`}>
                        <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">{category}</h3>
                        <p className="text-xs md:text-sm text-muted-foreground">{data.skills.length} skills</p>
                      </div>
                    </div>

                    {/* Skills List */}
                    <div className="space-y-4 md:space-y-5">
                      {data.skills.map((skill, skillIndex) => {
                        const SkillIcon = skill.icon;
                        return (
                          <div
                            key={skill.name}
                            className="group/skill"
                          >
                            {/* Skill Name and Icon */}
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <SkillIcon className="w-4 h-4 text-accent transition-transform duration-300 group-hover/skill:scale-110" />
                                <span className="text-sm md:text-base font-medium text-foreground">{skill.name}</span>
                              </div>
                              <span className="text-xs md:text-sm font-semibold text-muted-foreground tabular-nums">{skill.level}%</span>
                            </div>

                            {/* Enhanced Progress Bar with auto-animation */}
                            <div className="h-2 bg-muted/30 rounded-full overflow-hidden relative">
                              <div
                                className={`h-full bg-gradient-to-r ${data.color} rounded-full transition-all duration-1000 ease-out relative
                                  ${isActive || isVisible ? 'animate-pulse' : ''}`}
                                style={{
                                  width: (isActive || isVisible) ? `${skill.level}%` : '0%',
                                  transitionDelay: `${skillIndex * 0.1}s`
                                }}
                              >
                                {/* Shimmer effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Decorative bottom accent with gradient animation */}
                    <div className={`mt-6 md:mt-8 h-1 rounded-full bg-gradient-to-r ${data.color} transition-all duration-500 ${isActive ? 'opacity-100 shadow-lg' : 'opacity-30'}`}></div>
                  </div>
                </div>

                {/* Enhanced glow effect on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${data.color} blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}></div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto mb-12">
          {[
            { label: 'Languages', value: '6+', icon: Code, color: 'from-cyan-400 to-blue-600' },
            { label: 'Frameworks', value: '10+', icon: Layers, color: 'from-emerald-400 to-teal-600' },
            { label: 'Databases', value: '5+', icon: Database, color: 'from-violet-400 to-indigo-600' },
            { label: 'Tools', value: '15+', icon: Wrench, color: 'from-orange-400 to-pink-600' }
          ].map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <div
                key={stat.label}
                className="relative group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1 + 0.6}s` }}
              >
                <div className={`relative rounded-2xl bg-gradient-to-br ${stat.color} p-[2px] transition-all duration-300 hover:scale-105 hover:shadow-2xl`}>
                  <div className="rounded-2xl bg-card/95 backdrop-blur-xl p-5 md:p-6 text-center">
                    <StatIcon className={`w-8 h-8 md:w-10 md:h-10 mx-auto mb-3 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-110`} style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text' }} />
                    <div className="text-2xl md:text-3xl font-bold text-foreground mb-1 tabular-nums">{stat.value}</div>
                    <div className="text-xs md:text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                </div>
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10`}></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 md:mt-16 animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <p className="text-base md:text-lg text-muted-foreground">
            Continuously learning and adapting to emerging technologies
          </p>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;