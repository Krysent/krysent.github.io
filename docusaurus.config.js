// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {
  themes as prismThemes
} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'krysent-blog',
  tagline: '个人博客',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://krysent.github.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Krysent', // Usually your GitHub org/user name.
  projectName: 'krysent.github.io', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  onBrokenLinks: 'warn',
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
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        // {
        //   sidebarPath: './sidebars.js',
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'notes',
        path: 'docs/notes',
        routeBasePath: 'docs/notes',
        sidebarPath: require.resolve('./sidebars.js')
      }
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'interview',
        path: 'docs/interview',
        routeBasePath: 'docs/interview',
        sidebarPath: require.resolve('./sidebars.js')
      }
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'project_issue',
        path: 'docs/project_issue',
        routeBasePath: 'docs/project_issue',
        sidebarPath: require.resolve('./sidebars.js')
      }
    ],
  ],



  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: '前端开发-Krysent',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'tutorialSidebar',
          //   position: 'left',
          //   label: '学习笔记',
          // },

          {
            type: 'doc',
            docId: 'intro', // 对应 demo1/index.md
            docsPluginId: 'notes', // 指定插件 ID
            position: 'left',
            label: '学习笔记',
          },
          {
            type: 'doc',
            docId: 'intro', // 对应 demo2/index.md
            docsPluginId: 'interview', // 指定插件 ID
            position: 'left',
            label: '面试题整理',
          },
          {
            type: 'doc',
            docId: 'intro', // 对应 demo1/index.md
            docsPluginId: 'project_issue', // 指定插件 ID
            position: 'left',
            label: '项目问题',
          },
        
          {
            to: '/blog',
            label: '日志',
            position: 'left'
          },
          {
            href: 'https://github.com/facebook/docusaurus',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [{
            title: 'Community',
            items: [{
                label: 'React官网',
                href: 'https://zh-hans.react.dev/',
              },
              {
                label: 'React源码解析',
                href: 'https://github.com/7kms/react-illustration-series?tab=readme-ov-file',
              },
              {
                label: 'React Router',
                href: 'https://reactrouter.com.cn/home',
              },
              {
                label: '稀土掘金',
                href: 'https://juejin.cn/',
              },
            ],
          },
          {
            title: 'DOCS',
            items: [{
                label: 'Docusaurus.io',
                href: 'https://docusaurus.io/',
              },
              {
                label: 'X',
                href: 'https://x.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [{
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        copyright: `Copyright © New ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      // algolia: {
      //   // The application ID provided by Algolia
      //   appId: 'YOUR_APP_ID',
  
      //   // Public API key: it is safe to commit it
      //   apiKey: 'YOUR_SEARCH_API_KEY',
  
      //   indexName: 'YOUR_INDEX_NAME',
  
      //   // Optional: see doc section below
      //   contextualSearch: true,
  
      //   // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      //   externalUrlRegex: 'external\\.com|domain\\.com',
  
      //   // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
      //   replaceSearchResultPathname: {
      //     from: '/docs/', // or as RegExp: /\/docs\//
      //     to: '/',
      //   },
  
      //   // Optional: Algolia search parameters
      //   searchParameters: {},
  
      //   // Optional: path for search page that enabled by default (`false` to disable it)
      //   searchPagePath: 'search',
  
      //   // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
      //   insights: false,
  
      //   //... other Algolia params
      // },
    }),
};

export default config;