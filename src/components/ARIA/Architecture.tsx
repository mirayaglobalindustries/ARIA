import React from 'react';
import { motion } from 'motion/react';
import { Database, Zap, Cpu, ArrowRight, RefreshCcw, ShieldCheck, Briefcase, BarChart3, Globe, Network } from 'lucide-react';

export const Architecture = () => {
  return (
    <div className="space-y-12 py-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-black tracking-tighter text-white uppercase">System Architecture</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm">
          A high-availability streaming pipeline that ingests heterogeneous data sources into the ARIA ensemble for real-time decision synthesis.
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto p-8 bg-black/40 border border-white/5 rounded-3xl backdrop-blur-sm overflow-hidden">
        {/* Connection Lines (Visual Decor) */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg className="w-full h-full" viewBox="0 0 1000 600">
                <path d="M 250 100 L 450 300" stroke="currentColor" fill="none" className="text-blue-500" />
                <path d="M 250 200 L 450 300" stroke="currentColor" fill="none" className="text-blue-500" />
                <path d="M 250 300 L 450 300" stroke="currentColor" fill="none" className="text-blue-500" />
                <path d="M 250 400 L 450 300" stroke="currentColor" fill="none" className="text-blue-500" />
                <path d="M 250 500 L 450 300" stroke="currentColor" fill="none" className="text-blue-500" />
                
                <path d="M 550 300 L 750 150" stroke="currentColor" fill="none" className="text-emerald-500" />
                <path d="M 550 300 L 750 300" stroke="currentColor" fill="none" className="text-emerald-500" />
                <path d="M 550 300 L 750 450" stroke="currentColor" fill="none" className="text-orange-500" />
                
                <path d="M 800 450 L 800 550 L 500 550 L 500 350" stroke="currentColor" fill="none" strokeDasharray="5,5" className="text-slate-500" />
            </svg>
        </div>

        <div className="grid grid-cols-12 gap-8 items-center relative z-10">
          {/* Data Sources */}
          <div className="col-span-12 lg:col-span-3 space-y-4">
            {[
              { icon: Zap, label: 'Kite WebSocket (Live)', color: 'text-emerald-400' },
              { icon: Database, label: '10yr Historical Data', color: 'text-blue-400' },
              { icon: Globe, label: 'Local LLM (Ollama v3.2)', color: 'text-indigo-400' },
              { icon: ShieldCheck, label: 'VADER Sentiment Engine', color: 'text-blue-400' },
              { icon: Cpu, label: 'Optuna HPO Optimizer', color: 'text-emerald-400' },
              { icon: Network, label: 'DDGS News Crawler', color: 'text-blue-400' },
              { icon: BarChart3, label: 'Portfolio Optimization', color: 'text-blue-400' },
            ].map((node, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-xl"
              >
                <node.icon className={`w-4 h-4 ${node.color}`} />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{node.label}</span>
              </motion.div>
            ))}
          </div>

          {/* ARIA Core */}
          <div className="col-span-12 lg:col-span-6 flex justify-center">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-[340px] aspect-square bg-gradient-to-br from-indigo-600/20 to-blue-600/20 border border-blue-500/30 rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-4 relative"
            >
              <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full animate-pulse" />
              <Cpu className="w-16 h-16 text-blue-400 mb-2 relative z-10" />
              <h3 className="text-2xl font-black text-white tracking-widest relative z-10">ARIA CORE</h3>
              <div className="text-[10px] font-mono text-blue-300/70 space-y-1 relative z-10 uppercase">
                <div>RL + Transformer + LSTM Ensemble</div>
                <div>Probabilistic Scoring Layer</div>
                <div>Auto-Evolving Weights</div>
              </div>
            </motion.div>
          </div>

          {/* Outputs */}
          <div className="col-span-12 lg:col-span-3 space-y-4">
             <div className="p-4 bg-orange-500/5 border border-orange-500/20 rounded-2xl relative">
                <div className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-1 leading-none">Intraday Trades</div>
                <div className="text-[9px] text-slate-500 leading-tight">High-frequency scalp / trend following</div>
             </div>
             <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1 leading-none">Long-term Holds</div>
                <div className="text-[9px] text-slate-500 leading-tight">Value-based alpha accumulation</div>
             </div>
             <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-2xl">
                <div className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-1 leading-none">Risk Controls</div>
                <div className="text-[9px] text-slate-500 leading-tight">Stop-loss & position sizing logic</div>
             </div>
             
             <div className="pt-4 flex justify-center">
                <div className="flex items-center gap-3 px-4 py-2 bg-slate-800 rounded-full border border-slate-700">
                    <Briefcase className="w-4 h-4 text-slate-400" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Broker API</span>
                </div>
             </div>
          </div>
        </div>

        {/* Feedback Loop */}
        <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-3 text-slate-500">
                <RefreshCcw className="w-4 h-4 animate-spin-slow" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] italic">Continuous Learning Loop: Trade Outcome &gt; P&amp;L Analysis &gt; Weights Update</span>
            </div>
        </div>
      </div>
    </div>
  );
};
