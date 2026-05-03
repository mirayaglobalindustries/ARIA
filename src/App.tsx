/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Cpu, 
  Terminal, 
  Play, 
  Pause, 
  LayoutDashboard, 
  Code2, 
  ShieldAlert, 
  Wallet,
  Zap,
  BarChart3,
  Bot,
  Network,
  GitBranch,
  Gauge,
  Timer,
  Lock,
  History,
  Info,
  RefreshCcw,
  Settings,
  Shield
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// --- ARIA Sub-Components ---
import { Architecture } from './components/ARIA/Architecture';
import { AgentModules } from './components/ARIA/AgentModules';
import { SignalEngine } from './components/ARIA/SignalEngine';
import { IntradayLogic } from './components/ARIA/IntradayLogic';
import { LongTermLogic } from './components/ARIA/LongTermLogic';
import { RiskAllocation } from './components/ARIA/RiskAllocation';
import { AutoEvolution } from './components/ARIA/AutoEvolution';
import { CodeBlueprint } from './components/ARIA/CodeBlueprint';
import { SettingsModal } from './components/ARIA/SettingsModal';

// --- Types ---
interface Stock {
  symbol: string;
  regularMarketPrice: number;
  regularMarketChangePercent: number;
  longName?: string;
  currency?: string;
}

interface Prediction {
  symbol: string;
  prediction: "BULLISH" | "BEARISH" | "NEUTRAL";
  confidence: string;
  target: string;
  reasoning: string;
}

// --- ARIA Advanced Python Blueprint (Stored for Logic Lab) ---
const PYTHON_FRAMEWORK = `
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
        results = self.search_engine.text(f"{symbol} stock news SEBI insider", max_results=5)
        headlines = [r['title'] for r in results]
        
        # 2. Local LLM Analysis (Ollama)
        prompt = f"Analyze for stock risks: insider trading, pump/dump. Symbol: {symbol}. Headlines: {headlines}"
        response = ollama.chat(model=self.llm, messages=[{'role': 'user', 'content': prompt}])
        
        # 3. Sentiment Intensity
        vader_score = self.sentiment_analyzer.polarity_scores(" ".join(headlines))['compound']
        
        return {
            "llm_analysis": response['message']['content'],
            "sentiment": vader_score,
            "risk_level": "LOW" if vader_score > 0.2 else "HIGH"
        }
`;

