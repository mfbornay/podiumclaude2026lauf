import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const sb = createClient(
  "https://lrnmvdmlrdhpzgwjbeoc.supabase.co",
  "sb_publishable_L4MpfGLZhQ2ogLzKD0k6Rg_OByoRiQj"
);

/* ══════════════════════════════════════════
   CSS
══════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;font-family:'DM Sans',sans-serif}
html,body{background:#0E0A07;height:100%}
:root{
  --bg:#0E0A07;--s1:#161109;--s2:#1E180B;--s3:#2A220F;--s4:#352B14;
  --border:rgba(240,190,80,.1);--amber:#F0A832;--coral:#E8623A;
  --green:#5DC98A;--rose:#E87B9E;--blue:#6EB5FF;--red:#FF4444;
  --text:#F5EDD8;--muted:#7A6A4A;--muted2:#3A2E18;
}
.app{max-width:430px;margin:0 auto;min-height:100vh;background:var(--bg);overflow-x:hidden}

/* AUTH */
.page{min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:40px 28px}
.logo{font-family:'Playfair Display',serif;font-size:42px;font-weight:900;color:var(--text);margin-bottom:6px}
.logo span{color:var(--amber)}
.tagline{font-size:14px;color:var(--muted);margin-bottom:36px;line-height:1.5}
.lbl{display:block;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);font-weight:500;margin-bottom:6px}
.inp{width:100%;background:var(--s2);border:1px solid var(--border);border-radius:13px;padding:14px 16px;font-size:15px;color:var(--text);font-family:'DM Sans',sans-serif;outline:none;transition:border-color .2s;margin-bottom:14px}
.inp:focus{border-color:rgba(240,168,50,.5)}
.inp::placeholder{color:var(--muted)}
.btn{width:100%;background:var(--amber);color:#0E0A07;border:none;border-radius:13px;padding:15px;font-size:15px;font-weight:700;cursor:pointer;margin-bottom:12px}
.btn:disabled{background:var(--s3);color:var(--muted);cursor:default}
.btn-ghost{width:100%;background:var(--s2);border:1px dashed var(--muted2);border-radius:13px;padding:14px;font-size:14px;font-weight:600;color:var(--muted);cursor:pointer;font-family:'DM Sans',sans-serif;margin-bottom:10px}
.btn-ghost:hover{border-color:var(--amber);color:var(--amber)}
.btn-danger{width:100%;background:rgba(255,68,68,.08);border:1px solid rgba(255,68,68,.2);border-radius:13px;padding:13px;font-size:14px;font-weight:600;color:var(--red);cursor:pointer;font-family:'DM Sans',sans-serif;margin-top:8px}
.switch{text-align:center;font-size:13px;color:var(--muted)}
.switch span{color:var(--amber);cursor:pointer;font-weight:600}
.err{background:rgba(255,68,68,.08);border:1px solid rgba(255,68,68,.25);border-radius:12px;padding:11px 14px;font-size:13px;color:var(--red);margin-bottom:14px;line-height:1.4}
.ok{background:rgba(93,201,138,.08);border:1px solid rgba(93,201,138,.25);border-radius:12px;padding:11px 14px;font-size:13px;color:var(--green);margin-bottom:14px}
.prog{display:flex;gap:5px;margin-bottom:28px}
.prog-dot{flex:1;height:3px;border-radius:2px;transition:background .3s}
.avi-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;margin-bottom:20px}
.avi-opt{background:var(--s2);border:2px solid transparent;border-radius:12px;padding:10px;font-size:24px;text-align:center;cursor:pointer;transition:all .15s}
.avi-opt.sel{border-color:var(--amber);background:rgba(240,168,50,.08)}

/* LOADING */
.loading{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;gap:16px}
.spin{width:32px;height:32px;border:3px solid var(--s3);border-top-color:var(--amber);border-radius:50%;animation:spin .8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.loading-txt{font-size:13px;color:var(--muted)}

/* MAIN */
.tb{padding:16px 18px 0;display:flex;justify-content:space-between;align-items:center}
.tb-logo{font-family:'Playfair Display',serif;font-size:22px;font-weight:900;color:var(--text)}
.tb-logo span{color:var(--amber)}
.tb-r{display:flex;align-items:center;gap:7px}
.gchip{display:flex;align-items:center;gap:6px;background:var(--s2);border:1px solid var(--border);border-radius:20px;padding:5px 11px}
.gdot{width:7px;height:7px;border-radius:50%}
.gname{font-size:11px;font-weight:600;color:var(--text)}
.avi-btn{width:32px;height:32px;border-radius:9px;border:none;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center}
.content{padding:14px 18px 88px;animation:up .22s ease both}
@keyframes up{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.section-lbl{display:block;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--muted);font-weight:500;margin-bottom:9px}
.card{background:var(--s1);border:1px solid var(--border);border-radius:16px;padding:15px;margin-bottom:10px}

/* NAV */
.nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;background:rgba(14,10,7,.96);backdrop-filter:blur(20px);border-top:1px solid var(--border);display:grid;grid-template-columns:repeat(4,1fr);padding:9px 0 20px;z-index:100}
.nb{background:none;border:none;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:3px;padding:5px 0}
.nbi{font-size:19px;transition:transform .2s}
.nbl{font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);font-weight:600}
.nb.on .nbl{color:var(--amber)}
.nb.on .nbi{transform:scale(1.1)}
.nbp{width:4px;height:4px;border-radius:50%;background:var(--amber);margin:0 auto}

