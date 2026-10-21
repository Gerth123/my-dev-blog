export interface Skill {
  name: string;
  icon: string;
  badgeIcon?: string;
  details: string[];
}

export const skills: Skill[] = [
  {name: 'HTML', icon: 'html.svg', details: ['Semantic page structure', 'Accessible markup', 'SEO basics']},
  {name: 'CSS', icon: 'css.svg', details: ['Responsive layouts with Flexbox and Grid', 'CSS Modules', 'Transitions and hover effects']},
  {name: 'Static site generator', icon: 'static-site-generator.svg', details: ['Docusaurus sites and blogs', 'Markdown and MDX docs', 'Deployment to GitHub Pages']},
  {name: 'Python', icon: 'python.svg', details: ['Django and DRF APIs', 'Scripting and automation', 'Dependency management']},
  {name: 'Shell scripting', icon: 'shell-scripting.svg', details: ['Bash scripts for automation', 'Linux server administration', 'SSH and remote workflows']},
  {name: 'YAML', icon: 'yaml.svg', badgeIcon: 'yaml-dark.svg', details: ['GitHub Actions workflows', 'Docker Compose files', 'Configuration management']},
  {name: 'Container', icon: 'container.svg', details: ['Dockerfiles and multi stage builds', 'Docker Compose setups', 'Images on GHCR']},
  {name: 'CI/CD with GitHub Actions', icon: 'ci-cd.svg', details: ['Build and test pipelines', 'Automated deployments via SSH', 'Secrets handling']},
  {name: 'IT Security', icon: 'it-security.svg', details: ['OWASP Top 10 with Juice Shop', 'Secrets in environment files', 'Hardened server setups']},
];