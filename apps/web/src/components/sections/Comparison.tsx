import { Check, X } from 'lucide-react';

export const Comparison = () => {
  const features = [
    { name: 'Native RTL Support', keter: true, shadcn: false, ant: true },
    { name: 'AI-Native Props', keter: true, shadcn: false, ant: false },
    { name: 'Multi-Framework', keter: true, shadcn: false, ant: true },
    { name: 'Full Accessibility', keter: true, shadcn: true, ant: true },
    { name: 'Tailwind Integration', keter: true, shadcn: true, ant: false },
    { name: 'Low-Code Ready', keter: true, shadcn: false, ant: false },
  ];

  return (
    <section className="py-24 bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Why choose Keter UI?
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            The perfect balance between flexibility and power.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800">
                <th className="py-6 px-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">Feature</th>
                <th className="py-6 px-4 text-sm font-bold text-blue-600 dark:text-blue-400 text-center">Keter UI</th>
                <th className="py-6 px-4 text-sm font-semibold text-zinc-500 text-center">shadcn/ui</th>
                <th className="py-6 px-4 text-sm font-semibold text-zinc-500 text-center">Ant Design</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, i) => (
                <tr key={i} className="border-b border-zinc-100 dark:border-zinc-900 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                  <td className="py-4 px-4 text-sm text-zinc-700 dark:text-zinc-300">{feature.name}</td>
                  <td className="py-4 px-4 text-center">
                    {feature.keter ? <Check className="mx-auto text-green-500" size={20} /> : <X className="mx-auto text-zinc-300" size={20} />}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {feature.shadcn ? <Check className="mx-auto text-zinc-400" size={20} /> : <X className="mx-auto text-zinc-300" size={20} />}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {feature.ant ? <Check className="mx-auto text-zinc-400" size={20} /> : <X className="mx-auto text-zinc-300" size={20} />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-12 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Keter UI is built for the modern era. While other libraries focus on either aesthetics or features, we deliver <span className="text-zinc-900 dark:text-zinc-50 font-semibold">both</span> without compromising on DX or performance.
          </p>
        </div>
      </div>
    </section>
  );
};
