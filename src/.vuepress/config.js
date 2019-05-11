module.exports = {
  title: '远洋的网络空间',

  description: '远洋的网络空间',

  head: [
    ['link', { rel: 'icon', href: '/assets/img/avatar.jpg' }],
  ],

  locales: {
    '/': {
      lang: 'zh-CN',
    },
  },

  theme: 'vuepress-theme-hoperyy',

  themeConfig: {
    lang: Object.assign(require('vuepress-theme-hoperyy/lib/langs/zh-CN'), {
      home: `远洋的网络空间`,
      posts: 'My Posts',
    }),

    personalInfo: {
      nickname: 'hoperyy',
      description: 'FE / Node',
      location: '中国 · 杭州',

      avatar: '/assets/img/avatar.jpg',

      sns: {
        github: {
          account: 'hoperyy',
          link: 'https://github.com/hoperyy',
        },
        weibo: {
          account: '@焦炭君_Meteor',
          link: 'https://weibo.com/u/2039655434',
        },
      },
    },

    headerBackground: {
      // url: '/assets/img/bg.jpg',

      useGeo: true,
    },

    nav: [
      { text: 'Home', link: '/', exact: true },
      { text: 'Posts', link: '/posts/', exact: false  },
      { text: 'Projects', link: '/projects/', exact: false  }, 
      { text: '知识体系', link: '/knowledges/', exact: false }, 
    ],

    comments: {
      platform: 'github',
      owner: 'hoperyy',
      repo: 'hoperyy.github.io',
      clientId: '960bbc7e80512b06153e',
      clientSecret: 'd63ad26efd7e29fc5a9533742d7fc5c88347b6ba',
      prefix: '[Comments] ',
      labels: ['comments'],
      autoCreateIssue: process.env.NODE_ENV === 'production',
    },
  },

  markdown: {
    toc: {
      includeLevel: [2, 3],
    },
  },

  plugins: [
    ['@vuepress/google-analytics', {
      'ga': 'UA-132770851-1',
    }],
  ],

  chainWebpack: (config, isServer) => {
    if (isServer === false) {
      config.optimization.splitChunks({
        maxInitialRequests: 5,
        cacheGroups: {
          2: {
            test: /[\\/]node_modules[\\/](@vssue|@vuepress|vssue|nprogress|geopattern)[\\/]/,
            name: 'vendor.2',
            chunks: 'all',
          },
          1: {
            test: /[\\/]node_modules[\\/](vue|vue-router|vue-i18n|vue-class-component)[\\/]/,
            name: 'vendor.1',
            chunks: 'all',
          },
          0: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            name: 'vendor.0',
            chunks: 'all',
          },
        },
      })
    }
  },
}
