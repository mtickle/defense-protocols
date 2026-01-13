import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import protocols from '../data/protocols.json';

export default function ProtocolView() {
    const { slug } = useParams();
    const data = protocols.find(p => p.slug === slug);
    const [stepIndex, setStepIndex] = useState(0);

    if (!data) return <div className="text-center p-10">Protocol not found.</div>;

    const isLastStep = stepIndex === data.steps.length; // Last step is the Prayer
    const currentStep = data.steps[stepIndex];

    // Theme Helpers
    const accentText = {
        slate: "text-slate-400", amber: "text-amber-400", emerald: "text-emerald-400",
        indigo: "text-indigo-400", rose: "text-rose-400", orange: "text-orange-400"
    }[data.theme] || "text-slate-400";

    return (
        <div className="min-h-screen flex flex-col max-w-md mx-auto relative bg-slate-950">

            {/* 1. Breath Pacer (Only visible on Anxiety protocol) */}
            {data.slug === 'anxiety-defense' && (
                <div className="absolute top-0 left-0 w-full h-64 overflow-hidden pointer-events-none z-0">
                    <div className={`w-64 h-64 rounded-full bg-slate-500/10 blur-3xl absolute -top-32 left-1/2 -translate-x-1/2 animate-breathe`} />
                </div>
            )}

            {/* 2. Header */}
            <header className="flex justify-between items-center p-6 z-10">
                <div className={`text-xs font-bold tracking-widest uppercase ${accentText}`}>
                    Protocol {data.id}
                </div>
                <Link to="/" className="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-white transition-colors">
                    <X size={20} />
                </Link>
            </header>

            {/* 3. Content Area */}
            <main className="flex-1 px-6 flex flex-col justify-center z-10 pb-20">
                {isLastStep ? (
                    // THE PRAYER VIEW
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <h2 className="text-2xl font-serif italic text-slate-200 mb-6 border-l-4 border-slate-700 pl-4">
                            The Prayer
                        </h2>
                        <p className="text-lg leading-relaxed text-slate-300 font-medium">
                            "{data.prayer}"
                        </p>
                        <div className="mt-8 flex justify-center">
                            <button className={`px-6 py-3 rounded-lg bg-slate-800 ${accentText} font-bold text-sm tracking-wide uppercase`}>
                                Amen / Reset
                            </button>
                        </div>
                    </div>
                ) : (
                    // THE TACTICAL STEP VIEW
                    <div className="animate-in fade-in slide-in-from-right-8 duration-300 key={stepIndex}">

                        {/* The Verse Anchor */}
                        <div className={`mb-8 border-l-4 pl-4 ${data.theme === 'amber' ? 'border-amber-500' : 'border-slate-600'}`}>
                            <p className="font-serif text-xl italic text-slate-100 mb-2">
                                "{currentStep.verse}"
                            </p>
                            <p className={`text-xs font-bold uppercase tracking-wider ${accentText}`}>
                                {currentStep.reference}
                            </p>
                        </div>

                        {/* The HUD Data */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-1">Trigger</h3>
                                <p className="text-slate-300">{currentStep.trigger}</p>
                            </div>

                            <div>
                                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">Action</h3>
                                <p className="text-slate-300">{currentStep.action}</p>
                            </div>

                            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Objective</h3>
                                <p className="text-sm text-slate-400 italic">{currentStep.goal}</p>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* 4. Footer Controls */}
            <footer className="fixed bottom-0 w-full max-w-md bg-slate-950/80 backdrop-blur-md border-t border-slate-800 p-6 flex justify-between items-center z-20">
                <button
                    onClick={() => setStepIndex(Math.max(0, stepIndex - 1))}
                    disabled={stepIndex === 0}
                    className="p-3 rounded-full hover:bg-slate-800 disabled:opacity-30 text-slate-400"
                >
                    <ArrowLeft size={24} />
                </button>

                <div className="flex gap-1">
                    {[...Array(data.steps.length + 1)].map((_, i) => (
                        <div key={i} className={`h-1.5 w-1.5 rounded-full transition-all ${i === stepIndex ? `bg-white w-4` : 'bg-slate-700'}`} />
                    ))}
                </div>

                <button
                    onClick={() => setStepIndex(Math.min(data.steps.length, stepIndex + 1))}
                    disabled={isLastStep}
                    className={`p-3 rounded-full text-slate-950 ${isLastStep ? 'bg-slate-800 text-slate-500' : 'bg-white hover:bg-slate-200'}`}
                >
                    <ArrowRight size={24} />
                </button>
            </footer>
        </div>
    );
}