import React from 'react';
import styles from './GalaxyPage.module.css';
import GalaxyWidget from '../../widgets/GalaxyWidget/GalaxyWidget';
import GalaxyInfoSection from '../GalaxyInfoSection/GalaxyInfoSection';
import PlanetsSection from '../PlanetsSection/PlanetsSection';
import SpacecraftSection from '../SpacecraftSection/SpacecraftSection';
import SpacecraftHistorySection from '../SpacecraftSection/SpacecraftHistorySection';

const GalaxyPage = () => {
  return (
    <div className={styles.page}>
      <section className={styles.hero} id="main">
        <GalaxyWidget />
        <div className={styles.fadeBottom} />
      </section>
      <GalaxyInfoSection />
      <PlanetsSection />
      <SpacecraftHistorySection />
      <SpacecraftSection />
    </div>
  );
};

export default GalaxyPage; 