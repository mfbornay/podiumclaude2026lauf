// ─────────────────────────────────────────────────────────────────────────────
// PODIUM — CSS UPGRADE v2  (reemplaza el const CSS = `...` en App.tsx)
// Inspirado en Revolut / Linear / Vercel dark-premium aesthetic
// ─────────────────────────────────────────────────────────────────────────────

export const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,900&family=DM+Sans:wght@300;400;500;600;700&display=swap');

*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;font-family:'DM Sans',sans-serif}
html,body{background:#0A0703;height:100%;color:var(--text)}

:root{
  --bg:#0A0703;
  --s1:#131009;
  --s2:#1A140A;
  --s3:#231B0D;
  --s4:#2E2410;
  --border:rgba(240,190,80,.09);
  --border2:rgba(240,190,80,.18);
  --amber:#F0A832;
  --amber-dim:rgba(240,168,50,.6);
  --coral:#E8623A;
  --green:#5DC98A;
  --rose:#E87B9E;
  --blue:#6EB5FF;
  --red:#FF4444;
  --text:#F5EDD8;
  --muted:#7A6A4A;
  --muted2:#2E2410;
  --glow-amber:0 0 20px rgba(240,168,50,.35);
  --glow-amber-lg:0 0 40px rgba(240,168,50,.25);
}

/* ─── APP WRAPPER + AMBIENT DEPTH ─── */
.app{
  max-width:430px;margin:0 auto;min-height:100vh;
  background:var(--bg);overflow-x:hidden;color:var(--text);
  position:relative;isolation:isolate;
}
/* Ambient warm light from top */
.app::before{
  content:'';position:fixed;top:-80px;left:50%;
  transform:translateX(-50%);
  width:360px;height:360px;border-radius:50%;
  background:radial-gradient(ellipse at center,rgba(240,168,50,.055) 0%,transparent 70%);
  pointer-events:none;z-index:0;
}
/* Subtle grain texture */
.app::after{
  content:'';position:fixed;inset:0;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  opacity:.022;pointer-events:none;z-index:0;
}

.page{
  min-height:100vh;display:flex;flex-direction:column;justify-content:center;
  padding:40px 28px;color:var(--text);position:relative;z-index:1;
}

/* ─── LOGO / AUTH ─── */
.logo{font-family:'Playfair Display',serif;font-size:42px;font-weight:900;color:var(--text);margin-bottom:6px}
.logo span{color:var(--amber)}
.tagline{font-size:14px;color:var(--muted);margin-bottom:36px;line-height:1.5;font-weight:300}

/* ─── FORM ELEMENTS ─── */
.lbl{display:block;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);font-weight:600;margin-bottom:6px}
.inp{
  width:100%;background:var(--s2);border:1px solid var(--border);
  border-radius:14px;padding:14px 16px;font-size:15px;color:var(--text);
  font-family:'DM Sans',sans-serif;outline:none;
  transition:border-color .2s,box-shadow .2s;margin-bottom:14px;
}
.inp:focus{
  border-color:rgba(240,168,50,.5);
  box-shadow:0 0 0 3px rgba(240,168,50,.08);
}
.inp::placeholder{color:var(--muted);font-weight:300}

.btn{
  width:100%;background:var(--amber);color:#0A0703;border:none;
  border-radius:14px;padding:15px;font-size:15px;font-weight:700;
  cursor:pointer;margin-bottom:12px;font-family:'DM Sans',sans-serif;
  box-shadow:0 4px 20px rgba(240,168,50,.4);
  transition:transform .15s,box-shadow .15s,background .15s;
  position:relative;z-index:1;
}
.btn:hover:not(:disabled){
  transform:translateY(-1px);
  box-shadow:0 6px 28px rgba(240,168,50,.55);
  background:#F5B440;
}
.btn:active:not(:disabled){transform:translateY(0) scale(.98)}
.btn:disabled{background:var(--s3);color:var(--muted);cursor:default;box-shadow:none}

.btn-ghost{
  width:100%;background:var(--s2);border:1px solid rgba(240,190,80,.15);
  border-radius:14px;padding:14px;font-size:14px;font-weight:600;
  color:var(--muted);cursor:pointer;font-family:'DM Sans',sans-serif;margin-bottom:10px;
  transition:border-color .2s,color .2s;
}
.btn-ghost:hover{border-color:var(--amber);color:var(--amber)}

.btn-danger{
  width:100%;background:rgba(255,68,68,.07);border:1px solid rgba(255,68,68,.18);
  border-radius:14px;padding:13px;font-size:14px;font-weight:600;
  color:var(--red);cursor:pointer;font-family:'DM Sans',sans-serif;margin-top:8px;
  transition:background .2s;
}
.btn-danger:hover{background:rgba(255,68,68,.12)}

.switch{text-align:center;font-size:13px;color:var(--muted)}
.switch span{color:var(--amber);cursor:pointer;font-weight:600}
.err{background:rgba(255,68,68,.07);border:1px solid rgba(255,68,68,.2);border-radius:12px;padding:11px 14px;font-size:13px;color:var(--red);margin-bottom:14px;line-height:1.4}
.ok{background:rgba(93,201,138,.07);border:1px solid rgba(93,201,138,.2);border-radius:12px;padding:11px 14px;font-size:13px;color:var(--green);margin-bottom:14px}
.prog{display:flex;gap:5px;margin-bottom:28px}
.prog-dot{flex:1;height:3px;border-radius:2px;transition:background .3s}
.avi-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;margin-bottom:20px}
.avi-opt{
  background:var(--s2);border:2px solid transparent;border-radius:12px;
  padding:10px;font-size:24px;text-align:center;cursor:pointer;
  transition:all .15s;
}
.avi-opt.sel{border-color:var(--amber);background:rgba(240,168,50,.08);box-shadow:var(--glow-amber)}

