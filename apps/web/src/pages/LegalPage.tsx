import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const LegalPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Legal Notice</h1>
        <p className="text-zinc-500 mb-12">Privacy Policy & Terms of Service</p>
        
        <div className="space-y-16">
          {/* Privacy Section */}
          <section className="prose dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 space-y-6">
             <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                Privacy Policy
             </h2>
             <p className="text-lg leading-relaxed"> last updated: May 4, 2026 </p>
             <p>
                Welcome to Keter UI. Your privacy and trust are paramount to us. Keter UI is a client-side library. We do not collect, store, or transmit any user data from your applications.
             </p>
             <p>
                Our CLI tool may collect anonymous usage statistics to help us improve the system, such as installation success rates and used frameworks. This data is fully anonymized and used only for internal development.
             </p>
          </section>

          <hr className="border-zinc-100 dark:border-zinc-800" />

          {/* Terms Section */}
          <section className="prose dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 space-y-6">
             <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-purple-500" />
                Terms of Service
             </h2>
             <p>
                You are free to use Keter UI in both personal and commercial projects. Redistribution of our core components as a competing library is strictly prohibited without explicit written consent.
             </p>
             <p>
                While we strive for perfection, Keter UI is provided "as is". We are not liable for any issues arising from the integration of this library into your specific software environment.
             </p>
             <ul className="list-disc ms-4 space-y-2">
                <li>MIT License for community use.</li>
                <li>Commercial components require an Enterprise license.</li>
                <li>Attribution is appreciated but not mandatory.</li>
             </ul>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};
