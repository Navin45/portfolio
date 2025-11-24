import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Code, Smartphone, Globe, Database, Activity, TrendingUp, Star, GitFork, Eye, Cpu, Zap, Box, Terminal } from 'lucide-react';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  updated_at: string;
  topics: string[];
}

const ProjectsSection = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [repositories, setRepositories] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Fetch GitHub repositories
  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Navin45/repos?sort=updated&per_page=6');
        const repos = await response.json();
        setRepositories(repos);
      } catch (error) {
        console.error('Error fetching repositories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, []);

  // Intersection observer for staggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getLanguageConfig = (language: string | null) => {
    switch (language) {
      case 'JavaScript':
        return {
          icon: <Code className="w-12 h-12" />,
          gradient: 'from-yellow-500/20 via-yellow-600/10 to-orange-500/20',
          color: 'text-yellow-400'
        };
      case 'TypeScript':
        return {
          icon: <Code className="w-12 h-12" />,
          gradient: 'from-blue-500/20 via-blue-600/10 to-cyan-500/20',
          color: 'text-blue-400'
        };
      case 'Python':
        return {
          icon: <Cpu className="w-12 h-12" />,
          gradient: 'from-blue-600/20 via-yellow-500/10 to-blue-400/20',
          color: 'text-blue-300'
        };
      case 'Java':
        return {
          icon: <Smartphone className="w-12 h-12" />,
          gradient: 'from-red-500/20 via-orange-600/10 to-red-400/20',
          color: 'text-red-400'
        };
      case 'Kotlin':
        return {
          icon: <Smartphone className="w-12 h-12" />,
          gradient: 'from-purple-500/20 via-pink-600/10 to-purple-400/20',
          color: 'text-purple-400'
        };
      case 'Go':
        return {
          icon: <Zap className="w-12 h-12" />,
          gradient: 'from-cyan-500/20 via-blue-600/10 to-cyan-400/20',
          color: 'text-cyan-400'
        };
      case 'Rust':
        return {
          icon: <Box className="w-12 h-12" />,
          gradient: 'from-orange-600/20 via-red-600/10 to-orange-500/20',
          color: 'text-orange-400'
        };
      case 'HTML':
      case 'CSS':
        return {
          icon: <Globe className="w-12 h-12" />,
          gradient: 'from-pink-500/20 via-purple-600/10 to-pink-400/20',
          color: 'text-pink-400'
        };
      default:
        return {
          icon: <Terminal className="w-12 h-12" />,
          gradient: 'from-primary/20 via-accent/10 to-primary/20',
          color: 'text-primary'
        };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section ref={sectionRef} id="projects" className="relative py-32 px-4 bg-background overflow-hidden">
      {/* Neural Network Background */}
      <div className="absolute inset-0 neural-network-bg animate-matrix-grid opacity-30"></div>
      <div className="absolute inset-0 quantum-grid animate-matrix-grid"></div>

      {/* Floating Data Streams */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/50 to-transparent animate-data-stream"></div>
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-accent/50 to-transparent animate-data-stream" style={{ animationDelay: "1s" }}></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="relative inline-block">
            <h2 className="text-6xl md:text-7xl font-bold mb-6 animate-parallax-3d">
              Featured <span className="hero-text">Projects</span>
            </h2>
            {/* Quantum Ripple Effect */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 animate-quantum-ripple"></div>
              <div className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 animate-quantum-ripple" style={{ animationDelay: "1s" }}></div>
            </div>
          </div>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
            Live projects from my GitHub with real-time statistics and cutting-edge technologies
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="glass-card p-6 rounded-xl animate-pulse">
                <div className="h-48 bg-muted/20 rounded-lg mb-4"></div>
                <div className="h-6 bg-muted/20 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-muted/20 rounded w-full mb-2"></div>
                <div className="h-4 bg-muted/20 rounded w-2/3 mb-4"></div>
                <div className="flex gap-2 mb-4">
                  <div className="h-6 bg-muted/20 rounded-full w-16"></div>
                  <div className="h-6 bg-muted/20 rounded-full w-20"></div>
                </div>
                <div className="h-10 bg-muted/20 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repositories.map((repo, index) => (
              <div
                key={repo.id}
                className={`group relative ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
                  }`}
                style={{
                  animationDelay: isVisible ? `${index * 0.15}s` : '0s'
                }}
                onMouseEnter={() => setHoveredProject(repo.name)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Holographic Frame */}
                <div className="absolute -inset-1 holographic-gradient animate-holographic rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-700"></div>

                {/* Main Card */}
                <div className="relative glass-card rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-700 hover:shadow-[0_0_60px_hsl(160_84%_60%_/_0.4)]">
                  {/* Gradient Header with Tech Icon */}
                  <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${getLanguageConfig(repo.language).gradient}`}>
                    {/* Animated mesh background */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.05)_75%)] bg-[length:60px_60px] animate-pulse"></div>
                    </div>

                    {/* Holographic Overlay */}
                    <div className="absolute inset-0 holographic-gradient opacity-0 group-hover:opacity-20 transition-opacity duration-700 mix-blend-screen"></div>

                    {/* Center Tech Icon */}
                    <div className={`absolute inset-0 flex items-center justify-center ${getLanguageConfig(repo.language).color} opacity-40 group-hover:opacity-60 transition-all duration-700 group-hover:scale-110`}>
                      {getLanguageConfig(repo.language).icon}
                    </div>

                    {/* Floating particles */}
                    <div className="absolute top-4 left-4 w-2 h-2 bg-white/30 rounded-full animate-float"></div>
                    <div className="absolute top-8 right-8 w-3 h-3 bg-white/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-6 left-12 w-2 h-2 bg-white/25 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>

                    {/* Language badge */}
                    {repo.language && (
                      <div className="absolute top-4 right-4 px-3 py-1 glass-card rounded-full backdrop-blur-md">
                        <span className={`text-xs font-semibold ${getLanguageConfig(repo.language).color}`}>
                          {repo.language}
                        </span>
                      </div>
                    )}

                    {/* Bottom gradient overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                      {repo.description || 'An innovative project showcasing modern development practices'}
                    </p>

                    {/* GitHub Stats */}
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                        <Star className="w-4 h-4" />
                        <span>{repo.stargazers_count}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground hover:text-accent transition-colors">
                        <GitFork className="w-4 h-4" />
                        <span>{repo.forks_count}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                        <Eye className="w-4 h-4" />
                        <span>{repo.watchers_count}</span>
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {repo.language && (
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20 font-medium">
                          {repo.language}
                        </span>
                      )}
                      {repo.topics.slice(0, 2).map((topic) => (
                        <span
                          key={topic}
                          className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full border border-accent/20 hover:bg-accent/20 transition-all duration-300 font-medium"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>

                    {/* Action Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full glass-card border-border hover:border-primary hover:bg-primary/5 group/btn transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                      asChild
                    >
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform duration-300" />
                        <span className="group-hover/btn:text-primary transition-colors">View Repository</span>
                      </a>
                    </Button>

                    {/* Updated Date */}
                    <div className="text-xs text-muted-foreground/60 text-center pt-2 border-t border-border/50">
                      Updated {formatDate(repo.updated_at)}
                    </div>
                  </div>

                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-xl border border-primary/0 group-hover:border-primary/30 transition-all duration-700 pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Enhanced CTA */}
        <div className="text-center mt-20">
          <div className="relative inline-block">
            {/* Glow effect */}
            <div className="absolute -inset-4 holographic-gradient animate-holographic rounded-full blur-xl opacity-30"></div>

            <Button
              variant="outline"
              size="lg"
              className="relative glass-card border-border hover:border-primary px-8 py-6 rounded-full group hover:shadow-xl hover:shadow-primary/30 transition-all duration-500 hover:scale-110"
              asChild
            >
              <a href="https://github.com/Navin45" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                <Github className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-lg font-semibold group-hover:text-primary transition-colors">Explore All Projects</span>
                <TrendingUp className="w-5 h-5 text-accent group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;