(function () {
  "use strict";
  const P = window.PROJECTS.filter(p => !p.hidden);
  const ME = window.PROFILE;
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Images: local file first, then online fallback, then title card ---------- */
  window.__imgFail = function (img) {
    const fb = img.getAttribute("data-fallback");
    if (fb) { img.removeAttribute("data-fallback"); img.src = fb; } else img.remove();
  };
  const imgTag = (src, fallback, alt = "", lazy = true, style = "") =>
    `<img src="${esc(src || fallback)}" alt="${esc(alt)}"${style ? ` style="${esc(style)}"` : ""}${lazy ? ' loading="lazy"' : ""}${src && fallback ? ` data-fallback="${esc(fallback)}"` : ""} onerror="__imgFail(this)">`;

  function cover(p, extra = "") {
    const st = (p.imagePos ? `object-position:${p.imagePos};` : "") + (p.pixelArt ? "image-rendering:pixelated;" : "");
    const img = p.image || p.imageOnline ? imgTag(p.image, p.imageOnline, "", true, st) : "";
    const badge = p.youtube ? `<span class="play">▶ Trailer</span>` : p.video ? `<span class="play">▶ Video</span>` : p.sketchfab ? `<span class="play">3D</span>` : "";
    return `<div class="cover ${extra}" style="--h:${p.hue ?? 200}"><span class="fallback">${esc(p.title)}</span>${img}${badge}</div>`;
  }

  /* ---------- Featured ---------- */
  $("#featured").innerHTML = P.filter(p => p.featured).map(p => `
    <a class="tile" href="#${p.id}" data-open="${p.id}">
      ${cover(p)}
      <div class="tile-body">
        <div class="tile-top"><h3>${esc(p.title)}</h3><span class="label">${esc(p.tagline)}</span></div>
        <p class="summary">${esc(p.summary)}</p>
        <ul class="chips">${(p.disciplines || []).map(d => `<li>${esc(d)}</li>`).join("")}</ul>
        ${p.focus ? `<ul class="focus">${p.focus.slice(0, 4).map(f => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}
      </div>
    </a>`).join("");

  /* ---------- Archive ---------- */
  function renderArchive(filter) {
    const items = P.filter(p => !p.featured && (filter === "all" || p.category === filter));
    $("#archive-grid").innerHTML = items.length ? items.map(p => `
      <a class="tile" href="#${p.id}" data-open="${p.id}">
        ${cover(p)}
        <div class="tile-body">
          <h3>${esc(p.title)}</h3>
          <span class="label">${esc(p.tagline)}</span>
        </div>
      </a>`).join("") : `<p class="label">More projects coming soon.</p>`;
  }
  renderArchive("all");
  document.querySelectorAll(".filters button").forEach(b => b.addEventListener("click", () => {
    document.querySelectorAll(".filters button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    renderArchive(b.dataset.filter);
  }));

  /* ---------- About kit ---------- */
  const ICONS = window.SOFTWARE_ICONS || {};
  const lum = hex => { const n = parseInt(hex.slice(1), 16); return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255; };
  const softwareTile = s => {
    const ic = ICONS[s];
    const brand = ic && lum(ic.hex) > 0.25 && lum(ic.hex) < 0.85 ? ic.hex : "";
    const svg = ic ? `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${ic.path}"/></svg>` : `<span class="sw-initial" aria-hidden="true">${esc(s[0])}</span>`;
    return `<li class="sw"${brand ? ` style="--brand:${brand}"` : ""}>${svg}<span>${esc(s)}</span></li>`;
  };
  $("#kit").innerHTML =
    `<div class="software"><h3 class="label">Software</h3><ul class="sw-grid">${ME.software.map(softwareTile).join("")}</ul></div>` +
    Object.entries(ME.skills).map(([k, v]) =>
      `<div><h3 class="label">${esc(k)}</h3><ul>${v.map(s => `<li>${esc(s)}</li>`).join("")}</ul></div>`).join("");
  if (ME.lookingFor && $("#looking")) {
    const L = ME.lookingFor;
    const box = $("#looking");
    box.innerHTML = `
      <p class="looking-tag"><span class="pulse" aria-hidden="true"></span>Open to an internship</p>
      <h3>${esc(L.title)}</h3>
      <dl>
        <dt>When</dt><dd>${esc(L.when)}</dd>
        <dt>Roles</dt><dd>${(L.roles || []).map(esc).join(" · ")}</dd>
      </dl>
      ${L.note ? `<p class="looking-note">${esc(L.note)}</p>` : ""}
      <div class="looking-actions"><a class="btn primary" href="#contact">Get in touch</a><a class="btn" href="${esc(ME.cv)}" target="_blank" rel="noopener">See my CV ↗</a></div>`;
    box.hidden = false;
  }
  if (ME.photo) $("#portrait").insertAdjacentHTML("beforeend", `<img src="${esc(ME.photo)}" alt="Portrait of ${esc(ME.name)}" onerror="this.remove()">`);

  /* ---------- Contact ---------- */
  const mail = $("#email-link");
  mail.textContent = ME.email; mail.href = "mailto:" + ME.email;
  $("#copy-email").addEventListener("click", e => {
    const btn = e.currentTarget;
    const done = () => { btn.textContent = "Copied"; setTimeout(() => (btn.textContent = "Copy"), 1600); };
    try {
      navigator.clipboard.writeText(ME.email).then(done, () => selectText(mail));
    } catch (_) { selectText(mail); }
  });
  function selectText(el) { const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }
  $("#nav-cv").href = ME.cv;
  const extraLinks = [{ label: "CV", note: "My experience on one page", url: ME.cv }];
  if (ME.letter) extraLinks.push({ label: "Motivational letter", note: "Why I make games, in my own words", url: ME.letter });
  $("#social-links").innerHTML = [...ME.socials, ...extraLinks].map(s => `
    <li><a href="${esc(s.url)}" target="_blank" rel="noopener">
      <div><strong>${esc(s.label)}</strong><span>${esc(s.note)}</span></div><span class="arrow">→</span>
    </a></li>`).join("");
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Project dialog (deep link: #projectid) ---------- */
  const dlg = $("#project-dialog");
  /* Everything that can show in the big media area, in order */
  function mediaItems(p) {
    const items = [];
    if (p.youtube) items.push({ type: "yt", label: "Trailer" });
    else if (p.video) items.push({ type: "video", label: p.videoLabel || "Video", src: p.video, poster: p.image });
    (p.videos || []).forEach(v => items.push({ type: "video", label: v.label || "Video", src: v.src, poster: v.poster, chapters: v.chapters }));
    if (p.sketchfab) items.push({ type: "3d", label: "3D model" });
    (p.gallery || []).forEach((g, i) => items.push({ type: "img", label: g.label || "Screenshot " + (i + 1), tag: g.label, src: g.src, online: g.online }));
    if (!items.length) items.push({ type: "cover", label: "Cover" });
    return items;
  }
  function stage(p, it) {
    switch (it.type) {
      case "yt":
        return `<button class="yt-poster" type="button" data-yt="${esc(p.youtube)}" aria-label="Play ${esc(p.title)} trailer">
            ${cover(p)}<span class="yt-play" aria-hidden="true">▶</span></button>`;
      case "video":
        return `${cover(p)}<video controls playsinline preload="metadata"${it.poster ? ` poster="${esc(it.poster)}"` : ""} src="${esc(it.src)}" style="position:absolute;inset:0" onerror="this.remove()"></video>`;
      case "3d":
        return `<div class="cover" style="--h:${p.hue ?? 200}"><span class="fallback">${esc(p.title)}</span>${p.image ? imgTag(p.image, p.imageOnline) : ""}</div>
          <button class="sf-load" type="button" data-sf="${esc(p.sketchfab)}"><span>Load 3D viewer</span></button>`;
      case "img":
        return `<div class="cover shot" style="--h:${p.hue ?? 200}">${imgTag(it.src, it.online, it.label, false)}</div>`;
      default:
        return cover(p);
    }
  }
  function thumb(p, it, i) {
    let inner;
    if (it.type === "img") inner = imgTag(it.src, it.online) + (it.tag ? `<span class="t-tag">${esc(it.tag)}</span>` : "");
    else if (it.type === "yt") inner = (p.image || p.imageOnline ? imgTag(p.image, p.imageOnline) : "") + `<span class="t-tag">▶ Trailer</span>`;
    else if (it.type === "video") inner = (it.poster ? imgTag(it.poster) : "") + `<span class="t-tag">▶ ${esc(it.label)}</span>`;
    else if (it.type === "3d") inner = `<span class="t-tag">3D</span>`;
    else inner = `<span class="t-tag">${esc(it.label)}</span>`;
    return `<button type="button" class="thumb" data-item="${i}" aria-label="${esc(it.label)}" aria-pressed="${i === 0}" style="--h:${p.hue ?? 200}">${inner}</button>`;
  }
  function toolChip(t) {
    const key = Object.keys(ICONS).sort((a, b) => b.length - a.length).find(k => t.toLowerCase().startsWith(k.toLowerCase()));
    const ic = key && ICONS[key];
    return `<li>${ic ? `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${ic.path}"/></svg>` : ""}${esc(t)}</li>`;
  }
  function processBlock(p) {
    const pr = p.process;
    if (!pr) return "";
    const steps = (pr.steps || []).map(s => `
      <li class="${s.image || s.video ? "" : "no-img"}">${s.video
        ? `<a href="${esc(s.video)}" target="_blank" rel="noopener" aria-label="Open the clip for ${esc(s.title)}"><video src="${esc(s.video)}"${s.poster ? ` poster="${esc(s.poster)}"` : ""} muted loop playsinline preload="none" data-autoplay></video></a>`
        : s.image ? `<a href="${esc(s.image)}" target="_blank" rel="noopener">${imgTag(s.image, "", s.title)}</a>` : ""}<div><h4>${esc(s.title)}</h4>${(Array.isArray(s.text) ? s.text : [s.text]).filter(Boolean).map(t => `<p>${esc(t)}</p>`).join("")}${s.list ? `<ul class="process-list">${s.list.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}${s.link ? `<a class="process-link" href="${esc(s.link.url)}" target="_blank" rel="noopener">${esc(s.link.label)} ↗</a>` : ""}</div></li>`).join("");
    return `<section class="process">
      <h3 class="label">Design process</h3>
      ${pr.intro ? `<p>${esc(pr.intro)}</p>` : ""}
      ${steps ? `<ol class="process-steps">${steps}</ol>` : ""}
      <div class="process-actions">
      ${pr.miro ? `<a class="btn primary" href="${esc(pr.miro)}" target="_blank" rel="noopener">Open the full process board on Miro ↗</a>` : ""}
      ${pr.doc ? `<a class="btn${pr.miro ? "" : " primary"}" href="${esc(pr.doc.url)}" target="_blank" rel="noopener">${esc(pr.doc.label)} ↗</a>` : ""}
      </div>
    </section>`;
  }
  function openProject(id) {
    const p = P.find(x => x.id === id);
    if (!p) return;
    const items = mediaItems(p);
    const specs = Object.entries(p.specs || {}).map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("");
    $("#dlg-content").innerHTML = `
      <div class="dlg-media" id="dlg-media">${stage(p, items[0])}</div>
      <div class="chapters" id="dlg-chapters" hidden></div>
      ${items.length > 1 ? `<div class="thumbs">${items.map((it, i) => thumb(p, it, i)).join("")}</div>` : ""}
      <div class="dlg-body">
        <div>
          <p class="label">${esc((p.disciplines || []).join(" / "))}</p>
          <h2 id="dlg-title">${esc(p.title)}</h2>
          <div class="prose">${(p.body || [p.summary]).map(t => `<p>${esc(t)}</p>`).join("")}</div>
        </div>
        <aside class="spec">
          <h3>Project sheet</h3>
          <dl>${specs}</dl>
          ${p.focus ? `<div class="block"><span class="label">My focus</span><ul class="focus" style="grid-template-columns:1fr;border:0;padding:0">${p.focus.map(f => `<li>${esc(f)}</li>`).join("")}</ul></div>` : ""}
          ${p.tools ? `<div class="block"><span class="label">Tools</span><ul class="chips tool-chips">${p.tools.map(toolChip).join("")}</ul></div>` : ""}
          ${p.links?.length ? `<div class="block">${p.links.map(l => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join("")}</div>` : ""}
        </aside>
        ${processBlock(p)}
      </div>`;
    const box = $("#dlg-media");
    const chapBar = $("#dlg-chapters");
    const fmt = t => Math.floor(t / 60) + ":" + String(Math.floor(t % 60)).padStart(2, "0");
    function showChapters(it) {
      if (!it.chapters) { chapBar.hidden = true; chapBar.innerHTML = ""; return; }
      chapBar.hidden = false;
      chapBar.innerHTML = `<span class="label">Jump to</span>` + it.chapters.map(c =>
        `<button type="button" data-t="${c.t}"><b>${fmt(c.t)}</b> ${esc(c.label)}</button>`).join("");
      chapBar.querySelectorAll("[data-t]").forEach(b => b.addEventListener("click", () => {
        const v = box.querySelector("video"); if (!v) return;
        v.currentTime = +b.dataset.t; v.play().catch(() => {});
      }));
    }
    showChapters(items[0]);
    box.addEventListener("click", e => {
      const yt = e.target.closest("[data-yt]"), sf = e.target.closest("[data-sf]");
      if (yt) box.innerHTML = `<iframe title="${esc(p.title)} trailer" src="https://www.youtube-nocookie.com/embed/${esc(yt.dataset.yt)}?autoplay=1&rel=0" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
      if (sf) box.innerHTML = `<iframe title="${esc(p.title)} 3D model" src="https://sketchfab.com/models/${esc(sf.dataset.sf)}/embed?autostart=1&ui_theme=dark&dnt=1" allow="autoplay; fullscreen; xr-spatial-tracking" allowfullscreen></iframe>`;
    });
    $("#dlg-content").querySelectorAll("[data-item]").forEach(b => b.addEventListener("click", () => {
      $("#dlg-content").querySelectorAll("[data-item]").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
      box.innerHTML = stage(p, items[+b.dataset.item]);
      showChapters(items[+b.dataset.item]);
    }));
    const clips = $("#dlg-content").querySelectorAll("video[data-autoplay]");
    if (clips.length && !reduceMotion && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(entries => entries.forEach(en => {
        if (en.isIntersecting) en.target.play().catch(() => {}); else en.target.pause();
      }), { root: dlg, threshold: .4 });
      clips.forEach(v => io.observe(v));
    }
    if (!dlg.open) dlg.showModal();
    dlg.scrollTop = 0;
  }
  function closeProject() { if (dlg.open) dlg.close(); }
  dlg.addEventListener("close", () => {
    $("#dlg-content").innerHTML = "";
    if (location.hash.slice(1) && P.some(p => p.id === location.hash.slice(1))) {
      history.replaceState(null, "", location.pathname + location.search);
    }
  });
  dlg.addEventListener("click", e => { if (e.target === dlg) closeProject(); });
  $("#dlg-close").addEventListener("click", closeProject);
  document.addEventListener("click", e => {
    const t = e.target.closest("[data-open]");
    if (!t) return;
    e.preventDefault();
    history.replaceState(null, "", "#" + t.dataset.open);
    openProject(t.dataset.open);
  });
  const fromHash = () => { const id = location.hash.slice(1); if (P.some(p => p.id === id)) openProject(id); };
  window.addEventListener("hashchange", fromHash);
  fromHash();

  /* ---------- Smiley signature ---------- */
  const smiley = $("#smiley");
  if (smiley) {
    let clicks = [], happyTimer;
    smiley.addEventListener("click", () => {
      const now = Date.now();
      clicks = clicks.filter(t => now - t < 2000); clicks.push(now);
      if (!reduceMotion) {
        smiley.classList.remove("squish"); void smiley.offsetWidth; smiley.classList.add("squish");
      }
      if (clicks.length >= 5) {
        clicks = [];
        smiley.classList.add("happy");
        if (!reduceMotion) { smiley.classList.remove("bounce"); void smiley.offsetWidth; smiley.classList.add("bounce"); }
        clearTimeout(happyTimer);
        happyTimer = setTimeout(() => smiley.classList.remove("happy"), 1800);
      }
    });
    smiley.addEventListener("animationend", e => smiley.classList.remove(e.animationName === "smiley-bounce" ? "bounce" : "squish"));
  }

  /* ---------- Reel (replaces the toy once assets/reel.mp4 exists) ---------- */
  const reelBox = $("#reel"), reelVid = $("#reel-video");
  if (reelBox && reelVid && ME.reel) {
    if (ME.reelPoster) reelVid.poster = ME.reelPoster;
    reelVid.addEventListener("loadeddata", () => {
      reelBox.hidden = false;
      const toyEl = $("#toy"); if (toyEl) toyEl.hidden = true;
      if (!reduceMotion) reelVid.play().catch(() => {});
      else reelVid.controls = true;
    }, { once: true });
    reelVid.addEventListener("error", () => { reelBox.remove(); }, { once: true });
    reelVid.src = ME.reel;
  }

  /* ---------- Juggling toy ---------- */
  const box = $("#toy"), cvs = $("#toy-canvas"), ctx = cvs.getContext("2d");
  let W = 0, H = 0, dpr = 1, colors = {}, frame = 0;
  const ball = { x: 0, y: 0, vx: 0, vy: 0, r: 30, squash: 0, rot: 0 };
  let score = 0, best = 0, shake = 0, particles = [], running = true, started = false;
  try { best = +localStorage.getItem("juggle-best") || 0; } catch (_) {}
  $("#hud-best").textContent = best;

  function readColors() {
    const cs = getComputedStyle(document.documentElement);
    colors = { ink: cs.getPropertyValue("--ink").trim(), ball: cs.getPropertyValue("--ball").trim(),
      accent: cs.getPropertyValue("--accent").trim(), line: cs.getPropertyValue("--line").trim() };
  }
  function resize() {
    const r = box.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width; H = r.height;
    cvs.width = W * dpr; cvs.height = H * dpr;
    ball.r = Math.max(22, Math.min(W, H) * 0.075);
    if (!started) { ball.x = W / 2; ball.y = H - floorPad() - ball.r; }
    readColors();
  }
  const floorPad = () => H * 0.14;

  function kick(px, py) {
    const dx = ball.x - px, dy = ball.y - py;
    if (Math.hypot(dx, dy) > ball.r * 1.8) return false;
    started = true;
    ball.vy = -Math.max(H * 1.55, 520);
    ball.vx = (dx / ball.r) * W * 0.9 + (Math.random() - 0.5) * 60;
    ball.squash = 1;
    score++; $("#hud-score").textContent = score;
    if (score > best) { best = score; $("#hud-best").textContent = best; try { localStorage.setItem("juggle-best", best); } catch (_) {} }
    $("#toy-hint").textContent = score < 3 ? "Nice. Again!" : score < 10 ? "Keep it going…" : "Okay, you're good at this.";
    if (!reduceMotion) {
      shake = 6;
      for (let i = 0; i < 14; i++) {
        const a = Math.random() * Math.PI * 2, s = 120 + Math.random() * 260;
        particles.push({ x: px, y: py, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1 });
      }
    }
    return true;
  }
  box.addEventListener("pointerdown", e => {
    const r = cvs.getBoundingClientRect();
    kick(e.clientX - r.left, e.clientY - r.top);
  });
  box.tabIndex = 0;
  box.addEventListener("keydown", e => {
    if (e.code === "Space" || e.code === "Enter") { e.preventDefault(); kick(ball.x + (Math.random() - 0.5) * ball.r, ball.y + ball.r * 0.5); }
  });

  let last = performance.now();
  function step(now) {
    const dt = Math.min(0.033, (now - last) / 1000); last = now;
    if (++frame % 90 === 0) readColors();
    const g = H * 3.2, floor = H - floorPad();
    ball.vy += g * dt; ball.x += ball.vx * dt; ball.y += ball.vy * dt;
    ball.vx *= 0.995; ball.rot += ball.vx * dt / ball.r; ball.squash = Math.max(0, ball.squash - dt * 5);
    if (ball.x < ball.r) { ball.x = ball.r; ball.vx = Math.abs(ball.vx) * 0.8; }
    if (ball.x > W - ball.r) { ball.x = W - ball.r; ball.vx = -Math.abs(ball.vx) * 0.8; }
    if (ball.y < ball.r) { ball.y = ball.r; ball.vy = Math.abs(ball.vy) * 0.5; }
    if (ball.y > floor - ball.r) {
      if (ball.vy > 150 && score > 0) {
        $("#toy-hint").textContent = score > 1 ? `Dropped at ${score}. Click to try again.` : "Dropped! Click to try again.";
        score = 0; $("#hud-score").textContent = 0; ball.squash = 0.7;
      }
      ball.y = floor - ball.r; ball.vy = -ball.vy * 0.45; ball.vx *= 0.85;
      if (Math.abs(ball.vy) < 40) ball.vy = 0;
    }
    particles.forEach(p => { p.vy += g * 0.4 * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt * 2.2; });
    particles = particles.filter(p => p.life > 0);
    shake *= 0.85;
    draw(floor);
    if (running) requestAnimationFrame(step);
  }

  function draw(floor) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    if (shake > 0.3) ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);
    // floor
    ctx.strokeStyle = colors.ink; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, floor); ctx.lineTo(W, floor); ctx.stroke();
    ctx.fillStyle = colors.line;
    for (let x = -((ball.x * 0.2) % 24); x < W; x += 24) ctx.fillRect(x, floor + 8, 12, 2);
    // shadow
    const height = Math.max(0, floor - ball.r - ball.y), k = 1 - Math.min(1, height / H);
    ctx.globalAlpha = 0.18 * k + 0.05; ctx.fillStyle = colors.ink;
    ctx.beginPath(); ctx.ellipse(ball.x, floor + 2, ball.r * (0.4 + 0.6 * k), ball.r * 0.18 * k + 2, 0, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;
    // particles
    ctx.fillStyle = colors.accent;
    particles.forEach(p => { ctx.globalAlpha = p.life; ctx.fillRect(p.x - 3, p.y - 3, 6 * p.life + 1, 6 * p.life + 1); });
    ctx.globalAlpha = 1;
    // ball with squash and stretch
    const speed = Math.min(1, Math.hypot(ball.vx, ball.vy) / (H * 2));
    const sq = ball.squash * 0.35, st = speed * 0.18;
    ctx.save();
    ctx.translate(ball.x, ball.y);
    ctx.rotate(Math.atan2(ball.vy, ball.vx) || 0);
    ctx.scale(1 + st - sq, 1 - st + sq);
    ctx.rotate(-(Math.atan2(ball.vy, ball.vx) || 0) + ball.rot);
    ctx.fillStyle = colors.ball; ctx.strokeStyle = colors.ink; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.arc(0, 0, ball.r, 0, Math.PI * 2); ctx.fill();
    ctx.save(); ctx.clip();
    ctx.fillStyle = colors.accent;
    ctx.fillRect(-ball.r, -ball.r * 0.22, ball.r * 2, ball.r * 0.44);
    ctx.restore();
    ctx.beginPath(); ctx.arc(0, 0, ball.r, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,.55)";
    ctx.beginPath(); ctx.arc(-ball.r * 0.35, -ball.r * 0.4, ball.r * 0.2, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  resize();
  new ResizeObserver(resize).observe(box);
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", readColors);
  new IntersectionObserver(([e]) => {
    const was = running; running = e.isIntersecting;
    if (running && !was) { last = performance.now(); requestAnimationFrame(step); }
  }).observe(box);
  requestAnimationFrame(step);
})();
