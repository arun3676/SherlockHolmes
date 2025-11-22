import React, { useState } from 'react'

interface PropertyFormProps {
  onSubmit: (address: string, price: string) => void
  loading: boolean
  compact?: boolean
}

export default function PropertyForm({ onSubmit, loading, compact }: PropertyFormProps) {
  const [address, setAddress] = useState('520 Leavenworth St, San Francisco, CA')
  const [price, setPrice] = useState('1,200,000')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!address.trim() || !price.trim()) return
    onSubmit(address, price)
  }

  const formStyle = {
    background: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    padding: compact ? '20px' : '32px',
    transition: 'all 0.3s ease'
  }

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '24px',
    textAlign: 'center' as const
  }

  const labelStyle = {
    display: 'block',
    fontSize: '12px',
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    marginBottom: '8px'
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    color: '#111827',
    fontSize: '16px',
    outline: 'none',
    transition: 'all 0.2s ease',
    opacity: loading ? 0.6 : 1,
    cursor: loading ? 'not-allowed' : 'text'
  }

  const buttonStyle = {
    width: '100%',
    padding: '16px',
    borderRadius: '12px',
    fontWeight: 'bold',
    color: 'white',
    border: 'none',
    fontSize: '16px',
    cursor: loading ? 'not-allowed' : 'pointer',
    background: loading ? '#9ca3af' : 'linear-gradient(to right, #2563eb, #4f46e5)',
    boxShadow: loading ? 'none' : '0 10px 25px -5px rgba(37, 99, 235, 0.3)',
    transform: loading ? 'none' : 'scale(1)',
    transition: 'all 0.2s ease',
    opacity: loading ? 0.7 : 1
  }

  const buttonHoverStyle = {
    ...buttonStyle,
    background: loading ? '#9ca3af' : 'linear-gradient(to right, #1d4ed8, #4338ca)',
    transform: loading ? 'none' : 'scale(1.02)'
  }

  return (
    <div style={formStyle}>
      
      {!compact && (
        <h2 style={titleStyle}>
          Start Your Investigation
        </h2>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={labelStyle}>
            Property Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={inputStyle}
            placeholder="e.g. 123 Main St..."
            disabled={loading}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.borderColor = '#2563eb'
                e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)'
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.borderColor = '#e5e7eb'
                e.target.style.boxShadow = 'none'
              }
            }}
          />
        </div>

        <div>
          <label style={labelStyle}>
            Asking Price ($)
          </label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={inputStyle}
            placeholder="e.g. 1,000,000"
            disabled={loading}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.borderColor = '#2563eb'
                e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)'
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.borderColor = '#e5e7eb'
                e.target.style.boxShadow = 'none'
              }
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={buttonStyle}
          onMouseEnter={(e) => {
            if (!loading) {
              const target = e.target as HTMLElement
              Object.assign(target.style, buttonHoverStyle)
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              const target = e.target as HTMLElement
              Object.assign(target.style, buttonStyle)
            }
          }}
          onMouseDown={(e) => {
            if (!loading) {
              const target = e.target as HTMLElement
              target.style.transform = 'scale(0.98)'
            }
          }}
          onMouseUp={(e) => {
            if (!loading) {
              const target = e.target as HTMLElement
              target.style.transform = 'scale(1)'
            }
          }}
        >
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <svg 
                style={{ animation: 'spin 1s linear infinite', height: '20px', width: '20px' }} 
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4" 
                  fill="none" 
                  opacity="0.25"
                />
                <path 
                  fill="currentColor" 
                  opacity="0.75"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Digging for Dirt...
            </span>
          ) : (
            '🔍 Find Dirt & Negotiate'
          )}
        </button>
      </form>
      
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}