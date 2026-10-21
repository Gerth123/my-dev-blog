import type {ReactNode} from 'react';
// import profileImage from '@site/static/img/profile.jpg';

import styles from './hero.module.css';

export default function Hero(): ReactNode {
  return (
    <section id="about" className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.intro}>
          <p className={styles.greeting}>Hey there. 👋 I am</p>
          <h1 className={styles.name}>Robin Gerth</h1>
          <p className={styles.title}>Full Stack Developer</p>
        </div>

        {/* <img className={styles.image} src={profileImage} alt="Robin Gerth" /> */}
        <div className={styles.image} aria-hidden="true" />

        <div className={styles.about}>
          <p>
            I switched from police work to software development because I love building things
            that solve real problems. Today I work as a full stack developer with Shopware,
            Angular and Django, and I automate everything that runs more than twice. Right now
            I am deep into DevSecOps, containers and AI integration.
          </p>
          <a className={styles.button} href="#contact">
            Contact me
          </a>
        </div>
      </div>
    </section>
  );
}