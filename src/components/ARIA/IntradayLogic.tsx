import React from 'react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock, Scissors, Target, ArrowUpRight, LogOut } from 'lucide-react';

const steps = [
  { icon: Clock, time: '08:45 AM', title: 'Pre-Market Scan', desc: 'Ingesting global cues, SGX Nifty, and overnight commodity volatility.' },
  { icon: Scissors, time: '09:15 AM', title: 'Opening Range', desc: 'Observing the first 15-min candle for structural breakouts.' },
  { icon: Target, time: '09:45 AM', title: 'Entry Execution', desc: 'ARIA executes limit orders near VWAP with dynamic ATR-based stops.' },
  { icon: ArrowUpRight, time: '11:00 AM', title: 'Trailing Stage', desc: 'Moving stops to break-even as alpha clusters materialize.' },
  { icon: LogOut, time: '03:00 PM', title: 'Mandatory Exit', desc: 'All MIS positions squared off. No overnight risk contamination.' },
];

const mockCandles = Array(30).fill(0).map((_, i) => ({
  time: i,
  price: 1500 + Math.sin(i * 0.5) * 50 + (i * 2),
  signal: i === 5 ? 'BUY' : i === 25 ? 'SELL' : null
}));

export const IntradayLogic = () => {
  return (
    <div className="space-y-12 py-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-black tracking-tighter text-white uppercase">Intraday Execution Protocol</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm">
          A rigid, algorithmic framework for zero-emotion daylight trading. ARIA adheres to strict time-based controls to minimize slippage.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Step Walkthrough */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4 group"
            >
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors">
                  <step.icon className="w-4 h-4 text-emerald-400" />
                </div>
                {i !== steps.length - 1 && <div className="w-px h-full bg-white/5 my-2" />}
              </div>
              <div className="pb-8 space-y-1">
                <div className="text-[10px] font-black text-emerald-400/60 uppercase tracking-widest">{step.time}</div>
                <h3 className="text-sm font-black text-white uppercase tracking-wider">{step.title}</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visual Chart */}
        <div className="col-span-12 lg:col-span-8">
           <div className="bg-black/40 border border-white/5 rounded-3xl p-6 h-full flex flex-col space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Live Candle Sync Simulator</span>
                </div>
                <div className="flex gap-4 text-[10px] font-bold text-slate-500 uppercase">
                    <span>EMA(9): <span className="text-emerald-400">1582.4</span></span>
                    <span>VWAP: <span className="text-blue-400">1578.1</span></span>
                </div>
              </div>

              <div className="flex-1 h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockCandles}>
                    <defs>
                      <linearGradient id="colorIntra" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#ffffff05" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="time" hide />
                    <YAxis domain={['auto', 'auto']} hide />
                    <Area type="step" dataKey="price" stroke="#10b981" fill="url(#colorIntra)" strokeWidth={2} />
                    {/* Signal Markers would go here if Recharts supported easy custom dots for just some points easily, or using Scatter */}
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="pt-4 border-t border-white/5 grid grid-cols-3 gap-6 text-center">
                 <div>
                    <div className="text-[9px] text-slate-500 font-bold uppercase mb-1">Entry Range</div>
                    <div className="text-sm font-black text-white">₹1,575 - ₹1,580</div>
                 </div>
                 <div className="border-x border-white/10">
                    <div className="text-[9px] text-slate-500 font-bold uppercase mb-1">Stop Loss</div>
                    <div className="text-sm font-black text-rose-400">1.5% fixed</div>
                 </div>
                 <div>
                    <div className="text-[9px] text-slate-500 font-bold uppercase mb-1">Alpha Target</div>
                    <div className="text-sm font-black text-emerald-400">2.8% min</div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
