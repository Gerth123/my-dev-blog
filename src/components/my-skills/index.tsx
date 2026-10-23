import {useState} from 'react';
import type {ReactNode, UIEvent} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

import {skills} from './skills';
import type {Skill} from './skills';
import styles from './my-skills.module.css';

const SKILLS_PER_PAGE = 3;
const pages: Skill[][] = [];
for (let i = 0; i < skills.length; i += SKILLS_PER_PAGE) {
  pages.push(skills.slice(i, i + SKILLS_PER_PAGE));
}

export default function MySkills(): ReactNode {
  const [activePage, setActivePage] = useState(0);
  const iconBase = useBaseUrl('/img/skills/');

  // Track the visible slider page on mobile
  const onScroll = (event: UIEvent<HTMLUListElement>): void => {
    const {scrollLeft, clientWidth} = event.currentTarget;
    setActivePage(Math.round(scrollLeft / clientWidth));
  };

  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.content}>
        <h2 className={styles.heading}>My skills</h2>

        <ul className={styles.slider} onScroll={onScroll}>
          {pages.map((page, index) => (
            <li key={index} className={styles.page}>
              {page.map((skill) => (
                <div key={skill.name} className={styles.skill} tabIndex={0}>
                  <img className={styles.icon} src={`${iconBase}${skill.icon}`} alt="" />
                  <span className={styles.name}>{skill.name}</span>
                  <div className={styles.details}>
                    <p className={styles.detailsTitle}>How I used this skill</p>
                    <ul>
                      {skill.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </li>
          ))}
        </ul>

        <div className={styles.dots} aria-hidden="true">
          {pages.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${index === activePage ? styles.active : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}