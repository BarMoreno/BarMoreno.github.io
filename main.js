(function () {
  "use strict";
  const P = window.PROJECTS.filter(p => !p.hidden);
  const ME = window.PROFILE;
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Covers: real image if present, coloured title card if not ---------- */
  function cover(p, extra = "") {
    const img = p.image ? `<img src="${esc(p.image)}" alt="" loading="lazy" onerror="this.remove()">` : "";
    const badge = p.video ? `<span class="play">▶ Video</span>` : p.sketchfab ? `<span class="play">3D</span>` : "";
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
  $("#kit").innerHTML =
    `<div><h3 class="label">Software</h3><ul class="chips">${ME.software.map(s => `<li>${esc(s)}</li>`).join("")}</ul></div>` +
    Object.entries(ME.skills).map(([k, v]) =>
      `<div><h3 class="label">${esc(k)}</h3><ul>${v.map(s => `<li>${esc(s)}</li>`).join("")}</ul></div>`).join("");
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
  $("#social-links").innerHTML = [...ME.socials, { label: "CV", note: "My experience on one page", url: ME.cv }].map(s => `
    <li><a href="${esc(s.url)}" target="_blank" rel="noopener">
      <div><strong>${esc(s.label)}</strong><span>${esc(s.note)}</span></div><span class="arrow">→</span>
    </a></li>`).join("");
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Project dialog (deep link: #projectid) ---------- */
  const dlg = $("#project-dialog");
  function media(p) {
    if (p.video) {
      const poster = p.image ? ` poster="${esc(p.image)}"` : "";
      return `${cover(p)}<video controls playsinline preload="metadata"${poster} src="${esc(p.video)}" style="position:relative" onerror="this.remove()"></video>`;
    }
    return cover(p);
  }
  function openProject(id) {
    const p = P.find(x => x.id === id);
    if (!p) return;
    const specs = Object.entries(p.specs || {}).map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("");
    const tabs = p.sketchfab ? `<div class="media-tabs">
        <button class="btn" type="button" data-media="main">${p.video ? "Video" : "Image"}</button>
        <button class="btn primary" type="button" data-media="3d">Rotate in 3D</button></div>` : "";
    $("#dlg-content").innerHTML = `
      <div class="dlg-media" id="dlg-media">${media(p)}</div>
      ${tabs}
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
          ${p.tools ? `<div class="block"><span class="label">Tools</span><ul class="chips">${p.tools.map(t => `<li>${esc(t)}</li>`).join("")}</ul></div>` : ""}
          ${p.links?.length ? `<div class="block">${p.links.map(l => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join("")}</div>` : ""}
        </aside>
      </div>`;
    $("#dlg-content").querySelectorAll("[data-media]").forEach(b => b.addEventListener("click", () => {
      const box = $("#dlg-media");
      box.querySelectorAll("video").forEach(v => v.pause());
      box.innerHTML = b.dataset.media === "3d"
        ? `<iframe title="${esc(p.title)} 3D model" src="https://sketchfab.com/models/${esc(p.sketchfab)}/embed?autostart=1&ui_theme=dark&dnt=1" allow="autoplay; fullscreen; xr-spatial-tracking" allowfullscreen></iframe>`
        : media(p);
    }));
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
