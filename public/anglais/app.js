/* LinguaPro — Anglais professionnel. Application 100 % front-end (PWA). */
(() => {
"use strict";

/* ---------- Utilitaires ---------- */
const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const sample = (a, n) => shuffle(a).slice(0, n);
const ymd = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
const today = () => ymd(new Date());
const dayDiff = (a, b) => Math.round((new Date(b) - new Date(a)) / 86400000);
const norm = (s) => String(s).toLowerCase().replace(/%/g, " percent").replace(/[’']/g, "'").replace(/[^a-z0-9' -]/g, " ").replace(/-/g, " ").replace(/\s+/g, " ").trim();
const words = (s) => norm(s).split(" ").filter(Boolean);
const NUMS = { zero:"0", one:"1", two:"2", three:"3", four:"4", five:"5", six:"6", seven:"7", eight:"8", nine:"9", ten:"10", twelve:"12", fifteen:"15", twenty:"20", thirty:"30", forty:"40", fifty:"50", hundred:"100" };
const canon = (w) => NUMS[w] || w;

function lev(a, b) {
  const m = a.length, n = b.length; if (!m) return n; if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[n];
}
const simStr = (a, b) => { a = norm(a); b = norm(b); const L = Math.max(a.length, b.length); return L ? 1 - lev(a, b) / L : 1; };

/* Compare mot à mot une cible et ce qui a été dit/tapé (LCS tolérant). */
function compareWords(target, said) {
  const t = words(target).map(canon), s = words(said).map(canon);
  const close = (x, y) => x === y || (x.length > 3 && 1 - lev(x, y) / Math.max(x.length, y.length) >= 0.75);
  const m = t.length, n = s.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) for (let j = n - 1; j >= 0; j--)
    dp[i][j] = close(t[i], s[j]) ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const hit = new Array(m).fill(false); let i = 0, j = 0;
  while (i < m && j < n) { if (close(t[i], s[j])) { hit[i] = true; i++; j++; } else if (dp[i + 1][j] >= dp[i][j + 1]) i++; else j++; }
  const matched = hit.filter(Boolean).length;
  const extra = Math.max(0, n - matched);
  const score = m ? Math.max(0, Math.round(100 * (matched - extra * 0.25) / m)) : 0;
  return { score: Math.min(100, score), hit, targetWords: target.split(/\s+/) };
}

/* ---------- État persistant ---------- */
const KEY = "linguapro_v1";
const DEFAULT = { xp: 0, streak: 0, lastDay: null, days: {}, goal: 50, accent: "en-US", voiceURI: "", rate: 0.95, frVoice: true, srs: {}, stats: { answered: 0, correct: 0, spoken: 0, speakSum: 0, minutes: 0 }, lessonsDone: {}, name: "" };
let S;
try { S = Object.assign({}, DEFAULT, JSON.parse(localStorage.getItem(KEY) || "{}")); S.stats = Object.assign({}, DEFAULT.stats, S.stats); } catch (e) { S = JSON.parse(JSON.stringify(DEFAULT)); }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };

function addXP(n) {
  const d = today();
  S.xp += n; S.days[d] = (S.days[d] || 0) + n;
  if (S.lastDay !== d) {
    S.streak = S.lastDay && dayDiff(S.lastDay, d) === 1 ? S.streak + 1 : 1;
    S.lastDay = d;
  }
  save(); updateTop();
}
function currentStreak() { if (!S.lastDay) return 0; return dayDiff(S.lastDay, today()) <= 1 ? S.streak : 0; }

/* ---------- Index du vocabulaire ---------- */
const ALL = [];
DOMAINS.forEach((d) => d.vocab.forEach((v, i) => { v.id = d.id + ":" + i; v.dom = d.id; ALL.push(v); }));
const byId = Object.fromEntries(ALL.map((v) => [v.id, v]));
const dom = (id) => DOMAINS.find((d) => d.id === id);

/* ---------- Répétition espacée (SM-2 simplifié) ---------- */
function srsAdd(id) { if (!S.srs[id]) { S.srs[id] = { ef: 2.5, iv: 0, reps: 0, due: today(), seen: 1 }; } }
function srsGrade(id, q) { // q: 1 à revoir, 3 difficile, 4 bien, 5 facile
  srsAdd(id); const c = S.srs[id];
  if (q < 3) { c.reps = 0; c.iv = 0; }
  else { c.reps++; c.iv = c.reps === 1 ? 1 : c.reps === 2 ? 3 : Math.round(c.iv * c.ef); if (q === 5) c.iv = Math.round(c.iv * 1.3) + 1; }
  c.ef = Math.max(1.3, c.ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
  const d = new Date(); d.setDate(d.getDate() + c.iv); c.due = ymd(d);
  save();
}
const dueList = () => Object.keys(S.srs).filter((id) => byId[id] && S.srs[id].due <= today());
const mastered = () => Object.values(S.srs).filter((c) => c.iv >= 7).length;

/* ---------- Synthèse vocale ---------- */
const TTS = {
  ok: "speechSynthesis" in window, voices: [],
  load() { if (!this.ok) return; this.voices = speechSynthesis.getVoices(); },
  enVoices() { return this.voices.filter((v) => /^en[-_]/i.test(v.lang)); },
  pick(lang, alt = 0) {
    const all = this.voices;
    if (lang.startsWith("fr")) return all.find((v) => /^fr[-_]FR/i.test(v.lang)) || all.find((v) => /^fr/i.test(v.lang));
    if (alt === 0 && S.voiceURI) { const v = all.find((x) => x.voiceURI === S.voiceURI); if (v) return v; }
    let pool = all.filter((v) => v.lang.replace("_", "-").toLowerCase() === lang.toLowerCase());
    if (!pool.length) pool = this.enVoices();
    pool = pool.slice().sort((a, b) => score(b) - score(a));
    function score(v) { let s = 0; if (/natural|neural|online|premium|enhanced/i.test(v.name)) s += 3; if (/google|samantha|daniel|serena|aria|jenny|guy|libby|ryan/i.test(v.name)) s += 2; return s; }
    if (alt && pool.length > 1) {
      const main = this.pick(lang, 0);
      return pool.find((v) => v !== main) || pool[0];
    }
    return pool[0];
  },
  speak(text, o = {}) {
    return new Promise((res) => {
      if (!this.ok) return res();
      const u = new SpeechSynthesisUtterance(text);
      const lang = o.lang || S.accent;
      u.lang = lang; const v = this.pick(lang, o.alt || 0); if (v) u.voice = v;
      u.rate = (o.rate || S.rate) * (o.slow ? 0.7 : 1);
      u.pitch = o.pitch || 1;
      let done = false; const fin = () => { if (!done) { done = true; clearTimeout(t); res(); } };
      u.onend = fin; u.onerror = fin;
      if (o.onboundary) u.onboundary = o.onboundary;
      const t = setTimeout(fin, 1500 + text.length * 110 / u.rate);
      if (!o.queue) speechSynthesis.cancel();
      speechSynthesis.speak(u);
      if (speechSynthesis.paused) speechSynthesis.resume();
    });
  },
  stop() { if (this.ok) speechSynthesis.cancel(); }
};
if (TTS.ok) { TTS.load(); speechSynthesis.onvoiceschanged = () => TTS.load(); }
const say = (t, o) => TTS.speak(t, o);
const sentences = (t) => t.match(/[^.!?]+[.!?]*/g).map((s) => s.trim()).filter(Boolean);

/* ---------- Reconnaissance vocale ---------- */
const SRClass = window.SpeechRecognition || window.webkitSpeechRecognition;
const SR = {
  ok: !!SRClass, active: null,
  listen(lang) {
    return new Promise((res, rej) => {
      const r = new SRClass(); this.active = r;
      r.lang = lang || S.accent; r.interimResults = false; r.maxAlternatives = 5; r.continuous = false;
      let got = false;
      r.onresult = (e) => { got = true; res(Array.from(e.results[0]).map((a) => a.transcript)); };
      r.onerror = (e) => { got = true; rej(e.error || "error"); };
      r.onend = () => { this.active = null; if (!got) res([]); };
      try { r.start(); } catch (e) { rej("start"); }
    });
  },
  stop() { if (this.active) try { this.active.stop(); } catch (e) {} }
};

/* Enregistrement (secours si pas de reconnaissance) */
const REC = {
  ok: !!(navigator.mediaDevices && window.MediaRecorder),
  async record(ms = 5000) {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mr = new MediaRecorder(stream); const chunks = [];
    mr.ondataavailable = (e) => chunks.push(e.data);
    const p = new Promise((res) => { mr.onstop = () => { stream.getTracks().forEach((t) => t.stop()); res(URL.createObjectURL(new Blob(chunks, { type: mr.mimeType }))); }; });
    mr.start(); REC.cur = mr; setTimeout(() => mr.state !== "inactive" && mr.stop(), ms);
    return p;
  },
  stop() { if (REC.cur && REC.cur.state !== "inactive") REC.cur.stop(); }
};

/* Widget micro réutilisable : renvoie {score, heard} ou null si passé */
function micWidget(el, target, onDone, opts = {}) {
  el.innerHTML = `
    <div class="mic-wrap">
      <button class="mic" aria-label="Parler">🎙️</button>
      <div class="mic-hint">${SR.ok ? "Touchez puis parlez" : REC.ok ? "Touchez pour vous enregistrer" : "Micro non disponible sur ce navigateur"}</div>
      <div class="mic-result"></div>
    </div>`;
  const btn = $(".mic", el), hint = $(".mic-hint", el), out = $(".mic-result", el);
  let busy = false;
  btn.onclick = async () => {
    if (busy) { SR.stop(); REC.stop(); return; }
    TTS.stop(); busy = true; btn.classList.add("on"); hint.textContent = "J'écoute…";
    if (SR.ok) {
      try {
        const alts = await SR.listen();
        busy = false; btn.classList.remove("on");
        if (!alts.length) { hint.textContent = "Je n'ai rien entendu. Réessayez."; return; }
        let best = null, heard = "";
        alts.forEach((a) => { const r = compareWords(target, a); if (!best || r.score > best.score) { best = r; heard = a; } });
        S.stats.spoken++; S.stats.speakSum += best.score; save();
        const cls = best.score >= 85 ? "great" : best.score >= 60 ? "ok" : "low";
        out.innerHTML = `<div class="score ${cls}"><b>${best.score}</b>/100 ${best.score >= 85 ? "Excellent !" : best.score >= 60 ? "Pas mal !" : "À retravailler"}</div>
          <div class="wordmap">${best.targetWords.map((w, i) => `<span class="${best.hit[i] ? "w-ok" : "w-ko"}">${esc(w)}</span>`).join(" ")}</div>
          <div class="heard">Entendu : « ${esc(heard)} »</div>`;
        hint.textContent = "Touchez pour réessayer";
        onDone && onDone({ score: best.score, heard });
      } catch (e) {
        busy = false; btn.classList.remove("on");
        hint.textContent = e === "not-allowed" ? "Autorisez le micro dans votre navigateur." : "Erreur micro (" + e + "). Réessayez.";
      }
    } else if (REC.ok) {
      try {
        hint.textContent = "Enregistrement (5 s)… touchez pour arrêter";
        const url = await REC.record(opts.ms || 5000);
        busy = false; btn.classList.remove("on"); hint.textContent = "Comparez avec le modèle puis évaluez-vous";
        out.innerHTML = `<audio controls src="${url}"></audio>
          <div class="row gap"><button class="btn sm" data-self="40">😕 Moyen</button><button class="btn sm" data-self="70">🙂 Bien</button><button class="btn sm" data-self="95">😃 Très bien</button></div>`;
        out.querySelectorAll("[data-self]").forEach((b) => b.onclick = () => { const sc = +b.dataset.self; S.stats.spoken++; S.stats.speakSum += sc; save(); onDone && onDone({ score: sc, heard: "" }); });
      } catch (e) { busy = false; btn.classList.remove("on"); hint.textContent = "Autorisez le micro pour vous enregistrer."; }
    } else { busy = false; btn.classList.remove("on"); }
  };
}

/* ---------- Rendu général ---------- */
const view = $("#view");
function updateTop() {
  $("#t-streak").textContent = currentStreak();
  $("#t-xp").textContent = S.xp;
  const p = Math.min(1, (S.days[today()] || 0) / S.goal);
  $("#t-ring").style.setProperty("--p", p);
}
const speakBtn = (text, cls = "", label = "🔊", o = "") => `<button class="spk ${cls}" data-say="${esc(text)}" ${o} aria-label="Écouter">${label}</button>`;
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-say]"); if (!b) return;
  e.stopPropagation();
  say(b.dataset.say, { slow: b.hasAttribute("data-slow"), lang: b.dataset.lang });
});

