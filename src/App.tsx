import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const sb = createClient(
  "https://lrnmvdmlrdhpzgwjbeoc.supabase.co",
  "sb_publishable_L4MpfGLZhQ2ogLzKD0k6Rg_OByoRiQj"
);

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;font-family:'DM Sans',sans-serif}
html,body{background:#0E0A07;height:100%;color:var(--text)}
:root{
  --bg:#0E0A07;--s1:#161109;--s2:#1E180B;--s3:#2A220F;--s4:#352B14;
  --border:rgba(240,190,80,.1);--amber:#F0A832;--coral:#E8623A;
  --green:#5DC98A;--rose:#E87B9E;--blue:#6EB5FF;--red:#FF4444;
  --text:#F5EDD8;--muted:#7A6A4A;--muted2:#3A2E18;
}
.app{max-width:430px;margin:0 auto;min-height:100vh;background:var(--bg);overflow-x:hidden;color:var(--text)}
.page{min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:40px 28px;color:var(--text)}
.logo{font-family:'Playfair Display',serif;font-size:42px;font-weight:900;color:var(--text);margin-bottom:6px}
.logo span{color:var(--amber)}
.tagline{font-size:14px;color:var(--muted);margin-bottom:36px;line-height:1.5}
.lbl{display:block;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);font-weight:500;margin-bottom:6px}
.inp{width:100%;background:var(--s2);border:1px solid var(--border);border-radius:13px;padding:14px 16px;font-size:15px;color:var(--text);font-family:'DM Sans',sans-serif;outline:none;transition:border-color .2s;margin-bottom:14px}
.inp:focus{border-color:rgba(240,168,50,.5)}
.inp::placeholder{color:var(--muted)}
.btn{width:100%;background:var(--amber);color:#0E0A07;border:none;border-radius:13px;padding:15px;font-size:15px;font-weight:700;cursor:pointer;margin-bottom:12px;font-family:'DM Sans',sans-serif}
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
.loading{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;gap:16px}
.spin{width:32px;height:32px;border:3px solid var(--s3);border-top-color:var(--amber);border-radius:50%;animation:spin .8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.loading-txt{font-size:13px;color:var(--muted)}
.tb{padding:calc(env(safe-area-inset-top,0px) + 12px) 18px 0;display:flex;justify-content:space-between;align-items:center}
.tb-logo{font-family:'Playfair Display',serif;font-size:22px;font-weight:900;color:var(--text)}
.tb-logo span{color:var(--amber)}
.tb-r{display:flex;align-items:center;gap:7px}
.gchip{display:flex;align-items:center;gap:6px;background:var(--s2);border:1px solid var(--border);border-radius:20px;padding:5px 11px}
.gdot{width:7px;height:7px;border-radius:50%}
.gname{font-size:11px;font-weight:600;color:var(--text)}
.avi-btn{width:32px;height:32px;border-radius:9px;border:none;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center}
.content{padding:14px 18px 88px;animation:up .22s ease both}
.content-fab{padding-bottom:138px}
.logros-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:4px}
.logro-card{border-radius:14px;padding:12px 10px;text-align:center;animation:up .3s ease}
.logro-weekly{background:rgba(240,168,50,.08);border:1px solid rgba(240,168,50,.4)}
.logro-milestone{background:rgba(93,201,138,.07);border:1px solid rgba(93,201,138,.35)}
.logro-ico{font-size:26px;margin-bottom:5px;line-height:1}
.logro-title{font-size:12px;font-weight:800;color:var(--text);margin-bottom:2px;line-height:1.2}
.logro-desc{font-size:10px;color:var(--muted);line-height:1.35}
.logro-none{font-size:12px;color:var(--muted);text-align:center;padding:14px 0;font-style:italic}
.ambito-bar-wrap{margin-bottom:10px}
.ambito-bar-track{height:6px;border-radius:3px;background:var(--s3);overflow:hidden;margin-top:4px}
.ambito-bar-fill{height:100%;border-radius:3px;transition:width .5s ease}
.badge-chip{display:flex;align-items:center;gap:10px;background:var(--s1);border:1px solid var(--border);border-radius:12px;padding:10px 12px;margin-bottom:6px}
.badge-chip-ico{font-size:22px;flex-shrink:0}
.badge-chip-body{flex:1}
.badge-chip-title{font-size:13px;font-weight:800;color:var(--text)}
.badge-chip-sub{font-size:11px;color:var(--muted);margin-top:1px}
.last7-row{display:flex;gap:3px;margin-bottom:14px}
.last7-cell{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px}
.last7-bar{width:100%;border-radius:4px;background:var(--s3);display:flex;align-items:flex-end;justify-content:center;min-height:28px;position:relative}
.last7-pts{font-size:9px;font-weight:700;color:var(--amber);position:absolute;bottom:3px}
.last7-lbl{font-size:9px;color:var(--muted);letter-spacing:.5px}
@keyframes up{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.section-lbl{display:block;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--muted);font-weight:500;margin-bottom:9px}
.card{background:var(--s1);border:1px solid var(--border);border-radius:16px;padding:15px;margin-bottom:10px}
.nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;background:rgba(14,10,7,.96);backdrop-filter:blur(20px);border-top:1px solid var(--border);display:grid;grid-template-columns:repeat(4,1fr);padding:9px 0 calc(env(safe-area-inset-bottom,0px) + 9px);z-index:100}
.fab-wrap{position:fixed;bottom:calc(env(safe-area-inset-bottom,0px) + 68px);left:50%;transform:translateX(-50%);width:100%;max-width:430px;display:flex;justify-content:center;pointer-events:none;z-index:99}
.fab{pointer-events:all;display:flex;align-items:center;gap:8px;background:var(--amber);color:#0E0A07;border:none;border-radius:28px;padding:14px 32px;font-size:14px;font-weight:800;letter-spacing:.4px;cursor:pointer;box-shadow:0 4px 24px rgba(240,168,50,.5);transition:transform .15s,box-shadow .15s;animation:up .25s ease}
.fab:active{transform:scale(.95);box-shadow:0 2px 10px rgba(240,168,50,.3)}
.fab-done{background:var(--s2);color:var(--muted);box-shadow:none;border:1px solid var(--border);cursor:default}
.fab-bets{background:linear-gradient(135deg,#6C4DFF 0%,#9B5DFF 100%);color:#fff;box-shadow:0 4px 24px rgba(108,77,255,.45)}
.nb{background:none;border:none;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:3px;padding:5px 0}
.nbi{font-size:19px;transition:transform .2s}
.nbl{font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);font-weight:600}
.nb.on .nbl{color:var(--amber)}
.nb.on .nbi{transform:scale(1.1)}
.nbp{width:4px;height:4px;border-radius:50%;background:var(--amber);margin:0 auto}
.qi{background:var(--s1);border:1px solid var(--border);border-radius:14px;padding:12px;cursor:pointer;transition:all .15s;display:flex;flex-direction:column;align-items:center;gap:5px;text-align:center;user-select:none}
.qi.on{border-color:rgba(240,168,50,.5);background:rgba(240,168,50,.05)}
.qi.locked{opacity:.6;cursor:default}
.qi-icon{font-size:22px}
.qi-name{font-size:11px;font-weight:600;color:var(--text);line-height:1.2}
.qi-pts{font-size:11px;color:var(--muted)}
.qi.on .qi-pts{color:var(--amber)}
.qi-chk{width:16px;height:16px;border-radius:50%;border:1.5px solid var(--muted2);display:flex;align-items:center;justify-content:center;font-size:9px;transition:all .15s}
.qi.on .qi-chk{background:var(--amber);border-color:var(--amber);color:#000}
.q-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px}
.rank-hero{background:linear-gradient(160deg,#1E1608,#120E04);border:1px solid rgba(240,168,50,.15);border-radius:20px;padding:18px;margin-bottom:14px}
.rh-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
.rh-lbl{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--muted)}
.rh-btn{font-size:12px;color:var(--amber);font-weight:600;cursor:pointer;background:none;border:none;font-family:'DM Sans',sans-serif}
.podium-row{display:flex;align-items:flex-end;justify-content:center;gap:8px}
.pc{display:flex;flex-direction:column;align-items:center;gap:5px;cursor:pointer}
.pc:hover .pavi{opacity:.82}
.pavi{border-radius:14px;display:flex;align-items:center;justify-content:center;background:var(--s3);border:2px solid transparent;transition:opacity .15s}
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
.rrow{background:var(--s1);border:1px solid var(--border);border-radius:14px;padding:12px 14px;display:flex;align-items:center;gap:10px;cursor:pointer;transition:background .15s}
.rrow:hover{background:rgba(240,168,50,.04)}
.rrow.me{border-color:rgba(240,168,50,.3);background:rgba(240,168,50,.03)}
.rn{font-family:'Playfair Display',serif;font-size:16px;font-weight:700;color:var(--muted);width:22px;text-align:center}
.ravi{font-size:20px;width:28px;text-align:center}
.rinfo{flex:1;min-width:0}
.rname{font-size:13px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rdetail{font-size:11px;color:var(--muted);margin-top:2px}
.rright{text-align:right;flex-shrink:0}
.rpts{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:var(--text)}
.rr-penalty{font-size:10px;color:#F2667A;margin-left:6px}
.empty{text-align:center;padding:28px 20px;color:var(--muted);font-size:13px;line-height:1.7}
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
.invite{background:var(--s2);border:1px solid var(--border);border-radius:14px;padding:16px;margin-top:14px;text-align:center}
.invite-code{font-family:'Playfair Display',serif;font-size:32px;font-weight:900;color:var(--amber);letter-spacing:8px;margin:8px 0}
.invite-sub{font-size:12px;color:var(--muted)}
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.82);backdrop-filter:blur(14px);z-index:200;display:flex;align-items:flex-end;justify-content:center}
.sheet{background:var(--s1);border:1px solid var(--border);border-radius:26px 26px 0 0;width:100%;max-width:430px;padding:18px 18px calc(env(safe-area-inset-bottom,0px) + 28px);max-height:88vh;overflow-y:auto;color:var(--text)}
.sheet::-webkit-scrollbar{display:none}
.handle{width:34px;height:4px;background:var(--s3);border-radius:2px;margin:0 auto 18px}
.code-inp{width:100%;background:var(--s2);border:1px solid rgba(240,168,50,.3);border-radius:13px;padding:18px;font-size:28px;font-weight:700;color:var(--amber);font-family:'Playfair Display',serif;text-align:center;letter-spacing:8px;outline:none;margin-bottom:14px;text-transform:uppercase}
.code-inp::placeholder{color:var(--muted2);font-size:14px;letter-spacing:2px;font-family:'DM Sans',sans-serif;font-weight:400}
.div{display:flex;align-items:center;gap:12px;margin:4px 0 14px}
.div-line{flex:1;height:1px;background:var(--s3)}
.div-txt{font-size:12px;color:var(--muted)}
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
.bet-timer{font-size:11px;color:var(--muted);text-align:center}
.my-pick{background:rgba(240,168,50,.08);border-radius:10px;padding:8px;font-size:12px;color:var(--amber);text-align:center;margin-top:4px;display:flex;justify-content:center;align-items:center}
.new-bet-btn{width:100%;background:none;border:1px dashed var(--muted2);border-radius:14px;padding:14px;color:var(--muted);font-size:13px;font-weight:600;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:8px;font-family:'DM Sans',sans-serif}
.new-bet-btn:hover{border-color:var(--amber);color:var(--amber)}
.chat-wrap{display:flex;flex-direction:column;height:calc(100vh - 200px);padding-bottom:80px}
.chat-list{flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:10px;padding:8px 0}
.chat-empty{text-align:center;color:var(--muted);font-size:12px;padding:20px;font-style:italic}
.msg{display:flex;align-items:flex-end;gap:8px;max-width:85%}
.msg.me{align-self:flex-end;flex-direction:row-reverse}
.msg-avi{width:28px;height:28px;border-radius:50%;background:var(--s2);display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0}
.msg-body{display:flex;flex-direction:column;gap:3px;min-width:0}
.msg.me .msg-body{align-items:flex-end}
.msg-meta{font-size:10px;color:var(--muted);display:flex;gap:6px;padding:0 4px}
.msg-name{font-weight:600;color:var(--amber)}
.msg-bubble{background:var(--s2);border:1px solid var(--border);border-radius:14px;padding:8px 12px;font-size:13px;line-height:1.4;word-wrap:break-word;white-space:pre-wrap}
.msg.me .msg-bubble{background:rgba(240,168,50,.15);border-color:rgba(240,168,50,.3)}
.msg-photo{max-width:220px;max-height:280px;border-radius:12px;border:1px solid var(--border);display:block;cursor:pointer}
.chat-input-bar{position:fixed;bottom:60px;left:50%;transform:translateX(-50%);width:100%;max-width:430px;background:rgba(14,10,7,.96);backdrop-filter:blur(20px);border-top:1px solid var(--border);padding:10px 15px calc(env(safe-area-inset-bottom,0px) + 10px);display:flex;gap:8px;align-items:center;z-index:99}
.chat-input{flex:1;background:var(--s2);border:1px solid var(--border);border-radius:20px;padding:9px 14px;color:var(--text);font-family:'DM Sans',sans-serif;font-size:13px;outline:none}
.chat-input:focus{border-color:var(--amber)}
.chat-photo-btn{background:var(--s2);border:1px solid var(--border);border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:16px;flex-shrink:0}
.chat-send{background:var(--amber);color:#0E0A07;border:none;border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:15px;font-weight:700;flex-shrink:0}
.chat-send:disabled{opacity:.4;cursor:not-allowed}
.chat-sending{font-size:11px;color:var(--muted);text-align:center;padding:4px}
.disputes-btn{background:transparent;border:1px solid var(--border);border-radius:10px;padding:6px 11px;color:var(--text);font-size:11px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;display:inline-flex;align-items:center;gap:6px}
.disputes-btn:hover{border-color:var(--amber);color:var(--amber)}
.dispute-habit{background:var(--s2);border:1px solid var(--border);border-radius:10px;padding:10px 12px;margin-bottom:6px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:10px}
.dispute-habit:hover{border-color:var(--amber)}
.dispute-habit.sel{border-color:var(--amber);background:rgba(240,168,50,.08)}
.dispute-habit-info{display:flex;align-items:center;gap:10px}
.dispute-habit-icon{font-size:18px}
.dispute-habit-name{font-size:13px;font-weight:600}
.dispute-habit-pts{font-size:11px;color:var(--muted)}
.dispute-habit-penalty{font-size:10px;color:#F2667A}
.dispute-reason{width:100%;background:var(--s2);border:1px solid var(--border);border-radius:10px;padding:10px;color:var(--text);font-family:'DM Sans',sans-serif;font-size:12px;margin-top:6px;resize:vertical;min-height:60px}
.dispute-reason:focus{outline:none;border-color:var(--amber)}
.dispute-card{background:var(--s1);border:1px solid var(--border);border-radius:14px;padding:12px;margin-bottom:8px}
.dispute-card.failed{border-color:#F2667A;background:rgba(242,102,122,.05)}
.dispute-card.passed{border-color:#7BC97A;background:rgba(123,201,122,.05)}
.dispute-card-head{display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:6px}
.dispute-card-title{font-size:13px;font-weight:700}
.dispute-card-sub{font-size:11px;color:var(--muted);margin-top:2px}
.dispute-card-status{font-size:10px;letter-spacing:1px;text-transform:uppercase;padding:3px 8px;border-radius:8px;font-weight:700;white-space:nowrap}
.dcs-active{background:rgba(240,168,50,.15);color:var(--amber)}
.dcs-failed{background:rgba(242,102,122,.15);color:#F2667A}
.dcs-passed{background:rgba(123,201,122,.15);color:#7BC97A}
.dispute-reason-box{font-size:12px;color:var(--muted);background:var(--s2);border-radius:8px;padding:7px 10px;margin:4px 0 8px;font-style:italic}
.dispute-votes{display:flex;gap:8px;margin-top:8px}
.dispute-vote-btn{flex:1;padding:8px 10px;border-radius:10px;border:1px solid var(--border);background:transparent;color:var(--text);font-size:12px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;display:flex;align-items:center;justify-content:center;gap:6px}
.dispute-vote-btn.support{border-color:rgba(123,201,122,.4)}
.dispute-vote-btn.support.mine{background:rgba(123,201,122,.15);border-color:#7BC97A;color:#7BC97A}
.dispute-vote-btn.reject{border-color:rgba(242,102,122,.4)}
.dispute-vote-btn.reject.mine{background:rgba(242,102,122,.15);border-color:#F2667A;color:#F2667A}
.dispute-tally{display:flex;justify-content:space-between;font-size:11px;color:var(--muted);margin-top:8px;padding:0 2px}
.dispute-tally b{color:var(--text)}

.dispute-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px}
.dispute-grid-card{background:var(--s2);border:1.5px solid var(--border);border-radius:12px;padding:14px 10px 10px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;position:relative;transition:border-color .15s,background .15s}
.dispute-grid-card:hover{border-color:rgba(240,168,50,.5)}
.dispute-grid-card.sel{border-color:var(--amber);background:rgba(240,168,50,.08)}
.dispute-grid-radio{position:absolute;top:8px;right:8px;width:16px;height:16px;border-radius:50%;border:1.5px solid var(--border);background:var(--s3);transition:border-color .15s,background .15s}
.dispute-grid-card.sel .dispute-grid-radio{border-color:var(--amber);background:var(--amber)}
.dispute-grid-icon{font-size:24px;margin-bottom:2px}
.dispute-grid-name{font-size:11px;font-weight:700;text-align:center;color:var(--text)}
.dispute-grid-penalty{font-size:10px;color:#F2667A;text-align:center}
.records-section{margin-top:18px}
.records-cat{font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin:10px 0 6px;font-weight:700}
.records-row{display:flex;align-items:center;justify-content:space-between;background:var(--s2);border:1px solid var(--border);border-radius:10px;padding:10px 12px;margin-bottom:6px}
.records-label{font-size:12px;color:var(--text);font-weight:600}
.records-val{font-size:13px;font-weight:800;color:var(--amber);min-width:48px;text-align:right}
.records-input{background:var(--s3);border:1px solid var(--amber);border-radius:6px;color:var(--text);font-family:"DM Sans",sans-serif;font-size:13px;font-weight:700;text-align:right;width:72px;padding:3px 6px}
.records-input:focus{outline:none}
.records-edit-btn{font-size:11px;color:var(--amber);background:none;border:none;cursor:pointer;font-weight:700;padding:0;font-family:"DM Sans",sans-serif}

.dispute-empty{text-align:center;color:var(--muted);font-size:12px;padding:30px 10px;font-style:italic}
/* TODAY BANNER */
.today-banner{background:linear-gradient(135deg,#1E1608,#2A1E08);border:1px solid rgba(240,168,50,.2);border-radius:20px;padding:18px;margin-bottom:14px;position:relative;overflow:hidden}
.today-banner::before{content:'';position:absolute;top:-40px;right:-40px;width:140px;height:140px;border-radius:50%;background:radial-gradient(circle,rgba(240,168,50,.12),transparent 70%);pointer-events:none}
.hero-pts{font-family:'Playfair Display',serif;font-size:52px;font-weight:900;color:var(--text);line-height:1}
.hero-lbl{font-size:12px;color:var(--muted);margin-top:2px}
.streak{background:rgba(240,168,50,.15);border:1px solid rgba(240,168,50,.3);border-radius:20px;padding:5px 12px;font-size:13px;font-weight:600;color:var(--amber);white-space:nowrap}
.chips{display:flex;gap:6px;flex-wrap:wrap;margin-top:6px}
.chip{background:var(--s3);border-radius:20px;padding:3px 9px;font-size:11px;color:var(--text)}
.apuntar-btn{width:100%;background:var(--amber);color:#0E0A07;border:none;border-radius:13px;padding:14px;font-size:15px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;margin-top:12px;display:flex;align-items:center;justify-content:center;gap:7px}
.apuntar-btn.saved{background:rgba(93,201,138,.1);color:var(--green);border:1px solid rgba(93,201,138,.3);cursor:default;font-size:13px}
/* FEED */
.feed{display:flex;flex-direction:column;gap:10px;margin-top:14px}
.feed-card{background:var(--s1);border:1px solid var(--border);border-radius:16px;padding:14px}
.feed-card.streak-card{border-color:rgba(240,168,50,.3);background:linear-gradient(135deg,#1A1308,#221908)}
.feed-card.dispute-card-feed{border-color:rgba(242,102,122,.2)}
.feed-head{display:flex;align-items:center;gap:9px;margin-bottom:10px}
.feed-avi{width:36px;height:36px;background:var(--s2);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0}
.feed-name{font-size:13px;font-weight:600;color:var(--text);line-height:1.2}
.feed-when{font-size:10px;color:var(--muted);margin-top:1px}
.feed-pts-big{font-family:'Playfair Display',serif;font-size:30px;font-weight:900;color:var(--amber);line-height:1}
.feed-habits{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px}
.feed-habit-chip{background:var(--s2);border:1px solid var(--border);border-radius:8px;padding:3px 8px;font-size:11px;color:var(--text)}
.feed-streak-wrap{display:flex;align-items:center;gap:14px;padding:4px 0}
.feed-streak-num{font-family:'Playfair Display',serif;font-size:42px;font-weight:900;color:var(--amber);line-height:1}
.feed-streak-lbl{font-size:13px;color:var(--text);font-weight:600;line-height:1.4}
.feed-streak-sub{font-size:11px;color:var(--muted)}
.feed-bet-body{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:6px 0 10px}
.feed-bp{text-align:center;flex:1}
.feed-bp-avi{font-size:26px;margin-bottom:3px}
.feed-bp-name{font-size:12px;font-weight:600;color:var(--text)}
.feed-bp-pts{font-size:11px;color:var(--muted)}
.feed-vs{font-family:'Playfair Display',serif;font-size:14px;font-weight:700;color:var(--muted)}
.feed-empty{text-align:center;color:var(--muted);font-size:12px;padding:28px 10px;font-style:italic;line-height:1.7}
/* REACTIONS */
.reactions{display:flex;gap:5px;margin-top:10px;padding-top:10px;border-top:1px solid var(--border);flex-wrap:wrap;align-items:center}
.rx-btn{background:var(--s2);border:1px solid var(--border);border-radius:20px;padding:4px 8px;font-size:12px;cursor:pointer;display:inline-flex;align-items:center;gap:3px;transition:all .15s;color:var(--text);font-family:'DM Sans',sans-serif}
.rx-btn:hover{border-color:rgba(240,168,50,.4)}
.rx-btn.mine{background:rgba(240,168,50,.12);border-color:rgba(240,168,50,.45)}
.rx-count{font-size:11px;font-weight:600}
.rx-add{background:var(--s2);border:1px solid var(--border);border-radius:20px;width:28px;height:28px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:15px;color:var(--muted);transition:all .15s;flex-shrink:0}
.rx-add:hover{border-color:var(--amber);color:var(--amber)}
.rx-picker{display:flex;gap:6px;padding:4px 0;flex-wrap:wrap;align-items:center}
.rx-pick-btn{font-size:20px;cursor:pointer;padding:3px 5px;border-radius:8px;border:none;background:transparent;transition:transform .1s}
.rx-pick-btn:hover{transform:scale(1.25)}
/* PROFILE MODAL */
.pm-avi{width:68px;height:68px;background:var(--amber);border-radius:18px;display:flex;align-items:center;justify-content:center;font-size:32px;flex-shrink:0}
.pm-head{display:flex;gap:14px;align-items:flex-start;margin-bottom:16px}
.pm-name{font-family:'Playfair Display',serif;font-size:20px;font-weight:900;color:var(--text)}
.pm-sub{font-size:11px;color:var(--muted);margin-top:3px}
.pm-log-row{background:var(--s2);border-radius:10px;padding:8px 11px;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center}
.pm-log-date{font-size:10px;color:var(--muted);margin-bottom:3px;text-transform:uppercase;letter-spacing:.5px}
.pm-log-pts{font-family:'Playfair Display',serif;font-size:17px;font-weight:700;color:var(--amber)}

/* LOGO SVG */
.tb-logo{display:flex;align-items:center;gap:6px;cursor:default}
.tb-logo-word{font-family:'Playfair Display',serif;font-weight:900;font-style:italic;font-size:22px;color:var(--text)}
/* DAY GRID */
.day-grid{display:flex;gap:3px;margin-top:12px;margin-bottom:2px}
.day-cell{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px}
.day-cell-lbl{font-size:8px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;font-weight:600}
.day-cell-bar{width:100%;height:26px;border-radius:5px;background:var(--s2);border:1px solid var(--border);transition:all .2s}
.day-cell-bar.done{background:rgba(240,168,50,.55);border-color:rgba(240,168,50,.7)}
.day-cell-bar.today-empty{border-color:var(--amber);border-style:dashed}
/* BET STAKE */
.bet-sides{display:flex;gap:6px;margin:6px 0 8px}
.bet-side{flex:1;background:var(--s2);border:1px solid var(--border);border-radius:12px;padding:9px 6px;text-align:center;cursor:pointer;transition:all .15s}
.bet-side:hover{border-color:rgba(240,168,50,.4)}
.bet-side.sel{background:rgba(240,168,50,.1);border-color:var(--amber)}
.bet-side-avi{font-size:22px;margin-bottom:2px}
.bet-side-name{font-size:11px;font-weight:600;color:var(--text)}
.bet-side-pts{font-size:10px;color:var(--muted)}
.bet-pot-bar{height:4px;border-radius:2px;background:var(--s3);overflow:hidden;margin:6px 0 4px}
.bet-pot-fill{height:100%;background:var(--amber);border-radius:2px;transition:width .3s}
.bet-pot-labels{display:flex;justify-content:space-between;font-size:9px;color:var(--muted);margin-bottom:8px}
.bet-rules-lbl{font-size:9px;color:var(--muted);text-align:center;margin-bottom:6px;font-style:italic}
.stake-row{display:flex;align-items:center;gap:8px;margin-bottom:8px}
.stake-range{flex:1;accent-color:var(--amber);height:4px}
.stake-amt{font-size:14px;font-weight:700;color:var(--amber);min-width:20px;text-align:right}
.stake-actions{display:flex;gap:6px;margin-bottom:8px}
.stake-confirm{flex:1;background:var(--amber);color:#0E0A07;border:none;border-radius:10px;padding:9px;font-size:12px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif}
.stake-cancel{background:var(--s2);border:1px solid var(--border);border-radius:10px;padding:9px 12px;font-size:12px;color:var(--muted);cursor:pointer;font-family:'DM Sans',sans-serif}
.bet-locked{background:rgba(240,168,50,.08);border:1px solid rgba(240,168,50,.25);border-radius:10px;padding:8px 12px;display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;font-size:12px}
/* QUOTED EVENT */
.quoted-event{display:flex;align-items:center;gap:8px;background:var(--s2);border-radius:10px 10px 0 0;padding:8px 12px;margin-bottom:2px}
.qe-bar{width:3px;border-radius:2px;align-self:stretch;flex-shrink:0;min-height:20px}
.qe-text{flex:1;font-size:11px;color:var(--muted);min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.qe-close{background:none;border:none;color:var(--muted);font-size:16px;cursor:pointer;flex-shrink:0;line-height:1;padding:0}
/* CARD FOOTER */
.card-footer{display:flex;align-items:center;justify-content:space-between;margin-top:8px;padding-top:8px;border-top:1px solid var(--border)}
.chat-link-btn{background:none;border:none;color:var(--muted);font-size:11px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;display:flex;align-items:center;gap:4px;padding:2px 6px;border-radius:8px;transition:all .15s}
.chat-link-btn:hover{color:var(--text);background:var(--s2)}
/* BETS COUNTER IN TOPBAR */
.bets-chip{display:flex;align-items:center;gap:4px;background:rgba(240,168,50,.12);border:1px solid rgba(240,168,50,.3);border-radius:20px;padding:4px 10px;cursor:pointer;transition:all .15s}
.bets-chip:hover{background:rgba(240,168,50,.2)}
.bets-chip-ico{font-size:12px}
.bets-chip-n{font-size:11px;font-weight:700;color:var(--amber)}

`;


/* ══════════════════════════════════════════ CONSTANTS */
const AVATARS = ["🐺","🦁","🐻","🦊","🐯","🦅","🐬","🦋","🐉","🦈","🐆","🦉"];
const QUESTIONS = [
  { id:"gym",icon:"💪",name:"Gym / Fuerza",pts:10 },
  { id:"running",icon:"🏃",name:"Running",pts:8 },
  { id:"sport",icon:"🎾",name:"Deporte grupo",pts:6 },
  { id:"quedada",icon:"🍻",name:"Quedada amigos",pts:5 },
  { id:"familia",icon:"🏠",name:"Plan familiar",pts:4 },
  { id:"food",icon:"🥗",name:"Comida limpia",pts:4 },
  { id:"screen_good",icon:"📵",name:"Pantalla <2h",pts:4 },
  { id:"pareja",icon:"❤️",name:"Plan de pareja",pts:3 },
  { id:"book",icon:"📚",name:"Lectura 30min",pts:3 },
  { id:"course",icon:"📖",name:"Estudio/Curso",pts:4 },
  { id:"podcast",icon:"🎧",name:"Podcast educ.",pts:2 },
  { id:"meditation",icon:"😴",name:"Sueño +8h",pts:3 },
];
const AMBITOS=[
  {id:"deporte",label:"Deporte",icon:"💪",color:"#F0A832",habits:["gym","running","sport"]},
  {id:"social",label:"Social",icon:"🍻",color:"#F2667A",habits:["quedada","familia","pareja"]},
  {id:"salud",label:"Salud",icon:"🥗",color:"#5DC98A",habits:["food","screen_good","meditation"]},
  {id:"cultura",label:"Cultura",icon:"📚",color:"#5B8DEF",habits:["book","course","podcast"]},
];
const REACTION_EMOJIS = ["🐐","💪","💀","🏳️‍🌈","💅"];
const STREAK_MILESTONES = [3,7,14,21,30];

type Bet = { id:number;label:string;p1Name:string;p1Avi:string;p1Pts:number;p2Name:string;p2Avi:string;p2Pts:number;pot:number;ends:string;status:"open"|"won"|"lost"|"cancelled";myPick:1|2|null; };
const BETS_INIT: Bet[] = [
  { id:1,label:"Duelo semanal · Gym",p1Name:"Manu",p1Avi:"🐺",p1Pts:71,p2Name:"Emilio",p2Avi:"🦁",p2Pts:65,pot:8,ends:"2d 14h",status:"open",myPick:null },
  { id:2,label:"Apuesta de racha",p1Name:"Pedro",p1Avi:"🐙",p1Pts:62,p2Name:"Mario",p2Avi:"🐯",p2Pts:58,pot:3,ends:"domingo",status:"open",myPick:null },
  { id:3,label:"Duelo · Running",p1Name:"Manu",p1Avi:"🐺",p1Pts:71,p2Name:"Nacho",p2Avi:"🐬",p2Pts:47,pot:6,ends:"cerrada",status:"won",myPick:1 },
  { id:4,label:"Duelo · Sueño",p1Name:"Jaime",p1Avi:"🐻",p1Pts:60,p2Name:"Álvaro",p2Avi:"🦅",p2Pts:54,pot:4,ends:"cerrada",status:"lost",myPick:2 },
];

/* ══════════════════════════════════════════ TYPES */
type Dispute = { id:number;group_id:string;disputed_user:string;challenger:string;day:string;habit_id:string;reason:string|null;created_at:string; };
type DisputeVote = { dispute_id:number;voter_id:string;vote:"support"|"reject"; };
type DisputeStatus = "active"|"failed"|"passed";
type FeedReaction = { id:number;user_id:string;group_id:string;feed_type:string;feed_ref:string;emoji:string; };
type FeedLogItem = { type:"log";ref:string;user_id:string;date:string;habits:Array<{id:string;icon:string;name:string;pts:number}>;pts:number;created_at:string; };
type FeedStreakItem = { type:"streak";ref:string;user_id:string;streak:number;date:string;created_at:string; };
type FeedBetItem = { type:"bet_open"|"bet_won";ref:string;bet:Bet;created_at:string; };
type FeedDisputeItem = { type:"dispute";ref:string;dispute:Dispute;created_at:string; };
type FeedItem = FeedLogItem|FeedStreakItem|FeedBetItem|FeedDisputeItem;

/* ══════════════════════════════════════════ UTILS */
function todayStr(){ return new Date().toISOString().split("T")[0]; }
function yesterdayStr(){ const d=new Date();d.setDate(d.getDate()-1);return d.toISOString().split("T")[0]; }
function disputePenalty(habitId:string){ const q=QUESTIONS.find(x=>x.id===habitId);return q?Math.ceil(q.pts/2):0; }
function calcPts(done:Record<string,boolean>){ return QUESTIONS.reduce((s,q)=>done[q.id]?s+q.pts:s,0); }
function relTime(iso:string){ const m=Math.floor((Date.now()-new Date(iso).getTime())/60000);if(m<1)return"ahora";if(m<60)return`${m}m`;const h=Math.floor(m/60);if(h<24)return`${h}h`;return`${Math.floor(h/24)}d`; }
function getWeekNum(d=new Date()){const jan1=new Date(d.getFullYear(),0,1);return Math.ceil(((d.getTime()-jan1.getTime())/86400000+jan1.getDay()+1)/7);}
function getMondayStr(){const d=new Date();const dow=(d.getDay()+6)%7;d.setDate(d.getDate()-dow);return d.toISOString().split("T")[0];}

/* ══════════════════════════════════════════ PODIUM LOGO */
function PodiumLogo({size=20}:{size?:number}){
  const h=Math.round(size*0.8);
  return(
    <div style={{display:"flex",alignItems:"center",gap:5}}>
      <svg width={size} height={h} viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="3" width="8" height="13" rx="2" fill="var(--amber)"/>
        <rect x="0" y="7" width="6" height="9" rx="2" fill="#9B9B9B" opacity=".9"/>
        <rect x="14" y="9" width="6" height="7" rx="2" fill="#CD7F32"/>
      </svg>
      <span className="tb-logo-word">{"​"}</span>
    </div>
  );
}

/* ══════════════════════════════════════════ LOADING */
function Loading({text="Cargando..."}:{text?:string}){
  return <div className="loading"><div style={{display:"flex",alignItems:"center",gap:7,marginBottom:4}}><svg width="28" height="22" viewBox="0 0 20 16" fill="none"><rect x="6" y="3" width="8" height="13" rx="2" fill="var(--amber)"/><rect x="0" y="7" width="6" height="9" rx="2" fill="#9B9B9B" opacity=".9"/><rect x="14" y="9" width="6" height="7" rx="2" fill="#CD7F32"/></svg><span style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontWeight:900,fontSize:30,color:"var(--text)"}}>Podium</span></div><div className="spin"/><div className="loading-txt">{text}</div></div>;
}

/* ══════════════════════════════════════════ AUTH */
function AuthScreen({onAuth,bootError}:{onAuth:(u:any)=>void;bootError?:string}){
  // phase: "email" → "otp" → "profile" (if new user)
  const [phase,setPhase]=useState<"email"|"otp"|"profile">("email");
  const [email,setEmail]=useState("");
  const [otp,setOtp]=useState("");
  const [profStep,setProfStep]=useState(0);
  const [name,setName]=useState(""); const [uname,setUN]=useState("");
  const [avatar,setAvatar]=useState("🐺");
  const [err,setErr]=useState(""); const [info,setInfo]=useState("");
  const [busy,setBusy]=useState(false);
  const [verifiedUser,setVerifiedUser]=useState<any>(null);
  function clearMsgs(){setErr("");setInfo("");}

  async function sendOtp(){
    if(!email.trim())return; setBusy(true);clearMsgs();
    const{error}=await sb.auth.signInWithOtp({email:email.trim().toLowerCase(),options:{shouldCreateUser:true}});
    setBusy(false);
    if(error){setErr(error.message);return;}
    setPhase("otp");
    setInfo("Código enviado — revisa tu bandeja de entrada (y spam).");
  }

  async function verifyOtp(){
    if(otp.length<6)return; setBusy(true);clearMsgs();
    const{data,error}=await sb.auth.verifyOtp({email:email.trim().toLowerCase(),token:otp.trim(),type:"email"});
    setBusy(false);
    if(error){setErr("Código incorrecto o expirado. Inténtalo de nuevo.");return;}
    const u=data?.user;
    if(!u){setErr("Error de autenticación.");return;}
    // check if profile exists
    const{data:prof}=await sb.from("users").select("id").eq("id",u.id).maybeSingle();
    if(prof){onAuth(u);}
    else{setVerifiedUser(u);setPhase("profile");}
  }

  async function createProfile(){
    if(!verifiedUser)return;
    if(profStep===0){if(!name.trim()||!uname.trim()){setErr("Rellena nombre y @username.");return;}setProfStep(1);return;}
    setBusy(true);clearMsgs();
    const{error}=await sb.from("users").insert({id:verifiedUser.id,email:email.toLowerCase().trim(),username:uname.replace("@","").toLowerCase().trim(),name:name.trim(),avatar,role:"user"});
    setBusy(false);
    if(error&&!error.message.includes("duplicate")){setErr(error.message);return;}
    onAuth(verifiedUser);
  }

  const Logo=()=>(
    <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:4}}>
      <svg width="28" height="22" viewBox="0 0 20 16" fill="none"><rect x="6" y="3" width="8" height="13" rx="2" fill="var(--amber)"/><rect x="0" y="7" width="6" height="9" rx="2" fill="#9B9B9B" opacity=".9"/><rect x="14" y="9" width="6" height="7" rx="2" fill="#CD7F32"/></svg>
      <span style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontWeight:900,fontSize:32,color:"var(--text)"}}>Podium</span>
    </div>
  );

  if(phase==="email") return(
    <div className="page">
      <Logo/>
      <div className="tagline">Compite con tus amigos. Mejora cada día.</div>
      {bootError&&<div className="err">⚠️ {bootError}</div>}
      {err&&<div className="err">{err}</div>}
      {info&&<div className="ok">{info}</div>}
      <label className="lbl">Tu email</label>
      <input className="inp" type="email" placeholder="tu@email.com" autoFocus value={email}
        onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendOtp()}/>
      <button className="btn" disabled={!email.trim()||busy} onClick={sendOtp}>
        {busy?"Enviando...":"Enviar código →"}
      </button>
      <div style={{fontSize:11,color:"var(--muted)",textAlign:"center",marginTop:10,lineHeight:1.5}}>
        Te enviamos un código de 6 dígitos al email.<br/>Sin contraseñas, sin complicaciones.
      </div>
    </div>
  );

  if(phase==="otp") return(
    <div className="page">
      <Logo/>
      <div className="tagline">Revisa tu email</div>
      <div style={{textAlign:"center",fontSize:13,color:"var(--muted)",marginBottom:20,lineHeight:1.6}}>
        Enviamos un código a<br/><strong style={{color:"var(--text)"}}>{email}</strong>
      </div>
      {err&&<div className="err">{err}</div>}
      {info&&<div className="ok">{info}</div>}
      <label className="lbl">Código de 6 dígitos</label>
      <input className="code-inp" placeholder="123456" maxLength={6} inputMode="numeric" autoFocus
        value={otp} onChange={e=>setOtp(e.target.value.replace(/\D/g,""))}
        onKeyDown={e=>e.key==="Enter"&&verifyOtp()}
        style={{letterSpacing:8,fontSize:24,textAlign:"center"}}/>
      <button className="btn" disabled={otp.length<6||busy} onClick={verifyOtp}>
        {busy?"Verificando...":"Entrar →"}
      </button>
      <div style={{display:"flex",justifyContent:"center",gap:16,marginTop:12,fontSize:12}}>
        <span style={{color:"var(--muted)",cursor:"pointer",textDecoration:"underline"}} onClick={()=>{setPhase("email");setOtp("");clearMsgs();}}>← Cambiar email</span>
        <span style={{color:"var(--amber)",cursor:"pointer",textDecoration:"underline"}} onClick={()=>{setOtp("");setBusy(false);sendOtp();}}>Reenviar código</span>
      </div>
    </div>
  );

  // phase === "profile" (new user setup)
  return(
    <div className="page">
      <Logo/>
      <div className="tagline">{profStep===0?"Cuéntanos algo de ti":"Elige tu avatar"}</div>
      <div className="prog">{[0,1].map(i=><div key={i} className="prog-dot" style={{background:i<=profStep?"var(--amber)":"var(--s3)"}}/>)}</div>
      {err&&<div className="err">{err}</div>}
      {profStep===0&&<>
        <label className="lbl">Nombre</label>
        <input className="inp" placeholder="Tu nombre" value={name} onChange={e=>setName(e.target.value)}/>
        <label className="lbl">@Username</label>
        <input className="inp" placeholder="@tunombre" value={uname} onChange={e=>setUN(e.target.value)}/>
      </>}
      {profStep===1&&<>
        <label className="lbl">Elige tu avatar</label>
        <div className="avi-grid">{AVATARS.map(a=><div key={a} className={`avi-opt${avatar===a?" sel":""}`} onClick={()=>setAvatar(a)}>{a}</div>)}</div>
      </>}
      <button className="btn" disabled={busy||(profStep===0&&(!name.trim()||!uname.trim()))} onClick={createProfile}>
        {busy?"Creando perfil...":profStep===0?"Siguiente →":"¡Empezar!"}
      </button>
      {profStep>0&&<div className="switch"><span onClick={()=>{setProfStep(0);clearMsgs();}}>← Atrás</span></div>}
    </div>
  );
}

/* ══════════════════════════════════════════ JOIN */
function JoinScreen({userId,onJoin}:{userId:string;onJoin:(g:any)=>void}){
  const [code,setCode]=useState(""); const [gname,setGname]=useState("");
  const [creating,setC]=useState(false); const [err,setErr]=useState(""); const [busy,setBusy]=useState(false);
  async function join(){
    if(code.length<4)return; setBusy(true);setErr("");
    const{data:group,error}=await sb.from("groups").select("*").eq("invite_code",code.toUpperCase().trim()).maybeSingle();
    if(error||!group){setErr("Código no encontrado.");setBusy(false);return;}
    const{error:mErr}=await sb.from("group_members").insert({group_id:group.id,user_id:userId});
    if(mErr&&!mErr.message.includes("duplicate")){setErr(mErr.message);setBusy(false);return;}
    onJoin(group);
  }
  async function create(){
    if(!gname.trim())return; setBusy(true);setErr("");
    const{data:group,error}=await sb.from("groups").insert({name:gname.trim(),created_by:userId,emoji:"🏆",color:"#F0A832",season_weeks:8}).select().single();
    if(error){setErr(error.message);setBusy(false);return;}
    await sb.from("group_members").insert({group_id:group.id,user_id:userId});
    onJoin(group);
  }
  return(
    <div className="page">
      <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:4}}><svg width="28" height="22" viewBox="0 0 20 16" fill="none"><rect x="6" y="3" width="8" height="13" rx="2" fill="var(--amber)"/><rect x="0" y="7" width="6" height="9" rx="2" fill="#9B9B9B" opacity=".9"/><rect x="14" y="9" width="6" height="7" rx="2" fill="#CD7F32"/></svg><span style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontWeight:900,fontSize:32,color:"var(--text)"}}>Podium</span></div>
      <div className="tagline">Únete a un grupo o crea uno nuevo.</div>
      {err&&<div className="err">{err}</div>}
      <label className="lbl">Código de invitación</label>
      <input className="code-inp" placeholder="ABC123" maxLength={6} value={code} onChange={e=>setCode(e.target.value.toUpperCase())} onKeyDown={e=>e.key==="Enter"&&join()}/>
      <button className="btn" disabled={code.length<4||busy} onClick={join}>{busy?"Buscando...":"Unirme →"}</button>
      <div className="div"><div className="div-line"/><div className="div-txt">o</div><div className="div-line"/></div>
      {!creating?<button className="btn-ghost" onClick={()=>setC(true)}>⚡ Crear un Podium nuevo</button>
        :<><label className="lbl">Nombre del grupo</label><input className="inp" placeholder="Ej: Panas del gym" value={gname} onChange={e=>setGname(e.target.value)} onKeyDown={e=>e.key==="Enter"&&create()}/><button className="btn" disabled={!gname.trim()||busy} onClick={create}>{busy?"Creando...":"Crear Podium →"}</button><button className="btn-ghost" onClick={()=>setC(false)}>← Volver</button></>}
    </div>
  );
}

/* ══════════════════════════════════════════ DISPUTE HELPERS */
function computeDisputeStatus(d:Dispute,votes:DisputeVote[],totalMembers:number):{status:DisputeStatus;supports:number;rejects:number;closed:boolean;hoursLeft:number}{
  const supports=votes.filter(v=>v.vote==="support").length;
  const rejects=votes.filter(v=>v.vote==="reject").length;
  const eligible=Math.max(0,totalMembers-1);
  const elapsedMs=Date.now()-new Date(d.created_at).getTime();
  const hoursLeft=Math.max(0,24-elapsedMs/3600000);
  const closed=hoursLeft<=0||(supports+rejects>=eligible&&eligible>0);
  let status:DisputeStatus="active";
  if(closed) status=rejects>supports?"failed":"passed";
  return{status,supports,rejects,closed,hoursLeft};
}

/* ══════════════════════════════════════════ DISPUTE MODAL */
function DisputeModal({user,group,disputedUserId,onClose,onCreated,members}:{user:any;group:any;disputedUserId:string;onClose:()=>void;onCreated:(d:Dispute)=>void;members:Record<string,{name:string;avatar:string}>}){
  const [yLog,setYLog]=useState<Record<string,boolean>|null>(null);
  const [yPts,setYPts]=useState(0);
  const [selHabit,setSelHabit]=useState("");
  const [reason,setReason]=useState("");
  const [showReason,setShowReason]=useState(false);
  const [saving,setSaving]=useState(false);
  useEffect(()=>{
    (async()=>{
      const{data}=await sb.from("daily_logs").select("*").eq("user_id",disputedUserId).eq("group_id",group.id).eq("date",yesterdayStr()).maybeSingle();
      const log:Record<string,boolean>={};
      let pts=0;
      if(data){QUESTIONS.forEach(q=>{if((data as any)[q.id]){log[q.id]=true;pts+=q.pts;}});}
      setYLog(log);setYPts(pts);
    })();
  },[disputedUserId,group?.id]);
  async function submit(){
    if(!selHabit||saving)return; setSaving(true);
    const{data,error}=await sb.from("disputes").insert({group_id:group.id,disputed_user:disputedUserId,challenger:user.id,day:yesterdayStr(),habit_id:selHabit,reason:reason.trim()||null}).select().single();
    setSaving(false);
    if(error){if(error.code==="23505")alert("Ya existe una disputa para ese hábito.");else alert("Error: "+error.message);return;}
    onCreated(data as Dispute); onClose();
  }
  const who=members[disputedUserId]||{name:"?",avatar:"👤"};
  const habitsDone=yLog?QUESTIONS.filter(q=>yLog[q.id]):[];
  return(
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={e=>e.stopPropagation()}>
        <div className="handle"/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div style={{fontSize:17,fontWeight:800,fontFamily:"'Playfair Display',serif"}}>⚖️ Disputar</div>
          <button onClick={onClose} style={{background:"var(--s2)",border:"none",color:"var(--text)",fontSize:14,cursor:"pointer",borderRadius:20,width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>
        <div style={{background:"var(--s2)",borderRadius:14,padding:"12px 14px",marginBottom:16,display:"flex",alignItems:"center",gap:12}}>
          <div style={{fontSize:32,lineHeight:1}}>{who.avatar}</div>
          <div>
            <div style={{fontWeight:800,fontSize:15}}>{who.name}</div>
            <div style={{fontSize:11,color:"var(--muted)",marginTop:2}}>
              {!yLog?"Cargando...":`Apunte de ayer · ${yPts} pts`}
            </div>
          </div>
        </div>
        {!yLog&&<div style={{textAlign:"center",color:"var(--muted)",padding:24,fontSize:13}}>Cargando hábitos...</div>}
        {yLog&&habitsDone.length===0&&(
          <div style={{textAlign:"center",padding:"28px 20px"}}>
            <div style={{fontSize:32,marginBottom:8}}>🤷</div>
            <div style={{fontSize:13,fontWeight:700,color:"var(--text)",marginBottom:4}}>Sin hábitos ayer</div>
            <div style={{fontSize:11,color:"var(--muted)"}}>No hay nada que disputar si no apuntó ningún hábito.</div>
          </div>
        )}
        {yLog&&habitsDone.length>0&&<>
          <div style={{fontSize:11,letterSpacing:1.5,textTransform:"uppercase",color:"var(--muted)",marginBottom:10,fontWeight:700}}>¿Qué hábito quieres disputar?</div>
          <div className="dispute-grid">
            {habitsDone.map(q=>(
              <div key={q.id} className={"dispute-grid-card"+(selHabit===q.id?" sel":"")} onClick={()=>setSelHabit(q.id)}>
                <div className="dispute-grid-radio"/>
                <div className="dispute-grid-icon">{q.icon}</div>
                <div className="dispute-grid-name">{q.name}</div>
                <div className="dispute-grid-penalty">si pierde: −{disputePenalty(q.id)}</div>
              </div>
            ))}
          </div>
          {!showReason
            ?<button style={{background:"none",border:"none",color:"var(--muted)",fontSize:12,cursor:"pointer",padding:"0 0 10px",textDecoration:"underline"}} onClick={()=>setShowReason(true)}>+ Añadir motivo</button>
            :<>
              <textarea className="dispute-reason" placeholder="Explica por qué dudas de este hábito…" value={reason} onChange={e=>setReason(e.target.value)} maxLength={280} style={{marginBottom:4}}/>
              <div style={{fontSize:10,color:"var(--muted)",textAlign:"right",marginBottom:8}}>{reason.length}/280</div>
            </>
          }
          <button className="btn" onClick={submit} disabled={!selHabit||saving} style={{opacity:selHabit?1:.5}}>
            {saving?"Creando disputa...":(selHabit?`Disputar ${QUESTIONS.find(q=>q.id===selHabit)?.name}`:"Elige un hábito")}
          </button>
        </>}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════ DISPUTES PANEL */
function DisputesPanel({user,group,disputes,votes,members,totalMembers,onClose,onVote}:{user:any;group:any;disputes:Dispute[];votes:DisputeVote[];members:Record<string,{name:string;avatar:string}>;totalMembers:number;onClose:()=>void;onVote:(id:number,v:"support"|"reject")=>Promise<void>}){
  const sorted=[...disputes].sort((a,b)=>new Date(b.created_at).getTime()-new Date(a.created_at).getTime());
  return(
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={e=>e.stopPropagation()}>
        <div className="handle"/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div style={{fontSize:16,fontWeight:700}}>⚖️ Disputas del grupo</div>
          <button onClick={onClose} style={{background:"none",border:"none",color:"var(--muted)",fontSize:18,cursor:"pointer"}}>✕</button>
        </div>
        {sorted.length===0&&<div className="dispute-empty">No hay disputas todavía.</div>}
        {sorted.map(d=>{
          const vs=votes.filter(v=>v.dispute_id===d.id);
          const st=computeDisputeStatus(d,vs,totalMembers);
          const habit=QUESTIONS.find(q=>q.id===d.habit_id);
          const who=members[d.disputed_user]||{name:"?",avatar:"👤"};
          const challenger=members[d.challenger]||{name:"?",avatar:"👤"};
          const myVote=vs.find(v=>v.voter_id===user.id);
          const canVote=d.disputed_user!==user.id&&!st.closed;
          const cls=st.status==="failed"?"failed":st.status==="passed"?"passed":"";
          return(
            <div key={d.id} className={"dispute-card "+cls}>
              <div className="dispute-card-head">
                <div style={{flex:1}}>
                  <div className="dispute-card-title">{habit?habit.icon:"❓"} {habit?habit.name:d.habit_id} — {who.avatar} {who.name}</div>
                  <div className="dispute-card-sub">Por {challenger.avatar} {challenger.name} · {d.day}</div>
                </div>
                <div className={"dispute-card-status "+(st.status==="failed"?"dcs-failed":st.status==="passed"?"dcs-passed":"dcs-active")}>
                  {st.status==="active"?`${Math.round(st.hoursLeft)}h`:st.status==="failed"?"reducido":"mantenido"}
                </div>
              </div>
              {d.reason&&<div className="dispute-reason-box">"{d.reason}"</div>}
              {canVote&&<div className="dispute-votes">
                <button className={"dispute-vote-btn support"+(myVote?.vote==="support"?" mine":"")} onClick={()=>onVote(d.id,"support")}>✅ Mantener</button>
                <button className={"dispute-vote-btn reject"+(myVote?.vote==="reject"?" mine":"")} onClick={()=>onVote(d.id,"reject")}>❌ Reducir 50%</button>
              </div>}
              <div className="dispute-tally"><span>✅ <b>{st.supports}</b></span><span>❌ <b>{st.rejects}</b></span><span>{vs.length}/{Math.max(0,totalMembers-1)} votos</span></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════ CHAT */
type ChatMsg={id:number;group_id:string;user_id:string;text:string|null;photo_url:string|null;created_at:string};
type SharedEvent={text:string;color:string};
function ChatTab({user,group,profile,sharedEvent,onClearShared}:{user:any;group:any;profile:any;sharedEvent:SharedEvent|null;onClearShared:()=>void}){
  const [msgs,setMsgs]=useState<ChatMsg[]>([]);
  const [members,setMembers]=useState<Record<string,{name:string;avatar:string}>>({});
  const [text,setText]=useState("");
  const [sending,setSending]=useState(false);
  const [uploading,setUploading]=useState(false);
  const [loadErr,setLoadErr]=useState<string|null>(null);
  const listRef=useRef<HTMLDivElement>(null);
  const fileRef=useRef<HTMLInputElement>(null);
  const scrollDown=()=>setTimeout(()=>{if(listRef.current)listRef.current.scrollTop=listRef.current.scrollHeight;},50);
  const addMsg=(m:ChatMsg)=>{setMsgs(prev=>prev.some(p=>p.id===m.id)?prev:[...prev,m]);scrollDown();};
  useEffect(()=>{
    if(!group?.id)return;
    (async()=>{
      const{data:gm}=await sb.from("group_members").select("user_id").eq("group_id",group.id);
      const ids=(gm||[]).map((r:any)=>r.user_id);
      if(!ids.length)return;
      const{data:us}=await sb.from("users").select("id,name,avatar").in("id",ids);
      const map:Record<string,{name:string;avatar:string}>={};
      (us||[]).forEach((u:any)=>{map[u.id]={name:u.name||"?",avatar:u.avatar||"👤"};});
      setMembers(map);
    })();
  },[group?.id]);
  useEffect(()=>{
    if(!group?.id)return;
    let cancelled=false; setLoadErr(null);
    const load=async()=>{
      const{data,error}=await sb.from("chat_messages").select("*").eq("group_id",group.id).order("created_at",{ascending:true}).limit(200);
      if(cancelled)return;
      if(error){setLoadErr(error.message);return;}
      setMsgs((data||[]) as ChatMsg[]); scrollDown();
    };
    load();
    const channel=sb.channel("chat-"+group.id)
      .on("postgres_changes",{event:"INSERT",schema:"public",table:"chat_messages",filter:"group_id=eq."+group.id},(p:any)=>addMsg(p.new as ChatMsg))
      .on("postgres_changes",{event:"DELETE",schema:"public",table:"chat_messages",filter:"group_id=eq."+group.id},(p:any)=>{const id=p.old?.id;if(id)setMsgs(prev=>prev.filter(m=>m.id!==id));})
      .subscribe();
    const poll=setInterval(load,5000);
    return()=>{cancelled=true;clearInterval(poll);sb.removeChannel(channel);};
  },[group?.id]);
  async function send(){
    const t=text.trim();if(!t||sending)return; setSending(true);
    const fullText=sharedEvent?`[${sharedEvent.text}]\n${t}`:t;
    const{data,error}=await sb.from("chat_messages").insert({group_id:group.id,user_id:user.id,text:fullText}).select().single();
    setSending(false);
    if(error){alert("Error: "+error.message);return;}
    setText(""); onClearShared(); if(data)addMsg(data as ChatMsg);
  }
  async function sendPhoto(file:File){
    if(!file||uploading)return; setUploading(true);
    try{
      const ext=(file.name.split(".").pop()||"jpg").toLowerCase();
      const path=group.id+"/"+user.id+"-"+Date.now()+"."+ext;
      const{error:upErr}=await sb.storage.from("chat-photos").upload(path,file,{cacheControl:"3600",upsert:false,contentType:file.type||"image/jpeg"});
      if(upErr){alert("Error subiendo foto: "+upErr.message);return;}
      const{data:pub}=sb.storage.from("chat-photos").getPublicUrl(path);
      const{data:ins,error:insErr}=await sb.from("chat_messages").insert({group_id:group.id,user_id:user.id,photo_url:pub.publicUrl}).select().single();
      if(insErr){alert("Error: "+insErr.message);return;}
      if(ins)addMsg(ins as ChatMsg);
    }finally{setUploading(false);if(fileRef.current)fileRef.current.value="";}
  }
  async function clearChat(){
    if(!window.confirm("¿Vaciar todo el chat?"))return;
    const{error}=await sb.from("chat_messages").delete().eq("group_id",group.id);
    if(error){alert("Error: "+error.message);return;} setMsgs([]);
  }
  const isAdmin=profile?.role==="admin";
  return(
    <div className="content" key="chat">
      <div className="chat-wrap">
        {isAdmin&&<div style={{display:"flex",justifyContent:"flex-end",padding:"4px 2px 8px"}}><button onClick={clearChat} style={{background:"transparent",border:"1px solid var(--border)",borderRadius:8,color:"var(--muted)",padding:"4px 10px",fontSize:11,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>🧹 Vaciar chat</button></div>}
        <div className="chat-list" ref={listRef}>
          {loadErr&&<div className="chat-empty" style={{color:"#F2667A"}}>Error: {loadErr}</div>}
          {!loadErr&&msgs.length===0&&<div className="chat-empty">Aún no hay mensajes. ¡Sé el primero!</div>}
          {msgs.map(m=>{
            const mine=m.user_id===user.id;
            const who=mine?{name:profile?.name||"Tú",avatar:profile?.avatar||"👤"}:(members[m.user_id]||{name:"?",avatar:"👤"});
            const hh=new Date(m.created_at).toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"});
            return(
              <div key={m.id} className={"msg"+(mine?" me":"")}>
                <div className="msg-avi">{who.avatar}</div>
                <div className="msg-body">
                  <div className="msg-meta">{!mine&&<span className="msg-name">{who.name}</span>}<span>{hh}</span></div>
                  {m.text&&<div className="msg-bubble">{m.text}</div>}
                  {m.photo_url&&<img src={m.photo_url} alt="foto" className="msg-photo" onClick={()=>window.open(m.photo_url!,"_blank")}/>}
                </div>
              </div>
            );
          })}
        </div>
        {uploading&&<div className="chat-sending">Subiendo foto…</div>}
        <div className="chat-input-bar" style={{flexDirection:"column",alignItems:"stretch",gap:0,paddingBottom:"calc(env(safe-area-inset-bottom,0px) + 10px)"}}>
          {sharedEvent&&<div className="quoted-event"><div className="qe-bar" style={{background:sharedEvent.color}}/><span className="qe-text">{sharedEvent.text}</span><button className="qe-close" onClick={onClearShared}>✕</button></div>}
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files?.[0];if(f)sendPhoto(f);}}/>
            <button className="chat-photo-btn" onClick={()=>fileRef.current?.click()} disabled={uploading}>📷</button>
            <input className="chat-input" placeholder={sharedEvent?"Comenta…":"Escribe un mensaje…"} value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} disabled={sending}/>
            <button className="chat-send" onClick={send} disabled={sending||!text.trim()}>➜</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════ TODAY BANNER */
function TodayBanner({weekPts,streak,saved,done,onApuntar,myPos,weekDays}:{weekPts:number;streak:number;saved:boolean;done:Record<string,boolean>;onApuntar:()=>void;myPos:number;weekDays:boolean[]}){
  const now=new Date();
  const dow=(now.getDay()+6)%7; // 0=Mon
  const dayName=now.toLocaleDateString("es-ES",{weekday:"long"}).replace(/^./,c=>c.toUpperCase());
  const weekNum=getWeekNum();
  const DAY_LABELS=["L","M","X","J","V","S","D"];
  const todayPts=Object.entries(done).reduce((s,[id,on])=>{const q=QUESTIONS.find(x=>x.id===id);return on&&q?s+q.pts:s;},0);
  return(
    <div className="today-banner">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div>
          <div style={{fontSize:10,color:"var(--muted)",letterSpacing:1.5,textTransform:"uppercase",marginBottom:4}}>Semana {weekNum} · {dayName}</div>
          <div className="hero-pts">{Math.max(0,weekPts)}</div>
          <div className="hero-lbl">pts esta semana</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:10,color:"var(--muted)",letterSpacing:1.5,textTransform:"uppercase",marginBottom:2}}>Posición</div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:30,fontWeight:900,color:"var(--text)",lineHeight:1}}>#{myPos||"—"}</div>
          {streak>0&&<div className="streak" style={{marginTop:5,display:"inline-block"}}>🔥 {streak} días deporte</div>}
        </div>
      </div>
      <div className="day-grid">
        {DAY_LABELS.map((lbl,i)=>{
          const isDone=weekDays[i];
          const isToday=i===dow;
          return(
            <div key={i} className="day-cell">
              <div className="day-cell-lbl">{lbl}</div>
              <div className={"day-cell-bar"+(isDone?" done":isToday?" today-empty":"")}/>
            </div>
          );
        })}
      </div>
      {saved
        ?<div style={{textAlign:"center",fontSize:12,color:"var(--green)",fontWeight:700,marginTop:10,letterSpacing:.5}}>✓ Día guardado · +{todayPts} pts</div>
        :<button className="apuntar-btn" onClick={onApuntar} style={{marginTop:10}}>＋ Apuntar día</button>}
    </div>
  );
}

/* ══════════════════════════════════════════ APUNTAR MODAL */
function ApuntarModal({done,saved,saving,onToggle,onSave,onClose}:{done:Record<string,boolean>;saved:boolean;saving:boolean;onToggle:(id:string)=>void;onSave:()=>void;onClose:()=>void}){
  const pts=calcPts(done);
  const anyDone=Object.values(done).some(Boolean);
  return(
    <div className="overlay" onClick={onClose}>
      <div className="sheet" style={{maxHeight:"80vh"}} onClick={e=>e.stopPropagation()}>
        <div className="handle"/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:900,color:"var(--text)"}}>¿Qué has hecho hoy?</div>
          {anyDone&&<div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:900,color:"var(--amber)"}}>+{pts} pts</div>}
        </div>
        {AMBITOS.map(a=>{
          const aHabits=QUESTIONS.filter(q=>a.habits.includes(q.id as any));
          const maxPts=aHabits.reduce((s,q)=>s+q.pts,0);
          const earnedPts=aHabits.reduce((s,q)=>done[q.id]?s+q.pts:s,0);
          return(
            <div key={a.id} style={{marginBottom:16}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:a.color}}/>
                  <span style={{fontSize:11,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",color:a.color}}>{a.icon} {a.label}</span>
                </div>
                <span style={{fontSize:11,color:"var(--muted)"}}>{earnedPts} / {maxPts} pts</span>
              </div>
              <div className="q-grid">
                {aHabits.map(q=>(
                  <div key={q.id} className={`qi${done[q.id]?" on":""}${saved?" locked":""}`} onClick={()=>onToggle(q.id)}>
                    <div className="qi-icon">{q.icon}</div>
                    <div className="qi-name">{q.name}</div>
                    <div className="qi-pts">+{q.pts} pts</div>
                    <div className="qi-chk">{done[q.id]?"✓":""}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        <button className="btn" style={{marginTop:14}} disabled={!anyDone||saved||saving} onClick={onSave}>
          {saving?"Guardando...":saved?"✓ Guardado":`Guardar · +${Math.max(0,pts)} pts`}
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════ REACTIONS BAR */
function ReactionsBar({feedType,feedRef,userId,reactions,onReact}:{feedType:string;feedRef:string;userId:string;reactions:FeedReaction[];onReact:(ft:string,fr:string,e:string)=>void}){
  const [picking,setPicking]=useState(false);
  const cardRx=reactions.filter(r=>r.feed_ref===feedRef);
  const grouped:Record<string,{count:number;mine:boolean}>={};
  for(const r of cardRx){
    if(!grouped[r.emoji])grouped[r.emoji]={count:0,mine:false};
    grouped[r.emoji].count++;
    if(r.user_id===userId)grouped[r.emoji].mine=true;
  }
  const existing=Object.keys(grouped);
  const unused=REACTION_EMOJIS.filter(e=>!existing.includes(e));
  return(
    <div className="reactions">
      {existing.map(emoji=>(
        <button key={emoji} className={"rx-btn"+(grouped[emoji].mine?" mine":"")} onClick={()=>onReact(feedType,feedRef,emoji)}>
          <span>{emoji}</span><span className="rx-count">{grouped[emoji].count}</span>
        </button>
      ))}
      {picking?(
        <div className="rx-picker">
          {unused.map(emoji=><button key={emoji} className="rx-pick-btn" onClick={()=>{onReact(feedType,feedRef,emoji);setPicking(false);}}>{emoji}</button>)}
          <button className="rx-pick-btn" onClick={()=>setPicking(false)} style={{fontSize:12,color:"var(--muted)"}}>✕</button>
        </div>
      ):(
        unused.length>0&&<div className="rx-add" onClick={()=>setPicking(true)}>＋</div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════ FEED CARD */
type BetStake={side:1|2;amount:number;confirmed:boolean};
function BetFeedCard({item,userId,reactions,onReact,betStakes,onBetStake,onSendToChat}:{item:FeedBetItem;userId:string;reactions:FeedReaction[];onReact:(ft:string,fr:string,e:string)=>void;betStakes:Record<number,BetStake>;onBetStake:(id:number,side:1|2,amt:number)=>void;onSendToChat:(item:FeedItem)=>void;onVote?:(id:number,v:"support"|"reject")=>Promise<void>}){
  const b=item.bet;
  const myStake=betStakes[b.id];
  const [selSide,setSelSide]=React.useState<1|2|null>(null);
  const [stakeAmt,setStakeAmt]=React.useState(5);
  const total=b.p1Pts+b.p2Pts;
  const p1Pct=total>0?Math.round(b.p1Pts/total*100):50;
  const isBetWon=item.type==="bet_won";
  const winnerName=b.myPick===1?b.p1Name:b.p2Name;
  const winnerAvi=b.myPick===1?b.p1Avi:b.p2Avi;
  if(isBetWon) return(
    <div className="feed-card" style={{borderColor:"rgba(93,201,138,.25)"}}>
      <div className="feed-head"><div className="feed-avi">{winnerAvi}</div><div style={{flex:1,minWidth:0}}><div className="feed-name">{winnerName} <span style={{fontWeight:400,color:"var(--green)"}}>ganó la apuesta 🏆</span></div><div className="feed-when">{b.label}</div></div><div style={{background:"rgba(93,201,138,.12)",color:"var(--green)",borderRadius:20,padding:"3px 10px",fontSize:12,fontWeight:700,flexShrink:0}}>+{b.pot} pts</div></div>
      <div className="card-footer"><ReactionsBar feedType="bet_won" feedRef={item.ref} userId={userId} reactions={reactions} onReact={onReact}/><button className="chat-link-btn" onClick={()=>onSendToChat(item)}>💬 Chat</button></div>
    </div>
  );
  return(
    <div className="feed-card">
      <div className="feed-head">
        <div className="feed-avi" style={{background:"rgba(240,168,50,.1)",fontSize:16}}>⚔️</div>
        <div style={{flex:1,minWidth:0}}><div className="feed-name" style={{fontSize:12}}>{b.label}</div><div className="feed-when">apuesta abierta · termina en {b.ends}</div></div>
        <div style={{background:"rgba(240,168,50,.12)",color:"var(--amber)",borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:700,flexShrink:0}}>⚡{b.p1Pts+b.p2Pts} PTS</div>
      </div>
      {!myStake?.confirmed&&<div className="bet-sides">
        <div className={"bet-side"+(selSide===1?" sel":"")} onClick={()=>setSelSide(s=>s===1?null:1)}><div className="bet-side-avi">{b.p1Avi}</div><div className="bet-side-name">{b.p1Name}</div><div className="bet-side-pts">{b.p1Pts} pts</div></div>
        <div style={{display:"flex",alignItems:"center",fontSize:11,fontWeight:700,color:"var(--muted)",padding:"0 2px"}}>VS</div>
        <div className={"bet-side"+(selSide===2?" sel":"")} onClick={()=>setSelSide(s=>s===2?null:2)}><div className="bet-side-avi">{b.p2Avi}</div><div className="bet-side-name">{b.p2Name}</div><div className="bet-side-pts">{b.p2Pts} pts</div></div>
      </div>}
      <div className="bet-pot-bar"><div className="bet-pot-fill" style={{width:p1Pct+"%"}}/></div>
      <div className="bet-pot-labels"><span>{b.p1Name}: {b.p1Pts}pts</span><span>{b.p2Name}: {b.p2Pts}pts</span></div>
      <div className="bet-rules-lbl">Elige un lado · máx 10 pts · ganador dobla · perdedor 0</div>
      {selSide&&!myStake?.confirmed&&<>
        <div className="stake-row"><span style={{fontSize:11,color:"var(--muted)",whiteSpace:"nowrap"}}>Apostar:</span><input type="range" className="stake-range" min={1} max={10} value={stakeAmt} onChange={e=>setStakeAmt(+e.target.value)}/><span className="stake-amt">{stakeAmt}pts</span></div>
        <div className="stake-actions"><button className="stake-confirm" onClick={()=>{onBetStake(b.id,selSide,stakeAmt);setSelSide(null);}}>Apostar por {selSide===1?b.p1Name:b.p2Name}</button><button className="stake-cancel" onClick={()=>setSelSide(null)}>✕</button></div>
      </>}
      {myStake?.confirmed&&<div className="bet-locked"><span>✓ {myStake.amount}pts por <b style={{marginLeft:3}}>{myStake.side===1?b.p1Name:b.p2Name}</b></span><span style={{color:"var(--green)"}}>+{myStake.amount*2} si gana 🏆</span></div>}
      <div className="card-footer"><ReactionsBar feedType="bet_open" feedRef={item.ref} userId={userId} reactions={reactions} onReact={onReact}/><button className="chat-link-btn" onClick={()=>onSendToChat(item)}>💬 Chat</button></div>
    </div>
  );
}

function FeedCard({item,userId,members,reactions,onReact,disputeVotes,totalMembers,betStakes,onBetStake,onSendToChat,onVote,onDispute}:{item:FeedItem;userId:string;members:Record<string,{name:string;avatar:string}>;reactions:FeedReaction[];onReact:(ft:string,fr:string,e:string)=>void;disputeVotes:DisputeVote[];totalMembers:number;betStakes:Record<number,BetStake>;onBetStake:(id:number,side:1|2,amt:number)=>void;onSendToChat:(item:FeedItem)=>void;onVote?:(id:number,v:"support"|"reject")=>Promise<void>;onDispute?:(uid:string)=>void}){
  if(item.type==="log"){
    const who=members[item.user_id]||{name:"?",avatar:"👤"};
    const isMe=item.user_id===userId;
    return(
      <div className="feed-card">
        <div className="feed-head">
          <div className="feed-avi">{who.avatar}</div>
          <div style={{flex:1,minWidth:0}}>
            <div className="feed-name">{isMe?"Tú":who.name} <span style={{fontWeight:400,color:"var(--muted)"}}>registró actividad</span></div>
            <div className="feed-when">{relTime(item.created_at)} · {item.date}</div>
          </div>
          <div style={{textAlign:"right",flexShrink:0}}><div className="feed-pts-big">+{item.pts}</div><div style={{fontSize:10,color:"var(--muted)"}}>pts</div></div>
        </div>
        {item.habits.length>0&&<div className="feed-habits">{item.habits.map(h=><div key={h.id} className="feed-habit-chip">{h.icon} {h.name}</div>)}</div>}
        <div className="card-footer"><ReactionsBar feedType="log" feedRef={item.ref} userId={userId} reactions={reactions} onReact={onReact}/><div style={{display:"flex",gap:6}}>{!isMe&&<button className="chat-link-btn" style={{color:"#F2667A"}} onClick={()=>onDispute&&onDispute(item.user_id)}>⚠️ Disputar</button>}<button className="chat-link-btn" onClick={()=>onSendToChat(item)}>💬 Chat</button></div></div>
      </div>
    );
  }
  if(item.type==="streak"){
    const who=members[item.user_id]||{name:"?",avatar:"👤"};
    const isMe=item.user_id===userId;
    const lbl=item.streak>=30?"🏆 ¡Un mes seguido!":item.streak>=14?"⭐ Dos semanas crack":item.streak>=7?"🔥 ¡Una semana!":"🔥 ¡Tres días seguidos!";
    return(
      <div className="feed-card streak-card">
        <div className="feed-head">
          <div className="feed-avi">{who.avatar}</div>
          <div style={{flex:1,minWidth:0}}><div className="feed-name">{isMe?"Tú":who.name}</div><div className="feed-when">{relTime(item.created_at)}</div></div>
          <div style={{background:"rgba(240,168,50,.15)",border:"1px solid rgba(240,168,50,.3)",borderRadius:20,padding:"3px 10px",fontSize:10,fontWeight:700,color:"var(--amber)",letterSpacing:1,textTransform:"uppercase",flexShrink:0}}>Racha</div>
        </div>
        <div className="feed-streak-wrap">
          <div className="feed-streak-num">🔥{item.streak}</div>
          <div><div className="feed-streak-lbl">{lbl}</div><div className="feed-streak-sub">{item.streak} días consecutivos</div></div>
        </div>
        <div className="card-footer"><ReactionsBar feedType="streak" feedRef={item.ref} userId={userId} reactions={reactions} onReact={onReact}/><button className="chat-link-btn" onClick={()=>onSendToChat(item)}>💬 Chat</button></div>
      </div>
    );
  }
  if(item.type==="bet_open"||item.type==="bet_won"){
    return <BetFeedCard item={item as FeedBetItem} userId={userId} reactions={reactions} onReact={onReact} betStakes={betStakes} onBetStake={onBetStake} onSendToChat={onSendToChat}/>;
  }
  if(item.type==="dispute"){
    const d=item.dispute;
    const vs=disputeVotes.filter(v=>v.dispute_id===d.id);
    const st=computeDisputeStatus(d,vs,totalMembers);
    const habit=QUESTIONS.find(q=>q.id===d.habit_id);
    const who=members[d.disputed_user]||{name:"?",avatar:"👤"};
    const challenger=members[d.challenger]||{name:"?",avatar:"👤"};
    const stColor=st.status==="failed"?"#F2667A":st.status==="passed"?"#7BC97A":"var(--amber)";
    const stLabel=st.status==="active"?`activa ${Math.round(st.hoursLeft)}h`:st.status==="failed"?"punto reducido":"mantenido";
    return(
      <div className="feed-card dispute-card-feed">
        <div className="feed-head">
          <div className="feed-avi">⚖️</div>
          <div style={{flex:1,minWidth:0}}>
            <div className="feed-name">{challenger.avatar} <b>{challenger.name}</b><span style={{fontWeight:400,color:"var(--muted)"}}> disputa a </span>{who.avatar} <b>{who.name}</b></div>
            <div className="feed-when">{relTime(d.created_at)} · {habit?habit.icon+" "+habit.name:d.habit_id}</div>
          </div>
          <div style={{background:"rgba(0,0,0,.2)",border:`1px solid ${stColor}60`,borderRadius:20,padding:"3px 9px",fontSize:10,fontWeight:700,color:stColor,flexShrink:0,whiteSpace:"nowrap"}}>{stLabel}</div>
        </div>
        {d.reason&&<div style={{fontSize:12,color:"var(--muted)",background:"var(--s2)",borderRadius:8,padding:"7px 10px",marginBottom:8,fontStyle:"italic"}}>"{d.reason}"</div>}
        {!st.closed&&d.disputed_user!==userId&&(()=>{
          const myVote=vs.find(v=>v.voter_id===userId);
          return(<div className="dispute-votes">
            <button className={"dispute-vote-btn support"+(myVote?.vote==="support"?" mine":"")} onClick={()=>onVote&&onVote(d.id,"support")}>✅ Mantener · {st.supports}</button>
            <button className={"dispute-vote-btn reject"+(myVote?.vote==="reject"?" mine":"")} onClick={()=>onVote&&onVote(d.id,"reject")}>❌ Reducir · {st.rejects}</button>
          </div>);
        })()}
        {st.closed&&<div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"var(--muted)",marginBottom:4}}><span>✅ {st.supports} mantener</span><span>❌ {st.rejects} reducir</span><span>{vs.length}/{Math.max(0,totalMembers-1)} votos</span></div>}
        <div className="card-footer"><ReactionsBar feedType="dispute" feedRef={item.ref} userId={userId} reactions={reactions} onReact={onReact}/><button className="chat-link-btn" onClick={()=>onSendToChat(item)}>💬 Chat</button></div>
      </div>
    );
  }
  return null;
}

/* ══════════════════════════════════════════ FEED */
function Feed({user,group,members,disputes,disputeVotes,bets,reactions,onReact,totalMembers,betStakes,onBetStake,onSendToChat,onVote,onDispute}:{user:any;group:any;members:Record<string,{name:string;avatar:string}>;disputes:Dispute[];disputeVotes:DisputeVote[];bets:Bet[];reactions:FeedReaction[];onReact:(ft:string,fr:string,e:string)=>void;totalMembers:number;betStakes:Record<number,BetStake>;onBetStake:(id:number,side:1|2,amt:number)=>void;onSendToChat:(item:FeedItem)=>void;onVote:(id:number,v:"support"|"reject")=>Promise<void>;onDispute?:(uid:string)=>void}){
  const [logs,setLogs]=useState<any[]>([]);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    if(!group?.id)return;
    (async()=>{
      setLoading(true);
      const since=new Date(Date.now()-7*24*3600*1000).toISOString().split("T")[0];
      const{data}=await sb.from("daily_logs").select("*").eq("group_id",group.id).gte("date",since).order("created_at",{ascending:false}).limit(40);
      setLogs(data||[]);
      setLoading(false);
    })();
  },[group?.id]);

  const items:FeedItem[]=[];
  const byUser:Record<string,any[]>={};
  for(const log of logs){
    if(!byUser[log.user_id])byUser[log.user_id]=[];
    byUser[log.user_id].push(log);
    const habits=QUESTIONS.filter(q=>(log as any)[q.id]);
    const pts=habits.reduce((s,q)=>s+q.pts,0);
    items.push({type:"log",ref:`${log.user_id}:${log.date}`,user_id:log.user_id,date:log.date,habits,pts,created_at:log.created_at} as FeedLogItem);
  }
  // Streak milestone cards
  const today=todayStr();
  for(const [uid,userLogs] of Object.entries(byUser)){
    const dates=userLogs.map((l:any)=>l.date).sort((a:string,b:string)=>b.localeCompare(a));
    if(dates[0]!==today)continue;
    let s=0; const check=new Date();
    for(let i=0;i<7;i++){
      const d=check.toISOString().split("T")[0];
      if(dates.includes(d)){s++;check.setDate(check.getDate()-1);}else break;
    }
    if(STREAK_MILESTONES.includes(s)){
      const todayLog=userLogs.find((l:any)=>l.date===today);
      items.push({type:"streak",ref:`streak:${uid}:${s}:${today}`,user_id:uid,streak:s,date:today,created_at:todayLog?.created_at||new Date().toISOString()} as FeedStreakItem);
    }
  }
  // Disputes
  for(const d of disputes) items.push({type:"dispute",ref:`dispute:${d.id}`,dispute:d,created_at:d.created_at} as FeedDisputeItem);
  // Bets
  for(const b of bets){
    if(b.status==="open") items.push({type:"bet_open",ref:`bet:${b.id}`,bet:b,created_at:new Date(Date.now()-b.id*3600000).toISOString()} as FeedBetItem);
    else if(b.status==="won") items.push({type:"bet_won",ref:`betwon:${b.id}`,bet:b,created_at:new Date(Date.now()-b.id*7200000).toISOString()} as FeedBetItem);
  }
  items.sort((a,b)=>new Date(b.created_at).getTime()-new Date(a.created_at).getTime());

  if(loading)return <div style={{textAlign:"center",padding:"28px 0",color:"var(--muted)",fontSize:13}}>Cargando actividad…</div>;
  if(items.length===0)return <div className="feed-empty">No hay actividad reciente.<br/>¡Apunta tu primer día y aparecerás aquí!</div>;
  return(
    <div className="feed">
      <div style={{fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"var(--muted)",fontWeight:500,marginBottom:2}}>Actividad reciente</div>
      {items.map(item=>(
        <FeedCard key={item.ref} item={item} userId={user.id} members={members} reactions={reactions} onReact={onReact} disputeVotes={disputeVotes} totalMembers={totalMembers} betStakes={betStakes} onBetStake={onBetStake} onSendToChat={onSendToChat} onVote={onVote} onDispute={onDispute}/>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════ USER PROFILE MODAL */
function UserProfileModal({userId,currentUserId,group,members,adjRanking,streak,profile,onClose,onDispute,onSignOut}:{userId:string;currentUserId:string;group:any;members:Record<string,{name:string;avatar:string}>;adjRanking:any[];streak:number;profile:any;onClose:()=>void;onDispute?:()=>void;onSignOut?:()=>void}){
  const isMe=userId===currentUserId;
  const who=isMe?{name:profile?.name||"?",avatar:profile?.avatar||"👤"}:(members[userId]||{name:"?",avatar:"👤"});
  const rankRow=adjRanking.find(r=>r.user_id===userId);
  const pos=adjRanking.findIndex(r=>r.user_id===userId)+1;
  const [recentLogs,setRecentLogs]=useState<any[]>([]);
  const [loadingLogs,setLoadingLogs]=useState(true);
  useEffect(()=>{
    (async()=>{
      const{data}=await sb.from("daily_logs").select("*").eq("user_id",userId).eq("group_id",group.id).order("date",{ascending:false}).limit(7);
      setRecentLogs(data||[]); setLoadingLogs(false);
    })();
  },[userId]);
  const profileStreak=isMe?streak:(()=>{
    if(!recentLogs.length)return 0;
    const dates=recentLogs.map((l:any)=>l.date).sort((a:string,b:string)=>b.localeCompare(a));
    let s=0; const check=new Date();
    for(let i=0;i<7;i++){const d=check.toISOString().split("T")[0];if(dates.includes(d)){s++;check.setDate(check.getDate()-1);}else break;}
    return s;
  })();
  return(
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={e=>e.stopPropagation()}>
        <div className="handle"/>
        <div className="pm-head">
          <div className="pm-avi">{who.avatar}</div>
          <div style={{flex:1}}>
            <div className="pm-name">{who.name}{isMe?" (tú)":""}</div>
            {isMe&&profile?.username&&<div className="pm-sub">@{profile.username}</div>}
            {isMe&&profile?.role==="admin"&&<div className="admin-badge" style={{marginTop:4}}>⚙️ Admin</div>}
            {pos>0&&<div style={{fontSize:12,color:"var(--amber)",fontWeight:600,marginTop:5}}>#{pos} en el ranking</div>}
          </div>
        </div>
        <div className="stats-row" style={{marginBottom:16}}>
          <div className="stat"><div className="stat-val" style={{color:"var(--amber)"}}>{rankRow?.total_pts||0}</div><div className="stat-lbl">Puntos</div></div>
          <div className="stat"><div className="stat-val">{rankRow?.days_logged||0}</div><div className="stat-lbl">Días</div></div>
          <div className="stat"><div className="stat-val">🔥{profileStreak}</div><div className="stat-lbl">Racha</div></div>
        </div>
        {!loadingLogs&&recentLogs.length>0&&<>
          <div style={{fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"var(--muted)",marginBottom:8}}>Últimos días</div>
          {recentLogs.slice(0,5).map((log:any)=>{
            const habits=QUESTIONS.filter(q=>(log as any)[q.id]);
            const pts=habits.reduce((s,q)=>s+q.pts,0);
            return(
              <div key={log.date} className="pm-log-row">
                <div><div className="pm-log-date">{log.date}</div><div style={{display:"flex",gap:3,flexWrap:"wrap"}}>{habits.slice(0,5).map(h=><span key={h.id} style={{fontSize:14}}>{h.icon}</span>)}{habits.length>5&&<span style={{fontSize:11,color:"var(--muted)"}}>+{habits.length-5}</span>}</div></div>
                <div className="pm-log-pts">+{pts}</div>
              </div>
            );
          })}
        </>}
        {isMe&&<div className="invite" style={{marginTop:16}}>
          <div style={{fontSize:10,color:"var(--muted)",letterSpacing:1.5,textTransform:"uppercase",marginBottom:4}}>Código — {group.name}</div>
          <div className="invite-code">{group.invite_code}</div>
          <div className="invite-sub">Comparte con tus amigos</div>
        </div>}
        {!isMe&&onDispute&&<button className="btn-ghost" style={{marginTop:14}} onClick={()=>{onClose();onDispute();}}>⚖️ Disputar punto de ayer</button>}
        {isMe&&onSignOut&&<button className="btn-danger" style={{marginTop:14}} onClick={()=>{onClose();onSignOut();}}>Cerrar sesión</button>}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════ MAIN APP */
function MainApp({user,profile,group,onSignOut}:{user:any;profile:any;group:any;onSignOut:()=>void}){
  const [tab,setTab]=useState("hoy");
  const [done,setDone]=useState<Record<string,boolean>>({});
  const [saved,setSaved]=useState(false);
  const [saving,setSaving]=useState(false);
  const [ranking,setRanking]=useState<any[]>([]);
  const [streak,setStreak]=useState(0);
  const [loadingRank,setLR]=useState(false);
  const [bets,setBets]=useState<Bet[]>(BETS_INIT);
  const [betsTab,setBT]=useState<"activas"|"historial">("activas");
  const [disputes,setDisputes]=useState<Dispute[]>([]);
  const [disputeVotes,setDisputeVotes]=useState<DisputeVote[]>([]);
  const [disputeModal,setDisputeModal]=useState<string|null>(null);
  const [showDisputes,setShowDisputes]=useState(false);
  const [showApuntar,setShowApuntar]=useState(false);
  const [reactions,setReactions]=useState<FeedReaction[]>([]);
  const [profileModal,setProfileModal]=useState<string|null>(null);
  const [members,setMembers]=useState<Record<string,{name:string;avatar:string}>>({});
  const [weekDays,setWeekDays]=useState<boolean[]>([false,false,false,false,false,false,false]);
  const [betStakes,setBetStakes]=useState<Record<number,BetStake>>({});
  const [sharedEvent,setSharedEvent]=useState<SharedEvent|null>(null);
  const [weekLeaders,setWeekLeaders]=useState<Record<string,string>>({});
  const [userRecords,setUserRecords]=useState<Record<string,string>>({});
  const [editingRecords,setEditingRecords]=useState(false);
  const [draftRecords,setDraftRecords]=useState<Record<string,string>>({});
  const [ambitoTotals,setAmbitoTotals]=useState<Record<string,number>>({});
  const [habitCounts,setHabitCounts]=useState<Record<string,number>>({});
  const [last7Logs,setLast7Logs]=useState<{date:string;pts:number}[]>([]);

  const pts=calcPts(done);
  const isAdmin=profile?.role==="admin";
  const myPos=ranking.findIndex(r=>r.user_id===user.id)+1;
  const myRow=ranking.find(r=>r.user_id===user.id);

  async function loadMembers(){
    const{data:gm}=await sb.from("group_members").select("user_id").eq("group_id",group.id);
    const ids=(gm||[]).map((r:any)=>r.user_id);
    if(!ids.length)return;
    const{data:us}=await sb.from("users").select("id,name,avatar").in("id",ids);
    const map:Record<string,{name:string;avatar:string}>={};
    (us||[]).forEach((u:any)=>{map[u.id]={name:u.name||"?",avatar:u.avatar||"👤"};});
    setMembers(map);
  }

  async function loadProfileData(){
    const{data}=await sb.from("daily_logs").select("*").eq("user_id",user.id).eq("group_id",group.id).order("date",{ascending:false}).limit(365);
    if(!data)return;
    const at:Record<string,number>={};
    const hc:Record<string,number>={};
    for(const row of data){
      for(const q of QUESTIONS){if((row as any)[q.id])hc[q.id]=(hc[q.id]||0)+1;}
      for(const a of AMBITOS){
        let p=0;
        for(const hId of a.habits){const q=QUESTIONS.find(x=>x.id===hId);if(q&&(row as any)[hId])p+=q.pts;}
        at[a.id]=(at[a.id]||0)+p;
      }
    }
    setAmbitoTotals(at);
    setHabitCounts(hc);
    const l7=data.slice(0,7).map(row=>{const p=QUESTIONS.reduce((s,q)=>(row as any)[q.id]?s+q.pts:s,0);return{date:row.date,pts:p};});
    setLast7Logs(l7);
  }

  async function loadRecords(){
    const{data}=await sb.from("user_records").select("record_key,record_value").eq("user_id",user.id);
    if(data){const r:Record<string,string>={};data.forEach((row:any)=>{r[row.record_key]=row.record_value;});setUserRecords(r);}
  }
  async function saveRecords(draft:Record<string,string>){
    const rows=Object.entries(draft).filter(([,v])=>v.trim()!=="").map(([k,v])=>({user_id:user.id,record_key:k,record_value:v.trim()}));
    if(rows.length>0) await sb.from("user_records").upsert(rows,{onConflict:"user_id,record_key"});
    const toDelete=Object.entries(draft).filter(([,v])=>v.trim()==="").map(([k])=>k);
    for(const k of toDelete) await sb.from("user_records").delete().eq("user_id",user.id).eq("record_key",k);
    setUserRecords(draft);
  }
  async function loadWeekLeaders(){
    const mon=getMondayStr();
    const{data}=await sb.from("daily_logs")
      .select("user_id,gym,running,sport,quedada,familia,food,screen_good,pareja,book,course,podcast,meditation")
      .eq("group_id",group.id).gte("date",mon);
    if(!data)return;
    const counts:Record<string,Record<string,number>>={};
    for(const row of data){
      const uid=row.user_id;
      if(!counts[uid])counts[uid]={};
      for(const q of QUESTIONS){if((row as any)[q.id])counts[uid][q.id]=(counts[uid][q.id]||0)+1;}
    }
    const leaders:Record<string,string>={};
    for(const q of QUESTIONS){
      let best=0,bestUid='';
      for(const [uid,hc] of Object.entries(counts)){
        const n=(hc[q.id]||0);if(n>best){best=n;bestUid=uid;}
      }
      if(bestUid&&best>0)leaders[q.id]=bestUid;
    }
    setWeekLeaders(leaders);
  }

  async function loadWeekDays(){
    try{
      const mon=getMondayStr();
      const{data}=await sb.from("daily_logs").select("date").eq("user_id",user.id).eq("group_id",group.id).gte("date",mon);
      const days=[false,false,false,false,false,false,false];
      (data||[]).forEach((r:any)=>{const d=new Date(r.date+"T12:00:00");const idx=(d.getDay()+6)%7;if(idx>=0&&idx<7)days[idx]=true;});
      setWeekDays(days);
    }catch(_){}
  }

  async function loadDisputes(){
    if(!group?.id)return;
    const since=new Date(Date.now()-48*3600*1000).toISOString();
    const{data:ds}=await sb.from("disputes").select("*").eq("group_id",group.id).gte("created_at",since).order("created_at",{ascending:false});
    setDisputes((ds||[]) as Dispute[]);
    if(ds&&ds.length){
      const ids=ds.map((d:any)=>d.id);
      const{data:vs}=await sb.from("dispute_votes").select("*").in("dispute_id",ids);
      setDisputeVotes((vs||[]) as DisputeVote[]);
    }else setDisputeVotes([]);
  }

  useEffect(()=>{
    if(!group?.id)return;
    loadDisputes();
    const ch=sb.channel("disputes:"+group.id)
      .on("postgres_changes",{event:"*",schema:"public",table:"disputes",filter:"group_id=eq."+group.id},()=>loadDisputes())
      .on("postgres_changes",{event:"*",schema:"public",table:"dispute_votes"},()=>loadDisputes())
      .subscribe();
    const iv=setInterval(loadDisputes,10000);
    return()=>{sb.removeChannel(ch);clearInterval(iv);};
  },[group?.id]);

  async function castVote(disputeId:number,v:"support"|"reject"){
    setDisputeVotes(prev=>{
      const without=prev.filter(x=>!(x.dispute_id===disputeId&&x.voter_id===user.id));
      return[...without,{dispute_id:disputeId,voter_id:user.id,vote:v,created_at:new Date().toISOString()}];
    });
    const{error}=await sb.from("dispute_votes").upsert({dispute_id:disputeId,voter_id:user.id,vote:v},{onConflict:"dispute_id,voter_id"});
    if(error){alert("No se pudo votar: "+error.message);loadDisputes();}
    else loadDisputes();
  }

  const totalMembers=Math.max(ranking.length,1);
  const penalties:Record<string,number>={};
  for(const d of disputes){
    const vs=disputeVotes.filter(v=>v.dispute_id===d.id);
    const st=computeDisputeStatus(d,vs,totalMembers);
    if(st.status==="failed") penalties[d.disputed_user]=(penalties[d.disputed_user]||0)+disputePenalty(d.habit_id);
  }
  const adjRanking=[...ranking].map((r:any)=>({...r,penalty:penalties[r.user_id]||0,total_pts:Math.max(0,(r.total_pts||0)-(penalties[r.user_id]||0))})).sort((a:any,b:any)=>(b.total_pts||0)-(a.total_pts||0));
  const top3=adjRanking.slice(0,3);
  const rest=adjRanking.slice(3);

  async function loadToday(){
    const{data}=await sb.from("daily_logs").select("*").eq("user_id",user.id).eq("group_id",group.id).eq("date",todayStr()).maybeSingle();
    if(!data)return; setSaved(true);
    const d:Record<string,boolean>={};
    QUESTIONS.forEach(q=>{if((data as any)[q.id])d[q.id]=true;});
    setDone(d);
  }
  async function loadRanking(){
    setLR(true);
    const{data}=await sb.from("group_ranking").select("*").eq("group_id",group.id).order("total_pts",{ascending:false});
    setRanking(data||[]); setLR(false);
  }
  async function loadStreak(){
    // Racha solo cuenta días con al menos 1 hábito de Deporte (gym, running, sport)
    const{data}=await sb.from("daily_logs").select("date,gym,running,sport").eq("user_id",user.id).eq("group_id",group.id).order("date",{ascending:false}).limit(90);
    if(!data?.length)return;
    const deporteDays=data.filter((r:any)=>r.gym||r.running||r.sport);
    let s=0; const today=new Date();today.setHours(0,0,0,0);
    const dates=deporteDays.map((r:any)=>{const d=new Date(r.date);d.setHours(0,0,0,0);return d.getTime();});
    for(let i=0;i<90;i++){const exp=new Date(today);exp.setDate(today.getDate()-i);if(dates.includes(exp.getTime()))s++;else break;}
    setStreak(s);
  }
  async function saveDay(){
    const anyDone=Object.values(done).some(Boolean);
    if(!anyDone||saved||saving)return; setSaving(true);
    const payload:any={user_id:user.id,group_id:group.id,date:todayStr(),total_pts:pts};
    QUESTIONS.forEach(q=>{payload[q.id]=!!done[q.id];});
    const{error}=await sb.from("daily_logs").upsert(payload,{onConflict:"user_id,group_id,date"});
    setSaving(false);
    if(error){alert("Error: "+error.message);return;}
    setSaved(true); setShowApuntar(false);
    loadRanking(); loadStreak();
  }
  function toggle(id:string){if(saved||saving)return; setDone(d=>({...d,[id]:!d[id]}));}

  async function loadReactions(){
    try{
      const{data,error}=await sb.from("feed_reactions").select("*").eq("group_id",group.id);
      if(error){console.log("[reactions] tabla no disponible aún:",error.message);return;}
      setReactions(data||[]);
    }catch(e){console.log("[reactions] error:",e);}
  }
  async function handleReact(feedType:string,feedRef:string,emoji:string){
    const existing=reactions.find(r=>r.user_id===user.id&&r.feed_ref===feedRef&&r.emoji===emoji);
    if(existing){
      setReactions(prev=>prev.filter(r=>!(r.user_id===user.id&&r.feed_ref===feedRef&&r.emoji===emoji)));
      try{await sb.from("feed_reactions").delete().eq("user_id",user.id).eq("feed_ref",feedRef).eq("emoji",emoji);}catch(_){}
    }else{
      const opt:FeedReaction={id:Date.now(),user_id:user.id,group_id:group.id,feed_type:feedType,feed_ref:feedRef,emoji};
      setReactions(prev=>[...prev,opt]);
      try{await sb.from("feed_reactions").insert({group_id:group.id,user_id:user.id,feed_type:feedType,feed_ref:feedRef,emoji});}
      catch(_){setReactions(prev=>prev.filter(r=>!(r.user_id===user.id&&r.feed_ref===feedRef&&r.emoji===emoji)));}
    }
  }

  function handleBetStake(betId:number,side:1|2,amount:number){
    setBetStakes(prev=>({...prev,[betId]:{side,amount,confirmed:true}}));
  }

  function handleSendToChat(item:FeedItem){
    let text="";let color="var(--amber)";
    if(item.type==="log"){const who=members[(item as FeedLogItem).user_id]||{name:"?"};text=`${who.name} registró ${(item as FeedLogItem).pts} pts`;color="var(--amber)";}
    else if(item.type==="streak"){const who=members[(item as FeedStreakItem).user_id]||{name:"?"};text=`${who.name} lleva ${(item as FeedStreakItem).streak} días seguidos`;color="#F0A832";}
    else if(item.type==="bet_open"){text=`Duelo: ${(item as FeedBetItem).bet.label}`;color="var(--blue)";}
    else if(item.type==="bet_won"){text=`Apuesta ganada: ${(item as FeedBetItem).bet.label}`;color="var(--green)";}
    else if(item.type==="dispute"){const d=(item as FeedDisputeItem).dispute;const who=members[d.disputed_user]||{name:"?"};text=`Disputa a ${who.name}`;color="#F2667A";}
    setSharedEvent({text,color});
    setTab("chat");
  }

  useEffect(()=>{loadToday();loadRanking();loadStreak();loadMembers();loadReactions();loadWeekDays();
    loadWeekLeaders();
    loadProfileData();},[]);

  function closeBet(betId:number,winner:1|2){setBets(bs=>bs.map(b=>b.id===betId?{...b,status:"won",myPick:winner}:b));}
  function cancelBet(betId:number){setBets(bs=>bs.map(b=>b.id===betId?{...b,status:"cancelled"}:b));}

  return(
    <div className="app">
      {/* TOPBAR */}
      <div className="tb">
        <div className="tb-logo">
          <svg width="20" height="16" viewBox="0 0 20 16" fill="none"><rect x="6" y="3" width="8" height="13" rx="2" fill="var(--amber)"/><rect x="0" y="7" width="6" height="9" rx="2" fill="#9B9B9B" opacity=".9"/><rect x="14" y="9" width="6" height="7" rx="2" fill="#CD7F32"/></svg>
          <span className="tb-logo-word">Podium</span>
        </div>
        <div className="tb-r">
          <div className="gchip"><div className="gdot" style={{background:group.color||"var(--amber)"}}/><span className="gname">{group.emoji} {group.name}</span></div>
          {bets.filter(b=>b.status==="open").length>0&&<div className="bets-chip" onClick={()=>setTab("bets")}><span className="bets-chip-ico">⚡</span><span className="bets-chip-n">{bets.filter(b=>b.status==="open").length}</span></div>}
        </div>
      </div>

      {/* HOY */}
      {tab==="hoy"&&(
        <div className="content" key="hoy">
          <TodayBanner weekPts={myRow?.total_pts||pts} streak={streak} saved={saved} done={done} onApuntar={()=>setShowApuntar(true)} myPos={myPos} weekDays={weekDays}/>
          <Feed user={user} group={group} members={members} disputes={disputes} disputeVotes={disputeVotes} bets={bets} reactions={reactions} onReact={handleReact} totalMembers={totalMembers} betStakes={betStakes} onBetStake={handleBetStake} onSendToChat={handleSendToChat} onVote={castVote} onDispute={(uid)=>{setProfileModal(null);setDisputeModal(uid);}}/>
        </div>
      )}

      {/* RANKING */}
      {tab==="rank"&&(
        <div className="content" key="rank">
          <div className="rank-hero">
            <div className="rh-top">
              <span className="rh-lbl">{group.emoji} {group.name}</span>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <button className="disputes-btn" onClick={()=>setShowDisputes(true)}>⚖️ Disputas{disputes.length?` (${disputes.length})`:""}</button>
                <button className="rh-btn" onClick={loadRanking}>{loadingRank?"...":"↻ actualizar"}</button>
              </div>
            </div>
            {loadingRank&&<div style={{textAlign:"center",padding:20}}><div className="spin" style={{margin:"0 auto"}}/></div>}
            {!loadingRank&&ranking.length===0&&<div className="empty">Nadie ha registrado actividad todavía.<br/>¡Guarda tu primer día!</div>}
            {!loadingRank&&top3.length>0&&(
              <div className="podium-row">
                {top3[1]&&<div className="pc" onClick={()=>setProfileModal(top3[1].user_id)}>
                  <div className="pavi p2">{top3[1].avatar||"🐺"}</div>
                  <div className="pname">{top3[1].name}</div><div className="ppts">{top3[1].total_pts} pts</div>
                  <div className="pblk p2"><span className="pnum p2">2</span></div>
                </div>}
                <div className="pc" onClick={()=>setProfileModal(top3[0].user_id)}>
                  <div style={{fontSize:11,color:"var(--amber)",textAlign:"center",marginBottom:3}}>👑</div>
                  <div className="pavi p1">{top3[0].avatar||"🐺"}</div>
                  <div className="pname">{top3[0].name}</div><div className="ppts">{top3[0].total_pts} pts</div>
                  <div className="pblk p1"><span className="pnum p1">1</span></div>
                </div>
                {top3[2]&&<div className="pc" onClick={()=>setProfileModal(top3[2].user_id)}>
                  <div className="pavi p3">{top3[2].avatar||"🐺"}</div>
                  <div className="pname">{top3[2].name}</div><div className="ppts">{top3[2].total_pts} pts</div>
                  <div className="pblk p3"><span className="pnum p3">3</span></div>
                </div>}
              </div>
            )}
          </div>
          {rest.length>0&&(
            <div className="rank-list">
              {rest.map((p:any,i:number)=>(
                <div key={p.user_id} className={`rrow${p.user_id===user.id?" me":""}`} onClick={()=>setProfileModal(p.user_id)}>
                  <div className="rn">{i+4}</div>
                  <div className="ravi">{p.avatar||"🐺"}</div>
                  <div className="rinfo">
                    <div className="rname">{p.name}{p.user_id===user.id?" · Tú":""}</div>
                    <div className="rdetail">{p.days_logged} días{p.penalty?<span className="rr-penalty">−{p.penalty}pts disputa</span>:null}</div>
                  </div>
                  <div className="rright"><div className="rpts">{p.total_pts}</div></div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* APUESTAS */}
      {tab==="bets"&&(
        <div className="content content-fab" key="bets">
          <div style={{background:"rgba(240,168,50,.07)",border:"1px solid rgba(240,168,50,.25)",borderRadius:14,padding:"12px 14px",marginBottom:14}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
              <span style={{fontSize:18}}>⚡</span>
              <span style={{fontWeight:800,fontSize:14,color:"var(--text)"}}>Cómo funciona</span>
            </div>
            <div style={{fontSize:12,color:"var(--muted)",lineHeight:1.5}}>
              Apuesta <b style={{color:"var(--text)"}}>1–10 pts</b> por un lado · el ganador <b style={{color:"var(--amber)"}}>dobla</b> · el perdedor se queda a <b style={{color:"var(--text)"}}>0</b>. No acumulan del día.
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
            <span className="section-lbl" style={{margin:0}}>Apuestas activas</span>
            <span style={{fontSize:11,color:"var(--muted)"}}>{bets.filter(b=>b.status==="open").length} abiertas</span>
          </div>
          <div className="bets-tabs">
            {(([["activas","⚔️ Activas"],["historial","📋 Historial"]] as ["activas"|"historial",string][])).map(([v,l])=>(
              <div key={v} className={`btab${betsTab===v?" on":""}`} onClick={()=>setBT(v)}>{l}</div>
            ))}
          </div>
          {(betsTab==="activas"?bets.filter(b=>b.status==="open"):bets.filter(b=>b.status!=="open")).map(b=>{
            const s=b.status;
            return(
              <div key={b.id} className={`bet-card ${s!=="open"?s:""}`}>
                <div className="bet-header">
                  <span className="bet-type-lbl">{b.label}</span>
                  <span className={`bet-pot ${s==="open"?"open":s}`}>{s==="won"?"✓ Ganaste ":s==="lost"?"✗ Perdiste ":s==="cancelled"?"✗ Anulada ":""}⚡{b.pot} pts</span>
                </div>
                <div className="bet-vs">
                  <div className="bet-player"><div className="bet-avi">{b.p1Avi}</div><div className="bet-pname">{b.p1Name}</div><div className="bet-pstat">{b.p1Pts} pts</div></div>
                  <div className="bet-vs-lbl">VS</div>
                  <div className="bet-player"><div className="bet-avi">{b.p2Avi}</div><div className="bet-pname">{b.p2Name}</div><div className="bet-pstat">{b.p2Pts} pts</div></div>
                </div>
                {s==="open"&&!b.myPick&&<div className="bet-actions">
                  <button className="bet-btn" onClick={()=>setBets(bs=>bs.map(x=>x.id===b.id?{...x,myPick:1}:x))}>Por {b.p1Name}</button>
                  <button className="bet-btn" onClick={()=>setBets(bs=>bs.map(x=>x.id===b.id?{...x,myPick:2}:x))}>Por {b.p2Name}</button>
                </div>}
                {b.myPick&&s==="open"&&<div className="my-pick">✓ Apostaste por <b style={{marginLeft:4}}>{b.myPick===1?b.p1Name:b.p2Name}</b></div>}
                {s!=="open"&&b.myPick&&<div className="my-pick">Tu apuesta: <b style={{marginLeft:4}}>{b.myPick===1?b.p1Name:b.p2Name}</b></div>}
                {s==="open"&&<div className="bet-timer">⏱ {b.ends}</div>}
                {isAdmin&&s==="open"&&<div style={{marginTop:10,paddingTop:10,borderTop:"1px solid var(--border)"}}>
                  <div style={{fontSize:10,color:"var(--amber)",letterSpacing:1.5,textTransform:"uppercase",marginBottom:6}}>⚙️ Admin</div>
                  <div style={{display:"flex",gap:6}}>
                    <button className="bet-btn" style={{fontSize:11,borderColor:"rgba(93,201,138,.3)",color:"var(--green)"}} onClick={()=>closeBet(b.id,1)}>✓ Gana {b.p1Name}</button>
                    <button className="bet-btn" style={{fontSize:11,borderColor:"rgba(93,201,138,.3)",color:"var(--green)"}} onClick={()=>closeBet(b.id,2)}>✓ Gana {b.p2Name}</button>
                    <button className="bet-btn" style={{fontSize:11,borderColor:"rgba(255,68,68,.3)",color:"var(--red)"}} onClick={()=>cancelBet(b.id)}>✗ Anular</button>
                  </div>
                </div>}
              </div>
            );
          })}
          {(betsTab==="activas"?bets.filter(b=>b.status==="open"):bets.filter(b=>b.status!=="open")).length===0&&<div className="empty">{betsTab==="activas"?"No hay apuestas activas.":"No hay historial todavía."}</div>}
          <button className="new-bet-btn">⚔️ Crear nueva apuesta</button>
        </div>
      )}

      {/* CHAT */}
      {tab==="chat"&&<ChatTab user={user} group={group} profile={profile} sharedEvent={sharedEvent} onClearShared={()=>setSharedEvent(null)}/>}

      {/* PERFIL */}
      {tab==="perfil"&&(
        <div className="content" key="perfil">
          <div className="prof-card">
            <div className="prof-top">
              <div className="prof-avi">{profile?.avatar||"🐺"}</div>
              <div style={{flex:1}}>
                <div className="prof-name">{profile?.name}</div>
                <div className="prof-handle">@{profile?.username}</div>
                {isAdmin&&<div className="admin-badge">⚙️ Admin</div>}
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:30,fontWeight:900,color:"var(--amber)",lineHeight:1}}>{myPos||"—"}</div>
                <div style={{fontSize:10,color:"var(--muted)",letterSpacing:1,textTransform:"uppercase"}}>posición</div>
              </div>
            </div>
          </div>
          <div className="stats-row">
            <div className="stat"><div className="stat-val" style={{color:"var(--amber)"}}>{myRow?.total_pts||0}</div><div className="stat-lbl">Puntos</div></div>
            <div className="stat"><div className="stat-val">{myRow?.days_logged||0}</div><div className="stat-lbl">Días</div></div>
            <div className="stat"><div className="stat-val">🔥{streak}</div><div className="stat-lbl">Racha 💪</div></div>
          </div>

          {/* PUNTOS POR ÁMBITO */}
          <span className="section-lbl" style={{display:"block",marginTop:14}}>Puntos por ámbito</span>
          {AMBITOS.map(a=>{
            const total=ambitoTotals[a.id]||0;
            const maxPossible=Math.max(...Object.values(ambitoTotals),1);
            return(
              <div key={a.id} className="ambito-bar-wrap">
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontSize:13,fontWeight:600,color:"var(--text)"}}>{a.icon} {a.label}</span>
                  <span style={{fontSize:13,fontWeight:800,color:"var(--text)"}}>{total}</span>
                </div>
                <div className="ambito-bar-track">
                  <div className="ambito-bar-fill" style={{width:`${maxPossible>0?Math.round(total/maxPossible*100):0}%`,background:a.color}}/>
                </div>
              </div>
            );
          })}

          {/* ÚLTIMOS 7 DÍAS */}
          {last7Logs.length>0&&(<>
            <span className="section-lbl" style={{display:"block",marginTop:14}}>Últimos 7 días</span>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"var(--muted)",marginBottom:4}}>
              <span>hace 7d</span><span>hoy</span>
            </div>
            <div className="last7-row">
              {[...last7Logs].reverse().map((d,i)=>{
                const day=new Date(d.date+"T12:00:00");
                const lbl=["L","M","X","J","V","S","D"][day.getDay()===0?6:day.getDay()-1];
                const maxPts=Math.max(...last7Logs.map(x=>x.pts),1);
                const h=Math.max(14,Math.round(d.pts/maxPts*52));
                return(
                  <div key={i} className="last7-cell">
                    <div className="last7-bar" style={{height:h,background:d.pts>0?"rgba(240,168,50,.18)":"var(--s2)",border:d.pts>0?"1px solid rgba(240,168,50,.3)":"1px solid var(--border)"}}>
                      {d.pts>0&&<span className="last7-pts">{d.pts}</span>}
                    </div>
                    <span className="last7-lbl">{lbl}</span>
                  </div>
                );
              })}
            </div>
          </>)}
          {/* LOGROS */}
          {(()=>{
            const WEEKLY_TITLES=[
              {id:"gym",icon:"💪",title:"La Máquina",desc:"Más días de gym esta semana"},
              {id:"running",icon:"🏃",title:"El Corredor",desc:"Más veces running esta semana"},
              {id:"sport",icon:"🎾",title:"El Deportista",desc:"Líder en deporte de grupo"},
              {id:"book",icon:"📚",title:"El Lector",desc:"El que más ha leído esta semana"},
              {id:"meditation",icon:"😴",title:"El Dormilón",desc:"Más noches de 8h esta semana"},
              {id:"food",icon:"🥗",title:"El Sano",desc:"Comida limpia líder esta semana"},
              {id:"course",icon:"📖",title:"El Estudioso",desc:"Más horas de estudio esta semana"},
              {id:"podcast",icon:"🎧",title:"El Curioso",desc:"Más podcasts educativos esta semana"},
              {id:"quedada",icon:"🍻",title:"El Social",desc:"Más quedadas con amigos"},
              {id:"screen_good",icon:"📵",title:"El Desconectado",desc:"Menos pantalla esta semana"},
            ];
            const myWeekly=WEEKLY_TITLES.filter(t=>weekLeaders[t.id]===user.id);
            const myPosAdj=adjRanking.findIndex((r:any)=>r.user_id===user.id)+1;
            if(myPosAdj===1)myWeekly.unshift({id:"rank1",icon:"👑",title:"El Intocable",desc:"Primer puesto esta semana"});
            const maxStreak=Math.max(...adjRanking.map((r:any)=>r.streak||0));
            if(streak>=7&&streak===maxStreak)myWeekly.push({id:"streak1",icon:"🔥",title:"En Llamas",desc:"Racha más larga del grupo"});
            const MILESTONES=[
              {icon:"🌱",title:"Primera semilla",desc:"1er día registrado",done:(myRow?.days_logged||0)>=1},
              {icon:"💪",title:"Semana entera",desc:"7 días registrados",done:(myRow?.days_logged||0)>=7},
              {icon:"📅",title:"Mes de hierro",desc:"30 días registrados",done:(myRow?.days_logged||0)>=30},
              {icon:"🔥",title:"Llama viva",desc:"Racha de 7 días",done:streak>=7},
              {icon:"🔱",title:"Imparable",desc:"Racha de 14 días",done:streak>=14},
              {icon:"⚡",title:"Apostador nato",desc:"1 apuesta realizada",done:Object.keys(betStakes).length>0},
              {icon:"🏅",title:"Al podio",desc:"Top 3 esta semana",done:myPosAdj>0&&myPosAdj<=3},
            ].filter(m=>m.done);
            return(<>
              <span className="section-lbl" style={{display:"block",marginTop:14}}>Badges</span>
              {[...myWeekly,...MILESTONES].length>0
                ?[...myWeekly,...MILESTONES].map((b,i)=>(
                    <div key={i} className="badge-chip">
                      <div className="badge-chip-ico">{b.icon}</div>
                      <div className="badge-chip-body">
                        <div className="badge-chip-title">{b.title}</div>
                        <div className="badge-chip-sub">{b.desc}</div>
                      </div>
                    </div>
                  ))
                :<div className="logro-none">Aún sin badges — ¡sigue apuntando!</div>}
            </>);
          })()}

          {/* RÉCORDS PERSONALES */}
          {(()=>{
            const CARDIO_RECORDS=[
              {key:"run_5k",label:"🏃 5 km",unit:"min",placeholder:"23:45"},
              {key:"run_10k",label:"🏃 10 km",unit:"min",placeholder:"52:00"},
              {key:"run_max",label:"🏃 Máxima distancia",unit:"km",placeholder:"21.0"},
              {key:"swim_500m",label:"🏊 500 m",unit:"min",placeholder:"9:30"},
              {key:"swim_max",label:"🏊 Máxima distancia",unit:"km",placeholder:"2.0"},
              {key:"bike_max",label:"🚴 Máxima distancia",unit:"km",placeholder:"50.0"},
            ];
            const GYM_RECORDS=[
              {key:"gym_deadlift",label:"💀 Peso muerto",unit:"kg",placeholder:"100"},
              {key:"gym_press",label:"🦵 Prensa",unit:"kg",placeholder:"200"},
              {key:"gym_bench",label:"🏋️ Press banca",unit:"kg",placeholder:"80"},
              {key:"gym_squat",label:"🦵 Sentadilla",unit:"kg",placeholder:"90"},
            ];
            const allRec=[...CARDIO_RECORDS,...GYM_RECORDS];
            function RecRow({r}:{r:{key:string;label:string;unit:string;placeholder:string}}){
              const val=editingRecords?(draftRecords[r.key]??userRecords[r.key]??""):userRecords[r.key];
              return(
                <div className="records-row">
                  <div className="records-label">{r.label}</div>
                  {editingRecords
                    ?<div style={{display:"flex",alignItems:"center",gap:4}}>
                       <input className="records-input" value={draftRecords[r.key]??userRecords[r.key]??""} placeholder={r.placeholder} onChange={e=>{const v=e.target.value;setDraftRecords(prev=>({...prev,[r.key]:v}));}} style={{width:64}}/>
                       <span style={{fontSize:10,color:"var(--muted)"}}>{r.unit}</span>
                     </div>
                    :<div className="records-val">{val?`${val} ${r.unit}`:<span style={{color:"var(--muted)",fontWeight:400,fontSize:11}}>—</span>}</div>
                  }
                </div>
              );
            }
            return(
              <div className="records-section">
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span className="section-lbl">📊 Récords</span>
                  {!editingRecords
                    ?<button className="records-edit-btn" onClick={()=>{setDraftRecords({...userRecords});setEditingRecords(true);}}>Editar</button>
                    :<div style={{display:"flex",gap:10}}>
                       <button className="records-edit-btn" style={{color:"var(--muted)"}} onClick={()=>setEditingRecords(false)}>Cancelar</button>
                       <button className="records-edit-btn" onClick={async()=>{await saveRecords({...userRecords,...draftRecords});setEditingRecords(false);}}>Guardar</button>
                     </div>
                  }
                </div>
                <div className="records-cat">Cardio</div>
                {CARDIO_RECORDS.map(r=><RecRow key={r.key} r={r}/>)}
                <div className="records-cat">Gym — Máx. kg</div>
                {GYM_RECORDS.map(r=><RecRow key={r.key} r={r}/>)}
              </div>
            );
          })()}

          <div className="invite">
            <div style={{fontSize:11,color:"var(--muted)",letterSpacing:1,textTransform:"uppercase",marginBottom:6}}>Código — {group.name}</div>
            <div className="invite-code">{group.invite_code}</div>
            <div className="invite-sub">Invita a tus amigos</div>
          </div>
          <button className="btn-danger" onClick={onSignOut}>Cerrar sesión</button>
        </div>
      )}

      {/* FAB — acción contextual por tab */}


      {/* NAV — 4 tabs, APUESTAS vía ⚡ topbar */}
      <nav className="nav">
        {(([["hoy","🏠","Hoy"],["rank","🏆","Ranking"],["chat","💬","Chat"]] as [string,string,string][])).map(([id,icon,label])=>(
          <button key={id} className={`nb${tab===id?" on":""}`} onClick={()=>setTab(id)}>
            <span className="nbi">{icon}</span>
            <span className="nbl">{label}</span>
            {tab===id&&<div className="nbp"/>}
          </button>
        ))}
        <button className={`nb${tab==="perfil"||tab==="bets"?" on":""}`} onClick={()=>setTab("perfil")}>
          <span className="nbi">{profile?.avatar||"👤"}</span>
          <span className="nbl">Perfil</span>
          {(tab==="perfil"||tab==="bets")&&<div className="nbp"/>}
        </button>
      </nav>

      {/* APUNTAR MODAL */}
      {showApuntar&&!saved&&<ApuntarModal done={done} saved={saved} saving={saving} onToggle={toggle} onSave={saveDay} onClose={()=>setShowApuntar(false)}/>}

      {/* PROFILE MODAL */}
      {profileModal&&<UserProfileModal
        userId={profileModal} currentUserId={user.id}
        group={group} members={members} adjRanking={adjRanking}
        streak={streak} profile={profile}
        onClose={()=>setProfileModal(null)}
        onDispute={profileModal!==user.id?()=>setDisputeModal(profileModal):undefined}
        onSignOut={profileModal===user.id?onSignOut:undefined}
      />}

      {/* DISPUTE MODAL */}
      {disputeModal&&<DisputeModal user={user} group={group} disputedUserId={disputeModal} members={members} onClose={()=>setDisputeModal(null)} onCreated={(d)=>{setDisputes(prev=>[d,...prev.filter(x=>x.id!==d.id)]);setDisputeModal(null);loadDisputes();}}/>}

      {/* DISPUTES PANEL */}
      {showDisputes&&<DisputesPanel user={user} group={group} disputes={disputes} votes={disputeVotes} members={members} totalMembers={totalMembers} onClose={()=>setShowDisputes(false)} onVote={castVote}/>}
    </div>
  );
}

/* ══════════════════════════════════════════ ROOT */
type Phase="loading"|"auth"|"join"|"app";
export default function Root(){
  const [phase,setPhase]=useState<Phase>("loading");
  const [authUser,setAuthUser]=useState<any>(null);
  const [profile,setProfile]=useState<any>(null);
  const [group,setGroup]=useState<any>(null);
  const [bootError,setBootError]=useState("");

  useEffect(()=>{
    sb.auth.getSession().then(({data:{session}})=>{
      if(session?.user)loadUserData(session.user);else setPhase("auth");
    });
    const{data:{subscription}}=sb.auth.onAuthStateChange((event)=>{
      if(event==="SIGNED_OUT"){setAuthUser(null);setProfile(null);setGroup(null);setPhase("auth");}
    });
    return()=>subscription.unsubscribe();
  },[]);

  async function loadUserData(user:any){
    try{
      const{data:prof,error:profErr}=await sb.from("users").select("*").eq("id",user.id).maybeSingle();
      if(profErr){
        const msg=profErr.message.includes("permission")||profErr.code==="42501"
          ?"Sin permisos para leer tu perfil (RLS). Detalle: "+profErr.message
          :"Error cargando perfil: "+profErr.message;
        setBootError(msg);setAuthUser(null);await sb.auth.signOut();setPhase("auth");return;
      }
      setAuthUser(user);
      if(!prof){setBootError("Login OK pero no encuentro tu fila en users (RLS sin policies).");await sb.auth.signOut();setPhase("auth");return;}
      setProfile(prof);
      const{data:membership,error:memErr}=await sb.from("group_members").select("group_id, groups(*)").eq("user_id",user.id).limit(1).maybeSingle();
      if(memErr){setBootError("Error cargando grupo: "+memErr.message);setPhase("join");return;}
      if(membership?.groups){setGroup(membership.groups);setPhase("app");}else setPhase("join");
    }catch(e:any){
      setBootError("Error inesperado: "+(e?.message||String(e)));
      await sb.auth.signOut();setPhase("auth");
    }
  }

  async function handleAuth(user:any){setBootError("");setPhase("loading");await loadUserData(user);}
  async function handleJoin(g:any){setGroup(g);setPhase("app");}
  async function handleSignOut(){await sb.auth.signOut();}

  return(
    <>
      <style>{CSS}</style>
      <div className="app">
        {phase==="loading"&&<Loading text="Iniciando Podium…"/>}
        {phase==="auth"&&<AuthScreen onAuth={handleAuth} bootError={bootError}/>}
        {phase==="join"&&authUser&&<JoinScreen userId={authUser.id} onJoin={handleJoin}/>}
        {phase==="app"&&authUser&&profile&&group&&<MainApp user={authUser} profile={profile} group={group} onSignOut={handleSignOut}/>}
      </div>
    </>
  );
}
