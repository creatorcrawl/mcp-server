# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in `@creatorcrawl/mcp`, please report it privately by emailing `security@creatorcrawl.com`. Do not file public GitHub issues for security reports.

We aim to acknowledge security reports within 48 hours and ship a fix within 14 days for high-severity issues.

## Supported Versions

Only the latest released version of `@creatorcrawl/mcp` receives security updates. Pin to the latest version when running in production.

## Scope

This repository contains a thin stdio shim that proxies MCP requests to the hosted CreatorCrawl API at `app.creatorcrawl.com/api/mcp`. The shim itself only handles JSON-RPC framing — all authentication, rate limiting, and data handling happens upstream.

## Data Handling

- API keys are passed via the `CREATORCRAWL_API_KEY` environment variable and forwarded to the upstream API as `x-api-key` header.
- The shim does not log, cache, or persist any request or response data.
- The shim does not make network calls to any host other than the configured `CREATORCRAWL_MCP_URL` (default: `https://app.creatorcrawl.com/api/mcp`).
