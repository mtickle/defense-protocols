import { Anchor, ArrowLeft, ArrowRight, Cloud, CloudLightning, Compass, Flame, Footprints, Heart, HeartHandshake, ShieldCheck, Sprout, Sun, Trophy, X, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable'; // <--- IMPORT THIS
import protocols from '../data/protocols.json';

// Icon Map
const iconMap = {
    ShieldCheck, Zap, Sun, Cloud, Heart, Trophy, Flame, Footprints, HeartHandshake, Compass,
    Anchor, CloudLightning, Sprout // Added extras just in case
};

export default function ProtocolView() {
    const { slug } = useParams();
    const data = protocols.find(p => p.slug === slug);
    const [stepIndex, setStepIndex] = useState(0);

    // FIX: Reset to Intro whenever the user switches protocols
    useEffect(() => {
        setStepIndex(0);
    }, [slug]);

    if (!data) return <div className="text-center p-10 text-white">Protocol not found.</div>;

    // HARDENED LOGIC:
    const isIntro = stepIndex === 0;
    const isPrayer = stepIndex === data.steps.length + 1;
    const isStep = stepIndex > 0 && stepIndex <= data.steps.length;

    // Safe access
    const currentStep = isStep ? (data.steps[stepIndex - 1] || {}) : null;

    // --- NAVIGATION HELPERS ---
    const handleNext = () => {
        if (!isPrayer) {
            setStepIndex(curr => Math.min(data.steps.length + 1, curr + 1));
        }
    };

    const handlePrev = () => {
        setStepIndex(curr => Math.max(0, curr - 1));
    };

    // --- SWIPE CONFIGURATION ---
    const handlers = useSwipeable({
        onSwipedLeft: () => handleNext(),  // Swipe Left = Next
        onSwipedRight: () => handlePrev(), // Swipe Right = Back
        preventScrollOnSwipe: true,        // Prevents scrolling while swiping
        trackMouse: true                   // Allows testing on desktop with mouse drag
    });

    // Theme Helpers
    const accentText = {
        slate: "text-slate-400", amber: "text-amber-400", emerald: "text-emerald-400",
        indigo: "text-indigo-400", rose: "text-rose-400", orange: "text-orange-400", yellow: "text-yellow-400"
    }[data.theme] || "text-slate-400";

    const themeBorder = {
        slate: "border-slate-600", amber: "border-amber-500", emerald: "border-emerald-500",
        indigo: "border-indigo-500", rose: "border-rose-500", orange: "border-orange-500", yellow: "border-yellow-500"
    }[data.theme] || "border-slate-600";

    const Icon = iconMap[data.icon] || ShieldCheck;

    return (
        // ATTACH HANDLERS TO OUTER DIV
        <div
            {...handlers}
            className="min-h-screen flex flex-col max-w-md mx-auto relative bg-slate-950"
        >

            {/* 1. Header */}
            <header className="flex justify-between items-center p-6 z-10">
                <div className={`text-xs font-bold tracking-widest uppercase ${accentText}`}>
                    {data.title}
                </div>
                <Link to="/" className="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-white transition-colors">
                    <X size={20} />
                </Link>
            </header>

            {/* 2. Content Area */}
            {/* Added 'select-none' to prevent text highlighting while swiping */}
            <main className="flex-1 px-6 flex flex-col justify-start pt-2 z-10 pb-24 select-none">

                {/* --- VIEW 1: INTRO CARD --- */}
                {isIntro && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                        <div className={`mb-6 p-4 rounded-full w-fit bg-slate-900 ${accentText}`}>
                            <Icon size={48} />
                        </div>
                        <h1 className="text-2xl font-extrabold text-white tracking-tight mb-4 leading-none">
                            {data.title}
                        </h1>
                        <p className={`text-lg ${accentText} font-medium mb-8`}>
                            {data.subtitle}
                        </p>
                        <div className={`border-l-4 ${themeBorder} pl-6 py-1`}>
                            <p className="text-lg leading-relaxed text-slate-300">
                                {data.intro}
                            </p>
                        </div>
                    </div>
                )}

                {/* --- VIEW 2: TACTICAL STEPS --- */}
                {isStep && currentStep && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-300" key={stepIndex}>

                        {/* Phase Header */}
                        <div className="mb-6">
                            <h2 className="text-2xl font-extrabold text-white tracking-tight leading-none">
                                {currentStep.title}
                            </h2>
                        </div>
                        {/* The Verse Anchor */}
                        <div className={`mb-8 border-l-4 pl-4 ${themeBorder}`}>
                            <p className="font-serif text-base italic text-slate-100 mb-2">
                                "{currentStep.verse}"
                            </p>

                        </div>
                        {currentStep.insight && (
                            <><h3 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-1">Insight</h3><p className={`text-base   mb-5`}>
                                {currentStep.insight}
                            </p></>
                        )}



                        {/* The HUD Data */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-1">Trigger</h3>
                                <p className="text-slate-300">{currentStep.trigger}</p>
                            </div>

                            <div>
                                <h3 className="text-xs font-bold text-yellow-400 uppercase tracking-widest mb-1">Action</h3>
                                <p className="text-slate-300">{currentStep.action}</p>
                            </div>

                            <div>
                                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">Goal</h3>
                                <p className="text-slate-300">{currentStep.goal}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- VIEW 3: PRAYER --- */}
                {isPrayer && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="mb-6">
                            <h2 className="text-2xl font-extrabold text-white tracking-tight leading-none">
                                The Prayer
                            </h2>
                        </div>
                        <div className="space-y-8">
                            {data.prayers.map((prayer, index) => (
                                <div key={index}>
                                    {data.prayers.length > 1 && (
                                        <h3 className={`text-xs font-bold uppercase tracking-widest mb-2 ${accentText}`}>
                                            {prayer.title}
                                        </h3>
                                    )}
                                    <p className="text-base leading-relaxed text-slate-300 font-medium">
                                        "{prayer.text}"
                                    </p>
                                </div>
                            ))
                            }
                        </div >
                        <div className="mt-8 flex justify-center">
                            <button
                                onClick={() => setStepIndex(0)}
                                className={`px-6 py-3 rounded-lg bg-slate-800 ${accentText} font-bold text-sm tracking-wide uppercase hover:bg-slate-700 transition-colors`}
                            >
                                Reset
                            </button>
                        </div>
                    </div >
                )}

            </main >

            {/* 3. Footer Controls */}
            < footer className="fixed bottom-0 w-full max-w-md bg-slate-950/80 backdrop-blur-md border-t border-slate-800 p-6 flex justify-between items-center z-20" >

                <button
                    onClick={handlePrev} // Updated to use helper
                    disabled={stepIndex === 0}
                    className="p-3 rounded-full hover:bg-slate-800 disabled:opacity-30 text-slate-400 transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>

                <div className="flex gap-1">
                    {[...Array(data.steps.length + 2)].map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === stepIndex ? 'bg-white w-6' : 'bg-slate-700 w-1.5'
                                }`}
                        />
                    ))}
                </div>

                <button
                    onClick={handleNext} // Updated to use helper
                    disabled={isPrayer}
                    className={`p-3 rounded-full transition-all ${isPrayer
                        ? 'bg-slate-900 text-slate-700 cursor-not-allowed'
                        : 'bg-white text-slate-950 hover:bg-slate-200 shadow-lg shadow-white/10'
                        }`}
                >
                    <ArrowRight size={24} />
                </button>
            </footer >
        </div >
    );
}
