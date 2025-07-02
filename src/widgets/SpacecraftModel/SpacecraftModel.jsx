import React, { useEffect, useRef, useState } from 'react';

const getRandom = (min, max) => Math.random() * (max - min) + min;

const SpacecraftModel = () => {
  const [rotation, setRotation] = useState(0);
  const [skew, setSkew] = useState(0);
  const [diskPhase, setDiskPhase] = useState(0); 
  const [launchCount, setLaunchCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const animRef = useRef();
  const diskRef = useRef();

  useEffect(() => {
    let frame = 0;
    function animate() {
      frame++;
      setRotation(10 * Math.sin(frame / 480));
      setSkew(5 * Math.sin(frame / 360 + 1));
      animRef.current = requestAnimationFrame(animate);
    }
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const handleClick = () => {
    if (diskPhase !== 0) return;
    setDiskPhase(1);
    setLaunchCount(c => {
      if (c + 1 >= 3) setShowModal(true);
      return c + 1;
    });
    diskRef.current = setTimeout(() => {
      setDiskPhase(2);
      diskRef.current = setTimeout(() => setDiskPhase(0), 1800);
    }, 1200);
  };
  useEffect(() => () => clearTimeout(diskRef.current), []);

  return (
    <div style={{ position: 'relative', width: 400, height: 400 }}>
      <svg
        width="400" height="400" viewBox="0 0 400 400"
        style={{
          display: 'block',
          filter: 'drop-shadow(0 0 16px #fff3)',
          cursor: 'pointer',
        }}
        onClick={handleClick}
        title="Кликните, чтобы увидеть Золотую пластину"
      >
        <g
          style={{
            transform: `rotate(${rotation}deg) skewX(${skew}deg)`,
            transformOrigin: '200px 200px',
            transition: 'transform 0.15s cubic-bezier(.4,2,.6,.9)'
          }}
        >
          <rect x="10" y="150" width="80" height="18" fill="#2e3a4d" stroke="#bdbdbd" strokeWidth="3" rx="6" />
          <rect x="310" y="150" width="80" height="18" fill="#2e3a4d" stroke="#bdbdbd" strokeWidth="3" rx="6" />
          <ellipse cx="200" cy="200" rx="110" ry="110" fill="#e0e0e0" stroke="#bdbdbd" strokeWidth="5" />
          <circle cx="200" cy="200" r="12" fill="#888" />
          <rect x="194" y="100" width="12" height="120" fill="#888" rx="3" />
          <rect x="70" y="200" width="140" height="7" fill="#bdbdbd" rx="2" transform="rotate(-18 140 203)" />
          <rect x="70" y="200" width="140" height="7" fill="#bdbdbd" rx="2" transform="rotate(18 140 203)" />
          <rect x="200" y="200" width="110" height="2" fill="#bdbdbd" rx="1" transform="rotate(60 200 200)" />
          <rect x="200" y="200" width="110" height="2" fill="#bdbdbd" rx="1" transform="rotate(-60 200 200)" />
          <circle cx="200" cy="120" r="14" fill="#ffe066" stroke="#bfa600" strokeWidth="3" />
          <rect x="187" y="200" width="26" height="38" fill="#bdbdbd" rx="6" />
          <rect x="198" y="80" width="4" height="18" fill="#bdbdbd" />
          <rect x="212" y="140" width="4" height="28" fill="#bdbdbd" />
          <rect x="184" y="140" width="4" height="28" fill="#bdbdbd" />
          <polyline points="200,240 260,310 280,330" fill="none" stroke="#bdbdbd" strokeWidth="2" />
          <polyline points="200,240 140,310 120,350" fill="none" stroke="#bdbdbd" strokeWidth="2" />
        </g>
      </svg>
      {diskPhase !== 0 && (
        <svg width="60" height="60" viewBox="0 0 60 60" style={{
          position: 'absolute', left: 170, top: 90, zIndex: 10,
          animation: diskPhase === 1 ? 'disk-up 1.2s cubic-bezier(.4,2,.6,.9) forwards' : 'disk-arc 1.8s cubic-bezier(.4,0.7,.6,1) forwards',
          pointerEvents: 'none',
        }}>
          <circle cx="30" cy="30" r="28" fill="#ffe066" stroke="#bfa600" strokeWidth="5" />
          <g stroke="#ff9900" strokeWidth="1.2" strokeLinecap="round">
            <line x1="30" y1="10" x2="30" y2="50" />
            <line x1="15" y1="30" x2="45" y2="30" />
            <line x1="20" y1="20" x2="40" y2="40" />
            <line x1="40" y1="20" x2="20" y2="40" />
            <circle cx="30" cy="30" r="8" fill="none" />
            <rect x="27" y="27" width="6" height="6" fill="none" />
          </g>
        </svg>
      )}
      {showModal && (
        <div style={{
          position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.7)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
          onClick={() => setShowModal(false)}
        >
          <div style={{
            background: '#181818', borderRadius: 18, padding: '32px 36px',
            boxShadow: '0 4px 32px #000a', color: '#ffe066', maxWidth: 420,
            fontSize: 20, lineHeight: 1.6, position: 'relative', border: '2px solid #ffe06655',
            fontFamily: 'Montserrat, Arial, sans-serif', textAlign: 'center', cursor: 'auto', minWidth: 320
          }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ fontSize: 26, fontWeight: 700, marginBottom: 18, color: '#fff' }}>
              Пожалуйста, не трогайте Вояджер
            </div>
            <div style={{ color: '#ffe066', fontSize: 18, marginBottom: 18 }}>
              Ему и так грустно.
            </div>
            <button style={{
              background: '#ffe066', color: '#181818', border: 'none', borderRadius: 8,
              padding: '8px 22px', fontSize: 16, fontWeight: 600, cursor: 'pointer',
              boxShadow: '0 2px 8px #0004', marginTop: 8
            }}
              onClick={() => setShowModal(false)}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
      <style>{`
        @keyframes disk-up {
          0% { transform: scale(1) translateY(0) rotate(0deg); opacity: 1; }
          80% { transform: scale(1.2) translateY(-70px) rotate(10deg); opacity: 1; }
          100% { transform: scale(1.1) translateY(-70px) rotate(0deg); opacity: 1; }
        }
        @keyframes disk-arc {
          0% { transform: scale(1.1) translateY(-70px) rotate(0deg); opacity: 1; }
          60% { transform: scale(1.2) translate(120px, -70px) rotate(30deg); opacity: 1; }
          100% { transform: scale(1.1) translate(400px, -40px) rotate(60deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default SpacecraftModel; 