function setNav(name) { document.querySelectorAll(".nav a").forEach((a) => a.classList.toggle("active", a.dataset.nav === name)); }

/* ---------- Accueil ---------- */
function home() {
  setNav("home");
  const due = dueList().length;
  const di = Math.floor(Date.now() / 86400000) % DOMAINS.length;
  const dd = DOMAINS[di];
  const todayXP = S.days[today()] || 0;
  const week = []; for (let i = 6; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - i); const k = ymd(d); week.push({ k, xp: S.days[k] || 0, l: "DLMMJVS"[d.getDay()] }); }
  const maxW = Math.max(S.goal, ...week.map((w) => w.xp));
  view.innerHTML = `
    <section class="hero">
      <div>
        <div class="eyebrow">${new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}</div>
        <h1>Hello${S.name ? ", " + esc(S.name) : ""} 👋</h1>
        <p class="muted">${todayXP >= S.goal ? "Objectif du jour atteint, bravo ! Continuez sur votre lancée." : `Encore <b>${S.goal - todayXP} XP</b> pour votre objectif du jour.`}</p>
      </div>
      <div class="goal-ring" style="--p:${Math.min(1, todayXP / S.goal)}"><span>${todayXP}<small>/${S.goal}</small></span></div>
    </section>

    <a class="card daily" href="#/session/mix/${dd.id}" style="--c:${dd.color}">
      <div class="daily-ic">${dd.icon}</div>
      <div><div class="eyebrow">Leçon du jour · 5 min</div><h2>${dd.name}</h2><p class="muted">Vocabulaire, écoute, dictée et prononciation</p></div>
      <span class="go">▶</span>
    </a>

    <div class="grid2">
      <a class="card tile" href="#/review"><div class="big">${due}</div><div>mots à réviser</div><small class="muted">Répétition espacée</small></a>
      <a class="card tile" href="#/oral"><div class="big">🎙️</div><div>Labo oral</div><small class="muted">Répétez & soyez noté</small></a>
      <a class="card tile" href="#/podcast/${dd.id}"><div class="big">🎧</div><div>Mode podcast</div><small class="muted">Écoute mains libres</small></a>
      <a class="card tile" href="#/grammar"><div class="big">📐</div><div>Grammaire pro</div><small class="muted">${GRAMMAR.length} fiches</small></a>
    </div>

    <h3 class="sec">Votre semaine</h3>
    <div class="card week">${week.map((w) => `<div class="wk"><div class="bar"><i style="height:${Math.round(100 * w.xp / maxW)}%" class="${w.xp >= S.goal ? "full" : ""}"></i></div><small>${w.l}</small></div>`).join("")}</div>

    <h3 class="sec">Domaines</h3>
    <div class="domains">${DOMAINS.map(domCard).join("")}</div>
  `;
}
function domProgress(d) { const n = d.vocab.filter((v) => S.srs[v.id]).length; return Math.round(100 * n / d.vocab.length); }
const domCard = (d) => `<a class="card dom" href="#/domain/${d.id}" style="--c:${d.color}"><span class="dom-ic">${d.icon}</span><b>${d.name}</b><small class="muted">${d.desc}</small><div class="prog"><i style="width:${domProgress(d)}%"></i></div></a>`;

