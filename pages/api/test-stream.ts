import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Set up Server-Sent Events
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Cache-Control'
  })

  console.log('Test stream starting...')

  // Send immediate test messages
  const messages = [
    '🚀 Test message 1',
    '📍 Test message 2', 
    '💰 Test message 3',
    '✅ Test complete'
  ]

  for (const message of messages) {
    console.log('Sending:', message)
    res.write(`data: ${JSON.stringify({ type: 'log', message })}\n\n`)
    await new Promise(resolve => setTimeout(resolve, 500)) // 500ms delay
  }

  // Send final result
  res.write(`data: ${JSON.stringify({ type: 'result', data: { test: 'complete' } })}\n\n`)
  res.end()
}