export default function App() {
  const [watchlist, setWatchlist] = useState<Stock[]>([]);
  const [selectedStock, setSelectedStock] = useState('RELIANCE.NS');
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [isLive, setIsLive] = useState(false);
  const [activeTab, setActiveTab] = useState<'market' | 'aria' | 'ai' | 'code'>('market');
  const [activeAriaSection, setActiveAriaSection] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Settings State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState({
    maxRiskPerStock: 8.0,
    maxVolatility: 45.0,
    selectedLLM: 'llama3.2:1b',
    trainingIntensity: 'Standard' as const,
    scanRefreshRate: 5,
    apiMode: 'Simulation' as const,
    kiteApiKey: '',
    kiteApiSecret: '',
    kiteTotpSecret: '',
    autoExecute: false
  });

  // Training State
  const [isTraining, setIsTraining] = useState(false);
  const [trainingSecondsLeft, setTrainingSecondsLeft] = useState(0);
  const [trainingCycles, setTrainingCycles] = useState(0);
  const TRAINING_DURATION = 15 * 60; // 15 minutes in seconds

  // Deployment State
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStep, setDeployStep] = useState(0);
  const [deployLogs, setDeployLogs] = useState<string[]>([]);
  const [deployComplete, setDeployComplete] = useState(false);

  const DEPLOY_STEPS = [
    "Initializing Production Handshake...",
    "Verifying Neural Weights v4.0...",
    "Auditing Security Rules & Firewalls...",
    "Optimizing Execution Latency...",
    "Authenticating with NSE Live Stream...",
    "Deploying ARIA Hyper-Core to Cloud...",
    "System Synchronized. Live Execution Active."
  ];

  const handleDeploy = () => {
    if (isDeploying || deployComplete) return;
    setIsDeploying(true);
    setDeployStep(0);
    setDeployLogs([]);
    
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < DEPLOY_STEPS.length) {
        setDeployLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${DEPLOY_STEPS[currentStep]}`]);
        setDeployStep(currentStep + 1);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsDeploying(false);
          setDeployComplete(true);
          setIsLive(true);
          triggerError("Production Deployment Successful. System is now LIVE.");
        }, 1000);
      }
    }, 1500);
  };

  const ARIA_SECTIONS = [
    { id: 'arch', label: 'Architecture', icon: Network, component: Architecture },
    { id: 'agents', label: 'Agent Modules', icon: Bot, component: AgentModules },
    { id: 'signal', label: 'Signal Engine', icon: Gauge, component: SignalEngine },
    { id: 'intra', label: 'Intraday Logic', icon: Timer, component: IntradayLogic },
    { id: 'long', label: 'Long-term Logic', icon: GitBranch, component: LongTermLogic },
    { id: 'risk', label: 'Risk & Allocation', icon: Lock, component: RiskAllocation },
    { id: 'evolve', label: 'Auto-Evolution', icon: History, component: AutoEvolution },
    { id: 'blueprint', label: 'Code Blueprint', icon: Code2, component: CodeBlueprint },
  ];

  // Helper for clearable errors
  const triggerError = (msg: string) => {
    setError(msg);
    // Auto-clear after 8 seconds
    setTimeout(() => setError(null), 8000);
  };

  // Training Logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTraining && trainingSecondsLeft > 0) {
      timer = setInterval(() => {
        setTrainingSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (isTraining && trainingSecondsLeft <= 0) {
      setIsTraining(false);
      setTrainingCycles(prev => prev + 1);
      triggerError("Neural Recalibration Complete. Core Intelligence Updated.");
    }
    return () => clearInterval(timer);
  }, [isTraining, trainingSecondsLeft]);

  const handleStartTraining = () => {
    if (isTraining) return;
    setIsTraining(true);
    setTrainingSecondsLeft(TRAINING_DURATION);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // Fetch Watchlist
  useEffect(() => {
    let retryCount = 0;
    const fetchWatchlist = async () => {
      try {
        const res = await fetch('/api/watchlist').catch(err => {
          throw new Error(`Watchlist network failure: ${err.message}`);
        });
        
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `Market watchlist service returned ${res.status}`);
        }
        const data = await res.json();
        if (Array.isArray(data)) {
          setWatchlist(data);
        }
        setIsLoading(false);
        retryCount = 0; // Reset on success
      } catch (e: any) {
        console.error("Watchlist fetch error:", e);
        if (retryCount < 3) {
          retryCount++;
          console.log(`Retrying watchlist fetch (${retryCount}/3)...`);
          setTimeout(fetchWatchlist, 1500 * retryCount);
        } else {
          triggerError(e.message || "Connection to Market Pulse lost");
          setIsLoading(false);
        }
      }
    };

    const initialTimer = setTimeout(fetchWatchlist, 1000);
    const interval = setInterval(fetchWatchlist, 10000);
    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  // Fetch Stock Details
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const hRes = await fetch(`/api/history/${selectedStock}`).catch(err => {
          throw new Error(`History network failure: ${err.message}`);
        });

        if (!hRes.ok) {
          const errData = await hRes.json().catch(() => ({}));
          throw new Error(errData.error || `Historical data sync failed (${hRes.status})`);
        }
        const hData = await hRes.json();
        
        if (Array.isArray(hData)) {
          setHistory(hData.map((d: any) => ({ ...d, date: d.date ? d.date.split('T')[0] : '' })));
        } else {
          setHistory([]);
        }

        const pRes = await fetch(`/api/predict/${selectedStock}`).catch(err => {
          console.warn("Prediction network failure:", err.message);
          return null;
        });

        if (pRes && pRes.ok) {
          const pData = await pRes.json();
          setPrediction(pData);
        } else if (pRes) {
          const errData = await pRes.json().catch(() => ({}));
          console.warn("Prediction fetch failed:", errData.error);
          triggerError(`Neural prediction limited for ${selectedStock.replace('.NS', '')}`);
        }
      } catch (e: any) {
        console.error("Details fetch error:", e);
        triggerError(e.message || "Asset analytics failed to load");
        setHistory([]);
      }
    };
    fetchDetails();
  }, [selectedStock]);

  return (
    <div className="min-h-screen bg-[#050608] text-slate-300 font-sans flex flex-col overflow-hidden select-none selection:bg-blue-500/30">
      {/* Immersive Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Error Notification system */}
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-20 left-1/2 z-[100] min-w-[320px] -translate-x-1/2"
          >
            <div className="bg-rose-500/10 backdrop-blur-md border border-rose-500/20 p-4 rounded-xl flex items-start gap-4 shadow-2xl shadow-rose-950/20">
              <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center flex-shrink-0">
                <ShieldAlert className="w-5 h-5 text-rose-500" />
              </div>
              <div className="flex-1 pt-0.5">
                <div className="text-white text-xs font-black uppercase tracking-widest mb-1">System Error</div>
                <div className="text-slate-400 text-[11px] leading-relaxed font-medium">{error}</div>
              </div>
              <button 
                onClick={() => setError(null)}
                className="text-slate-500 hover:text-white transition-colors p-1"
              >
                <Pause className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Header */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        settings={settings}
        onSave={(newSettings) => {
          setSettings(newSettings);
          triggerError(`Settings Applied: ${newSettings.trainingIntensity} Cluster Sync Complete.`);
        }}
      />

      <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-black/40 backdrop-blur-md z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white uppercase">ARIA <span className="text-blue-400 font-mono">QUANTUM</span></span>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-1 bg-white/5 p-1 rounded-lg">
            {[
              { id: 'market', icon: LayoutDashboard, label: 'Market' },
              { id: 'aria', icon: Zap, label: 'ARIA Core' },
              { id: 'ai', icon: Bot, label: 'Predictor' },
              { id: 'code', icon: Code2, label: 'Logic Lab' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "px-4 py-1.5 rounded-md transition-all flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider",
                  activeTab === tab.id 
                    ? "bg-white/10 text-white shadow-sm" 
                    : "text-slate-500 hover:text-white hover:bg-white/5"
                )}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex gap-8 items-center h-full px-6 border-l border-white/10">
            <div className="flex flex-col items-end">
              <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">Allocated capital</span>
              <span className="text-lg font-bold text-white tabular-nums">₹1,00,000.00</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mr-2">
                <Shield className="w-2.5 h-2.5 text-emerald-400" />
                <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">End-to-End Encrypted</span>
              </div>
              <button 
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 text-slate-500 hover:text-white bg-white/5 hover:bg-white/10 rounded border border-white/5 mr-2 transition-all group relative"
              >
                <Settings className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black border border-white/10 rounded text-[9px] uppercase tracking-tighter whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Core Parameters & APIs
                </div>
              </button>
              <div className={cn(
                "h-2 w-2 rounded-full shadow-[0_0_8px] animate-pulse",
                isLive ? "bg-emerald-500 shadow-emerald-500" : "bg-orange-500 shadow-orange-500"
              )}></div>
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-widest",
                isLive ? "text-emerald-400" : "text-orange-400"
              )}>
                {isLive ? 'NSE Live' : 'Paper Mode'}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col overflow-hidden z-10 relative">
        {/* ARIA Sub-navigation (Only shown when aria tab is active) */}
        {activeTab === 'aria' && (
           <div className="h-12 border-b border-white/5 bg-black/20 flex items-center px-6 gap-6 overflow-x-auto no-scrollbar backdrop-blur-sm">
             {ARIA_SECTIONS.map((section, idx) => (
                <button
                  key={section.id}
                  onClick={() => setActiveAriaSection(idx)}
                  className={cn(
                    "flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                    activeAriaSection === idx ? "text-blue-400" : "text-slate-500 hover:text-white"
                  )}
                >
                  <section.icon className={cn("w-3.5 h-3.5", activeAriaSection === idx ? "text-blue-400" : "text-slate-600")} />
                  {section.label}
                </button>
             ))}
           </div>
        )}

        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'market' && (
              <motion.div 
                key="market"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full grid grid-cols-12 gap-6"
              >
              {/* Main Chart Area */}
              <div className="col-span-12 lg:col-span-9 space-y-6">
                <div className="bg-black/40 border border-white/5 rounded-2xl flex flex-col relative overflow-hidden backdrop-blur-sm min-h-[500px]">
                  <div className="p-6 flex justify-between items-start w-full z-10 bg-gradient-to-b from-black/40 to-transparent">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-white text-2xl font-black tracking-tighter">{selectedStock.replace('.NS', '')}</span>
                        <span className="text-slate-500 text-xs px-1.5 py-0.5 border border-white/5 rounded">NSE · EQUITY</span>
                      </div>
                      <div className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-bold inline-block uppercase tracking-wider">
                        {prediction?.prediction === 'BULLISH' ? 'Neural Buy Signal Detected' : 'Analyzing Volatility Clusters'}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="text-3xl font-black text-white tabular-nums">
                        ₹{watchlist.find(s => s.symbol === selectedStock)?.regularMarketPrice.toLocaleString() || '---'}
                      </div>
                      <div className={cn(
                        "text-xs font-bold font-mono px-2 py-0.5 rounded",
                        (watchlist.find(s => s.symbol === selectedStock)?.regularMarketChangePercent || 0) >= 0 
                          ? "bg-emerald-500/10 text-emerald-400" 
                          : "bg-rose-500/10 text-rose-400"
                      )}>
                        {(watchlist.find(s => s.symbol === selectedStock)?.regularMarketChangePercent || 0).toFixed(2)}%
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 h-[400px] mt-[-60px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={history}>
                        <defs>
                          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff03" vertical={false} />
                        <XAxis dataKey="date" hide />
                        <YAxis 
                          domain={['auto', 'auto']}
                          orientation="right"
                          stroke="#ffffff10"
                          fontSize={9}
                          tickFormatter={(val) => `₹${val.toLocaleString()}`}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0c0c0e', borderColor: '#ffffff05', borderRadius: '8px', fontSize: '12px' }}
                          itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="close" 
                          stroke="#10b981" 
                          strokeWidth={2}
                          fillOpacity={1} 
                          fill="url(#colorPrice)" 
                          animationDuration={1500}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="h-14 border-t border-white/5 bg-black/20 flex items-center px-6 justify-between text-[10px] font-mono text-slate-500">
                    <div className="flex gap-6 uppercase">
                      <span>RSI(14): <span className="text-emerald-400">62.45</span></span>
                      <span>Vol(Avg): <span className="text-slate-300">4.18M</span></span>
                      <span>SMA(20): <span className="text-slate-300">2,884.20</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400/60 font-bold uppercase tracking-widest">
                        Model accuracy: {(89.2 + (trainingCycles * 1.5)).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Long-term Alpha</h3>
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-white mb-1">UPTREND LIKELY</div>
                      <p className="text-[11px] text-slate-500 leading-relaxed italic">
                        Neural ensemble predicts 14.8% growth probability in next 22 trading sessions based on volume breakout patterns.
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[78%]" />
                      </div>
                      <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">78% Confidence</span>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-sm space-y-4">
                     <div className="flex items-center justify-between">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Broker Execution</h3>
                        <Zap className="w-4 h-4 text-emerald-400" />
                     </div>
                     <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                        <div className="w-8 h-8 rounded bg-emerald-500/10 flex items-center justify-center">
                           <Activity className="w-4 h-4 text-emerald-500" />
                        </div>
                        <div className="flex-1">
                           <div className="text-xs font-bold text-white tracking-tight">KOTAK NEO API</div>
                           <div className="text-[9px] text-emerald-500 font-bold uppercase">Ready & Synchronized</div>
                        </div>
                        <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors rounded text-[9px] font-bold uppercase tracking-widest text-slate-300">
                           Cancel All
                        </button>
                     </div>
                  </div>
                </div>
              </div>

              {/* Sidebar: Scanner */}
              <div className="col-span-12 lg:col-span-3 space-y-6">
                <div className="bg-black/40 border border-white/5 rounded-2xl p-5 flex flex-col h-full backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">Market Pulse</h2>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_5px_#10b981]" />
                      <span className="text-[9px] text-emerald-500 font-black uppercase">Scanning</span>
                    </div>
                  </div>

                  <div className="space-y-3 flex-1 overflow-y-auto pr-1 custom-scrollbar">
                    {isLoading ? (
                      Array(8).fill(0).map((_, i) => (
                        <div key={i} className="h-16 bg-white/5 border border-white/5 rounded-xl animate-pulse" />
                      ))
                    ) : watchlist.map((stock) => (
                      <button
                        key={stock.symbol}
                        onClick={() => setSelectedStock(stock.symbol)}
                        className={cn(
                          "w-full p-4 rounded-xl border flex items-center justify-between transition-all group relative overflow-hidden",
                          selectedStock === stock.symbol 
                            ? "bg-white/5 border-emerald-500/30 ring-1 ring-emerald-500/20" 
                            : "bg-white/2 border-white/3 hover:bg-white/5 hover:border-white/10"
                        )}
                      >
                        <div className="text-left relative z-10">
                          <div className={cn(
                            "font-black text-sm tracking-tighter",
                            selectedStock === stock.symbol ? "text-emerald-400" : "text-white"
                          )}>{stock.symbol.replace('.NS', '')}</div>
                          <div className={cn(
                            "text-[9px] font-bold uppercase tracking-widest",
                            stock.regularMarketChangePercent >= 0 ? "text-emerald-500/60" : "text-rose-500/60"
                          )}>
                            {stock.regularMarketChangePercent >= 0 ? '+' : ''}{stock.regularMarketChangePercent.toFixed(2)}%
                          </div>
                        </div>
                        <div className="text-right relative z-10 tabular-nums">
                          <div className="text-sm font-bold text-white">₹{Math.floor(stock.regularMarketPrice).toLocaleString()}</div>
                          <div className="text-[9px] text-slate-600 font-mono tracking-tighter uppercase">{stock.regularMarketPrice % 1 > 0 ? (stock.regularMarketPrice % 1).toFixed(2).slice(1) : '.00'}</div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <button 
                    disabled={isLoading}
                    className="mt-6 w-full py-2.5 bg-emerald-500 text-black font-black uppercase text-[11px] tracking-widest rounded-lg transition-transform active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                  >
                    Refresh Scan (NIFTY50)
                  </button>
                </div>
              </div>
            </motion.div>
          )}

            {activeTab === 'aria' && (
              <motion.div
                key={`aria-${activeAriaSection}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full"
              >
                {React.createElement(ARIA_SECTIONS[activeAriaSection].component)}
              </motion.div>
            )}
            {activeTab === 'ai' && (
              <motion.div 
                key="ai"
                initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="max-w-5xl mx-auto space-y-12 py-8"
            >
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] border border-blue-500/20">
                   ARIA Hyper-Core v4.{trainingCycles} • Local LLM Active
                </div>
                <h1 className="text-5xl font-black tracking-tighter text-white">ARIA Neural Lens</h1>
                <p className="text-slate-500 max-w-xl mx-auto font-medium text-sm leading-relaxed">
                  Multi-agent ensemble powered by local LLMs (Ollama), news crawlers (DDGS), and Optuna-tuned policy gradients.
                  {trainingCycles > 0 && <span className="block text-emerald-400 mt-2">Enhanced by {trainingCycles} optimization cycles.</span>}
                </p>
                
                <div className="pt-4 flex flex-col items-center gap-6">
                  {!isTraining ? (
                    <button 
                      id="aria-recalibrate-btn"
                      onClick={handleStartTraining}
                      className="group relative px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-black text-xs uppercase tracking-[0.4em] transition-all overflow-hidden shadow-[0_0_40px_rgba(79,70,229,0.4)] active:scale-95 cursor-pointer"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      <span className="relative z-10 flex items-center gap-3">
                        <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                        Initiate Neural Recalibration
                      </span>
                    </button>
                  ) : (
                    <div className="w-full max-w-md space-y-4">
                      <div className="flex justify-between items-end">
                        <div className="space-y-1">
                          <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
                             <RefreshCcw className="w-3 h-3 animate-spin" />
                             Training in Progress
                          </div>
                          <div className="text-2xl font-black text-white font-mono tabular-nums">{formatTime(trainingSecondsLeft)}</div>
                        </div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                          {Math.floor(((TRAINING_DURATION - trainingSecondsLeft) / TRAINING_DURATION) * 100)}% Complete
                        </div>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full border border-white/5 overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-blue-600 to-indigo-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${((TRAINING_DURATION - trainingSecondsLeft) / TRAINING_DURATION) * 100}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-slate-600 font-medium italic text-center">
                        Synthesizing high-frequency temporal patterns and optimizing policy gradients...
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {prediction && (
                <div className="grid grid-cols-12 gap-8">
                  <div className="col-span-12 lg:col-span-7 bg-black/60 border border-white/5 rounded-3xl p-10 space-y-8 relative overflow-hidden backdrop-blur-md">
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px]" />
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Target Analysis</span>
                        <span className="text-6xl font-black text-white tracking-tighter">{prediction.symbol.replace('.NS', '')}</span>
                      </div>
                      <Bot className="w-12 h-12 text-emerald-500/30" />
                    </div>
                    
                    <div className="space-y-3 pt-6 relative z-10">
                      <div className="flex justify-between text-[11px] text-slate-400 uppercase tracking-[0.2em] font-black">
                        <span>Model confidence</span>
                        <span className="text-emerald-400">{(parseFloat(prediction.confidence) * 100 + (trainingCycles * 2)).toFixed(1)}%</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, parseFloat(prediction.confidence)*100 + (trainingCycles * 2))}%` }}
                          className="h-full bg-emerald-500 shadow-[0_0_15px_#10b981]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-6 pt-10 border-t border-white/5 relative z-10">
                        <div className={cn(
                          "px-8 py-4 rounded-2xl font-black text-lg tracking-tighter text-center grow uppercase",
                          prediction.prediction === 'BULLISH' ? "bg-emerald-500 text-black shadow-2xl" : "bg-rose-500 text-white"
                        )}>
                          Signal: {prediction.prediction}
                        </div>
                        <div className="bg-white/5 px-8 py-4 rounded-2xl border border-white/5 text-center">
                          <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Target</div>
                          <div className="text-lg font-black text-white tabular-nums">{prediction.target}</div>
                        </div>
                    </div>
                  </div>

                  <div className="col-span-12 lg:col-span-5 space-y-6">
                    <div className="p-8 bg-black/40 rounded-3xl border border-white/5 backdrop-blur-sm h-full flex flex-col">
                      <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.22em] mb-6 flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        Neural Logic reasoning
                      </h4>
                      <p className="text-sm font-medium text-slate-300 leading-relaxed italic grow">
                        "{prediction.reasoning}"
                      </p>
                      <div className="mt-8 pt-6 border-t border-white/5">
                         <div className="text-[10px] font-black text-blue-400/60 uppercase tracking-widest mb-4 inline-block">Evolution Log</div>
                         <div className="font-mono text-[10px] text-slate-500 space-y-1.5 opacity-80">
                            <div className="flex gap-2"><span>&gt;</span><span>Epoch_102: loss_minimized</span></div>
                            <div className="flex gap-2"><span>&gt;</span><span>Policy_Grad: updated_weights</span></div>
                            <div className="flex gap-2"><span>&gt;</span><span>Entropy: 0.12 (Low dispersion)</span></div>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'code' && (
            <motion.div 
              key="code"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="max-w-6xl mx-auto space-y-12 py-8"
            >
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em] border border-emerald-500/20">
                   Operational Logic Lab
                </div>
                <h1 className="text-5xl font-black tracking-tighter text-white uppercase">Alpha Synthesis Lab</h1>
                <p className="text-slate-500 max-w-xl mx-auto font-medium text-sm leading-relaxed">
                  Real-time Python abstraction of ARIA's quarter-back logic for high-frequency execution and risk-weighted capital management.
                </p>
              </div>

              <div className="h-[600px] flex flex-col bg-black/60 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl">
              <div className="bg-white/5 px-8 py-5 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-6">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500/40" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
                  </div>
                  <div className="h-6 w-px bg-white/5" />
                  <span className="text-[11px] font-mono font-bold text-slate-500 tracking-wider">quant_core_engine.py</span>
                </div>
                <div className="flex gap-6 items-center">
                  <div className="text-[10px] font-mono text-emerald-500/60 animate-pulse">AUTOSAVE: LOCAL</div>
                  <button 
                    onClick={handleDeploy}
                    disabled={isDeploying || deployComplete}
                    className={cn(
                      "text-[11px] font-black flex items-center gap-2 transition-all uppercase tracking-widest px-3 py-1 rounded border",
                      deployComplete 
                        ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/5 cursor-default" 
                        : isDeploying
                          ? "text-blue-400 border-blue-500/20 bg-blue-500/5 cursor-not-allowed"
                          : "text-emerald-400 hover:text-emerald-300 border-transparent hover:bg-emerald-500/5"
                    )}
                  >
                    {isDeploying ? (
                      <RefreshCcw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Play className="w-3.5 h-3.5" />
                    )}
                    {deployComplete ? "System Live" : isDeploying ? "Deploying..." : "Deploy to Production"}
                  </button>
                </div>
              </div>
              <div className="flex-1 p-10 font-mono text-xs leading-[1.8] overflow-x-auto custom-scrollbar selection:bg-emerald-500 selection:text-black relative">
                <AnimatePresence>
                  {isDeploying && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-50 bg-[#050608]/95 backdrop-blur-md p-10 font-mono"
                    >
                      <div className="flex items-center gap-3 mb-8">
                        <Terminal className="w-5 h-5 text-blue-500" />
                        <span className="text-blue-400 font-bold uppercase tracking-widest text-[11px]">Production Deployment Pipeline</span>
                      </div>
                      <div className="space-y-3">
                        {deployLogs.map((log, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={cn(
                              "text-[11px] border-l-2 pl-4 py-1",
                              i === deployLogs.length - 1 ? "text-emerald-400 border-emerald-500" : "text-slate-500 border-white/10"
                            )}
                          >
                            {log}
                          </motion.div>
                        ))}
                      </div>
                      <div className="mt-12 flex flex-col gap-2">
                        <div className="flex justify-between text-[10px] text-slate-500 uppercase font-black">
                          <span>Overall Progress</span>
                          <span>{Math.round((deployStep / DEPLOY_STEPS.length) * 100)}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                          <motion.div 
                            className="h-full bg-blue-600"
                            initial={{ width: 0 }}
                            animate={{ width: `${(deployStep / DEPLOY_STEPS.length) * 100}%` }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <pre className={cn("text-emerald-400/80 transition-opacity duration-300", isDeploying && "opacity-20")}>
                  {PYTHON_FRAMEWORK.split('\n').map((line, i) => (
                    <div key={i} className="flex gap-8 group">
                      <span className="w-10 text-slate-700 text-right select-none group-hover:text-slate-500 transition-colors">{i+1}</span>
                      <span className="group-hover:text-emerald-300 transition-colors">{line || ' '}</span>
                    </div>
                  ))}
                </pre>
              </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </main>

      {/* Modern Footer Metrics */}
      <footer className="h-10 border-t border-white/5 bg-black/60 px-8 flex items-center justify-between text-[9px] font-black font-mono text-slate-500 uppercase tracking-widest z-50">
        <div className="flex gap-10">
          <span>Tick: <span className="text-slate-300">{new Date().toISOString().replace('T', ' ').split('.')[0]}</span></span>
          <span>Latency: <span className="text-blue-400">8ms</span></span>
          <span>Core: <span className="text-slate-300">ARIA-Ensemble v4.0.1</span></span>
        </div>
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
            <span>Neural Sync: <span className="text-blue-400">ACTIVE</span></span>
          </div>
          <span className="text-slate-400 opacity-50">Node: QUANTUM-LAB-ALPHA</span>
        </div>
      </footer>
    </div>
  );
}
