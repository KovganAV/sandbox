import React, { useState, useEffect, useRef } from 'react';
import styles from './PlanetsSection.module.css';
import { planets } from '../../shared/const/planets';
import { DetailedPlanet } from '../../entities/Planet/Planet';
import Satellite from '../../entities/Satellite/Satellite';

const PLANET_EFFECTS = {
  'Юпитер': 'storm',
  'Сатурн': 'rings-glow',
  'Земля': 'aurora',
  'Марс': 'dust',
};

const PlanetsSection = () => {
  const [angle, setAngle] = useState(0);
  const [dragAngle, setDragAngle] = useState({}); // { [planetName]: angle }
  const [dragging, setDragging] = useState(null); // planetName | null
  const [hovered, setHovered] = useState(null);
  const dragStart = useRef({});

  useEffect(() => {
    const interval = setInterval(() => setAngle(a => a + 0.03), 16);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const move = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const delta = clientX - dragStart.current.x;
      setDragAngle(prev => ({
        ...prev,
        [dragging]: dragStart.current.base + delta * 0.8
      }));
    };
    const up = () => setDragging(null);
    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchend', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchend', up);
    };
  }, [dragging]);

  return (
    <section className={styles.section} id="planets">
      {planets.map((planet, i) => {
        const isHovered = hovered === planet.name;
        const effect = PLANET_EFFECTS[planet.name];
        const drag = dragAngle[planet.name] || 0;
        const baseAngle = angle * (1 + i * 0.1) + drag;
        return (
          <div className={styles.row} key={planet.name}>
            {i % 2 === 0 ? (
              <>
                <div className={styles.descLeft}>
                  <h3>{planet.name}</h3>
                  <p>{planet.description}</p>
                </div>
                <div
                  className={styles.planetRight}
                  style={{position: 'relative', minWidth: 180, minHeight: 180}}
                >
                  <div
                    className={styles.planetHoverWrap}
                    onMouseEnter={() => setHovered(planet.name)}
                    onMouseLeave={() => setHovered(null)}
                    onMouseDown={e => {
                      dragStart.current = {
                        x: e.touches ? e.touches[0].clientX : e.clientX,
                        base: dragAngle[planet.name] || 0
                      };
                      setDragging(planet.name);
                    }}
                    onTouchStart={e => {
                      dragStart.current = {
                        x: e.touches ? e.touches[0].clientX : e.clientX,
                        base: dragAngle[planet.name] || 0
                      };
                      setDragging(planet.name);
                    }}
                    style={{
                      transition: dragging === planet.name ? 'none' : 'transform 0.3s, box-shadow 0.3s',
                      transform: isHovered ? 'scale(1.13)' : 'scale(1)',
                      boxShadow: isHovered ? '0 0 60px 18px #ffe06655, 0 0 0 8px #fff2 inset' : '0 0 30px 10px #0006',
                      borderRadius: '50%',
                      cursor: 'grab',
                      display: 'inline-block',
                      position: 'relative',
                    }}
                    title="Потяни, чтобы повернуть"
                  >
                    <DetailedPlanet
                      name={planet.name}
                      color={planet.color}
                      size={140}
                      angle={baseAngle}
                      patternType={planet.patternType}
                      effect={isHovered ? effect : null}
                    />
                  </div>
                  {/* Спутники */}
                  {planet.name === 'Земля' && (() => {
                    const satAngle = angle * 2.2;
                    const zIndex = Math.sin(satAngle) < 0 ? 1 : 3;
                    return (
                      <Satellite
                        size={22}
                        orbit={170}
                        angle={satAngle}
                        color="#e0e0e0"
                        name="Луна"
                        style={{zIndex}}
                      />
                    );
                  })()}
                  {planet.name === 'Марс' && (() => {
                    const sat1Angle = angle * 1.7;
                    const sat2Angle = angle * 2.3 + 1;
                    const zIndex1 = Math.sin(sat1Angle) < 0 ? 1 : 3;
                    const zIndex2 = Math.sin(sat2Angle) < 0 ? 1 : 3;
                    return <>
                      <Satellite size={14} orbit={145} angle={sat1Angle} color="#b7b7b7" name="Фобос" style={{zIndex: zIndex1}} />
                      <Satellite size={10} orbit={120} angle={sat2Angle} color="#d1d1d1" name="Деймос" style={{zIndex: zIndex2}} />
                    </>;
                  })()}
                  {planet.name === 'Юпитер' && (() => {
                    const satAngle = angle * 1.3 + 0.7;
                    const zIndex = Math.sin(satAngle) < 0 ? 1 : 3;
                    return <Satellite size={28} orbit={200} angle={satAngle} color="#fff7e0" name="Ганимед" style={{zIndex}} />;
                  })()}
                  {planet.name === 'Сатурн' && (() => {
                    const satAngle = angle * 1.5 + 1.2;
                    const zIndex = Math.sin(satAngle) < 0 ? 1 : 3;
                    return <Satellite size={24} orbit={185} angle={satAngle} color="#f7e7b6" name="Титан" style={{zIndex}} />;
                  })()}
                  {planet.name === 'Уран' && (() => {
                    const satAngle = angle * 1.8 + 0.4;
                    const zIndex = Math.sin(satAngle) < 0 ? 1 : 3;
                    return <Satellite size={18} orbit={160} angle={satAngle} color="#e0f7fa" name="Титания" style={{zIndex}} />;
                  })()}
                  {planet.name === 'Нептун' && (() => {
                    const satAngle = angle * 2.1 + 2.1;
                    const zIndex = Math.sin(satAngle) < 0 ? 1 : 3;
                    return <Satellite size={16} orbit={150} angle={satAngle} color="#b5e3e3" name="Тритон" style={{zIndex}} />;
                  })()}
                </div>
              </>
            ) : (
              <>
                <div className={styles.planetLeft} style={{position: 'relative', minWidth: 180, minHeight: 180}}>
                  <div
                    className={styles.planetHoverWrap}
                    onMouseEnter={() => setHovered(planet.name)}
                    onMouseLeave={() => setHovered(null)}
                    onMouseDown={e => {
                      dragStart.current = {
                        x: e.touches ? e.touches[0].clientX : e.clientX,
                        base: dragAngle[planet.name] || 0
                      };
                      setDragging(planet.name);
                    }}
                    onTouchStart={e => {
                      dragStart.current = {
                        x: e.touches ? e.touches[0].clientX : e.clientX,
                        base: dragAngle[planet.name] || 0
                      };
                      setDragging(planet.name);
                    }}
                    style={{
                      transition: dragging === planet.name ? 'none' : 'transform 0.3s, box-shadow 0.3s',
                      transform: isHovered ? 'scale(1.13)' : 'scale(1)',
                      boxShadow: isHovered ? '0 0 60px 18px #ffe06655, 0 0 0 8px #fff2 inset' : '0 0 30px 10px #0006',
                      borderRadius: '50%',
                      cursor: 'grab',
                      display: 'inline-block',
                      position: 'relative',
                    }}
                    title="Потяни, чтобы повернуть"
                  >
                    <DetailedPlanet
                      name={planet.name}
                      color={planet.color}
                      size={140}
                      angle={baseAngle}
                      patternType={planet.patternType}
                      effect={isHovered ? effect : null}
                    />
                  </div>
                  {/* Спутники */}
                  {planet.name === 'Земля' && (() => {
                    const satAngle = angle * 2.2;
                    const zIndex = Math.sin(satAngle) < 0 ? 1 : 3;
                    return (
                      <Satellite
                        size={22}
                        orbit={170}
                        angle={satAngle}
                        color="#e0e0e0"
                        name="Луна"
                        style={{zIndex}}
                      />
                    );
                  })()}
                  {planet.name === 'Марс' && (() => {
                    const sat1Angle = angle * 1.7;
                    const sat2Angle = angle * 2.3 + 1;
                    const zIndex1 = Math.sin(sat1Angle) < 0 ? 1 : 3;
                    const zIndex2 = Math.sin(sat2Angle) < 0 ? 1 : 3;
                    return <>
                      <Satellite size={14} orbit={145} angle={sat1Angle} color="#b7b7b7" name="Фобос" style={{zIndex: zIndex1}} />
                      <Satellite size={10} orbit={120} angle={sat2Angle} color="#d1d1d1" name="Деймос" style={{zIndex: zIndex2}} />
                    </>;
                  })()}
                  {planet.name === 'Юпитер' && (() => {
                    const satAngle = angle * 1.3 + 0.7;
                    const zIndex = Math.sin(satAngle) < 0 ? 1 : 3;
                    return <Satellite size={28} orbit={200} angle={satAngle} color="#fff7e0" name="Ганимед" style={{zIndex}} />;
                  })()}
                  {planet.name === 'Сатурн' && (() => {
                    const satAngle = angle * 1.5 + 1.2;
                    const zIndex = Math.sin(satAngle) < 0 ? 1 : 3;
                    return <Satellite size={24} orbit={185} angle={satAngle} color="#f7e7b6" name="Титан" style={{zIndex}} />;
                  })()}
                  {planet.name === 'Уран' && (() => {
                    const satAngle = angle * 1.8 + 0.4;
                    const zIndex = Math.sin(satAngle) < 0 ? 1 : 3;
                    return <Satellite size={18} orbit={160} angle={satAngle} color="#e0f7fa" name="Титания" style={{zIndex}} />;
                  })()}
                  {planet.name === 'Нептун' && (() => {
                    const satAngle = angle * 2.1 + 2.1;
                    const zIndex = Math.sin(satAngle) < 0 ? 1 : 3;
                    return <Satellite size={16} orbit={150} angle={satAngle} color="#b5e3e3" name="Тритон" style={{zIndex}} />;
                  })()}
                </div>
                <div className={styles.descRight}>
                  <h3>{planet.name}</h3>
                  <p>{planet.description}</p>
                </div>
              </>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default PlanetsSection; 