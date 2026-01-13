import { ChevronRight, Cloud, Flame, Heart, ShieldCheck, Sun, Trophy, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import protocols from '../data/protocols.json';

// Icon Map
const iconMap = {
    ShieldCheck, Zap, Sun, Cloud, Heart, Trophy, Flame: Flame // Default
};

const themeColors = {
    slate: "bg-slate-500/10 text-slate-400 border-slate-500/20 hover:border-slate-400",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:border-amber-400",
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:border-emerald-400",
    indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:border-indigo-400",
    rose: "bg-rose-500/10 text-rose-400 border-rose-500/20 hover:border-rose-400",
    yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20 hover:border-yellow-400",
    orange: "bg-orange-500/10 text-orange-400 border-orange-500/20 hover:border-orange-400",
};

export default function Dashboard() {
    return (
        <div className="p-6 max-w-md mx-auto min-h-screen">
            <header className="mb-8 mt-4">
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-100 uppercase">
                    Battle<br /><span className="text-slate-500">Protocols</span>
                </h1>
                <p className="text-slate-400 text-sm mt-2">Select your deployment.</p>
            </header>

            <div className="space-y-4">
                {protocols.map((p) => {
                    const Icon = iconMap[p.icon] || ShieldCheck;
                    return (
                        <Link key={p.id} to={`/protocol/${p.slug}`}>
                            <div className={`group flex items-center gap-4 p-4 rounded-xl border transition-all ${themeColors[p.theme] || themeColors.slate}`}>
                                <div className="p-2 rounded-lg bg-black/20">
                                    <Icon size={24} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-slate-100">{p.title}</h3>
                                    <p className="text-xs opacity-70">{p.subtitle}</p>
                                </div>
                                <ChevronRight className="opacity-50 group-hover:opacity-100 transition-opacity" size={20} />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}