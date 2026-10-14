(function () {
  const A = window.ARTICLES.slice().sort((a, b) => a.id - b.id);
  const C = window.COURSE;
  const $ = (s) => document.querySelector(s);
  const app = $('#app'), side = $('#sidebar');
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const strip = (h) => String(h).replace(/<[^>]+>/g, '');

  // ---- storage (safe) ----
  const store = {
    get(k, d) { try { const v = localStorage.getItem('imk:' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('imk:' + k, JSON.stringify(v)); } catch (e) {} }
  };
  let read = store.get('read', {});
  let best = store.get('best', {});
  const markRead = (id, on) => { if (on) read[id] = 1; else delete read[id]; store.set('read', read); };

  // ---- theme ----
  const root = document.documentElement;
  const t = store.get('theme', null);
  if (t) root.setAttribute('data-theme', t);
  $('#themeBtn').onclick = () => {
    // EVA defaults to dark when no explicit choice has been made
    const cur = root.getAttribute('data-theme') ||
      (root.getAttribute('data-skin') === 'eva' ? 'dark' : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
    const dark = cur === 'dark';
    const n = dark ? 'light' : 'dark';
    root.setAttribute('data-theme', n); store.set('theme', n);
  };
  // ---- skin ----
  const SKINS = ['default', 'eva'];
  const SKIN_NAME = { default: '預設', eva: 'EVA' };
  let skin = store.get('skin', 'default');
  const applySkin = () => {
    if (skin === 'eva') root.setAttribute('data-skin', 'eva'); else root.removeAttribute('data-skin');
    $('#skinBtn').innerHTML = '風格<span class="sn">：' + SKIN_NAME[skin] + '</span>';
  };
  applySkin();
  if (window.Music) window.Music.useSkin(skin, false);
  $('#skinBtn').onclick = () => { skin = SKINS[(SKINS.indexOf(skin) + 1) % SKINS.length]; store.set('skin', skin); applySkin(); if (window.Music) window.Music.useSkin(skin, true); };
  $('#menuBtn').onclick = () => document.body.classList.toggle('menu');
  $('#scrim').onclick = () => document.body.classList.remove('menu');

  // ---- derived data ----
  const terms = [];
  A.forEach((a) => (a.concepts || []).forEach((c) => terms.push({ ...c, aid: a.id, atitle: a.title })));
  const questions = [];
  A.forEach((a) => (a.quiz || []).forEach((q, i) => questions.push({ ...q, aid: a.id, key: a.id + '-' + i })));
  const byDay = {};
  A.forEach((a) => { (byDay[a.day] = byDay[a.day] || {}); (byDay[a.day][a.topic] = byDay[a.day][a.topic] || []).push(a); });

  // ---- sidebar ----
  function renderSide(cur) {
    let h = '<div class="side-nav"><input id="search2" type="search" placeholder="搜尋…" aria-label="搜尋"><a href="#/">首頁</a><a href="#/glossary">名詞索引</a><a href="#/cards">單字閃卡</a><a href="#/quiz">測驗</a><a href="#/syllabus">課綱</a></div>';
    Object.keys(byDay).forEach((d) => {
      h += `<h4>${esc(C.days[d].label)}</h4>`;
      Object.keys(byDay[d]).forEach((tp) => {
        h += `<h4 style="margin-top:8px;text-transform:none;letter-spacing:0">${esc(C.topics[tp] || tp)}</h4>`;
        byDay[d][tp].forEach((a) => {
          h += `<a href="#/a/${a.id}" class="${cur === a.id ? 'on' : ''} ${read[a.id] ? 'done' : ''}"><span class="n">${a.id}</span><span>${esc(a.title.length > 54 ? a.title.slice(0, 52) + '…' : a.title)}</span></a>`;
        });
      });
    });
    side.innerHTML = h;
    const s2 = $('#search2');
    if (s2) s2.addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target.value.trim()) location.hash = '#/s/' + encodeURIComponent(e.target.value.trim()); });
  }

  // ---- pages ----
  function home() {
    const n = A.length, d = Object.keys(read).length;
    let h = `<div class="hero"><h1>${esc(C.title)}</h1>
      <p>${esc(C.code)} · ${esc(C.instructor)} · ${esc(C.term)}</p>
      <p><b>期末考：</b>${esc(C.exam)}</p><p><b>評分：</b>${esc(C.grading)}</p>
      <p>已讀 ${d} / ${n} 篇　·　${terms.length} 個關鍵名詞　·　${questions.length} 題練習題</p>
      <div class="sync"><span>SYNCHRONIZATION RATE</span><b>${(d / n * 100).toFixed(0)}%</b></div>
      <div class="bar"><i style="width:${(d / n * 100).toFixed(0)}%"></i></div></div>
      <div class="row"><a class="btn primary" href="#/quiz">全題庫隨機測驗</a><a class="btn" href="#/cards">名詞閃卡</a><a class="btn" href="#/glossary">名詞索引</a><a class="btn" href="#/syllabus">課綱與教科書範圍</a></div>`;
    Object.keys(byDay).forEach((dk) => {
      h += `<h2 class="day-h">${esc(C.days[dk].label)}</h2><p class="day-n">${esc(C.days[dk].note)}</p>`;
      Object.keys(byDay[dk]).forEach((tp) => {
        h += `<h3 class="topic-h">${esc(C.topics[tp] || tp)} <small style="color:var(--muted)">${esc(tp)}</small></h3><div class="grid">`;
        byDay[dk][tp].forEach((a) => {
          h += `<a class="card ${read[a.id] ? 'done' : ''}" href="#/a/${a.id}"><span class="meta">#${a.id} · ${esc(a.authors.split('(')[0])} · ${a.year}${read[a.id] ? ' · ✓ 已讀' : ''}</span><b>${esc(a.title)}</b><p>${esc(a.oneLiner)}</p></a>`;
        });
        h += '</div>';
      });
    });
    h += `<p class="notice">本站為個人學習筆記（改寫與摘要），非原文轉載。原始文章版權屬各作者與出版者。</p>`;
    app.innerHTML = h; renderSide(null);
  }

  function syllabus() {
    let h = `<h1>課綱與教科書範圍</h1><p>每日議程與閱讀以教授 syllabus 為準。</p>`;
    Object.keys(C.days).forEach((d) => { h += `<h2>${esc(C.days[d].label)}</h2><p>${esc(C.days[d].note)}</p>`; });
    C.books.forEach((b) => { h += `<h2>${esc(b.name)}</h2><ul>${b.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`; });
    h += `<div class="tip"><b>考試提醒：</b>${esc(C.exam)}。教科書章節內容本站未收錄，請依範圍自行搭配課本複習。</div>`;
    app.innerHTML = h; renderSide(null);
  }

  let tab = 'preview';
  function article(id, view) {
    const i = A.findIndex((a) => a.id === id);
    if (i < 0) return home();
    const a = A[i];
    tab = view || tab;
    const prev = A[i - 1], next = A[i + 1];
    let h = `<article><div class="ep">EPISODE : ${String(a.id).padStart(2, '0')}</div><div class="byline">${esc(C.days[a.day].label)} · ${esc(C.topics[a.topic] || a.topic)}</div>
      <h1>${esc(a.title)}</h1>
      <div class="byline">${esc(a.authors)}（${a.year}）· ${esc(a.source)} · ${esc(a.pages)} · 難度 ${'●'.repeat(a.difficulty)}${'○'.repeat(3 - a.difficulty)}</div>
      <div class="lead">${esc(a.oneLiner)}</div>
      <div class="tabs">
        <button data-t="preview" class="${tab === 'preview' ? 'on' : ''}">預習（5 分鐘）</button>
        <button data-t="review" class="${tab === 'review' ? 'on' : ''}">複習（完整筆記）</button>
        <button data-t="quiz" class="${tab === 'quiz' ? 'on' : ''}">自我測驗</button>
      </div>`;
    if (tab === 'preview') {
      h += `<div class="sec"><h2>重點摘要</h2>${a.summary.map((p) => `<p>${p}</p>`).join('')}</div>
        <div class="sec"><h2>必記重點</h2><ul>${a.keyPoints.map((k) => `<li>${k}</li>`).join('')}</ul></div>
        <div class="sec"><h2>預習時先想想</h2><ul>${a.examTips.slice(0, 2).map((k) => `<li>${k}</li>`).join('')}</ul></div>`;
    } else if (tab === 'review') {
      h += `<div class="sec"><h2>摘要</h2>${a.summary.map((p) => `<p>${p}</p>`).join('')}</div>
        <div class="sec"><h2>必記重點</h2><ul>${a.keyPoints.map((k) => `<li>${k}</li>`).join('')}</ul></div>
        <div class="sec"><h2>關鍵名詞</h2><dl class="terms">${a.concepts.map((c) => `<dt>${esc(c.term)}</dt><dd>${c.def}</dd>`).join('')}</dl></div>
        ${a.sections.map((s) => `<div class="sec"><h2>${esc(s.title)}</h2>${s.html}</div>`).join('')}
        <div class="sec"><h2>考試提示</h2><div class="tip"><ul>${a.examTips.map((k) => `<li>${k}</li>`).join('')}</ul></div></div>`;
    } else {
      h += `<div id="qbox"></div>`;
    }
    h += `<div class="pager"><span>${prev ? `<a class="btn" href="#/a/${prev.id}">← ${prev.id}</a>` : ''}</span>
      <button class="btn ${read[a.id] ? 'good' : 'primary'}" id="doneBtn">${read[a.id] ? '✓ 已讀（點擊取消）' : '標記為已讀'}</button>
      <span>${next ? `<a class="btn" href="#/a/${next.id}">${next.id} →</a>` : ''}</span></div>
      <p class="notice">以上為個人學習筆記（摘要與改寫），原文請見教授提供之 PDF／Canvas。</p></article>`;
    app.innerHTML = h; renderSide(id);
    app.querySelectorAll('.tabs button').forEach((b) => (b.onclick = () => article(id, b.dataset.t)));
    $('#doneBtn').onclick = () => { markRead(id, !read[id]); article(id); };
    if (tab === 'quiz') runQuiz($('#qbox'), a.quiz.map((q, k) => ({ ...q, key: a.id + '-' + k })), 'a' + a.id);
    window.scrollTo(0, 0);
  }

  function runQuiz(box, qs, bestKey) {
    let ans = {};
    function draw() {
      const done = Object.keys(ans).length === qs.length;
      let h = '';
      qs.forEach((q, qi) => {
        const given = ans[qi];
        h += `<div class="q"><div class="stem">${qi + 1}. ${esc(q.q)}</div>` +
          q.o.map((o, oi) => {
            let c = '';
            if (given !== undefined) { if (oi === q.a) c = 'ok'; else if (oi === given) c = 'no'; }
            return `<button class="opt ${c}" data-q="${qi}" data-o="${oi}" ${given !== undefined ? 'disabled' : ''}>${String.fromCharCode(65 + oi)}. ${esc(o)}</button>`;
          }).join('') +
          (given !== undefined ? `<div class="exp">${given === q.a ? '✓ 答對' : '✗ 答錯'}。${esc(q.e)}${q.aid ? ` <a href="#/a/${q.aid}">→ 文章 ${q.aid}</a>` : ''}</div>` : '') + '</div>';
      });
      if (done) {
        const s = qs.filter((q, qi) => ans[qi] === q.a).length;
        if (!best[bestKey] || s / qs.length > best[bestKey]) { best[bestKey] = s / qs.length; store.set('best', best); }
        h += `<div class="score">得分：${s} / ${qs.length}（${Math.round(s / qs.length * 100)}%）</div><button class="btn primary" id="again">再做一次</button>`;
      }
      box.innerHTML = h;
      box.querySelectorAll('.opt').forEach((b) => (b.onclick = () => { ans[b.dataset.q] = +b.dataset.o; draw(); }));
      const ag = box.querySelector('#again'); if (ag) ag.onclick = () => { ans = {}; draw(); };
    }
    draw();
  }

  const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  function quizPage() {
    let h = `<h1>全題庫測驗</h1><div class="row"><label>範圍
      <select id="qs"><option value="all">全部文章</option><option value="2">Day 2（文章 1–13）</option><option value="3">Day 3（文章 14–22）</option>${A.map((a) => `<option value="a${a.id}">#${a.id} ${esc(a.title.slice(0, 36))}</option>`).join('')}</select></label>
      <label>題數 <select id="qn"><option>10</option><option>20</option><option>30</option></select></label>
      <button class="btn primary" id="go">開始</button></div><div id="qbox"></div>`;
    app.innerHTML = h; renderSide(null);
    $('#go').onclick = () => {
      const s = $('#qs').value, n = +$('#qn').value;
      let pool = questions;
      if (s === '2' || s === '3') pool = questions.filter((q) => A.find((a) => a.id === q.aid).day === +s);
      else if (s[0] === 'a') pool = questions.filter((q) => q.aid === +s.slice(1));
      runQuiz($('#qbox'), shuffle(pool).slice(0, n), 'mix-' + s);
    };
  }

  function cards() {
    let h = `<h1>名詞閃卡</h1><div class="row"><label>範圍 <select id="cs"><option value="all">全部（${terms.length}）</option>${A.map((a) => `<option value="${a.id}">#${a.id} ${esc(a.title.slice(0, 36))}</option>`).join('')}</select></label></div><div id="fc"></div>`;
    app.innerHTML = h; renderSide(null);
    let deck = [], k = 0, show = false;
    const draw = () => {
      if (!deck.length) { $('#fc').innerHTML = '<p>沒有資料。</p>'; return; }
      const c = deck[k];
      $('#fc').innerHTML = `<div class="flash"><div class="face" id="face">${show
        ? `<small>${esc(c.term)}</small><div style="text-align:left;line-height:1.9">${c.def}</div>` : `<small>名詞 · 出自 EP.${c.aid}《${esc(c.atitle.length > 46 ? c.atitle.slice(0, 44) + '…' : c.atitle)}》</small><div class="term">${esc(c.term)}</div><small style="margin-top:14px">點擊翻面</small>`}</div></div>
        <div class="row"><button class="btn" id="pv">← 上一張</button><span>${k + 1} / ${deck.length}</span><button class="btn" id="nx">下一張 →</button><button class="btn" id="sh">洗牌</button><a class="btn" href="#/a/${c.aid}">看原文筆記</a></div>`;
      $('#face').onclick = () => { show = !show; draw(); };
      $('#pv').onclick = () => { k = (k - 1 + deck.length) % deck.length; show = false; draw(); };
      $('#nx').onclick = () => { k = (k + 1) % deck.length; show = false; draw(); };
      $('#sh').onclick = () => { deck = shuffle(deck); k = 0; show = false; draw(); };
    };
    const load = () => { const v = $('#cs').value; deck = shuffle(v === 'all' ? terms : terms.filter((x) => x.aid === +v)); k = 0; show = false; draw(); };
    $('#cs').onchange = load; load();
  }

  function glossary(q) {
    const f = (q || '').toLowerCase();
    const list = terms.filter((x) => !f || (x.term + strip(x.def)).toLowerCase().includes(f)).sort((a, b) => a.term.localeCompare(b.term));
    app.innerHTML = `<h1>名詞索引</h1><div class="row"><input class="f" id="gf" placeholder="篩選名詞…" value="${esc(q || '')}"><span>${list.length} 項</span></div>
      <dl class="terms">${list.map((x) => `<dt>${esc(x.term)} <a class="chip" href="#/a/${x.aid}">#${x.aid}</a></dt><dd>${x.def}</dd>`).join('')}</dl>`;
    renderSide(null);
    const inp = $('#gf'); inp.oninput = () => { glossary(inp.value); const n = $('#gf'); n.focus(); n.setSelectionRange(n.value.length, n.value.length); };
  }

  function searchPage(q) {
    const f = q.toLowerCase();
    let hits = [];
    A.forEach((a) => {
      const blob = [a.title, a.authors, a.oneLiner, ...a.summary, ...a.keyPoints, ...a.examTips, ...a.concepts.map((c) => c.term + ' ' + c.def), ...a.sections.map((s) => s.title + ' ' + s.html)].map(strip).join('\n');
      const idx = blob.toLowerCase().indexOf(f);
      if (idx >= 0) hits.push({ a, snip: blob.slice(Math.max(0, idx - 30), idx + 90) });
    });
    app.innerHTML = `<h1>搜尋：「${esc(q)}」</h1><p>${hits.length} 篇相符</p>` + hits.map((h) => `<div class="hit"><a href="#/a/${h.a.id}"><b>#${h.a.id} ${esc(h.a.title)}</b></a><div class="exp">…${esc(h.snip).replace(new RegExp(esc(q).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'ig'), (m) => `<mark>${m}</mark>`)}…</div></div>`).join('');
    renderSide(null);
  }

  // ---- router ----
  function route() {
    document.body.classList.remove('menu');
    const h = location.hash.replace(/^#\/?/, '');
    document.querySelectorAll('.top-nav a').forEach((a) => a.classList.toggle('on', a.getAttribute('href') === '#/' + h || (h === '' && a.getAttribute('href') === '#/')));
    if (h.startsWith('a/')) return article(+h.slice(2));
    if (h === 'glossary') return glossary('');
    if (h === 'cards') return cards();
    if (h === 'quiz') return quizPage();
    if (h === 'syllabus') return syllabus();
    if (h.startsWith('s/')) return searchPage(decodeURIComponent(h.slice(2)));
    home();
  }
  window.addEventListener('hashchange', route);
  $('#search').addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target.value.trim()) location.hash = '#/s/' + encodeURIComponent(e.target.value.trim()); });
  route();
})();
