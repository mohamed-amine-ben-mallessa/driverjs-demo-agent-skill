#!/usr/bin/env node
/**
 * Build a Driver.js demo from CLI.
 *
 * Usage:
 *   node scripts/build.js --type tour --theme dark --name Acme --output demo.html
 *   node scripts/build.js --type form --theme cyberpunk
 *   node scripts/build.js --type spotlight --theme ocean
 *   node scripts/build.js --type interactive --theme light
 *
 * Types: tour | form | spotlight | interactive
 * Themes: light | dark | ocean | sunset | cyberpunk | mint | mono
 */

const fs = require('fs');
const path = require('path');

// ── Args ──────────────────────────────────────────────────────
function parseArgs() {
  const o = { type: 'tour', theme: 'light', name: 'MyApp', output: 'demo.html' };
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i += 2) { const k = a[i].replace('--', ''); if (k && a[i+1]) o[k] = a[i+1]; }
  return o;
}

// ── Theme CSS ─────────────────────────────────────────────────
const themes = {
  light:     { bg:'#f8fafc',surface:'#fff',hover:'#f1f5f9',border:'#e2e8f0',text:'#1e293b',muted:'#64748b',primary:'#3b82f6',pHover:'#2563eb',overlay:'#0f172a',oAlpha:0.6 },
  dark:      { bg:'#0f172a',surface:'#1e293b',hover:'#334155',border:'#334155',text:'#f1f5f9',muted:'#94a3b8',primary:'#3b82f6',pHover:'#2563eb',overlay:'#020617',oAlpha:0.85 },
  ocean:     { bg:'#ecfeff',surface:'#fff',hover:'#cffafe',border:'#a5f3fc',text:'#164e63',muted:'#0e7490',primary:'#06b6d4',pHover:'#0891b2',overlay:'#164e63',oAlpha:0.6 },
  sunset:    { bg:'#fefce8',surface:'#fff',hover:'#fef9c3',border:'#fde68a',text:'#451a03',muted:'#92400e',primary:'#f59e0b',pHover:'#d97706',overlay:'#451a03',oAlpha:0.65 },
  cyberpunk: { bg:'#0a0a0f',surface:'#12121a',hover:'#1a1a2e',border:'#2a2a3e',text:'#e0e0ff',muted:'#8888aa',primary:'#ff006e',pHover:'#cc0058',overlay:'#000',oAlpha:0.9 },
  mint:      { bg:'#f0fdf4',surface:'#fff',hover:'#dcfce7',border:'#bbf7d0',text:'#14532d',muted:'#16a34a',primary:'#22c55e',pHover:'#16a34a',overlay:'#14532d',oAlpha:0.6 },
  mono:      { bg:'#fafafa',surface:'#fff',hover:'#f5f5f5',border:'#e5e5e5',text:'#171717',muted:'#737373',primary:'#171717',pHover:'#404040',overlay:'#0a0a0a',oAlpha:0.7 },
};