/* ---------- Liste des domaines + glossaire ---------- */
function domains() {
  setNav("domains");
  view.innerHTML = `<h1 class="pt">Domaines</h1>
    <input id="q" class="search" type="search" placeholder="🔎 Rechercher un terme (anglais ou français)…">
    <div id="res"></div>
    <div class="domains" id="dl">${DOMAINS.map(domCard).join("")}</div>`;
  $("#q").oninput = (e) => {
    const q = e.target.value.trim().toLowerCase();
    $("#dl").style.display = q ? "none" : "";
    if (!q) { $("#res").innerHTML = ""; return; }
    const r = ALL.filter((v) => v.en.toLowerCase().includes(q) || v.fr.toLowerCase().includes(q)).slice(0, 30);
    $("#res").innerHTML = r.length ? r.map(vocabRow).join("") : `<p class="muted">Aucun résultat.</p>`;
  };
}
const vocabRow = (v) => `<div class="card vrow">
  <div class="vmain">${speakBtn(v.en)}<div><b>${esc(v.en)}</b> <span class="muted">— ${esc(v.fr)}</span><div class="def">${esc(v.def)}</div>
  <div class="ex">${speakBtn(v.ex, "mini", "▶")} <i>${esc(v.ex)}</i><br><small class="muted">${esc(v.exFr)}</small></div></div></div>
  <span class="tag" style="--c:${dom(v.dom).color}">${dom(v.dom).icon}</span></div>`;

/* ---------- Page domaine ---------- */
function domainPage(id, tab = "learn") {
  setNav("domains");
  const d = dom(id); if (!d) return go("#/domains");
  const tabs = [["learn", "Apprendre"], ["vocab", "Vocabulaire"], ["dialog", "Dialogues"], ["listen", "Écoute"]];
  view.innerHTML = `
    <a class="back" href="#/domains">← Domaines</a>
    <section class="dhead" style="--c:${d.color}"><span class="dom-ic xl">${d.icon}</span><div><h1>${d.name}</h1><p>${d.vocab.length} termes · ${d.dialogues.length} dialogue(s) · ${domProgress(d)} % découverts</p></div></section>
    <div class="tabs">${tabs.map(([k, l]) => `<a href="#/domain/${id}/${k}" class="${tab === k ? "on" : ""}">${l}</a>`).join("")}</div>
    <div id="tab"></div>`;
  const T = $("#tab");
  if (tab === "learn") {
    const yt = (q) => "https://www.youtube.com/results?search_query=" + encodeURIComponent(q);
    T.innerHTML = `
      <a class="card video" href="#/video/${id}" style="--c:${d.color}">
        <div class="vthumb"><span>▶</span></div>
        <div><div class="eyebrow">Leçon vidéo narrée</div><b>${esc(d.lesson.title)}</b><small class="muted">${d.lesson.slides.length} séquences · sous-titres FR/EN</small></div>
      </a>
      <h3 class="sec">Exercices</h3>
      <div class="ex-list">
        ${exLink(id, "mix", "🎯", "Session complète", "10 questions variées")}
        ${exLink(id, "flash", "🃏", "Cartes mémoire", "Découvrir les termes")}
        ${exLink(id, "listen", "👂", "Écoute & choix", "Reconnaître à l'oreille")}
        ${exLink(id, "dictation", "✍️", "Dictée", "Écrire ce que vous entendez")}
        ${exLink(id, "speak", "🎙️", "Prononciation", "Dites les mots, obtenez une note")}
        ${exLink(id, "fill", "🧩", "Phrases à trous", "Le bon mot en contexte")}
        ${exLink(id, "order", "🔀", "Remettre en ordre", "Construire la phrase")}
        ${exLink(id, "match", "🔗", "Associer", "Anglais ↔ français")}
      </div>
      <a class="card podcast" href="#/podcast/${id}">🎧 <div><b>Mode podcast</b><small class="muted">Écoutez tout le vocabulaire en boucle, mains libres (anglais → français → exemple)</small></div></a>
      <h3 class="sec">Vidéos YouTube sur le sujet</h3>
      <div class="ytl">${d.videos.map((q) => `<a class="chip" target="_blank" rel="noopener" href="${yt(q)}">▶ ${esc(q)}</a>`).join("")}</div>`;
  } else if (tab === "vocab") {
    T.innerHTML = `<div class="row gap wrap"><a class="btn" href="#/session/flash/${id}">🃏 Cartes</a><a class="btn ghost" href="#/podcast/${id}">🎧 Tout écouter</a></div>` + d.vocab.map(vocabRow).join("");
  } else if (tab === "dialog") {
    T.innerHTML = d.dialogues.map((g, i) => `<div class="card dlg">
      <b>${esc(g.title)}</b><small class="muted">${g.roles[0]} ↔ ${g.roles[1]} · ${g.lines.length} répliques</small>
      <div class="row gap wrap"><a class="btn sm" href="#/dialog/${id}/${i}/listen">🎧 Écouter</a><a class="btn sm" href="#/dialog/${id}/${i}/1">🎭 Jouer ${esc(g.roles[1])}</a><a class="btn sm ghost" href="#/dialog/${id}/${i}/0">🎭 Jouer ${esc(g.roles[0])}</a></div></div>`).join("");
  } else if (tab === "listen") {
    T.innerHTML = d.listening.map((l, i) => `<a class="card dlg" href="#/listening/${id}/${i}"><b>👂 ${esc(l.title)}</b><small class="muted">Compréhension orale · ${l.questions.length} questions</small></a>`).join("");
  }
}
const exLink = (id, t, ic, a, b) => `<a class="card exl" href="#/session/${t}/${id}"><span>${ic}</span><div><b>${a}</b><small class="muted">${b}</small></div></a>`;

/* ---------- Leçon vidéo (diaporama narré, karaoké) ---------- */
function videoPage(id) {
  setNav("domains");
  const d = dom(id), L = d.lesson; let i = 0, playing = false, showFr = true, token = 0;
  view.innerHTML = `<a class="back" href="#/domain/${id}">← ${d.name}</a>
    <div class="stage" style="--c:${d.color}">
      <div class="stage-top"><span>${d.icon} ${esc(L.title)}</span><span id="vcount"></span></div>
      <div class="stage-body"><h2 id="vh"></h2><p id="ven" class="karaoke"></p><p id="vfr" class="sub"></p></div>
      <div class="stage-prog"><i id="vbar"></i></div>
    </div>
    <div class="controls">
      <button class="btn ghost" id="vprev">⏮</button>
      <button class="btn big" id="vplay">▶ Lecture</button>
      <button class="btn ghost" id="vnext">⏭</button>
    </div>
    <div class="row gap center wrap"><label class="toggle"><input type="checkbox" id="vfrc" checked> Sous-titres français</label><button class="btn sm ghost" id="vrep">🎙️ Répéter cette phrase</button></div>
    <div id="vmic"></div>
    <p class="muted center small">Astuce : écoutez une fois, puis répétez chaque phrase au micro pour ancrer la prononciation.</p>`;
  const render = () => {
    const s = L.slides[i];
    $("#vh").textContent = s.h; $("#vcount").textContent = (i + 1) + " / " + L.slides.length;
    $("#ven").innerHTML = s.en.split(/\s+/).map((w) => `<span>${esc(w)}</span>`).join(" ");
    $("#vfr").textContent = s.fr; $("#vfr").style.visibility = showFr ? "visible" : "hidden";
    $("#vbar").style.width = (100 * (i + 1) / L.slides.length) + "%";
    $("#vmic").innerHTML = "";
    const stage = $(".stage-body"); stage.classList.remove("in"); void stage.offsetWidth; stage.classList.add("in");
  };
  const highlight = async (my) => {
    const s = L.slides[i], spans = [...document.querySelectorAll("#ven span")];
    let k = 0; const step = 60000 / (165 * S.rate);
    const timer = setInterval(() => { if (my !== token) return clearInterval(timer); spans.forEach((x, j) => x.classList.toggle("on", j <= k)); k++; }, step);
    await say(s.en, { onboundary: (e) => { if (e.name === "word" || e.charIndex >= 0) { const n = s.en.slice(0, e.charIndex).split(/\s+/).filter(Boolean).length; k = Math.max(k, n); } } });
    clearInterval(timer); if (my === token) spans.forEach((x) => x.classList.add("on"));
  };
  const playFrom = async () => {
    const my = ++token; playing = true; $("#vplay").textContent = "⏸ Pause";
    while (playing && my === token && i < L.slides.length) {
      render(); await new Promise((r) => setTimeout(r, 400));
      if (my !== token) return;
      await highlight(my);
      if (my !== token || !playing) return;
      await new Promise((r) => setTimeout(r, 1300));
      if (i < L.slides.length - 1) i++; else { playing = false; break; }
    }
    if (my === token) {
      $("#vplay").textContent = "↻ Revoir";
      if (!S.lessonsDone[id]) { S.lessonsDone[id] = true; addXP(15); toast("+15 XP · Leçon vidéo terminée"); }
    }
  };
  const stop = () => { playing = false; token++; TTS.stop(); $("#vplay").textContent = "▶ Lecture"; };
  $("#vplay").onclick = () => { if (playing) stop(); else { if ($("#vplay").textContent.includes("Revoir")) i = 0; playFrom(); } };
  $("#vprev").onclick = () => { stop(); i = Math.max(0, i - 1); render(); };
  $("#vnext").onclick = () => { stop(); i = Math.min(L.slides.length - 1, i + 1); render(); };
  $("#vfrc").onchange = (e) => { showFr = e.target.checked; $("#vfr").style.visibility = showFr ? "visible" : "hidden"; };
  $("#vrep").onclick = () => { stop(); micWidget($("#vmic"), L.slides[i].en, () => {}); };
  render(); cleanup = stop;
}

