import { useState, useEffect, useRef, useCallback } from 'react';

const rotatingTexts = [
  { text: "builds robust\nAPI services.", highlight: "API" },
  { text: "builds scalable\nsystems.", highlight: "scalable" },
  { text: "is a passionate\nproblem solver.", highlight: "problem solver" },
  { text: "designs scalable\narchitectures.", highlight: "scalable" },
];

export default function Hero() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const heroRef = useRef(null);
  const blobRef = useRef(null);
  const animFrameRef = useRef(null);
  const blobPos = useRef({ x: -200, y: -200 });
  const targetPos = useRef({ x: -200, y: -200 });

  // Dynamic typewriter for the rotating part
  const currentRotating = rotatingTexts[currentIdx];
  const fullDynamicText = `who\n${currentRotating.text}`;

  const [typedDynamic, setTypedDynamic] = useState('');
  const [phase, setPhase] = useState('typing');

  useEffect(() => {
    let timeout;
    const fullText = fullDynamicText;

    if (phase === 'typing') {
      if (typedDynamic.length < fullText.length) {
        timeout = setTimeout(() => {
          setTypedDynamic(fullText.substring(0, typedDynamic.length + 1));
        }, 55);
      } else {
        setPhase('paused');
      }
    } else if (phase === 'paused') {
      timeout = setTimeout(() => {
        setPhase('deleting');
      }, 3000);
    } else if (phase === 'deleting') {
      const prefixLen = "who\n".length;
      if (typedDynamic.length > prefixLen) {
        timeout = setTimeout(() => {
          setTypedDynamic(fullText.substring(0, typedDynamic.length - 1));
        }, 25);
      } else {
        setCurrentIdx((prev) => (prev + 1) % rotatingTexts.length);
        setPhase('typing');
      }
    }

    return () => clearTimeout(timeout);
  }, [typedDynamic, fullDynamicText, currentIdx, phase]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Mouse blob follow effect
  const handleMouseMove = useCallback((e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    targetPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const [blobVisible, setBlobVisible] = useState(false);

  const handleMouseEnter = useCallback((e) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      blobPos.current = { x, y };
      targetPos.current = { x, y };
    }
    setBlobVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setBlobVisible(false);
  }, []);

  // Smooth blob animation using requestAnimationFrame
  useEffect(() => {
    const animate = () => {
      blobPos.current.x += (targetPos.current.x - blobPos.current.x) * 0.1;
      blobPos.current.y += (targetPos.current.y - blobPos.current.y) * 0.1;

      if (blobRef.current) {
        blobRef.current.style.left = `${blobPos.current.x - 75}px`;
        blobRef.current.style.top = `${blobPos.current.y - 75}px`;
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Render the dynamic text with highlighting
  const renderDynamicText = () => {
    const text = typedDynamic;
    const highlightWord = currentRotating.highlight;
    const lines = text.split('\n');

    return lines.map((line, lineIdx) => {
      if (lineIdx > 0) {
        const hIdx = line.indexOf(highlightWord);
        if (hIdx !== -1 && line.length >= hIdx + highlightWord.length) {
          return (
            <span key={lineIdx}>
              <br />
              <span className="hero-line">{line.substring(0, hIdx)}</span>
              <span className="hero-highlight">{line.substring(hIdx, hIdx + highlightWord.length)}</span>
              <span className="hero-line">{line.substring(hIdx + highlightWord.length)}</span>
            </span>
          );
        }
        return (
          <span key={lineIdx}>
            <br />
            <span className="hero-line">{line}</span>
          </span>
        );
      }
      return <span key={lineIdx} className="hero-line">{line}</span>;
    });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="hero-section"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Blob overlay — overflow:hidden lives here, not on the section */}
      <div className="hero-blob-overlay">
        <div
          ref={blobRef}
          className="hero-blob"
          style={{
            opacity: blobVisible ? 1 : 0,
            left: '-200px',
            top: '-200px',
          }}
        />
      </div>

      <div className="hero-content">
        <h1 className="hero-heading">
          <span className="hero-line">Hi,I'm Rohith Somireddy,</span>
          <br />
          <span className="hero-line">a Software </span>
          <span className="hero-highlight">Developer</span>
          <br />
          {renderDynamicText()}
          <span
            className="hero-cursor"
            style={{ opacity: cursorVisible ? 1 : 0 }}
          >
            |
          </span>
        </h1>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator">
        <div className="hero-scroll-mouse">
          <div className="hero-scroll-wheel" />
        </div>
        <span className="hero-scroll-text">Scroll down</span>
        <svg className="hero-scroll-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3v10M3 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
