const path = require('path')

module.exports = {
  clientRootMixin: path.resolve(__dirname, 'mixin.js'),
  markdown: {
    toc: {
      includeLevel: [2, 3, 4]
    }
  },
  plugins: [
    [
      'vuepress-plugin-zooming',
      {
        selector: '.page p img',
        delay: 1000,
        options: {
          bgColor: 'black',
          zIndex: 10000,
          customSize: '100%',
        },
      },
    ],
  ],
  head: [
    ['script', {src: 'https://kit.fontawesome.com/1b98495d92.js', crossorigin: 'anonymous'}]
  ],
  title: "Ionoid IoT Documentation",
  dahboardUrl: "https://dashboard-dev.ionoid.io",
  themeConfig: {
    logo: '/brand.png',
    nav: [
      { text: 'Docs', link: '/docs/introduction.md' },
      { text: 'Create Account', link: 'https://dashboard.ionoid.io/register' },
      { text: 'Sign in', link: 'https://dashboard.ionoid.io/login' },
      { text: 'Contact', link: 'https://ionoid.io/contact/' },
      { text: 'Github', link: 'https://github.com/ionoid/docs.ionoid.io' }
    ],
    sidebar: [
      {
        title: 'Ionoid.io Docs',
        collapsable: false,
        children: [
          {
            title: 'Introduction',
            path: '/docs/introduction.md'
          },
          {
            title: 'Getting Started',
            path: '/docs/getting-started.md'
          },
          {
            title: 'Create Projects',
            path: '/docs/create-projects.md'
          },
          {
            title: 'Register Devices',
            path: '/docs/register-devices.md'
          },
          {
            title: 'Monitor and Manage Devices',
            path: '/docs/monitor-and-manage-devices.md'
          },
          {
            title: 'Deploy IoT Apps',
            path: '/docs/deploy-iot-apps.md'
          },
          {
            title: 'IoT Apps Architecture',
            path: '/docs/iot-apps-architecture.md'
          },
          {
            title: 'IoT Apps Basic Examples',
            path: '/docs/iot-apps-basic-examples.md'
          },
          {
            title: 'Organizations and Collaboration',
            path: '/docs/organizations-and-collaboration.md'
          },
          {
            title: 'Debug IoT Devices',
            path: '/docs/debug-iot-devices.md'
          },
          {
            title: 'Flash OS Image to Storage',
            path: '/docs/flash-os-image-to-storage.md'
          },
          {
            title: 'Supported Boards and OS',
            path: '/docs/supported-boards-and-os.md'
          },
          {
            title: 'Dashboard Structure',
            path: '/docs/dashboard-structure.md'
          },
          {
            title: 'FAQ',
            path: '/docs/faq.md'
          },
          {
            title: 'Impressum',
            path: '/docs/impressum.md'
          },
          {
            title: 'Legal',
            path: '/docs/legal.md'
          }
        ]
      }
    ]
  }
}
