import React, { useState } from 'react';
import styles from './GalaxyModel.module.css';

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

const stars = Array.from({ length: 60 }).map((_, i) => {
  const r = getRandom(60, 140);
  const angle = getRandom(0, 2 * Math.PI);
  const x = 150 + Math.cos(angle) * r + getRandom(-6, 6);
  const y = 150 + Math.sin(angle) * r + getRandom(-6, 6);
  const size = getRandom(0.7, 2.5);
  return <circle key={i} cx={x} cy={y} r={size} fill="#fff" opacity={getRandom(0.3, 0.8)} />;
});

const GalaxyModel = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className={styles.galaxyModel}>
      <svg viewBox="0 0 300 300" width="320" height="320" className={styles.svg}>
        <g className={styles.spiral}>
          <circle
            cx="150"
            cy="150"
            r="40"
            fill="#ffe066"
            opacity="0.18"
            style={{ cursor: 'pointer', transition: 'opacity 0.3s' }}
            onClick={() => setShowModal(true)}
            onMouseEnter={e => e.target.setAttribute('opacity', '0.35')}
            onMouseLeave={e => e.target.setAttribute('opacity', '0.18')}
          />
          <path d="M150,150 Q170,100 200,120 Q230,140 210,180 Q190,220 150,200 Q110,180 130,140 Q150,100 190,120" fill="none" stroke="#fff" strokeWidth="3" opacity="0.7" />
          <path d="M150,150 Q130,200 100,180 Q70,160 90,120 Q110,80 150,100 Q190,120 170,160 Q150,200 110,180" fill="none" stroke="#aeefff" strokeWidth="2" opacity="0.5" />
          <path d="M150,150 Q180,170 220,170 Q260,170 240,210 Q220,250 180,230 Q140,210 160,170 Q180,130 220,150" fill="none" stroke="#ffe066" strokeWidth="2" opacity="0.4" />
          <path d="M150,150 Q120,110 80,100 Q40,90 60,140 Q80,190 130,180 Q180,170 170,120 Q160,70 110,100" fill="none" stroke="#fffbe6" strokeWidth="1.5" opacity="0.3" />
          <ellipse cx="150" cy="150" rx="38" ry="18" fill="#fffbe6" opacity="0.13" />
          <ellipse cx="150" cy="150" rx="22" ry="10" fill="#ffe066" opacity="0.18" />
          <circle cx="150" cy="150" r="18" fill="#fffbe6" opacity="0.8" style={{ pointerEvents: 'none' }} />
          <circle cx="150" cy="150" r="7" fill="#ffe066" opacity="0.8" style={{ pointerEvents: 'none' }} />
          {stars}
        </g>
      </svg>
      {showModal && (
        <div style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.65)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
          onClick={() => setShowModal(false)}
        >
          <div style={{
            background: '#181818',
            borderRadius: 18,
            padding: '32px 36px',
            boxShadow: '0 4px 32px #000a',
            color: '#ffe066',
            maxWidth: 420,
            fontSize: 18,
            lineHeight: 1.6,
            position: 'relative',
            border: '2px solid #ffe06655',
            fontFamily: 'Montserrat, Arial, sans-serif',
            textAlign: 'center',
            cursor: 'auto'
          }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ fontSize: 26, fontWeight: 700, marginBottom: 12, color: '#fff' }}>
              Сверхмассивная чёрная дыра
            </div>
            В центре нашей галактики находится сверхмассивная чёрная дыра — Стрелец A*. Её масса превышает массу Солнца в 4 миллиона раз! Чёрные дыры не излучают свет, но их присутствие можно определить по движению звёзд и излучению окружающего газа. Такие объекты играют ключевую роль в эволюции галактик.
            <div style={{ marginTop: 24 }}>
              <button style={{
                background: '#ffe066',
                color: '#181818',
                border: 'none',
                borderRadius: 8,
                padding: '8px 22px',
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 2px 8px #0004',
                marginTop: 8
              }}
                onClick={() => setShowModal(false)}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalaxyModel; 