import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Wallet, ShieldAlert, PieChart, Info, Landmark } from 'lucide-react';

export const RiskAllocation = () => {
  const [capital, setCapital] = useState(1000000); // 10L
  const [riskPerTrade, setRiskPerTrade] = useState(1); // 1%
  const [maxDrawdown, setMaxDrawdown] = useState(5); // 5%

  const riskValue = (capital * (riskPerTrade / 100)).toLocaleString();
  const dailyStop = (capital * (maxDrawdown / 100)).toLocaleString();

  const splits = [
    { label: 'Intraday (30%)', value: (capital * 0.3).toLocaleString(), color: 'bg-blue-500' },
    { label: 'Swing (40%)', value: (capital * 0.4).toLocaleString(), color: 'bg-emerald-500' },
    { label: 'Long-term (20%)', value: (capital * 0.2).toLocaleString(), color: 'bg-indigo-500' },
    { label: 'Cash (10%)', value: (capital * 0.1).toLocaleString(), color: 'bg-slate-500' },
  ];

  return (
    <div className="space-y-12 py-8 text-left">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-black tracking-tighter text-white uppercase">Risk & Capital Allocation</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm">
          Risk management is the only variable we truly control. ARIA uses Kelly Criterion and dynamic Volatility Adjusted Sizing.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Input Controls */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
           <div className="bg-black/40 border border-white/5 rounded-3xl p-8 space-y-8 backdrop-blur-sm">
                <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-2">
                        <Wallet className="w-3 h-3" /> Total Trading Capital (₹)
                    </label>
                    <div className="flex gap-4">
                       {[100000, 500000, 1000000, 5000000].map(val => (
                           <button 
                             key={val}
                             onClick={() => setCapital(val)}
                             className={`px-3 py-1.5 rounded-lg border text-[10px] font-black tracking-tighter transition-all ${capital === val ? 'bg-blue-500 border-blue-500 text-white' : 'border-white/5 bg-white/2 hover:bg-white/5 text-slate-500'}`}
                           >
                            {val >= 1000000 ? `${val/1000000}M` : `${val/1000}K`}
                           </button>
                       ))}
                    </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5">
                    <div className="flex justify-between items-center">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Risk Per Trade (%)</label>
                        <span className="text-sm font-black text-white">{riskPerTrade}%</span>
                    </div>
                    <input 
                       type="range" min="0.5" max="3" step="0.5" value={riskPerTrade}
                       onChange={(e) => setRiskPerTrade(parseFloat(e.target.value))}
                       className="w-full h-1 bg-white/5 rounded-full appearance-none accent-blue-500 cursor-pointer"
                    />
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5">
                    <div className="flex justify-between items-center">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest text-rose-500/80">Max Daily Drawdown (%)</label>
                        <span className="text-sm font-black text-white">{maxDrawdown}%</span>
                    </div>
                    <input 
                       type="range" min="2" max="10" step="1" value={maxDrawdown}
                       onChange={(e) => setMaxDrawdown(parseInt(e.target.value))}
                       className="w-full h-1 bg-white/5 rounded-full appearance-none accent-rose-500 cursor-pointer"
                    />
                </div>

                <div className="pt-6">
                    <div className="flex items-start gap-4 p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
                        <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <p className="text-[10px] text-slate-400 italic">
                            Kelly Criterion sizing enabled. If win probability drops below 55%, unit exposure will automatically scale back 0.5x.
                        </p>
                    </div>
                </div>
           </div>
        </div>

        {/* Calculated Output */}
        <div className="col-span-12 lg:col-span-7 space-y-6">
            <div className="grid grid-cols-2 gap-6">
                <div className="p-8 bg-black/60 border border-white/5 rounded-3xl space-y-2 relative overflow-hidden backdrop-blur-md">
                   <div className="absolute top-0 right-0 p-4 opacity-10"><Landmark className="w-12 h-12" /></div>
                   <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Amount Risked Per Trade</div>
                   <div className="text-3xl font-black text-white tabular-nums">₹{riskValue}</div>
                </div>
                <div className="p-8 bg-black/60 border border-white/5 rounded-3xl space-y-2 relative overflow-hidden backdrop-blur-md">
                   <div className="absolute top-0 right-0 p-4 opacity-10"><ShieldAlert className="w-12 h-12 text-rose-500" /></div>
                   <div className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Daily Circuit Stop</div>
                   <div className="text-3xl font-black text-white tabular-nums">₹{dailyStop}</div>
                </div>
            </div>

            <div className="p-8 bg-black/40 border border-white/5 rounded-3xl space-y-8">
                <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] flex items-center gap-2">
                        <PieChart className="w-4 h-4" /> Capital Distribution Analysis
                    </h3>
                    <span className="text-[11px] font-bold text-slate-300">₹{capital.toLocaleString()} Total</span>
                </div>
                
                <div className="h-4 w-full bg-white/5 rounded-full flex overflow-hidden border border-white/5">
                   <div className="bg-blue-500 h-full" style={{ width: '30%' }} />
                   <div className="bg-emerald-500 h-full" style={{ width: '40%' }} />
                   <div className="bg-indigo-500 h-full" style={{ width: '20%' }} />
                   <div className="bg-slate-500 h-full" style={{ width: '10%' }} />
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {splits.map((split, i) => (
                        <div key={i} className="space-y-1">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${split.color}`} />
                                <div className="text-[9px] font-black uppercase text-slate-500 tracking-widest">{split.label}</div>
                            </div>
                            <div className="text-sm font-black text-white tabular-nums">₹{split.value}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
