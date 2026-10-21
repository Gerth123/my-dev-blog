import {useState} from 'react';
import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';

import styles from './project-highlights.module.css';

interface Project {
  title: string;
  technologies: string[];
  description: string;
  docsPath: string;
  githubUrl: string;
}

const projects: Project[] = [
  {
    title: 'Juice Shop Meister',
    technologies: ['IT Security', 'Container', 'Shell scripting'],
    description:
      'I attacked the OWASP Juice Shop in my own Kali Linux lab and documented every step: logging in as admin, finding the hidden admin section and an XSS attack via the API. It showed me how small gaps in input validation turn into real security risks.',
    docsPath: '/docs/projects/juice-shop-master',
    githubUrl: 'https://github.com/Gerth123/my-dev-blog/tree/main/docs/projects/juice-shop-master',
  },
  {
    title: 'Docusaurus Blog',
    technologies: ['Static site generator', 'YAML', 'CI/CD'],
    description:
      'The site you are looking at. I turned a Docusaurus template into my learning journal and portfolio, built the portfolio as typed React components and deploy every change to GitHub Pages through my own GitHub Actions workflow.',
    docsPath: '/docs/projects/docusaurus-blog',
    githubUrl: 'https://github.com/Gerth123/my-dev-blog',
  },
];

const MORE_PROJECTS_PATH = '/docs/projects/overview';

export default function ProjectHighlights(): ReactNode {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="projects" className={styles.highlights}>
      <div className={styles.content}>
        <h2 className={styles.heading}>My project highlights</h2>

        <div className={styles.layout}>
          <nav className={styles.list}>
            <ol>
              {projects.map((project, index) => (
                <li key={project.title}>
                  <button
                    className={index === activeIndex ? styles.activeItem : styles.item}
                    onClick={() => setActiveIndex(index)}>
                    {project.title}
                  </button>
                </li>
              ))}
            </ol>
            <Link className={styles.more} to={MORE_PROJECTS_PATH}>
              ↳ see more projects
            </Link>
          </nav>

          <div className={styles.cards}>
            {projects.map((project, index) => (
              <article
                key={project.title}
                className={`${styles.card} ${index === activeIndex ? styles.activeCard : ''}`}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.title}>
                    <span className={styles.number}>{index + 1}. </span>
                    {project.title}
                  </h3>
                  <ul className={styles.badges}>
                    {project.technologies.map((technology) => (
                      <li key={technology} className={styles.badge}>
                        {technology}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.image} aria-hidden="true" />

                <p className={styles.description}>{project.description}</p>

                <div className={styles.buttons}>
                  <Link className={styles.docsButton} to={project.docsPath}>
                    Documentation
                  </Link>
                  <a
                    className={styles.githubButton}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer">
                    GitHub
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.mobileMore}>
          <p>
            Besides these highlights I documented every project of my DevSecOps course, from
            server setup to container deployments.
          </p>
          <Link className={styles.more} to={MORE_PROJECTS_PATH}>
            ↳ see more projects
          </Link>
        </div>
      </div>
    </section>
  );
}