import { useEffect, useRef } from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const projects = [
  {
    title: 'Attendance Manager Bot',
    description: 'Developed a fully automated Python-based system using Selenium to track attendance and send real-time absence alerts via Telegram and WhatsApp, scheduled daily with cron for zero manual effort.',
    github: 'https://github.com/rickyrohithu/attendance-bot-vmeg',
    // demo: 'https://demo.placeholder.com',
  },
  {
    title: 'Toon Optimiser',
    description: 'Developed a full-stack GenAI application to optimize LLM token usage using TOON format, reducing costs by up to 52% with robust testing, secure APIs, and reliable JSON-to-TOON conversion.',
    github: 'null',
    demo: null,
  },
  // {
  //   title: 'Fake News Detection',
  //   description: 'ML-powered classifier for news articles using NLP and TF-IDF vectorization with Passive Aggressive Classifier, achieving 93.6% accuracy on 40k+ articles.',
  //   github: 'https://github.com/placeholder',
  //   // demo: 'https://demo.placeholder.com',
  // },
  // {
  //   title: 'PDF Outline Extractor',
  //   description: 'Python CLI tool that extracts table-of-contents outlines from PDFs, supports nested bookmarks, and exports to JSON/Markdown for 500+ page documents.',
  //   github: 'https://github.com/placeholder',
  //   demo: null,
  // },
  // {
  //   title: 'Persona-Driven Document Intelligence',
  //   description: 'Full-stack AI app generating persona-tailored document summaries with FastAPI, React, and Google Gemini API — reduces processing time by 60%.',
  //   github: 'https://github.com/placeholder',
  //   demo: 'https://demo.placeholder.com',
  // },
  {
    title: 'Personal Portfolio',
    description: 'This portfolio! Modern SPA built with React and Tailwind CSS featuring smooth scroll, typewriter animations, and dark/light theme support.',
    github: 'null',
    demo: '#',
  },
];

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    let timeoutId = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const col = index % 3;
          // Clear any active timeout before starting a new one
          if (timeoutId) clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            el.classList.add('project-visible');
          }, col * 120);
        } else {
          if (timeoutId) clearTimeout(timeoutId);
          el.classList.remove('project-visible');
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="project-card group relative rounded-2xl p-6 smooth-card bg-dark-card border border-dark-border/50 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5"
    >
      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
      <span className="text-xs font-mono mb-4 block text-gray-600">
        {String(index + 1).padStart(2, '0')}
      </span>
      <h3 className="text-xl font-bold mb-3 transition-colors duration-500 ease-out text-white group-hover:text-accent">
        {project.title}
      </h3>
      <p className="text-sm leading-relaxed mb-6 text-gray-400">{project.description}</p>
      <div className="flex gap-3 mt-auto">
        <a href={project.github} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-dark-border text-gray-300 hover:border-accent hover:text-accent transition-all duration-500 ease-out hover:scale-105">
          <FiGithub size={14} /> Github
        </a>
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-dark-border text-gray-300 hover:border-accent hover:text-accent transition-all duration-500 ease-out hover:scale-105">
            <FiExternalLink size={14} /> Demo
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="pt-8 pb-24 px-6 bg-dark-bg">
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <div className="text-center mt-16 reveal">
          <a href="https://github.com/rickyrohithu" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 group text-xl font-bold tracking-tight text-white hover:text-accent transition-colors duration-300">
            <FiGithub size={20} className="text-gray-400 group-hover:text-accent transition-colors duration-300 mr-1" />
            <span className="border-b-2 border-transparent group-hover:border-accent transition-all duration-300">
              More on GitHub
            </span>
            <span className="gradient-text transition-transform duration-300 group-hover:translate-x-1.5 inline-block">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