/* ─── LOADING ─── */
.loading{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;gap:16px;position:relative;z-index:1}
.spin{width:32px;height:32px;border:2.5px solid var(--s3);border-top-color:var(--amber);border-radius:50%;animation:spin .8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.loading-txt{font-size:13px;color:var(--muted);font-weight:300}

/* ─── TOPBAR ─── */
.tb{
  padding:calc(env(safe-area-inset-top,0px) + 14px) 18px 0;
  display:flex;justify-content:space-between;align-items:center;
  position:relative;z-index:1;
}
.tb-logo{display:flex;align-items:center;gap:6px;cursor:default}
.tb-logo-word{
  font-family:'Playfair Display',serif;font-weight:900;font-style:italic;
  font-size:22px;color:var(--text);letter-spacing:-.3px;
}
.tb-r{display:flex;align-items:center;gap:7px}
.gchip{
  display:flex;align-items:center;gap:6px;
  background:var(--s2);border:1px solid var(--border);
  border-radius:20px;padding:5px 11px;
  transition:border-color .15s;
}
.gchip:hover{border-color:rgba(240,190,80,.2)}
.gdot{width:7px;height:7px;border-radius:50%}
.gname{font-size:11px;font-weight:600;color:var(--text)}
.avi-btn{
  width:32px;height:32px;border-radius:10px;border:none;cursor:pointer;
  font-size:16px;display:flex;align-items:center;justify-content:center;
  background:var(--amber);box-shadow:0 2px 10px rgba(240,168,50,.35);
  transition:box-shadow .15s,transform .15s;
}
.avi-btn:hover{box-shadow:var(--glow-amber);transform:scale(1.05)}

/* ─── CONTENT ─── */
.content{
  padding:14px 18px calc(88px + env(safe-area-inset-bottom,0px));
  animation:up .22s ease both;
  position:relative;z-index:1;
}
.content-fab{padding-bottom:calc(138px + env(safe-area-inset-bottom,0px))}

/* ─── LOGROS ─── */
.logros-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:4px}
.logro-card{border-radius:14px;padding:12px 10px;text-align:center;animation:up .3s ease}
.logro-weekly{background:rgba(240,168,50,.07);border:1px solid rgba(240,168,50,.35)}
.logro-milestone{background:rgba(93,201,138,.06);border:1px solid rgba(93,201,138,.3)}
.logro-ico{font-size:26px;margin-bottom:5px;line-height:1}
.logro-title{font-size:12px;font-weight:800;color:var(--text);margin-bottom:2px;line-height:1.2}
.logro-desc{font-size:10px;color:var(--muted);line-height:1.35;font-weight:300}
.logro-none{font-size:12px;color:var(--muted);text-align:center;padding:14px 0;font-style:italic;font-weight:300}

/* ─── ÁMBITOS BARS ─── */
.ambito-bar-wrap{margin-bottom:10px}
.ambito-bar-track{height:5px;border-radius:3px;background:var(--s3);overflow:hidden;margin-top:5px}
.ambito-bar-fill{height:100%;border-radius:3px;transition:width .6s cubic-bezier(.16,1,.3,1)}

/* ─── BADGE CHIPS ─── */
.badge-chip{
  display:flex;align-items:center;gap:10px;
  background:var(--s1);border:1px solid var(--border);
  border-radius:12px;padding:10px 12px;margin-bottom:6px;
  transition:border-color .15s;
}
.badge-chip:hover{border-color:rgba(240,190,80,.2)}
.badge-chip-ico{font-size:22px;flex-shrink:0}
.badge-chip-body{flex:1}
.badge-chip-title{font-size:13px;font-weight:700;color:var(--text)}
.badge-chip-sub{font-size:11px;color:var(--muted);margin-top:1px;font-weight:300}

/* ─── LAST 7 DAYS BAR CHART ─── */
.last7-row{display:flex;gap:3px;margin-bottom:14px}
.last7-cell{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px}
.last7-bar{
  width:100%;border-radius:4px;background:var(--s3);
  display:flex;align-items:flex-end;justify-content:center;
  min-height:28px;position:relative;
  transition:background .3s;
}
.last7-pts{font-size:9px;font-weight:700;color:var(--amber);position:absolute;bottom:3px}
.last7-lbl{font-size:9px;color:var(--muted);letter-spacing:.5px;font-weight:500}

/* ─── ANIMATIONS ─── */
@keyframes up{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes pop{from{opacity:0;transform:scale(.88)}to{opacity:1;transform:scale(1)}}
@keyframes glow-pulse{
  0%,100%{box-shadow:0 0 14px rgba(240,168,50,.25)}
  50%{box-shadow:0 0 28px rgba(240,168,50,.5)}
}
@keyframes shimmer{
  0%{background-position:-200% 0}
  100%{background-position:200% 0}
}

/* ─── SECTION LABELS ─── */
.section-lbl{
  display:block;font-size:10px;letter-spacing:2px;text-transform:uppercase;
  color:var(--muted);font-weight:600;margin-bottom:9px;
}

/* ─── GENERIC CARD ─── */
.card{
  background:var(--s1);border:1px solid var(--border);
  border-radius:16px;padding:15px;margin-bottom:10px;
}

/* ─── BOTTOM NAV — FLOATING PILL (el cambio más impactante) ─── */
.nav{
  position:fixed;
  bottom:calc(env(safe-area-inset-bottom,0px) + 14px);
  left:50%;transform:translateX(-50%);
  width:calc(100% - 32px);max-width:398px;
  background:rgba(19,16,9,.92);
  backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px);
  border:1px solid rgba(240,190,80,.12);
  border-radius:26px;
  display:grid;grid-template-columns:repeat(4,1fr);
  padding:8px 4px calc(8px);
  z-index:100;
  box-shadow:0 8px 40px rgba(0,0,0,.7),0 1px 0 rgba(240,190,80,.06) inset;
}