/* ---------- Sessions d'exercices ---------- */
function buildQuestions(type, d) {
  const pool = d.vocab;
  // priorité aux termes jamais vus / faibles
  const ranked = shuffle(pool).sort((a, b) => (S.srs[a.id] ? S.srs[a.id].iv + 1 : 0) - (S.srs[b.id] ? S.srs[b.id].iv + 1 : 0));
  const pick = ranked.slice(0, 6);
  const fillable = (v) => v.ex.toLowerCase().includes(v.en.toLowerCase());
  const orderable = (v) => v.ex.split(" ").length <= 11;
  const Q = [];
  const mk = (t, v) => ({ t, v });
  if (type === "mix") {
    pick.slice(0, 2).forEach((v) => Q.push(mk("mcq", v)));
    Q.push(mk("listen", pick[2])); Q.push(mk("mcqrev", pick[3]));
    const f = pick.find(fillable) || pick[0]; Q.push(mk("fill", f));
    Q.push(mk("speak", pick[4]));
    Q.push(mk("match", null));
    Q.push(mk("dictation", pick[5]));
    const o = pick.find((v) => orderable(v) && v !== pick[5]) || pick[1]; Q.push(mk("order", o));
    Q.push(mk("speaks", pick[0]));
  } else if (type === "flash") { ranked.slice(0, 8).forEach((v) => Q.push(mk("flash", v))); }
  else if (type === "listen") { ranked.slice(0, 8).forEach((v) => Q.push(mk("listen", v))); }
  else if (type === "dictation") { ranked.slice(0, 6).forEach((v) => Q.push(mk("dictation", v))); }
  else if (type === "speak") { ranked.slice(0, 4).forEach((v) => Q.push(mk("speak", v))); ranked.slice(4, 7).forEach((v) => Q.push(mk("speaks", v))); }
  else if (type === "fill") { ranked.filter(fillable).slice(0, 8).forEach((v) => Q.push(mk("fill", v))); }
  else if (type === "order") { ranked.filter(orderable).slice(0, 6).forEach((v) => Q.push(mk("order", v))); }
  else if (type === "match") { for (let k = 0; k < 3; k++) Q.push(mk("match", null)); }
  return Q;
}

function session(type, id, preset) {
  setNav("domains");
  const d = dom(id) || DOMAINS[0];
  const Q = preset || buildQuestions(type, d);
  let qi = 0, good = 0, xp = 0; const seen = new Set();
  view.innerHTML = `<div class="sess-top"><a class="x" href="#/domain/${d.id}">✕</a><div class="prog big"><i id="sp"></i></div><span id="sc" class="muted"></span></div>
    <div id="q" class="qwrap"></div><div id="fb" class="feedback"></div>`;
  const Qel = $("#q"), FB = $("#fb");
  const next = () => {
    FB.className = "feedback"; FB.innerHTML = ""; TTS.stop();
    if (qi >= Q.length) return finish();
    $("#sp").style.width = (100 * qi / Q.length) + "%"; $("#sc").textContent = (qi + 1) + "/" + Q.length;
    const q = Q[qi++]; if (q.v) seen.add(q.v.id);
    RENDER[q.t](Qel, q, d, answer);
  };
  function answer(ok, html, opts = {}) {
    S.stats.answered++; if (ok) { S.stats.correct++; good++; xp += 10; }
    if (opts.vid) { srsAdd(opts.vid); if (!ok) { S.srs[opts.vid].due = today(); S.srs[opts.vid].reps = 0; } }
    save();
    FB.className = "feedback show " + (ok === null ? "neutral" : ok ? "good" : "bad");
    FB.innerHTML = `<div class="fb-in"><div><b>${ok === null ? "Noté" : ok ? "✅ Correct !" : "❌ Pas tout à fait"}</b>${html ? `<div class="fb-txt">${html}</div>` : ""}</div><button class="btn" id="cont">Continuer</button></div>`;
    $("#cont").onclick = next; $("#cont").focus();
  }
  function finish() {
    seen.forEach(srsAdd); save();
    const total = Q.filter((q) => q.t !== "flash").length;
    xp += 20; addXP(xp);
    $("#sp").style.width = "100%";
    const pct = total ? Math.round(100 * good / total) : 100;
    view.querySelector(".qwrap").innerHTML = `<div class="done">
      <div class="trophy">${pct >= 80 ? "🏆" : pct >= 50 ? "👏" : "💪"}</div>
      <h2>Session terminée !</h2>
      <div class="stats3"><div><b>+${xp}</b><small>XP</small></div>${total ? `<div><b>${pct}%</b><small>réussite</small></div>` : ""}<div><b>${seen.size}</b><small>termes travaillés</small></div></div>
      <p class="muted">Les termes ont été ajoutés à vos révisions espacées.</p>
      <div class="row gap center wrap"><a class="btn" href="#/session/${type}/${d.id}?r=${Date.now()}">↻ Recommencer</a><a class="btn ghost" href="#/domain/${d.id}">Retour</a></div></div>`;
    $("#sc").textContent = "";
  }
  next();
  cleanup = () => { TTS.stop(); SR.stop(); };
}

