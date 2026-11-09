import React, { useState, useMemo } from 'react'
import { calcGhostScore } from './lib/ghostScore.js'
import { isConnected } from './lib/supabase.js'
const SAMPLE = [
  {id:1, client:'Johnson Roof', amount:8400, days:14, responseHours:96, deposit:'haggled', tone:'vague', history:'new', past:0},
  {id:2, client:'Miller Deck', amount:2150, days:3, responseHours:10, deposit:'half', tone:'price', history:'ontime', past:4},
  {id:3, client:'Patel Remodel', amount:12900, days:0, responseHours:1, deposit:'full', tone:'clear', history:'ontime', past:6},
]
export default function App(){
  const [selected, setSelected] = useState(SAMPLE[0])
  const [mode, setMode] = useState('specialist')
  const [resp, setResp] = useState(96)
  const [dep, setDep] = useState('haggled')
  const [tone, setTone] = useState('vague')
  const pred = useMemo(()=> calcGhostScore({responseHours:resp, deposit:dep, tone, history:'new', amount:8400, pastInvoiceCount:0}),[resp,dep,tone])
  const selScore = useMemo(()=> calcGhostScore({responseHours:selected.responseHours, deposit:selected.deposit, tone:selected.tone, history:selected.history, amount:selected.amount, pastInvoiceCount:selected.past}),[selected])
  return <div className="wrap">
    <header><div className="logo">GhostProof</div><div className="tag">You stay the trusted contractor. GhostProof handles follow-up professionally.</div>
    <div className="pill">{isConnected ? 'Connected to Supabase' : 'Demo mode - add Supabase keys to go live'}</div></header>
    <section className="hero"><h1>Professional follow-up that protects client relationships.</h1><p>Predict follow-up risk before the job. Activate a dedicated billing coordinator. Clients see their finished job, not just a number.</p>
    <div className="stats"><div><b>$48,200</b><span>Recovered in demo</span></div><div><b>87%</b><span>Paid without you calling</span></div><div><b>0</b><span>Awkward conversations</span></div></div></section>
    <section className="card"><h2>Ghost Score Predictor - Transparent Formula</h2>
    <p className="formula">Raw = 0.30 x Response + 0.25 x Deposit + 0.20 x Tone + 0.15 x History + 0.10 x Job Size</p>
    <p className="formula">Final = (n x Raw + 3 x 48) / (n + 3) - 48 = median prior - n = past invoices</p>
    <label>Response time: {resp}h <input type="range" min="1" max="120" value={resp} onChange={e=>setResp(+e.target.value)}/></label>
    <div className="row"><label>Deposit <select value={dep} onChange={e=>setDep(e.target.value)}><option value="full">50%+ paid</option><option value="half">25-49%</option><option value="low">Under 25%</option><option value="haggled">Haggled down</option><option value="refused">Refused</option></select></label>
    <label>Tone <select value={tone} onChange={e=>setTone(e.target.value)}><option value="clear">Clear yes + date</option><option value="price">Price-focused only</option><option value="vague">Vague - maybe next week</option><option value="none">No commitment</option></select></label></div>
    <div className="score">Ghost Score: <b>{pred.final}</b> <span>{pred.band} Risk</span></div>
    <p className="muted">Predictive estimate, not a guarantee. Score improves as you add real payment outcomes.</p></section>
    <section className="card"><h2>Your Invoices</h2><div className="invoices">
    {SAMPLE.map(inv=>{ const s=calcGhostScore({responseHours:inv.responseHours, deposit:inv.deposit, tone:inv.tone, history:inv.history, amount:inv.amount, pastInvoiceCount:inv.past}); return <button key={inv.id} onClick={()=>setSelected(inv)} className={selected.id===inv.id?'inv active':'inv'}><b>{inv.client}</b><span>${inv.amount.toLocaleString()} - {inv.days===0?'Paid':inv.days+' days overdue'}</span><span>{s.final} - {s.band}</span></button>})}
    </div></section>
    <section className="card"><h2>{selected.client} - ${selected.amount.toLocaleString()}</h2>
    <p>Ghost Score <b>{selScore.final}</b> - {selScore.band} - Raw {selScore.raw} - Breakdown R:{selScore.breakdown.R} D:{selScore.breakdown.D} T:{selScore.breakdown.T} H:{selScore.breakdown.H} J:{selScore.breakdown.J}</p>
    <div className="toggle"><button className={mode==='you'?'on':''} onClick={()=>setMode('you')}>You - Trusted Contractor</button><button className={mode==='specialist'?'on':''} onClick={()=>setMode('specialist')}>Alex, Billing Coordinator</button></div>
    <p>{mode==='specialist' ? 'Alex, Billing Coordinator will follow up from a separate number and email. You stay the trusted contractor.' : 'You follow up personally. Use this only for low-risk clients.'}</p>
    <div className="timeline">
      <div><b>Day 0</b> Friendly confirmation from you + Job Story pay link</div>
      <div><b>Day 3</b> Professional nudge from Alex: Checking on the balance, pay link attached.</div>
      <div><b>Day 7</b> Voice call from Alex - transcript available, payment link sent by SMS while on call</div>
      <div><b>Day 14</b> Formal demand + payment plan offer</div>
      <div><b>Day 21</b> Lien warning countdown - professional, factual, with one-click pause if they commit to a date</div>
    </div>
    <button className="cta" onClick={()=>alert('Demo: In live version this activates Resend + Twilio + Stripe. Connect keys in .env to enable.')}>Activate Professional Follow-Up</button>
    </section>
    <section className="card"><h2>Job Story Pay Page - What the client sees</h2>
    <div className="paypage"><div className="photos"><div>Before</div><div>After</div></div><h3>New Metal Roof - Johnson Home</h3><p>100% Complete - 10-Year Workmanship Warranty</p><button className="pay">Pay $8,400 - Card / Apple Pay</button><p>Or pay in 2 payments - Pay link is Stripe Test Mode in this build</p></div></section>
    <footer>Demo Status: UI prototype with sample data. Follow-up is simulated until you connect Supabase + Resend + Twilio + Stripe keys. See README for 5-minute GitHub + Vercel setup.</footer>
  </div>
}
