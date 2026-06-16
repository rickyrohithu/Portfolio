import { FiMail, FiPhone, FiArrowUp } from 'react-icons/fi';
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-dark-surface">
      <div className="max-w-3xl mx-auto text-center">
        <div className="reveal">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">
            Let&apos;s work <span className="gradient-text">together.</span>
          </h2>
          <p className="text-lg mb-10 text-gray-400">
            Have a project in mind? Let&apos;s build something amazing.
          </p>
        </div>

        <div className="reveal flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
          <div className="flex items-center gap-3 text-gray-300">
            <FiMail className="text-accent" size={20} />
            <span className="text-sm">rohithsomireddy939@email.com</span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-600" />
          <div className="flex items-center gap-3 text-gray-300">
            <FiPhone className="text-accent" size={20} />
            <span className="text-sm">+91 7569141476</span>
          </div>
        </div>

        <div className="reveal mb-16">
          <a
            href="mailto:rohithsomireddy939@email.com"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-semibold text-base transition-all duration-300 hover:bg-accent-hover hover:scale-105 hover:shadow-lg hover:shadow-accent/30 animate-pulse-glow"
          >
            <FiMail size={18} />
            Contact me
          </a>
        </div>

        {/* Back to top */}
        <div className="reveal mb-16">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 text-sm transition-colors cursor-pointer hover:text-accent text-gray-500"
          >
            <FiArrowUp size={14} />
            Back to top
          </button>
        </div>

        {/* Footer */}
        <footer className="pt-8 border-t border-dark-border/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              © 2026 Somireddy Rohith Reddy. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: FaGithub, href: 'https://github.com/rickyrohithu', label: 'GitHub' },
                { icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/rohith-reddy-somireddy-bb594b298/', label: 'LinkedIn' },
                { icon: FaTwitter, href: 'https://twitter.com/placeholder', label: 'Twitter' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-lg transition-all duration-300 hover:scale-110 text-gray-500 hover:text-accent hover:bg-white/5"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
