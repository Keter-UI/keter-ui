import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>Keter UI</span>,
  project: {
    link: 'https://github.com/keter-ui/keter-ui',
  },
  docsRepositoryBase: 'https://github.com/keter-ui/keter-ui/tree/main/apps/docs',
  footer: {
    text: 'Keter UI © 2026',
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Keter UI'
    }
  }
}

export default config
