import { Zap, Shield, Globe, Cpu, Layout, Sparkles } from 'lucide-react';

export const Features = () => {
  const features = [
    {
      title: 'AI-Native Architecture',
      description: 'Components optimized for LLMs with semantic props and clean structure for better code generation.',
      icon: Sparkles,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    },
    {
      title: 'Native RTL Support',
      description: 'First-class support for Arabic and Hebrew layouts without hacky CSS overrides.',
      icon: Globe,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    {
      title: 'Production-Ready',
      description: 'Battle-tested components with full accessibility, keyboard navigation, and high data density.',
      icon: Shield,
      color: 'text-green-500',
      bg: 'bg-green-500/10'
    },
    {
      title: 'Multi-Framework',
      description: 'Write once, use everywhere. Full support for React, Vue, and Svelte through our core engine.',
      icon: Layout,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10'
    },
    {
      title: 'Extreme Performance',
      description: 'Zero runtime overhead and optimized bundle sizes for the fastest possible load times.',
      icon: Zap,
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10'
    },
    {
      title: 'Modern CLI',
      description: 'Advanced CLI for scaffolding, component injection, and project maintenance.',
      icon: Cpu,
      color: 'text-indigo-500',
      bg: 'bg-indigo-500/10'
    }
  ];

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Built for scale. Designed for speed.
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Everything you need to build complex SaaS interfaces without fighting your UI library.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="group p-8 rounded-2xl border border-zinc-200 bg-white hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-blue-400/50">
              <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">{feature.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
