(function () {
  const A = window.ARTICLES.slice().sort((a, b) => a.id - b.id);
  const CH = (window.CHAPTERS || []).slice().sort((a, b) => a.id - b.id);
  const SL = window.SLIDES || {};
  const C = window.COURSE;
  const $ = (s) => document.querySelector(s);
  const app = $('#app'), side = $('#sidebar');
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const strip = (h) => String(h).replace(/<[^>]+>/g, '');

  // ---- items: articles (kind a) and textbook chapters (kind c) ----
  A.forEach((a) => {
    a.kind = 'a'; a.key = a.id; a.href = '#/a/' + a.id; a.src = 'EP.' + a.id;
    const s = SL[a.id];
    if (s) { a.slides = s.slides; a.slideNote = s.note; a.quiz = a.quiz.concat(s.quiz.map((q) => ({ ...q, fromSlides: true }))); }
  });
  CH.forEach((c) => { c.kind = 'c'; c.key = 'c' + c.id; c.href = '#/c/' + c.id; c.src = c.label; });
  const ITEMS = CH.concat(A);
  // Shuffle options with a seed taken from the question text, so answer positions vary but stay stable across visits.
  // Questions with an order-dependent option such as "以上皆是" keep their original order.
  const seeded = (str) => { let h = 2166136261; for (const ch of str) { h ^= ch.codePointAt(0); h = Math.imul(h, 16777619); } return () => { h = Math.imul(h ^ (h >>> 15), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; }; };
  ITEMS.forEach((x) => {
    x.quiz = x.quiz.map((q) => {
      if (q.o.some((o) => o.startsWith('以上'))) return q;
      const rnd = seeded(q.q), idx = q.o.map((_, i) => i);
      for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
      return { ...q, o: idx.map((i) => q.o[i]), a: idx.indexOf(q.a) };
    });
  });
  const findItem = (key) => ITEMS.find((x) => String(x.key) === String(key));

  // ---- storage (safe) ----
  const store = {
    get(k, d) { try { const v = localStorage.getItem('imk:' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('imk:' + k, JSON.stringify(v)); } catch (e) {} }
  };
  let read = store.get('read2', {});
  let best = store.get('best2', {});
  const markRead = (key, on) => { if (on) read[key] = 1; else delete read[key]; store.set('read2', read); };

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
  ITEMS.forEach((x) => (x.concepts || []).forEach((c) => terms.push({ ...c, ref: x.key, href: x.href, src: x.src, from: x.titleZh || x.title })));
  const questions = [];
  ITEMS.forEach((x) => (x.quiz || []).forEach((q, i) => questions.push({ ...q, ref: x.key, href: x.href, src: x.src, kind: x.kind, day: x.day, key: x.key + '-' + i })));
  const byDay = {};
  Object.keys(C.days).forEach((d) => { byDay[d] = { ch: CH.filter((c) => c.day === +d), topics: {} }; });
  A.forEach((a) => { const t = byDay[a.day].topics; (t[a.topic] = t[a.topic] || []).push(a); });
  const shortT = (s, n) => (s.length > n ? s.slice(0, n - 2) + '…' : s);
  const itemOptions = () => CH.map((c) => `<option value="${c.key}">${esc(c.label)} ${esc(c.titleZh)}</option>`).join('') +
    A.map((a) => `<option value="${a.key}">#${a.id} ${esc(shortT(a.title, 38))}</option>`).join('');

  // ---- sidebar ----
  function renderSide(cur) {
    let h = '<div class="side-nav"><input id="search2" type="search" placeholder="搜尋…" aria-label="搜尋"><a href="#/">首頁</a><a href="#/syllabus">課綱與課表</a><a href="#/glossary">名詞索引</a><a href="#/cards">單字閃卡</a><a href="#/quiz">測驗</a><a href="#/exam">模擬考</a></div>';
    Object.keys(byDay).forEach((d) => {
      h += `<h4>${esc(C.days[d].label)}</h4>`;
      if (byDay[d].ch.length) {
        h += '<h4 style="margin-top:8px;text-transform:none;letter-spacing:0">教科書與導論</h4>';
        byDay[d].ch.forEach((c) => {
          h += `<a href="${c.href}" class="${cur === c.key ? 'on' : ''} ${read[c.key] ? 'done' : ''}"><span class="n">${esc(c.label)}</span><span>${esc(c.titleZh)}</span></a>`;
        });
      }
      Object.keys(byDay[d].topics).forEach((tp) => {
        h += `<h4 style="margin-top:8px;text-transform:none;letter-spacing:0">${esc(C.topics[tp] || tp)}</h4>`;
        byDay[d].topics[tp].forEach((a) => {
          h += `<a href="${a.href}" class="${cur === a.key ? 'on' : ''} ${read[a.key] ? 'done' : ''}"><span class="n">${a.id}</span><span>${esc(shortT(a.title, 54))}</span></a>`;
        });
      });
    });
    side.innerHTML = h;
    const s2 = $('#search2');
    if (s2) s2.addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target.value.trim()) location.hash = '#/s/' + encodeURIComponent(e.target.value.trim()); });
  }

  // ---- pages ----
  const card = (x) => `<a class="card ${read[x.key] ? 'done' : ''}" href="${x.href}"><span class="meta">${x.kind === 'a' ? `#${x.id} · ${esc(x.authors.split('(')[0])} · ${x.year}` : `教科書 · ${esc(x.label)}`}${read[x.key] ? ' · ✓ 已讀' : ''}</span><b>${esc(x.kind === 'a' ? x.title : x.titleZh)}</b><p>${esc(x.oneLiner)}</p></a>`;

  function home() {
    const n = ITEMS.length, d = ITEMS.filter((x) => read[x.key]).length;
    const sq = questions.filter((q) => q.fromSlides).length;
    let h = `<div class="hero"><h1>${esc(C.title)}</h1>
      <p>${esc(C.code)} · ${esc(C.instructor)} · ${esc(C.term)}</p>
      <p><b>期末考：</b>${esc(C.exam)}</p><p><b>評分：</b>${esc(C.grading)}</p>
      <p>已讀 ${d} / ${n}（${A.length} 篇文章＋${CH.length} 個教科書單元）　·　${terms.length} 個關鍵名詞　·　${questions.length} 題練習題（其中 ${sq} 題出自老師投影片）</p>
      <div class="sync"><span>SYNCHRONIZATION RATE</span><b>${(d / n * 100).toFixed(0)}%</b></div>
      <div class="bar"><i style="width:${(d / n * 100).toFixed(0)}%"></i></div></div>
      <div class="row"><a class="btn primary" href="#/exam">模擬期末考</a><a class="btn" href="#/quiz">全題庫隨機測驗</a><a class="btn" href="#/cards">名詞閃卡</a><a class="btn" href="#/glossary">名詞索引</a><a class="btn" href="#/syllabus">課綱與課表</a></div>`;
    Object.keys(byDay).forEach((dk) => {
      h += `<h2 class="day-h">${esc(C.days[dk].label)}</h2><p class="day-n">${esc(C.days[dk].note)}</p>`;
      if (byDay[dk].ch.length) h += `<h3 class="topic-h">教科書與導論 <small style="color:var(--muted)">Textbook</small></h3><div class="grid">${byDay[dk].ch.map(card).join('')}</div>`;
      Object.keys(byDay[dk].topics).forEach((tp) => {
        h += `<h3 class="topic-h">${esc(C.topics[tp] || tp)} <small style="color:var(--muted)">${esc(tp)}</small></h3><div class="grid">${byDay[dk].topics[tp].map(card).join('')}</div>`;
      });
    });
    h += `<p class="notice">本站為個人學習筆記（改寫與摘要），非原文轉載。原始文章、教科書與投影片版權屬各作者、出版者與授課教授。</p>`;
    app.innerHTML = h; renderSide(null);
  }

  function syllabus() {
    const link = (b) => [...(b.c || []).map((n) => findItem('c' + n)), ...(b.r || []).map((n) => findItem(n))].filter(Boolean)
      .map((x) => `<a class="chip" href="${x.href}">${esc(x.kind === 'a' ? '#' + x.id : x.label)}</a>`).join('');
    let h = `<h1>課綱與課表</h1><p>依教授 2026 Fall 課綱（MARK 5331-072）整理。${esc(C.instructor)}。</p>
      <div class="tip"><b>期末考：</b>${esc(C.exam)}<br><b>評分：</b>${esc(C.grading)}</div>`;
    h += '<h2>課表</h2>';
    C.schedule.forEach((d) => {
      h += `<h3 class="topic-h">${esc(d.date)} ${esc(d.time)} · ${esc(d.title)}</h3><table class="t"><thead><tr><th>時間</th><th>主題</th><th>閱讀與連結</th></tr></thead><tbody>`;
      d.blocks.forEach((b) => {
        h += `<tr><td style="white-space:nowrap">${esc(b.time)}</td><td><b>${esc(b.topic)}</b><br>${esc(b.zh)}${b.ex ? `<br><span class="small">${esc(b.ex)}</span>` : ''}</td><td>${b.read ? esc(b.read) + '<br>' : ''}${link(b)}</td></tr>`;
      });
      h += '</tbody></table>';
    });
    h += `<h2>指定教材</h2><ul>${C.materials.map((m) => `<li>${m}</li>`).join('')}</ul>`;
    C.books.forEach((b) => { h += `<h3 class="topic-h">${esc(b.name)}</h3><ul>${b.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`; });
    h += `<h2>指定文章與老師提示重點（EMPHASIS）</h2><table class="t"><thead><tr><th>#</th><th>文章</th><th>老師提示重點</th></tr></thead><tbody>${A.map((a) => `<tr><td><a href="${a.href}">${a.id}</a></td><td>${esc(a.authors.split('(')[0])}（${a.year}）<br><span class="small">${esc(a.title)}</span></td><td>${esc(a.emphasis || '')}</td></tr>`).join('')}</tbody></table>`;
    h += `<h2>課程規定</h2><ul>${C.rules.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>`;
    h += `<h2>這版課綱的變動</h2><ul>${C.changes.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>`;
    h += `<h2>需要留意的地方</h2><ul>${C.notes.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>`;
    app.innerHTML = h; renderSide(null);
  }

  const slidesHtml = (x) => (x.slides ? `<div class="sec"><h2>老師投影片重點</h2>${x.slideNote ? `<p class="small">※ ${esc(x.slideNote)}</p>` : ''}${x.slides.map((s) => `<h3 class="topic-h">${esc(s.h)}</h3><ul>${s.p.map((k) => `<li>${k}</li>`).join('')}</ul>`).join('')}</div>` : '');

  let tab = 'preview';
  function page(x, view) {
    const list = x.kind === 'a' ? A : CH;
    const i = list.indexOf(x);
    tab = view || tab;
    const prev = list[i - 1], next = list[i + 1];
    const nav = (y, arrow) => (y ? `<a class="btn" href="${y.href}">${arrow === 'l' ? '← ' : ''}${esc(y.kind === 'a' ? y.id : y.label)}${arrow === 'r' ? ' →' : ''}</a>` : '');
    let h = x.kind === 'a'
      ? `<article><div class="ep">EPISODE : ${String(x.id).padStart(2, '0')}</div><div class="byline">${esc(C.days[x.day].label)} · ${esc(C.topics[x.topic] || x.topic)}</div>
        <h1>${esc(x.title)}</h1>
        <div class="byline">${esc(x.authors)}（${x.year}）· ${esc(x.source)} · ${esc(x.pages)} · 難度 ${'●'.repeat(x.difficulty)}${'○'.repeat(3 - x.difficulty)}</div>`
      : `<article><div class="ep">TEXTBOOK : ${esc(x.label)}</div><div class="byline">${esc(C.days[x.day].label)} · 教科書</div>
        <h1>${esc(x.titleZh)}</h1><div class="byline">${esc(x.title)} · ${esc(x.source)}</div>`;
    h += `<div class="lead">${esc(x.oneLiner)}</div>
      ${x.emphasis ? `<div class="tip"><b>老師提示重點：</b>${esc(x.emphasis)}</div>` : ''}
      ${x.fileNote ? `<p class="small">※ ${esc(x.fileNote)}</p>` : ''}
      <div class="tabs">
        <button data-t="preview" class="${tab === 'preview' ? 'on' : ''}">預習（5 分鐘）</button>
        <button data-t="review" class="${tab === 'review' ? 'on' : ''}">複習（完整筆記）</button>
        <button data-t="quiz" class="${tab === 'quiz' ? 'on' : ''}">自我測驗（${x.quiz.length}）</button>
      </div>`;
    if (tab === 'preview') {
      h += `<div class="sec"><h2>重點摘要</h2>${x.summary.map((p) => `<p>${p}</p>`).join('')}</div>
        ${slidesHtml(x)}
        <div class="sec"><h2>必記重點</h2><ul>${x.keyPoints.map((k) => `<li>${k}</li>`).join('')}</ul></div>
        <div class="sec"><h2>預習時先想想</h2><ul>${x.examTips.slice(0, 2).map((k) => `<li>${k}</li>`).join('')}</ul></div>`;
    } else if (tab === 'review') {
      h += `<div class="sec"><h2>摘要</h2>${x.summary.map((p) => `<p>${p}</p>`).join('')}</div>
        ${slidesHtml(x)}
        <div class="sec"><h2>必記重點</h2><ul>${x.keyPoints.map((k) => `<li>${k}</li>`).join('')}</ul></div>
        <div class="sec"><h2>關鍵名詞</h2><dl class="terms">${x.concepts.map((c) => `<dt>${esc(c.term)}</dt><dd>${c.def}</dd>`).join('')}</dl></div>
        ${x.sections.map((s) => `<div class="sec"><h2>${esc(s.title)}</h2>${s.html}</div>`).join('')}
        <div class="sec"><h2>考試提示</h2><div class="tip"><ul>${x.examTips.map((k) => `<li>${k}</li>`).join('')}</ul></div></div>`;
    } else {
      h += `<div id="qbox"></div>`;
    }
    h += `<div class="pager"><span>${nav(prev, 'l')}</span>
      <button class="btn ${read[x.key] ? 'good' : 'primary'}" id="doneBtn">${read[x.key] ? '✓ 已讀（點擊取消）' : '標記為已讀'}</button>
      <span>${nav(next, 'r')}</span></div>
      <p class="notice">以上為個人學習筆記（摘要與改寫），原文請見教授提供之 PDF、教科書與投影片。</p></article>`;
    app.innerHTML = h; renderSide(x.key);
    app.querySelectorAll('.tabs button').forEach((b) => (b.onclick = () => page(x, b.dataset.t)));
    $('#doneBtn').onclick = () => { markRead(x.key, !read[x.key]); page(x); };
    if (tab === 'quiz') runQuiz($('#qbox'), x.quiz.map((q, k) => ({ ...q, key: x.key + '-' + k })), String(x.key));
    window.scrollTo(0, 0);
  }

  function runQuiz(box, qs, bestKey) {
    let ans = {};
    function draw() {
      const done = Object.keys(ans).length === qs.length;
      let h = '';
      qs.forEach((q, qi) => {
        const given = ans[qi];
        h += `<div class="q"><div class="stem">${qi + 1}. ${q.fromSlides ? '<span class="chip">投影片</span>' : ''}${esc(q.q)}</div>` +
          q.o.map((o, oi) => {
            let c = '';
            if (given !== undefined) { if (oi === q.a) c = 'ok'; else if (oi === given) c = 'no'; }
            return `<button class="opt ${c}" data-q="${qi}" data-o="${oi}" ${given !== undefined ? 'disabled' : ''}>${String.fromCharCode(65 + oi)}. ${esc(o)}</button>`;
          }).join('') +
          (given !== undefined ? `<div class="exp">${given === q.a ? '✓ 答對' : '✗ 答錯'}。${esc(q.e)}${q.href ? ` <a href="${q.href}">→ ${esc(q.src)}</a>` : ''}</div>` : '') + '</div>';
      });
      if (done) {
        const s = qs.filter((q, qi) => ans[qi] === q.a).length;
        if (!best[bestKey] || s / qs.length > best[bestKey]) { best[bestKey] = s / qs.length; store.set('best2', best); }
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
      <select id="qs"><option value="all">全部（${questions.length} 題）</option><option value="slides">只考老師投影片題</option><option value="book">教科書章節與導論</option><option value="d1">Day 1（導論、Ch.6、Ch.8）</option><option value="d2">Day 2（文章 1–15、Ch.9）</option><option value="d3">Day 3（文章 16–28、Ch.11、Ch.12）</option>${itemOptions()}</select></label>
      <label>題數 <select id="qn"><option>10</option><option>20</option><option>30</option><option>50</option></select></label>
      <button class="btn primary" id="go">開始</button></div><div id="qbox"></div>`;
    app.innerHTML = h; renderSide(null);
    $('#go').onclick = () => {
      const s = $('#qs').value, n = +$('#qn').value;
      let pool = questions;
      if (s === 'slides') pool = questions.filter((q) => q.fromSlides);
      else if (s === 'book') pool = questions.filter((q) => q.kind === 'c');
      else if (/^d\d$/.test(s)) pool = questions.filter((q) => q.day === +s.slice(1));
      else if (s !== 'all') pool = questions.filter((q) => String(q.ref) === s);
      runQuiz($('#qbox'), shuffle(pool).slice(0, n), 'mix-' + s);
    };
  }

  function cards() {
    let h = `<h1>名詞閃卡</h1><div class="row"><label>範圍 <select id="cs"><option value="all">全部（${terms.length}）</option><option value="book">教科書章節與導論</option><option value="papers">指定文章</option>${itemOptions()}</select></label></div><div id="fc"></div>`;
    app.innerHTML = h; renderSide(null);
    let deck = [], k = 0, show = false;
    const draw = () => {
      if (!deck.length) { $('#fc').innerHTML = '<p>沒有資料。</p>'; return; }
      const c = deck[k];
      $('#fc').innerHTML = `<div class="flash"><div class="face" id="face">${show
        ? `<small>${esc(c.term)}</small><div style="text-align:left;line-height:1.9">${c.def}</div>` : `<small>名詞 · 出自 ${esc(c.src)}《${esc(shortT(c.from, 46))}》</small><div class="term">${esc(c.term)}</div><small style="margin-top:14px">點擊翻面</small>`}</div></div>
        <div class="row"><button class="btn" id="pv">← 上一張</button><span>${k + 1} / ${deck.length}</span><button class="btn" id="nx">下一張 →</button><button class="btn" id="sh">洗牌</button><a class="btn" href="${c.href}">看筆記</a></div>`;
      $('#face').onclick = () => { show = !show; draw(); };
      $('#pv').onclick = () => { k = (k - 1 + deck.length) % deck.length; show = false; draw(); };
      $('#nx').onclick = () => { k = (k + 1) % deck.length; show = false; draw(); };
      $('#sh').onclick = () => { deck = shuffle(deck); k = 0; show = false; draw(); };
    };
    const load = () => {
      const v = $('#cs').value;
      const pick = v === 'all' ? terms : v === 'book' ? terms.filter((x) => String(x.ref)[0] === 'c') : v === 'papers' ? terms.filter((x) => typeof x.ref === 'number') : terms.filter((x) => String(x.ref) === v);
      deck = shuffle(pick); k = 0; show = false; draw();
    };
    $('#cs').onchange = load; load();
  }

  function glossary(q) {
    const f = (q || '').toLowerCase();
    const list = terms.filter((x) => !f || (x.term + strip(x.def)).toLowerCase().includes(f)).sort((a, b) => a.term.localeCompare(b.term));
    app.innerHTML = `<h1>名詞索引</h1><div class="row"><input class="f" id="gf" placeholder="篩選名詞…" value="${esc(q || '')}"><span>${list.length} 項</span></div>
      <dl class="terms">${list.map((x) => `<dt>${esc(x.term)} <a class="chip" href="${x.href}">${esc(x.src)}</a></dt><dd>${x.def}</dd>`).join('')}</dl>`;
    renderSide(null);
    const inp = $('#gf'); inp.oninput = () => { glossary(inp.value); const n = $('#gf'); n.focus(); n.setSelectionRange(n.value.length, n.value.length); };
  }

  function searchPage(q) {
    const f = q.toLowerCase();
    const hits = [];
    ITEMS.forEach((x) => {
      const blob = [x.title, x.titleZh || '', x.authors || '', x.oneLiner, ...x.summary, ...x.keyPoints, ...x.examTips, ...x.concepts.map((c) => c.term + ' ' + c.def), ...x.sections.map((s) => s.title + ' ' + s.html), ...(x.slides || []).map((s) => s.h + ' ' + s.p.join(' '))].map(strip).join('\n');
      const idx = blob.toLowerCase().indexOf(f);
      if (idx >= 0) hits.push({ x, snip: blob.slice(Math.max(0, idx - 30), idx + 90) });
    });
    app.innerHTML = `<h1>搜尋：「${esc(q)}」</h1><p>${hits.length} 項相符</p>` + hits.map((h) => `<div class="hit"><a href="${h.x.href}"><b>${esc(h.x.kind === 'a' ? '#' + h.x.id + ' ' + h.x.title : h.x.label + ' ' + h.x.titleZh)}</b></a><div class="exp">…${esc(h.snip).replace(new RegExp(esc(q).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'ig'), (m) => `<mark>${m}</mark>`)}…</div></div>`).join('');
    renderSide(null);
  }

  // ---- mock exam ----
  const EXAM = (window.EXAM || []).map((q, i) => {
    const x = findItem(q.r);
    const rnd = seeded('exam' + q.q), idx = q.o.map((_, k) => k);
    for (let k = idx.length - 1; k > 0; k--) { const j = Math.floor(rnd() * (k + 1)); [idx[k], idx[j]] = [idx[j], idx[k]]; }
    return { ...q, o: idx.map((k) => q.o[k]), a: idx.indexOf(q.a), i, x, day: x ? x.day : 0, group: x ? (x.kind === 'c' ? '教科書與導論' : (C.topics[x.topic] || x.topic)) : '其他' };
  });
  let examTimer = null;
  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  const grade = (p) => (p >= 90 ? 'A' : p >= 80 ? 'B' : p >= 70 ? 'C' : p >= 60 ? 'D' : 'F');

  function examSetup() {
    clearInterval(examTimer);
    const hist = store.get('examHist', []);
    app.innerHTML = `<h1>模擬期末考</h1>
      <p>依老師的出題方式設計：全英文選擇題、情境應用題、「Which is NOT…」、框架與數據題，範圍涵蓋教科書章節與 28 篇文章（題庫 ${EXAM.length} 題，與練習題庫不重複）。作答期間不顯示對錯，交卷後才看分數、各主題表現與詳解。</p>
      <div class="tip">真實考試：${esc(C.exam)}</div>
      <div class="row"><label>題數與時間 <select id="ex-n">
        <option value="50|120">完整模擬：50 題 · 120 分鐘</option><option value="25|60">半場：25 題 · 60 分鐘</option><option value="15|30">快速：15 題 · 30 分鐘</option><option value="all|0">全部 ${EXAM.length} 題 · 不計時</option></select></label>
        <label>範圍 <select id="ex-s"><option value="all">全部教材</option><option value="12">Day 1–2（導論、Ch.6/8/9、文章 1–15）</option><option value="3">Day 3（Ch.11/12、文章 16–28）</option></select></label>
        <label><input type="checkbox" id="ex-zh"> 顯示中文題意</label>
        <button class="btn primary" id="ex-go">開始考試</button></div>
      ${hist.length ? `<h2>最近成績</h2><table class="t"><thead><tr><th>時間</th><th>範圍</th><th>得分</th><th>等第</th><th>用時</th></tr></thead><tbody>${hist.slice(-10).reverse().map((h) => `<tr><td>${esc(h.at)}</td><td>${esc(h.scope)}</td><td>${h.s} / ${h.n}（${h.p}%）</td><td>${grade(h.p)}</td><td>${esc(h.used)}</td></tr>`).join('')}</tbody></table>` : ''}`;
    renderSide(null);
    $('#ex-go').onclick = () => {
      const [n, min] = $('#ex-n').value.split('|'), s = $('#ex-s').value;
      let pool = EXAM.filter((q) => s === 'all' || (s === '12' ? q.day <= 2 : q.day === 3));
      // spread questions across sources: shuffle each source's questions, then take round-robin
      const bySrc = {};
      shuffle(pool).forEach((q) => (bySrc[q.r] = bySrc[q.r] || []).push(q));
      const order = shuffle(Object.keys(bySrc)), picked = [];
      while (picked.length < pool.length) order.forEach((k) => { if (bySrc[k].length) picked.push(bySrc[k].shift()); });
      const qs = shuffle(n === 'all' ? picked : picked.slice(0, +n));
      examRun(qs, +min * 60, $('#ex-zh').checked, $('#ex-s').selectedOptions[0].textContent);
    };
  }

  function examRun(qs, limit, zh, scope) {
    const ans = {}, start = Date.now();
    let left = limit;
    app.innerHTML = `<h1>模擬期末考</h1><div class="exam-bar"><span id="ex-time">${limit ? '剩餘 ' + fmt(left) : '不計時'}</span><span id="ex-prog">已作答 0 / ${qs.length}</span><button class="btn primary" id="ex-submit">交卷</button></div>
      ${qs.map((q, qi) => `<div class="q" id="eq${qi}"><div class="stem">${qi + 1}. ${esc(q.q)}</div>${zh ? `<div class="small">${esc(q.zh)}</div>` : ''}
        ${q.o.map((o, oi) => `<button class="opt" data-q="${qi}" data-o="${oi}">${String.fromCharCode(65 + oi)}. ${esc(o)}</button>`).join('')}</div>`).join('')}
      <div class="row"><button class="btn primary" id="ex-submit2">交卷</button></div>`;
    renderSide(null);
    app.querySelectorAll('.opt').forEach((b) => (b.onclick = () => {
      ans[b.dataset.q] = +b.dataset.o;
      b.parentNode.querySelectorAll('.opt').forEach((o) => o.classList.toggle('pick', o === b));
      $('#ex-prog').textContent = `已作答 ${Object.keys(ans).length} / ${qs.length}`;
    }));
    const finish = () => { clearInterval(examTimer); examResult(qs, ans, Math.round((Date.now() - start) / 1000), scope); };
    const submit = () => {
      const miss = qs.length - Object.keys(ans).length;
      if (miss && !confirm(`還有 ${miss} 題未作答，確定要交卷嗎？`)) return;
      finish();
    };
    $('#ex-submit').onclick = submit; $('#ex-submit2').onclick = submit;
    clearInterval(examTimer);
    if (limit) examTimer = setInterval(() => {
      left -= 1;
      const el = $('#ex-time');
      if (!el) { clearInterval(examTimer); return; }
      el.textContent = '剩餘 ' + fmt(Math.max(left, 0));
      if (left === 300) el.classList.add('warn');
      if (left <= 0) { alert('時間到，自動交卷。'); finish(); }
    }, 1000);
    window.scrollTo(0, 0);
  }

  function examResult(qs, ans, used, scope) {
    const s = qs.filter((q, qi) => ans[qi] === q.a).length, p = Math.round(s / qs.length * 100);
    const hist = store.get('examHist', []);
    const d = new Date();
    hist.push({ at: `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`, scope, s, n: qs.length, p, used: fmt(used) });
    store.set('examHist', hist.slice(-30));
    const groups = {};
    qs.forEach((q, qi) => { const g = (groups[q.group] = groups[q.group] || { n: 0, ok: 0 }); g.n++; if (ans[qi] === q.a) g.ok++; });
    const wrong = qs.map((q, qi) => ({ q, qi })).filter(({ q, qi }) => ans[qi] !== q.a);
    app.innerHTML = `<h1>模擬考成績</h1>
      <div class="score">${s} / ${qs.length}（${p}%）· 等第 ${grade(p)}</div><p>用時 ${fmt(used)}。等第依課綱：A ≥ 90%、B ≥ 80%、C ≥ 70%、D ≥ 60%。</p>
      <h2>各主題表現</h2><table class="t"><thead><tr><th>主題</th><th>答對</th><th>正確率</th></tr></thead><tbody>${Object.entries(groups).sort((a, b) => a[1].ok / a[1].n - b[1].ok / b[1].n).map(([g, v]) => `<tr><td>${esc(g)}</td><td>${v.ok} / ${v.n}</td><td>${Math.round(v.ok / v.n * 100)}%</td></tr>`).join('')}</tbody></table>
      <div class="row"><button class="btn primary" id="ex-again">再考一次</button><button class="btn" id="ex-all">顯示全部題目詳解</button></div>
      <h2 id="ex-h">答錯與未作答（${wrong.length}）</h2><div id="ex-list"></div>`;
    renderSide(null);
    const list = (items) => items.map(({ q, qi }) => {
      const given = ans[qi];
      return `<div class="q"><div class="stem">${qi + 1}. ${esc(q.q)}</div><div class="small">${esc(q.zh)}</div>
        ${q.o.map((o, oi) => `<button class="opt ${oi === q.a ? 'ok' : oi === given ? 'no' : ''}" disabled>${String.fromCharCode(65 + oi)}. ${esc(o)}</button>`).join('')}
        <div class="exp">${given === undefined ? '未作答' : given === q.a ? '✓ 答對' : '✗ 答錯'}。${esc(q.e)}${q.x ? ` <a href="${q.x.href}">→ ${esc(q.x.src)} 筆記</a>` : ''}</div></div>`;
    }).join('');
    $('#ex-list').innerHTML = wrong.length ? list(wrong) : '<p>全對，太強了！</p>';
    $('#ex-again').onclick = examSetup;
    $('#ex-all').onclick = () => { $('#ex-h').textContent = `全部題目詳解（${qs.length}）`; $('#ex-list').innerHTML = list(qs.map((q, qi) => ({ q, qi }))); };
    window.scrollTo(0, 0);
  }

  // ---- router ----
  function route() {
    document.body.classList.remove('menu');
    clearInterval(examTimer);
    const h = location.hash.replace(/^#\/?/, '');
    document.querySelectorAll('.top-nav a').forEach((a) => a.classList.toggle('on', a.getAttribute('href') === '#/' + h || (h === '' && a.getAttribute('href') === '#/')));
    if (h.startsWith('a/')) { const x = findItem(+h.slice(2)); return x ? page(x) : home(); }
    if (h.startsWith('c/')) { const x = findItem('c' + h.slice(2)); return x ? page(x) : home(); }
    if (h === 'glossary') return glossary('');
    if (h === 'cards') return cards();
    if (h === 'quiz') return quizPage();
    if (h === 'syllabus') return syllabus();
    if (h === 'exam') return examSetup();
    if (h.startsWith('s/')) return searchPage(decodeURIComponent(h.slice(2)));
    home();
  }
  window.addEventListener('hashchange', route);
  $('#search').addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target.value.trim()) location.hash = '#/s/' + encodeURIComponent(e.target.value.trim()); });
  route();
})();
