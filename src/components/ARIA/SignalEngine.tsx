import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Target, Play, BarChart2, Activity, ShieldCheck, Thermometer } from 'lucide-react';

const initialModules = [
  { id: 'tech', name: 'Technical', weight: 80, vote: 'Bullish', icon: BarChart2, color: 'text-emerald-400' },
  { id: 'lstm', name: 'LSTM RNN', weight: 65, vote: 'Bullish', icon: Activity, color: 'text-emerald-400' },
  { id: 'sent', name: 'Sentiment', weight: 40, vote: 'Bearish', icon: Thermometer, color: 'text-rose-400' },
  { id: 'flow', name: 'Options Flow', weight: 90, vote: 'Bullish', icon: Target, color: 'text-emerald-400' },
  { id: 'risk', name: 'Risk Unit', weight: 100, vote: 'Stable', icon: ShieldCheck, color: 'text-blue-400' },
];

export const SignalEngine = () => {
  const [modules, setModules] = useState(initialModules);
  const [isSimulating, setIsSimulating] = useState(false);

  const totalScore = modules.reduce((acc, mod) => {
    const mult = mod.vote === 'Bullish' ? 1.2 : mod.vote === 'Bearish' ? -1.2 : 0;
    return acc + (mod.weight * mult);
  }, 0);

  const confidence = Math.min(Math.max(Math.abs(totalScore) / 4, 20), 98).toFixed(1);
  const signal = totalScore > 10 ? 'BUY' : totalScore < -10 ? 'SELL' : 'WAIT';

  const runSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
        setIsSimulating(false);
    }, 2000);
  };

  return (
    <div className="space-y-12 py-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-black tracking-tighter text-white uppercase">Interactive Signal Engine</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm">
          Simulate real-time analysis. In production, ARIA auto-tunes these weights based on historical accuracy of specific signals in the current market regime.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Controls */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          <div className="bg-black/40 border border-white/5 rounded-2xl p-6 space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">Module Weight Tuning</h3>
            {modules.map((mod, i) => (
              <div key={mod.id} className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <div className="flex items-center gap-2">
                    <mod.icon className="w-3.5 h-3.5" />
                    {mod.name}
                  </div>
                  <span>{mod.weight}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={mod.weight}
                  onChange={(e) => {
                    const newModules = [...modules];
                    newModules[i].weight = parseInt(e.target.value);
                    setModules(newModules);
                  }}
                  className="w-full h-1 bg-white/5 rounded-full appearance-none accent-blue-500 cursor-pointer"
                />
              </div>
            ))}
            
            <button 
              onClick={runSimulation}
              disabled={isSimulating}
              className={`w-full py-3 rounded-xl font-bold uppercase text-[11px] tracking-widest flex items-center justify-center gap-3 transition-all ${isSimulating ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-600 text-white shadow-xl shadow-blue-900/20 active:scale-[0.98]'}`}
            >
              {isSimulating ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
              {isSimulating ? 'Processing...' : 'Run Analysis Simulation'}
            </button>
          </div>
        </div>

        {/* Live Signal Node */}
        <div className="col-span-12 lg:col-span-8">
           <div className="h-full bg-black/60 border border-white/5 rounded-3xl p-10 flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-md">
              <div className="absolute inset-0 bg-blue-500/5 blur-[120px] pointer-events-none" />
              
              <div className="space-y-8 text-center relative z-10 w-full max-w-md">
                <div className="space-y-1">
                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Calculated Probabilistic Output</span>
                    <motion.div 
                        key={signal}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`text-7xl font-black tracking-tighter ${signal === 'BUY' ? 'text-emerald-500' : signal === 'SELL' ? 'text-rose-500' : 'text-slate-400'}`}
                    >
                        {signal}
                    </motion.div>
                </div>

                <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/5 font-black uppercase overflow-hidden">
                    <div className="space-y-1">
                        <div className="text-[10px] text-slate-500 tracking-widest">Confidence Score</div>
                        <div className="text-3xl text-white font-mono">{confidence}%</div>
                    </div>
                    <div className="space-y-1 border-l border-white/5">
                        <div className="text-[10px] text-slate-500 tracking-widest">System Bias</div>
                        <div className="text-3xl text-blue-400 font-mono italic">{totalScore > 0 ? 'LONG' : 'SHORT'}</div>
                    </div>
                </div>

                <div className="flex justify-center gap-4 pt-4">
                    {modules.map((mod, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                            <div className={`text-[9px] font-bold ${mod.color}`}>{mod.vote}</div>
                            <div className={`h-1.5 w-1.5 rounded-full ${mod.vote === 'Bullish' ? 'bg-emerald-500' : mod.vote === 'Bearish' ? 'bg-rose-500' : 'bg-blue-500'}`} />
                        </div>
                    ))}
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const RefreshCcw = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path><path d="M16 16h5v5"></path></svg>
);
