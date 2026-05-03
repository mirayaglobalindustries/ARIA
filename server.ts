import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import yahooFinance from 'yahoo-finance2';

// ARIA Engine: Yahoo Finance Intialization
// In version 3.x, the default export is already an instance.
const yf = yahooFinance;

async function startServer() {
  try {
    const app = express();
    const PORT = 3000;

    app.use((req, res, next) => {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
      next();
    });

    if (!process.env.NODE_ENV) {
      process.env.NODE_ENV = 'development';
    }

    console.log(`Starting server in ${process.env.NODE_ENV} mode...`);

    try {
      if (yf && typeof (yf as any).setGlobalConfig === 'function') {
        (yf as any).setGlobalConfig({ 
          validation: { enabled: false }
        });
      }
    } catch (e) {
      console.warn("Soft failure during yf config:", e);
    }

    app.get("/api/health", (req, res) => {
      res.json({ 
        status: "ok", 
        env: process.env.NODE_ENV,
        engine: "ARIA Hyper-Core v4.0",
        timestamp: new Date().toISOString()
      });
    });

    // NSE Tickers for simulation
    const WATCHLIST = ['RELIANCE.NS', 'TCS.NS', 'HDFCBANK.NS', 'INFY.NS', 'HINDUNILVR.NS', 'ICICIBANK.NS', 'SBIN.NS', 'BHARTIARTL.NS', 'ITC.NS', 'KOTAKBANK.NS'];

    app.use(express.json());

  // API Route: Fetch Market Data
  app.get("/api/market/:symbol", async (req, res) => {
    try {
      const symbol = req.params.symbol;
      const result = await yf.quote(symbol);
      res.json(result);
    } catch (error: any) {
      console.error(`Market data error for ${req.params.symbol}:`, error.message);
      res.status(500).json({ error: "Failed to fetch market data" });
    }
  });

  // API Route: Multi-stock summary
  app.get("/api/watchlist", async (req, res) => {
    console.log("Processing /api/watchlist request...");
    try {
      if (!yf || typeof yf.quote !== 'function') {
        throw new Error("Yahoo Finance engine not properly initialized");
      }

      const results = await Promise.all(
        WATCHLIST.map(async (ticker) => {
          try {
            console.log(`Polling ${ticker}...`);
            return await yf.quote(ticker);
          } catch (err: any) {
            console.error(`Error fetching ${ticker}:`, err.message);
            return null;
          }
        })
      );
      
      const filtered = results.filter(r => r !== null);
      console.log(`Watchlist fetched: ${filtered.length} items successfully retrieved.`);
      
      if (filtered.length === 0) {
        return res.status(503).json({ 
          error: "Market Data Provider Unavailable. ARIA is currently isolated from NSE streams.",
          code: "PROVIDER_DOWN"
        });
      }
      res.json(filtered);
    } catch (error: any) {
      console.error("Watchlist critical fetch error:", error);
      res.status(500).json({ 
        error: "Neural Gateway Timeout", 
        details: error.message 
      });
    }
  });

  // API Route: Historical Data for Charts
  app.get("/api/history/:symbol", async (req, res) => {
    try {
      const symbol = req.params.symbol;
      console.log(`Fetching history for ${symbol}...`);
      
      const startDate = '2024-01-01';
      const endDate = new Date().toISOString().split('T')[0];
      
      let result;
      try {
        result = await yf.historical(symbol, {
          period1: startDate,
          period2: endDate,
          interval: '1d'
        });
      } catch (histError: any) {
        console.warn(`Initial historical sync failed for ${symbol}:`, histError.message);
        
        const chartResult = await (yf as any).chart(symbol, {
          period1: startDate,
          period2: endDate,
          interval: '1d'
        }).catch(() => null);

        if (chartResult && chartResult.quotes) {
          result = chartResult.quotes;
        }
      }

      if (Array.isArray(result) && result.length > 0) {
        res.json(result);
      } else {
        res.status(404).json({ 
          error: `No historical data available for ${symbol.replace('.NS', '')}`,
          code: "NO_DATA"
        });
      }
    } catch (error: any) {
      console.error("Historical sync critical failure:", error.message);
      res.status(503).json({ 
        error: `Engine failed to synchronize ${req.params.symbol.replace('.NS', '')} history`,
        details: error.message
      });
    }
  });

  // ARIA Prediction Intelligence
  app.get("/api/predict/:symbol", async (req, res) => {
    const symbol = req.params.symbol;
    const chance = Math.random();
    const predictionType = chance > 0.65 ? "Bullish" : (chance < 0.35 ? "Bearish" : "Neutral");
    
    const reasonings = [
      "Multi-module consensus reached. High volume accumulation observed at support with RSI divergence.",
      "Neural Transformer detected structural shift in order flow. VWAP-based entry signal confirmed.",
      "Sentiment NLP indicates positive institutional shift following recent earnings guidance.",
      "Market micro-structure shows liquidity grab at lower bounds. Expecting mean reversion.",
      "Options Gamma exposure suggests pinning. High probability of low-volatility consolidation.",
      "Correlations with Global Indices suggest lag-following breakout in the next 48h."
    ];

    res.json({
      symbol,
      prediction: predictionType.toUpperCase(),
      confidence: (Math.random() * 0.25 + 0.70).toFixed(2), 
      target: "₹" + (Math.random() * 200 + 10).toFixed(2),
      reasoning: reasonings[Math.floor(Math.random() * reasonings.length)]
    });
  });

  // Simulated Kite Connect Live Ticker for ARIA State
  app.get("/api/kite/tick", (req, res) => {
    const latencies = [4, 6, 8, 12, 14, 22];
    res.json({
        timestamp: new Date().toISOString(),
        packet_id: Math.floor(Math.random() * 100000),
        latency_ms: latencies[Math.floor(Math.random() * latencies.length)],
        active_feed: "Kite-WebSocket-XL",
        buffer_health: "Optimal",
        synced_nodes: 14
    });
  });

  // Simulated v4.0 Risk Engine (Ollama + DDGS + VADER)
  app.get("/api/v4/risk/:symbol", (req, res) => {
    const symbol = req.params.symbol;
    const risks = ["Low", "Moderate", "Optimal"];
    const sentiment = (Math.random() * 2 - 1).toFixed(2);
    res.json({
        symbol,
        llm_verdict: `Ollama analysis of ${symbol} suggests strong institutional accumulation with decoupling from sector weakness.`,
        vader_sentiment: parseFloat(sentiment),
        risk_score: risks[Math.floor(Math.random() * risks.length)],
        news_pulse: "Neutral-Bullish",
        ddgs_synced: true,
        ollama_node: "local-gpu-01"
    });
  });

  // Simulated Scanner Endpoint
  app.get("/api/scanner", (req, res) => {
    const results = [
      { symbol: "RELIANCE", score: 88, manipulation: "LOW", insider: "3 buys", v4_risk: "Optimal" },
      { symbol: "HDFCBANK", score: 82, manipulation: "LOW", insider: "1 buy", v4_risk: "Optimal" },
      { symbol: "TATASTEEL", score: 76, manipulation: "MODERATE", insider: "No activity", v4_risk: "Moderate" },
      { symbol: "INFY", score: 74, manipulation: "LOW", insider: "2 buys", v4_risk: "Optimal" },
      { symbol: "ADANIENT", score: 68, manipulation: "HIGH", insider: "Unknown", v4_risk: "High-Warning" },
    ];
    res.json(results);
  });

  // Simulated Insider Data
  app.get("/api/insider/:symbol", (req, res) => {
    const symbol = req.params.symbol;
    res.json({
      symbol,
      buys: Math.floor(Math.random() * 5),
      sells: Math.floor(Math.random() * 2),
      last_major_transaction: "Promoter Acquire",
      verified_nse_filing: true
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    console.log("Initializing Vite dev middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite dev middleware active.");
  } else {
    console.log("Configuring production static paths...");
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Bind to port at the very end
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`READY: Server running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
  });

  } catch (error) {
    console.error("CRITICAL: Server failed to start:", error);
    process.exit(1);
  }
}

process.on('uncaughtException', (err) => {
  console.error('Caught exception: ', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

startServer();
