# GhostProof - Professional Follow-Up That Protects Relationships
You stay the trusted contractor. GhostProof handles follow-up professionally.

## What this is
Testable MVP. Real Ghost Score formula, real invoice list, real Supabase backend when keys are set. Falls back to local demo data if no keys.

## Ghost Score - Transparent Formula
Raw = 0.30*Response + 0.25*Deposit + 0.20*Tone + 0.15*History + 0.10*JobSize
Final = (n * Raw + 3 * 48) / (n + 3) where n = past invoices for client, 48 = median prior
Bands: 0-29 Low, 30-59 Monitor, 60-79 Elevated, 80-100 High
Predictive estimate, not a guarantee.

## Free Stack - $0 to test
- Hosting: Vercel Free or GitHub Pages
- DB + Auth: Supabase Free
- AI: GitHub Models (use GitHub Personal Access Token) - free tier, or Groq / Gemini free tier
- Email: Resend Free 100/day
- SMS/Voice: Twilio Trial $15 credit - test with SMS first
- Payments: Stripe Test Mode - no real charges

## Quick Start - 5 minutes
1. Create repo on GitHub: github.com/new -> name ghostproof -> Public -> Create
2. Unzip this folder, then in terminal:
cd ghostproof
git init
git add .
git commit -m "GhostProof MVP"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ghostproof.git
git push -u origin main
3. Deploy: Go to vercel.com -> New Project -> Import ghostproof -> Add env vars from .env.example -> Deploy
4. Supabase: supabase.com -> New Project -> SQL Editor -> Run supabase/schema.sql -> Copy URL + anon key to Vercel env vars

## Env Keys - Where to get them
- VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY: supabase.com Dashboard > Settings > API
- GITHUB_TOKEN: github.com/settings/tokens -> Generate new token (classic) -> Check models:read scope -> Use as GitHub Models key
- RESEND_API_KEY: resend.com/api-keys
- TWILIO_*: twilio.com/console
- STRIPE_*: stripe.com Dashboard > Developers > API keys > Use Test Mode keys

## What is built vs to-do
Built: Score engine, invoice dashboard, predictor, escalation timeline, Job Story pay page mock, professional wording
To-do for live: Connect Resend/Twilio in api/send-followup.js, connect Stripe Payment Link, connect GitHub Models for tone scoring
