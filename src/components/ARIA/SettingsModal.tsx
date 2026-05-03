import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, Cpu, Key, Monitor, Save, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Settings {
  maxRiskPerStock: number;
  maxVolatility: number;
  selectedLLM: string;
  trainingIntensity: 'Standard' | 'Aggressive' | 'Institutional';
  scanRefreshRate: number;
  apiMode: 'Simulation' | 'Live-Test';
  kiteApiKey: string;
  kiteApiSecret: string;
  kiteTotpSecret: string;
  autoExecute: boolean;
}

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  onSave: (newSettings: Settings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, settings, onSave }) => {
  const [localSettings, setLocalSettings] = React.useState<Settings>(settings);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(localSettings);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0a0c10] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <Cpu className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">System Parameters</h2>
                <p className="text-[10px] text-slate-500 font-mono">ARIA HYPER-CORE v4.0 CONFIG</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Body */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
            {/* Risk Control */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-rose-400">
                <Shield className="w-4 h-4" />
                <span className="text-[11px] font-black uppercase tracking-widest">Risk Guardrails</span>
              </div>
              <div className="space-y-4 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <label>Max Risk Per Stock</label>
                    <span className="font-mono text-white">{localSettings.maxRiskPerStock}%</span>
                  </div>
                  <input 
                    type="range" min="1" max="20" step="0.5"
                    value={localSettings.maxRiskPerStock}
                    onChange={(e) => setLocalSettings({...localSettings, maxRiskPerStock: parseFloat(e.target.value)})}
                    className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <label>Max Portfolio Volatility</label>
                    <span className="font-mono text-white">{localSettings.maxVolatility}%</span>
                  </div>
                  <input 
                    type="range" min="10" max="60" step="1"
                    value={localSettings.maxVolatility}
                    onChange={(e) => setLocalSettings({...localSettings, maxVolatility: parseFloat(e.target.value)})}
                    className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Neural Cluster */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-blue-400">
                <Cpu className="w-4 h-4" />
                <span className="text-[11px] font-black uppercase tracking-widest">Neural Cluster</span>
              </div>
              <div className="space-y-4 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400">Local LLM Driver</label>
                  <select 
                    value={localSettings.selectedLLM}
                    onChange={(e) => setLocalSettings({...localSettings, selectedLLM: e.target.value})}
                    className="w-full bg-[#050608] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/50"
                  >
                    <option value="llama3.2:1b">Llama 3.2 (1b) - Optimal</option>
                    <option value="mistral:7b">Mistral (7b) - Deep</option>
                    <option value="phi3:medium">Phi-3 Medium - Precise</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400">Agent Intensity</label>
                  <div className="grid grid-cols-1 gap-2">
                    {['Standard', 'Aggressive', 'Institutional'].map((tier) => (
                      <button
                        key={tier}
                        onClick={() => setLocalSettings({...localSettings, trainingIntensity: tier as any})}
                        className={`px-3 py-2 text-[10px] rounded-lg border transition-all ${
                          localSettings.trainingIntensity === tier 
                            ? 'bg-blue-500/10 border-blue-500/50 text-blue-400' 
                            : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/10'
                        }`}
                      >
                        {tier} Mode
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Brokerage Integration */}
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Key className="w-4 h-4" />
                  <span className="text-[11px] font-black uppercase tracking-widest">Brokerage Integration (Zerodha Kite)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-slate-500 uppercase font-black">Auto-Execute</span>
                  <button 
                    onClick={() => setLocalSettings({...localSettings, autoExecute: !localSettings.autoExecute})}
                    className={cn(
                      "w-8 h-4 rounded-full relative transition-colors border",
                      localSettings.autoExecute ? "bg-emerald-500/20 border-emerald-500" : "bg-white/5 border-white/10"
                    )}
                  >
                    <motion.div 
                      animate={{ x: localSettings.autoExecute ? 18 : 2 }}
                      className={cn("absolute top-0.5 w-2.5 h-2.5 rounded-full transition-colors", localSettings.autoExecute ? "bg-emerald-400" : "bg-slate-600")}
                    />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white/[0.02] p-6 rounded-xl border border-white/5">
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400">Execution Mode</label>
                  <select 
                    value={localSettings.apiMode}
                    onChange={(e) => setLocalSettings({...localSettings, apiMode: e.target.value as any})}
                    className="w-full bg-[#050608] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                  >
                    <option value="Simulation">Simulation Mode</option>
                    <option value="Live-Test">Live-Test Mode (Real Data)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400 font-mono tracking-tighter">KITE_API_KEY</label>
                  <input 
                    type="password"
                    value={localSettings.kiteApiKey}
                    onChange={(e) => setLocalSettings({...localSettings, kiteApiKey: e.target.value})}
                    placeholder="API Key"
                    className="w-full bg-[#050608] border border-white/10 rounded-lg px-3 py-2 text-[10px] text-white focus:outline-none focus:border-emerald-500/50 placeholder:text-slate-700 font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400 font-mono tracking-tighter">KITE_API_SECRET</label>
                  <input 
                    type="password"
                    value={localSettings.kiteApiSecret}
                    onChange={(e) => setLocalSettings({...localSettings, kiteApiSecret: e.target.value})}
                    placeholder="API Secret"
                    className="w-full bg-[#050608] border border-white/10 rounded-lg px-3 py-2 text-[10px] text-white focus:outline-none focus:border-emerald-500/50 placeholder:text-slate-700 font-mono"
                  />
                </div>
                <div className="space-y-2 md:col-span-3">
                  <label className="text-[10px] text-slate-400 font-mono tracking-tighter">TOTP_SECRET (2FA)</label>
                  <div className="relative">
                    <input 
                      type="password"
                      value={localSettings.kiteTotpSecret}
                      onChange={(e) => setLocalSettings({...localSettings, kiteTotpSecret: e.target.value})}
                      placeholder="Enter 2FA TOTP Secret Key"
                      className="w-full bg-[#050608] border border-white/10 rounded-lg px-3 py-2 text-[10px] text-white focus:outline-none focus:border-emerald-500/50 placeholder:text-slate-700 font-mono"
                    />
                    <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600" />
                  </div>
                  <p className="text-[9px] text-slate-600 italic">
                    Keys are locally cached and never transmitted to our servers. Only proxying for NSE handshake.
                  </p>
                </div>
              </div>
            </div>

            {/* Interface */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-amber-400">
                <Monitor className="w-4 h-4" />
                <span className="text-[11px] font-black uppercase tracking-widest">UI Preferences</span>
              </div>
              <div className="space-y-4 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <label>Terminal Pulse Frequency</label>
                    <span className="font-mono text-white">{localSettings.scanRefreshRate}s</span>
                  </div>
                  <input 
                    type="range" min="1" max="10" step="1"
                    value={localSettings.scanRefreshRate}
                    onChange={(e) => setLocalSettings({...localSettings, scanRefreshRate: parseInt(e.target.value)})}
                    className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-amber-500"
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-[#050608] rounded-lg border border-white/5">
                  <span className="text-[10px] text-slate-400">Bento Grid Layout</span>
                  <div className="w-8 h-4 bg-emerald-500/20 rounded-full relative border border-emerald-500/50">
                    <div className="absolute right-1 top-1 w-2 h-2 bg-emerald-400 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
            <button 
              onClick={onClose}
              className="px-6 py-2 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-slate-300 transition-colors"
            >
              Discard Changes
            </button>
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 px-8 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg shadow-blue-950/40"
            >
              <Save className="w-3 h-3" />
              Apply Configuration
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