const optsFrom = (d, v, key, n = 4) => shuffle([v, ...sample(d.vocab.filter((x) => x !== v && x[key] !== v[key]), n - 1)]);
const RENDER = {
  flash(el, q, d, answer) {
    const v = q.v;
    el.innerHTML = `<div class="eyebrow">Nouveau terme</div>
      <div class="flash"><div class="fl-front">${speakBtn(v.en, "xl")}<h2>${esc(v.en)}</h2><button class="btn ghost" id="rev">Voir la traduction</button></div>
      <div class="fl-back hidden"><h3>${esc(v.fr)}</h3><p class="def">${esc(v.def)}</p><p>${speakBtn(v.ex, "mini", "▶")} <i>${esc(v.ex)}</i></p><small class="muted">${esc(v.exFr)}</small></div></div>`;
    say(v.en);
    $("#rev").onclick = async () => { $(".fl-back", el).classList.remove("hidden"); $("#rev").remove(); await say(v.en); await say(v.ex, { queue: true }); answer(null, "", { vid: v.id }); };
  },
  mcq(el, q, d, answer) {
    const v = q.v, opts = optsFrom(d, v, "fr");
    el.innerHTML = `<div class="eyebrow">Que signifie ce mot ?</div><div class="prompt">${speakBtn(v.en, "xl")}<h2>${esc(v.en)}</h2></div>
      <div class="opts">${opts.map((o, i) => `<button class="opt" data-i="${i}">${esc(o.fr)}</button>`).join("")}</div>`;
    say(v.en);
    choose(el, opts.indexOf(v), (ok) => answer(ok, `<b>${esc(v.en)}</b> = ${esc(v.fr)}<br><i>${esc(v.ex)}</i>`, { vid: v.id }), () => say(v.ex));
  },
  mcqrev(el, q, d, answer) {
    const v = q.v, opts = optsFrom(d, v, "en");
    el.innerHTML = `<div class="eyebrow">Comment dit-on en anglais ?</div><div class="prompt"><h2>${esc(v.fr)}</h2></div>
      <div class="opts">${opts.map((o, i) => `<button class="opt" data-i="${i}">${esc(o.en)}</button>`).join("")}</div>`;
    choose(el, opts.indexOf(v), (ok) => answer(ok, `${esc(v.fr)} = <b>${esc(v.en)}</b>`, { vid: v.id }), () => say(v.en));
  },
  listen(el, q, d, answer) {
    const v = q.v, opts = optsFrom(d, v, "en");
    el.innerHTML = `<div class="eyebrow">Écoutez et choisissez le mot entendu</div>
      <div class="prompt listen"><button class="spk xxl" id="pl">🔊</button><button class="spk" id="sl" title="Lent">🐢</button></div>
      <div class="opts">${opts.map((o, i) => `<button class="opt" data-i="${i}">${esc(o.en)}</button>`).join("")}</div>`;
    $("#pl").onclick = () => say(v.en); $("#sl").onclick = () => say(v.en, { slow: true });
    setTimeout(() => say(v.en), 250);
    choose(el, opts.indexOf(v), (ok) => answer(ok, `<b>${esc(v.en)}</b> — ${esc(v.fr)}`, { vid: v.id }));
  },
  fill(el, q, d, answer) {
    const v = q.v, re = new RegExp(v.en.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    const opts = optsFrom(d, v, "en");
    el.innerHTML = `<div class="eyebrow">Complétez la phrase</div><div class="prompt"><p class="sentence">${esc(v.ex).replace(re, "<span class='blank'>_____</span>")}</p><small class="muted">${esc(v.exFr)}</small></div>
      <div class="opts">${opts.map((o, i) => `<button class="opt" data-i="${i}">${esc(o.en)}</button>`).join("")}</div>`;
    choose(el, opts.indexOf(v), (ok) => answer(ok, `<i>${esc(v.ex)}</i>`, { vid: v.id }), () => say(v.ex));
  },
  dictation(el, q, d, answer) {
    const v = q.v;
    el.innerHTML = `<div class="eyebrow">Dictée : écrivez la phrase entendue</div>
      <div class="prompt listen"><button class="spk xxl" id="pl">🔊</button><button class="spk" id="sl" title="Lent">🐢</button></div>
      <textarea id="ans" rows="3" placeholder="Tapez ce que vous entendez…" autocapitalize="off" autocomplete="off" spellcheck="false"></textarea>
      <div class="row gap"><button class="btn" id="chk">Vérifier</button><button class="btn ghost" id="hint">Indice</button></div>`;
    $("#pl").onclick = () => say(v.ex); $("#sl").onclick = () => say(v.ex, { slow: true });
    setTimeout(() => say(v.ex), 250);
    $("#hint").onclick = () => { $("#ans").placeholder = v.ex.split(" ").map((w, i) => i < 2 ? w : w[0] + "…").join(" "); };
    $("#chk").onclick = () => {
      const r = compareWords(v.ex, $("#ans").value);
      const ok = r.score >= 85;
      $("#chk").disabled = true;
      answer(ok, `<div class="wordmap">${r.targetWords.map((w, i) => `<span class="${r.hit[i] ? "w-ok" : "w-ko"}">${esc(w)}</span>`).join(" ")}</div><small>${esc(v.exFr)} · ${r.score}% des mots</small>`, { vid: v.id });
    };
  },
  speak(el, q, d, answer) { speakQ(el, q.v.en, q.v.fr, answer, q.v.id); },
  speaks(el, q, d, answer) { speakQ(el, q.v.ex, q.v.exFr, answer, q.v.id); },
  order(el, q, d, answer) {
    const v = q.v, toks = v.ex.split(" ");
    let built = [];
    let pool = shuffle(toks.map((w, i) => ({ w, i })));
    if (pool.map((x) => x.w).join(" ") === v.ex) pool = pool.reverse();
    el.innerHTML = `<div class="eyebrow">Remettez les mots dans l'ordre</div><div class="prompt"><small class="muted">${esc(v.exFr)}</small></div>
      <div class="built" id="built"></div><div class="pool" id="pool"></div><button class="btn" id="chk" disabled>Vérifier</button>`;
    const draw = () => {
      $("#built").innerHTML = built.map((x, k) => `<button class="tok" data-b="${k}">${esc(x.w)}</button>`).join("") || `<span class="muted">Touchez les mots ci-dessous</span>`;
      $("#pool").innerHTML = pool.map((x, k) => `<button class="tok" data-p="${k}">${esc(x.w)}</button>`).join("");
      $("#chk").disabled = pool.length > 0;
      el.querySelectorAll("[data-p]").forEach((b) => b.onclick = () => { built.push(pool.splice(+b.dataset.p, 1)[0]); draw(); });
      el.querySelectorAll("[data-b]").forEach((b) => b.onclick = () => { pool.push(built.splice(+b.dataset.b, 1)[0]); draw(); });
    };
    draw();
    $("#chk").onclick = () => {
      const ok = norm(built.map((x) => x.w).join(" ")) === norm(v.ex);
      $("#chk").disabled = true; say(v.ex);
      answer(ok, `<i>${esc(v.ex)}</i>`, { vid: v.id });
    };
  },
  match(el, q, d, answer) {
    const set = sample(d.vocab, 4);
    const L = shuffle(set), R = shuffle(set);
    let sel = null, found = 0, errors = 0;
    el.innerHTML = `<div class="eyebrow">Associez chaque terme à sa traduction</div>
      <div class="match"><div>${L.map((v) => `<button class="opt m" data-l="${v.id}">${esc(v.en)}</button>`).join("")}</div>
      <div>${R.map((v) => `<button class="opt m" data-r="${v.id}">${esc(v.fr)}</button>`).join("")}</div></div>`;
    el.querySelectorAll("[data-l]").forEach((b) => b.onclick = () => { if (b.disabled) return; el.querySelectorAll("[data-l]").forEach((x) => x.classList.remove("sel")); b.classList.add("sel"); sel = b.dataset.l; say(byId[sel].en); });
    el.querySelectorAll("[data-r]").forEach((b) => b.onclick = () => {
      if (!sel || b.disabled) return;
      const lb = el.querySelector(`[data-l="${sel}"]`);
      if (b.dataset.r === sel) { b.classList.add("right"); lb.classList.add("right"); b.disabled = lb.disabled = true; lb.classList.remove("sel"); found++; sel = null;
        if (found === 4) { set.forEach((v) => srsAdd(v.id)); answer(errors <= 1, errors ? errors + " erreur(s)" : "Parfait !"); } }
      else { errors++; b.classList.add("wrong"); setTimeout(() => b.classList.remove("wrong"), 500); }
    });
  }
};
function choose(el, correctIdx, done, after) {
  el.querySelectorAll(".opt").forEach((b) => b.onclick = () => {
    el.querySelectorAll(".opt").forEach((x) => { x.disabled = true; if (+x.dataset.i === correctIdx) x.classList.add("right"); });
    const ok = +b.dataset.i === correctIdx; if (!ok) b.classList.add("wrong");
    done(ok); after && after();
  });
}
function speakQ(el, text, fr, answer, vid) {
  el.innerHTML = `<div class="eyebrow">Prononcez à voix haute</div>
    <div class="prompt">${speakBtn(text, "xl")}${speakBtn(text, "", "🐢", "data-slow")}<h2 class="${text.length > 30 ? "long" : ""}">${esc(text)}</h2><small class="muted">${esc(fr)}</small></div>
    <div id="mic"></div><button class="btn ghost sm center-b" id="skip">Je ne peux pas parler maintenant</button>`;
  say(text);
  let answered = false;
  micWidget($("#mic"), text, (r) => {
    if (answered) return;
    if (r.score >= 70) { answered = true; answer(true, `Score : ${r.score}/100`, { vid }); }
    else if (r.score < 70) { $("#skip").textContent = "Continuer quand même"; }
  });
  $("#skip").onclick = () => { if (answered) return; answered = true; answer(null, "Exercice passé — réessayez plus tard.", { vid }); };
}

/* ---------- Révision espacée ---------- */
function review() {
  setNav("review");
  const due = shuffle(dueList()).slice(0, 20);
  const known = Object.keys(S.srs).length;
  if (!due.length) {
    view.innerHTML = `<h1 class="pt">Révisions</h1><div class="card empty"><div class="trophy">🌟</div><h2>Rien à réviser pour l'instant</h2>
      <p class="muted">${known ? `Vous suivez ${known} termes, dont ${mastered()} maîtrisés. Revenez demain !` : "Faites une session dans un domaine : les termes appris arriveront ici au bon moment pour être mémorisés durablement."}</p>
      <a class="btn" href="#/domains">Explorer les domaines</a></div>`;
    return;
  }
  let i = 0, n = 0;
  const show = () => {
    if (i >= due.length) { addXP(n * 5); view.innerHTML = `<div class="card empty"><div class="trophy">✅</div><h2>Révision terminée</h2><p>+${n * 5} XP · ${due.length} cartes</p><a class="btn" href="#/">Accueil</a></div>`; return; }
    const v = byId[due[i]], d = dom(v.dom);
    view.innerHTML = `<div class="sess-top"><a class="x" href="#/">✕</a><div class="prog big"><i style="width:${100 * i / due.length}%"></i></div><span class="muted">${i + 1}/${due.length}</span></div>
      <div class="flash rv" style="--c:${d.color}"><span class="tag" style="--c:${d.color}">${d.icon} ${d.name}</span>
        <div class="fl-front">${speakBtn(v.en, "xl")}<h2>${esc(v.en)}</h2><p class="muted">Rappelez-vous la traduction, puis retournez la carte.</p></div>
        <div class="fl-back hidden"><h3>${esc(v.fr)}</h3><p class="def">${esc(v.def)}</p><p>${speakBtn(v.ex, "mini", "▶")} <i>${esc(v.ex)}</i></p><div id="rmic"></div></div></div>
      <div id="ract"><button class="btn big wide" id="flip">Retourner</button></div>`;
    say(v.en);
    $("#flip").onclick = () => {
      $(".fl-back").classList.remove("hidden");
      micWidget($("#rmic"), v.en, () => {});
      $("#ract").innerHTML = `<div class="grades"><button data-q="1" class="g1">À revoir<small>&lt;1 j</small></button><button data-q="3" class="g3">Difficile</button><button data-q="4" class="g4">Bien</button><button data-q="5" class="g5">Facile</button></div>`;
      document.querySelectorAll("[data-q]").forEach((b) => b.onclick = () => { srsGrade(v.id, +b.dataset.q); n++; i++; show(); });
    };
  };
  show();
}

/* ---------- Dialogues (écoute + jeu de rôle) ---------- */
function dialogPage(id, di, mode) {
  setNav("domains");
  const d = dom(id), g = d.dialogues[+di]; const me = mode === "listen" ? -1 : +mode;
  let token = 0, hideText = false;
  view.innerHTML = `<a class="back" href="#/domain/${id}/dialog">← Dialogues</a>
    <h1 class="pt sm">${esc(g.title)}</h1>
    <p class="muted">${me < 0 ? "Écoutez le dialogue. Touchez une réplique pour la réentendre." : `Vous jouez <b>${esc(g.roles[me])}</b>. L'app joue ${esc(g.roles[1 - me])}. Quand c'est votre tour, touchez le micro et dites votre réplique.`}</p>
    <div class="row gap wrap"><button class="btn" id="start">▶ Démarrer</button>${me >= 0 ? `<label class="toggle"><input type="checkbox" id="hide"> Mode défi (texte masqué)</label>` : ""}<label class="toggle"><input type="checkbox" id="trfr" checked> Traduction</label></div>
    <div class="chat" id="chat">${g.lines.map((l, k) => `<div class="bub ${l.s === 0 ? "l" : "r"} ${l.s === me ? "me" : ""}" data-k="${k}"><small>${esc(g.roles[l.s])}</small><div class="en">${esc(l.en)}</div><div class="fr">${esc(l.fr)}</div><div class="bmic"></div></div>`).join("")}</div>
    <div id="dres"></div>`;
  const bubs = [...document.querySelectorAll(".bub")];
  bubs.forEach((b) => b.querySelector(".en").onclick = () => { const l = g.lines[+b.dataset.k]; say(l.en, { alt: l.s }); });
  $("#trfr").onchange = (e) => $("#chat").classList.toggle("nofr", !e.target.checked);
  if ($("#hide")) $("#hide").onchange = (e) => { hideText = e.target.checked; };
  $("#start").onclick = async () => {
    const my = ++token; const scores = [];
    bubs.forEach((b) => { b.classList.remove("cur", "done"); b.querySelector(".bmic").innerHTML = ""; b.classList.toggle("masked", hideText && +b.dataset.k >= 0 && g.lines[+b.dataset.k].s === me); });
    $("#start").textContent = "↻ Recommencer";
    for (let k = 0; k < g.lines.length; k++) {
      if (my !== token) return;
      const l = g.lines[k], b = bubs[k];
      b.classList.add("cur"); b.scrollIntoView({ behavior: "smooth", block: "center" });
      if (l.s === me) {
        await new Promise((res) => {
          const box = b.querySelector(".bmic");
          micWidget(box, l.en, (r) => { scores.push(r.score); b.classList.remove("masked"); setTimeout(res, 900); });
          const sk = document.createElement("button"); sk.className = "btn sm ghost"; sk.textContent = "Écouter le modèle"; sk.onclick = () => say(l.en, { alt: l.s });
          const nx = document.createElement("button"); nx.className = "btn sm ghost"; nx.textContent = "Passer →"; nx.onclick = () => { b.classList.remove("masked"); res(); };
          const row = document.createElement("div"); row.className = "row gap center"; row.append(sk, nx); box.append(row);
        });
      } else {
        await say(l.en, { alt: l.s, pitch: l.s === 0 ? 1 : 1.08 });
        await new Promise((r) => setTimeout(r, 350));
      }
      b.classList.remove("cur"); b.classList.add("done");
    }
    if (my !== token) return;
    const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
    const gain = me < 0 ? 10 : 25; addXP(gain);
    $("#dres").innerHTML = `<div class="card empty"><div class="trophy">🎭</div><h2>Dialogue terminé</h2>${avg !== null ? `<p>Score moyen de prononciation : <b>${avg}/100</b></p>` : ""}<p>+${gain} XP</p>
      ${me < 0 ? `<a class="btn" href="#/dialog/${id}/${di}/1">🎭 Maintenant, jouez ${esc(g.roles[1])}</a>` : ""}</div>`;
    $("#dres").scrollIntoView({ behavior: "smooth" });
  };
  cleanup = () => { token++; TTS.stop(); SR.stop(); };
}

/* ---------- Compréhension orale ---------- */
function listeningPage(id, li) {
  setNav("domains");
  const d = dom(id), L = d.listening[+li]; const sents = sentences(L.text);
  let token = 0, answers = [];
  view.innerHTML = `<a class="back" href="#/domain/${id}/listen">← Écoute</a>
    <h1 class="pt sm">👂 ${esc(L.title)}</h1>
    <div class="card player"><button class="spk xxl" id="pl">▶</button><div><b>Écoutez l'enregistrement</b><small class="muted">Autant de fois que nécessaire. Essayez d'abord sans le texte.</small>
    <div class="row gap"><button class="chip" data-r="0.75">0.75×</button><button class="chip on" data-r="1">1×</button><button class="chip" data-r="1.15">1.15×</button></div></div></div>
    <div id="qs">${L.questions.map((q, k) => `<div class="card qq"><b>${k + 1}. ${esc(q.q)}</b><div class="opts">${q.o.map((o, i) => `<button class="opt" data-q="${k}" data-i="${i}">${esc(o)}</button>`).join("")}</div></div>`).join("")}</div>
    <button class="btn ghost" id="tr">📄 Afficher la transcription</button>
    <div id="trans" class="card hidden">${sents.map((s) => `<p class="ts">${speakBtn(s, "mini", "▶")} ${esc(s)}</p>`).join("")}</div>`;
  let mult = 1;
  document.querySelectorAll("[data-r]").forEach((b) => b.onclick = () => { document.querySelectorAll("[data-r]").forEach((x) => x.classList.remove("on")); b.classList.add("on"); mult = +b.dataset.r; });
  $("#pl").onclick = async () => {
    if ($("#pl").textContent === "⏸") { token++; TTS.stop(); $("#pl").textContent = "▶"; return; }
    const my = ++token; $("#pl").textContent = "⏸";
    for (const s of sents) { if (my !== token) return; await say(s, { rate: S.rate * mult }); }
    if (my === token) $("#pl").textContent = "▶";
  };
  document.querySelectorAll("#qs .opt").forEach((b) => b.onclick = () => {
    const k = +b.dataset.q, q = L.questions[k]; if (answers[k] !== undefined) return;
    answers[k] = +b.dataset.i === q.a;
    document.querySelectorAll(`[data-q="${k}"]`).forEach((x) => { x.disabled = true; if (+x.dataset.i === q.a) x.classList.add("right"); });
    if (!answers[k]) b.classList.add("wrong");
    S.stats.answered++; if (answers[k]) S.stats.correct++; save();
    if (answers.filter((a) => a !== undefined).length === L.questions.length) {
      const g = answers.filter(Boolean).length; addXP(g * 10 + 10);
      toast(`${g}/${L.questions.length} · +${g * 10 + 10} XP`);
      $("#trans").classList.remove("hidden");
    }
  });
  $("#tr").onclick = () => $("#trans").classList.toggle("hidden");
  cleanup = () => { token++; TTS.stop(); };
}

/* ---------- Mode podcast ---------- */
function podcast(id) {
  setNav("domains");
  const d = dom(id); let i = 0, token = 0, playing = false, gap = true;
  view.innerHTML = `<a class="back" href="#/domain/${id}">← ${d.name}</a>
    <div class="pod" style="--c:${d.color}">
      <div class="eyebrow">🎧 Mode podcast · ${d.name}</div>
      <div class="pod-card"><h2 id="pen"></h2><p id="pfr"></p><p id="pex" class="muted"></p></div>
      <div class="prog"><i id="pbar"></i></div>
      <div class="controls"><button class="btn ghost" id="pp">⏮</button><button class="btn big" id="ppl">▶ Lecture</button><button class="btn ghost" id="pn">⏭</button></div>
      <label class="toggle"><input type="checkbox" id="pgap" checked> Pause pour répéter après chaque mot</label>
      <label class="toggle"><input type="checkbox" id="pfrv" ${S.frVoice ? "checked" : ""}> Lire la traduction en français</label>
      <p class="muted small">Idéal dans les transports : écran allumé, écoutez et répétez à voix haute.</p>
    </div>`;
  const show = () => { const v = d.vocab[i]; $("#pen").textContent = v.en; $("#pfr").textContent = v.fr; $("#pex").textContent = v.ex; $("#pbar").style.width = (100 * (i + 1) / d.vocab.length) + "%"; };
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const loop = async () => {
    const my = ++token; playing = true; $("#ppl").textContent = "⏸ Pause";
    while (playing && my === token) {
      const v = d.vocab[i]; show(); srsAdd(v.id);
      await say(v.en); if (my !== token) return;
      if (gap) { await wait(1600); if (my !== token) return; }
      if (S.frVoice) { await say(v.fr, { lang: "fr-FR" }); if (my !== token) return; await wait(300); }
      await say(v.ex); if (my !== token) return;
      if (gap) { await wait(2400); if (my !== token) return; }
      await wait(600);
      i = (i + 1) % d.vocab.length;
      if (i === 0) { addXP(15); toast("Tour complet ! +15 XP"); }
    }
  };
  const stop = () => { playing = false; token++; TTS.stop(); $("#ppl").textContent = "▶ Lecture"; save(); };
  $("#ppl").onclick = () => playing ? stop() : loop();
  $("#pp").onclick = () => { const p = playing; stop(); i = (i - 1 + d.vocab.length) % d.vocab.length; show(); if (p) loop(); };
  $("#pn").onclick = () => { const p = playing; stop(); i = (i + 1) % d.vocab.length; show(); if (p) loop(); };
  $("#pgap").onchange = (e) => gap = e.target.checked;
  $("#pfrv").onchange = (e) => { S.frVoice = e.target.checked; save(); };
  show(); cleanup = stop;
}

/* ---------- Labo oral ---------- */
function oral(ci) {
  setNav("oral");
  const c = ci === undefined ? -1 : +ci;
  if (c < 0) {
    view.innerHTML = `<h1 class="pt">🎙️ Labo oral</h1>
      <p class="muted">Écoutez le modèle, répétez, recevez une note mot par mot. ${SR.ok ? "" : "<br><b>Votre navigateur ne propose pas la reconnaissance vocale</b> : vous pourrez vous enregistrer et comparer. Pour la notation automatique, utilisez Chrome (Android/PC) ou Safari (iPhone)."}</p>
      <div class="ex-list">${PHRASES.map((p, k) => `<a class="card exl" href="#/oral/${k}"><span>${p.cat.split(" ")[0]}</span><div><b>${p.cat.split(" ").slice(1).join(" ")}</b><small class="muted">${p.items.length} phrases à répéter</small></div></a>`).join("")}
      <a class="card exl" href="#/oral/rand"><span>🎲</span><div><b>Défi aléatoire</b><small class="muted">5 termes pro au hasard, tous domaines</small></div></a></div>
      ${S.stats.spoken ? `<div class="card"><b>Votre moyenne :</b> ${Math.round(S.stats.speakSum / S.stats.spoken)}/100 sur ${S.stats.spoken} essais</div>` : ""}`;
    return;
  }
  const items = ci === "rand" ? sample(ALL, 5).map((v) => [v.en, v.fr]) : PHRASES[c].items;
  const title = ci === "rand" ? "🎲 Défi aléatoire" : PHRASES[c].cat;
  let k = 0;
  const show = () => {
    if (k >= items.length) { addXP(20); view.innerHTML = `<div class="card empty"><div class="trophy">🎤</div><h2>Série terminée</h2><p>+20 XP</p><a class="btn" href="#/oral">Retour au labo</a></div>`; return; }
    const [en, fr] = items[k];
    view.innerHTML = `<a class="back" href="#/oral">← Labo oral</a><h1 class="pt sm">${esc(title)}</h1><div class="prog"><i style="width:${100 * k / items.length}%"></i></div>
      <div class="prompt">${speakBtn(en, "xl")}${speakBtn(en, "", "🐢", "data-slow")}<h2 class="long">${esc(en)}</h2><small class="muted">${esc(fr)}</small></div>
      <div id="mic"></div><div class="row gap center"><button class="btn" id="nx">Suivant →</button></div>`;
    say(en);
    micWidget($("#mic"), en, () => {});
    $("#nx").onclick = () => { k++; show(); };
  };
  show();
  cleanup = () => { TTS.stop(); SR.stop(); };
}

/* ---------- Grammaire ---------- */
function grammar(gid) {
  setNav("home");
  if (!gid) {
    view.innerHTML = `<a class="back" href="#/">← Accueil</a><h1 class="pt">📐 Grammaire professionnelle</h1>
      <div class="ex-list">${GRAMMAR.map((g) => `<a class="card exl" href="#/grammar/${g.id}"><span>${S.lessonsDone[g.id] ? "✅" : "📘"}</span><div><b>${esc(g.title)}</b><small class="muted">${esc(g.tag)}</small></div></a>`).join("")}</div>`;
    return;
  }
  const g = GRAMMAR.find((x) => x.id === gid); let got = 0, n = 0;
  view.innerHTML = `<a class="back" href="#/grammar">← Grammaire</a><h1 class="pt sm">${esc(g.title)}</h1>
    <div class="card rule">${esc(g.rule)}</div>
    <h3 class="sec">Exemples</h3>${g.examples.map(([en, fr]) => `<div class="card vrow"><div class="vmain">${speakBtn(en)}<div><b>${esc(en)}</b><br><small class="muted">${esc(fr)}</small></div></div></div>`).join("")}
    <h3 class="sec">Entraînement</h3>${g.items.map((it, k) => `<div class="card qq"><p class="sentence">${esc(it.s).replace("___", "<span class='blank'>___</span>")}</p><div class="opts two">${it.o.map((o, i) => `<button class="opt" data-k="${k}" data-i="${i}">${esc(o)}</button>`).join("")}</div></div>`).join("")}`;
  document.querySelectorAll("[data-k]").forEach((b) => b.onclick = () => {
    const k = +b.dataset.k, it = g.items[k];
    const row = document.querySelectorAll(`[data-k="${k}"]`); if (row[0].disabled) return;
    row.forEach((x) => { x.disabled = true; if (+x.dataset.i === it.a) x.classList.add("right"); });
    const ok = +b.dataset.i === it.a; if (!ok) b.classList.add("wrong"); else got++;
    n++; S.stats.answered++; if (ok) S.stats.correct++;
    say(it.s.replace("___", it.o[it.a]).replace(/\(.*\)/, "").replace(/«.*»\s*→\s*/, ""));
    if (n === g.items.length) { if (!S.lessonsDone[g.id]) { S.lessonsDone[g.id] = true; } addXP(got * 10); toast(`${got}/${n} · +${got * 10} XP`); }
    save();
  });
}

/* ---------- Profil & réglages ---------- */
function profile() {
  setNav("profile");
  const acc = S.stats.answered ? Math.round(100 * S.stats.correct / S.stats.answered) : 0;
  const voices = TTS.enVoices();
  view.innerHTML = `<h1 class="pt">Profil</h1>
    <div class="stats3 card"><div><b>${S.xp}</b><small>XP total</small></div><div><b>🔥 ${currentStreak()}</b><small>jours de suite</small></div><div><b>${mastered()}</b><small>mots maîtrisés</small></div></div>
    <div class="stats3 card"><div><b>${Object.keys(S.srs).length}</b><small>mots suivis</small></div><div><b>${acc}%</b><small>réussite</small></div><div><b>${S.stats.spoken ? Math.round(S.stats.speakSum / S.stats.spoken) : "–"}</b><small>note orale moy.</small></div></div>
    <h3 class="sec">Progression par domaine</h3>
    <div class="card">${DOMAINS.map((d) => `<div class="pbar-row"><span>${d.icon} ${d.name}</span><div class="prog"><i style="width:${domProgress(d)}%;background:${d.color}"></i></div><small>${domProgress(d)}%</small></div>`).join("")}</div>
    <h3 class="sec">Réglages</h3>
    <div class="card form">
      <label>Prénom <input id="nm" value="${esc(S.name)}" placeholder="Facultatif"></label>
      <label>Accent
        <select id="acc"><option value="en-US">🇺🇸 Américain</option><option value="en-GB">🇬🇧 Britannique</option><option value="en-AU">🇦🇺 Australien</option><option value="en-IN">🇮🇳 Indien</option></select></label>
      <label>Voix <select id="vc"><option value="">Automatique (meilleure disponible)</option>${voices.map((v) => `<option value="${esc(v.voiceURI)}">${esc(v.name)} (${v.lang})</option>`).join("")}</select></label>
      <label>Vitesse de lecture : <b id="rv">${S.rate.toFixed(2)}×</b><input id="rt" type="range" min="0.6" max="1.3" step="0.05" value="${S.rate}"></label>
      <label>Objectif quotidien <select id="gl"><option value="30">30 XP · tranquille</option><option value="50">50 XP · régulier</option><option value="100">100 XP · sérieux</option><option value="150">150 XP · intensif</option></select></label>
      <div class="row gap wrap"><button class="btn ghost" id="tv">🔊 Tester la voix</button><button class="btn ghost" id="tm">🎙️ Tester le micro</button></div>
      <div id="tmic"></div>
    </div>
    <div class="card small muted">
      <b>Compatibilité :</b> audio ${TTS.ok ? "✅" : "❌"} · reconnaissance vocale ${SR.ok ? "✅" : "❌ (enregistrement manuel)"}<br>
      Les voix dépendent de votre appareil. Sur Android/PC, Chrome offre les meilleures voix ; sur iPhone, ajoutez des voix « améliorées » dans Réglages › Accessibilité › Contenu énoncé.
    </div>
    <button class="btn danger" id="rs">Réinitialiser ma progression</button>`;
  $("#acc").value = S.accent; $("#vc").value = S.voiceURI; $("#gl").value = String(S.goal);
  $("#nm").onchange = (e) => { S.name = e.target.value.trim().slice(0, 30); save(); };
  $("#acc").onchange = (e) => { S.accent = e.target.value; S.voiceURI = ""; save(); profile(); say("Hello, this is how I sound."); };
  $("#vc").onchange = (e) => { S.voiceURI = e.target.value; save(); say("Hello, this is how I sound."); };
  $("#rt").oninput = (e) => { S.rate = +e.target.value; $("#rv").textContent = S.rate.toFixed(2) + "×"; save(); };
  $("#gl").onchange = (e) => { S.goal = +e.target.value; save(); updateTop(); };
  $("#tv").onclick = () => say("The quarterly results exceeded our expectations.");
  $("#tm").onclick = () => micWidget($("#tmic"), "Good morning, nice to meet you.", () => {});
  $("#rs").onclick = () => { if (confirm("Effacer toute votre progression ?")) { S = JSON.parse(JSON.stringify(DEFAULT)); save(); updateTop(); profile(); } };
}

/* ---------- Toast ---------- */
function toast(t) { const el = $("#toast"); el.textContent = t; el.classList.add("show"); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove("show"), 2500); }

/* ---------- Routeur ---------- */
let cleanup = null;
const go = (h) => { location.hash = h; };
function route() {
  if (cleanup) { try { cleanup(); } catch (e) {} cleanup = null; }
  TTS.stop(); SR.stop();
  const h = location.hash.replace(/^#\/?/, "").split("?")[0];
  const p = h.split("/");
  window.scrollTo(0, 0);
  switch (p[0]) {
    case "": home(); break;
    case "domains": domains(); break;
    case "domain": domainPage(p[1], p[2] || "learn"); break;
    case "video": videoPage(p[1]); break;
    case "session": session(p[1], p[2]); break;
    case "review": review(); break;
    case "dialog": dialogPage(p[1], p[2], p[3]); break;
    case "listening": listeningPage(p[1], p[2]); break;
    case "podcast": podcast(p[1]); break;
    case "oral": oral(p[1]); break;
    case "grammar": grammar(p[1]); break;
    case "profile": profile(); break;
    default: home();
  }
  updateTop();
}
window.addEventListener("hashchange", route);
route();

if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js", { scope: "./" }).catch(() => {}));
})();
