import React from 'react';
import { motion } from 'motion/react';
import { Search, Brain, MessageSquare, ShieldAlert, Layers, Network, Zap, Activity, ShieldCheck } from 'lucide-react';

const agents = [
  {
    icon: Activity,
    title: 'Technical Intelligence',
    desc: 'Analyzes candlestick patterns, support/resistance levels, and 45+ technical indicators.',
    capabilities: ['RSI Convergence', 'Volume Profiles', 'Pattern Recog']
  },
  {
    icon: Brain,
    title: 'LSTM Predictor',
    desc: 'Neural engine specialized in time-series forecasting for next-candle probability.',
    capabilities: ['Temporal State', 'Sequence Analysis', 'Trend Forecast']
  },
  {
    icon: MessageSquare,
    title: 'Sentiment NLP',
    desc: 'Scrapes news, earnings transcripts, and social sentiment to gauge market mood.',
    capabilities: ['Contextual Mining', 'Impact Scoring', 'Trend Detection']
  },
  {
    icon: ShieldAlert,
    title: 'Detection Unit',
    desc: 'Advanced logic to identify circular trading, spoofing, and pump-dump schemes.',
    capabilities: ['Anomalies', 'Wash Trade Detection', 'Risk Flagging']
  },
  {
    icon: Layers,
    title: 'Options Flow',
    desc: 'Tracks unusual institutional activity in the options Greeks (Delta/Gamma/Vega).',
    capabilities: ['OI Spikes', 'Sweeps Tracking', 'Pin Analysis']
  },
  {
    icon: Network,
    title: 'Correlation Engine',
    desc: 'Calculates inter-market dependencies between NIFTY, Crude, USD/INR, and US Yields.',
    capabilities: ['Asset Coupling', 'Lead/Lag Metrics', 'Global Impact']
  },
  {
    icon: Search,
    title: 'Scanner Cluster',
    desc: 'Auto-discovery of NIFTY 500 alpha opportunities using multi-factor filtering.',
    capabilities: ['Nifty500 Scan', 'Volume Profile', 'Score Rank']
  },
  {
    icon: ShieldCheck,
    title: 'Insider Tracker',
    desc: 'Monitors NSE official filings for promoter acquisitions and significant stakeholder shifts.',
    capabilities: ['Bulk/Block Deals', 'Promoter Bias', 'Filing Sync']
  },
  {
    icon: Zap,
    title: 'Core RL Layer',
    desc: 'The master agent that aggregates all inputs and executes strategic weights.',
    capabilities: ['Policy Optimization', 'Reward Shaping', 'Meta-Learning']
  }
];

export const AgentModules = () => {
  return (
    <div className="space-y-12 py-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-black tracking-tighter text-white uppercase">Neural Agent Specialized Clusters</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm">
          ARIA is not a single model, but an ensemble of 7 specialized agents working in parallel to build a comprehensive market thesis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {agents.map((agent, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className={`p-6 bg-black/40 border border-white/5 rounded-2xl flex flex-col space-y-4 hover:border-blue-500/30 transition-all group ${i === agents.length - 1 ? 'lg:col-span-1 xl:col-span-2 bg-gradient-to-br from-blue-600/10 to-transparent' : ''}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${i === agents.length - 1 ? 'bg-blue-500/20' : 'bg-white/5 group-hover:bg-blue-500/10'}`}>
              <agent.icon className={`w-5 h-5 ${i === agents.length - 1 ? 'text-blue-400' : 'text-slate-400 group-hover:text-blue-400'}`} />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-black text-white uppercase tracking-wider">{agent.title}</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed italic">{agent.desc}</p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {agent.capabilities.map((cap, j) => (
                <span key={j} className="text-[9px] font-bold text-blue-400/60 bg-blue-400/5 px-2 py-0.5 rounded border border-blue-400/10 uppercase tracking-widest">
                  {cap}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
