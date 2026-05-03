import React from 'react';
import { motion } from 'motion/react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts';
import { RefreshCcw, Database, Brain, Zap, Target } from 'lucide-react';

const learningData = Array(26).fill(0).map((_, i) => {
  const winRate = 48 + (Math.sqrt(i) * 6.5) + (Math.random() * 2);
  return { week: i + 1, winRate: parseFloat(winRate.toFixed(1)) };
});

export const AutoEvolution = () => {
  return (
    <div className="space-y-12 py-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-black tracking-tighter text-white uppercase">Self-Evolving Multi-Agent RL</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm">
          ARIA uses Reinforcement Learning (RL) to refine its own policy. Every trade is a data point used to update the reward function and neural weights.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {[
          { icon: Database, title: 'Observe', desc: 'Ingesting 15,000+ data points per tick.' },
          { icon: Brain, title: 'Decide', desc: 'Policy network selects optimal action.' },
          { icon: Target, title: 'Reward', desc: 'Comparing P&L outcome vs Expected Alpha.' },
          { icon: RefreshCcw, title: 'Op-Tune', desc: 'Optuna-driven hyperparameter pruning.' },
          { icon: Zap, title: 'Evolve', desc: 'Meta-learning across trade clusters.' },
        ].map((step, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-black/40 border border-white/5 rounded-2xl flex flex-col items-center text-center space-y-3"
          >
             <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <step.icon className={`w-5 h-5 text-blue-400 ${step.title === 'Update' ? 'animate-spin-slow' : ''}`} />
             </div>
             <h3 className="text-xs font-black text-white uppercase tracking-widest">{step.title}</h3>
             <p className="text-[10px] text-slate-500 font-medium">{step.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-black/60 border border-white/5 rounded-3xl p-10 space-y-8 relative overflow-hidden backdrop-blur-md">
         <div className="absolute top-0 right-0 p-8 opacity-5">
            <Brain className="w-32 h-32 text-blue-500" />
         </div>

         <div className="space-y-2 relative z-10">
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500">26-Week System Learning Curve</h3>
            <div className="text-slate-300 text-xs font-medium max-w-lg">
                Win-rate progression as ARIA accumulates experience and minimizes policy entropy.
            </div>
         </div>

         <div className="h-[350px] w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={learningData}>
                  <defs>
                    <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#ffffff05" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="week" stroke="#ffffff20" fontSize={10} label={{ value: 'Week', position: 'insideBottom', offset: -5, fontSize: 10, fill: '#64748b' }} />
                  <YAxis domain={[40, 90]} stroke="#ffffff20" fontSize={10} label={{ value: 'Win Rate %', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#64748b' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0c0c0e', borderColor: '#ffffff10', borderRadius: '8px' }}
                    itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="winRate" stroke="#3b82f6" fill="url(#colorLevel)" strokeWidth={3} animationDuration={3000} />
               </AreaChart>
            </ResponsiveContainer>
         </div>

         <div className="flex justify-between items-center pt-6 border-t border-white/5 relative z-10 font-black uppercase text-[10px] tracking-widest leading-none">
            <div className="flex gap-8">
                <div className="space-y-1">
                    <div className="text-slate-500">Initial State</div>
                    <div className="text-slate-300">48.2% Accuracy</div>
                </div>
                <div className="space-y-1">
                    <div className="text-slate-500">Steady State (Week 26)</div>
                    <div className="text-blue-400">~79.8% Accuracy</div>
                </div>
            </div>
            <div className="text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded border border-emerald-500/20">Learning Saturation: 92%</div>
         </div>
      </div>
    </div>
  );
};
