import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Button, Card, Input, Modal, Switch } from '../ui/KeterUI';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export const Playground = () => {
  const { t, direction } = useAppContext();
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
    <section className="py-24 bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {t.playground.title}
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            Test our components in real-time with full LTR/RTL support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-4 space-y-8">
             <Card className="p-6 space-y-6">
                <div>
                   <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase mb-3 block">Framework Selection</label>
                   <div className="flex gap-2 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900">
                      {(['React', 'Vue', 'Svelte'] as const).map((f) => (
                         <button
                           key={f}
                           onClick={() => setFramework(f)}
                           className={cn(
                             "flex-1 py-2 text-xs font-bold rounded-lg transition-all",
                             framework === f 
                               ? "bg-white text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50 shadow-sm" 
                               : "text-zinc-500 hover:text-zinc-900"
                           )}
                         >
                            {f}
                         </button>
                      ))}
                   </div>
                </div>

                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                   <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Layout Direction</span>
                      <div className="flex gap-2 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg">
                         <button onClick={() => setLocalDir('ltr')} className={cn("px-3 py-1 text-[10px] font-black rounded uppercase", localDir === 'ltr' ? "bg-white dark:bg-zinc-800" : "text-zinc-400")}>LTR</button>
                         <button onClick={() => setLocalDir('rtl')} className={cn("px-3 py-1 text-[10px] font-black rounded uppercase", localDir === 'rtl' ? "bg-white dark:bg-zinc-800" : "text-zinc-400")}>RTL</button>
                      </div>
                   </div>
                </div>
             </Card>

             <Card className="p-6">
                <h4 className="text-sm font-bold mb-4">Sample Code</h4>
                <div className="bg-zinc-950 rounded-lg p-4 font-mono text-[11px] text-blue-300 overflow-x-auto">
                   <pre>
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
             </Card>
          </div>

          {/* Preview Canvas */}
          <div className="lg:col-span-8">
             <Card className="min-h-[500px] border-dashed border-2 flex items-center justify-center p-12 bg-white dark:bg-zinc-950 relative">
                <div className="absolute top-4 left-4 flex gap-1">
                   <div className="h-3 w-3 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                   <div className="h-3 w-3 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                   <div className="h-3 w-3 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                </div>
                
                <motion.div 
                  key={`${framework}-${localDir}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full max-w-md space-y-10" 
                  dir={localDir}
                >
                   <div className="space-y-6">
                      <h3 className="text-3xl font-black tracking-tight underline decoration-blue-500/30">
                         {localDir === 'rtl' ? 'צור חשבון חדש' : 'Create Account'}
                      </h3>
                      
                      <div className="space-y-4">
                         <Input 
                           label={localDir === 'rtl' ? 'אימייל' : 'Email Address'}
                           placeholder={localDir === 'rtl' ? 'douglas@keter.co.il' : 'douglas@keter.ui'}
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           error={error}
                           helperText={localDir === 'rtl' ? 'נשלח אלייך קוד אימות' : 'We will send a verification code'}
                         />
                         
                         <div className="flex items-center justify-between py-2 border-y border-zinc-100 dark:border-zinc-800">
                            <span className="text-sm font-medium">{localDir === 'rtl' ? 'הרשמה לניוזלטר' : 'Subscribe to newsletter'}</span>
                            <Switch checked={switchState} onChange={setSwitchState} />
                         </div>

                         <div className="flex gap-3">
                            <Button className="flex-1" onClick={handleSubmit}>
                               {localDir === 'rtl' ? 'צור חשבון' : 'Create Account'}
                            </Button>
                            <Button variant="outline" onClick={() => setEmail('')}>
                               {localDir === 'rtl' ? 'נקה' : 'Reset'}
                            </Button>
                         </div>
                      </div>
                   </div>

                   <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 grid grid-cols-2 gap-4">
                       <Button variant="secondary" size="sm" className="gap-2">
                          {localDir === 'rtl' ? 'עזרה' : 'Help Center'}
                       </Button>
                       <Button variant="ghost" size="sm" className="gap-2">
                          {localDir === 'rtl' ? 'תנאי שימוש' : 'Privacy Policy'}
                       </Button>
                   </div>
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
           <p className="mb-4">
              {localDir === 'rtl' 
                ? `תודה! החשבון עבור ${email} נוצר בהצלחה. כעת ניתן לגשת לדשבורד.` 
                : `Awesome! The account for ${email} has been created. You can now access your dashboard.`}
           </p>
           <Button className="w-full" onClick={() => setIsModalOpen(false)}>
              {localDir === 'rtl' ? 'הבנתי, תודה' : 'Got it, thanks!'}
           </Button>
        </div>
      </Modal>
    </section>
  );
};
