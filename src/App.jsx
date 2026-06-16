import { useEffect } from 'react';
import { useScrollReveal, useScrollSpy } from './hooks/useEffects';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Education from './components/Education';
import Contact from './components/Contact';

const sectionIds = ['projects', 'resume', 'education', 'contact'];

export default function App() {
  const activeSection = useScrollSpy(sectionIds);

  useScrollReveal();

  // Re-observe on route/content change
  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );
      document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <Navbar activeSection={activeSection} />
      <main>
        <Hero />
        <TechStack />
        <Projects />
        <Resume />
        <Education />
        <Contact />
      </main>
    </div>
  );
}

