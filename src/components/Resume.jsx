import { FiExternalLink, FiBriefcase, FiCode } from 'react-icons/fi';

const experiences = [
  {
    role: 'Backend Developer Intern',
    company: 'Ruxstar',
    period: 'June 2026 — Present',
    points: [
      'Built RESTful APIs with Node.js and Express, serving 10k+ daily requests',
      // 'Implemented CI/CD pipelines reducing deployment time by 40%',
      'Collaborated with cross-functional teams on microservices architecture',
    ],
  },
  // {
  //   role: 'Open Source Contributor',
  //   company: 'Various Projects',
  //   period: '2023 — Present',
  //   points: [
  //     'Contributed to multiple open-source repositories with 50+ merged PRs',
  //     'Maintained documentation and helped onboard new contributors',
  //     'Built developer tools used by 500+ developers',
  //   ],
  // },
];

export default function Resume() {
  return (
    <section id="resume" className="py-24 px-6 bg-dark-bg">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            <span className="gradient-text">Resume</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">Experience & qualifications</p>
          <a
            href="https://drive.google.com/file/d/1_cohDQ0Kv_IpFwHB1cxUARa5wep7cSdq/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-full text-sm font-medium border border-accent/50 text-accent transition-all duration-500 ease-out hover:bg-accent/10 hover:scale-105"
          >
            <FiExternalLink size={14} />
            Check Resume
          </a>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="reveal p-6 rounded-2xl border border-dark-border/50 bg-dark-card smooth-card hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl shrink-0 transition-all duration-500 ease-out bg-accent/10">
                  <FiBriefcase className="text-accent" size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                    <h3 className="text-lg font-bold transition-colors duration-500 ease-out text-white">{exp.role}</h3>
                    <span className="text-xs font-mono text-gray-500">{exp.period}</span>
                  </div>
                  <p className="text-sm font-medium mb-3 text-accent/80">{exp.company}</p>
                  <ul className="space-y-2">
                    {exp.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                        <FiCode className="text-accent shrink-0 mt-1" size={12} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