function themeCss(t) {
  const dark = ['dark','cyberpunk'].includes(t);
  return `
    :root { --bg:${themes[t].bg};--surface:${themes[t].surface};--hover:${themes[t].hover};--border:${themes[t].border};--text:${themes[t].text};--muted:${themes[t].muted};--primary:${themes[t].primary};--pHover:${themes[t].pHover}; }
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:system-ui,sans-serif;background:var(--bg);color:var(--text);line-height:1.6;min-height:100vh}
    .app{display:flex;min-height:100vh}
    .sidebar{width:256px;background:var(--surface);border-right:1px solid var(--border);padding:20px 0;flex-shrink:0}
    .sidebar-logo{display:flex;align-items:center;gap:10px;padding:0 20px 20px;border-bottom:1px solid var(--border);font-weight:700;font-size:1.15rem}
    .logo-icon{width:32px;height:32px;background:var(--primary);border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800}
    .sidebar-nav{padding:12px}.nav-item{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;color:var(--muted);font-size:.88rem;cursor:pointer;transition:.15s}
    .nav-item:hover{background:var(--hover);color:var(--text)}.nav-item.active{background:var(--primary);color:#fff}
    .main{flex:1;display:flex;flex-direction:column}
    .topbar{height:60px;background:var(--surface);border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 24px;gap:14px}
    .search-wrap{flex:1;max-width:420px;position:relative}
    .search-wrap input{width:100%;padding:8px 14px 8px 36px;border:1px solid var(--border);border-radius:8px;background:var(--bg);color:var(--text);font-size:.88rem;outline:none}
    .search-wrap input:focus{border-color:var(--primary)}
    .search-wrap::before{content:'🔍';position:absolute;left:10px;top:50%;transform:translateY(-50%);font-size:.85rem}
    .topbar-actions{margin-left:auto;display:flex;align-items:center;gap:8px}
    .icon-btn{width:36px;height:36px;border-radius:8px;border:1px solid var(--border);background:var(--surface);cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;position:relative}
    .badge{position:absolute;top:-3px;right:-3px;width:16px;height:16px;background:#ef4444;border-radius:50%;font-size:.6rem;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700}
    .avatar{width:32px;height:32px;border-radius:50%;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:.8rem}
    .content{flex:1;padding:24px;overflow-y:auto}
    .page-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px}
    .page-header h1{font-size:1.4rem;font-weight:700}
    .btn{padding:9px 18px;border-radius:8px;font-size:.88rem;font-weight:600;cursor:pointer;border:none;transition:.2s}
    .btn-primary{background:var(--primary);color:#fff}.btn-primary:hover{background:var(--pHover)}
    .btn-secondary{background:var(--surface);color:var(--text);border:1px solid var(--border)}
    .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px}
    .stat-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:18px;transition:.2s}
    .stat-card:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.08)}
    .stat-label{font-size:.75rem;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px}
    .stat-value{font-size:1.6rem;font-weight:800}.stat-change{font-size:.78rem;margin-top:4px}
    .up{color:#22c55e}.down{color:#ef4444}
    .data-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden}
    .data-header{padding:14px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between}
    .data-header h2{font-size:.95rem;font-weight:600}
    table{width:100%;border-collapse:collapse}
    th,td{padding:11px 20px;text-align:left;font-size:.83rem;border-bottom:1px solid var(--border)}
    th{font-weight:600;color:var(--muted);text-transform:uppercase;font-size:.72rem;letter-spacing:.06em}
    tr:hover td{background:var(--hover)}
    .pill{display:inline-block;padding:2px 10px;border-radius:20px;font-size:.72rem;font-weight:600}
    .pill-green{background:#22c55e18;color:#16a34a}.pill-yellow{background:#eab30818;color:#a16207}.pill-gray{background:#64748b18;color:#64748b}
    .tour-btn{position:fixed;bottom:24px;right:24px;width:54px;height:54px;border-radius:50%;background:var(--primary);color:#fff;border:none;font-size:1.4rem;cursor:pointer;box-shadow:0 4px 20px rgba(0,0,0,.2);transition:.2s;display:flex;align-items:center;justify-content:center;z-index:999}
    .tour-btn:hover{transform:scale(1.08)}
    ${dark ? `.driver-popover{background:var(--surface)!important;color:var(--text)!important;border:1px solid var(--border)!important}
    .driver-popover-title{color:var(--text)!important}.driver-popover-description{color:var(--muted)!important}
    .driver-popover-next-btn{background:var(--primary)!important;color:#fff!important;border:none!important}
    .driver-popover-prev-btn{background:var(--hover)!important;color:var(--muted)!important;border:1px solid var(--border)!important}
    .driver-popover-close-btn{color:var(--muted)!important}` : ''}
  `;
}

// ── Templates ─────────────────────────────────────────────────
function buildTour(name) {
  const body = `
    <div class="app">
      <div class="sidebar" id="sidebar">
        <div class="sidebar-logo" id="logo"><div class="logo-icon">${name[0]}</div><span>${name}</span></div>
        <nav class="sidebar-nav">
          <div class="nav-item active" id="nav-dash">📊 Dashboard</div>
          <div class="nav-item" id="nav-proj">📁 Projects</div>
          <div class="nav-item" id="nav-team">👥 Team</div>
          <div class="nav-item" id="nav-set">⚙️ Settings</div>
        </nav>
      </div>
      <div class="main">
        <div class="topbar">
          <div class="search-wrap"><input id="search" placeholder="Search..." /></div>
          <div class="topbar-actions">
            <button class="icon-btn" id="notif">🔔<span class="badge">3</span></button>
            <div class="avatar" id="profile">JD</div>
          </div>
        </div>
        <div class="content" id="main-content">
          <div class="page-header"><h1>Dashboard</h1><button class="btn btn-primary" id="create-btn">+ New</button></div>
          <div class="stats-grid">
            <div class="stat-card" id="s1"><div class="stat-label">Revenue</div><div class="stat-value">$48,290</div><div class="stat-change up">↑ 12.5%</div></div>
            <div class="stat-card" id="s2"><div class="stat-label">Users</div><div class="stat-value">2,847</div><div class="stat-change up">↑ 8.1%</div></div>
            <div class="stat-card" id="s3"><div class="stat-label">Projects</div><div class="stat-value">164</div><div class="stat-change up">↑ 3.2%</div></div>
            <div class="stat-card" id="s4"><div class="stat-label">Tasks</div><div class="stat-value">47</div><div class="stat-change down">↓ 2.1%</div></div>
          </div>
          <div class="data-card" id="table">
            <div class="data-header"><h2>Recent Projects</h2></div>
            <table><thead><tr><th>Project</th><th>Owner</th><th>Status</th></tr></thead>
            <tbody><tr><td>Website Redesign</td><td>Sarah</td><td><span class="pill pill-green">Active</span></td></tr>
            <tr><td>Mobile App</td><td>Alex</td><td><span class="pill pill-green">Active</span></td></tr>
            <tr><td>API Integration</td><td>Jordan</td><td><span class="pill pill-yellow">Pending</span></td></tr></tbody></table>
          </div>
        </div>
      </div>
    </div>`;
  const js = `
    const d=driver({
      showProgress:true,animate:true,smoothScroll:true,overlayOpacity:${themes[opts.theme].oAlpha},
      nextBtnText:'Next →',prevBtnText:'← Back',doneBtnText:'Got it! 🎉',
      steps:[
        {element:'#logo',popover:{title:'Welcome to ${name}! 👋',description:'Quick tour.',side:'right',align:'start'}},
        {element:'#sidebar',popover:{title:'Sidebar',description:'All your tools.',side:'right',align:'start'}},
        {element:'#search',popover:{title:'Search 🔍',description:'Find anything.',side:'bottom',align:'start'}},
        {element:'#notif',popover:{title:'Notifications',description:'Stay updated.',side:'bottom',align:'end'}},
        {element:'#s1',popover:{title:'Metrics 📈',description:'Key numbers at a glance.',side:'bottom',align:'start'}},
        {element:'#table',popover:{title:'Projects',description:'Track your team.',side:'top',align:'start'}},
        {element:'#create-btn',popover:{title:'Create ✨',description:'Start something new.',side:'left',align:'start'}},
      ]
    });d.drive();`;
  return { body, js };
}

function buildForm() {
  const body = `
    <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;padding:24px">
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:40px;max-width:460px;width:100%">
        <div style="text-align:center;margin-bottom:32px"><div style="font-size:2.5rem;margin-bottom:12px">🚀</div><h1 style="font-size:1.4rem;font-weight:700;margin-bottom:6px">Create Account</h1><p style="font-size:.9rem;color:var(--muted)">Free 14-day trial.</p></div>
        <form onsubmit="event.preventDefault()">
          <div class="field" id="f-name" style="margin-bottom:18px"><label style="display:block;font-size:.82rem;font-weight:600;margin-bottom:6px">Full Name</label><input type="text" placeholder="Jane Doe" style="width:100%;padding:11px 14px;border:1px solid var(--border);border-radius:10px;background:var(--bg);color:var(--text);font-size:.9rem;outline:none" /></div>
          <div class="field" id="f-email" style="margin-bottom:18px"><label style="display:block;font-size:.82rem;font-weight:600;margin-bottom:6px">Email</label><input type="email" placeholder="jane@co.com" style="width:100%;padding:11px 14px;border:1px solid var(--border);border-radius:10px;background:var(--bg);color:var(--text);font-size:.9rem;outline:none" /></div>
          <div class="field" id="f-pw" style="margin-bottom:18px"><label style="display:block;font-size:.82rem;font-weight:600;margin-bottom:6px">Password</label><input type="password" placeholder="Min 8 chars" style="width:100%;padding:11px 14px;border:1px solid var(--border);border-radius:10px;background:var(--bg);color:var(--text);font-size:.9rem;outline:none" /></div>
          <button type="submit" id="submit-btn" style="width:100%;padding:13px;border:none;border-radius:10px;background:var(--primary);color:#fff;font-size:.95rem;font-weight:700;cursor:pointer">Sign Up →</button>
        </form>
      </div>
    </div>`;
  const js = `
    const d=driver({
      showProgress:true,animate:true,overlayOpacity:0.7,stagePadding:6,
      nextBtnText:'Continue →',prevBtnText:'← Back',doneBtnText:'Finish ✓',
      steps:[
        {popover:{title:'Create Account 📝',description:'Quick walkthrough!',side:'bottom',align:'center'}},
        {element:'#f-name',popover:{title:'Name',description:'Your display name.',side:'right',align:'start'},disableActiveInteraction:false},
        {element:'#f-email',popover:{title:'Email 📧',description:'Work email for team features.',side:'right',align:'start'},disableActiveInteraction:false},
        {element:'#f-pw',popover:{title:'Password 🔒',description:'Min 8 chars, mix types.',side:'right',align:'start'},disableActiveInteraction:false},
        {element:'#submit-btn',popover:{title:'All Set! 🎉',description:'Click to create your account.',side:'top',align:'center'},advanceOnClick:true},
      ]
    });d.drive();`;
  return { body, js };
}

function buildSpotlight(name) {
  const body = `
    <div class="app">
      <div class="sidebar"><div class="sidebar-logo" id="logo"><div class="logo-icon">${name[0]}</div><span>${name}</span></div>
        <nav class="sidebar-nav"><div class="nav-item active">🏠 Home</div><div class="nav-item">📁 Projects</div><div class="nav-item">⚙️ Settings</div></nav>
      </div>
      <div class="main">
        <div class="topbar"><div class="search-wrap"><input placeholder="Search..." /></div><div class="topbar-actions"><button class="icon-btn" id="theme-btn">🌙</button><button class="icon-btn" id="ai-btn">🤖</button><div class="avatar">JD</div></div></div>
        <div class="content">
          <div style="background:linear-gradient(135deg,#3b82f6,#8b5cf6);border-radius:16px;padding:32px;margin-bottom:28px;display:flex;align-items:center;justify-content:space-between" id="banner">
            <div><h1 style="font-size:1.5rem;font-weight:800;margin-bottom:6px">✨ What's New</h1><p style="opacity:.9">Latest features just landed!</p></div>
            <button class="btn btn-primary" id="tour-btn" style="background:#fff;color:#3b82f6">Take Tour →</button>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px">
            <div class="stat-card" id="f-export"><div style="font-size:2rem;margin-bottom:12px">📊</div><h3 style="font-size:1.05rem;margin-bottom:8px">Export Reports</h3><p style="font-size:.85rem;color:var(--muted)">CSV, PDF, Excel. One click.</p></div>
            <div class="stat-card" id="f-collab"><div style="font-size:2rem;margin-bottom:12px">🤝</div><h3 style="font-size:1.05rem;margin-bottom:8px">Collaboration</h3><p style="font-size:.85rem;color:var(--muted)">Real-time editing and comments.</p></div>
            <div class="stat-card" id="f-ai"><div style="font-size:2rem;margin-bottom:12px">🤖</div><h3 style="font-size:1.05rem;margin-bottom:8px">AI Assistant</h3><p style="font-size:.85rem;color:var(--muted)">Smart suggestions and summaries.</p></div>
          </div>
        </div>
      </div>
    </div>`;
  const js = `
    const d=driver({
      showProgress:true,animate:true,smoothScroll:true,
      overlayColor:'#fff',overlayOpacity:0.15,stagePadding:10,stageRadius:14,
      nextBtnText:'Next →',prevBtnText:'← Back',doneBtnText:'Explore! 🚀',
      steps:[
        {element:'#banner',popover:{title:'What\\'s New ✨',description:'Latest features.',side:'bottom',align:'center'}},
        {element:'#f-export',popover:{title:'📊 Export',description:'Download data in any format.',side:'bottom',align:'start'}},
        {element:'#f-collab',popover:{title:'🤝 Collab',description:'Work together in real-time.',side:'bottom',align:'center'}},
        {element:'#f-ai',popover:{title:'🤖 AI',description:'Smart suggestions.',side:'bottom',align:'end'}},
        {element:'#theme-btn',popover:{title:'🌙 Dark Mode',description:'Toggle themes.',side:'bottom',align:'end'}},
        {popover:{title:'Done! 🎉',description:'Explore at your pace.',side:'bottom',align:'center'}},
      ]
    });d.drive();document.getElementById('tour-btn').onclick=()=>d.drive();`;
  return { body, js };
}

function buildInteractive() {
  const body = `
    <div style="max-width:560px;margin:40px auto;padding:0 20px">
      <div style="text-align:center;margin-bottom:32px"><div style="font-size:3rem;margin-bottom:10px">📝</div><h1 style="font-size:1.6rem;font-weight:800">My Tasks</h1><p style="color:var(--muted);font-size:.9rem">Learn by doing!</p></div>
      <div style="display:flex;gap:10px;margin-bottom:20px">
        <input id="todo-input" placeholder="Add a task..." style="flex:1;padding:12px 16px;border:2px solid var(--border);border-radius:10px;background:var(--surface);color:var(--text);font-size:.92rem;outline:none" />
        <button class="btn btn-primary" id="add-btn">Add</button>
      </div>
      <div id="todo-list" style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px">
        <div class="todo-item" id="todo-1" style="display:flex;align-items:center;gap:12px;padding:14px 16px;background:var(--surface);border:1px solid var(--border);border-radius:10px"><input type="checkbox" /><span>Review proposal</span><button style="margin-left:auto;background:none;border:none;cursor:pointer">🗑️</button></div>
        <div class="todo-item" id="todo-2" style="display:flex;align-items:center;gap:12px;padding:14px 16px;background:var(--surface);border:1px solid var(--border);border-radius:10px"><input type="checkbox" /><span>Update wiki</span><button style="margin-left:auto;background:none;border:none;cursor:pointer">🗑️</button></div>
      </div>
      <div id="stats" style="display:flex;justify-content:space-between;padding:14px 18px;background:var(--surface);border:1px solid var(--border);border-radius:10px;font-size:.85rem;color:var(--muted)"><span id="sp">2 pending</span><span id="sd">0 done</span></div>
    </div>`;
  const js = `
    let n=3;const upd=()=>{const items=document.querySelectorAll('#todo-list .todo-item');const d=[...items].filter(i=>i.querySelector('input').checked).length;document.getElementById('sp').textContent=(items.length-d)+' pending';document.getElementById('sd').textContent=d+' done';};
    document.getElementById('add-btn').onclick=()=>{const v=document.getElementById('todo-input').value.trim();if(!v)return;const d=document.createElement('div');d.className='todo-item';d.id='todo-'+(++n);d.style.cssText='display:flex;align-items:center;gap:12px;padding:14px 16px;background:var(--surface);border:1px solid var(--border);border-radius:10px';d.innerHTML='<input type="checkbox" /><span>'+v+'</span><button style="margin-left:auto;background:none;border:none;cursor:pointer">🗑️</button>';document.getElementById('todo-list').appendChild(d);document.getElementById('todo-input').value='';upd();};
    document.getElementById('todo-list').onchange=e=>{if(e.target.type==='checkbox'){e.target.nextElementSibling.style.textDecoration=e.target.checked?'line-through':'none';upd();}};
    document.getElementById('todo-list').onclick=e=>{if(e.target.tagName==='BUTTON'){e.target.closest('.todo-item').remove();upd();}};
    const d=driver({
      showProgress:true,animate:true,overlayOpacity:0.65,stagePadding:8,stageRadius:10,
      nextBtnText:'Got it →',prevBtnText:'← Back',doneBtnText:'Start! 🎉',
      steps:[
        {popover:{title:'Tutorial 🚀',description:'Hands-on — interact as you learn!',side:'bottom',align:'center'}},
        {element:'#todo-input',popover:{title:'Step 1: Add',description:'Type a task name.',side:'bottom',align:'start'},disableActiveInteraction:false},
        {element:'#add-btn',popover:{title:'Step 2: Add It',description:'Click to create. Try it!',side:'bottom',align:'end'},advanceOnClick:true},
        {element:'#todo-1',popover:{title:'Step 3: Complete',description:'Check the box.',side:'right',align:'center'},advanceOnClick:true},
        {element:'#stats',popover:{title:'Step 4: Stats',description:'Watch progress update.',side:'top',align:'center'}},
        {popover:{title:'Done! 🎊',description:'🦊 button restarts this tour.',side:'bottom',align:'center'}},
      ]
    });d.drive();`;
  return { body, js };
}

// ── Main ──────────────────────────────────────────────────────
const opts = parseArgs();
const t = themes[opts.theme] ? opts.theme : 'light';
if (t !== opts.theme) { console.warn(`⚠️  Unknown theme "${opts.theme}" — falling back to "light".`); opts.theme = t; }

const builders = { tour: buildTour, form: buildForm, spotlight: buildSpotlight, interactive: buildInteractive };
const builder = builders[opts.type];
if (!builder) { console.error('Unknown type:', opts.type, '— use tour|form|spotlight|interactive'); process.exit(1); }

const { body, js } = builder(opts.name);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>${opts.name} — ${opts.type} demo</title>
  <script src="https://cdn.jsdelivr.net/npm/driver.js@latest/dist/driver.js.iife.js"><\/script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/driver.js@latest/dist/driver.css" />
  <style>${themeCss(t)}</style>
</head>
<body>${body}
  <button class="tour-btn" id="tour-trigger" title="Start Tour">🦊</button>
  <script>
    const driver=window.driver.js.driver;
    ${js}
    document.getElementById('tour-trigger').onclick=()=>{if(typeof d!=='undefined')d.drive();};
  <\/script>
</body>
</html>`;

const out = path.resolve(opts.output);
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, html);
console.log(`✅ ${opts.type} demo (${opts.theme}) → ${out} (${(Buffer.byteLength(html)/1024).toFixed(1)} KB)`);
