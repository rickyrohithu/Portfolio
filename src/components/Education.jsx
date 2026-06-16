import { FaGraduationCap } from 'react-icons/fa';
import { FiMapPin, FiCalendar, FiAward } from 'react-icons/fi';

const educationData = [
  {
    institution: 'Vardhaman College of Engineering',
    degree: 'B.Tech in Computer Science & Engineering',
    location: 'Hyderabad, Telangana',
    year: '2023 — 2027',
    stat: '8.2 CGPA',
    highlights: [
      'Runner up Hack with Gemini',
      'Active in coding clubs and hackathons',
      'Specialized in full-stack development & Datascience',
    ],
  },
];

export default function Education() {
  const edu = educationData[0];

  return (
    <section id="education" className="py-24 px-6 bg-dark-bg">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            <span className="gradient-text">Education</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">My academic journey</p>
        </div>

        {/* Single BTech card — premium design */}
        <div className="reveal max-w-2xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-dark-border/50 bg-dark-card transition-all duration-500 ease-out hover:-translate-y-2 hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/10">
            {/* Top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-accent via-[#ff6688] to-accent" />

            <div className="p-8 sm:p-10">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-accent/15 flex items-center justify-center shrink-0">
                  <FaGraduationCap className="text-accent" size={26} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {edu.degree}
                  </h3>
                  <p className="text-sm font-medium mt-0.5 text-accent/80">
                    {edu.institution}
                  </p>
                </div>
              </div>

              {/* Meta info pills */}
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-dark-surface text-gray-300">
                  <FiMapPin size={12} className="text-accent" />
                  {edu.location}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-dark-surface text-gray-300">
                  <FiCalendar size={12} className="text-accent" />
                  {edu.year}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-accent/15 text-accent">
                  <FiAward size={12} />
                  {edu.stat}
                </span>
              </div>

              {/* Divider */}
              <div className="h-px w-full mb-6 bg-dark-border/50" />

              {/* Highlights */}
              <div className="space-y-3">
                {edu.highlights.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    <p className="text-sm text-gray-400">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
