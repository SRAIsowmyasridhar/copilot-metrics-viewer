// https://nuxt.com/docs/api/configuration/nuxt-config
import { readFileSync } from 'fs';
const packageJson = readFileSync('package.json', 'utf8');
const version = JSON.parse(packageJson).version;

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4
  },

  ssr: true,

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }
      ]
    }
  },

  features: {
    inlineStyles: false,
    devLogs: false,
  },

  build: {
    transpile: ['vuetify'],
  },

  vite: {
    ssr: {
      noExternal: ['vuetify'],
    },
  },

  css: [],

  modules: ['@nuxt/fonts', 'vuetify-nuxt-module', '@nuxt/eslint', 'nuxt-auth-utils'],

  vuetify: {
    moduleOptions: {
      ssrClientHints: {
        reloadOnFirstRequest: false,
        viewportSize: true,
        prefersColorScheme: false,
        prefersColorSchemeOptions: {
          useBrowserThemeOnly: false,
        },
      },
      styles: {
        configFile: 'assets/settings.scss',
      },
    },
  },

  // ✅ Fixed Nitro Configuration (Removed `port`)
  nitro: {
    preset: process.env.NITRO_PRESET || 'node-server',   
    serveStatic: true,  // ✅ Ensures static files are served correctly
    output: {
      dir: ".output/"
    },
    plugins: [
      'plugins/http-agent',
    ],
  },

  // ✅ Ensure `PORT` is set via environment variable
  runtimeConfig: {
    githubToken: process.env.NUXT_GITHUB_TOKEN || '',
    session: {
      maxAge: 60 * 60 * 6, // 6 hours
      password: process.env.NUXT_SESSION_PASSWORD || '',
    },
    oauth: {
      github: {
        clientId: process.env.NUXT_OAUTH_GITHUB_CLIENT_ID || '',
        clientSecret: process.env.NUXT_OAUTH_GITHUB_CLIENT_SECRET || '',
      }
    },
    proxy: process.env.HTTP_PROXY || '',

    public: {
      isDataMocked: process.env.NUXT_PUBLIC_IS_DATA_MOCKED === 'true',
      scope: process.env.NUXT_PUBLIC_SCOPE || 'organization',
      githubOrg: process.env.NUXT_PUBLIC_GITHUB_ORG || '',
      githubEnt: process.env.NUXT_PUBLIC_GITHUB_ENT || '',
      githubTeam: process.env.NUXT_PUBLIC_GITHUB_TEAM || '',
      usingGithubAuth: process.env.NUXT_PUBLIC_USING_GITHUB_AUTH === 'true',
      version,
      isPublicApp: false
    }
  }
});
