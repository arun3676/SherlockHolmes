import { NextApiRequest, NextApiResponse } from 'next'
import { Sandbox } from 'e2b'
import Groq from 'groq-sdk' // <--- CHANGED FROM OPENAI
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js'

// Load environment variables
const EXA_API_KEY = process.env.EXA_API_KEY
const GROQ_API_KEY = process.env.GROQ_API_KEY // <--- NEW KEY
const E2B_API_KEY = process.env.E2B_API_KEY

interface InvestigationResult {
  evidence: string[]
  email: string
  risk_score: number // <--- NEW FIELD
  savings: number
  offer_price: number
  sandbox_id: string
  sandbox_logs: string[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { address, price } = req.body

  if (!address || !price) {
    return res.status(400).json({ error: 'Address and price are required' })
  }

  // Revert to regular JSON response
  const logs: string[] = []

  const log = (message: string) => {
    console.log(message)
    logs.push(message)
  }

  try {
    log('🚀 Starting investigation...')
    log('📍 Address: ' + address)
    log('💰 Price: ' + price)
    log('🏗️ Creating E2B Sandbox with MCP integration...')
    
    // Parse price
    const askingPrice = parseInt(price.replace(/[$,\s]/g, '')) || 1200000
    const estimatedOffer = Math.floor(askingPrice * 0.9)

    // Create sandbox with MCP servers from Docker Hub
    const sbx = await Sandbox.create({
      mcp: {
        exa: {
          apiKey: EXA_API_KEY!
        }
      }
    })

    const sandboxId = sbx.sandboxId
    log(`✅ Sandbox Created: ${sandboxId}`)

    // Connect to MCP Gateway
    const mcpUrl = sbx.getMcpUrl()
    const mcpToken = await sbx.getMcpToken()
    log(`🔌 Connecting to MCP Gateway at ${mcpUrl}...`)

    // Initialize MCP client
    const mcpClient = new Client({ 
      name: 'sherlock-holmes-client', 
      version: '1.0.0' 
    })
    
    const transport = new StreamableHTTPClientTransport(
      new URL(mcpUrl),
      {
        requestInit: {
          headers: {
            'Authorization': `Bearer ${mcpToken}`
          }
        }
      }
    )

    await mcpClient.connect(transport)
    log('🔗 Connected to MCP Gateway')

    // List available MCP tools
    const tools = await mcpClient.listTools()
    const toolNames = tools.tools.map(t => t.name).join(', ')
    log(`🛠️ Available MCP tools: ${toolNames}`)

    const evidence: string[] = []
    let savings = 0

    try {
      // Use Exa MCP server (Pre-installed in Docker)
      // Note: The tool name might vary based on the specific Docker image version.
      // Usually it's 'exa_search' or 'web_search_exa'
      const exaToolName = tools.tools.find(t => t.name.includes('exa') || t.name.includes('search'))?.name

      if (exaToolName) {
        log(`🔍 Using Exa MCP tool: ${exaToolName}...`)
        
        const queries = [
          `"${address}" noise complaints`,
          `"${address}" crime reports`, 
          `"${address}" permit violations`
        ]

        for (const query of queries) {
          log(`🔍 Searching: ${query}...`)
          
          try {
            const result = await mcpClient.callTool({
              name: exaToolName,
              arguments: {
                query: query,
                numResults: 1,
                useAutoprompt: true
              }
            })

            // Parse MCP results (Handling different return shapes)
            if (result.content && Array.isArray(result.content)) {
              for (const item of result.content) {
                if (item.type === 'text') {
                   // Exa MCP usually returns a JSON string in the text field
                   try {
                     const data = JSON.parse(item.text)
                     if (data.results && data.results.length > 0) {
                        const title = data.results[0].title || 'Evidence found'
                        const snippet = data.results[0].text || 'No text'
                        log(`📄 Found: ${title.substring(0, 40)}...`)
                        evidence.push(`- ${title}: ${snippet.substring(0, 150)}...`)
                     }
                   } catch {
                     // If not JSON, just use the text directly
                     evidence.push(`- ${item.text.substring(0, 200)}...`)
                   }
                }
              }
            }
          } catch (mcpError) {
            log(`⚠️ MCP search step failed: ${mcpError}`)
          }
        }
      } else {
        log('⚠️ Exa MCP tool not found in sandbox list. Check Docker image.')
      }

      // Math calculation in sandbox
      log('🧮 Running calculation in Sandbox...')
      const mathResult = await sbx.commands.run(`python3 -c 'print(${askingPrice} - ${estimatedOffer})'`)
      
      if (mathResult.stdout) {
        savings = parseInt(mathResult.stdout.trim())
        log(`✅ Math Result: ${savings}`)
      }

    } catch (error) {
      log(`❌ Error inside sandbox logic: ${error}`)
    } finally {
      await mcpClient.close()
      sbx.kill()
      log('🔌 MCP client closed and sandbox killed')
    }

    // --- GROQ INTEGRATION HERE ---
    log('⚡ Generating analysis with Groq LPU...')
    const groq = new Groq({ apiKey: GROQ_API_KEY })
    
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile', // Production Groq model per https://console.groq.com/docs/models
      messages: [
        {
          role: 'system',
          content: "You are 'Sherlock Holmes', a ruthless real estate negotiator. Analyze the evidence and write a lowball offer email. You must output JSON."
        },
        {
          role: 'user',
          content: `Address: ${address}
Evidence Found: ${JSON.stringify(evidence)}
Asking Price: $${askingPrice.toLocaleString()}
Target Offer: $${estimatedOffer.toLocaleString()}

1. Calculate a "Risk Score" (0-100) based on the evidence (High score = Bad property).
2. Write a negotiation email citing the specific evidence to justify the lower offer.

Return JSON format:
{
  "risk_score": number,
  "email_text": "string"
}`
        }
      ],
      response_format: { type: 'json_object' }
    })

    const aiResponse = JSON.parse(completion.choices[0]?.message?.content || '{}')
    const emailText = aiResponse.email_text || 'Draft email not available.'
    const riskScore = aiResponse.risk_score || 50

    const result: InvestigationResult = {
      evidence,
      email: emailText,
      risk_score: riskScore,
      savings,
      offer_price: estimatedOffer,
      sandbox_id: sandboxId,
      sandbox_logs: logs
    }

    // Return JSON response
    res.status(200).json(result)

  } catch (error) {
    log(`❌ CRITICAL ERROR: ${error}`)
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      logs 
    })
  }
}