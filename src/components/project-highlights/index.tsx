import {useState} from 'react';
import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {skills} from '@site/src/components/my-skills/skills';

import styles from './project-highlights.module.css';

interface Project {
  title: string;
  image: string;
  technologies: string[];
  description: string;
  docsPath: string;
  githubUrl: string;
}

const projects: Project[] = [
  {
    title: 'Conduit Deployment',
    image: 'conduit-deployment.jpg',
    technologies: ['Container', 'CI/CD with GitHub Actions', 'YAML'],
    description:
      'I containerized a legacy Django and Angular blogging platform with multi stage builds and patched an outdated Django version to run on modern Python. Every push to main now builds the images, pushes them to GHCR and deploys them to my cloud server via SSH.',
    docsPath: '/docs/projects/conduit-deployment',
    githubUrl: 'https://github.com/Gerth123/conduit-container/tree/feature/conduit-deployment',
  },
  {
    title: 'Truck Signs API',
    image: 'truck-signs-api.jpg',
    technologies: ['Python', 'Container', 'CI/CD with GitHub Actions'],
    description:
      'I took over a Django REST backend with broken Docker files and debugged them instead of starting from scratch. I updated the project to Python 3.12 and Django 5.2, moved all configuration into environment variables and added linting and tests to the CI pipeline.',
    docsPath: '/docs/projects/truck-signs-api',
    githubUrl: 'https://github.com/Gerth123/truck-signs-api/tree/feature/truck-signs-api-v2',
  },
  {
    title: 'Juice Shop Meister',
    image: 'juice-shop-meister.jpg',
    technologies: ['IT Security', 'Container', 'Shell scripting'],
    description:
      'I attacked the OWASP Juice Shop in my own Kali Linux lab and documented every step: logging in as admin, finding the hidden admin section and an XSS attack via the API. It showed me how small gaps in input validation turn into real security risks.',
    docsPath: '/docs/projects/juice-shop-master',
    githubUrl: 'https://github.com/Gerth123/my-dev-blog/tree/main/docs/projects/juice-shop-master',
  },
  {
    title: 'V-Server Setup',
    image: 'v-server-setup.jpg',
    technologies: ['Shell scripting', 'IT Security'],
    description:
      'I set up an Ubuntu server from scratch and secured it with SSH key authentication only. I configured NGINX to serve a static site on a separate port and connected the server to GitHub with its own dedicated SSH key.',
    docsPath: '/docs/projects/v-server-setup',
    githubUrl: 'https://github.com/Gerth123/my-dev-blog/tree/main/docs/projects/v-server-setup',
  },
  {
    title: 'Docusaurus Blog',
    image: 'docusaurus-blog.jpg',
    technologies: ['Static site generator', 'YAML', 'CI/CD with GitHub Actions'],
    description:
      'The site you are looking at. I turned a Docusaurus template into my learning journal and portfolio, built the portfolio as typed React components and deploy every change to GitHub Pages through my own GitHub Actions workflow.',
    docsPath: '/docs/projects/docusaurus-blog',
    githubUrl: 'https://github.com/Gerth123/my-dev-blog',
  },
];

const MORE_PROJECTS_PATH = '/docs/projects/overview';
const cornerArrow = (
  <svg width="20" height="16" viewBox="0 0 20 16" aria-hidden="true">
    <path d="M2 0v11h15M13 7l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export default function ProjectHighlights(): ReactNode {
  const [activeIndex, setActiveIndex] = useState(0);
  const iconBase = useBaseUrl('/img/skills/');
  const imageBase = useBaseUrl('/img/projects/');

  // Badges prefer the dark icon variant for light backgrounds
  const badgeIcon = (name: string): string | undefined => {
    const skill = skills.find((s) => s.name === name);
    return skill && `${iconBase}${skill.badgeIcon ?? skill.icon}`;
  };

  return (
    <section id="projects" className={styles.highlights}>
      <div className={styles.content}>
        <h2 className={styles.heading}>My project highlights</h2>

        <div className={styles.layout}>
          <nav className={styles.list}>
            <ol>
              {projects.map((project, index) => (
                <li
                  key={project.title}
                  className={index === activeIndex ? styles.activeItem : undefined}>
                  <button className={styles.item} onClick={() => setActiveIndex(index)}>
                    {project.title}
                  </button>
                </li>
              ))}
            </ol>
            <Link className={styles.more} to={MORE_PROJECTS_PATH}>
              {cornerArrow}
              <span>see more projects</span>
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
                    {project.technologies.map((technology) => {
                      const icon = badgeIcon(technology);
                      return (
                        <li key={technology} className={styles.badge}>
                          {icon && <img className={styles.badgeIcon} src={icon} alt="" />}
                          {technology}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <img
                  className={styles.image}
                  src={`${imageBase}${project.image}`}
                  alt={`Screenshot of ${project.title}`}
                />

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
            {cornerArrow}
            <span>see more projects</span>
          </Link>
        </div>
      </div>
    </section>
  );
}