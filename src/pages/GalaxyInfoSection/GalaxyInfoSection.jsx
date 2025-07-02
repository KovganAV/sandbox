import React from 'react';
import styles from './GalaxyInfoSection.module.css';
import GalaxyModel from '../../widgets/GalaxyModel/GalaxyModel';

const GalaxyInfoSection = () => {
  return (
    <section className={styles.section} id="about">
      <div className={styles.left}><GalaxyModel /></div>
      <div className={styles.right}>
        <h2>Млечный Путь</h2>
        <p>
          Млечный Путь — это спиральная галактика, в которой находится наша Солнечная система. Она содержит сотни миллиардов звёзд, газовых и пылевых облаков, а также тёмную материю. Диаметр галактики составляет около 100 000 световых лет, а её возраст оценивается в 13,6 миллиардов лет. Центральная часть Млечного Пути — это плотное звёздное ядро, вокруг которого вращаются рукава галактики.
        </p>
        <p>
          Галактика постоянно вращается, а Солнечная система совершает полный оборот вокруг центра Млечного Пути примерно за 225 миллионов лет. Внутри галактики происходят процессы рождения и гибели звёзд, а также формируются новые планетные системы.
        </p>
      </div>
    </section>
  );
};

export default GalaxyInfoSection; 