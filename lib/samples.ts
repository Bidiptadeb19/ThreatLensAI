export const demoSamples = [
  {
    label: "Safe e-commerce",
    url: "https://shop.example.com/products/noise-cancelling-headphones?ref=summer",
    intent: "Looks like a normal HTTPS shopping URL with predictable structure."
  },
  {
    label: "Phishing login",
    url: "https://secure-login.account-verify.example.net/session/update-password",
    intent: "Uses credential-themed keywords and a layered subdomain pattern."
  },
  {
    label: "Shortened URL",
    url: "https://bit.ly/3demoThreatLens",
    intent: "Shorteners hide the final destination and require redirect scrutiny."
  },
  {
    label: "IP-based URL",
    url: "http://198.51.100.42/login",
    intent: "Direct IP usage and no HTTPS are common warning signs."
  },
  {
    label: "Bank verification",
    url: "https://bank-secure-verify.example.org/free/gift/account",
    intent: "Combines financial, urgency, and reward language."
  }
];
