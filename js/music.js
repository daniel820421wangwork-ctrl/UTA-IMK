/* Background music via the official YouTube IFrame player.
   - Playback only starts from a user click (browser autoplay rules).
   - Each skin can have a default track; users can also paste any YouTube link. */
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
  const store = {
    get(k, d) { try { const v = localStorage.getItem('imk:' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('imk:' + k, JSON.stringify(v)); } catch (e) {} }
  };
  const idOf = (u) => {
    const m = String(u || '').trim().match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/)([A-Za-z0-9_-]{11})/);
    if (m) return m[1];
    return /^[A-Za-z0-9_-]{11}$/.test(String(u).trim()) ? String(u).trim() : null;
  };

  let player = null, apiState = 'idle', pending = null, currentId = null, playing = false;
  let vol = store.get('musicVol', 60);
  let custom = store.get('musicCustom', null);

  // ---- UI ----
  const btn = $('#musicBtn');
  const panel = document.createElement('div');
  panel.id = 'musicPanel';
  panel.innerHTML = `
    <div class="mp-title" id="mpTitle">尚未選擇曲目</div>
    <div id="ytBox"><div id="ytp"></div></div>
    <div class="mp-row">
      <button class="btn primary" id="mpToggle">▶ 播放</button>
      <label class="mp-vol">音量 <input id="mpVol" type="range" min="0" max="100" value="${vol}"></label>
    </div>
    <div class="mp-row"><label class="mp-vol">曲目 <select id="mpPreset"><option value="">依風格自動選擇</option>${PRESETS.map((p) => `<option value="${p[0]}">${p[1]}</option>`).join('')}</select></label></div>
    <div class="mp-row">
      <input class="f" id="mpUrl" placeholder="貼上 YouTube 連結…" aria-label="YouTube 連結">
      <button class="btn" id="mpApply">套用</button>
    </div>
    <div class="mp-row"><button class="btn" id="mpReset">回到風格預設曲</button><span id="mpMsg" class="mp-msg"></span></div>`;
  document.body.appendChild(panel);
  const msg = (t) => { $('#mpMsg').textContent = t || ''; };
  const setTitle = (id) => {
    $('#mpTitle').textContent = id ? (NAMES[id] || '自訂曲目 · youtu.be/' + id) : '尚未選擇曲目';
  };
  const sync = () => {
    $('#mpToggle').textContent = playing ? '⏸ 暫停' : '▶ 播放';
    btn.classList.toggle('on', playing);
    btn.setAttribute('aria-pressed', playing ? 'true' : 'false');
  };

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
        playerVars: { playsinline: 1, rel: 0, modestbranding: 1, loop: 1, playlist: id, autoplay: autoplay ? 1 : 0 },
        events: {
          onReady: (e) => { e.target.setVolume(vol); if (autoplay) e.target.playVideo(); },
          onStateChange: (e) => {
            if (e.data === 0) { e.target.seekTo(0); e.target.playVideo(); return; } // ended -> repeat
            playing = e.data === 1 || e.data === 3; sync();
          },
          onError: () => { playing = false; sync(); msg('這支影片不允許嵌入播放，請換一個連結'); }
        }
      });
    });
  }

  function play(id) {
    id = id || currentId;
    if (!id) { msg('請先貼上連結，或切換到 EVA 風格'); return; }
    msg('');
    if (id !== currentId || !player) { currentId = id; setTitle(id); ensurePlayer(id, true); }
    else if (player.playVideo) player.playVideo();
    playing = true; sync();
  }
  function pause() { if (player && player.pauseVideo) player.pauseVideo(); playing = false; sync(); }

  // ---- events ----
  btn.onclick = (e) => { e.stopPropagation(); panel.classList.toggle('open'); };
  document.addEventListener('click', (e) => { if (!panel.contains(e.target) && e.target !== btn) panel.classList.remove('open'); });
  $('#mpToggle').onclick = () => (playing ? pause() : play());
  $('#mpVol').oninput = (e) => { vol = +e.target.value; store.set('musicVol', vol); if (player && player.setVolume) player.setVolume(vol); };
  $('#mpApply').onclick = () => {
    const id = idOf($('#mpUrl').value);
    if (!id) { msg('這看起來不是 YouTube 連結'); return; }
    custom = id; store.set('musicCustom', id); currentId = null; syncSel(); play(id);
  };
  const sel = $('#mpPreset');
  const syncSel = () => { sel.value = custom && PRESETS.some((p) => p[0] === custom) ? custom : ''; };
  sel.onchange = () => {
    if (!sel.value) { $('#mpReset').click(); return; }
    custom = sel.value; store.set('musicCustom', custom); currentId = null; play(custom);
  };
  syncSel();
  $('#mpReset').onclick = () => { custom = null; store.set('musicCustom', null); currentId = null; syncSel(); useSkin(window.__skin || 'default', true); };

  // called by app.js when the skin changes (userGesture = true on clicks)
  function useSkin(skin, userGesture) {
    window.__skin = skin;
    const id = custom || TRACKS[skin] || null;
    if (!id) { if (!custom) { pause(); } return; }
    currentId = id; setTitle(id);
    if (userGesture) play(id); else ensurePlayer(id, false);
  }

  // initial state: show the track title only, wait for the user to press play
  window.Music = { useSkin, play, pause };
  const first = custom || TRACKS[store.get('skin', 'default')] || null;
  if (first) { currentId = first; setTitle(first); }
  sync();
})();
