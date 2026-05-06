import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Button, Card, Input, Modal, Switch } from '../ui/KeterUI';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';
import { Sparkles, Terminal } from 'lucide-react';

export const Playground = () => {
  const { direction } = useAppContext();
  const [framework, setFramework] = useState<'React' | 'Vue' | 'Svelte'>('React');
  const [localDir, setLocalDir] = useState<'ltr' | 'rtl'>(direction);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [switchState, setSwitchState] = useState(true);

  const handleSubmit = () => {
    if (!email.includes('@')) {
       setError(localDir === 'rtl' ? 'אימייל לא תקין' : 'Please enter a valid email');
       return;
    }
    setError('');
    setIsModalOpen(true);
  };

  return (
    <section className="py-24 bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 mb-6">
            <Sparkles size={14} /> Interactive Preview
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Try it in <span className="text-blue-600 dark:text-blue-400">10 seconds.</span>
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Experience the power of our multi-framework, RTL-ready components. No installation required.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Controls */}
          <div className="lg:col-span-4 space-y-6">
             <Card className="p-8 space-y-8 border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none">
                <div>
                   <label className="text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase mb-4 block">1. Select Framework</label>
                   <div className="flex gap-2 p-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                      {(['React', 'Vue', 'Svelte'] as const).map((f) => (
                         <button
                           key={f}
                           onClick={() => setFramework(f)}
                           className={cn(
                             "flex-1 py-2.5 text-xs font-bold rounded-lg transition-all",
                             framework === f 
                               ? "bg-white text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50 shadow-md" 
                               : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
                           )}
                         >
                            {f}
                         </button>
                      ))}
                   </div>
                </div>

                <div>
                   <label className="text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase mb-4 block">2. Toggle Direction</label>
                   <div className="flex gap-2 bg-zinc-100 dark:bg-zinc-900 p-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800">
                      <button 
                        onClick={() => setLocalDir('ltr')} 
                        className={cn(
                          "flex-1 py-2.5 text-[11px] font-black rounded-lg uppercase transition-all", 
                          localDir === 'ltr' ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-md" : "text-zinc-400"
                        )}
                      >
                        LTR (English)
                      </button>
                      <button 
                        onClick={() => setLocalDir('rtl')} 
                        className={cn(
                          "flex-1 py-2.5 text-[11px] font-black rounded-lg uppercase transition-all", 
                          localDir === 'rtl' ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-md" : "text-zinc-400"
                        )}
                      >
                        RTL (Hebrew)
                      </button>
                   </div>
                </div>

                <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800">
                   <div className="flex items-center gap-3 mb-4">
                      <Terminal size={14} className="text-zinc-400" />
                      <span className="text-[10px] font-black tracking-widest text-zinc-400 uppercase">Implementation Code</span>
                   </div>
                   <div className="bg-zinc-950 rounded-xl p-5 font-mono text-[11px] text-zinc-300 border border-zinc-800 leading-relaxed overflow-x-auto">
<pre className="text-blue-400">
{`import { Button, Input } from '@keter-ui/${framework.toLowerCase()}';

export default function Demo() {
  return (
    <div dir="${localDir}">
      <Input label="Email" />
      <Button>Submit</Button>
    </div>
  );
}`}
</pre>
                   </div>
                </div>
             </Card>
          </div>

          {/* Preview Canvas */}
          <div className="lg:col-span-8">
             <Card className="min-h-[600px] border-zinc-200 dark:border-zinc-800 flex items-center justify-center p-8 lg:p-16 bg-zinc-50 dark:bg-zinc-900/50 relative overflow-hidden">
                {/* Decorative background for preview */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                
                <motion.div 
                  key={`${framework}-${localDir}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full max-w-md relative z-10" 
                  dir={localDir}
                >
                   <Card className="p-8 lg:p-10 shadow-2xl shadow-zinc-200 dark:shadow-none border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                      <div className="space-y-8">
                         <div className="space-y-2">
                            <h3 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                               {localDir === 'rtl' ? 'צור חשבון חדש' : 'Create Account'}
                            </h3>
                            <p className="text-zinc-500 text-sm">
                               {localDir === 'rtl' ? 'הצטרף לאלפי משתמשים שכבר משתמשים ב-Keter' : 'Join thousands of developers using Keter UI'}
                            </p>
                         </div>
                         
                         <div className="space-y-6">
                            <Input 
                              label={localDir === 'rtl' ? 'אימייל' : 'Email Address'}
                              placeholder={localDir === 'rtl' ? 'you@keter.co.il' : 'you@example.com'}
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              error={error}
                            />
                            
                            <div className="flex items-center justify-between py-4 border-y border-zinc-100 dark:border-zinc-800">
                               <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{localDir === 'rtl' ? 'הרשמה לניוזלטר' : 'Subscribe to newsletter'}</span>
                               <Switch checked={switchState} onChange={setSwitchState} />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                               <Button className="flex-[2] h-12 text-sm font-bold" onClick={handleSubmit}>
                                  {localDir === 'rtl' ? 'צור חשבון' : 'Create Account'}
                               </Button>
                               <Button variant="outline" className="flex-1 h-12 text-sm font-bold" onClick={() => setEmail('')}>
                                  {localDir === 'rtl' ? 'נקה' : 'Reset'}
                               </Button>
                            </div>
                         </div>

                         <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 flex justify-center gap-6">
                            <button className="text-[11px] font-bold text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors uppercase tracking-widest">
                               {localDir === 'rtl' ? 'עזרה' : 'Help Center'}
                            </button>
                            <button className="text-[11px] font-bold text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors uppercase tracking-widest">
                               {localDir === 'rtl' ? 'תנאי שימוש' : 'Privacy Policy'}
                            </button>
                         </div>
                      </div>
                   </Card>
                </motion.div>
             </Card>
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={localDir === 'rtl' ? 'הפעולה הצליחה' : 'Success!'}
      >
        <div className="py-4 text-zinc-600 dark:text-zinc-400">
           <p className="mb-6 leading-relaxed">
              {localDir === 'rtl' 
                ? `תודה! החשבון עבור ${email} נוצר בהצלחה. כעת ניתן לגשת לדשבורד.` 
                : `Awesome! The account for ${email} has been created. You can now access your dashboard.`}
           </p>
           <Button className="w-full h-12 font-bold" onClick={() => setIsModalOpen(false)}>
              {localDir === 'rtl' ? 'הבנתי, תודה' : 'Got it, thanks!'}
           </Button>
        </div>
      </Modal>
    </section>
  );
};
