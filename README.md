# ThreatLens AI

ThreatLens AI is a hackathon-ready web app for explainable URL threat detection. It analyzes URLs using URL structure, DNS resolution, IP intelligence, SSL certificate checks, redirect behavior, optional reputation providers, and AI-style reporting.

## Problem Statement

Identification of URL-based attacks from IP data. Attackers use phishing links, malware delivery URLs, suspicious redirects, and deceptive domains to compromise users before they realize a link is unsafe.

## Solution Overview

ThreatLens lets a user paste a URL, safely scans server-side metadata without rendering the target page, calculates a transparent 0-100 risk score, and generates an explainable security report with evidence and recommendations.

## Architecture

- `app/` contains Next.js pages and API routes.
- `components/` contains reusable report, gauge, scanner, and signal UI.
- `lib/analyzers/` contains modular URL, DNS, SSL, redirect, and reputation analyzers.
- `lib/scoring.ts` implements the transparent weighted scoring engine.
- `lib/explain.ts` creates AI-compatible analyst explanations with a no-key template fallback.
- `lib/storage.ts` stores recent reports in local JSON at `data/reports.json`.

## Features

- One-click URL scanner with staged loading.
- Risk score gauge and Safe/Suspicious/Dangerous verdicts.
- URL lexical feature extraction.
- DNS and IP resolution with private/reserved IP blocking.
- SSL certificate inspection.
- Safe redirect chain analysis with timeout and redirect limits.
- Optional API-key hooks for VirusTotal, Google Safe Browsing, AbuseIPDB, and urlscan.io.
- OpenAI-compatible explanation abstraction with rule-based fallback.
- Report history.
- JSON export and browser PDF export.
- Five safe demo URL samples.

## Tech Stack

- Next.js + React + TypeScript
- Tailwind CSS
- Next.js API routes
- Local JSON persistence
- Node DNS/TLS/fetch primitives

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

Copy `.env.example` to `.env.local`.

```bash
OPENAI_API_KEY=
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4o-mini
VIRUSTOTAL_API_KEY=
GOOGLE_SAFE_BROWSING_API_KEY=
ABUSEIPDB_API_KEY=
URLSCAN_API_KEY=
SCAN_TIMEOUT_MS=5000
SCAN_MAX_REDIRECTS=5
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=20
```

All external API keys are optional. Without keys, the app runs in demo mode with local heuristics and template explanations.

## Demo Flow

1. Open `/scan`.
2. Pick a demo URL or paste a URL.
3. Watch scan stages progress.
4. Review the report verdict, risk score, reasons, technical indicators, IP intelligence, SSL card, redirect timeline, and recommendation.
5. Export the report as JSON or use the PDF button to print/save as PDF.
6. Visit `/history` to reopen previous scans.

## Security Design

- Does not render scanned webpage HTML.
- Does not execute scripts from target sites.
- Does not download files.
- Uses server-side timeouts.
- Blocks localhost and private/reserved IP scans.
- Resolves DNS before metadata fetches to reduce SSRF risk.
- Limits redirects.
- Includes simple in-memory rate limiting.

## Judging Criteria Mapping

### Innovation

- Multi-signal threat detection.
- AI-generated explainable security report.
- Combines URL, IP, DNS, SSL, redirect, and reputation intelligence.

### Technical Implementation

- Server-side scanner.
- Risk scoring engine.
- External threat-intel API support.
- SSRF-safe design.
- Modular analyzers.

### User Experience

- One-click URL scan.
- Visual risk score.
- Plain-English explanation.
- Exportable report.

### Problem Solving

- Helps users and organizations detect phishing and malware URLs before clicking.
- Useful for students, employees, small businesses, and security teams.

## Future Scope

- Full VirusTotal, Google Safe Browsing, AbuseIPDB, and urlscan.io response parsing.
- WHOIS/domain-age provider integration.
- Organization-level allow/block lists.
- Team workspaces and shareable reports.
- Background enrichment jobs and richer PDF generation.