/* HOY */
.hero{background:linear-gradient(135deg,#1E1608,#2A1E08);border:1px solid rgba(240,168,50,.2);border-radius:20px;padding:20px;margin-bottom:14px;position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;top:-40px;right:-40px;width:140px;height:140px;border-radius:50%;background:radial-gradient(circle,rgba(240,168,50,.12),transparent 70%)}
.hero-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px}
.hero-pts{font-family:'Playfair Display',serif;font-size:52px;font-weight:900;color:var(--text);line-height:1}
.hero-lbl{font-size:12px;color:var(--muted);margin-top:2px}
.streak{background:rgba(240,168,50,.15);border:1px solid rgba(240,168,50,.3);border-radius:20px;padding:5px 12px;font-size:13px;font-weight:600;color:var(--amber);white-space:nowrap}
.chips{display:flex;gap:6px;flex-wrap:wrap;margin-top:6px}
.chip{background:var(--s3);border-radius:20px;padding:3px 9px;font-size:11px;color:var(--text)}
.q-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px}
.qi{background:var(--s1);border:1px solid var(--border);border-radius:14px;padding:12px;cursor:pointer;transition:all .15s;display:flex;flex-direction:column;align-items:center;gap:5px;text-align:center;user-select:none}
.qi.on{border-color:rgba(240,168,50,.5);background:rgba(240,168,50,.05)}
.qi.locked{opacity:.6;cursor:default}
.qi-icon{font-size:22px}
.qi-name{font-size:11px;font-weight:600;color:var(--text);line-height:1.2}
.qi-pts{font-size:11px;color:var(--muted)}
.qi.on .qi-pts{color:var(--amber)}
.qi-chk{width:16px;height:16px;border-radius:50%;border:1.5px solid var(--muted2);display:flex;align-items:center;justify-content:center;font-size:9px;transition:all .15s}
.qi.on .qi-chk{background:var(--amber);border-color:var(--amber);color:#000}
.saved-ok{background:rgba(93,201,138,.08);border:1px solid rgba(93,201,138,.25);border-radius:12px;padding:11px 14px;font-size:13px;color:var(--green);margin-bottom:12px;display:flex;align-items:center;gap:8px}
.invite{background:var(--s2);border:1px solid var(--border);border-radius:14px;padding:16px;margin-top:14px;text-align:center}
.invite-code{font-family:'Playfair Display',serif;font-size:32px;font-weight:900;color:var(--amber);letter-spacing:8px;margin:8px 0}
.invite-sub{font-size:12px;color:var(--muted)}

/* RANKING */
.rank-hero{background:linear-gradient(160deg,#1E1608,#120E04);border:1px solid rgba(240,168,50,.15);border-radius:20px;padding:18px;margin-bottom:14px}
.rh-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
.rh-lbl{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--muted)}
.rh-btn{font-size:12px;color:var(--amber);font-weight:600;cursor:pointer;background:none;border:none;font-family:'DM Sans',sans-serif}
.podium-row{display:flex;align-items:flex-end;justify-content:center;gap:8px}
.pc{display:flex;flex-direction:column;align-items:center;gap:5px}
.pavi{border-radius:14px;display:flex;align-items:center;justify-content:center;background:var(--s3);border:2px solid transparent}
.pavi.p1{width:60px;height:60px;font-size:28px;border-color:var(--amber);box-shadow:0 0 18px rgba(240,168,50,.25)}
.pavi.p2{width:48px;height:48px;font-size:22px;border-color:var(--muted2)}
.pavi.p3{width:42px;height:42px;font-size:19px;border-color:var(--muted2)}
.pname{font-size:11px;font-weight:600;color:var(--text);max-width:70px;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ppts{font-size:10px;color:var(--muted)}
.pblk{border-radius:10px 10px 0 0;display:flex;align-items:center;justify-content:center}
.pblk.p1{height:60px;background:rgba(240,168,50,.1);width:86px}
.pblk.p2{height:42px;background:var(--s2);width:76px}
.pblk.p3{height:30px;background:var(--s2);width:70px}
.pnum{font-family:'Playfair Display',serif;font-weight:900}
.pnum.p1{font-size:22px;color:var(--amber)}
.pnum.p2{font-size:17px;color:var(--muted)}
.pnum.p3{font-size:14px;color:var(--muted)}
.rank-list{display:flex;flex-direction:column;gap:7px}
.rrow{background:var(--s1);border:1px solid var(--border);border-radius:14px;padding:12px 14px;display:flex;align-items:center;gap:10px}
.rrow.me{border-color:rgba(240,168,50,.3);background:rgba(240,168,50,.03)}
.rn{font-family:'Playfair Display',serif;font-size:16px;font-weight:700;color:var(--muted);width:22px;text-align:center}
.ravi{font-size:20px;width:28px;text-align:center}
.rinfo{flex:1;min-width:0}
.rname{font-size:13px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rdetail{font-size:11px;color:var(--muted);margin-top:2px}
.rright{text-align:right;flex-shrink:0}
.rpts{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:var(--text)}
.empty{text-align:center;padding:28px 20px;color:var(--muted);font-size:13px;line-height:1.7}

/* PERFIL */
.prof-card{background:var(--s1);border:1px solid var(--border);border-radius:20px;padding:18px;margin-bottom:12px}
.prof-top{display:flex;align-items:center;gap:13px;margin-bottom:16px}
.prof-avi{width:62px;height:62px;background:var(--amber);border-radius:18px;display:flex;align-items:center;justify-content:center;font-size:30px;flex-shrink:0}
.prof-name{font-family:'Playfair Display',serif;font-size:22px;font-weight:900;color:var(--text);line-height:1}
.prof-handle{font-size:11px;color:var(--muted);margin-top:3px}
.admin-badge{display:inline-flex;align-items:center;gap:4px;background:rgba(240,168,50,.12);border:1px solid rgba(240,168,50,.3);border-radius:20px;padding:2px 8px;font-size:10px;font-weight:600;color:var(--amber);margin-top:4px}
.stats-row{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-bottom:12px}
.stat{background:var(--s1);border:1px solid var(--border);border-radius:12px;padding:12px;text-align:center}
.stat-val{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:var(--text)}
.stat-lbl{font-size:10px;color:var(--muted);letter-spacing:.5px;margin-top:2px}

/* OVERLAY */
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.82);backdrop-filter:blur(14px);z-index:200;display:flex;align-items:flex-end;justify-content:center}
.sheet{background:var(--s1);border:1px solid var(--border);border-radius:26px 26px 0 0;width:100%;max-width:430px;padding:18px 18px 44px;max-height:88vh;overflow-y:auto}
.sheet::-webkit-scrollbar{display:none}
.handle{width:34px;height:4px;background:var(--s3);border-radius:2px;margin:0 auto 18px}

/* JOIN */
.code-inp{width:100%;background:var(--s2);border:1px solid rgba(240,168,50,.3);border-radius:13px;padding:18px;font-size:28px;font-weight:700;color:var(--amber);font-family:'Playfair Display',serif;text-align:center;letter-spacing:8px;outline:none;margin-bottom:14px;text-transform:uppercase}
.code-inp::placeholder{color:var(--muted2);font-size:14px;letter-spacing:2px;font-family:'DM Sans',sans-serif;font-weight:400}
.div{display:flex;align-items:center;gap:12px;margin:4px 0 14px}
.div-line{flex:1;height:1px;background:var(--s3)}
.div-txt{font-size:12px;color:var(--muted)}

/* APUESTAS */
.bets-tabs{display:flex;gap:7px;margin-bottom:14px}
.btab{flex:1;background:var(--s1);border:1px solid var(--border);border-radius:12px;padding:10px;text-align:center;font-size:12px;font-weight:600;color:var(--muted);cursor:pointer;transition:all .15s}
.btab.on{background:rgba(240,168,50,.1);border-color:var(--amber);color:var(--amber)}
.bet-card{background:var(--s1);border:1px solid var(--border);border-radius:18px;padding:16px;margin-bottom:10px}
.bet-card.won{border-color:rgba(93,201,138,.25)}
.bet-card.lost{border-color:rgba(232,98,58,.2)}
.bet-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
.bet-type-lbl{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted)}
.bet-pot{border-radius:20px;padding:3px 10px;font-size:12px;font-weight:700}
.bet-pot.open{background:rgba(240,168,50,.12);color:var(--amber)}
.bet-pot.won{background:rgba(93,201,138,.12);color:var(--green)}
.bet-pot.lost{background:rgba(232,98,58,.12);color:var(--coral)}
.bet-vs{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
.bet-player{text-align:center;flex:1}
.bet-avi{font-size:28px;margin-bottom:4px}
.bet-pname{font-size:13px;font-weight:600}
.bet-pstat{font-size:11px;color:var(--muted)}
.bet-vs-lbl{font-family:'Playfair Display',serif;font-size:15px;font-weight:700;color:var(--muted)}
.bet-actions{display:flex;gap:8px;margin-bottom:8px}
.bet-btn{flex:1;padding:10px;border-radius:11px;border:1px solid var(--border);background:var(--s2);color:var(--text);font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;cursor:pointer;transition:all .15s}
.bet-btn:hover{border-color:var(--amber);color:var(--amber)}
.bet-btn.sel{background:var(--amber);color:#0E0A07;border-color:var(--amber)}
.bet-timer{font-size:11px;color:var(--muted);text-align:center}
.my-pick{background:rgba(240,168,50,.08);border-radius:10px;padding:8px;font-size:12px;color:var(--amber);text-align:center;margin-top:4px;display:flex;justify-content:center;align-items:center}
.new-bet-btn{width:100%;background:none;border:1px dashed var(--muted2);border-radius:14px;padding:14px;color:var(--muted);font-size:13px;font-weight:600;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:8px;font-family:'DM Sans',sans-serif}
.new-bet-btn:hover{border-color:var(--amber);color:var(--amber)}
`;

/* ══════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════ */
const AVATARS = ["🐺","🦁","🐻","🦊","🐯","🦅","🐬","🦋","🐉","🦈","🐆","🦉"];

const QUESTIONS = [
  { id:"gym",         icon:"💪", name:"Gym / Fuerza",   pts:10 },
  { id:"running",     icon:"🏃", name:"Running",         pts:8  },
  { id:"sport",       icon:"🎾", name:"Deporte grupo",   pts:6  },
  { id:"quedada",     icon:"🍻", name:"Quedada amigos",  pts:5  },
  { id:"familia",     icon:"🏠", name:"Plan familiar",   pts:4  },
  { id:"food",        icon:"🥗", name:"Comida limpia",   pts:4  },
  { id:"screen_good", icon:"📵", name:"Pantalla <2h",    pts:4  },
  { id:"pareja",      icon:"❤️", name:"Plan de pareja",  pts:3  },
  { id:"book",        icon:"📚", name:"Lectura 30min",   pts:3  },
  { id:"course",      icon:"📖", name:"Estudio/Curso",   pts:4  },
  { id:"podcast",     icon:"🎧", name:"Podcast educ.",   pts:2  },
  { id:"meditation",  icon:"🧘", name:"Meditación",      pts:2  },
];

type Bet = {
  id: number;
  label: string;
  p1Name: string; p1Avi: string; p1Pts: number;
  p2Name: string; p2Avi: string; p2Pts: number;
  pot: number;
  ends: string;
  status: "open" | "won" | "lost" | "cancelled";
  myPick: 1 | 2 | null;
};

const BETS_INIT: Bet[] = [
  { id:1, label:"Duelo semanal · Gym",  p1Name:"Manu",  p1Avi:"🐺", p1Pts:71, p2Name:"Emilio", p2Avi:"🦁", p2Pts:65, pot:8, ends:"2d 14h", status:"open", myPick:null },
  { id:2, label:"Apuesta de racha",     p1Name:"Pedro", p1Avi:"🐙", p1Pts:62, p2Name:"Mario",  p2Avi:"🐯", p2Pts:58, pot:3, ends:"domingo", status:"open", myPick:null },
  { id:3, label:"Duelo · Running",      p1Name:"Manu",  p1Avi:"🐺", p1Pts:71, p2Name:"Nacho",  p2Avi:"🐬", p2Pts:47, pot:6, ends:"cerrada", status:"won", myPick:1 },
  { id:4, label:"Duelo · Sueño",        p1Name:"Jaime", p1Avi:"🐻", p1Pts:60, p2Name:"Álvaro", p2Avi:"🦅", p2Pts:54, pot:4, ends:"cerrada", status:"lost", myPick:2 },
];

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

function calcPts(done: Record<string,boolean>) {
  return QUESTIONS.reduce((s, q) => done[q.id] ? s + q.pts : s, 0);
}

/* ══════════════════════════════════════════
   LOADING
══════════════════════════════════════════ */
function Loading({ text = "Cargando..." }: { text?: string }) {
  return (
    <div className="loading">
      <div className="logo" style={{fontFamily:"'Playfair Display',serif",fontSize:36,fontWeight:900,color:"var(--text)"}}>
        Po<span style={{color:"var(--amber)"}}>d</span>ium
      </div>
      <div className="spin" />
      <div className="loading-txt">{text}</div>
    </div>
  );
}

/* ══════════════════════════════════════════
   AUTH
══════════════════════════════════════════ */
function AuthScreen({ onAuth, bootError }: { onAuth: (u: any) => void; bootError?: string }) {
  const [mode, setMode]     = useState<"login"|"register">("login");
  const [step, setStep]     = useState(0);
  const [email, setEmail]   = useState("");
  const [pass, setPass]     = useState("");
  const [name, setName]     = useState("");
  const [uname, setUN]      = useState("");
  const [avatar, setAvatar] = useState("🐺");
  const [err, setErr]       = useState("");
  const [info, setInfo]     = useState("");
  const [busy, setBusy]     = useState(false);

  function clearMsgs() { setErr(""); setInfo(""); }

  async function login() {
    if (\!email || \!pass) return;
    setBusy(true); clearMsgs();
    console.log("[Podium] login: signInWithPassword", { email });
    const { data, error } = await sb.auth.signInWithPassword({ email, password: pass });
    console.log("[Podium] login: response", { hasUser: \!\!data?.user, error });
    setBusy(false);
    if (error) { setErr(error.message); return; }
    if (\!data?.user) { setErr("Respuesta inesperada de Supabase (sin usuario)."); return; }
    onAuth(data.user);
  }

  async function register() {
    clearMsgs();
    if (step === 0) {
      if (pass.length < 8) { setErr("La contraseña debe tener mínimo 8 caracteres."); return; }
      setStep(1); return;
    }
    if (step === 1) {
      if (\!name.trim() || \!uname.trim()) { setErr("Rellena nombre y username."); return; }
      setStep(2); return;
    }
    setBusy(true);
    const { data: authData, error: authErr } = await sb.auth.signUp({ email, password: pass });
    if (authErr) { setErr(authErr.message); setBusy(false); return; }
    if (\!authData.user) { setErr("Error inesperado al crear cuenta."); setBusy(false); return; }

    const { error: profErr } = await sb.from("users").insert({
      id:       authData.user.id,
      email:    email.toLowerCase().trim(),
      username: uname.replace("@","").toLowerCase().trim(),
      name:     name.trim(),
      avatar,
      role:     "user",
    });

    if (profErr && \!profErr.message.includes("duplicate")) {
      setErr(profErr.message); setBusy(false); return;
    }

    const { data: loginData, error: loginErr } = await sb.auth.signInWithPassword({ email, password: pass });
    setBusy(false);
    if (loginErr) { setInfo("Cuenta creada. Inicia sesión."); setMode("login"); return; }
    onAuth(loginData.user);
  }

  if (mode === "login") return (
    <div className="page">
      <div className="logo">Po<span>d</span>ium</div>
      <div className="tagline">Compite con tus amigos. Mejora cada día.</div>
      {bootError && <div className="err">⚠️ {bootError}</div>}
      {err  && <div className="err">{err}</div>}
      {info && <div className="ok">{info}</div>}
      <label className="lbl">Email</label>
      <input className="inp" type="email" placeholder="tu@email.com"
        value={email} onChange={e => setEmail(e.target.value)}
        onKeyDown={e => e.key === "Enter" && login()} />
      <label className="lbl">Contraseña</label>
      <input className="inp" type="password" placeholder="••••••••"
        value={pass} onChange={e => setPass(e.target.value)}
        onKeyDown={e => e.key === "Enter" && login()} />
      <button className="btn" disabled={\!email || \!pass || busy} onClick={login}>
        {busy ? "Entrando..." : "Entrar →"}
      </button>
      <div className="switch">
        ¿Sin cuenta? <span onClick={() => { setMode("register"); setStep(0); clearMsgs(); }}>Regístrate</span>
      </div>
    </div>
  );

  return (
    <div className="page">
      <div className="logo">Po<span>d</span>ium</div>
      <div className="tagline">{["Crea tu cuenta","Tu perfil","Tu avatar"][step]}</div>
      <div className="prog">
        {[0,1,2].map(i => (
          <div key={i} className="prog-dot" style={{ background: i <= step ? "var(--amber)" : "var(--s3)" }} />
        ))}
      </div>
      {err  && <div className="err">{err}</div>}
      {info && <div className="ok">{info}</div>}

      {step === 0 && <>
        <label className="lbl">Email</label>
        <input className="inp" type="email" placeholder="tu@email.com"
          value={email} onChange={e => setEmail(e.target.value)} />
        <label className="lbl">Contraseña (mín. 8 caracteres)</label>
        <input className="inp" type="password" placeholder="••••••••"
          value={pass} onChange={e => setPass(e.target.value)} />
      </>}

      {step === 1 && <>
        <label className="lbl">Nombre</label>
        <input className="inp" placeholder="Tu nombre"
          value={name} onChange={e => setName(e.target.value)} />
        <label className="lbl">@Username</label>
        <input className="inp" placeholder="@tunombre"
          value={uname} onChange={e => setUN(e.target.value)} />
      </>}

      {step === 2 && <>
        <label className="lbl">Elige tu avatar</label>
        <div className="avi-grid">
          {AVATARS.map(a => (
            <div key={a} className={`avi-opt${avatar === a ? " sel" : ""}`}
              onClick={() => setAvatar(a)}>{a}</div>
          ))}
        </div>
      </>}

      <button className="btn"
        disabled={busy || (step===0 && (\!email||\!pass)) || (step===1 && (\!name||\!uname))}
        onClick={register}>
        {busy ? "Creando..." : step < 2 ? "Siguiente →" : "¡Empezar\!"}
      </button>
      <div className="switch" style={{ marginTop:8 }}>
        {step > 0
          ? <span onClick={() => { setStep(s => s-1); clearMsgs(); }}>← Atrás</span>
          : <>¿Ya tienes cuenta? <span onClick={() => { setMode("login"); clearMsgs(); }}>Entra aquí</span></>
        }
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   JOIN / CREATE GROUP
══════════════════════════════════════════ */
function JoinScreen({ userId, onJoin }: { userId: string; onJoin: (g: any) => void }) {
  const [code, setCode]   = useState("");
  const [gname, setGname] = useState("");
  const [creating, setC]  = useState(false);
  const [err, setErr]     = useState("");
  const [busy, setBusy]   = useState(false);

  async function join() {
    if (code.length < 4) return;
    setBusy(true); setErr("");
    const { data: group, error } = await sb.from("groups")
      .select("*").eq("invite_code", code.toUpperCase().trim()).maybeSingle();
    if (error || \!group) { setErr("Código no encontrado."); setBusy(false); return; }
    const { error: mErr } = await sb.from("group_members")
      .insert({ group_id: group.id, user_id: userId });
    if (mErr && \!mErr.message.includes("duplicate")) { setErr(mErr.message); setBusy(false); return; }
    onJoin(group);
  }

  async function create() {
    if (\!gname.trim()) return;
    setBusy(true); setErr("");
    const { data: group, error } = await sb.from("groups").insert({
      name: gname.trim(), created_by: userId,
      emoji: "🏆", color: "#F0A832", season_weeks: 8,
    }).select().single();
    if (error) { setErr(error.message); setBusy(false); return; }
    await sb.from("group_members").insert({ group_id: group.id, user_id: userId });
    onJoin(group);
  }

  return (
    <div className="page">
      <div className="logo">Po<span>d</span>ium</div>
      <div className="tagline">Únete a un grupo o crea uno nuevo.</div>
      {err && <div className="err">{err}</div>}
      <label className="lbl">Código de invitación</label>
      <input className="code-inp" placeholder="ABC123" maxLength={6}
        value={code} onChange={e => setCode(e.target.value.toUpperCase())}
        onKeyDown={e => e.key === "Enter" && join()} />
      <button className="btn" disabled={code.length < 4 || busy} onClick={join}>
        {busy ? "Buscando..." : "Unirme →"}
      </button>
      <div className="div"><div className="div-line"/><div className="div-txt">o</div><div className="div-line"/></div>
      {\!creating
        ? <button className="btn-ghost" onClick={() => setC(true)}>⚡ Crear un Podium nuevo</button>
        : <>
            <label className="lbl">Nombre del grupo</label>
            <input className="inp" placeholder="Ej: Panas del gym"
              value={gname} onChange={e => setGname(e.target.value)}
              onKeyDown={e => e.key === "Enter" && create()} />
            <button className="btn" disabled={\!gname.trim() || busy} onClick={create}>
              {busy ? "Creando..." : "Crear Podium →"}
            </button>
            <button className="btn-ghost" onClick={() => setC(false)}>← Volver</button>
          </>
      }
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════ */
function MainApp({ user, profile, group, onSignOut }: {
  user: any; profile: any; group: any; onSignOut: () => void;
}) {
  const [tab, setTab]       = useState("hoy");
  const [done, setDone]     = useState<Record<string,boolean>>({});
  const [saved, setSaved]   = useState(false);
  const [saving, setSaving] = useState(false);
  const [ranking, setRanking] = useState<any[]>([]);
  const [streak, setStreak]   = useState(0);
  const [loadingRank, setLR]  = useState(false);
  const [modal, setModal]     = useState<string|null>(null);
  const [bets, setBets]       = useState<Bet[]>(BETS_INIT);
  const [betsTab, setBT]      = useState<"activas"|"historial">("activas");

  const pts        = calcPts(done);
  const anyDone    = Object.values(done).some(Boolean);
  const isAdmin    = profile?.role === "admin";
  const myRow      = ranking.find(r => r.user_id === user.id);
  const myPos      = ranking.findIndex(r => r.user_id === user.id) + 1;

  useEffect(() => {
    loadToday();
    loadRanking();
    loadStreak();
  }, []);

  async function loadToday() {
    const { data } = await sb.from("daily_logs")
      .select("*").eq("user_id", user.id)
      .eq("group_id", group.id).eq("date", todayStr()).maybeSingle();
    if (\!data) return;
    setSaved(true);
    const d: Record<string,boolean> = {};
    QUESTIONS.forEach(q => { if (data[q.id]) d[q.id] = true; });
    setDone(d);
  }

  async function loadRanking() {
    setLR(true);
    const { data } = await sb.from("group_ranking")
      .select("*").eq("group_id", group.id)
      .order("total_pts", { ascending: false });
    setRanking(data || []);
    setLR(false);
  }

  async function loadStreak() {
    const { data } = await sb.from("daily_logs")
      .select("date").eq("user_id", user.id)
      .eq("group_id", group.id)
      .order("date", { ascending: false }).limit(60);
    if (\!data?.length) return;
    let s = 0;
    const today = new Date(); today.setHours(0,0,0,0);
    const dates = data.map(r => { const d = new Date(r.date); d.setHours(0,0,0,0); return d.getTime(); });
    for (let i = 0; i < 60; i++) {
      const exp = new Date(today); exp.setDate(today.getDate() - i);
      if (dates.includes(exp.getTime())) s++;
      else break;
    }
    setStreak(s);
  }

  async function saveDay() {
    if (\!anyDone || saved || saving) return;
    setSaving(true);
    const payload: any = { user_id: user.id, group_id: group.id, date: todayStr(), total_pts: pts };
    QUESTIONS.forEach(q => { payload[q.id] = \!\!done[q.id]; });
    const { error } = await sb.from("daily_logs")
      .upsert(payload, { onConflict: "user_id,group_id,date" });
    setSaving(false);
    if (error) { alert("Error: " + error.message); return; }
    setSaved(true);
    loadRanking();
    loadStreak();
  }

  function toggle(id: string) {
    if (saved || saving) return;
    setDone(d => ({ ...d, [id]: \!d[id] }));
  }

  function closeBet(betId: number, winner: 1 | 2) {
    setBets(bs => bs.map(b => b.id === betId ? { ...b, status: "won", myPick: winner } : b));
  }

  function cancelBet(betId: number) {
    setBets(bs => bs.map(b => b.id === betId ? { ...b, status: "cancelled" } : b));
  }

  const top3 = ranking.slice(0, 3);
  const rest  = ranking.slice(3);

  return (
    <div className="app">
      <div className="tb">
        <div className="tb-logo">Po<span>d</span>ium</div>
        <div className="tb-r">
          <div className="gchip">
            <div className="gdot" style={{ background: group.color || "var(--amber)" }} />
            <span className="gname">{group.emoji} {group.name}</span>
          </div>
          <button className="avi-btn"
            style={{ background: group.color || "var(--amber)" }}
            onClick={() => setModal("profile")}>
            {profile?.avatar || "🐺"}
          </button>
        </div>
      </div>

      {tab === "hoy" && (
        <div className="content" key="hoy">
          <div className="hero">
            <div className="hero-top">
              <div>
                <div style={{fontSize:11,color:"var(--muted)",letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>
                  {new Date().toLocaleDateString("es-ES",{weekday:"long",day:"numeric",month:"long"})}
                </div>
                <div className="hero-pts">{Math.max(0, pts)}</div>
                <div className="hero-lbl">puntos de hoy</div>
              </div>
              {streak > 0 && <div className="streak">🔥 {streak} días</div>}
            </div>
            {anyDone && (
              <div className="chips">
                {Object.keys(done).filter(k => done[k]).map(k => {
                  const q = QUESTIONS.find(q => q.id === k);
                  return q ? <div key={k} className="chip">{q.icon} {q.name}</div> : null;
                })}
              </div>
            )}
          </div>

          {saved && <div className="saved-ok">✓ Día guardado — {calcPts(done)} pts en el ranking</div>}

          <span className="section-lbl">¿Qué has hecho hoy?</span>
          <div className="q-grid">
            {QUESTIONS.map(q => (
              <div key={q.id}
                className={`qi${done[q.id] ? " on" : ""}${saved ? " locked" : ""}`}
                onClick={() => toggle(q.id)}>
                <div className="qi-icon">{q.icon}</div>
                <div className="qi-name">{q.name}</div>
                <div className="qi-pts">+{q.pts} pts</div>
                <div className="qi-chk">{done[q.id] ? "✓" : ""}</div>
              </div>
            ))}
          </div>

          <button className="btn" disabled={\!anyDone || saved || saving} onClick={saveDay}>
            {saving ? "Guardando..." : saved ? "✓ Guardado" : `Guardar · +${Math.max(0,pts)} pts`}
          </button>

          <div className="invite">
            <div style={{fontSize:11,color:"var(--muted)",letterSpacing:1,textTransform:"uppercase"}}>Código de invitación</div>
            <div className="invite-code">{group.invite_code}</div>
            <div className="invite-sub">Comparte con tus amigos</div>
          </div>
        </div>
      )}

      {tab === "rank" && (
        <div className="content" key="rank">
          <div className="rank-hero">
            <div className="rh-top">
              <span className="rh-lbl">{group.emoji} {group.name}</span>
              <button className="rh-btn" onClick={loadRanking}>{loadingRank ? "..." : "↻ actualizar"}</button>
            </div>
            {loadingRank && <div style={{textAlign:"center",padding:20}}><div className="spin" style={{margin:"0 auto"}}/></div>}
            {\!loadingRank && ranking.length === 0 && (
              <div className="empty">Nadie ha registrado actividad todavía.<br/>¡Guarda tu primer día\!</div>
            )}
            {\!loadingRank && top3.length > 0 && (
              <div className="podium-row">
                {top3[1] && <div className="pc">
                  <div className="pavi p2">{top3[1].avatar||"🐺"}</div>
                  <div className="pname">{top3[1].name}</div>
                  <div className="ppts">{top3[1].total_pts} pts</div>
                  <div className="pblk p2"><span className="pnum p2">2</span></div>
                </div>}
                <div className="pc">
                  <div style={{fontSize:11,color:"var(--amber)",textAlign:"center",marginBottom:3}}>👑</div>
                  <div className="pavi p1">{top3[0].avatar||"🐺"}</div>
                  <div className="pname">{top3[0].name}</div>
                  <div className="ppts">{top3[0].total_pts} pts</div>
                  <div className="pblk p1"><span className="pnum p1">1</span></div>
                </div>
                {top3[2] && <div className="pc">
                  <div className="pavi p3">{top3[2].avatar||"🐺"}</div>
                  <div className="pname">{top3[2].name}</div>
                  <div className="ppts">{top3[2].total_pts} pts</div>
                  <div className="pblk p3"><span className="pnum p3">3</span></div>
                </div>}
              </div>
            )}
          </div>
          {rest.length > 0 && (
            <div className="rank-list">
              {rest.map((p, i) => (
                <div key={p.user_id} className={`rrow${p.user_id === user.id ? " me" : ""}`}>
                  <div className="rn">{i+4}</div>
                  <div className="ravi">{p.avatar||"🐺"}</div>
                  <div className="rinfo">
                    <div className="rname">{p.name}{p.user_id===user.id?" · Tú":""}</div>
                    <div className="rdetail">{p.days_logged} días</div>
                  </div>
                  <div className="rright"><div className="rpts">{p.total_pts}</div></div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "bets" && (
        <div className="content" key="bets">
          <div className="bets-tabs">
            {([["activas","⚔️ Activas"],["historial","📋 Historial"]] as ["activas"|"historial", string][]).map(([v,l]) => (
              <div key={v} className={`btab${betsTab===v?" on":""}`} onClick={() => setBT(v)}>{l}</div>
            ))}
          </div>
          {(betsTab==="activas" ? bets.filter(b=>b.status==="open") : bets.filter(b=>b.status\!=="open")).map(b => {
            const s = b.status;
            return (
              <div key={b.id} className={`bet-card ${s\!=="open"?s:""}`}>
                <div className="bet-header">
                  <span className="bet-type-lbl">{b.label}</span>
                  <span className={`bet-pot ${s==="open"?"open":s}`}>
                    {s==="won"?"✓ Ganaste ":s==="lost"?"✗ Perdiste ":s==="cancelled"?"✗ Anulada ":""}⚡{b.pot} pts
                  </span>
                </div>
                <div className="bet-vs">
                  <div className="bet-player">
                    <div className="bet-avi">{b.p1Avi}</div>
                    <div className="bet-pname">{b.p1Name}</div>
                    <div className="bet-pstat">{b.p1Pts} pts</div>
                  </div>
                  <div className="bet-vs-lbl">VS</div>
                  <div className="bet-player">
                    <div className="bet-avi">{b.p2Avi}</div>
                    <div className="bet-pname">{b.p2Name}</div>
                    <div className="bet-pstat">{b.p2Pts} pts</div>
                  </div>
                </div>
                {s==="open" && \!b.myPick && (
                  <div className="bet-actions">
                    <button className="bet-btn" onClick={() => setBets(bs => bs.map(x => x.id===b.id ? {...x, myPick:1} : x))}>Por {b.p1Name}</button>
                    <button className="bet-btn" onClick={() => setBets(bs => bs.map(x => x.id===b.id ? {...x, myPick:2} : x))}>Por {b.p2Name}</button>
                  </div>
                )}
                {b.myPick && s==="open" && (
                  <div className="my-pick">✓ Apostaste por <b style={{marginLeft:4}}>{b.myPick===1?b.p1Name:b.p2Name}</b></div>
                )}
                {s\!=="open" && b.myPick && (
                  <div className="my-pick">Tu apuesta: <b style={{marginLeft:4}}>{b.myPick===1?b.p1Name:b.p2Name}</b></div>
                )}
                {s==="open" && <div className="bet-timer">⏱ {b.ends}</div>}
                {isAdmin && s==="open" && (
                  <div style={{marginTop:10,paddingTop:10,borderTop:"1px solid var(--border)"}}>
                    <div style={{fontSize:10,color:"var(--amber)",letterSpacing:1.5,textTransform:"uppercase",marginBottom:6}}>⚙️ Admin</div>
                    <div style={{display:"flex",gap:6}}>
                      <button className="bet-btn" style={{fontSize:11,borderColor:"rgba(93,201,138,.3)",color:"var(--green)"}} onClick={() => closeBet(b.id, 1)}>✓ Gana {b.p1Name}</button>
                      <button className="bet-btn" style={{fontSize:11,borderColor:"rgba(93,201,138,.3)",color:"var(--green)"}} onClick={() => closeBet(b.id, 2)}>✓ Gana {b.p2Name}</button>
                      <button className="bet-btn" style={{fontSize:11,borderColor:"rgba(255,68,68,.3)",color:"var(--red)"}} onClick={() => cancelBet(b.id)}>✗ Anular</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {(betsTab==="activas" ? bets.filter(b=>b.status==="open") : bets.filter(b=>b.status\!=="open")).length === 0 && (
            <div className="empty">{betsTab==="activas" ? "No hay apuestas activas." : "No hay historial todavía."}</div>
          )}
          <button className="new-bet-btn">⚔️ Crear nueva apuesta</button>
        </div>
      )}

      {tab === "perfil" && (
        <div className="content" key="perfil">
          <div className="prof-card">
            <div className="prof-top">
              <div className="prof-avi">{profile?.avatar||"🐺"}</div>
              <div style={{flex:1}}>
                <div className="prof-name">{profile?.name}</div>
                <div className="prof-handle">@{profile?.username}</div>
                {isAdmin && <div className="admin-badge">⚙️ Admin</div>}
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:30,fontWeight:900,color:"var(--amber)",lineHeight:1}}>{myPos||"—"}</div>
                <div style={{fontSize:10,color:"var(--muted)",letterSpacing:1,textTransform:"uppercase"}}>posición</div>
              </div>
            </div>
          </div>
          <div className="stats-row">
            <div className="stat"><div className="stat-val">🔥{streak}</div><div className="stat-lbl">Racha</div></div>
            <div className="stat"><div className="stat-val">{myRow?.days_logged||0}</div><div className="stat-lbl">Días</div></div>
            <div className="stat"><div className="stat-val" style={{color:"var(--amber)"}}>{myRow?.total_pts||0}</div><div className="stat-lbl">Pts</div></div>
          </div>
          <div className="invite">
            <div style={{fontSize:11,color:"var(--muted)",letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>Código — {group.name}</div>
            <div className="invite-code">{group.invite_code}</div>
            <div className="invite-sub">Invita a tus amigos</div>
          </div>
          <button className="btn-danger" onClick={onSignOut}>Cerrar sesión</button>
        </div>
      )}

      <nav className="nav">
        {([["hoy","➕","Hoy"],["rank","🏆","Ranking"],["bets","⚔️","Apuestas"],["perfil","👤","Perfil"]] as [string,string,string][]).map(([id,icon,label]) => (
          <button key={id} className={`nb${tab===id?" on":""}`} onClick={() => setTab(id)}>
            <span className="nbi">{icon}</span>
            <span className="nbl">{label}</span>
            {tab===id && <div className="nbp"/>}
          </button>
        ))}
      </nav>

      {modal === "profile" && (
        <div className="overlay" onClick={() => setModal(null)}>
          <div className="sheet" onClick={e => e.stopPropagation()}>
            <div className="handle"/>
            <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:20}}>
              <div style={{width:60,height:60,background:"var(--amber)",borderRadius:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30}}>
                {profile?.avatar||"🐺"}
              </div>
              <div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:900,color:"var(--text)"}}>{profile?.name}</div>
                <div style={{fontSize:11,color:"var(--muted)",marginTop:3}}>@{profile?.username}</div>
                {isAdmin && <div className="admin-badge">⚙️ Admin</div>}
              </div>
            </div>
            <div className="stats-row" style={{marginBottom:16}}>
              <div className="stat"><div className="stat-val">🔥{streak}</div><div className="stat-lbl">Racha</div></div>
              <div className="stat"><div className="stat-val">{myRow?.days_logged||0}</div><div className="stat-lbl">Días</div></div>
              <div className="stat"><div className="stat-val" style={{color:"var(--amber)"}}>{myRow?.total_pts||0}</div><div className="stat-lbl">Pts</div></div>
            </div>
            <button className="btn-danger" onClick={() => { setModal(null); onSignOut(); }}>Cerrar sesión</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   ROOT
══════════════════════════════════════════ */
type Phase = "loading"|"auth"|"join"|"app";

export default function Root() {
  const [phase, setPhase]     = useState<Phase>("loading");
  const [authUser, setAuthUser] = useState<any>(null);
  const [profile, setProfile]   = useState<any>(null);
  const [group, setGroup]       = useState<any>(null);
  const [bootError, setBootError] = useState<string>("");

  useEffect(() => {
    console.log("[Podium] Root mount: checking existing session");
    sb.auth.getSession().then(({ data: { session } }) => {
      console.log("[Podium] getSession:", { hasSession: \!\!session, userId: session?.user?.id });
      if (session?.user) {
        loadUserData(session.user);
      } else {
        setPhase("auth");
      }
    });
    const { data: { subscription } } = sb.auth.onAuthStateChange((event) => {
      console.log("[Podium] onAuthStateChange:", event);
      if (event === "SIGNED_OUT") {
        setAuthUser(null); setProfile(null); setGroup(null);
        setPhase("auth");
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  async function loadUserData(user: any) {
    try {
      const { data: prof, error: profErr } = await sb.from("users")
        .select("*").eq("id", user.id).maybeSingle();
      if (profErr) {
        const msg =
          profErr.message.includes("permission") || profErr.code === "42501"
            ? "No tengo permisos para leer tu perfil (RLS). Ejecuta el SQL de arreglo en Supabase. Detalle: " + profErr.message
            : "Error cargando perfil: " + profErr.message;
        setBootError(msg);
        setAuthUser(null); setProfile(null); setGroup(null);
        await sb.auth.signOut();
        setPhase("auth");
        return;
      }
      setAuthUser(user);
      if (\!prof) {
        setBootError("Login OK pero no encuentro tu fila en la tabla users. Probable causa: RLS activado sin policies en la tabla 'users'. Abre Supabase → SQL Editor y ejecuta el script de arreglo.");
        await sb.auth.signOut();
        setPhase("auth");
        return;
      }
      setProfile(prof);
      const { data: membership, error: memErr } = await sb.from("group_members")
        .select("group_id, groups(*)")
        .eq("user_id", user.id)
        .limit(1)
        .maybeSingle();
      if (memErr) {
        setBootError("Error cargando grupo: " + memErr.message);
        setPhase("join");
        return;
      }
      if (membership?.groups) {
        setGroup(membership.groups);
        setPhase("app");
      } else {
        setPhase("join");
      }
    } catch (e: any) {
      console.error("[Podium] loadUserData unexpected error:", e);
      setBootError("Error inesperado: " + (e?.message || String(e)));
      await sb.auth.signOut();
      setPhase("auth");
    }
  }

  async function handleAuth(user: any) {
    setBootError("");
    setPhase("loading");
    await loadUserData(user);
  }

  async function handleJoin(g: any) {
    setGroup(g);
    setPhase("app");
  }

  async function handleSignOut() {
    await sb.auth.signOut();
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        {phase === "loading" && <Loading text="Iniciando Podium..." />}
        {phase === "auth"    && <AuthScreen onAuth={handleAuth} bootError={bootError} />}
        {phase === "join"    && authUser && <JoinScreen userId={authUser.id} onJoin={handleJoin} />}
        {phase === "app"     && authUser && profile && group &&
          <MainApp user={authUser} profile={profile} group={group} onSignOut={handleSignOut} />
        }
      </div>
    </>
  );
}
