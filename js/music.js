/* Background music via the official YouTube IFrame player.
   - Playback only starts from a user click (browser autoplay rules).
   - Each skin has a default track; users can paste any YouTube link,
     and keep a personal playlist (saved in this browser only) that plays on repeat. */
(function () {
  const TRACKS = { eva: 'V36Gz7cUbas', default: 'n61ULEU7CO0' };
  const NAMES = {
    V36Gz7cUbas: 'Sin From Genesis — Shiro SAGISU（EVA 預設曲）',
    n61ULEU7CO0: 'Best of lofi hip hop — Lofi Girl（預設風格預設曲）',
    Ga8YU1fjspo: '洋楽 Playlist・重低音グルーヴ BGM — Chillight Pop'
  };
  const PRESETS = [
    ['n61ULEU7CO0', 'Lofi Girl · 放鬆讀書'],
    ['Ga8YU1fjspo', '洋楽 Playlist · 重低音 BGM'],
    ['V36Gz7cUbas', 'EVA · Sin From Genesis']
  ];
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const store = {
    get(k, d) { try { const v = localStorage.getItem('imk:' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('imk:' + k, JSON.stringify(v)); } catch (e) {} }
  };
  const ID_RE = /(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/|\/live\/)([A-Za-z0-9_-]{11})/;
  const idOf = (u) => {
    const t = String(u || '').trim();
    const m = t.match(ID_RE);
    if (m) return m[1];
    return /^[A-Za-z0-9_-]{11}$/.test(t) ? t : null;
  };
  // every YouTube id found in a block of pasted text (one per line or mixed)
  const idsIn = (text) => {
    const out = [];
    String(text || '').split(/\s+/).forEach((tok) => { const id = idOf(tok); if (id && !out.includes(id)) out.push(id); });
    return out;
  };

  let player = null, apiState = 'idle', pending = null, currentId = null, playing = false;
  let vol = store.get('musicVol', 60);
  let custom = store.get('musicCustom', null);
  let titles = store.get('musicTitles', {});
  let playlist = store.get('musicPlaylist', []);          // array of video ids
  let plMode = store.get('musicPlMode', false);           // true = playing the playlist
  let plIndex = store.get('musicPlIndex', 0);
  let errStreak = 0;

  const nameOf = (id) => NAMES[id] || titles[id] || ('youtu.be/' + id);
  const savePl = () => { store.set('musicPlaylist', playlist); store.set('musicPlIndex', plIndex); store.set('musicPlMode', plMode); };

  // ---- UI ----
  const btn = $('#musicBtn');
  const panel = document.createElement('div');
  panel.id = 'musicPanel';
  panel.innerHTML = `
    <div class="mp-title" id="mpTitle">尚未選擇曲目</div>
    <div id="ytBox"><div id="ytp"></div></div>
    <div class="mp-row">
      <button class="btn" id="mpPrev" aria-label="上一首" title="上一首">⏮</button>
      <button class="btn primary" id="mpToggle">▶ 播放</button>
      <button class="btn" id="mpNext" aria-label="下一首" title="下一首">⏭</button>
      <label class="mp-vol">音量 <input id="mpVol" type="range" min="0" max="100" value="${vol}"></label>
    </div>
    <div class="mp-row"><label class="mp-vol">曲目 <select id="mpPreset"><option value="">依風格自動選擇</option><option value="__pl" disabled>（正在播放我的歌單）</option>${PRESETS.map((p) => `<option value="${p[0]}">${p[1]}</option>`).join('')}</select></label></div>
    <div class="mp-row"><input class="f" id="mpUrl" placeholder="貼上 YouTube 連結…" aria-label="YouTube 連結"></div>
    <div class="mp-row">
      <button class="btn" id="mpApply">立即播放</button>
      <button class="btn" id="mpAdd">＋ 加入歌單</button>
      <button class="btn" id="mpReset">風格預設曲</button>
    </div>
    <div class="mp-sec">
      <div class="mp-head"><b id="mpPlHead">我的歌單</b><button class="btn primary" id="mpPlPlay">▶ 播放歌單</button></div>
      <ol id="mpList"></ol>
      <div class="mp-row">
        <button class="btn" id="mpCopy">複製歌單</button>
        <button class="btn" id="mpImportBtn">匯入</button>
        <button class="btn" id="mpClear">清空</button>
      </div>
      <div id="mpImportBox" hidden>
        <textarea class="f" id="mpImportText" rows="4" placeholder="貼上之前複製的歌單（每行一個 YouTube 連結）"></textarea>
        <div class="mp-row"><button class="btn primary" id="mpImportOk">確認匯入</button><button class="btn" id="mpImportCancel">取消</button></div>
      </div>
      <div class="mp-note">歌單只存在這個瀏覽器；換裝置請用「複製歌單」帶過去再匯入。</div>
    </div>
    <div class="mp-msg" id="mpMsg"></div>`;
  document.body.appendChild(panel);
  const msg = (t) => { $('#mpMsg').textContent = t || ''; };
  const setTitle = (id) => {
    const pre = plMode && playlist.length ? `歌單 ${plIndex + 1}/${playlist.length} · ` : '';
    $('#mpTitle').textContent = id ? pre + nameOf(id) : '尚未選擇曲目';
  };
  const sync = () => {
    $('#mpToggle').textContent = playing ? '⏸ 暫停' : '▶ 播放';
    btn.classList.toggle('on', playing);
    btn.setAttribute('aria-pressed', playing ? 'true' : 'false');
    const multi = plMode && playlist.length > 1;
    $('#mpPrev').disabled = !multi; $('#mpNext').disabled = !multi;
  };
  function renderList() {
    $('#mpPlHead').textContent = `我的歌單（${playlist.length}）`;
    $('#mpPlPlay').disabled = !playlist.length;
    $('#mpList').innerHTML = playlist.length
      ? playlist.map((id, i) => `<li class="${plMode && i === plIndex ? 'cur' : ''}">
          <button class="mp-it" data-play="${i}" title="播放這首">${esc(nameOf(id))}</button>
          <button class="mp-x" data-del="${i}" aria-label="從歌單移除" title="移除">✕</button></li>`).join('')
      : '<li class="mp-empty">還沒有歌。貼上連結後按「＋ 加入歌單」。</li>';
  }

  // ---- YouTube API ----
  function loadApi(cb) {
    if (window.YT && window.YT.Player) return cb();
    pending = cb;
    if (apiState === 'loading') return;
    apiState = 'loading';
    const s = document.createElement('script');
    s.src = 'https://www.youtube.com/iframe_api';
    s.onerror = () => { apiState = 'idle'; msg('無法載入 YouTube（請檢查網路）'); };
    document.head.appendChild(s);
    window.onYouTubeIframeAPIReady = () => { apiState = 'ready'; const f = pending; pending = null; if (f) f(); };
  }
  function ensurePlayer(id, autoplay) {
    loadApi(() => {
      if (player && player.loadVideoById) {
        if (autoplay) player.loadVideoById(id); else player.cueVideoById(id);
        return;
      }
      player = new YT.Player('ytp', {
        width: '240', height: '135', videoId: id,
        playerVars: { playsinline: 1, rel: 0, modestbranding: 1, autoplay: autoplay ? 1 : 0 },
        events: {
          onReady: (e) => { e.target.setVolume(vol); if (autoplay) e.target.playVideo(); },
          onStateChange: (e) => {
            if (e.data === 0) {                        // ended
              if (plMode && playlist.length > 1) { step(1); return; }
              e.target.seekTo(0); e.target.playVideo(); return;   // single track: repeat
            }
            if (e.data === 1) {                        // playing: remember the real title
              errStreak = 0;
              const d = e.target.getVideoData && e.target.getVideoData();
              if (d && d.title && d.video_id && !NAMES[d.video_id] && titles[d.video_id] !== d.title) {
                titles[d.video_id] = d.title; store.set('musicTitles', titles); setTitle(currentId); renderList();
              }
            }
            playing = e.data === 1 || e.data === 3; sync();
          },
          onError: () => {
            playing = false; sync();
            if (plMode && playlist.length > 1 && ++errStreak < playlist.length) {
              msg('有一首不允許嵌入播放，已跳到下一首'); setTimeout(() => step(1), 800);
            } else msg('這支影片不允許嵌入播放，請換一個連結');
          }
        }
      });
    });
  }

  function play(id) {
    id = id || currentId;
    if (!id) { msg('請先貼上連結，或選一首曲目'); return; }
    msg('');
    if (id !== currentId || !player) { currentId = id; setTitle(id); ensurePlayer(id, true); }
    else if (player.playVideo) player.playVideo();
    playing = true; sync();
  }
  function pause() { if (player && player.pauseVideo) player.pauseVideo(); playing = false; sync(); }

  // ---- playlist ----
  function playIndex(i) {
    if (!playlist.length) return;
    plMode = true; plIndex = (i + playlist.length) % playlist.length; savePl();
    currentId = null; play(playlist[plIndex]); setTitle(playlist[plIndex]); renderList(); syncSel();
  }
  function step(d) { if (plMode && playlist.length) playIndex(plIndex + d); }
  function leavePlaylist() { if (plMode) { plMode = false; savePl(); renderList(); if (typeof syncSel === 'function') syncSel(); } }
  function addIds(ids) {
    let added = 0;
    ids.forEach((id) => { if (!playlist.includes(id)) { playlist.push(id); added++; } });
    savePl(); renderList();
    return added;
  }
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text);
    return new Promise((ok, bad) => {
      const t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select();
      try { document.execCommand('copy') ? ok() : bad(); } catch (e) { bad(e); } t.remove();
    });
  }

  // ---- events ----
  btn.onclick = (e) => { e.stopPropagation(); panel.classList.toggle('open'); };
  document.addEventListener('click', (e) => { if (!panel.contains(e.target) && e.target !== btn) panel.classList.remove('open'); });
  $('#mpToggle').onclick = () => {
    if (playing) return pause();
    if (plMode && playlist.length && !currentId) return playIndex(plIndex);
    play();
  };
  $('#mpPrev').onclick = () => step(-1);
  $('#mpNext').onclick = () => step(1);
  $('#mpVol').oninput = (e) => { vol = +e.target.value; store.set('musicVol', vol); if (player && player.setVolume) player.setVolume(vol); };

  $('#mpApply').onclick = () => {
    const id = idOf($('#mpUrl').value);
    if (!id) { msg('這看起來不是 YouTube 連結'); return; }
    leavePlaylist();
    custom = id; store.set('musicCustom', id); currentId = null; syncSel(); play(id);
  };
  $('#mpAdd').onclick = () => {
    const ids = idsIn($('#mpUrl').value);
    if (!ids.length) { msg('這看起來不是 YouTube 連結'); return; }
    const n = addIds(ids);
    $('#mpUrl').value = '';
    msg(n ? `已加入 ${n} 首到歌單` : '這首已經在歌單裡了');
  };
  $('#mpPlPlay').onclick = () => playIndex(plMode ? plIndex : 0);
  $('#mpList').onclick = (e) => {
    const p = e.target.closest('[data-play]'), d = e.target.closest('[data-del]');
    if (p) playIndex(+p.dataset.play);
    if (d) {
      const i = +d.dataset.del, wasCur = plMode && i === plIndex;
      playlist.splice(i, 1);
      if (i < plIndex || plIndex >= playlist.length) plIndex = Math.max(0, plIndex - 1);
      if (!playlist.length) plMode = false;
      savePl(); renderList(); sync();
      if (wasCur && playing && playlist.length) playIndex(plIndex);
    }
  };
  $('#mpCopy').onclick = () => {
    if (!playlist.length) { msg('歌單是空的'); return; }
    const text = playlist.map((id) => `https://youtu.be/${id}  # ${nameOf(id)}`).join('\n');
    copyText(text).then(() => msg(`已複製 ${playlist.length} 首，可貼到其他地方保存`), () => msg('無法自動複製，請手動選取匯入框中的文字'));
  };
  $('#mpImportBtn').onclick = () => { $('#mpImportBox').hidden = !$('#mpImportBox').hidden; $('#mpImportText').focus(); };
  $('#mpImportCancel').onclick = () => { $('#mpImportBox').hidden = true; };
  $('#mpImportOk').onclick = () => {
    const ids = idsIn($('#mpImportText').value);
    if (!ids.length) { msg('沒有找到 YouTube 連結'); return; }
    const n = addIds(ids);
    $('#mpImportText').value = ''; $('#mpImportBox').hidden = true;
    msg(`匯入完成：新增 ${n} 首（共 ${playlist.length} 首）`);
  };
  $('#mpClear').onclick = () => {
    if (!playlist.length) return;
    if (!confirm('確定要清空歌單嗎？建議先按「複製歌單」備份。')) return;
    playlist = []; plIndex = 0; plMode = false; savePl(); renderList(); sync(); msg('歌單已清空');
  };

  const sel = $('#mpPreset');
  const syncSel = () => { sel.value = plMode ? '__pl' : (custom && PRESETS.some((p) => p[0] === custom) ? custom : ''); };
  sel.onchange = () => {
    leavePlaylist();
    if (!sel.value) { $('#mpReset').click(); return; }
    custom = sel.value; store.set('musicCustom', custom); currentId = null; play(custom);
  };
  $('#mpReset').onclick = () => { leavePlaylist(); custom = null; store.set('musicCustom', null); currentId = null; syncSel(); useSkin(window.__skin || 'default', true); };

  // called by app.js when the skin changes (userGesture = true on clicks)
  function useSkin(skin, userGesture) {
    window.__skin = skin;
    if (plMode && playlist.length) {                   // the playlist wins over skin defaults
      if (!currentId) { currentId = playlist[plIndex] || playlist[0]; setTitle(currentId); }
      return;
    }
    const id = custom || TRACKS[skin] || null;
    if (!id) { if (!custom) pause(); return; }
    currentId = id; setTitle(id);
    if (userGesture) play(id); else ensurePlayer(id, false);
  }

  // initial state: show the track title only, wait for the user to press play
  window.Music = { useSkin, play, pause };
  if (plIndex >= playlist.length) plIndex = 0;
  if (plMode && !playlist.length) plMode = false;
  const first = plMode ? playlist[plIndex] : (custom || TRACKS[store.get('skin', 'default')] || null);
  if (first) { setTitle(first); }
  syncSel(); renderList(); sync();
})();
