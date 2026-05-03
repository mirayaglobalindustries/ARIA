import React from 'react';
import { motion } from 'motion/react';
import { Code2, Play, Terminal } from 'lucide-react';

const PYTHON_BLUEPRINT = `
# --- ARIA HYPER-CORE v4.0 [OPEN-SOURCE EDITION] ---
# pip install yfinance pandas numpy ta-lib stable-baselines3 ollama vaderSentiment duckduckgo-search optuna

import yfinance as yf
import pandas as pd
import ollama
import os
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from duckduckgo_search import DDGS
from stable_baselines3 import PPO
import optuna

class ARIAAgentV4:
    def __init__(self, model="llama3.2:1b"):
        self.llm = model
        self.sentiment_analyzer = SentimentIntensityAnalyzer()
        self.search_engine = DDGS()
        self.rl_policy = PPO.load("aria_policy_latest") if os.path.exists("aria_policy_latest") else None

    async def hybrid_risk_check(self, symbol):
        """LOCAL LLM (Ollama) + DDG Search + VADER Sentiment"""
        # 1. Fetch Free News via DDG
        results = self.search.text(f"{symbol} stock news SEBI insider", max_results=5)
        headlines = [r['title'] for r in results]
        
        # 2. Local LLM Analysis (Ollama)
        prompt = f"Analyze for stock risks: insider trading, pump/dump. Symbol: {symbol}. Headlines: {headlines}"
        response = ollama.chat(model=self.llm, messages=[{'role': 'user', 'content': prompt}])
        
        # 3. Sentiment Intensity
        vader_score = self.sentiment.polarity_scores(" ".join(headlines))['compound']
        
        return {
            "llm_analysis": response['message']['content'],
            "sentiment": vader_score,
            "risk_level": "LOW" if vader_score > 0.2 else "HIGH"
        }

    def train_with_hpo(self, data):
        """Optuna-driven Hyperparameter Optimization for Policy Gradients"""
        def objective(trial):
            lr = trial.suggest_float("lr", 1e-5, 1e-3, log=True)
            ent_coef = trial.suggest_float("ent_coef", 0.0001, 0.01)
            # Train and return backtest reward
            return self.simulate_backtest(lr, ent_coef)

        study = optuna.create_study(direction="maximize")
        study.optimize(objective, n_trials=50)
        return study.best_params

# --- DEPLOYMENT ---
aria = ARIAAgentV4(model="llama3.2:1b")
# await aria.hybrid_risk_check("RELIANCE")
# params = aria.train_with_hpo(historical_data)
`;

export const CodeBlueprint = () => {
  return (
    <div className="space-y-12 py-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-black tracking-tighter text-white uppercase">Operational Code Blueprint</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm">
          A high-level Python abstraction of the ARIA core logic, showcasing the integration of the ensemble, position sizing, and RL feedback loops.
        </p>
      </div>

      <div className="max-w-5xl mx-auto h-[600px] flex flex-col bg-black/60 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl relative">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
             <Code2 className="w-48 h-48 text-emerald-500" />
          </div>

          <div className="bg-white/5 px-8 py-4 flex items-center justify-between border-b border-white/5 relative z-10">
            <div className="flex items-center gap-6">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500/40" />
                <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
              </div>
              <div className="h-4 w-px bg-white/5" />
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                <Terminal className="w-3.5 h-3.5" />
                aria_quant_core.py
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="text-[9px] font-mono text-emerald-500/60 font-black animate-pulse">V3.1-STABLE</div>
              <button className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md text-[9px] font-black uppercase tracking-widest hover:bg-emerald-500/20 transition-colors">
                Copy Logic
              </button>
            </div>
          </div>

          <div className="flex-1 p-8 font-mono text-[11px] leading-relaxed overflow-auto custom-scrollbar selection:bg-emerald-500/30 selection:text-white relative z-10">
            <pre className="text-emerald-400/80">
              {PYTHON_BLUEPRINT.trim().split('\n').map((line, i) => (
                <div key={i} className="flex gap-8 group">
                  <span className="w-8 text-slate-700 text-right select-none font-bold group-hover:text-slate-500 transition-colors">{i+1}</span>
                  <span className="group-hover:text-emerald-300 transition-colors whitespace-pre-wrap">{line || ' '}</span>
                </div>
              ))}
            </pre>
          </div>
      </div>
    </div>
  );
};
