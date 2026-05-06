/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { CLIDemo } from './components/sections/CLIDemo';
import { Dashboards } from './components/sections/Dashboards';
import { ComponentsGrid } from './components/sections/ComponentsGrid';
import { Features } from './components/sections/Features';
import { AISection } from './components/sections/AISection';
import { Comparison } from './components/sections/Comparison';
import { CodeExample } from './components/sections/CodeExample';
import { Playground } from './components/sections/Playground';
import { FinalCTA } from './components/sections/FinalCTA';
import { Footer } from './components/layout/Footer';
import { DashboardLayout } from './components/sections/DashboardLayout';
import { DocsPage } from './pages/DocsPage';
import { LegalPage } from './pages/LegalPage';
import { ComponentsPage } from './pages/ComponentsPage';

function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans selection:bg-blue-500/30">
      <Navbar />
      <main>
        <Hero />
        <CLIDemo />
        <Dashboards />
        <ComponentsGrid />
        <Features />
        <AISection />
        <Comparison />
        <CodeExample />
        <Playground />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardLayout />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/components" element={<ComponentsPage />} />
          <Route path="/legal" element={<LegalPage />} />
          <Route path="/privacy" element={<LegalPage />} />
          <Route path="/terms" element={<LegalPage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
