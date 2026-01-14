import { ArrowLeft, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 p-6 max-w-md mx-auto flex flex-col">

            {/* Navigation */}
            <header className="mb-8 pt-4">
                <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors p-2 -ml-2 rounded-lg hover:bg-slate-900">
                    <ArrowLeft size={20} />
                    <span className="text-xs font-bold uppercase tracking-widest">Return to Base</span>
                </Link>
            </header>

            {/* Main Content */}
            <main className="flex-1 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* Header */}
                <div className="flex items-center gap-4 border-b border-slate-800 pb-8">
                    <div className="p-3 bg-slate-900 rounded-xl text-slate-100">
                        <Shield size={32} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-extrabold text-white tracking-tight">Battle Protocols</h1>
                        <p className="text-emerald-500 text-xs font-bold uppercase tracking-widest mt-1">
                            Version 1.0 // Online
                        </p>
                    </div>
                </div>

                {/* The Why */}
                <div className="space-y-4 text-slate-400 leading-relaxed text-sm">
                    <p>
                        <strong className="text-slate-200">The Problem:</strong> When a crisis hits, cognitive function drops. We forget what we know. We forget who we are.
                    </p>
                    <p>
                        <strong className="text-slate-200">The Solution:</strong> This interface is designed as a rapid-response field manual. It provides "Spiritual First Aid" to bridge the gap between panic and peace using the <em>Anchor-Trigger-Action</em> methodology.
                    </p>
                </div>

                {/* The Verse */}
                <div className="bg-slate-900/50 p-6 rounded-lg border-l-4 border-slate-700">
                    <p className="italic font-serif text-slate-300 mb-2">
                        "For the weapons of our warfare are not carnal but mighty in God for pulling down strongholds..."
                    </p>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                        2 Corinthians 10:4
                    </p>
                </div>

            </main>

            {/* Footer Credits */}
            <footer className="mt-12 py-6 border-t border-slate-900 text-center">
                <p className="text-slate-600 text-xs">
                    Designed & Deployed by Mike Tickle
                </p>
            </footer>
        </div>
    );
}
