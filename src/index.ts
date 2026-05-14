#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'

const REMOTE = process.env.CREATORCRAWL_MCP_URL ?? 'https://app.creatorcrawl.com/api/mcp'
const API_KEY = process.env.CREATORCRAWL_API_KEY

if (!API_KEY) {
  console.error('CREATORCRAWL_API_KEY environment variable is required.')
  console.error('Get a free key at https://creatorcrawl.com (250 free credits, no card).')
  process.exit(1)
}

type JsonRpcResponse = { result?: unknown; error?: { code: number; message: string } }

async function forward(method: string, params: unknown): Promise<JsonRpcResponse> {
  const response = await fetch(REMOTE, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
      'x-api-key': API_KEY as string,
    },
    body: JSON.stringify({ jsonrpc: '2.0', id: Date.now(), method, params }),
  })
  const text = await response.text()
  if (!response.ok) {
    return { error: { code: response.status, message: text || response.statusText } }
  }
  try {
    return JSON.parse(text) as JsonRpcResponse
  } catch {
    return { error: { code: -32700, message: 'Invalid JSON from upstream' } }
  }
}

const server = new Server(
  { name: 'creatorcrawl', version: '0.1.0' },
  { capabilities: { tools: {} } },
)

server.setRequestHandler(ListToolsRequestSchema, async () => {
  const upstream = await forward('tools/list', {})
  if (upstream.error) throw new Error(upstream.error.message)
  return upstream.result as { tools: unknown[] }
})

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const upstream = await forward('tools/call', request.params)
  if (upstream.error) throw new Error(upstream.error.message)
  return upstream.result as { content: unknown[] }
})

const transport = new StdioServerTransport()
await server.connect(transport)
