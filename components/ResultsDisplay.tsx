import React, { useEffect } from 'react'

interface InvestigationResult {
  evidence: string[]
  email: string
  risk_score: number
  savings: number
  offer_price: number
  sandbox_id: string
  sandbox_logs: string[]
}

interface ResultsDisplayProps {
  result: InvestigationResult | null
  error: string | null
  loading: boolean
  currentStatus?: string
}

export default function ResultsDisplay({ result, error, loading, currentStatus = '' }: ResultsDisplayProps) {

  const containerStyle = {
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
    padding: '24px'
  }

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '24px'
  }

  const metricsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '24px'
  }

  const metricCardStyle = (bgColor: string, textColor: string, subTextColor: string) => ({
    background: bgColor,
    borderRadius: '8px',
    padding: '16px',
    textAlign: 'center' as const
  })

  const metricValueStyle = (color: string) => ({
    fontSize: '24px',
    fontWeight: 'bold',
    color: color,
    marginBottom: '4px'
  })

  const metricLabelStyle = (color: string) => ({
    fontSize: '14px',
    color: color
  })

  const toolBadgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '11px',
    fontWeight: '500',
    padding: '4px 8px',
    borderRadius: '9999px',
    marginLeft: '8px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em'
  }

  const groqBadgeStyle = {
    ...toolBadgeStyle,
    background: '#fbbf24',
    color: '#78350f'
  }

  const exaBadgeStyle = {
    ...toolBadgeStyle,
    background: '#60a5fa',
    color: '#1e3a8a'
  }

  const e2bBadgeStyle = {
    ...toolBadgeStyle,
    background: '#a78bfa',
    color: '#4c1d95'
  }

  const sectionTitleStyle = {
    fontSize: '18px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  }

  const logBoxStyle = {
    backgroundColor: '#0e1117',
    color: '#00ff00',
    fontFamily: "'Courier New', monospace",
    padding: '16px',
    borderRadius: '8px',
    fontSize: '12px',
    height: '300px',
    overflowY: 'auto' as const,
    border: '1px solid #333'
  }

  const contentBoxStyle = {
    background: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '20px',
    maxHeight: '300px',
    overflowY: 'auto' as const,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease'
  }

  const evidenceItemStyle = {
    fontSize: '14px',
    color: '#374151',
    marginBottom: '12px',
    paddingBottom: '12px',
    borderBottom: '1px solid #f3f4f6',
    lineHeight: '1.6',
    position: 'relative' as const,
    paddingLeft: '28px'
  }

  const evidenceBulletStyle = {
    position: 'absolute' as const,
    left: '0',
    top: '4px',
    width: '8px',
    height: '8px',
    backgroundColor: '#3b82f6',
    borderRadius: '50%',
    flexShrink: 0
  }

  const emailStyle = {
    fontSize: '14px',
    color: '#374151',
    whiteSpace: 'pre-wrap' as const,
    margin: 0,
    lineHeight: '1.7',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif'
  }

  const twoColumnStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px'
  }

  const successBoxStyle = {
    background: '#f0fdf4',
    padding: '16px',
    borderRadius: '8px',
    marginTop: '24px'
  }

  const codeStyle = {
    background: '#dcfce7',
    padding: '4px 8px',
    borderRadius: '4px',
    fontFamily: 'monospace',
    fontSize: '14px'
  }

  if (loading) {
    return (
      <div style={containerStyle}>
        <h2 style={titleStyle}>
          ⚙️ Investigation in Progress
        </h2>
        
        {/* Loading Spinner */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 0' }}>
          <div style={{
            animation: 'spin 1s linear infinite',
            height: '40px',
            width: '40px',
            border: '4px solid #f3f4f6',
            borderTop: '4px solid #3b82f6',
            borderRadius: '50%',
            marginRight: '16px'
          }}></div>
          <div>
            <div style={{ color: '#1f2937', fontSize: '18px', fontWeight: '500' }}>
              {currentStatus || 'Investigating property...'}
            </div>
            <div style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>
              Please wait while we analyze the property
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <h2 style={titleStyle}>
          ❌ Investigation Failed
        </h2>
        <div style={{
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          padding: '16px'
        }}>
          <p style={{ color: '#991b1b', fontWeight: '500' }}>{error}</p>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div style={containerStyle}>
        <h2 style={titleStyle}>
          📊 Investigation Results
        </h2>
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#6b7280' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🕵️‍♂️</div>
          <p>Enter a property address and click "Investigate" to see results</p>
        </div>
      </div>
    )
  }

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>
        📊 Investigation Results
      </h2>

      {/* Metrics */}
      <div style={metricsGridStyle}>
        <div style={metricCardStyle('#eff6ff', '#1e40af', '#3730a3')}>
          <div style={metricValueStyle('#1e40af')}>
            ${result.offer_price.toLocaleString()}
          </div>
          <div style={metricLabelStyle('#3730a3')}>Suggested Offer</div>
        </div>
        <div style={metricCardStyle('#f0fdf4', '#166534', '#14532d')}>
          <div style={metricValueStyle('#166534')}>
            ${result.savings.toLocaleString()}
          </div>
          <div style={metricLabelStyle('#14532d')}>Projected Savings</div>
        </div>
        <div style={metricCardStyle('#fef2f2', '#991b1b', '#7f1d1d')}>
          <div style={metricValueStyle('#991b1b')}>
            {result.risk_score}/100
          </div>
          <div style={metricLabelStyle('#7f1d1d')}>Risk Score</div>
        </div>
        <div style={metricCardStyle('#faf5ff', '#6b21a8', '#581c87')}>
          <div style={metricValueStyle('#6b21a8')}>
            {result.evidence.length}
          </div>
          <div style={metricLabelStyle('#581c87')}>Evidence Found</div>
        </div>
      </div>

      {/* Sandbox Logs */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={sectionTitleStyle}>
          ⚙️ E2B Sandbox Live Logs
          <span style={e2bBadgeStyle}>
            🐳 E2B
          </span>
        </h3>
        <div style={logBoxStyle}>
          <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>
            {result.sandbox_logs.join('\n')}
          </pre>
        </div>
      </div>

      {/* Evidence and Email */}
      <div style={twoColumnStyle}>
        <div>
          <h3 style={sectionTitleStyle}>
            <span style={{ 
              width: '24px', 
              height: '24px', 
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', 
              borderRadius: '6px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '14px',
              color: 'white'
            }}>
              📂
            </span>
            Evidence Found
            <span style={exaBadgeStyle}>
              🔍 Exa MCP
            </span>
          </h3>
          <div style={contentBoxStyle}>
            {result.evidence.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {result.evidence.map((item, index) => (
                  <li key={index} style={evidenceItemStyle}>
                    <span style={evidenceBulletStyle}></span>
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '32px 0',
                color: '#9ca3af',
                fontSize: '14px'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔍</div>
                No evidence found
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 style={sectionTitleStyle}>
            <span style={{ 
              width: '24px', 
              height: '24px', 
              background: 'linear-gradient(135deg, #10b981, #059669)', 
              borderRadius: '6px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '14px',
              color: 'white'
            }}>
              ✉️
            </span>
            Negotiation Email
            <span style={groqBadgeStyle}>
              🧠 Groq
            </span>
          </h3>
          <div style={contentBoxStyle}>
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '16px',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-8px',
                left: '16px',
                background: 'white',
                padding: '0 8px',
                fontSize: '12px',
                color: '#64748b',
                fontWeight: '500'
              }}>
                Generated Email
              </div>
              <p style={emailStyle}>
                {result.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sandbox Info */}
      <div style={successBoxStyle}>
        <h4 style={{ fontWeight: '600', color: '#166534', marginBottom: '4px' }}>
          ✅ Powered by E2B + MCP
        </h4>
        <p style={{ fontSize: '14px', color: '#14532d', margin: 0 }}>
          Sandbox ID: <code style={codeStyle}>{result.sandbox_id}</code>
        </p>
      </div>
    </div>
  )
}
