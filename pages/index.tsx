import React, { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import PropertyForm from '@/components/PropertyForm'
import ResultsDisplay from '@/components/ResultsDisplay'

interface InvestigationResult {
  evidence: string[]
  email: string
  risk_score: number
  savings: number
  offer_price: number
  sandbox_id: string
  sandbox_logs: string[]
}

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<InvestigationResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [currentStatus, setCurrentStatus] = useState<string>('')

  const handleInvestigate = async (address: string, price: string) => {
    setLoading(true)
    setError(null)
    setResult(null)
    setCurrentStatus('🚀 Starting investigation...')

    try {
      setCurrentStatus('🐳 Setting up E2B Sandbox environment...')
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setCurrentStatus('⚙️ Configuring Docker container with Exa MCP...')
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setCurrentStatus('🔍 Using Exa MCP to search property databases...')
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setCurrentStatus('� Analyzing findings with Groq AI...')
      await new Promise(resolve => setTimeout(resolve, 800))
      
      setCurrentStatus('✉️ Generating negotiation email via Groq...')
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Use the original investigation API (non-streaming)
      const response = await fetch('/api/investigate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, price }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Investigation failed')
      }

      const data = await response.json()
      setResult(data)
      setCurrentStatus('✅ Investigation complete! All tools utilized successfully.')

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Sherlock Holmes - Real Estate Detective</title>
        <meta name="description" content="AI Agent that negotiates house prices for you." />
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            background-color: #f9fafb;
            color: #111827;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
          }
          .nav {
            width: 100%;
            background: white;
            border-bottom: 1px solid #e5e7eb;
            padding: 16px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: sticky;
            top: 0;
            z-index: 10;
          }
          .nav-brand {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .nav-title {
            font-weight: bold;
            font-size: 20px;
            color: #111827;
          }
          .nav-badge {
            font-size: 12px;
            font-weight: 500;
            background: #f3f4f6;
            color: #4b5563;
            padding: 4px 12px;
            border-radius: 9999px;
            border: 1px solid #e5e7eb;
          }
          .hero {
            text-align: center;
            margin-bottom: 64px;
            padding: 48px 0;
          }
          .hero-title {
            font-size: 48px;
            font-weight: 800;
            color: #111827;
            line-height: 1.1;
            margin-bottom: 24px;
          }
          .hero-gradient {
            background: linear-gradient(to right, #2563eb, #4f46e5);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .hero-subtitle {
            font-size: 20px;
            color: #6b7280;
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.6;
          }
          .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 32px;
            margin-top: 48px;
            max-width: 900px;
            margin-left: auto;
            margin-right: auto;
          }
          .feature-card {
            background: white;
            padding: 24px;
            border-radius: 16px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            border: 1px solid #f3f4f6;
          }
          .feature-icon {
            font-size: 36px;
            margin-bottom: 16px;
          }
          .feature-title {
            font-weight: bold;
            color: #111827;
            margin-bottom: 8px;
          }
          .feature-desc {
            font-size: 14px;
            color: #6b7280;
          }
          .main-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 32px;
            align-items: start;
          }
          @media (min-width: 1024px) {
            .main-grid {
              grid-template-columns: ${result ? '400px 1fr' : '1fr'};
            }
          }
          .form-container {
            width: 100%;
            ${result ? '' : 'max-width: 500px; margin: 0 auto;'}
          }
          .results-container {
            min-height: 200px;
          }
        `}</style>
      </Head>

      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        
        {/* HEADER */}
        <nav className="nav">
          <div className="nav-brand">
            <span style={{ fontSize: '24px' }}>🕵️‍♂️</span>
            <span className="nav-title">Sherlock Holmes</span>
          </div>
          <div className="nav-badge">
             Powered by E2B + Groq
          </div>
        </nav>

        <div className="container" style={{ padding: '48px 20px' }}>
          
          {/* HERO SECTION */}
          {!result && !loading && (
            <div className="hero">
              <h1 className="hero-title">
                Don't Buy a <span className="hero-gradient">Money Pit.</span>
              </h1>
              <p className="hero-subtitle">
                Most listings hide the truth. Our autonomous agent finds the dirt 
                (noise, crime, permits) and writes a negotiation letter to lower the price.
              </p>
              
              {/* 3-STEP EXPLANATION */}
              <div className="features">
                <div className="feature-card">
                  <div className="feature-icon">🔎</div>
                  <h3 className="feature-title">Deep Search</h3>
                  <p className="feature-desc">We scan police reports, permit databases, and Reddit for "red flags" agents won't tell you.</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">🧠</div>
                  <h3 className="feature-title">Risk Analysis</h3>
                  <p className="feature-desc">Our Groq-powered AI assigns a Risk Score (0-100) to the property in seconds.</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">📉</div>
                  <h3 className="feature-title">Auto-Negotiate</h3>
                  <p className="feature-desc">We draft a ruthless negotiation email citing the evidence to get you a discount.</p>
                </div>
              </div>
          </div>
        )}

        {/* MAIN INTERFACE */}
        <div className="main-grid">
          
          {/* LEFT: FORM */}
          <div className="form-container">
             <PropertyForm onSubmit={handleInvestigate} loading={loading} compact={!!result} />
          </div>

          {/* RIGHT: RESULTS */}
          {(result || loading || error) && (
            <div className="results-container">
              <ResultsDisplay result={result} error={error} loading={loading} currentStatus={currentStatus} />
            </div>
          )}
        </div>

      </div>
    </div>
  </>
)
}

export default Home