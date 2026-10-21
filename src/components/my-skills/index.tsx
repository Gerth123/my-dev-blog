import {useState} from 'react';
import type {ReactNode, UIEvent} from 'react';

import styles from './my-skills.module.css';

interface Skill {
  name: string;
  details: string[];
}

const skills: Skill[] = [
  {name: 'HTML', details: ['Semantic page structure', 'Accessible markup', 'SEO basics']},
  {name: 'CSS', details: ['Responsive layouts with Flexbox and Grid', 'CSS Modules', 'Transitions and hover effects']},
  {name: 'Static site generator', details: ['Docusaurus sites and blogs', 'Markdown and MDX docs', 'Deployment to GitHub Pages']},
  {name: 'Python', details: ['Django and DRF APIs', 'Scripting and automation', 'Dependency management']},
  {name: 'Shell scripting', details: ['Bash scripts for automation', 'Linux server administration', 'SSH and remote workflows']},
  {name: 'YAML', details: ['GitHub Actions workflows', 'Docker Compose files', 'Configuration management']},
  {name: 'Container', details: ['Dockerfiles and multi stage builds', 'Docker Compose setups', 'Images on GHCR']},
  {name: 'CI/CD with GitHub Actions', details: ['Build and test pipelines', 'Automated deployments via SSH', 'Secrets handling']},
  {name: 'IT Security', details: ['OWASP Top 10 with Juice Shop', 'Secrets in environment files', 'Hardened server setups']},
];

const SKILLS_PER_PAGE = 3;
const pages: Skill[][] = [];
for (let i = 0; i < skills.length; i += SKILLS_PER_PAGE) {
  pages.push(skills.slice(i, i + SKILLS_PER_PAGE));
}

export default function MySkills(): ReactNode {
  const [activePage, setActivePage] = useState(0);

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
                <div key={skill.name} className={styles.skill}>
                  <div className={styles.icon} aria-hidden="true" />
                  <span className={styles.name}>{skill.name}</span>
                  <ul className={styles.details}>
                    {skill.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
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