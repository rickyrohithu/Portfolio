import { useState, useEffect, useRef } from 'react';

const techStack = [
  // Row 1
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', invert: false },
  { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', invert: true },
  { name: 'Tailwind CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', invert: false },
  // { name: 'Express.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', invert: true },
  // Row 2
  { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg', invert: false },
  // { name: 'Spring', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original-wordmark.svg', invert: false },
  // { name: 'C++', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', invert: false },
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', invert: false },
  { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', invert: false },
  // Row 3
  { name: 'C', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.14.0/icons/c/c-original.svg', invert: false },
  { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', invert: false },
  { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', invert: false },
  { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg', invert: false },
  { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg', invert: false },
  // Row 4
  { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', invert: false },
];

export default function TechStack() {
  const scrollTextRef = useRef(null);
  const [visibleWords, setVisibleWords] = useState(0);

  // Split into three distinct lines to match the beautiful Hero section text layout
  const lines = [
    ['Using', 'these', 'latest', 'technologies,'],
    ['I', 'developed'],
    ['things', 'like...']
  ];

  const totalWords = lines.flat().length;

  // Scroll-triggered word reveal linked directly to scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollTextRef.current) return;
      const rect = scrollTextRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start reveal when top of transition section is well inside viewport (85% from top)
      const triggerStart = windowHeight * 0.85;
      // Complete reveal when top of transition section is near the top (20% from top)
      const triggerEnd = windowHeight * 0.2;

      if (rect.top > triggerStart) {
        setVisibleWords(0);
      } else if (rect.top < triggerEnd) {
        setVisibleWords(totalWords);
      } else {
        const progress = 1 - (rect.top - triggerEnd) / (triggerStart - triggerEnd);
        setVisibleWords(Math.ceil(progress * totalWords));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalWords]);

  // Organize into rows
  const rows = [
    techStack.slice(0, 4),
    techStack.slice(4, 9),
    techStack.slice(9, 14),
    techStack.slice(14),
  ];

  return (
    <section id="techstack" className="techstack-section">
      <div className="techstack-container">
        {/* Tech grid */}
        <div className="techstack-grid reveal">
          {rows.map((row, rowIdx) => (
            <div key={rowIdx} className="techstack-row">
              {row.map((tech) => (
                <div key={tech.name} className="techstack-item">
                  <div className="techstack-icon-wrapper">
                    <span className="techstack-name">{tech.name}</span>
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      className={`techstack-logo ${tech.invert ? 'techstack-invert' : ''}`}
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll-reveal transition text */}
      <div ref={scrollTextRef} className="techstack-transition">
        <div className="techstack-transition-content">
          <h2 className="techstack-transition-text">
            {lines.map((lineWords, lineIdx) => (
              <div key={lineIdx} className="techstack-transition-line">
                {lineWords.map((word, wordIdx) => {
                  // Calculate global word index
                  const globalIdx = 
                    lines.slice(0, lineIdx).reduce((acc, curr) => acc + curr.length, 0) + wordIdx;
                  return (
                    <span
                      key={wordIdx}
                      className={`techstack-word ${globalIdx < visibleWords ? 'techstack-word-visible' : ''}`}
                    >
                      {word}
                    </span>
                  );
                })}
              </div>
            ))}
          </h2>
        </div>
      </div>
    </section>
  );
}
