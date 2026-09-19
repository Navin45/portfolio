import { ScrollSyncProvider } from '@/components/ScrollSyncProvider';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <ScrollSyncProvider>
      <div className="min-h-screen bg-[var(--surface-page)] text-[var(--text-primary)]">
        <Navigation />
        <main id="main-content">
          <HeroSection />
          <ProjectsSection />
          <SkillsSection />
          <ExperienceSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </ScrollSyncProvider>
  );
};

export default Index;
