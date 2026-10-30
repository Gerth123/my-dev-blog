import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {config as dotenvconfig}  from "dotenv";

dotenvconfig();

const gitRepositoryUrl =
  process.env.GIT_REPOSITORY_URL ??
  'https://github.com/Gerth123/my-dev-blog';

const templateRepositoryUrl =
  process.env.TEMPLATE_REPOSITORY_URL ??
  'https://github.com/Developer-Akademie-DevSecOpsKurs/dev-blog-template';

const config: Config = {
  title: 'Robin Gerth',
  tagline: 'Full Stack Developer | DevSecOps',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: process.env.DEPLOYMENT_URL ?? "https://gerth123.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: process.env.BASE_URL ?? "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: process.env.GITHUB_ORG, // Usually your GitHub org/user name.
  projectName: process.env.GITHUB_PROJECT, // Usually your repo name.

  deploymentBranch: process.env.DEPLOYMENT_BRANCH,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            gitRepositoryUrl
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.jpg',
    navbar: {
      title: 'Robin Gerth',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Projects',
        },
        {
          href: gitRepositoryUrl,
          label: 'Github',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Projects',
              to: '/docs/projects/overview',
            },

          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Website',
              href: 'https://robin-gerth.de',
            },
            {
              label: 'GitHub',
              href: gitRepositoryUrl,
            },
            {
              label: 'Template',
              href: templateRepositoryUrl,
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Robin Michael Gerth (Gerth123). Extended from the developer-akademie-starter. Built with Docusaurus and 💚`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['powershell', 'hcl'],
      magicComments: [
        // Remember to extend the default highlight class name as well!
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: {start: 'highlight-start', end: 'highlight-end'},
        },
        {
          className: 'code-block-error-line',
          line: 'This will error',
        },
      ],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;