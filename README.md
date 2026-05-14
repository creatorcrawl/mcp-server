# @creatorcrawl/mcp

Official Model Context Protocol (MCP) server for [CreatorCrawl](https://creatorcrawl.com). Gives any MCP-compatible AI agent — Claude Desktop, Claude Code, Cursor, Windsurf, Zed, and more — 60+ tools for **TikTok, Instagram, YouTube, LinkedIn, Twitter/X, and Reddit**.

Profiles, posts, comments, transcripts, ads, search, and trending data as structured JSON.

## Two ways to run it

### Stdio (local install) — for desktop clients

```bash
# Claude Code
claude mcp add creatorcrawl \
  --env CREATORCRAWL_API_KEY=YOUR_API_KEY \
  -- npx -y @creatorcrawl/mcp

# Claude Desktop / Cursor / Windsurf — add to your MCP config
{
  "mcpServers": {
    "creatorcrawl": {
      "command": "npx",
      "args": ["-y", "@creatorcrawl/mcp"],
      "env": { "CREATORCRAWL_API_KEY": "YOUR_API_KEY" }
    }
  }
}
```

### Streamable HTTP (hosted) — for cloud agents

```bash
# Claude Code
claude mcp add creatorcrawl \
  --transport streamable-http \
  --header x-api-key=YOUR_API_KEY \
  -- https://app.creatorcrawl.com/api/mcp
```

```json
{
  "mcpServers": {
    "creatorcrawl": {
      "type": "streamable-http",
      "url": "https://app.creatorcrawl.com/api/mcp",
      "headers": { "x-api-key": "YOUR_API_KEY" }
    }
  }
}
```

## Get an API key

Sign up at [creatorcrawl.com](https://creatorcrawl.com) — **250 free credits on signup**, no card required.

## Tool reference

60+ tools across six platforms:

- **TikTok:** profile, profile-videos, video-info, transcript, search-keyword, search-users, comments, popular-creators, popular-hashtags, popular-songs, popular-videos, trending-feed
- **Instagram:** profile, basic-profile, posts, reels, post-info, comments, transcript, story-highlights, highlights-details, search-reels, embed
- **YouTube:** channel, channel-videos, channel-shorts, video, search, search-hashtag, transcript, comments, playlist, trending-shorts
- **LinkedIn:** profile, company, company-posts, post, ads-search, ad
- **Twitter / X:** profile, tweet, user-tweets, transcript, community, community-tweets
- **Reddit:** search, subreddit-details, subreddit-posts, subreddit-search, post-comments

Each tool returns structured JSON. See the full schema at https://creatorcrawl.com/mcp-docs.

## Configuration

| Env var | Required | Description |
|---|---|---|
| `CREATORCRAWL_API_KEY` | yes | Your CreatorCrawl API key |
| `CREATORCRAWL_MCP_URL` | no | Override the upstream URL (default: `https://app.creatorcrawl.com/api/mcp`) |

## Pricing

Pay-as-you-go credits starting at $29 for 5,000 calls. Most tools cost 1 credit per call. Full pricing at [creatorcrawl.com/#pricing](https://creatorcrawl.com/#pricing).

## Companion packages

- **TypeScript SDK:** [`@creatorcrawl/sdk`](https://www.npmjs.com/package/@creatorcrawl/sdk) — direct API client for code workflows
- **Agent Skill:** [`creatorcrawl/creatorcrawl-skill`](https://github.com/creatorcrawl/creatorcrawl-skill) — teaches agents how to use the MCP server effectively
- **Docs:** [creatorcrawl.com/mcp-docs](https://creatorcrawl.com/mcp-docs)

## License

MIT
