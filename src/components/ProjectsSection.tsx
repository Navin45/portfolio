import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, Code, Smartphone, Globe, Database, Activity, TrendingUp, Star, GitFork, Eye } from 'lucide-react';

// Import project images
import webDevelopmentImage from '@/assets/projects/web-development.jpg';
import pythonDataScienceImage from '@/assets/projects/python-data-science.jpg';
import mobileDevelopmentImage from '@/assets/projects/mobile-development.jpg';
import backendDatabaseImage from '@/assets/projects/backend-database.jpg';
import generalCodingImage from '@/assets/projects/general-coding.jpg';
import devopsCloudImage from '@/assets/projects/devops-cloud.jpg';
import aiChatbotImage from '@/assets/projects/ai-chatbot.jpg';
import spamDetectionImage from '@/assets/projects/spam-detection.jpg';
import ecommerceAppImage from '@/assets/projects/ecommerce-app.jpg';
import taskManagementImage from '@/assets/projects/task-management.jpg';
import apiProjectImage from '@/assets/projects/api-project.jpg';
import dataAnalyticsImage from '@/assets/projects/data-analytics.jpg';

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

  const getLanguageIcon = (language: string | null) => {
    switch (language) {
      case 'JavaScript':
      case 'TypeScript':
        return <Code className="w-6 h-6" />;
      case 'Python':
        return <Database className="w-6 h-6" />;
      case 'Java':
      case 'Kotlin':
        return <Smartphone className="w-6 h-6" />;
      default:
        return <Globe className="w-6 h-6" />;
    }
  };

  const getProjectImage = (repo: GitHubRepo) => {
    const projectName = repo.name.toLowerCase();
    const description = (repo.description || '').toLowerCase();
    const topics = repo.topics.map(t => t.toLowerCase());
    
    // Combine all text for better matching
    const searchText = `${projectName} ${description} ${topics.join(' ')}`;
    
    // AI/ML/Chatbot related projects
    if (searchText.includes('ai') || searchText.includes('chatbot') || 
        searchText.includes('bot') || searchText.includes('neural') ||
        searchText.includes('machine learning') || searchText.includes('ml') ||
        projectName.includes('ai-') || projectName.includes('chatbot')) {
      return aiChatbotImage;
    }
    
    // Spam/Security related projects
    if (searchText.includes('spam') || searchText.includes('security') ||
        searchText.includes('detection') || searchText.includes('filter') ||
        projectName.includes('spam')) {
      return spamDetectionImage;
    }
    
    // E-commerce/Shopping projects
    if (searchText.includes('ecommerce') || searchText.includes('shop') ||
        searchText.includes('cart') || searchText.includes('store') ||
        searchText.includes('marketplace') || searchText.includes('payment')) {
      return ecommerceAppImage;
    }
    
    // Task/Project Management
    if (searchText.includes('task') || searchText.includes('todo') ||
        searchText.includes('project') || searchText.includes('management') ||
        searchText.includes('kanban') || searchText.includes('tracker')) {
      return taskManagementImage;
    }
    
    // API/Backend projects
    if (searchText.includes('api') || searchText.includes('backend') ||
        searchText.includes('server') || searchText.includes('rest') ||
        searchText.includes('graphql') || repo.language === 'Go' ||
        repo.language === 'Rust') {
      return apiProjectImage;
    }
    
    // Data Science/Analytics
    if (searchText.includes('data') || searchText.includes('analytics') ||
        searchText.includes('analysis') || searchText.includes('visualization') ||
        searchText.includes('dashboard') || repo.language === 'Python' ||
        searchText.includes('pandas') || searchText.includes('numpy')) {
      return dataAnalyticsImage;
    }
    
    // Mobile Development
    if (repo.language === 'Java' || repo.language === 'Kotlin' ||
        repo.language === 'Swift' || searchText.includes('android') ||
        searchText.includes('ios') || searchText.includes('mobile') ||
        searchText.includes('flutter') || searchText.includes('react native')) {
      return mobileDevelopmentImage;
    }
    
    // Web Development (React, Vue, Angular, etc.)
    if (repo.language === 'JavaScript' || repo.language === 'TypeScript' ||
        searchText.includes('react') || searchText.includes('vue') ||
        searchText.includes('angular') || searchText.includes('web') ||
        searchText.includes('frontend') || searchText.includes('website')) {
      return webDevelopmentImage;
    }
    
    // DevOps/Cloud
    if (searchText.includes('docker') || searchText.includes('kubernetes') ||
        searchText.includes('cloud') || searchText.includes('aws') ||
        searchText.includes('devops') || searchText.includes('deploy')) {
      return devopsCloudImage;
    }
    
    // Database related
    if (searchText.includes('database') || searchText.includes('sql') ||
        searchText.includes('mongodb') || searchText.includes('postgresql') ||
        repo.language === 'SQL') {
      return backendDatabaseImage;
    }
    
    // Default fallback
    return generalCodingImage;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section ref={sectionRef} id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6 animate-fade-in-up">
            <Github className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-sm font-medium text-accent">GitHub Repositories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="hero-text">My Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real projects from my GitHub profile with live statistics and recent activity.
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="project-card animate-pulse">
                <div className="h-48 bg-muted"></div>
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 bg-muted rounded-full w-16"></div>
                    <div className="h-6 bg-muted rounded-full w-20"></div>
                  </div>
                  <div className="h-10 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repositories.map((repo, index) => (
              <Card
                key={repo.id}
                className={`project-card group relative overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:-rotate-1 hover:shadow-2xl hover:shadow-accent/20 ${
                  isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
                }`}
                style={{ 
                  animationDelay: isVisible ? `${index * 0.15}s` : '0s',
                  transformStyle: 'preserve-3d'
                }}
                onMouseEnter={() => setHoveredProject(repo.name)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project image with smart category detection */}
                <div className="relative h-48 overflow-hidden transition-all duration-500 group-hover:scale-110">
                  <img 
                    src={getProjectImage(repo)} 
                    alt={`${repo.name} project`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                  
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <CardHeader className="relative z-10">
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-accent transition-colors flex items-center justify-between">
                    {repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    <Activity className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {repo.description || 'No description available'}
                  </CardDescription>
                  <div className="text-xs text-muted-foreground">
                    Updated: {formatDate(repo.updated_at)}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 relative z-10">
                  {/* Language and topics */}
                  <div className="flex flex-wrap gap-2">
                    {repo.language && (
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">
                        {repo.language}
                      </span>
                    )}
                    {repo.topics.slice(0, 3).map((topic) => (
                      <span 
                        key={topic}
                        className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full border border-border hover:border-accent hover:bg-accent/10 hover:text-accent transition-all duration-300"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>


                  {/* Action button */}
                  <div className="pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full glass-card border-border hover:border-accent hover:bg-accent/5 group/btn transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
                      asChild
                    >
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform duration-300" />
                        <span className="group-hover/btn:text-accent transition-colors">View Repository</span>
                      </a>
                    </Button>
                  </div>
                </CardContent>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg"></div>
              </Card>
            ))}
          </div>
        )}

        {/* Enhanced CTA */}
        <div className="text-center mt-16">
          <Button
            variant="outline"
            size="lg"
            className="glass-card border-border hover:border-accent px-8 py-3 rounded-full group hover:shadow-xl hover:shadow-accent/20 transition-all duration-300"
            asChild
          >
            <a href="https://github.com/Navin45" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              <span className="group-hover:text-accent transition-colors">View All Repositories</span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;