/* FAB above floating nav */
.fab-wrap{
  position:fixed;
  bottom:calc(env(safe-area-inset-bottom,0px) + 84px);
  left:50%;transform:translateX(-50%);
  width:100%;max-width:430px;
  display:flex;justify-content:center;
  pointer-events:none;z-index:99;
}
.fab{
  pointer-events:all;
  display:flex;align-items:center;gap:8px;
  background:var(--amber);color:#0A0703;border:none;border-radius:28px;
  padding:14px 32px;font-size:14px;font-weight:800;letter-spacing:.4px;
  cursor:pointer;
  box-shadow:0 4px 28px rgba(240,168,50,.6),0 1px 0 rgba(255,255,255,.15) inset;
  transition:transform .15s,box-shadow .15s;
  animation:up .25s ease;
}
.fab:active{transform:scale(.95);box-shadow:0 2px 12px rgba(240,168,50,.35)}
.fab:hover{transform:translateY(-2px);box-shadow:0 6px 36px rgba(240,168,50,.7)}
.fab-done{
  background:var(--s2);color:var(--green);
  box-shadow:0 2px 12px rgba(93,201,138,.15);
  border:1px solid rgba(93,201,138,.2);cursor:default;
  font-size:13px;
}
.fab-done:hover{transform:none}
.fab-bets{
  background:linear-gradient(135deg,#6C4DFF 0%,#9B5DFF 100%);color:#fff;
  box-shadow:0 4px 28px rgba(108,77,255,.55),0 1px 0 rgba(255,255,255,.2) inset;
}

/* Nav buttons */
.nb{
  background:none;border:none;cursor:pointer;
  display:flex;flex-direction:column;align-items:center;gap:2px;
  padding:6px 4px;border-radius:18px;
  transition:background .15s;
}
.nb:hover:not(.on){background:rgba(240,190,80,.05)}
.nbi{font-size:19px;transition:transform .2s,filter .2s;line-height:1}
.nbl{
  font-size:8.5px;letter-spacing:1.2px;text-transform:uppercase;
  color:var(--muted);font-weight:600;transition:color .15s;
}
.nb.on{background:rgba(240,168,50,.1)}
.nb.on .nbl{color:var(--amber)}
.nb.on .nbi{
  transform:scale(1.12);
  filter:drop-shadow(0 0 6px rgba(240,168,50,.7));
}
.nbp{width:3px;height:3px;border-radius:50%;background:var(--amber);margin:0 auto;opacity:0}
.nb.on .nbp{opacity:1}

/* ─── HABIT GRID ─── */
.qi{
  background:var(--s1);border:1px solid var(--border);
  border-radius:14px;padding:12px;cursor:pointer;
  transition:all .15s cubic-bezier(.16,1,.3,1);
  display:flex;flex-direction:column;align-items:center;gap:5px;
  text-align:center;user-select:none;
}
.qi:hover:not(.on):not(.locked){border-color:rgba(240,190,80,.2);background:rgba(240,190,80,.02)}
.qi.on{
  border-color:rgba(240,168,50,.5);
  background:rgba(240,168,50,.06);
  box-shadow:0 0 14px rgba(240,168,50,.12);
}
.qi.locked{opacity:.5;cursor:default}
.qi-icon{font-size:22px}
.qi-name{font-size:11px;font-weight:600;color:var(--text);line-height:1.2}
.qi-pts{font-size:11px;color:var(--muted);font-weight:300}
.qi.on .qi-pts{color:var(--amber);font-weight:600}
.qi-chk{
  width:16px;height:16px;border-radius:50%;
  border:1.5px solid var(--muted2);
  display:flex;align-items:center;justify-content:center;
  font-size:9px;transition:all .15s;
}
.qi.on .qi-chk{background:var(--amber);border-color:var(--amber);color:#000}
.q-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px}

/* ─── RANKING HERO ─── */
.rank-hero{
  background:linear-gradient(160deg,#1A1208,#0E0A04);
  border:1px solid rgba(240,168,50,.14);
  border-radius:22px;padding:20px;margin-bottom:14px;
  position:relative;overflow:hidden;
}
.rank-hero::before{
  content:'';position:absolute;top:-60px;right:-40px;
  width:180px;height:180px;border-radius:50%;
  background:radial-gradient(circle,rgba(240,168,50,.1),transparent 70%);
  pointer-events:none;
}
.rh-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}
.rh-lbl{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--muted);font-weight:600}
.rh-btn{font-size:12px;color:var(--amber);font-weight:600;cursor:pointer;background:none;border:none;font-family:'DM Sans',sans-serif}

.ambito-chip{
  display:inline-flex;align-items:center;gap:3px;border-radius:20px;
  font-size:9px;font-weight:700;padding:2px 7px;white-space:nowrap;border:1px solid transparent;
}
.ambito-chip.leader{opacity:1}
.ambito-chip.second{opacity:.5}

