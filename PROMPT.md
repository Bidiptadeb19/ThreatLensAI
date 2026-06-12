Build a complete hackathon-ready web app called “ThreatLens AI”.

Problem statement:
Identification of URL-based attacks from IP data.

Goal:
Create a cybersecurity application that detects phishing, malware, suspicious redirects, and malicious URLs using URL analysis, IP intelligence, DNS data, SSL checks, and AI-generated explainable threat reports.

Important context:
This is for a hackathon. Prioritize a polished, working demo over enterprise completeness. The judging criteria are innovation, technical implementation, user experience, and real-world problem solving.

Core app flow:
1. User enters a URL.
2. App safely analyzes the URL without exposing the user to the site.
3. App extracts URL, domain, DNS, IP, SSL, redirect, and reputation signals.
4. App calculates a risk score from 0–100.
5. App classifies the URL as Safe, Suspicious, or Dangerous.
6. App shows a beautiful explainable report with:
   - Final verdict
   - Risk score
   - Reasons
   - Technical indicators
   - IP intelligence
   - Redirect chain
   - Suggested action
7. App allows exporting/downloading the report as PDF or JSON.

Tech stack:
- Frontend: Next.js + React + Tailwind CSS
- Backend: Next.js API routes or FastAPI, whichever is faster to implement cleanly
- Database: SQLite or local JSON storage for hackathon simplicity
- Charts/UI: Recharts or simple Tailwind components
- AI: OpenAI-compatible API abstraction, but keep fallback rule-based explanation if no API key exists

Use these data sources:
- DNS lookup
- WHOIS/domain age where possible
- SSL certificate inspection
- HTTP redirect chain
- URL lexical analysis
- IP geolocation/reputation
- Optional API integrations:
  - VirusTotal API v3 for URL/domain/IP reputation
  - Google Safe Browsing API for unsafe URL matching
  - AbuseIPDB for IP abuse reports
  - urlscan.io if easy to integrate

Note:
Make all external API keys optional through environment variables. The app must still work in demo mode without API keys using mock/sample intelligence and local heuristics.

Features to implement:

1. URL Scanner Page
- Input box for URL
- “Scan URL” button
- Loading state showing steps:
  - Parsing URL
  - Resolving DNS
  - Checking SSL
  - Following redirects
  - Checking IP reputation
  - Generating AI report

2. Dashboard Report Page
Show:
- Risk score gauge
- Verdict badge: Safe / Suspicious / Dangerous
- Summary explanation
- Top risk factors
- Technical details table
- Redirect chain visualization
- IP intelligence card
- SSL certificate card
- Domain intelligence card
- AI analyst recommendation

3. URL Feature Extraction
Extract:
- URL length
- Number of dots
- Number of hyphens
- Presence of IP address in URL
- Suspicious keywords: login, verify, update, secure, account, password, bank, wallet, free, gift
- HTTPS usage
- Punycode/homograph risk
- Number of subdomains
- TLD
- Query parameter count
- URL entropy-like randomness score
- Shortener detection
- Redirect count
- Final destination domain mismatch

4. DNS/IP Intelligence
Extract:
- Resolved IP addresses
- ASN if possible
- IP geolocation if possible
- Private/reserved IP detection
- Multiple IPs
- Known abuse score if AbuseIPDB key exists
- VirusTotal IP/domain result if key exists

5. SSL Inspection
Check:
- Has HTTPS
- Certificate issuer
- Valid from/to
- Expired certificate
- Self-signed certificate if detectable
- Domain mismatch if detectable

6. Scoring Algorithm
Create a transparent weighted scoring system:
- Known malicious reputation: +50
- Google Safe Browsing match: +50
- VirusTotal malicious detections: +40
- AbuseIPDB high abuse score: +30
- IP address used directly in URL: +20
- No HTTPS: +15
- Suspicious keywords: +5 to +15
- Excessive subdomains: +10
- Too many redirects: +10
- Domain mismatch after redirect: +20
- Very new domain: +20
- Punycode detected: +15
- URL shortener: +10
- High randomness: +10

Verdict:
- 0–29: Safe
- 30–59: Suspicious
- 60–100: Dangerous

7. AI Explanation
Generate an analyst-style explanation:
- Why the URL is risky or safe
- Which evidence mattered most
- What a normal user should do
- What a security team should investigate
- Confidence level

If no AI key is available, generate explanation using templates.

8. Demo Mode
Include 5 sample URLs:
- Safe e-commerce URL
- Phishing-looking login URL
- Shortened URL
- IP-based URL
- Suspicious bank verification URL

Do not actually visit dangerous sites. Use safe mock samples.

9. Security Requirements
- Never execute scripts from scanned pages.
- Do not render scanned webpage HTML.
- Do not download files.
- Use server-side timeout.
- Validate and sanitize input URLs.
- Block localhost/private IP scanning to avoid SSRF.
- Limit redirects.
- Add rate limiting if simple.

10. UI Requirements
Make it look impressive:
- Dark cybersecurity theme
- Risk score gauge
- Color-coded verdicts
- Cards for every signal
- Timeline for scan stages
- Clean report layout
- “Explainability” section
- “Export Report” button
- Responsive design

11. Pages
Create:
- / landing page
- /scan scanner page
- /report/[id] report page
- /history previous scans
- /about methodology page

12. Landing Page Copy
Headline:
“ThreatLens AI: Explainable URL Threat Detection”

Subheadline:
“Analyze URLs using IP intelligence, DNS signals, SSL checks, redirect behavior, and AI-powered reasoning.”

CTA:
“Scan a URL”

Sections:
- Why URL attacks matter
- How it works
- Technical signals used
- Demo examples

13. Backend API
Create endpoints:
- POST /api/scan
- GET /api/report/:id
- GET /api/history
- GET /api/demo-samples
- POST /api/export-report if needed

14. Data Model
Report should include:
{
  id,
  inputUrl,
  normalizedUrl,
  finalUrl,
  verdict,
  score,
  confidence,
  createdAt,
  features,
  dns,
  ipIntel,
  ssl,
  redirects,
  reputation,
  aiExplanation,
  recommendations
}

15. Hackathon README
Create a strong README with:
- Problem statement
- Solution overview
- Architecture
- Features
- Tech stack
- How to run locally
- Environment variables
- Demo flow
- Judging criteria mapping
- Future scope

16. Judging Criteria Mapping
In README explicitly explain:

Innovation:
- Multi-signal threat detection
- AI-generated explainable security report
- Combines URL, IP, DNS, SSL, redirect, and reputation intelligence

Technical Implementation:
- Server-side scanner
- Risk scoring engine
- External threat-intel API support
- SSRF-safe design
- Modular analyzers

User Experience:
- One-click URL scan
- Visual risk score
- Plain-English explanation
- Exportable report

Problem Solving:
- Helps users and organizations detect phishing/malware URLs before clicking
- Useful for students, employees, small businesses, and security teams

17. Expected Deliverable
Generate the complete working project.
Include:
- Full source code
- Clean folder structure
- .env.example
- README.md
- Mock data support
- Demo URLs
- Setup commands

18. Implementation priority
First build the working core:
- URL input
- Rule-based analyzer
- Risk score
- Report page
- Demo history

Then add:
- External API adapters
- AI explanation
- PDF/JSON export
- Better UI polish

Do not stop at pseudo-code. Create the actual runnable app.