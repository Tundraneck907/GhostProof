// GhostProof - Transparent Ghost Score
// Raw = 0.30*R + 0.25*D + 0.20*T + 0.15*H + 0.10*J
// Final = (n*Raw + 3*48)/(n+3)  48 = median prior, n = past invoices
export const MEDIAN_PRIOR = 48;
export function scoreResponse(v){
  if(v==null) return 50;
  if(v<=2) return 0; if(v<=12) return 30; if(v<=48) return 60; if(v<=72) return 85; return 100;
}
export function scoreDeposit(v){
  return {full:0, half:30, low:60, haggled:85, refused:100}[v] ?? 50;
}
export function scoreTone(v){
  return {clear:0, price:40, vague:70, none:90}[v] ?? 50;
}
export function scoreHistory(v){
  return {ontime:0, new:50, late:80, ghosted:100}[v] ?? 50;
}
export function scoreJobSize(amount){
  if(amount<1000) return 0; if(amount<5000) return 20; if(amount<=15000) return 40; return 60;
}
export function calcGhostScore({responseHours, deposit, tone, history, amount, pastInvoiceCount=0}){
  const R=scoreResponse(responseHours);
  const D=scoreDeposit(deposit);
  const T=scoreTone(tone);
  const H=scoreHistory(history);
  const J=scoreJobSize(amount);
  const raw = 0.30*R + 0.25*D + 0.20*T + 0.15*H + 0.10*J;
  const n = pastInvoiceCount;
  const final = (n*raw + 3*MEDIAN_PRIOR)/(n+3);
  const rounded = Math.round(final);
  const band = rounded<30?'Low':rounded<60?'Monitor':rounded<80?'Elevated':'High';
  return {raw: Math.round(raw*10)/10, final: rounded, band, breakdown:{R,D,T,H,J}};
}
export function testPrecision(predictions){
  const tp = predictions.filter(p=>p.predictedHigh && p.actuallyLate).length;
  const fp = predictions.filter(p=>p.predictedHigh && !p.actuallyLate).length;
  return tp+fp===0?0: tp/(tp+fp);
}