/* ─── PODIUM ─── */
.podium-row{display:flex;align-items:flex-end;justify-content:center;gap:10px}
.pc{display:flex;flex-direction:column;align-items:center;gap:5px;cursor:pointer;transition:transform .2s}
.pc:hover{transform:translateY(-2px)}
.pavi{
  border-radius:14px;display:flex;align-items:center;justify-content:center;
  background:var(--s3);border:2px solid transparent;transition:all .2s;
}
.pavi.p1{
  width:64px;height:64px;font-size:30px;
  border-color:var(--amber);
  box-shadow:0 0 24px rgba(240,168,50,.4),0 0 48px rgba(240,168,50,.15);
  animation:glow-pulse 3s ease-in-out infinite;
}
.pavi.p2{
  width:50px;height:50px;font-size:23px;
  border-color:#8A8A8A;
  box-shadow:0 0 12px rgba(138,138,138,.3);
}
.pavi.p3{
  width:44px;height:44px;font-size:20px;
  border-color:#CD7F32;
  box-shadow:0 0 10px rgba(205,127,50,.25);
}
.pname{
  font-size:11px;font-weight:600;color:var(--text);
  max-width:72px;text-align:center;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
}
.ppts{font-size:10px;color:var(--muted);font-weight:300}
.pblk{border-radius:10px 10px 0 0;display:flex;align-items:center;justify-content:center}
.pblk.p1{height:64px;background:rgba(240,168,50,.12);width:90px;border-top:1px solid rgba(240,168,50,.2)}
.pblk.p2{height:44px;background:rgba(138,138,138,.07);width:80px}
.pblk.p3{height:32px;background:rgba(205,127,50,.06);width:74px}
.pnum{font-family:'Playfair Display',serif;font-weight:900}
.pnum.p1{font-size:24px;color:var(--amber);text-shadow:0 0 12px rgba(240,168,50,.5)}
.pnum.p2{font-size:18px;color:#8A8A8A}
.pnum.p3{font-size:15px;color:#CD7F32}

/* ─── RANKING LIST ─── */
.rank-list{display:flex;flex-direction:column;gap:6px}
.rrow{
  background:var(--s1);border:1px solid var(--border);
  border-radius:14px;padding:12px 14px;
  display:flex;align-items:center;gap:10px;
  cursor:pointer;transition:all .15s;
}
.rrow:hover{background:rgba(240,168,50,.04);border-color:rgba(240,190,80,.15)}
.rrow.me{
  border-color:rgba(240,168,50,.3);
  background:linear-gradient(90deg,rgba(240,168,50,.04),rgba(240,168,50,.01));
}
.rn{font-family:'Playfair Display',serif;font-size:16px;font-weight:700;color:var(--muted);width:22px;text-align:center}
.ravi{font-size:20px;width:28px;text-align:center}
.rinfo{flex:1;min-width:0}
.rname{font-size:13px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rdetail{font-size:11px;color:var(--muted);margin-top:2px;font-weight:300}
.rright{text-align:right;flex-shrink:0}
.rpts{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:var(--text)}
.rr-penalty{font-size:10px;color:#F2667A;margin-left:6px}
.empty{text-align:center;padding:28px 20px;color:var(--muted);font-size:13px;line-height:1.7;font-weight:300}

/* ─── PROFILE CARD ─── */
.prof-card{
  background:var(--s1);border:1px solid var(--border);
  border-radius:22px;padding:20px;margin-bottom:12px;
}
.prof-top{display:flex;align-items:center;gap:14px;margin-bottom:16px}
.prof-avi{
  width:64px;height:64px;
  background:linear-gradient(135deg,var(--amber),#E8923A);
  border-radius:20px;
  display:flex;align-items:center;justify-content:center;
  font-size:30px;flex-shrink:0;
  box-shadow:0 4px 18px rgba(240,168,50,.35);
}
.prof-name{font-family:'Playfair Display',serif;font-size:22px;font-weight:900;color:var(--text);line-height:1}
.prof-handle{font-size:11px;color:var(--muted);margin-top:3px;font-weight:300}
.admin-badge{
  display:inline-flex;align-items:center;gap:4px;
  background:rgba(240,168,50,.1);border:1px solid rgba(240,168,50,.25);
  border-radius:20px;padding:2px 8px;font-size:10px;font-weight:600;
  color:var(--amber);margin-top:4px;
}
.stats-row{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-bottom:12px}
.stat{
  background:var(--s2);border:1px solid var(--border);
  border-radius:13px;padding:14px 10px;text-align:center;
}
.stat-val{font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:var(--text);line-height:1}
.stat-lbl{font-size:9px;color:var(--muted);letter-spacing:1px;text-transform:uppercase;margin-top:4px;font-weight:600}

/* ─── INVITE ─── */
.invite{
  background:var(--s2);border:1px solid rgba(240,190,80,.15);
  border-radius:16px;padding:18px;margin-top:14px;text-align:center;
}
.invite-code{
  font-family:'Playfair Display',serif;font-size:34px;font-weight:900;
  color:var(--amber);letter-spacing:10px;margin:8px 0;
  text-shadow:0 0 20px rgba(240,168,50,.3);
}
.invite-sub{font-size:12px;color:var(--muted);font-weight:300}

/* ─── OVERLAYS / SHEETS ─── */
.overlay{
  position:fixed;inset:0;
  background:rgba(0,0,0,.8);
  backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);
  z-index:200;display:flex;align-items:flex-end;justify-content:center;
  animation:fade .2s ease;
}
@keyframes fade{from{opacity:0}to{opacity:1}}
.sheet{
  background:rgba(19,16,9,.95);
  backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
  border:1px solid rgba(240,190,80,.12);
  border-radius:28px 28px 0 0;
  width:100%;max-width:430px;
  padding:18px 18px calc(env(safe-area-inset-bottom,0px) + 28px);
  max-height:90vh;overflow-y:auto;color:var(--text);
  animation:slide-up .25s cubic-bezier(.16,1,.3,1);
  box-shadow:0 -4px 40px rgba(0,0,0,.5);
}
@keyframes slide-up{from{transform:translateY(24px);opacity:.5}to{transform:translateY(0);opacity:1}}
.sheet::-webkit-scrollbar{display:none}
.handle{width:36px;height:4px;background:var(--s4);border-radius:2px;margin:0 auto 18px}

/* ─── CODE INPUT ─── */
.code-inp{
  width:100%;background:var(--s2);border:1px solid rgba(240,168,50,.28);
  border-radius:14px;padding:18px;font-size:28px;font-weight:700;
  color:var(--amber);font-family:'Playfair Display',serif;text-align:center;
  letter-spacing:10px;outline:none;margin-bottom:14px;text-transform:uppercase;
  transition:box-shadow .2s;
}
.code-inp:focus{box-shadow:0 0 0 3px rgba(240,168,50,.12)}
.code-inp::placeholder{color:var(--muted2);font-size:14px;letter-spacing:2px;font-family:'DM Sans',sans-serif;font-weight:400}

/* ─── DIVIDER ─── */
.div{display:flex;align-items:center;gap:12px;margin:4px 0 14px}
.div-line{flex:1;height:1px;background:var(--s3)}
.div-txt{font-size:12px;color:var(--muted);font-weight:300}

/* ─── BETS TABS ─── */
.bets-tabs{display:flex;gap:7px;margin-bottom:14px}
.btab{
  flex:1;background:var(--s1);border:1px solid var(--border);
  border-radius:12px;padding:10px;text-align:center;
  font-size:12px;font-weight:600;color:var(--muted);
  cursor:pointer;transition:all .15s;
}
.btab.on{
  background:rgba(240,168,50,.09);border-color:rgba(240,168,50,.4);
  color:var(--amber);
}

/* ─── BET CARDS ─── */
.bet-card{
  background:var(--s1);border:1px solid var(--border);
  border-radius:20px;padding:18px;margin-bottom:10px;
  transition:border-color .2s;
}
.bet-card:hover{border-color:rgba(240,190,80,.18)}
.bet-card.won{border-color:rgba(93,201,138,.22);background:linear-gradient(135deg,rgba(93,201,138,.04),transparent)}
.bet-card.lost{border-color:rgba(232,98,58,.18)}
.bet-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
.bet-type-lbl{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);font-weight:600}
.bet-pot{border-radius:20px;padding:3px 11px;font-size:12px;font-weight:700}
.bet-pot.open{background:rgba(240,168,50,.12);color:var(--amber)}
.bet-pot.won{background:rgba(93,201,138,.12);color:var(--green)}
.bet-pot.lost{background:rgba(232,98,58,.12);color:var(--coral)}
.bet-vs{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
.bet-player{text-align:center;flex:1}
.bet-avi{font-size:30px;margin-bottom:4px}
.bet-pname{font-size:13px;font-weight:700}
.bet-pstat{font-size:11px;color:var(--muted);font-weight:300}
.bet-vs-lbl{font-family:'Playfair Display',serif;font-size:16px;font-weight:900;color:var(--muted)}
.bet-actions{display:flex;gap:8px;margin-bottom:8px}
.bet-btn{
  flex:1;padding:10px;border-radius:12px;
  border:1px solid var(--border);background:var(--s2);
  color:var(--text);font-family:'DM Sans',sans-serif;
  font-size:12px;font-weight:600;cursor:pointer;transition:all .15s;
}
.bet-btn:hover{border-color:rgba(240,168,50,.4);color:var(--amber)}
.bet-timer{font-size:11px;color:var(--muted);text-align:center;font-weight:300}
.my-pick{
  background:rgba(240,168,50,.07);border:1px solid rgba(240,168,50,.18);
  border-radius:10px;padding:8px;font-size:12px;color:var(--amber);
  text-align:center;margin-top:4px;display:flex;justify-content:center;align-items:center;
}
.new-bet-btn{
  width:100%;background:none;border:1px dashed rgba(240,190,80,.2);
  border-radius:16px;padding:16px;color:var(--muted);font-size:13px;
  font-weight:600;cursor:pointer;transition:all .2s;
  display:flex;align-items:center;justify-content:center;gap:8px;
  font-family:'DM Sans',sans-serif;
}
.new-bet-btn:hover{border-color:var(--amber);color:var(--amber)}

/* ─── CHAT ─── */
.chat-wrap{display:flex;flex-direction:column;flex:1;overflow:hidden}
.chat-list{
  flex:1;overflow-y:auto;display:flex;flex-direction:column;
  gap:10px;padding:8px 0 4px;
}
.chat-list::-webkit-scrollbar{width:3px}
.chat-list::-webkit-scrollbar-track{background:transparent}
.chat-list::-webkit-scrollbar-thumb{background:var(--s3);border-radius:2px}
.chat-empty{text-align:center;color:var(--muted);font-size:12px;padding:20px;font-style:italic;font-weight:300}

.msg{display:flex;align-items:flex-end;gap:8px;max-width:85%}
.msg.me{align-self:flex-end;flex-direction:row-reverse}
.msg-avi{
  width:28px;height:28px;border-radius:50%;
  background:var(--s3);display:flex;align-items:center;
  justify-content:center;font-size:14px;flex-shrink:0;
}
.msg-body{display:flex;flex-direction:column;gap:3px;min-width:0}
.msg.me .msg-body{align-items:flex-end}
.msg-meta{font-size:10px;color:var(--muted);display:flex;gap:6px;padding:0 4px;font-weight:300}
.msg-name{font-weight:700;color:var(--amber)}
.msg-bubble{
  background:var(--s2);border:1px solid var(--border);
  border-radius:16px;padding:8px 12px;
  font-size:13px;line-height:1.45;
  word-wrap:break-word;white-space:pre-wrap;
}
.msg.me .msg-bubble{
  background:rgba(240,168,50,.14);
  border-color:rgba(240,168,50,.28);
}
.msg-photo{max-width:220px;max-height:280px;border-radius:14px;border:1px solid var(--border);display:block;cursor:pointer}

.chat-input-bar{
  flex-shrink:0;
  background:rgba(13,10,7,.94);
  backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
  border-top:1px solid var(--border);
  padding:10px 15px calc(env(safe-area-inset-bottom,0px) + 10px);
  display:flex;gap:8px;align-items:center;
}
.chat-input{
  flex:1;background:var(--s2);border:1px solid var(--border);
  border-radius:22px;padding:10px 15px;color:var(--text);
  font-family:'DM Sans',sans-serif;font-size:13px;outline:none;
  transition:border-color .2s,box-shadow .2s;
}
.chat-input:focus{border-color:rgba(240,168,50,.4);box-shadow:0 0 0 3px rgba(240,168,50,.06)}
.chat-photo-btn{
  background:var(--s2);border:1px solid var(--border);
  border-radius:50%;width:38px;height:38px;
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;font-size:16px;flex-shrink:0;
  transition:border-color .15s;
}
.chat-photo-btn:hover{border-color:rgba(240,190,80,.3)}
.chat-send{
  background:var(--amber);color:#0A0703;border:none;
  border-radius:50%;width:38px;height:38px;
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;font-size:15px;font-weight:700;flex-shrink:0;
  box-shadow:0 2px 12px rgba(240,168,50,.4);
  transition:box-shadow .15s,transform .15s;
}
.chat-send:hover:not(:disabled){box-shadow:var(--glow-amber);transform:scale(1.05)}
.chat-send:disabled{opacity:.35;cursor:not-allowed;box-shadow:none}
.chat-sending{font-size:11px;color:var(--muted);text-align:center;padding:4px;font-weight:300}

/* ─── DISPUTES ─── */
.disputes-btn{
  background:transparent;border:1px solid var(--border);
  border-radius:10px;padding:6px 11px;color:var(--text);
  font-size:11px;font-weight:600;cursor:pointer;
  font-family:'DM Sans',sans-serif;
  display:inline-flex;align-items:center;gap:6px;
  transition:all .15s;
}
.disputes-btn:hover{border-color:rgba(240,168,50,.4);color:var(--amber)}

.dispute-habit{
  background:var(--s2);border:1px solid var(--border);
  border-radius:11px;padding:11px 13px;margin-bottom:6px;
  cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:10px;
  transition:all .15s;
}
.dispute-habit:hover{border-color:rgba(240,168,50,.3)}
.dispute-habit.sel{border-color:var(--amber);background:rgba(240,168,50,.07)}
.dispute-habit-info{display:flex;align-items:center;gap:10px}
.dispute-habit-icon{font-size:18px}
.dispute-habit-name{font-size:13px;font-weight:600}
.dispute-habit-pts{font-size:11px;color:var(--muted);font-weight:300}
.dispute-habit-penalty{font-size:10px;color:#F2667A}
.dispute-reason{
  width:100%;background:var(--s2);border:1px solid var(--border);
  border-radius:11px;padding:11px;color:var(--text);
  font-family:'DM Sans',sans-serif;font-size:12px;
  margin-top:6px;resize:vertical;min-height:60px;
  transition:border-color .2s;
}
.dispute-reason:focus{outline:none;border-color:rgba(240,168,50,.4)}

.dispute-card{
  background:var(--s1);border:1px solid var(--border);
  border-radius:14px;padding:13px;margin-bottom:8px;
}
.dispute-card.failed{border-color:rgba(242,102,122,.3);background:rgba(242,102,122,.04)}
.dispute-card.passed{border-color:rgba(93,201,138,.3);background:rgba(93,201,138,.04)}
.dispute-card-head{display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:6px}
.dispute-card-title{font-size:13px;font-weight:700}
.dispute-card-sub{font-size:11px;color:var(--muted);margin-top:2px;font-weight:300}
.dispute-card-status{font-size:10px;letter-spacing:1px;text-transform:uppercase;padding:3px 9px;border-radius:8px;font-weight:700;white-space:nowrap}
.dcs-active{background:rgba(240,168,50,.14);color:var(--amber)}
.dcs-failed{background:rgba(242,102,122,.14);color:#F2667A}
.dcs-passed{background:rgba(93,201,138,.14);color:var(--green)}
.dispute-reason-box{
  font-size:12px;color:var(--muted);background:var(--s2);
  border-radius:8px;padding:7px 10px;margin:4px 0 8px;
  font-style:italic;font-weight:300;
}
.dispute-votes{display:flex;gap:8px;margin-top:8px}
.dispute-vote-btn{
  flex:1;padding:9px 10px;border-radius:11px;border:1px solid var(--border);
  background:transparent;color:var(--text);font-size:12px;font-weight:600;
  cursor:pointer;font-family:'DM Sans',sans-serif;
  display:flex;align-items:center;justify-content:center;gap:6px;
  transition:all .15s;
}
.dispute-vote-btn:hover{border-color:rgba(240,190,80,.3)}
.dispute-vote-btn.support{border-color:rgba(93,201,138,.3)}
.dispute-vote-btn.support:hover{border-color:var(--green);color:var(--green)}
.dispute-vote-btn.support.mine{background:rgba(93,201,138,.12);border-color:var(--green);color:var(--green)}
.dispute-vote-btn.reject{border-color:rgba(242,102,122,.3)}
.dispute-vote-btn.reject:hover{border-color:#F2667A;color:#F2667A}
.dispute-vote-btn.reject.mine{background:rgba(242,102,122,.12);border-color:#F2667A;color:#F2667A}
.dispute-tally{display:flex;justify-content:space-between;font-size:11px;color:var(--muted);margin-top:8px;padding:0 2px;font-weight:300}
.dispute-tally b{color:var(--text);font-weight:700}
.dispute-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px}
.dispute-grid-card{
  background:var(--s2);border:1.5px solid var(--border);border-radius:12px;
  padding:14px 10px 10px;cursor:pointer;
  display:flex;flex-direction:column;align-items:center;gap:4px;
  position:relative;transition:all .15s;
}
.dispute-grid-card:hover{border-color:rgba(240,168,50,.4)}
.dispute-grid-card.sel{border-color:var(--amber);background:rgba(240,168,50,.07);box-shadow:0 0 12px rgba(240,168,50,.12)}
.dispute-grid-radio{
  position:absolute;top:8px;right:8px;
  width:16px;height:16px;border-radius:50%;
  border:1.5px solid var(--border);background:var(--s3);
  transition:all .15s;
}
.dispute-grid-card.sel .dispute-grid-radio{border-color:var(--amber);background:var(--amber)}
.dispute-grid-icon{font-size:24px;margin-bottom:2px}
.dispute-grid-name{font-size:11px;font-weight:700;text-align:center;color:var(--text)}
.dispute-grid-penalty{font-size:10px;color:#F2667A;text-align:center}
.dispute-empty{text-align:center;color:var(--muted);font-size:12px;padding:30px 10px;font-style:italic;font-weight:300}

/* ─── CAL HEATMAP ─── */
.cal-hm-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:3px;margin-top:4px}
.cal-hm-cell{
  aspect-ratio:1;border-radius:5px;
  display:flex;align-items:center;justify-content:center;
  font-size:9px;font-weight:700;cursor:pointer;
  transition:transform .1s;
}
.cal-hm-cell:hover{transform:scale(1.18)}
.cal-hm-lbl{display:grid;grid-template-columns:repeat(7,1fr);gap:3px;margin-bottom:2px}
.cal-hm-dlbl{font-size:8px;color:var(--muted);text-align:center;letter-spacing:.5px;font-weight:500}

/* ─── RECORDS ─── */
.records-section{margin-top:18px}
.records-cat{font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin:12px 0 7px;font-weight:700}
.records-row{
  display:flex;align-items:center;justify-content:space-between;
  background:var(--s2);border:1px solid var(--border);
  border-radius:11px;padding:11px 13px;margin-bottom:6px;
  transition:border-color .15s;
}
.records-row:hover{border-color:rgba(240,190,80,.2)}
.records-label{font-size:12px;color:var(--text);font-weight:600}
.records-val{font-size:13px;font-weight:800;color:var(--amber);min-width:52px;text-align:right}
.records-input{
  background:var(--s3);border:1px solid rgba(240,168,50,.5);
  border-radius:7px;color:var(--text);
  font-family:'DM Sans',sans-serif;font-size:13px;font-weight:700;
  text-align:right;width:72px;padding:3px 7px;
}
.records-input:focus{outline:none;box-shadow:0 0 0 2px rgba(240,168,50,.15)}
.records-edit-btn{font-size:11px;color:var(--amber);background:none;border:none;cursor:pointer;font-weight:700;padding:0;font-family:'DM Sans',sans-serif}

/* ─── TODAY BANNER (hero principal) ─── */
.today-banner{
  background:linear-gradient(150deg,#1C1508 0%,#120E04 60%,#0E0A04 100%);
  border:1px solid rgba(240,168,50,.18);
  border-radius:22px;padding:20px;margin-bottom:14px;
  position:relative;overflow:hidden;
}
/* Glow ambiental grande */
.today-banner::before{
  content:'';position:absolute;top:-50px;right:-50px;
  width:200px;height:200px;border-radius:50%;
  background:radial-gradient(circle,rgba(240,168,50,.18),transparent 70%);
  pointer-events:none;
}
/* Línea de luz superior */
.today-banner::after{
  content:'';position:absolute;top:0;left:20px;right:20px;height:1px;
  background:linear-gradient(90deg,transparent,rgba(240,168,50,.3),transparent);
  pointer-events:none;
}

/* EL NÚMERO GRANDE — el alma del diseño */
.hero-pts{
  font-family:'Playfair Display',serif;
  font-size:72px;font-weight:900;
  color:var(--text);line-height:.95;
  text-shadow:0 0 40px rgba(240,168,50,.2);
  letter-spacing:-2px;
}
.hero-lbl{font-size:12px;color:var(--muted);margin-top:4px;font-weight:300;letter-spacing:.5px}

.streak{
  background:rgba(240,168,50,.13);
  border:1px solid rgba(240,168,50,.28);
  border-radius:20px;padding:5px 13px;
  font-size:13px;font-weight:700;color:var(--amber);
  white-space:nowrap;
  box-shadow:0 0 12px rgba(240,168,50,.15);
}
.chips{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}
.chip{
  background:rgba(240,168,50,.07);
  border:1px solid rgba(240,190,80,.12);
  border-radius:20px;padding:3px 10px;font-size:11px;color:var(--text);
  font-weight:500;
}
.apuntar-btn{
  width:100%;background:var(--amber);color:#0A0703;border:none;
  border-radius:14px;padding:15px;font-size:15px;font-weight:800;
  cursor:pointer;font-family:'DM Sans',sans-serif;margin-top:14px;
  display:flex;align-items:center;justify-content:center;gap:8px;
  box-shadow:0 4px 24px rgba(240,168,50,.5),0 1px 0 rgba(255,255,255,.12) inset;
  transition:transform .15s,box-shadow .15s;
  letter-spacing:.2px;
}
.apuntar-btn:hover{transform:translateY(-1px);box-shadow:0 6px 32px rgba(240,168,50,.65)}
.apuntar-btn:active{transform:scale(.98)}
.apuntar-btn.saved{
  background:rgba(93,201,138,.08);color:var(--green);
  border:1px solid rgba(93,201,138,.25);cursor:default;
  font-size:13px;box-shadow:none;
}
.apuntar-btn.saved:hover{transform:none}

/* ─── DAY GRID (week bar chart) ─── */
.day-grid{display:flex;gap:4px;margin-top:14px;margin-bottom:2px}
.day-cell{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px}
.day-cell-lbl{font-size:8px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;font-weight:600}
.day-cell-bar{
  width:100%;height:28px;border-radius:6px;
  background:var(--s2);border:1px solid var(--border);
  transition:all .25s cubic-bezier(.16,1,.3,1);
}
.day-cell-bar.done{
  background:rgba(240,168,50,.55);
  border-color:rgba(240,168,50,.7);
  box-shadow:0 0 8px rgba(240,168,50,.2);
}
.day-cell-bar.today-empty{border-color:var(--amber);border-style:dashed}

/* ─── FEED ─── */
.feed{display:flex;flex-direction:column;gap:10px;margin-top:14px}

.feed-card{
  background:var(--s1);border:1px solid var(--border);
  border-radius:18px;padding:15px;
  position:relative;overflow:hidden;
  transition:border-color .2s,box-shadow .2s;
}
/* Left accent bar — color-coded por tipo */
.feed-card::before{
  content:'';position:absolute;left:0;top:14px;bottom:14px;
  width:3px;border-radius:0 3px 3px 0;
  background:var(--border2);
  transition:background .2s;
}
.feed-card.type-log::before{background:rgba(240,168,50,.6)}
.feed-card.type-streak::before{background:rgba(232,98,58,.7)}
.feed-card.type-bet::before{background:rgba(110,181,255,.6)}
.feed-card.type-dispute::before{background:rgba(242,102,122,.6)}

.feed-card.streak-card{
  border-color:rgba(240,168,50,.25);
  background:linear-gradient(135deg,#181208,#1E1708,#130F04);
}
.feed-card.dispute-card-feed{border-color:rgba(242,102,122,.2)}

.feed-head{display:flex;align-items:center;gap:10px;margin-bottom:11px}
.feed-avi{
  width:38px;height:38px;background:var(--s2);
  border-radius:12px;display:flex;align-items:center;justify-content:center;
  font-size:20px;flex-shrink:0;cursor:pointer;
  transition:transform .15s;
}
.feed-avi:hover{transform:scale(1.07)}
.feed-name{font-size:13px;font-weight:700;color:var(--text);line-height:1.2}
.feed-when{font-size:10px;color:var(--muted);margin-top:1px;font-weight:300}
.feed-pts-big{
  font-family:'Playfair Display',serif;font-size:32px;font-weight:900;
  color:var(--amber);line-height:1;
  text-shadow:0 0 14px rgba(240,168,50,.25);
}
.feed-habits{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px}
.feed-habit-chip{
  background:var(--s2);border:1px solid var(--border);
  border-radius:8px;padding:3px 9px;font-size:11px;color:var(--text);font-weight:500;
}

/* Streak card */
.feed-streak-wrap{display:flex;align-items:center;gap:16px;padding:4px 0}
.feed-streak-num{
  font-family:'Playfair Display',serif;font-size:48px;font-weight:900;
  color:var(--amber);line-height:1;
  text-shadow:0 0 20px rgba(240,168,50,.4),0 0 40px rgba(240,168,50,.15);
}
.feed-streak-lbl{font-size:14px;color:var(--text);font-weight:700;line-height:1.4}
.feed-streak-sub{font-size:11px;color:var(--muted);font-weight:300}

/* Bet in feed */
.feed-bet-body{
  display:flex;align-items:center;justify-content:space-between;
  gap:8px;margin:6px 0 10px;
}
.feed-bp{text-align:center;flex:1}
.feed-bp-avi{font-size:28px;margin-bottom:3px}
.feed-bp-name{font-size:12px;font-weight:700}
.feed-bp-pts{font-size:11px;color:var(--muted);font-weight:300}
.feed-vs{font-family:'Playfair Display',serif;font-size:15px;font-weight:900;color:var(--muted)}
.feed-empty{
  text-align:center;color:var(--muted);font-size:12px;
  padding:32px 10px;font-style:italic;line-height:1.7;font-weight:300;
}

/* ─── REACTIONS ─── */
.reactions{
  display:flex;gap:5px;margin-top:10px;padding-top:10px;
  border-top:1px solid var(--border);flex-wrap:wrap;align-items:center;
}
.rx-btn{
  background:var(--s2);border:1px solid var(--border);
  border-radius:20px;padding:4px 9px;font-size:12px;cursor:pointer;
  display:inline-flex;align-items:center;gap:4px;
  transition:all .15s;color:var(--text);font-family:'DM Sans',sans-serif;
}
.rx-btn:hover{border-color:rgba(240,168,50,.35);background:rgba(240,168,50,.04)}
.rx-btn:active{transform:scale(.92)}
.rx-btn.mine{
  background:rgba(240,168,50,.11);
  border-color:rgba(240,168,50,.4);
  box-shadow:0 0 8px rgba(240,168,50,.15);
}
.rx-count{font-size:11px;font-weight:700}

.rx-add{
  background:var(--s2);border:1px solid var(--border);
  border-radius:20px;width:28px;height:28px;
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;font-size:15px;color:var(--muted);
  transition:all .15s;flex-shrink:0;
}
.rx-add:hover{border-color:var(--amber);color:var(--amber)}
.rx-picker{display:flex;gap:6px;padding:6px 2px;flex-wrap:wrap;align-items:center;animation:pop .15s cubic-bezier(.16,1,.3,1)}
.rx-pick-btn{
  font-size:22px;cursor:pointer;padding:4px 6px;border-radius:9px;
  border:none;background:transparent;transition:transform .1s;
}
.rx-pick-btn:hover{transform:scale(1.28);background:rgba(240,168,50,.08)}
.rx-pick-btn:active{transform:scale(.9)}

/* ─── PROFILE MODAL ─── */
.pm-avi{
  width:70px;height:70px;
  background:linear-gradient(135deg,var(--amber),#E8923A);
  border-radius:20px;display:flex;align-items:center;justify-content:center;
  font-size:34px;flex-shrink:0;
  box-shadow:0 4px 20px rgba(240,168,50,.4);
}
.pm-head{display:flex;gap:14px;align-items:flex-start;margin-bottom:18px}
.pm-name{font-family:'Playfair Display',serif;font-size:22px;font-weight:900;color:var(--text)}
.pm-sub{font-size:11px;color:var(--muted);margin-top:3px;font-weight:300}
.pm-log-row{
  background:var(--s2);border-radius:11px;padding:9px 12px;margin-bottom:6px;
  display:flex;justify-content:space-between;align-items:center;
}
.pm-log-date{font-size:10px;color:var(--muted);margin-bottom:3px;text-transform:uppercase;letter-spacing:.5px;font-weight:600}
.pm-log-pts{font-family:'Playfair Display',serif;font-size:18px;font-weight:700;color:var(--amber)}

/* ─── BET STAKE FLOW ─── */
.bet-sides{display:flex;gap:6px;margin:6px 0 8px}
.bet-side{
  flex:1;background:var(--s2);border:1px solid var(--border);
  border-radius:13px;padding:10px 6px;text-align:center;
  cursor:pointer;transition:all .15s;
}
.bet-side:hover{border-color:rgba(240,168,50,.35)}
.bet-side.sel{background:rgba(240,168,50,.09);border-color:rgba(240,168,50,.45);box-shadow:0 0 12px rgba(240,168,50,.1)}
.bet-side-avi{font-size:24px;margin-bottom:2px}
.bet-side-name{font-size:11px;font-weight:700}
.bet-side-pts{font-size:10px;color:var(--muted);font-weight:300}
.bet-pot-bar{height:4px;border-radius:2px;background:var(--s3);overflow:hidden;margin:6px 0 4px}
.bet-pot-fill{height:100%;background:linear-gradient(90deg,var(--amber),#F5B440);border-radius:2px;transition:width .4s cubic-bezier(.16,1,.3,1)}
.bet-pot-labels{display:flex;justify-content:space-between;font-size:9px;color:var(--muted);margin-bottom:8px;font-weight:300}
.bet-rules-lbl{font-size:9px;color:var(--muted);text-align:center;margin-bottom:6px;font-style:italic;font-weight:300}
.stake-row{display:flex;align-items:center;gap:8px;margin-bottom:8px}
.stake-range{flex:1;accent-color:var(--amber);height:4px}
.stake-amt{font-size:15px;font-weight:800;color:var(--amber);min-width:22px;text-align:right}
.stake-actions{display:flex;gap:6px;margin-bottom:8px}
.stake-confirm{
  flex:1;background:var(--amber);color:#0A0703;border:none;
  border-radius:11px;padding:10px;font-size:13px;font-weight:700;
  cursor:pointer;font-family:'DM Sans',sans-serif;
  box-shadow:0 3px 14px rgba(240,168,50,.4);
  transition:box-shadow .15s;
}
.stake-confirm:hover{box-shadow:0 4px 20px rgba(240,168,50,.6)}
.stake-cancel{
  background:var(--s2);border:1px solid var(--border);border-radius:11px;
  padding:10px 13px;font-size:12px;color:var(--muted);cursor:pointer;
  font-family:'DM Sans',sans-serif;transition:border-color .15s;
}
.stake-cancel:hover{border-color:rgba(240,190,80,.3);color:var(--text)}
.bet-locked{
  background:rgba(240,168,50,.07);border:1px solid rgba(240,168,50,.22);
  border-radius:11px;padding:9px 13px;
  display:flex;justify-content:space-between;align-items:center;
  margin-bottom:8px;font-size:12px;
}

/* ─── QUOTED EVENT (chat) ─── */
.quoted-event{
  display:flex;align-items:center;gap:8px;
  background:var(--s2);border-radius:12px 12px 0 0;
  padding:8px 12px;margin-bottom:2px;
}
.qe-bar{width:3px;border-radius:2px;align-self:stretch;flex-shrink:0;min-height:20px}
.qe-text{flex:1;font-size:11px;color:var(--muted);min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:300}
.qe-close{background:none;border:none;color:var(--muted);font-size:16px;cursor:pointer;flex-shrink:0;line-height:1;padding:0;transition:color .15s}
.qe-close:hover{color:var(--text)}

/* ─── CARD FOOTER (chat share link) ─── */
.card-footer{
  display:flex;align-items:center;justify-content:space-between;
  margin-top:9px;padding-top:9px;border-top:1px solid var(--border);
}
.chat-link-btn{
  background:none;border:none;color:var(--muted);font-size:11px;font-weight:600;
  cursor:pointer;font-family:'DM Sans',sans-serif;
  display:flex;align-items:center;gap:4px;padding:3px 8px;
  border-radius:8px;transition:all .15s;
}
.chat-link-btn:hover{color:var(--text);background:var(--s2)}

/* ─── BETS CHIP (topbar) ─── */
.bets-chip{
  display:flex;align-items:center;gap:4px;
  background:rgba(240,168,50,.1);border:1px solid rgba(240,168,50,.28);
  border-radius:20px;padding:5px 11px;cursor:pointer;
  transition:all .15s;
}
.bets-chip:hover{background:rgba(240,168,50,.18);box-shadow:0 0 10px rgba(240,168,50,.2)}
.bets-chip-ico{font-size:12px}
.bets-chip-n{font-size:11px;font-weight:700;color:var(--amber)}
`;
