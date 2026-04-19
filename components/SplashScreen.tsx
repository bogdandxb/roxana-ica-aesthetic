'use client';

import { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [phase, setPhase] = useState<'hidden' | 'visible' | 'fadeout' | 'gone'>('hidden');

  useEffect(() => {
    if (window.innerWidth < 768) {
      setPhase('gone');
      return;
    }
    setPhase('visible');
    const fadeTimer = setTimeout(() => setPhase('fadeout'), 1000);
    const removeTimer = setTimeout(() => setPhase('gone'), 1900);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (phase === 'gone' || phase === 'hidden') return null;

  return (
    <div
      onClick={() => setPhase('gone')}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '16px',
        opacity: phase === 'fadeout' ? 0 : 1,
        transition: 'opacity 0.9s ease',
        pointerEvents: phase === 'fadeout' ? 'none' : 'all',
        cursor: 'pointer',
      }}
    >
      <style>{`
        @keyframes titleIn {
          from { opacity: 0; transform: scale(0.94); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes sloganIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .splash-title {
          animation: titleIn 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 300;
          font-size: clamp(2rem, 6vw, 4rem);
          letter-spacing: 0.12em;
          text-align: center;
          background: linear-gradient(135deg, #D4AF37, #C9A84C, #8B6914);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .splash-slogan {
          animation: sloganIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.6s both;
          font-family: 'Montserrat', sans-serif;
          font-weight: 300;
          font-size: clamp(0.65rem, 1.8vw, 0.85rem);
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #C6A769;
          text-align: center;
        }
        .splash-line {
          animation: sloganIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both;
          width: 60px;
          height: 1px;
          background: linear-gradient(135deg, #D4AF37, #8B6914);
          margin: 4px auto;
        }
      `}</style>

      <h1 className="splash-title">Roxana Ica Aesthetic</h1>
      <div className="splash-line" />
      <p className="splash-slogan">Diferența Care Se Simte</p>
    </div>
  );
}
