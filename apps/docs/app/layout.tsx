import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import React from 'react'
import 'nextra-theme-docs/style.css'

export const metadata = {
  title: 'Keter UI Documentation',
  description: 'The unified UI platform for modern developers.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const pageMap = await getPageMap()
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={<Navbar logo={<b>Keter UI</b>} />}
          footer={<Footer>Keter UI © 2026</Footer>}
          pageMap={pageMap}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
