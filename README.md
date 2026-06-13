# ThreatLens AI

ThreatLens AI is an explainable URL threat detection and analysis platform. It provides a transparent, multi-signal security scanner that evaluates URLs using domain structure, DNS resolution, IP intelligence, SSL certificate health, and HTTP redirect behavior, integrating with threat intelligence providers and AI-powered reasoning to produce detailed, human-readable security reports.

---

## Project Overview

ThreatLens AI is designed to demystify malicious link detection by providing clear, detailed, and human-readable security reports. Instead of giving a simple "safe" or "unsafe" classification, ThreatLens AI decomposes every scanned URL into detailed risk metrics, visualizes the redirect paths, checks infrastructure details, and generates explainable security reports. This empowers security teams, system administrators, and daily users to make informed decisions before visiting suspicious destinations.

---

## Problem Statement

Modern cyber threats rely heavily on URL-based attacks, such as phishing, social engineering campaigns, credential harvesting, and malware delivery. Attackers constantly generate new, deceptive domains, use multi-stage redirects to bypass firewalls, and obscure their infrastructure behind CDNs and proxy networks. 

Traditional threat protection services and static blocklists often fail to catch zero-day malicious links. Users need a safe, real-time method to analyze suspicious URLs without executing code on their own machines or exposing themselves to threat payloads.

---

## Proposed Solution

ThreatLens AI provides a multi-layer scanning engine that runs entirely server-side to safely inspect target URLs without rendering their HTML or executing client-side scripts. By inspecting URL lexical features, performing DNS queries, verifying SSL certificates, tracing HTTP redirect paths, and consulting IP reputation databases, the platform aggregates multiple signals into a unified, transparent risk score (0-100). The scoring is transparent and fully explainable, generating an instant security report that translates technical indicators into actionable recommendations.

---

## Features

- **Lexical Analysis:** Extracts feature signals such as URL length, dot count, subdomain structure, suspicious keywords (e.g., `login`, `secure`, `bank`), Punycode/homograph risk, and URL shortener detection.
- **DNS & Infrastructure Intelligence:** Resolves A/AAAA records, checks for multiple IP addresses, blocks localhost/private ranges (preventing SSRF), and performs IP geolocation.
- **SSL Certificate Inspection:** Analyzes TLS certificate parameters (issuer, validity, expiration status) to identify self-signed, expired, or anomalous certificates.
- **Redirect Chain Tracer:** Safely traces HTTP redirect hops, detecting final destination mismatches, high redirect limits, or redirect timeouts.
- **Explainable Scoring:** Utilizes a transparent scoring model where each feature adds to a 0-100 risk score, classifying links as *Safe*, *Suspicious*, or *Dangerous*.
- **Security Analyst Explanations:** Generates human-readable explanations and security team action plans using OpenAI-compatible APIs (with a fully functional offline local rule-based fallback).
- **Scan History:** Keeps a local record of scanned URLs, allowing users to revisit previous analyses.
- **PDF & JSON Export:** Allows security analysts to export findings as structured JSON or download print-ready PDF reports.
- **Security-First Design:** 
  - Never renders scanned webpage HTML or executes scripts.
  - Never downloads target files.
  - Server-side timeouts prevent infinite loading attacks.
  - Blocks localhost and private/reserved IP scans to eliminate Server-Side Request Forgery (SSRF) risks.

---

## Technology Stack

- **Frontend & Routing:** Next.js (React), TypeScript, Tailwind CSS
- **Backend APIs:** Next.js API Routes (Server-side scanning & DNS/TLS resolution)
- **Persistence:** Local JSON-based storage for scan history
- **Third-Party Integrations:** Optional support for VirusTotal, Google Safe Browsing, AbuseIPDB, urlscan.io, and OpenAI-compatible models

---

## Setup & Usage Instructions

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (version 18+ recommended).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Bidiptadeb19/ThreatLensAI.git
   cd ThreatLensAI
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   *(On Windows PowerShell, use: `Copy-Item .env.example .env.local`)*

4. **Open `.env.local` and configure your API keys (all external API keys are optional):**
   ```env
   # OpenAI-compatible API Configuration for AI reports
   OPENAI_API_KEY=your_openai_api_key_here
   OPENAI_BASE_URL=https://api.openai.com/v1
   OPENAI_MODEL=gpt-4o-mini

   # Threat Intelligence API Keys
   VIRUSTOTAL_API_KEY=
   GOOGLE_SAFE_BROWSING_API_KEY=
   ABUSEIPDB_API_KEY=
   URLSCAN_API_KEY=

   # Scan settings
   SCAN_TIMEOUT_MS=5000
   SCAN_MAX_REDIRECTS=5
   RATE_LIMIT_WINDOW_MS=60000
   RATE_LIMIT_MAX=20
   ```

### Running Locally

To run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## Team Details

Team Size: 1

Member:
- Bidipta Deb
