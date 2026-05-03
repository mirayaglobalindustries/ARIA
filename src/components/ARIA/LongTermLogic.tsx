import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, BarChart2, Zap, Briefcase, TrendingUp } from 'lucide-react';

const portfolio = [
  { symbol: 'RELIANCE.NS', sector: 'Energy/Telco', weight: '22%', confidence: 88, status: 'Accumulate' },
  { symbol: 'HDFCBANK.NS', sector: 'BFSI', weight: '18%', confidence: 82, status: 'Hold' },
  { symbol: 'TCS.NS', sector: 'IT Services', weight: '15%', confidence: 91, status: 'Accumulate' },
  { symbol: 'ICICIBANK.NS', sector: 'BFSI', weight: '12%', confidence: 79, status: 'Hold' },
  { symbol: 'INFY.NS', sector: 'IT Services', weight: '10%', confidence: 85, status: 'Watch' },
];

export const LongTermLogic = () => {
  return (
    <div className="space-y-12 py-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-black tracking-tighter text-white uppercase">Multi-Year Alpha Portfolio</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm">
          ARIA screens for high-conviction structural growth assets using a blend of fundamental health metrics and multi-cycle technical breakouts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: ShieldCheck, title: 'Fundamental Health', desc: 'Screening for Debt-to-Equity < 0.5, ROE > 20%, and consistent FCF yield.' },
          { icon: BarChart2, title: 'Sector Rotation', desc: 'Auto-detecting capital flows across 15 NSE sectors for defensive positioning.' },
          { icon: Zap, title: 'Catalyst Tracking', desc: 'Monitoring regulatory fillings, ESG scores, and expansion announcements.' },
        ].map((item, i) => (
          <div key={i} className="p-6 bg-black/40 border border-white/5 rounded-2xl space-y-4">
             <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-emerald-400" />
             </div>
             <h3 className="text-sm font-black text-white uppercase tracking-wider">{item.title}</h3>
             <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-black/40 border border-white/5 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/2">
            <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Current System Portfolio Holdings</h3>
            <div className="flex gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[9px] font-bold text-slate-500 uppercase">In Balance</span>
                </div>
            </div>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-white/5 bg-black/40">
                        <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest leading-none">Ticker</th>
                        <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest leading-none">Sector</th>
                        <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest leading-none">Allocation</th>
                        <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest leading-none">Confidence</th>
                        <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest leading-none text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {portfolio.map((stock, i) => (
                        <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                            <td className="px-8 py-5">
                                <div className="text-sm font-black text-white group-hover:text-emerald-400 transition-colors">{stock.symbol}</div>
                            </td>
                            <td className="px-8 py-5 text-[11px] font-medium text-slate-400 uppercase tracking-wider">{stock.sector}</td>
                            <td className="px-8 py-5">
                                <div className="text-xs font-bold text-slate-300 font-mono">{stock.weight}</div>
                            </td>
                            <td className="px-8 py-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 max-w-[60px] h-1 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500" style={{ width: `${stock.confidence}%` }} />
                                    </div>
                                    <span className="text-[10px] font-bold text-emerald-400">{stock.confidence}%</span>
                                </div>
                            </td>
                            <td className="px-8 py-5 text-right">
                                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded ${stock.status === 'Accumulate' ? 'bg-blue-500/10 text-blue-400' : stock.status === 'Hold' ? 'bg-slate-500/10 text-slate-400' : 'bg-orange-500/10 text-orange-400'}`}>
                                    {stock.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};
