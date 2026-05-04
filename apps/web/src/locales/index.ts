
export type Language = 'en' | 'pt' | 'es' | 'he';

export interface Translations {
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  playground: {
    title: string;
    react: string;
    vue: string;
    svelte: string;
    toggleLtr: string;
    toggleRtl: string;
  };
  ai: {
    title: string;
    prompt: string;
    install: string;
  };
  sections: {
    components: string;
    dashboards: string;
    docs: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    hero: {
      title: "AI-native UI for modern developers",
      subtitle: "Multi-framework. RTL-first. Production-ready dashboards for code, low-code, vibe-code and No-Code.",
      ctaPrimary: "Get Started",
      ctaSecondary: "Live Demo",
    },
    playground: {
      title: "Live Playground",
      react: "React",
      vue: "Vue",
      svelte: "Svelte",
      toggleLtr: "LTR",
      toggleRtl: "RTL",
    },
    ai: {
      title: "Build with AI",
      prompt: "Create a SaaS dashboard using Keter UI with RTL support",
      install: "npx keter-ui init",
    },
    sections: {
      components: "Components",
      dashboards: "Dashboards",
      docs: "Documentation",
    },
  },
  pt: {
    hero: {
      title: "UI nativa para IA para desenvolvedores modernos",
      subtitle: "Multi-framework. RTL-first. Dashboards prontos para produção para code, low-code, vibe-code e No-Code.",
      ctaPrimary: "Começar",
      ctaSecondary: "Demo ao Vivo",
    },
    playground: {
      title: "Playground Interativo",
      react: "React",
      vue: "Vue",
      svelte: "Svelte",
      toggleLtr: "LTR",
      toggleRtl: "RTL",
    },
    ai: {
      title: "Construa com IA",
      prompt: "Crie um dashboard SaaS usando Keter UI com suporte RTL",
      install: "npx keter-ui init",
    },
    sections: {
      components: "Componentes",
      dashboards: "Dashboards",
      docs: "Documentação",
    },
  },
  es: {
    hero: {
      title: "UI para IA nativa para desarrolladores modernos",
      subtitle: "Multi-framework. RTL-first. Paneles listos para producción para code, low-code, vibe-code y No-Code.",
      ctaPrimary: "Empezar",
      ctaSecondary: "Demo en Vivo",
    },
    playground: {
      title: "Playground en Vivo",
      react: "React",
      vue: "Vue",
      svelte: "Svelte",
      toggleLtr: "LTR",
      toggleRtl: "RTL",
    },
    ai: {
      title: "Construye con IA",
      prompt: "Crea un dashboard SaaS usando Keter UI con soporte RTL",
      install: "npx keter-ui init",
    },
    sections: {
      components: "Componentes",
      dashboards: "Dashboards",
      docs: "Documentación",
    },
  },
  he: {
    hero: {
      title: "ממשק משתמש מבוסס AI למפתחים מודרניים",
      subtitle: "מרובה ספריות. תמיכה מלאה ב-RTL. דשבורדים מוכנים לייצור עבור code, low-code, vibe-code וNo-Code.",
      ctaPrimary: "מתחילים",
      ctaSecondary: "דמו חי",
    },
    playground: {
      title: "סביבת עבודה חיה",
      react: "React",
      vue: "Vue",
      svelte: "Svelte",
      toggleLtr: "LTR",
      toggleRtl: "RTL",
    },
    ai: {
      title: "בנה עם AI",
      prompt: "צור דשבורד SaaS באמצעות Keter UI עם תמיכת RTL",
      install: "npx keter-ui init",
    },
    sections: {
      components: "רכיבים",
      dashboards: "דשבורדים",
      docs: "תיעוד",
    },
  },
};
