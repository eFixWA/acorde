(function () {
  const E = window.AcordeEngine;
  const $ = (id) => document.getElementById(id);
  const mod = E.mod;
  const SVGNS = 'http://www.w3.org/2000/svg';

  // ---------- text ----------
  const T = {
    en: {
      tagline: 'Play a chord. See its name.', showFret: 'Show guitar', hideFret: 'Hide guitar', connect: 'Connect keyboard', present: 'Present', settings: 'Settings', chord: 'Chord',
      staff: 'Grand staff', fretboard: 'Fretboard', guitar: 'Guitar', bass: 'Bass', notes: 'Notes', intervals: 'Intervals',
      fretHint: 'One chord shape that plays exactly the notes you played. If they can’t all fit on the neck, Acorde shows the closest playable shape.', fretExact: 'Exact match', fretNear: 'Closest shape',
      pianoHint: 'Click keys to play them, or use your computer keys', octave: 'octave', clear: 'Clear keys',
      progressions: 'Progressions', library: 'Chord dictionary', lyrTitle: 'Lyrics', lyrArtistPh: 'Artist', lyrTitlePh: 'Song title', lyrFindBtn: 'Find lyrics', lyrApplyBtn: 'Use these lyrics', lyrTapStartBtn: 'Tap to sync', lyrTapBtn: 'Tap: next line', lyrTimingLbl: 'Lyrics timing',
      lyrTextPh: 'Lyrics appear here when found. You can also paste or fix them, one line per row. Times like [01:23.45] are kept.',
      lyrNeedTitle: 'Type the song title first.', lyrSearching: 'Searching LRCLIB…', lyrBusy: 'The lyrics library is overloaded right now. Press Find lyrics again in a minute, or use “Search the web”.', lyrRetry: 'Lyrics library is busy, trying again…', lyrOffline: 'This view can’t reach the lyrics service. Open Acorde.html from your PC (it finds lyrics automatically), or use “Search the web”, copy the lyrics and paste them below.', lyrWebBtn: 'Search the web',
      lyrNone: 'No lyrics found in the lyrics library. Check the artist and title, or use “Search the web” and paste them below.', lyrInstrumental: 'That match is marked instrumental (no lyrics).', lyrFound: 'Found:', lyrLenDiff: 'length differs from your file, adjust timing if needed',
      lyrNotSynced: 'these lyrics have no timing. Click Tap to sync and tap the space bar as each line starts.', lyrApplied: 'Lyrics updated.', lyrPasteFirst: 'Find or paste the lyrics first.', lyrTapping: 'Tap the space bar (or the Tap button) right as each line starts.',
      lyrSyncedDone: 'All lines are synced. Chords now sit over the words.', lyrIntro: 'Intro', lyrInstrumentalRow: 'Instrumental', lyrOutro: 'Outro', lyrNote: 'Lyrics come from LRCLIB, a free community lyrics database. Song lyrics are usually copyrighted: keep chord sheets with lyrics for your own practice.',
      song: 'Analyze a song', songDropTitle: 'Drop a song here, or click to choose a file', songDropSub: 'MP3, WAV, M4A, OGG or FLAC. The song stays on your computer.', songDecoding: 'Reading the audio…', songAnalyzing: 'Finding the beat, key and chords…', songError: 'Could not read that file. Try an MP3 or WAV.',
      songMeter: 'Time', songLength: 'Length', songTuning: 'Tuning', songNowLbl: 'Now', songNextLbl: 'Next', pause: 'Pause', songSpeedLbl: 'Speed', songTransLbl: 'Transpose', songCapoLbl: 'Capo', songClearLoop: 'Clear loop',
      songPianoLbl: 'Show chords on the piano', songFollowLbl: 'Follow along', songPdfLbl: 'Download chord sheet (PDF)', songLoopHint: 'Click a bar to jump there. Click a bar, then Shift-click another to loop that section.',
      songNote: 'Chords are found automatically from the audio. Busy mixes, heavy drums or unusual chords can fool it, so check by ear.', pdfMissing: 'The PDF tool did not load. Check your internet connection and reload the page.',
      instPiano: 'Piano', instGuitar: 'Guitar', instUke: 'Ukulele', libPdf: 'Download PDF chord sheet', shapesLbl: 'Ways to play it', fretWord: 'fret', openWord: 'open',  history: 'Your chords', classical: 'Classical', jazz: 'Jazz', pop: 'Pop', salsa: 'Salsa',
      keyLbl: 'Key', tempo: 'Tempo', loop: 'Loop', stop: 'Stop', play: 'Play', formula: 'Formula', notesLbl: 'Notes', playChord: 'Play chord', arpeggio: 'Arpeggio',
      invNames: ['Root', '1st inv.', '2nd inv.', '3rd inv.'], histHint: 'Chords you play are listed here in order. Click one to hear it again.',
      pianoStyle: 'Piano style', stagePiano: 'Stage piano', grandPiano: 'Grand piano', uprightPiano: 'Upright piano', rhodesPiano: 'Electric piano (Rhodes style)',
      keyColors: 'Key colors', byHand: 'Left and right hand', byTone: 'Root and chord tones', leftHand: 'Left hand', rightHand: 'Right hand', rootColor: 'Root', toneColor: 'Chord tones',
      markRoot: 'Show the root in its own color', resetColors: 'Reset colors', pianoLbl: 'Piano', progHint: 'Click a chord to hear it, or play the whole progression.',
      copy: 'Copy', clearHist: 'Clear', done: 'Done', naming: 'Note names', symbols: 'Chord symbols',
      spelling: 'Spelling', auto: 'Automatic', sharps: 'Prefer sharps', flats: 'Prefer flats', key: 'Key for Roman numerals',
      major: 'Major', minor: 'Minor', keyLabels: 'Labels on piano keys', none: 'None', split: 'Left/right hand split (also splits the staff)',
      hold: 'Keep showing the last chord after release', pedal: 'Count notes held by the sustain pedal', sound: 'Sound for on-screen keys',
      midiSound: 'Sound for MIDI keyboard too', handsLbl: 'Show glass hands playing the keys', skinLbl: 'Look', skinSimple: 'Simple', skinAcoustic: 'Acoustic (Taylor style)', skinElectric: 'Electric (Strat style)', settingsNote: 'Settings are saved in this browser.', exit: 'Exit',
      example: 'Example', holding: 'Holding', live: 'Live', playSomething: 'Play or tap a few notes',
      alsoReads: 'Also reads as', noHistory: 'Chords you play are listed here in order.', copied: 'Copied',
      noMidi: 'This browser has no MIDI support. Open Acorde in Chrome or Edge to play from your keyboard.',
      midiBlocked: 'MIDI is blocked in this embedded view. Open the Acorde.html file saved on your computer in Chrome or Edge, and your keyboard will connect.',
      noInputs: 'MIDI is on, but no keyboard was found. Plug in the USB cable, turn the keyboard on, then press Connect again.',
      single: 'Single note', interval: 'Interval', power: 'power chord',
      inv: ['root position', 'first inversion', 'second inversion', 'third inversion'], over: 'over', with: 'with'
    },
    es: {
      tagline: 'Toca un acorde. Mira su nombre.', showFret: 'Mostrar guitarra', hideFret: 'Ocultar guitarra', connect: 'Conectar teclado', present: 'Presentar', settings: 'Ajustes', chord: 'Acorde',
      staff: 'Gran pentagrama', fretboard: 'Diapasón', guitar: 'Guitarra', bass: 'Bajo', notes: 'Notas', intervals: 'Intervalos',
      fretHint: 'Una sola posición del acorde que suena exactamente como las notas que tocaste. Si no caben todas en el mástil, Acorde muestra la posición más cercana.', fretExact: 'Coincidencia exacta', fretNear: 'Posición más cercana',
      pianoHint: 'Haz clic en las teclas para tocarlas, o usa el teclado de la computadora', octave: 'octava', clear: 'Borrar teclas',
      progressions: 'Progresiones', library: 'Diccionario de acordes', lyrTitle: 'Letra', lyrArtistPh: 'Artista', lyrTitlePh: 'Título de la canción', lyrFindBtn: 'Buscar letra', lyrApplyBtn: 'Usar esta letra', lyrTapStartBtn: 'Sincronizar tocando', lyrTapBtn: 'Tocar: siguiente línea', lyrTimingLbl: 'Tiempo de la letra',
      lyrTextPh: 'La letra aparece aquí cuando se encuentra. También puedes pegarla o corregirla, una línea por renglón. Los tiempos como [01:23.45] se conservan.',
      lyrNeedTitle: 'Escribe primero el título de la canción.', lyrSearching: 'Buscando en LRCLIB…', lyrBusy: 'La biblioteca de letras está saturada ahora. Pulsa Buscar letra de nuevo en un minuto, o usa “Buscar en la web”.', lyrRetry: 'La biblioteca de letras está ocupada, intentando de nuevo…', lyrOffline: 'Esta vista no puede conectarse al servicio de letras. Abre Acorde.html desde tu PC (busca la letra automáticamente), o usa “Buscar en la web”, copia la letra y pégala abajo.', lyrWebBtn: 'Buscar en la web',
      lyrNone: 'No se encontró la letra en la biblioteca. Revisa el artista y el título, o usa “Buscar en la web” y pégala abajo.', lyrInstrumental: 'Ese resultado está marcado como instrumental (sin letra).', lyrFound: 'Encontrada:', lyrLenDiff: 'la duración no coincide con tu archivo, ajusta el tiempo si hace falta',
      lyrNotSynced: 'esta letra no tiene tiempos. Pulsa Sincronizar tocando y toca la barra espaciadora al empezar cada línea.', lyrApplied: 'Letra actualizada.', lyrPasteFirst: 'Primero busca o pega la letra.', lyrTapping: 'Toca la barra espaciadora (o el botón Tocar) justo cuando empieza cada línea.',
      lyrSyncedDone: 'Todas las líneas están sincronizadas. Los acordes ya están sobre las palabras.', lyrIntro: 'Intro', lyrInstrumentalRow: 'Instrumental', lyrOutro: 'Final', lyrNote: 'La letra viene de LRCLIB, una base de datos comunitaria y gratuita. Las letras suelen tener derechos de autor: usa las hojas con letra para tu práctica personal.',
      song: 'Analizar canción', songDropTitle: 'Suelta una canción aquí o haz clic para elegir un archivo', songDropSub: 'MP3, WAV, M4A, OGG o FLAC. La canción se queda en tu computadora.', songDecoding: 'Leyendo el audio…', songAnalyzing: 'Buscando el pulso, el tono y los acordes…', songError: 'No se pudo leer ese archivo. Prueba con un MP3 o WAV.',
      songMeter: 'Compás', songLength: 'Duración', songTuning: 'Afinación', songNowLbl: 'Ahora', songNextLbl: 'Sigue', pause: 'Pausa', songSpeedLbl: 'Velocidad', songTransLbl: 'Transportar', songCapoLbl: 'Cejilla', songClearLoop: 'Quitar bucle',
      songPianoLbl: 'Mostrar acordes en el piano', songFollowLbl: 'Seguir la canción', songPdfLbl: 'Descargar hoja de acordes (PDF)', songLoopHint: 'Haz clic en un compás para ir allí. Haz clic en uno y Mayús+clic en otro para repetir esa sección.',
      songNote: 'Los acordes se detectan automáticamente del audio. Mezclas densas, batería fuerte o acordes poco comunes pueden confundirlo, así que verifica de oído.', pdfMissing: 'La herramienta de PDF no cargó. Revisa tu conexión a internet y recarga la página.',
      instPiano: 'Piano', instGuitar: 'Guitarra', instUke: 'Ukelele', libPdf: 'Descargar hoja de acordes en PDF', shapesLbl: 'Formas de tocarlo', fretWord: 'traste', openWord: 'al aire',  history: 'Tus acordes', classical: 'Clásica', jazz: 'Jazz', pop: 'Pop', salsa: 'Salsa',
      keyLbl: 'Tono', tempo: 'Tempo', loop: 'Repetir', stop: 'Detener', play: 'Tocar', formula: 'Fórmula', notesLbl: 'Notas', playChord: 'Tocar acorde', arpeggio: 'Arpegio',
      invNames: ['Fund.', '1ª inv.', '2ª inv.', '3ª inv.'], histHint: 'Los acordes que tocas aparecen aquí en orden. Haz clic en uno para oírlo otra vez.',
      pianoStyle: 'Estilo de piano', stagePiano: 'Piano de escenario', grandPiano: 'Piano de cola', uprightPiano: 'Piano vertical', rhodesPiano: 'Piano eléctrico (estilo Rhodes)',
      keyColors: 'Colores de las teclas', byHand: 'Mano izquierda y derecha', byTone: 'Fundamental y notas del acorde', leftHand: 'Mano izquierda', rightHand: 'Mano derecha', rootColor: 'Fundamental', toneColor: 'Notas del acorde',
      markRoot: 'Mostrar la fundamental con su propio color', resetColors: 'Restablecer colores', pianoLbl: 'Piano', progHint: 'Haz clic en un acorde para oírlo, o toca toda la progresión.',
      copy: 'Copiar', clearHist: 'Borrar', done: 'Listo', naming: 'Nombres de notas', symbols: 'Cifrado',
      spelling: 'Ortografía', auto: 'Automática', sharps: 'Preferir sostenidos', flats: 'Preferir bemoles', key: 'Tonalidad para números romanos',
      major: 'Mayor', minor: 'Menor', keyLabels: 'Etiquetas en las teclas', none: 'Ninguna', split: 'División mano izquierda/derecha (también divide el pentagrama)',
      hold: 'Mantener el último acorde al soltar', pedal: 'Contar notas sostenidas con el pedal', sound: 'Sonido para teclas en pantalla',
      midiSound: 'Sonido también para el teclado MIDI', handsLbl: 'Mostrar manos de cristal tocando las teclas', skinLbl: 'Estilo', skinSimple: 'Simple', skinAcoustic: 'Acústica (estilo Taylor)', skinElectric: 'Eléctrica (estilo Strat)', settingsNote: 'Los ajustes se guardan en este navegador.', exit: 'Salir',
      example: 'Ejemplo', holding: 'Sostenido', live: 'En vivo', playSomething: 'Toca algunas notas',
      alsoReads: 'También se lee como', noHistory: 'Los acordes que toques aparecen aquí en orden.', copied: 'Copiado',
      noMidi: 'Este navegador no es compatible con MIDI. Abre Acorde en Chrome o Edge para tocar desde tu teclado.',
      midiBlocked: 'MIDI está bloqueado en esta vista. Abre el archivo Acorde.html guardado en tu computadora con Chrome o Edge y tu teclado se conectará.',
      noInputs: 'MIDI está activo pero no se encontró ningún teclado. Conecta el cable USB, enciende el teclado y pulsa Conectar otra vez.',
      single: 'Nota', interval: 'Intervalo', power: 'quinta (power chord)',
      inv: ['posición fundamental', 'primera inversión', 'segunda inversión', 'tercera inversión'], over: 'sobre', with: 'con'
    }
  };
  const KIND = {
    en: { maj: 'major', min: 'minor', dom7: 'dominant', maj7: 'major', m7: 'minor', mmaj7: 'minor-major', hdim: 'half-diminished', dim: 'diminished', dim7: 'diminished', dimmaj7: 'diminished major', aug: 'augmented', aug7: 'augmented', augmaj7: 'augmented major', sus: 'suspended', b5: 'flat-five', power: 'power chord' },
    es: { maj: 'mayor', min: 'menor', dom7: 'dominante', maj7: 'mayor', m7: 'menor', mmaj7: 'menor-mayor', hdim: 'semidisminuido', dim: 'disminuido', dim7: 'disminuido', dimmaj7: 'disminuido mayor', aug: 'aumentado', aug7: 'aumentado', augmaj7: 'aumentado mayor', sus: 'suspendido', b5: 'quinta bemol', power: 'quinta (power chord)' }
  };
  const EXT = { en: { 13: 'thirteenth', 11: 'eleventh', 9: 'ninth', 7: 'seventh', 6: 'sixth' }, es: { 13: 'con 13ª', 11: 'con 11ª', 9: 'con 9ª', 7: 'con 7ª', 6: 'con 6ª' } };

  // ---------- settings ----------
  const S = Object.assign({ lang: 'en', solfege: false, style: 'standard', spelling: 'auto', keyPc: 0, keyMin: false, keyLabels: 'name', split: 60, hold: true, pedal: true, sound: true, midiSound: false, inst: 'guitar', dot: 'name', showFret: false, pianoStyle: 'stage', colorMode: 'hands', colLeft: '#4a7bff', colRight: '#ff9f1c', colRoot: '#ff3d57', colTone: '#4a7bff', markRoot: false, progStyle: 'pop', progKey: 0, bpm: 90, loop: false, tab: 'prog', libRoot: 0, libQ: 'maj7', libInv: 0, hands: true, fretSkin: 'acoustic', songTrans: 0, songCapo: 0, songSpeed: 1, songLoop: false, songPiano: true, songFollow: true, libInst: 'guitar' }, load());
  function load() { try { return JSON.parse(localStorage.getItem('acorde.settings') || '{}'); } catch (e) { return {}; } }
  function save() { try { localStorage.setItem('acorde.settings', JSON.stringify(S)); } catch (e) {} }
  const t = (k) => (T[S.lang][k] != null ? T[S.lang][k] : T.en[k]);
  const nm = (sp) => E.noteName(sp, { solfege: S.solfege });

  // ---------- state ----------
  let latched = new Set([48, 52, 59, 62, 67]); // example: Cmaj9 open voicing
  let example = true;
  const held = new Set();       // keys physically down (MIDI + computer keys)
  const sustained = new Set();  // released while pedal down
  let pedalDown = false;
  let peak = new Set();         // everything pressed since all keys were last up
  let octave = 4;
  let history = [];
  let lastResult = null, lastSymbol = '', histTimer = 0;

  const physActive = () => new Set([...held, ...(S.pedal ? sustained : [])]);
  function displayNotes() {
    const phys = physActive();
    const src = S.hold ? peak : phys;
    return { notes: [...new Set([...latched, ...src])].sort((a, b) => a - b), holding: S.hold && phys.size === 0 && peak.size > 0 };
  }
  function clearExample() { if (example) { example = false; latched.clear(); } }

  function noteOn(n, vel, from) {
    clearExample();
    const wasEmpty = physActive().size === 0;
    if (wasEmpty) peak = new Set();
    held.add(n); sustained.delete(n); peak.add(n);
    if (p3d) p3d.trailOn(n, vel);
    if ((from !== 'midi' && from !== 'song') || (from === 'midi' && S.midiSound)) synth.on(n, vel);
    render();
  }
  function noteOff(n) {
    held.delete(n);
    if (pedalDown && S.pedal) sustained.add(n); else { synth.off(n); if (p3d) p3d.trailOff(n); }
    if (!S.hold && physActive().size === 0) peak = new Set();
    render();
  }
  function pedal(down) {
    pedalDown = down;
    if (!down) { sustained.forEach((n) => { if (!held.has(n)) { synth.off(n); if (p3d) p3d.trailOff(n); } }); sustained.clear(); render(); }
  }

  // ---------- sound ----------
  const synth = (() => {
    let ctx = null; const voices = new Map();
    function ac() { if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; } } if (ctx.state === 'suspended') ctx.resume(); return ctx; }
    function on(n, vel = 90, dur) {
      if (!S.sound) return; const c = ac(); if (!c) return;
      off(n, true);
      const f = 440 * Math.pow(2, (n - 69) / 12), now = c.currentTime;
      const g = c.createGain(), lp = c.createBiquadFilter();
      lp.type = 'lowpass'; lp.frequency.value = Math.min(9000, f * 7);
      const peakG = 0.05 + 0.13 * (vel / 127);
      g.gain.setValueAtTime(0, now); g.gain.linearRampToValueAtTime(peakG, now + 0.006); g.gain.exponentialRampToValueAtTime(peakG * 0.35, now + 0.6); g.gain.exponentialRampToValueAtTime(0.0008, now + 4.5);
      const o1 = c.createOscillator(), o2 = c.createOscillator(), g2 = c.createGain();
      o1.type = 'triangle'; o1.frequency.value = f; o2.type = 'sine'; o2.frequency.value = f * 2; g2.gain.value = 0.25;
      o1.connect(lp); o2.connect(g2).connect(lp); lp.connect(g).connect(c.destination);
      o1.start(now); o2.start(now); o1.stop(now + 4.6); o2.stop(now + 4.6);
      voices.set(n, { g, o1, o2 });
      if (dur) setTimeout(() => off(n), dur);
    }
    function off(n, hard) {
      const v = voices.get(n); if (!v || !ctx) return; voices.delete(n);
      const now = ctx.currentTime; v.g.gain.cancelScheduledValues(now); v.g.gain.setValueAtTime(v.g.gain.value, now);
      v.g.gain.exponentialRampToValueAtTime(0.0008, now + (hard ? 0.03 : 0.35));
      try { v.o1.stop(now + 0.4); v.o2.stop(now + 0.4); } catch (e) {}
    }
    return { on, off };
  })();

  // ---------- piano ----------
  const keysEl = $('keys');
  const keyEls = new Map();
  const isBlack = (n) => [1, 3, 6, 8, 10].includes(n % 12);
  (function buildPiano() {
    const whites = []; for (let n = 21; n <= 108; n++) if (!isBlack(n)) whites.push(n);
    const W = 100 / whites.length, BW = W * 0.6;
    const shift = { 1: -0.12, 3: 0.12, 6: -0.14, 8: 0, 10: 0.14 };
    whites.forEach((n) => {
      const d = document.createElement('div'); d.className = 'wk'; d.dataset.n = n;
      if (n === 60) { const c = document.createElement('i'); c.className = 'cmark'; d.appendChild(c); }
      keysEl.appendChild(d); keyEls.set(n, d);
    });
    for (let n = 22; n <= 108; n++) {
      if (!isBlack(n)) continue;
      const wi = whites.indexOf(n - 1) + 1;
      const d = document.createElement('div'); d.className = 'bk'; d.dataset.n = n;
      d.style.left = (wi * W - BW / 2 + shift[n % 12] * BW) + '%'; d.style.width = BW + '%';
      keysEl.appendChild(d); keyEls.set(n, d);
    }
    let downN = null;
    const release = () => { if (downN != null) { const n = downN; downN = null; keyUp(n); } };
    keysEl.addEventListener('pointerdown', (e) => {
      const k = e.target.closest('[data-n]'); if (!k) return; e.preventDefault();
      release(); downN = +k.dataset.n;
      try { keysEl.setPointerCapture(e.pointerId); } catch (err) {}
      keyDown(downN);
    });
    keysEl.addEventListener('pointerup', release);
    keysEl.addEventListener('pointercancel', release);
    window.addEventListener('blur', release);
  })();
  // on-screen keys play like real keys: sound and light while pressed, clear on release
  function keyDown(n) { noteOn(n, 90, 'tap'); }
  function keyUp(n) { noteOff(n); }
  let p3d = null;
  function centerPiano() { const sc = $('pianoScroll'); if (sc.scrollWidth > sc.clientWidth) sc.scrollLeft = (sc.scrollWidth - sc.clientWidth) * 0.48; }

  // ---------- computer keyboard ----------
  const KMAP = { a: 0, w: 1, s: 2, e: 3, d: 4, f: 5, t: 6, g: 7, y: 8, h: 9, u: 10, j: 11, k: 12, o: 13, l: 14, p: 15, ';': 16 };
  const downKeys = new Map();
  document.addEventListener('keydown', (e) => {
    if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
    if (/input|select|textarea/i.test(document.activeElement && document.activeElement.tagName)) return;
    const k = e.key.toLowerCase();
    if (k === 'escape') { closeSettings(); closePresent(); return; }
    if (k === 'z') { octave = Math.max(1, octave - 1); $('octLabel').textContent = octave; return; }
    if (k === 'x') { octave = Math.min(7, octave + 1); $('octLabel').textContent = octave; return; }
    if (KMAP[k] == null || downKeys.has(k)) return;
    const n = 12 * (octave + 1) + KMAP[k];
    downKeys.set(k, n); noteOn(n, 96, 'kbd');
  });
  document.addEventListener('keyup', (e) => {
    const k = e.key.toLowerCase(); const n = downKeys.get(k);
    if (n == null) return; downKeys.delete(k); noteOff(n);
  });
  window.addEventListener('blur', () => { downKeys.forEach((n) => noteOff(n)); downKeys.clear(); });

  // ---------- MIDI ----------
  let midiAccess = null;
  function notice(msg) { const el = $('midiNotice'); el.textContent = msg || ''; el.hidden = !msg; }
  function bindInputs() {
    const names = [];
    midiAccess.inputs.forEach((inp) => { inp.onmidimessage = onMidi; names.push(inp.name); });
    $('midiLed').classList.toggle('on', names.length > 0);
    $('midiLabel').textContent = names.length ? names[0].replace(/\s*\(.*\)$/, '') : t('connect');
    notice(names.length ? '' : t('noInputs'));
  }
  function onMidi(m) {
    const [st, d1, d2] = m.data; const type = st & 0xf0;
    if (type === 0x90 && d2 > 0) noteOn(d1, d2, 'midi');
    else if (type === 0x80 || (type === 0x90 && d2 === 0)) noteOff(d1);
    else if (type === 0xb0 && d1 === 64) pedal(d2 >= 64);
    else if (type === 0xb0 && (d1 === 123 || d1 === 120)) { held.clear(); sustained.clear(); render(); }
  }
  async function connectMidi() {
    if (!navigator.requestMIDIAccess) { notice(t('noMidi')); return; }
    try {
      midiAccess = await navigator.requestMIDIAccess({ sysex: false });
      midiAccess.onstatechange = bindInputs; bindInputs();
    } catch (e) { notice(t('midiBlocked')); }
  }
  $('midiBtn').addEventListener('click', connectMidi);
  // connect quietly if permission was already given
  if (navigator.permissions && navigator.requestMIDIAccess) {
    navigator.permissions.query({ name: 'midi' }).then((p) => { if (p.state === 'granted') connectMidi(); }).catch(() => {});
  }

  // ---------- naming ----------
  function chordParts(c) {
    const root = nm(c.root);
    const q = c.quality + (c.alts.length ? '(' + c.alts.join(', ') + ')' : '');
    const slash = c.slash ? '/' + nm(c.bassSp) : '';
    return { root, q, slash };
  }
  const symText = (c) => { const p = chordParts(c); return p.root + p.q + p.slash; };
  function spoken(res) {
    const L = S.lang;
    if (res.type === 'note') return t('single') + ' · ' + nm(res.root) + Math.floor(res.notes[0].midi / 12 - 1);
    if (res.type === 'interval') {
      const n = E.INTERVAL_NAMES[L][res.interval];
      return t('interval') + ' · ' + n + (res.power ? ' · ' + t('power') : '');
    }
    const c = res.best;
    let words = KIND[L][c.kind] || '';
    const m = c.quality.match(/13|11|9|7|6/);
    if (m && !['dim7', 'hdim'].includes(c.kind)) words += ' ' + EXT[L][m[0]];
    if (c.kind === 'dim7' || c.kind === 'hdim') words += ' ' + EXT[L][7];
    if (c.kind === 'dom7' && !m) words += ' ' + EXT[L][7];
    let s = nm(c.root) + ' ' + words.trim();
    if (c.alts.length) s += ' ' + t('with') + ' ' + c.alts.join(', ');
    if (res.inversion > 0) s += ' · ' + t('inv')[res.inversion];
    else if (res.inversion < 0) s += ' · ' + t('over') + ' ' + nm(c.bassSp);
    else s += ' · ' + t('inv')[0];
    return s;
  }
  function nameHTML(res) {
    if (!res) return '<span class="empty">' + t('playSomething') + '</span>';
    if (res.type === 'note') return '<span class="r">' + esc(nm(res.root)) + '</span>';
    if (res.type === 'interval') {
      const hi = res.notes[res.notes.length - 1].sp;
      if (res.power) return '<span class="r">' + esc(nm(res.root)) + '</span><span class="q">5</span>';
      return '<span class="r">' + esc(nm(res.root)) + '</span><span class="s">&nbsp;+&nbsp;' + esc(nm(hi)) + '</span>';
    }
    const p = chordParts(res.best);
    return '<span class="r">' + esc(p.root) + '</span>' + (p.q ? '<span class="q">' + esc(p.q) + '</span>' : '') + (p.slash ? '<span class="s">' + esc(p.slash) + '</span>' : '');
  }
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const prettyLabel = (l) => String(l).replace('#', '♯').replace(/^bb/, '𝄫').replace(/^b/, '♭');

  // ---------- render ----------
  let lastNameKey = '';
  function render() {
    const { notes, holding } = displayNotes();
    const res = notes.length ? E.identify(notes, { style: S.style, spelling: S.spelling }) : null;
    lastResult = res;

    const tag = $('stateTag');
    tag.hidden = !(example || holding || notes.length);
    tag.textContent = example ? t('example') : holding ? t('holding') : t('live');

    const html = nameHTML(res);
    const nameEl = $('chordName');
    if (html !== lastNameKey) {
      nameEl.innerHTML = html; $('pName').innerHTML = html; lastNameKey = html;
      if (window.gsap && !matchMedia('(prefers-reduced-motion: reduce)').matches && res) {
        gsap.fromTo([nameEl, $('pName')], { y: 10, opacity: 0.35 }, { y: 0, opacity: 1, duration: 0.28, ease: 'power3.out', overwrite: true });
      }
    }
    const sp = res ? spoken(res) : '';
    $('spoken').textContent = sp; $('pSpoken').textContent = sp;

    // alternates + roman numeral
    const chips = $('altChips'); chips.innerHTML = '';
    if (res && res.type === 'chord') {
      const r = document.createElement('span'); r.className = 'chip roman';
      const keyName = nm(E.rootSpelling(S.keyPc, S.spelling, S.keyMin ? 'min' : 'maj')) + (S.keyMin ? 'm' : '');
      r.textContent = E.roman(res.best, S.keyPc, S.keyMin) + (S.lang === 'es' ? ' en ' : ' in ') + keyName;
      r.title = 'Roman numeral'; chips.appendChild(r);
      const alts = res.candidates.slice(1, 4).filter((c) => c.penalty - res.best.penalty < 4.5);
      if (alts.length) {
        const l = document.createElement('span'); l.className = 'alt-label'; l.textContent = t('alsoReads'); chips.appendChild(l);
        alts.forEach((c) => { const ch = document.createElement('span'); ch.className = 'chip'; ch.textContent = symText(c); chips.appendChild(ch); });
      }
    }

    // tones
    const tones = $('tones'); tones.innerHTML = '';
    if (res) {
      const seen = new Set();
      const ordered = res.type === 'chord'
        ? [...res.notes].sort((a, b) => ivOf(a, res) - ivOf(b, res))
        : res.notes;
      ordered.forEach((x) => {
        const key = mod(x.midi, 12); if (seen.has(key)) return; seen.add(key);
        const d = document.createElement('div');
        const isRoot = res.type === 'chord' ? x.label === 'R' : key === res.rootPc;
        d.className = 'tone' + (isRoot ? ' root' : '');
        const lab = res.type === 'chord' ? (x.label === 'R' ? 'R' : prettyLabel(x.label)) : (isRoot ? 'R' : prettyLabel(['', 'b9', '9', 'b3', '3', '11', '#11', '5', 'b13', '13', 'b7', '7'][mod(x.midi - res.notes[0].midi, 12)]));
        d.innerHTML = '<b>' + esc(nm(x.sp)) + '</b><small>' + esc(lab) + '</small>';
        tones.appendChild(d);
      });
    }

    // piano keys
    const rootPc = res ? (res.type === 'chord' ? res.best.rootPc : res.rootPc) : -1;
    const spellMap = new Map(res ? res.notes.map((x) => [x.midi, x]) : []);
    const lit3d = [];
    const sounding = held; // light only keys that are physically down right now
    keyEls.forEach((el, n) => {
      const on = spellMap.has(n) && sounding.has(n);
      el.classList.toggle('on', on);
      const kc = on ? keyColor(n, mod(n, 12) === rootPc) : '';
      if (on) el.style.setProperty('--kc', kc); else el.style.removeProperty('--kc');
      let lab = el.querySelector('.klab');
      let txt = '';
      if (on && S.keyLabels !== 'none') {
        if (!lab) { lab = document.createElement('span'); lab.className = 'klab'; el.appendChild(lab); }
        const x = spellMap.get(n);
        txt = S.keyLabels === 'name' ? nm(x.sp) : (x.label ? (x.label === 'R' ? 'R' : prettyLabel(x.label)) : (mod(n, 12) === rootPc ? 'R' : ''));
        lab.textContent = txt;
      } else if (lab) lab.remove();
      if (on) lit3d.push({ n, root: mod(n, 12) === rootPc, label: txt, color: kc });
    });
    const hue = moodHue(res);
    document.documentElement.style.setProperty('--mood-h', hue);
    const moodEl = $('mood'); moodEl.textContent = moodName(res); moodEl.hidden = !res;
    if (p3d) {
      p3d.setMood(hue); p3d.setLit(lit3d); p3d.setPressed(held);
      let dn = 'ACORDE';
      if (res) dn = res.type === 'chord' ? symText(res.best) : res.type === 'note' ? nm(res.root) : nm(res.root) + ' + ' + nm(res.notes[res.notes.length - 1].sp);
      p3d.setDisplay(dn, res ? spoken(res).toUpperCase() : (S.lang === 'es' ? 'TOCA UN ACORDE' : 'PLAY A CHORD'));
    }

    drawStaff(res);
    drawFret(res);

    clearTimeout(histTimer);
    if (res && res.type === 'chord' && !example) {
      histTimer = setTimeout(() => {
        const s = symText(res.best);
        if (s !== lastSymbol) { lastSymbol = s; history.push({ notes, sym: s }); if (history.length > 32) history.shift(); renderHistory(); }
      }, 450);
    }
  }
  const MOOD = {
    bright: { h: 42, en: 'Bright', es: 'Brillante' }, dark: { h: 222, en: 'Dark', es: 'Oscuro' }, tension: { h: 24, en: 'Tension', es: 'Tensión' },
    unstable: { h: 276, en: 'Unstable', es: 'Inestable' }, dreamy: { h: 318, en: 'Dreamy', es: 'Soñador' }, open: { h: 168, en: 'Open', es: 'Abierto' }, plain: { h: 205, en: 'Neutral', es: 'Neutral' }
  };
  function moodKey(res) {
    if (!res || res.type !== 'chord') return 'plain';
    const k = res.best.kind;
    if (['maj', 'maj7'].includes(k)) return 'bright';
    if (['min', 'm7', 'mmaj7'].includes(k)) return 'dark';
    if (['dom7', 'b5'].includes(k)) return 'tension';
    if (['dim', 'dim7', 'hdim', 'dimmaj7'].includes(k)) return 'unstable';
    if (['aug', 'aug7', 'augmaj7'].includes(k)) return 'dreamy';
    if (k === 'sus') return 'open';
    return 'plain';
  }
  const moodHue = (res) => MOOD[moodKey(res)].h;
  const moodName = (res) => MOOD[moodKey(res)][S.lang];
  function ivOf(x, res) { return mod(x.midi - res.best.rootPc, 12) + (x.label === 'R' ? -1 : 0); }

  // ---------- staff ----------
  const SP = 12, HS = SP / 2;
  const TREB_BOT = 118, BASS_TOP = 190; // y of E4 line, A3 line
  const staffEl = $('staff');
  function el(tag, attrs, parent) { const e = document.createElementNS(SVGNS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; }
  function stepOf(midi, sp) { const oct = (midi - E.LETTER_PC[sp.letter] - sp.acc) / 12 - 1; return sp.letter + 7 * Math.round(oct); }
  const yTreble = (s) => TREB_BOT - (s - 30) * HS;
  const yBass = (s) => BASS_TOP - (s - 26) * HS;
  function fitGlyph(g, box) {
    try {
      const b = g.getBBox(); if (!b.height) return;
      const k = box.h / b.height;
      g.setAttribute('transform', `translate(${box.x - b.x * k} ${box.y - b.y * k}) scale(${k})`);
    } catch (e) {}
  }
  function drawStaff(res) {
    staffEl.innerHTML = '';
    staffEl.setAttribute('viewBox', '0 -10 520 320');
    const X0 = 46, X1 = 504;
    const ink = 'var(--staff)';
    for (let i = 0; i < 5; i++) {
      el('line', { x1: X0, x2: X1, y1: TREB_BOT - i * SP, y2: TREB_BOT - i * SP, stroke: ink, 'stroke-width': 1.1 }, staffEl);
      el('line', { x1: X0, x2: X1, y1: BASS_TOP + i * SP, y2: BASS_TOP + i * SP, stroke: ink, 'stroke-width': 1.1 }, staffEl);
    }
    const topY = TREB_BOT - 4 * SP, botY = BASS_TOP + 4 * SP;
    el('line', { x1: X0, x2: X0, y1: topY, y2: botY, stroke: ink, 'stroke-width': 1.4 }, staffEl);
    el('line', { x1: X1, x2: X1, y1: topY, y2: botY, stroke: ink, 'stroke-width': 1.4 }, staffEl);
    // brace
    const midY = (topY + botY) / 2, h = botY - topY;
    el('path', { d: `M ${X0 - 6} ${topY} C ${X0 - 22} ${topY + h * 0.18}, ${X0 - 4} ${midY - h * 0.2}, ${X0 - 18} ${midY} C ${X0 - 4} ${midY + h * 0.2}, ${X0 - 22} ${botY - h * 0.18}, ${X0 - 6} ${botY} C ${X0 - 14} ${botY - h * 0.2}, ${X0 + 2} ${midY + h * 0.15}, ${X0 - 13} ${midY} C ${X0 + 2} ${midY - h * 0.15}, ${X0 - 14} ${topY + h * 0.2}, ${X0 - 6} ${topY} Z`, fill: ink }, staffEl);
    // clefs, fitted to the staff whatever font draws them
    const gc = el('text', { x: 0, y: 0, 'font-family': 'var(--font-music)', 'font-size': 80, fill: ink }, staffEl); gc.textContent = '\u{1D11E}';
    fitGlyph(gc, { x: X0 + 8, y: topY - SP * 1.55, h: SP * 7.1 });
    const fc = el('text', { x: 0, y: 0, 'font-family': 'var(--font-music)', 'font-size': 80, fill: ink }, staffEl); fc.textContent = '\u{1D122}';
    fitGlyph(fc, { x: X0 + 10, y: BASS_TOP - 25, h: SP * 7.1 });

    if (!res) return;
    const split = S.split;
    const NX = 300;
    const groups = { t: [], b: [] };
    res.notes.forEach((x) => { const s = stepOf(x.midi, x.sp); (x.midi >= split ? groups.t : groups.b).push({ ...x, s }); });
    const rootPc = res.type === 'chord' ? res.best.rootPc : res.rootPc;
    for (const key of ['t', 'b']) {
      const arr = groups[key].sort((a, b) => a.s - b.s);
      const Y = key === 't' ? yTreble : yBass;
      // seconds
      let prev = null;
      arr.forEach((n) => { n.dx = 0; if (prev && n.s - prev.s <= 1 && prev.dx === 0) n.dx = 15; prev = n; });
      // ledger lines
      const ledgers = new Map();
      arr.forEach((n) => {
        const add = (s) => { const k = s; const cur = ledgers.get(k) || { min: 0, max: 0 }; cur.min = Math.min(cur.min, n.dx); cur.max = Math.max(cur.max, n.dx); ledgers.set(k, cur); };
        if (key === 't') { for (let s = 28; s >= n.s; s -= 2) add(s); for (let s = 40; s <= n.s; s += 2) add(s); }
        else { for (let s = 28; s <= n.s; s += 2) add(s); for (let s = 16; s >= n.s; s -= 2) add(s); }
      });
      ledgers.forEach((v, s) => el('line', { x1: NX - 12 + v.min, x2: NX + 12 + v.max, y1: Y(s), y2: Y(s), stroke: ink, 'stroke-width': 1.1 }, staffEl));
      // accidentals (columns from the top down)
      const cols = [];
      [...arr].reverse().forEach((n) => {
        if (!n.sp.acc) return;
        let c = 0; while (cols[c] && cols[c].some((s) => Math.abs(s - n.s) < 6)) c++;
        (cols[c] = cols[c] || []).push(n.s);
        const glyph = { 1: '♯', '-1': '♭', 2: '𝄪', '-2': '𝄫' }[n.sp.acc];
        const tx = el('text', { x: NX - 20 - c * 14 - (arr.some((m) => m.dx) ? 0 : 0), y: Y(n.s) + (n.sp.acc < 0 ? 4 : 6), 'text-anchor': 'middle', 'font-family': 'var(--font-music)', 'font-size': 22, fill: ink }, staffEl);
        tx.textContent = glyph;
      });
      // noteheads
      arr.forEach((n) => {
        const cx = NX + n.dx, cy = Y(n.s);
        const isRoot = mod(n.midi, 12) === rootPc;
        const col = isRoot ? 'var(--root)' : 'var(--ink)';
        const g = el('g', {}, staffEl);
        el('ellipse', { cx, cy, rx: 8.6, ry: 5.9, fill: col }, g);
        el('ellipse', { cx, cy, rx: 3.6, ry: 4.8, fill: 'var(--panel)', transform: `rotate(-38 ${cx} ${cy})` }, g);
      });
    }
  }

  // ---------- fretboard ----------
  const fretEl = $('fret');
  function drawFret(res) {
    fretEl.innerHTML = '';
    const guitar = S.inst === 'guitar';
    const skin = S.fretSkin || 'acoustic';
    const real = skin !== 'simple';
    const tuning = guitar ? [64, 59, 55, 50, 45, 40] : [43, 38, 33, 28];
    const names = guitar ? ['E', 'B', 'G', 'D', 'A', 'E'] : ['G', 'D', 'A', 'E'];
    const FR = 15, NUT = 78, END = real ? 1000 : 986;
    const top = 30, gap = guitar ? 29 : 40, bottom = top + gap * (tuning.length - 1);
    // real guitars: frets get closer together up the neck
    const span = 1 - Math.pow(2, -FR / 12);
    const fx = (f) => real ? NUT + (END - NUT) * (1 - Math.pow(2, -f / 12)) / span : NUT + f * ((END - NUT) / FR);
    const mid = (f) => f === 0 ? NUT - 22 : (fx(f - 1) + fx(f)) / 2;
    const H = bottom + 44;
    fretEl.setAttribute('viewBox', `0 0 1000 ${H}`);

    if (!real) {
      el('rect', { x: NUT, y: top - 12, width: END - NUT, height: bottom - top + 24, rx: 4, fill: 'var(--panel-2)' }, fretEl);
      [3, 5, 7, 9, 15].forEach((f) => el('circle', { cx: mid(f), cy: (top + bottom) / 2, r: 5, fill: 'var(--line)' }, fretEl));
      [-1, 1].forEach((d) => el('circle', { cx: mid(12), cy: (top + bottom) / 2 + d * gap, r: 5, fill: 'var(--line)' }, fretEl));
      for (let f = 0; f <= FR; f++) el('line', { x1: fx(f), x2: fx(f), y1: top - 12, y2: bottom + 12, stroke: f === 0 ? 'var(--fg)' : 'var(--line)', 'stroke-width': f === 0 ? 5 : 2 }, fretEl);
      tuning.forEach((o, i) => { const y = top + i * gap; el('line', { x1: NUT - 30, x2: END, y1: y, y2: y, stroke: 'var(--muted)', 'stroke-width': guitar ? 0.8 + i * 0.35 : 1.4 + i * 0.5, opacity: 0.8 }, fretEl); });
    } else {
      const ac = skin === 'acoustic';
      const defs = el('defs', {}, fretEl);
      const uid = 'fb' + skin;
      const grad = (id, stops, vertical = true) => { const g = el('linearGradient', { id, x1: 0, y1: 0, x2: vertical ? 0 : 1, y2: vertical ? 1 : 0 }, defs); stops.forEach(([o, c, a]) => el('stop', { offset: o, 'stop-color': c, 'stop-opacity': a == null ? 1 : a }, g)); return `url(#${id})`; };
      const woodFill = ac ? grad(uid + 'w', [[0, '#0d0907'], [0.5, '#2a1f18'], [1, '#0d0907']]) : grad(uid + 'w', [[0, '#c98f4f'], [0.45, '#efc98f'], [0.55, '#f2cf97'], [1, '#c4894a']]);
      const grain = el('filter', { id: uid + 'g', x: 0, y: 0, width: 1, height: 1 }, defs);
      el('feTurbulence', { type: 'fractalNoise', baseFrequency: ac ? '0.004 0.32' : '0.003 0.18', numOctaves: 4, seed: ac ? 11 : 4, result: 'n' }, grain);
      el('feColorMatrix', { in: 'n', type: 'matrix', values: ac ? '0 0 0 0 0.02  0 0 0 0 0.01  0 0 0 0 0  0 0 0 -1.6 1.15' : '0 0 0 0 0.45  0 0 0 0 0.24  0 0 0 0 0.08  0 0 0 -1.8 1.2' }, grain);
      const pearl = el('radialGradient', { id: uid + 'p', cx: 0.35, cy: 0.35, r: 0.75 }, defs);
      [[0, '#ffffff'], [0.45, '#dbeef2'], [0.75, '#f1d8ee'], [1, '#bcd3da']].forEach(([o, c]) => el('stop', { offset: o, 'stop-color': c }, pearl));
      const fretFill = grad(uid + 'f', [[0, '#7e848b'], [0.35, '#f4f6f8'], [0.6, '#d5d9de'], [1, '#6c7279']], false);
      const nutFill = grad(uid + 'n', [[0, '#cfc4aa'], [0.5, '#f7f0de'], [1, '#c6bb9f']], false);
      const wound = el('pattern', { id: uid + 'wd', width: 2.4, height: 6, patternUnits: 'userSpaceOnUse', patternTransform: 'skewX(-38)' }, defs);
      el('rect', { x: 0, y: 0, width: 1.1, height: 6, fill: 'rgba(0,0,0,.55)' }, wound);
      const bronze = grad(uid + 'br', [[0, '#7a5a2c'], [0.4, '#e7c48a'], [0.6, '#c9a066'], [1, '#6b4d24']]);
      const steel = grad(uid + 'st', [[0, '#7b8187'], [0.45, '#f5f7f9'], [1, '#6d7379']]);
      const nickel = grad(uid + 'ni', [[0, '#70767c'], [0.45, '#e9ecef'], [0.6, '#c7ccd1'], [1, '#62686e']]);
      const yt = top - 15, yb = bottom + 15, taper = 4;
      // spruce top of the body under the end of the acoustic fingerboard, with the edge of the soundhole rosette
      if (ac) {
        const sp = grad(uid + 'sp', [[0, '#d9b887'], [0.5, '#ecd2a6'], [1, '#d4b07c']]);
        el('rect', { x: fx(14) - 6, y: 0, width: 1000 - fx(14) + 6, height: H - 26, fill: sp }, fretEl);
        el('rect', { x: fx(14) - 6, y: 0, width: 1000 - fx(14) + 6, height: H - 26, fill: '#7a5a34', opacity: 0.12, filter: `url(#${uid}g)` }, fretEl);
        [[118, 3, '#2a1d12'], [110, 6, 'url(#' + uid + 'p)'], [102, 2, '#2a1d12'], [92, 1.5, '#2a1d12']].forEach(([r, w, c]) => el('circle', { cx: 1092, cy: (top + bottom) / 2, r, fill: 'none', stroke: c, 'stroke-width': w }, fretEl));
        el('circle', { cx: 1092, cy: (top + bottom) / 2, r: 86, fill: '#120c07' }, fretEl);
      }
      // headstock side of the nut
      el('rect', { x: 34, y: yt + taper - 2, width: NUT - 34, height: yb - yt - 2 * taper + 4, rx: 3, fill: ac ? '#1a120d' : woodFill }, fretEl);
      // tapered fingerboard
      const board = `M ${NUT} ${yt + taper} L ${END} ${yt} L ${END} ${yb} L ${NUT} ${yb - taper} Z`;
      el('path', { d: board, fill: woodFill }, fretEl);
      el('path', { d: board, fill: '#000', opacity: ac ? 0.5 : 0.35, filter: `url(#${uid}g)` }, fretEl);
      if (!ac) el('path', { d: `M ${NUT} ${yt + taper + 6} L ${END} ${yt + 6} L ${END} ${yt + 14} L ${NUT} ${yt + taper + 12} Z`, fill: '#fff', opacity: 0.16 }, fretEl);
      if (ac) {
        el('line', { x1: NUT, y1: yt + taper, x2: END, y2: yt, stroke: '#efe4c8', 'stroke-width': 3 }, fretEl);
        el('line', { x1: NUT, y1: yb - taper, x2: END, y2: yb, stroke: '#efe4c8', 'stroke-width': 3 }, fretEl);
      }
      // inlays
      const inlay = (x, y) => ac
        ? el('circle', { cx: x, cy: y, r: 5.2, fill: `url(#${uid}p)`, stroke: 'rgba(0,0,0,.35)', 'stroke-width': 0.6 }, fretEl)
        : el('circle', { cx: x, cy: y, r: 5.4, fill: '#1b130d' }, fretEl);
      [3, 5, 7, 9, 15].forEach((f) => inlay(mid(f), (top + bottom) / 2));
      [-1, 1].forEach((d) => inlay(mid(12), (top + bottom) / 2 + d * gap * (guitar ? 1.5 : 1)));
      // frets
      for (let f = 1; f <= FR; f++) {
        const x = fx(f), tt = (x - NUT) / (END - NUT), y0 = yt + taper * (1 - tt), y1 = yb - taper * (1 - tt);
        el('rect', { x: x - 1.9, y: y0, width: 3.8, height: y1 - y0, fill: fretFill }, fretEl);
        el('line', { x1: x + 2.6, x2: x + 2.6, y1: y0, y2: y1, stroke: 'rgba(0,0,0,.35)', 'stroke-width': 1.6 }, fretEl);
      }
      // nut
      el('rect', { x: NUT - 7, y: yt + taper - 3, width: 7, height: yb - yt - 2 * taper + 6, rx: 1.5, fill: nutFill }, fretEl);
      // strings with shadows, wound low strings
      const widths = guitar ? [1.1, 1.4, ac ? 2.0 : 1.7, 2.4, 2.9, 3.4] : [2.6, 3.2, 3.8, 4.4];
      tuning.forEach((o, i) => {
        const y = top + i * gap, w = widths[i];
        const isWound = guitar ? (ac ? i >= 2 : i >= 3) : true;
        const base = isWound ? (ac ? bronze : nickel) : steel;
        el('rect', { x: 34, y: y + w * 0.5 + 1.6, width: 966, height: Math.max(1, w * 0.7), fill: '#000', opacity: 0.32 }, fretEl);
        el('rect', { x: 34, y: y - w / 2, width: 966, height: w, fill: base }, fretEl);
        if (isWound) el('rect', { x: 34, y: y - w / 2, width: 966, height: w, fill: `url(#${uid}wd)`, opacity: 0.55 }, fretEl);
        el('circle', { cx: 40, cy: y, r: Math.max(2, w * 0.9), fill: ac ? '#d4c09a' : '#e4e7ea' }, fretEl);
      });
    }
    // string names and fret numbers
    tuning.forEach((o, i) => {
      const y = top + i * gap;
      if (real) el('rect', { x: 2, y: y - 9, width: 24, height: 18, rx: 5, fill: 'var(--panel)', opacity: 0.92 }, fretEl);
      const tx = el('text', { x: 14, y: y + 4, 'text-anchor': 'middle', 'font-family': 'var(--font-mono)', 'font-size': 12, 'font-weight': 600, fill: 'var(--muted)' }, fretEl);
      tx.textContent = S.solfege ? E.SOLFEGE[names[i]] : names[i];
    });
    for (let f = 1; f <= FR; f++) { if ([3, 5, 7, 9, 12, 15].includes(f)) { const tx = el('text', { x: mid(f), y: bottom + 36, 'text-anchor': 'middle', 'font-family': 'var(--font-mono)', 'font-size': 11, fill: 'var(--muted)' }, fretEl); tx.textContent = f; } }
    if (!res) return;
    const rootPc = res.type === 'chord' ? res.best.rootPc : res.rootPc;
    const info = new Map(); res.notes.forEach((x) => { if (!info.has(mod(x.midi, 12))) info.set(mod(x.midi, 12), x); });
    const played = [...new Set(res.notes.map((x) => x.midi))].sort((a, b) => a - b);
    const pick = fretPick(played, tuning, guitar, rootPc);
    if (!pick) return;
    // tag: exact or closest
    const tag = el('text', { x: 34, y: bottom + 36, 'text-anchor': 'start', 'font-family': 'var(--font-ui)', 'font-size': 12, 'font-weight': 600, fill: pick.exact ? 'var(--accent)' : 'var(--muted)' }, fretEl);
    tag.textContent = pick.exact ? t('fretExact') : t('fretNear');
    const exactSet = new Set(played);
    pick.frets.forEach((f, i) => {
      const y = top + i * gap;
      if (f < 0) { // muted string
        const tx = el('text', { x: NUT - 20, y: y + 5, 'text-anchor': 'middle', 'font-family': 'var(--font-ui)', 'font-weight': 800, 'font-size': 15, fill: '#fff', stroke: '#000', 'stroke-width': 3, 'paint-order': 'stroke' }, fretEl); tx.textContent = '×';
        return;
      }
      const m = tuning[i] + f, pc = mod(m, 12), x = mid(f);
      const isRoot = pc === rootPc;
      const it = info.get(pc);
      if (pick.exact || exactSet.has(m)) el('circle', { cx: x, cy: y, r: 15, fill: 'none', stroke: isRoot ? 'var(--root)' : 'var(--accent)', 'stroke-width': 2.4 }, fretEl);
      el('circle', { cx: x, cy: y + (real ? 1.5 : 0), r: 11.5, fill: '#000', opacity: real ? 0.35 : 0 }, fretEl);
      el('circle', { cx: x, cy: y, r: 11.5, fill: isRoot ? 'var(--root)' : 'var(--accent)', stroke: real ? 'rgba(255,255,255,.85)' : 'none', 'stroke-width': 1.5 }, fretEl);
      const lab = !it ? noteLetter(pc) : S.dot === 'name' ? nm(it.sp) : (res.type === 'chord' ? (it.label === 'R' ? 'R' : prettyLabel(it.label)) : (isRoot ? 'R' : '·'));
      const tx = el('text', { x, y: y + 4, 'text-anchor': 'middle', 'font-family': 'var(--font-ui)', 'font-weight': 700, 'font-size': lab.length > 2 ? 9 : 11, fill: '#fff' }, fretEl);
      tx.textContent = lab;
    });
  }
  const noteLetter = (pc) => nm(E.rootSpelling(pc, S.spelling === 'sharp' ? 'sharp' : 'flat', 'maj'));
  // choose ONE playable position: the exact pitches you played if they fit on the neck, otherwise the closest chord shape.
  // tuning is listed high string first (as drawn); the result uses the same order, -1 = not played
  function fretPick(played, tuning, guitar, rootPc) {
    const ns = tuning.length, FMAX = 15;
    let best = null;
    if (played.length <= ns) {
      const cur = new Array(ns).fill(-1), used = new Array(ns).fill(false);
      (function rec(k) {
        if (k === played.length) {
          const fr = cur.filter((f) => f > 0), fmin = fr.length ? Math.min(...fr) : 0, fmax = fr.length ? Math.max(...fr) : 0;
          if (fmax - fmin > 3) return;
          if (fr.length > 4) { // more than four fretted notes needs a barre on the lowest fret
            if (cur.filter((f) => f === fmin).length < 2 || fr.filter((f) => f > fmin).length > 3) return;
          }
          const on = cur.map((f, i) => (f >= 0 ? i : -1)).filter((i) => i >= 0);
          let holes = 0; for (let i = on[0]; i <= on[on.length - 1]; i++) if (cur[i] < 0) holes++;
          const opens = cur.filter((f) => f === 0).length;
          const sc = (fmax - fmin) * 1.2 + fmin * 0.18 + holes * 2.2 + (fmin > 4 ? opens * 2.5 : 0);
          if (!best || sc < best.sc) best = { frets: cur.slice(), sc, exact: true };
          return;
        }
        const n = played[k];
        for (let i = 0; i < ns; i++) {
          if (used[i]) continue; const f = n - tuning[i]; if (f < 0 || f > FMAX) continue;
          used[i] = true; cur[i] = f; rec(k + 1); used[i] = false; cur[i] = -1;
        }
      })(0);
      if (best) return best;
    }
    if (!guitar) { // bass: the lowest note you played, wherever it sits best
      const n = played[0];
      for (let o = 0; o < 4; o++) for (let i = ns - 1; i >= 0; i--) { const f = n + 12 * o - tuning[i]; if (f >= 0 && f <= 12) { const fr = new Array(ns).fill(-1); fr[i] = f; return { frets: fr, exact: o === 0 }; } }
      return null;
    }
    // guitar: closest standard chord shape for the same tones
    const pcs = [...new Set(played.map((n) => mod(n, 12)))];
    const bassPc = mod(played[0], 12);
    const ivs = pcs.map((pc) => mod(pc - bassPc, 12)).sort((a, b) => a - b);
    let shapes = frettedShapes(bassPc, ivs, 'guitar', 12);
    if (!shapes.length && rootPc >= 0 && rootPc !== bassPc) shapes = frettedShapes(rootPc, pcs.map((pc) => mod(pc - rootPc, 12)).sort((a, b) => a - b), 'guitar', 12);
    if (!shapes.length) return null;
    const lowFirst = [40, 45, 50, 55, 59, 64];
    let pickS = null, pickSc = 1e9;
    const set = new Set(played);
    shapes.forEach((sh) => {
      const ms = sh.frets.map((f, i) => (f >= 0 ? lowFirst[i] + f : null)).filter((m) => m != null);
      const hits = ms.filter((m) => set.has(m)).length;
      const center = ms.reduce((a, b) => a + b, 0) / ms.length, pc = played.reduce((a, b) => a + b, 0) / played.length;
      const sc = -hits * 3 + Math.abs(center - pc) * 0.25 + sh.base * 0.05;
      if (sc < pickSc) { pickSc = sc; pickS = sh; }
    });
    return { frets: pickS.frets.slice().reverse(), exact: false };
  }

  // ---------- history ----------
  function renderHistory() {
    const h = $('history'); h.innerHTML = '';
    if (!history.length) { const s = document.createElement('span'); s.className = 'none'; s.textContent = t('noHistory'); h.appendChild(s); return; }
    history.forEach((it) => {
      const c = document.createElement('button'); c.type = 'button'; c.className = 'chip';
      const res = E.identify(it.notes, { style: S.style, spelling: S.spelling });
      c.textContent = res && res.type === 'chord' ? symText(res.best) : it.sym;
      c.addEventListener('click', () => { clearExample(); latched.clear(); lastSymbol = c.textContent; it.notes.forEach((n, i) => setTimeout(() => noteOn(n, 80, 'tap'), i * 25)); setTimeout(() => it.notes.forEach((n) => noteOff(n)), 1300); });
      h.appendChild(c);
    });
  }
  $('histClear').addEventListener('click', () => { history = []; lastSymbol = ''; renderHistory(); });
  $('copyBtn').addEventListener('click', async (e) => {
    const txt = [...$('history').querySelectorAll('.chip')].map((c) => c.textContent).join(' | ');
    if (!txt) return;
    try { await navigator.clipboard.writeText(txt); e.target.textContent = t('copied'); setTimeout(() => (e.target.textContent = t('copy')), 1400); }
    catch (err) { const r = document.createRange(); r.selectNodeContents($('history')); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }
  });
  $('clearBtn').addEventListener('click', () => { example = false; latched.clear(); peak = new Set([...physActive()]); render(); });

  // ---------- settings ----------
  function segBind(aId, bId, get, set) {
    const a = $(aId), b = $(bId);
    const sync = () => { a.setAttribute('aria-pressed', String(get())); b.setAttribute('aria-pressed', String(!get())); };
    a.addEventListener('click', () => { set(true); sync(); save(); applyAll(); });
    b.addEventListener('click', () => { set(false); sync(); save(); applyAll(); });
    sync();
  }
  segBind('langEn', 'langEs', () => S.lang === 'en', (v) => (S.lang = v ? 'en' : 'es'));
  segBind('nameLetters', 'nameSolfege', () => !S.solfege, (v) => (S.solfege = !v));
  segBind('symStd', 'symJazz', () => S.style === 'standard', (v) => (S.style = v ? 'standard' : 'jazz'));
  segBind('instGuitar', 'instBass', () => S.inst === 'guitar', (v) => (S.inst = v ? 'guitar' : 'bass'));
  segBind('dotNotes', 'dotIntervals', () => S.dot === 'name', (v) => (S.dot = v ? 'name' : 'interval'));
  function fillKeySelect() {
    const sel = $('keyRoot'); const cur = S.keyPc; sel.innerHTML = '';
    for (let pc = 0; pc < 12; pc++) { const o = document.createElement('option'); o.value = pc; o.textContent = nm(E.rootSpelling(pc, 'auto', S.keyMin ? 'min' : 'maj')); sel.appendChild(o); }
    sel.value = cur;
  }
  const bindSel = (id, key, cast) => { const s = $(id); s.value = String(S[key] === true ? 'min' : S[key] === false && key === 'keyMin' ? 'maj' : S[key]); s.addEventListener('change', () => { S[key] = cast(s.value); save(); applyAll(); }); };
  bindSel('spelling', 'spelling', String);
  bindSel('keyLabels', 'keyLabels', String);
  bindSel('split', 'split', Number);
  bindSel('fretSkin', 'fretSkin', String);
  bindSel('keyRoot', 'keyPc', Number);
  bindSel('keyMode', 'keyMin', (v) => v === 'min');
  ['hold', 'pedal', 'sound', 'midiSound'].forEach((k) => { const c = $(k); c.checked = !!S[k]; c.addEventListener('change', () => { S[k] = c.checked; if (k === 'hold' && !c.checked) peak = new Set([...physActive()]); save(); render(); }); });

  function openSettings() { $('drawer').hidden = false; $('scrim').hidden = false; $('closeSettings').focus(); }
  function closeSettings() { $('drawer').hidden = true; $('scrim').hidden = true; }
  $('settingsBtn').addEventListener('click', openSettings);
  $('closeSettings').addEventListener('click', closeSettings);
  $('scrim').addEventListener('click', closeSettings);

  function openPresent() { $('present').hidden = false; try { document.documentElement.requestFullscreen && document.documentElement.requestFullscreen().catch(() => {}); } catch (e) {} }
  function closePresent() { if ($('present').hidden) return; $('present').hidden = true; try { document.fullscreenElement && document.exitFullscreen(); } catch (e) {} }
  $('presentBtn').addEventListener('click', openPresent);
  $('presentClose').addEventListener('click', closePresent);

  function applyText() {
    document.documentElement.lang = S.lang;
    document.querySelectorAll('[data-i18n]').forEach((n) => { const v = T[S.lang][n.dataset.i18n]; if (v != null) n.textContent = v; });
    if (midiAccess) bindInputs();
  }
  function applyFret() {
    $('fretSection').hidden = !S.showFret;
    $('fretToggle').setAttribute('aria-pressed', String(!!S.showFret));
    $('fretToggleLabel').textContent = S.showFret ? t('hideFret') : t('showFret');
  }
  $('fretToggle').addEventListener('click', () => {
    S.showFret = !S.showFret; save(); applyFret();
    if (S.showFret) $('fretSection').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
  function applyPlaceholders() { [['lyrArtist', 'lyrArtistPh'], ['lyrTitle', 'lyrTitlePh'], ['lyrText', 'lyrTextPh']].forEach(([id, k]) => { const el = $(id); if (el) el.placeholder = t(k); }); }
  function applyAll() { applyPlaceholders(); applyFret(); fillKeySelect(); applyText(); applyColorUI(); applyTab(); if (window.__fillProgKey) window.__fillProgKey(); renderProgs(); renderLib(); lastNameKey = ''; render(); renderHistory(); }

  // ================= chord qualities (shared by the library and the progressions) =================
  const Q = {
    maj: { s: '', j: '', iv: [0, 4, 7], f: '1 3 5', en: 'Major', es: 'Mayor', g: 'triad' },
    min: { s: 'm', j: '−', iv: [0, 3, 7], f: '1 ♭3 5', en: 'Minor', es: 'Menor', g: 'triad' },
    dim: { s: 'dim', j: '°', iv: [0, 3, 6], f: '1 ♭3 ♭5', en: 'Diminished', es: 'Disminuido', g: 'triad' },
    aug: { s: 'aug', j: '+', iv: [0, 4, 8], f: '1 3 ♯5', en: 'Augmented', es: 'Aumentado', g: 'triad' },
    sus2: { s: 'sus2', j: 'sus2', iv: [0, 2, 7], f: '1 2 5', en: 'Suspended 2nd', es: 'Suspendido 2ª', g: 'triad' },
    sus4: { s: 'sus4', j: 'sus4', iv: [0, 5, 7], f: '1 4 5', en: 'Suspended 4th', es: 'Suspendido 4ª', g: 'triad' },
    p5: { s: '5', j: '5', iv: [0, 7, 12], f: '1 5', en: 'Power chord', es: 'Quinta (power chord)', g: 'triad' },
    six: { s: '6', j: '6', iv: [0, 4, 7, 9], f: '1 3 5 6', en: 'Major 6th', es: 'Sexta mayor', g: 'six' },
    m6: { s: 'm6', j: '−6', iv: [0, 3, 7, 9], f: '1 ♭3 5 6', en: 'Minor 6th', es: 'Menor con sexta', g: 'six' },
    six9: { s: '6/9', j: '6/9', iv: [0, 4, 7, 9, 14], f: '1 3 5 6 9', en: 'Six-nine', es: 'Seis-nueve', g: 'six' },
    maj7: { s: 'maj7', j: 'Δ7', iv: [0, 4, 7, 11], f: '1 3 5 7', en: 'Major 7th', es: 'Séptima mayor', g: 'seventh' },
    dom7: { s: '7', j: '7', iv: [0, 4, 7, 10], f: '1 3 5 ♭7', en: 'Dominant 7th', es: 'Séptima dominante', g: 'seventh' },
    m7: { s: 'm7', j: '−7', iv: [0, 3, 7, 10], f: '1 ♭3 5 ♭7', en: 'Minor 7th', es: 'Menor séptima', g: 'seventh' },
    mmaj7: { s: 'm(maj7)', j: '−Δ7', iv: [0, 3, 7, 11], f: '1 ♭3 5 7', en: 'Minor-major 7th', es: 'Menor con 7ª mayor', g: 'seventh' },
    m7b5: { s: 'm7♭5', j: 'ø7', iv: [0, 3, 6, 10], f: '1 ♭3 ♭5 ♭7', en: 'Half-diminished', es: 'Semidisminuido', g: 'seventh' },
    dim7: { s: 'dim7', j: '°7', iv: [0, 3, 6, 9], f: '1 ♭3 ♭5 𝄫7', en: 'Diminished 7th', es: 'Séptima disminuida', g: 'seventh' },
    sus47: { s: '7sus4', j: '7sus4', iv: [0, 5, 7, 10], f: '1 4 5 ♭7', en: 'Dominant 7 sus4', es: 'Séptima sus4', g: 'seventh' },
    maj7s5: { s: 'maj7♯5', j: 'Δ7♯5', iv: [0, 4, 8, 11], f: '1 3 ♯5 7', en: 'Augmented major 7th', es: 'Séptima mayor aumentada', g: 'seventh' },
    aug7: { s: '7♯5', j: '7♯5', iv: [0, 4, 8, 10], f: '1 3 ♯5 ♭7', en: 'Augmented 7th', es: 'Séptima aumentada', g: 'seventh' },
    add9: { s: 'add9', j: 'add9', iv: [0, 4, 7, 14], f: '1 3 5 9', en: 'Add nine', es: 'Novena añadida', g: 'ext' },
    madd9: { s: 'm(add9)', j: '−(add9)', iv: [0, 3, 7, 14], f: '1 ♭3 5 9', en: 'Minor add nine', es: 'Menor con novena añadida', g: 'ext' },
    maj9: { s: 'maj9', j: 'Δ9', iv: [0, 4, 7, 11, 14], f: '1 3 5 7 9', en: 'Major 9th', es: 'Novena mayor', g: 'ext' },
    dom9: { s: '9', j: '9', iv: [0, 4, 7, 10, 14], f: '1 3 5 ♭7 9', en: 'Dominant 9th', es: 'Novena dominante', g: 'ext' },
    m9: { s: 'm9', j: '−9', iv: [0, 3, 7, 10, 14], f: '1 ♭3 5 ♭7 9', en: 'Minor 9th', es: 'Menor novena', g: 'ext' },
    sus49: { s: '9sus4', j: '9sus4', iv: [0, 5, 7, 10, 14], f: '1 4 5 ♭7 9', en: 'Nine sus4', es: 'Novena sus4', g: 'ext' },
    m11: { s: 'm11', j: '−11', iv: [0, 3, 7, 10, 14, 17], f: '1 ♭3 5 ♭7 9 11', en: 'Minor 11th', es: 'Menor oncena', g: 'ext' },
    maj7s11: { s: 'maj7♯11', j: 'Δ7♯11', iv: [0, 4, 7, 11, 18], f: '1 3 5 7 ♯11', en: 'Lydian major 7th', es: 'Séptima mayor con ♯11', g: 'ext' },
    dom13: { s: '13', j: '13', iv: [0, 4, 7, 10, 14, 21], f: '1 3 5 ♭7 9 13', en: 'Dominant 13th', es: 'Trecena dominante', g: 'ext' },
    maj13: { s: 'maj13', j: 'Δ13', iv: [0, 4, 7, 11, 14, 21], f: '1 3 5 7 9 13', en: 'Major 13th', es: 'Trecena mayor', g: 'ext' },
    m13: { s: 'm13', j: '−13', iv: [0, 3, 7, 10, 14, 21], f: '1 ♭3 5 ♭7 9 13', en: 'Minor 13th', es: 'Menor trecena', g: 'ext' },
    b9: { s: '7♭9', j: '7♭9', iv: [0, 4, 7, 10, 13], f: '1 3 5 ♭7 ♭9', en: 'Seven flat nine', es: 'Séptima con ♭9', g: 'alt' },
    s9: { s: '7♯9', j: '7♯9', iv: [0, 4, 7, 10, 15], f: '1 3 5 ♭7 ♯9', en: 'Seven sharp nine', es: 'Séptima con ♯9', g: 'alt' },
    s11: { s: '7♯11', j: '7♯11', iv: [0, 4, 7, 10, 18], f: '1 3 5 ♭7 ♯11', en: 'Seven sharp eleven', es: 'Séptima con ♯11', g: 'alt' },
    b13: { s: '7♭13', j: '7♭13', iv: [0, 4, 7, 10, 20], f: '1 3 5 ♭7 ♭13', en: 'Seven flat thirteen', es: 'Séptima con ♭13', g: 'alt' },
    b5: { s: '7♭5', j: '7♭5', iv: [0, 4, 6, 10], f: '1 3 ♭5 ♭7', en: 'Seven flat five', es: 'Séptima con ♭5', g: 'alt' },
    alt: { s: '7alt', j: '7alt', iv: [0, 4, 10, 13, 15, 20], f: '1 3 ♭7 ♭9 ♯9 ♭13', en: 'Altered dominant', es: 'Dominante alterado', g: 'alt' },
    thb9: { s: '13♭9', j: '13♭9', iv: [0, 4, 10, 13, 21], f: '1 3 ♭7 ♭9 13', en: 'Thirteen flat nine', es: 'Trecena con ♭9', g: 'alt' }
  };
  const QGROUPS = ['triad', 'six', 'seventh', 'ext', 'alt'];
  const GROUP_NAMES = { en: { triad: 'Triads', six: 'Sixths', seventh: 'Sevenths', ext: 'Extended', alt: 'Altered' }, es: { triad: 'Tríadas', six: 'Sextas', seventh: 'Séptimas', ext: 'Extendidos', alt: 'Alterados' } };
  const DEG_STEPS = { '1': 0, '2': 1, '♭9': 1, '9': 1, '♯9': 1, '♭3': 2, '3': 2, '4': 3, '11': 3, '♯11': 3, '♭5': 4, '5': 4, '♯5': 4, '6': 5, '♭13': 5, '13': 5, '♭7': 6, '7': 6, '𝄫7': 6 };
  const KIND_OF = { maj: 'maj', six: 'maj', six9: 'maj', add9: 'maj', maj7: 'maj7', maj9: 'maj7', maj13: 'maj7', maj7s11: 'maj7', min: 'min', m6: 'min', madd9: 'min', m7: 'm7', m9: 'm7', m11: 'm7', m13: 'm7', mmaj7: 'mmaj7', dim: 'dim', dim7: 'dim7', m7b5: 'hdim' };
  const pcName = (pc, kind) => nm(E.rootSpelling(mod(pc, 12), S.spelling, kind || 'maj'));
  const qSym = (q) => (S.style === 'jazz' ? Q[q].j : Q[q].s);
  const chordSym = (pc, q) => pcName(pc, KIND_OF[q] || 'dom7') + qSym(q);
  function spellTones(pc, q) {
    const rootSp = E.rootSpelling(mod(pc, 12), S.spelling, KIND_OF[q] || 'dom7');
    const degs = Q[q].f.split(' ');
    const ivs = Q[q].iv.filter((i, k, a) => a.indexOf(i) === k && !(i === 12));
    return ivs.map((iv, k) => {
      const step = DEG_STEPS[degs[k]] || 0;
      const letter = (rootSp.letter + step) % 7;
      const acc = mod(mod(pc + iv, 12) - E.LETTER_PC[letter] + 6, 12) - 6;
      return nm({ letter, acc });
    });
  }

  // ================= progressions =================
  const PROGS = {
    classical: [
      { id: 'auth', en: 'Authentic cadence', es: 'Cadencia auténtica', d: 'The classic ending: home, away, tension, home.', des: 'El final clásico: reposo, alejamiento, tensión y reposo.', ch: [[0, 'maj', 'I'], [5, 'maj', 'IV'], [7, 'dom7', 'V7'], [0, 'maj', 'I']] },
      { id: 'canon', en: 'Pachelbel’s Canon', es: 'Canon de Pachelbel', d: 'The Baroque ground bass behind countless songs.', des: 'El bajo ostinato barroco detrás de muchísimas canciones.', ch: [[0, 'maj', 'I'], [7, 'maj', 'V'], [9, 'min', 'vi'], [4, 'min', 'iii'], [5, 'maj', 'IV'], [0, 'maj', 'I'], [5, 'maj', 'IV'], [7, 'maj', 'V']] },
      { id: 'circle', en: 'Circle of fifths', es: 'Círculo de quintas', d: 'Each root falls a fifth: the engine of Baroque sequences.', des: 'Cada fundamental baja una quinta: el motor de las secuencias barrocas.', ch: [[0, 'maj', 'I'], [5, 'maj', 'IV'], [11, 'dim', 'vii°'], [4, 'min', 'iii'], [9, 'min', 'vi'], [2, 'min', 'ii'], [7, 'dom7', 'V7'], [0, 'maj', 'I']] },
      { id: 'mincad', minor: true, en: 'Minor cadence', es: 'Cadencia menor', d: 'Harmonic minor, with the raised leading tone in V7.', des: 'Menor armónica, con la sensible elevada en el V7.', ch: [[0, 'min', 'i'], [5, 'min', 'iv'], [7, 'dom7', 'V7'], [0, 'min', 'i']] },
      { id: 'andal', minor: true, en: 'Andalusian cadence', es: 'Cadencia andaluza', d: 'A falling minor line from Spain, loved by Romantic composers.', des: 'Una línea menor descendente de España, favorita del Romanticismo.', ch: [[0, 'min', 'i'], [10, 'maj', 'VII'], [8, 'maj', 'VI'], [7, 'maj', 'V']] },
      { id: 'folia', minor: true, en: 'La Folia', es: 'La Folía', d: 'A Renaissance dance theme varied by Corelli and Rachmaninoff.', des: 'Tema de danza renacentista variado por Corelli y Rachmaninoff.', ch: [[0, 'min', 'i'], [7, 'maj', 'V'], [0, 'min', 'i'], [10, 'maj', 'VII'], [3, 'maj', 'III'], [10, 'maj', 'VII'], [0, 'min', 'i'], [7, 'maj', 'V']] },
      { id: 'plagal', en: 'Plagal “Amen” cadence', es: 'Cadencia plagal (Amén)', d: 'The soft church ending, IV to I.', des: 'El final suave de iglesia, de IV a I.', ch: [[0, 'maj', 'I'], [5, 'maj', 'IV'], [0, 'maj', 'I']] }
    ],
    jazz: [
      { id: 'iivi', en: 'ii–V–I', es: 'ii–V–I', d: 'The most important progression in jazz.', des: 'La progresión más importante del jazz.', ch: [[2, 'm7', 'ii7'], [7, 'dom7', 'V7'], [0, 'maj7', 'IΔ7']] },
      { id: 'miniivi', minor: true, en: 'Minor ii–V–i', es: 'ii–V–i menor', d: 'Half-diminished ii and a ♭9 dominant resolve to minor.', des: 'ii semidisminuido y dominante con ♭9 que resuelven a menor.', ch: [[2, 'm7b5', 'iiø7'], [7, 'b9', 'V7♭9'], [0, 'm6', 'i6']] },
      { id: 'turn', en: 'I–VI–ii–V turnaround', es: 'Turnaround I–VI–ii–V', d: 'Loops back to the top of a tune.', des: 'Regresa al inicio del tema.', ch: [[0, 'maj7', 'IΔ7'], [9, 'dom7', 'VI7'], [2, 'm7', 'ii7'], [7, 'dom7', 'V7']] },
      { id: 'rhythm', en: 'Rhythm changes (A section)', es: 'Rhythm changes (sección A)', d: 'From Gershwin’s “I Got Rhythm”, used in hundreds of bebop tunes.', des: 'De “I Got Rhythm” de Gershwin, base de cientos de temas bebop.', ch: [[0, 'maj7', 'IΔ7'], [9, 'm7', 'vi7'], [2, 'm7', 'ii7'], [7, 'dom7', 'V7'], [4, 'm7', 'iii7'], [9, 'dom7', 'VI7'], [2, 'm7', 'ii7'], [7, 'dom7', 'V7']] },
      { id: 'tritone', en: 'Tritone substitution', es: 'Sustitución tritonal', d: '♭II7 replaces V7 for a smooth chromatic bass line.', des: '♭II7 reemplaza al V7 para un bajo cromático suave.', ch: [[2, 'm7', 'ii7'], [1, 'dom7', '♭II7'], [0, 'maj7', 'IΔ7']] },
      { id: 'autumn', en: '“Autumn Leaves” cycle', es: 'Ciclo de “Autumn Leaves”', d: 'ii–V–I in major, then ii–V–i in the relative minor.', des: 'ii–V–I en mayor y luego ii–V–i en la relativa menor.', ch: [[2, 'm7', 'ii7'], [7, 'dom7', 'V7'], [0, 'maj7', 'IΔ7'], [5, 'maj7', 'IVΔ7'], [11, 'm7b5', 'viiø7'], [4, 'dom7', 'III7'], [9, 'm7', 'vi7']] },
      { id: 'blues', en: 'Jazz blues', es: 'Blues de jazz', d: 'Twelve bars with a ii–V turnaround at the end.', des: 'Doce compases con un turnaround ii–V al final.', ch: [[0, 'dom7', 'I7'], [5, 'dom7', 'IV7'], [0, 'dom7', 'I7'], [0, 'dom7', 'I7'], [5, 'dom7', 'IV7'], [5, 'dom7', 'IV7'], [0, 'dom7', 'I7'], [9, 'dom7', 'VI7'], [2, 'm7', 'ii7'], [7, 'dom7', 'V7'], [0, 'dom7', 'I7'], [7, 'dom7', 'V7']] }
    ],
    pop: [
      { id: 'axis', en: 'I–V–vi–IV', es: 'I–V–vi–IV', d: 'The “four chords” behind countless hits.', des: 'Los “cuatro acordes” de incontables éxitos.', ch: [[0, 'maj', 'I'], [7, 'maj', 'V'], [9, 'min', 'vi'], [5, 'maj', 'IV']] },
      { id: 'sens', en: 'vi–IV–I–V', es: 'vi–IV–I–V', d: 'The same four chords starting on the minor. More emotional.', des: 'Los mismos cuatro acordes empezando en el menor. Más emotivo.', ch: [[9, 'min', 'vi'], [5, 'maj', 'IV'], [0, 'maj', 'I'], [7, 'maj', 'V']] },
      { id: 'fifties', en: '’50s progression', es: 'Progresión de los 50', d: 'Doo-wop and early rock ’n’ roll ballads.', des: 'Doo-wop y baladas del primer rock and roll.', ch: [[0, 'maj', 'I'], [9, 'min', 'vi'], [5, 'maj', 'IV'], [7, 'maj', 'V']] },
      { id: 'ivv', en: 'I–IV–vi–V', es: 'I–IV–vi–V', d: 'A bright, hopeful loop for choruses.', des: 'Un loop brillante y optimista para coros.', ch: [[0, 'maj', 'I'], [5, 'maj', 'IV'], [9, 'min', 'vi'], [7, 'maj', 'V']] },
      { id: 'royal', en: 'Royal Road', es: 'Royal Road (J-pop)', d: 'IV–V–iii–vi, a favorite of J-pop and anime songs.', des: 'IV–V–iii–vi, favorita del J-pop y del anime.', ch: [[5, 'maj7', 'IVΔ7'], [7, 'dom7', 'V7'], [4, 'm7', 'iii7'], [9, 'min', 'vi']] },
      { id: 'mixo', en: 'Mixolydian rock', es: 'Rock mixolidio', d: 'The ♭VII gives it a classic-rock swagger.', des: 'El ♭VII le da un aire de rock clásico.', ch: [[0, 'maj', 'I'], [10, 'maj', '♭VII'], [5, 'maj', 'IV'], [0, 'maj', 'I']] },
      { id: 'borrow', en: 'Borrowed minor iv', es: 'iv menor prestado', d: 'The IV turns minor for a bittersweet lift.', des: 'El IV se vuelve menor: un giro agridulce.', ch: [[0, 'maj', 'I'], [4, 'maj', 'III'], [5, 'maj', 'IV'], [5, 'min', 'iv']] }
    ],
    salsa: [
      { id: 'montuno', en: 'Montuno I–IV–V–IV', es: 'Montuno I–IV–V–IV', d: 'The classic son and salsa montuno, as in “Guantanamera”.', des: 'El montuno clásico del son y la salsa, como en “Guantanamera”.', ch: [[0, 'maj', 'I'], [5, 'maj', 'IV'], [7, 'dom7', 'V7'], [5, 'maj', 'IV']] },
      { id: 'tondom', en: 'Tonic–dominant vamp', es: 'Tónica–dominante', d: 'The two-chord vamp under a son montuno.', des: 'El vamp de dos acordes del son montuno.', ch: [[0, 'maj', 'I'], [7, 'dom7', 'V7']] },
      { id: 'minmont', minor: true, en: 'Minor montuno', es: 'Montuno menor', d: 'i–iv–V7–i, the backbone of salsa dura.', des: 'i–iv–V7–i, la columna de la salsa dura.', ch: [[0, 'min', 'i'], [5, 'min', 'iv'], [7, 'dom7', 'V7'], [0, 'min', 'i']] },
      { id: 'chacha', minor: true, en: 'Cha-cha vamp', es: 'Vamp de chachachá', d: 'i7–IV9, the groove of “Oye Como Va”.', des: 'i7–IV9, el groove de “Oye Como Va”.', ch: [[0, 'm7', 'i7'], [5, 'dom9', 'IV9']] },
      { id: 'romant', en: 'Salsa romántica', es: 'Salsa romántica', d: 'I–vi–ii–V7 with soft sevenths.', des: 'I–vi–ii–V7 con séptimas suaves.', ch: [[0, 'maj7', 'IΔ7'], [9, 'm7', 'vi7'], [2, 'm7', 'ii7'], [7, 'dom7', 'V7']] },
      { id: 'descarga', minor: true, en: 'Descarga ii–V–i', es: 'Descarga ii–V–i', d: 'iiø7–V7♭9–i, looped for jam sessions.', des: 'iiø7–V7♭9–i, en loop para descargas.', ch: [[2, 'm7b5', 'iiø7'], [7, 'b9', 'V7♭9'], [0, 'm7', 'i7'], [0, 'm7', 'i7']] },
      { id: 'bolero', en: 'Bolero', es: 'Bolero', d: 'IΔ7–ii7–V7–I6 with a slow, romantic sway.', des: 'IΔ7–ii7–V7–I6 con un vaivén lento y romántico.', ch: [[0, 'maj7', 'IΔ7'], [2, 'm7', 'ii7'], [7, 'dom7', 'V7'], [0, 'six', 'I6']] }
    ]
  };
  const PSTYLES = ['classical', 'jazz', 'pop', 'salsa'];
  const findProg = (id) => PSTYLES.flatMap((s) => PROGS[s]).find((p) => p.id === id);

  // left hand: root in the bass; right hand: close voicing that moves as little as possible
  function voiceProg(chords, tonic) {
    let prev = 67;
    return chords.map(([off, q]) => {
      const pc = mod(tonic + off, 12);
      let tones = [...new Set(Q[q].iv.map((i) => i % 12))];
      if (tones.length > 4) tones = tones.filter((t) => t !== 7);
      if (tones.length > 4) tones = tones.filter((t) => t !== 0);
      tones.sort((a, b) => a - b);
      let best = null;
      for (let r = 0; r < tones.length; r++) {
        const order = tones.slice(r).concat(tones.slice(0, r));
        const first = order[0];
        let n = 60 + mod(pc + first - 60, 12);
        const notes = [n];
        for (let k = 1; k < order.length; k++) { let m = 60 + mod(pc + order[k] - 60, 12); while (m <= notes[notes.length - 1]) m += 12; notes.push(m); }
        const avg = notes.reduce((a, b) => a + b, 0) / notes.length;
        const score = Math.abs(avg - prev) + (notes[notes.length - 1] > 79 ? 6 : 0);
        if (!best || score < best.score) best = { notes, score, avg };
      }
      prev = best.avg;
      return { lh: [36 + pc], rh: best.notes };
    });
  }

  let progTimer = 0, progHeld = [], playing = null;
  const releaseAll = (list) => list.forEach((n) => noteOff(n));
  function stopProg() {
    clearTimeout(progTimer); progTimer = 0;
    releaseAll(progHeld); progHeld = [];
    playing = null; markPlaying();
  }
  function playProg(id, startIdx, single) {
    stopProg(); stopLib();
    const p = findProg(id); if (!p) return;
    const v = voiceProg(p.ch, S.progKey);
    playing = { id, i: startIdx || 0, single };
    const step = () => {
      releaseAll(progHeld);
      const c = v[playing.i];
      progHeld = [...c.lh, ...c.rh];
      progHeld.forEach((n, j) => noteOn(n, j === 0 ? 92 : 76, 'prog'));
      markPlaying();
      const dur = single ? 1500 : (4 * 60000) / S.bpm;
      progTimer = setTimeout(() => {
        if (!playing) return;
        if (single) { stopProg(); return; }
        playing.i++;
        if (playing.i >= v.length) { if (S.loop) playing.i = 0; else { stopProg(); return; } }
        step();
      }, dur);
    };
    step();
  }
  function markPlaying() {
    document.querySelectorAll('.prog').forEach((el) => el.classList.toggle('playing', !!playing && !playing.single && el.dataset.id === playing.id));
    document.querySelectorAll('.pchip').forEach((el) => el.classList.toggle('now', !!playing && el.dataset.id === playing.id && +el.dataset.i === playing.i));
    document.querySelectorAll('.prog .play').forEach((b) => { const on = !!playing && !playing.single && b.dataset.id === playing.id; b.textContent = on ? t('stop') : t('play'); b.setAttribute('aria-pressed', String(on)); });
  }

  function renderProgs() {
    document.querySelectorAll('#progStyles button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.style === S.progStyle)));
    const grid = $('progGrid'); grid.innerHTML = '';
    PROGS[S.progStyle].forEach((p) => {
      const card = document.createElement('article'); card.className = 'prog'; card.dataset.id = p.id;
      const keyName = pcName(S.progKey, p.minor ? 'min' : 'maj') + (p.minor ? 'm' : '');
      card.innerHTML = '<header><h3></h3><span class="pkey"></span><button type="button" class="btn play"></button></header><p></p><div class="pchips"></div>';
      card.querySelector('h3').textContent = p[S.lang] || p.en;
      card.querySelector('.pkey').textContent = keyName;
      card.querySelector('p').textContent = S.lang === 'es' ? p.des : p.d;
      const play = card.querySelector('.play'); play.dataset.id = p.id; play.textContent = t('play');
      play.addEventListener('click', () => { if (playing && playing.id === p.id && !playing.single) stopProg(); else playProg(p.id, 0, false); });
      const chips = card.querySelector('.pchips');
      p.ch.forEach(([off, q, rn], i) => {
        const b = document.createElement('button'); b.type = 'button'; b.className = 'pchip'; b.dataset.id = p.id; b.dataset.i = i;
        b.innerHTML = '<b></b><small></small>';
        b.querySelector('b').textContent = chordSym(S.progKey + off, q);
        b.querySelector('small').textContent = rn;
        b.addEventListener('click', () => playProg(p.id, i, true));
        chips.appendChild(b);
      });
      grid.appendChild(card);
    });
    markPlaying();
  }

  // ================= chord library =================
  let libHeld = [], libTimers = [];
  function stopLib() { libTimers.forEach(clearTimeout); libTimers = []; releaseAll(libHeld); libHeld = []; }
  function libNotes() {
    const q = Q[S.libQ]; const r = 60 + S.libRoot - (S.libRoot > 6 ? 12 : 0);
    const ivs = q.iv;
    if (ivs.length <= 4) {
      const notes = ivs.map((i) => r + i);
      const inv = S.libInv % notes.length;
      for (let k = 0; k < inv; k++) notes.push(notes.shift() + 12);
      return notes;
    }
    return [r - 12, ...ivs.slice(1).map((i) => r + i)];
  }
  function libPlay(arp) {
    stopProg(); stopLib();
    const notes = libNotes(); libHeld = notes.slice();
    if (arp) notes.forEach((n, i) => libTimers.push(setTimeout(() => noteOn(n, 82, 'lib'), i * 160)));
    else notes.forEach((n) => noteOn(n, 84, 'lib'));
    libTimers.push(setTimeout(stopLib, arp ? notes.length * 160 + 1300 : 1700));
  }
  function renderLib() {
    const roots = $('libRoots'); roots.innerHTML = '';
    for (let pc = 0; pc < 12; pc++) {
      const b = document.createElement('button'); b.type = 'button'; b.textContent = pcName(pc, KIND_OF[S.libQ]);
      b.setAttribute('aria-pressed', String(pc === S.libRoot));
      b.addEventListener('click', () => { S.libRoot = pc; save(); renderLib(); libPlay(false); });
      roots.appendChild(b);
    }
    const types = $('libTypes'); types.innerHTML = '';
    QGROUPS.forEach((g) => {
      const wrap = document.createElement('div'); wrap.className = 'lib-group';
      const h = document.createElement('h4'); h.textContent = GROUP_NAMES[S.lang][g]; wrap.appendChild(h);
      const row = document.createElement('div');
      Object.keys(Q).filter((k) => Q[k].g === g).forEach((k) => {
        const b = document.createElement('button'); b.type = 'button'; b.textContent = pcName(S.libRoot, KIND_OF[k]) + qSym(k);
        b.title = Q[k][S.lang];
        b.setAttribute('aria-pressed', String(k === S.libQ));
        b.addEventListener('click', () => { S.libQ = k; S.libInv = 0; save(); renderLib(); libPlay(false); });
        row.appendChild(b);
      });
      wrap.appendChild(row); types.appendChild(wrap);
    });
    const q = Q[S.libQ];
    const d = $('libDetail'); d.innerHTML = '';
    const name = document.createElement('div'); name.className = 'lib-name'; name.textContent = chordSym(S.libRoot, S.libQ);
    const full = document.createElement('div'); full.className = 'lib-full'; full.textContent = pcName(S.libRoot, KIND_OF[S.libQ]) + ' · ' + q[S.lang];
    const kv = document.createElement('dl'); kv.className = 'kv';
    [[t('formula'), q.f], [t('notesLbl'), spellTones(S.libRoot, S.libQ).join('  ')]].forEach(([k, v]) => { const dt = document.createElement('dt'); dt.textContent = k; const dd = document.createElement('dd'); dd.textContent = v; kv.append(dt, dd); });
    d.append(name, full, kv);
    const uniq = [...new Set(q.iv)].length;
    if (q.iv.length <= 4 && uniq >= 3) {
      const seg = document.createElement('div'); seg.className = 'seg inv';
      t('invNames').slice(0, q.iv.length).forEach((lbl, i) => {
        const b = document.createElement('button'); b.type = 'button'; b.textContent = lbl; b.setAttribute('aria-pressed', String(i === S.libInv % q.iv.length));
        b.addEventListener('click', () => { S.libInv = i; save(); renderLib(); libPlay(false); });
        seg.appendChild(b);
      });
      d.appendChild(seg);
    }
    const row = document.createElement('div'); row.className = 'row';
    const p1 = document.createElement('button'); p1.type = 'button'; p1.className = 'btn primary'; p1.textContent = t('playChord'); p1.addEventListener('click', () => libPlay(false));
    const p2 = document.createElement('button'); p2.type = 'button'; p2.className = 'btn'; p2.textContent = t('arpeggio'); p2.addEventListener('click', () => libPlay(true));
    row.append(p1, p2); d.appendChild(row);
    document.querySelectorAll('#libInsts button').forEach((bt) => bt.setAttribute('aria-pressed', String(bt.dataset.inst === S.libInst)));
    $('libPdf').hidden = S.libInst === 'piano';
    const sh = $('libShapes'); sh.innerHTML = ''; sh.hidden = S.libInst === 'piano';
    if (S.libInst !== 'piano') {
      const shapes = frettedShapes(S.libRoot, q.iv.filter((i) => i < 24), S.libInst, 6);
      const h = document.createElement('h4'); h.textContent = t('shapesLbl'); sh.appendChild(h);
      const wrap = document.createElement('div'); wrap.className = 'shape-row';
      shapes.forEach((s) => {
        const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'shape';
        btn.innerHTML = diagramSVG(s, S.libInst, { rootPc: S.libRoot, label: chordSym(S.libRoot, S.libQ) });
        const cap = document.createElement('small'); cap.textContent = s.base <= 1 ? t('openWord') : s.base + ' ' + t('fretWord'); btn.appendChild(cap);
        btn.addEventListener('click', () => strum(shapeMidi(s, S.libInst)));
        wrap.appendChild(btn);
      });
      sh.appendChild(wrap);
      p1.onclick = null; p1.addEventListener('click', (ev) => { ev.stopImmediatePropagation(); if (shapes[0]) strum(shapeMidi(shapes[0], S.libInst)); }, true);
    }
  }

  // ================= fretted chord shapes (guitar, ukulele) =================
  const TUNINGS = {
    guitar: { notes: [40, 45, 50, 55, 59, 64], names: ['E', 'A', 'D', 'G', 'B', 'E'], bassRoot: true, mute: true },
    ukulele: { notes: [67, 60, 64, 69], names: ['G', 'C', 'E', 'A'], bassRoot: false, mute: false }
  };
  const shapeCache = new Map();
  function frettedShapes(rootPc, ivs, inst, max = 6) {
    const key = inst + rootPc + ':' + ivs.join(',');
    if (shapeCache.has(key)) return shapeCache.get(key);
    const T = TUNINGS[inst], ns = T.notes.length;
    const pcs = [...new Set(ivs.map((i) => mod(rootPc + i, 12)))];
    const rel = (pc) => mod(pc - rootPc, 12);
    // which tones may be left out when there are more tones than fingers/strings
    let required = pcs.slice();
    const drop = (r) => { if (required.length > (inst === 'ukulele' ? 4 : 4)) required = required.filter((pc) => rel(pc) !== r); };
    drop(7); drop(2); drop(5); if (inst === 'ukulele') drop(0);
    const out = [];
    for (let start = 0; start <= 12; start++) {
      const lo = start === 0 ? 1 : start, hi = lo + 3;
      const opts = T.notes.map((open) => {
        const o = []; if (T.mute) o.push(-1);
        if (pcs.includes(mod(open, 12))) o.push(0);
        for (let f = lo; f <= hi; f++) if (pcs.includes(mod(open + f, 12))) o.push(f);
        return o;
      });
      const cur = new Array(ns);
      (function rec(i) {
        if (i === ns) { evaluate(cur.slice(), start); return; }
        for (const v of opts[i]) { cur[i] = v; rec(i + 1); }
      })(0);
    }
    function evaluate(frets, start) {
      const sounding = frets.map((f, i) => f >= 0 ? i : -1).filter((i) => i >= 0);
      if (sounding.length < Math.min(ns, inst === 'ukulele' ? 4 : 4)) return;
      // mutes only at the low end, plus at most one inside
      let inner = 0; for (let i = sounding[0]; i < ns; i++) if (frets[i] < 0) inner++;
      if (inner > 1) return;
      const have = new Set(sounding.map((i) => mod(T.notes[i] + frets[i], 12)));
      if (!required.every((pc) => have.has(pc))) return;
      const bassPc = mod(T.notes[sounding[0]] + frets[sounding[0]], 12);
      if (T.bassRoot && bassPc !== rootPc) return;
      const fretted = sounding.filter((i) => frets[i] > 0);
      const fmin = fretted.length ? Math.min(...fretted.map((i) => frets[i])) : 0, fmax = fretted.length ? Math.max(...fretted.map((i) => frets[i])) : 0;
      if (fmax - fmin > 3) return;
      // fingers: a barre with the index finger when the lowest fret repeats
      const atMin = fretted.filter((i) => frets[i] === fmin);
      let barre = null;
      if (atMin.length >= 2) {
        const from = atMin[0], ok = sounding.filter((i) => i >= from).every((i) => frets[i] >= fmin);
        if (ok) barre = { fret: fmin, from, to: sounding[sounding.length - 1] };
      }
      const fingers = new Array(ns).fill(0);
      let order = fretted.slice();
      let next = 1;
      if (barre) { order.forEach((i) => { if (frets[i] === fmin && i >= barre.from) fingers[i] = 1; }); order = order.filter((i) => !fingers[i]); next = 2; }
      order.sort((a, b) => frets[a] - frets[b] || a - b);
      // three or more notes on one fret on neighbouring strings: one finger lays flat across them
      const byFret = new Map(); order.forEach((i) => byFret.set(frets[i], (byFret.get(frets[i]) || []).concat(i)));
      const groups = [];
      [...byFret.keys()].sort((a, b) => a - b).forEach((f) => {
        const g = byFret.get(f);
        const adjacent = g.length >= 3 && g[g.length - 1] - g[0] === g.length - 1;
        if (adjacent) groups.push(g); else g.forEach((i) => groups.push([i]));
      });
      let prevF = barre ? 1 : 0;
      for (let gi = 0; gi < groups.length; gi++) {
        const g = groups[gi], left = groups.length - gi - 1;
        const want = frets[g[0]] - fmin + 1;
        const f = Math.max(prevF + 1, Math.min(4 - left, want));
        g.forEach((i) => { fingers[i] = f; }); prevF = f;
      }
      if (fingers.some((f) => f > 4)) return;
      let sc = sounding.length * 2.2 - (fmin || 0) * 0.32 - inner * 2.5 - (fmax - fmin) * 0.6 - fretted.length * 0.25;
      sc += frets.filter((f) => f === 0).length * (fmin <= 3 ? 0.9 : -0.5);
      if (have.has(mod(rootPc + 7, 12))) sc += 0.6;
      const dupThird = sounding.filter((i) => [3, 4].includes(rel(mod(T.notes[i] + frets[i], 12)))).length; if (dupThird > 2) sc -= 1.2;
      if (fretted.length) { const a = fretted[0], b = fretted[fretted.length - 1]; sounding.forEach((si) => { if (si > a && si < b && frets[si] === 0) { const r = rel(mod(T.notes[si], 12)); if (fmax > 3 || (r !== 7 && r !== 0)) sc -= 2.6; } }); }
      if (barre) sc -= 0.4;
      const base = fmax <= 4 ? 1 : fmin;
      out.push({ frets, fingers, barre, base, score: sc, key: frets.join(',') });
    }
    const seen = new Set(), perBase = new Map(), res = [];
    out.sort((a, b) => b.score - a.score);
    for (const s of out) {
      if (seen.has(s.key)) continue; seen.add(s.key);
      const bucket = Math.floor(s.base / 3);
      if ((perBase.get(bucket) || 0) >= 1 && res.length < max - 1) continue;
      perBase.set(bucket, (perBase.get(bucket) || 0) + 1);
      res.push(s); if (res.length >= max) break;
    }
    res.sort((a, b) => a.base - b.base);
    shapeCache.set(key, res);
    return res;
  }
  const shapeMidi = (s, inst) => s.frets.map((f, i) => f >= 0 ? TUNINGS[inst].notes[i] + f : null).filter((n) => n != null);

  function diagramSVG(s, inst, opts = {}) {
    const T = TUNINGS[inst], ns = T.notes.length;
    const W = opts.w || 124, H = opts.h || 150, padL = 28, padR = 12, top = 30, rows = 5;
    const gx = (W - padL - padR) / (ns - 1), gy = (H - top - 20) / rows;
    const showBase = s.base > 1;
    let svg = `<svg viewBox="0 0 ${W} ${H}" class="cbox" role="img" aria-label="${opts.label || ''}">`;
    svg += `<rect x="${padL}" y="${top}" width="${gx * (ns - 1)}" height="${gy * rows}" fill="var(--panel)"/>`;
    for (let r = 0; r <= rows; r++) svg += `<line x1="${padL}" x2="${padL + gx * (ns - 1)}" y1="${top + r * gy}" y2="${top + r * gy}" stroke="var(--muted)" stroke-width="${r === 0 && !showBase ? 5 : 1}"/>`;
    for (let i = 0; i < ns; i++) svg += `<line x1="${padL + i * gx}" x2="${padL + i * gx}" y1="${top}" y2="${top + rows * gy}" stroke="var(--muted)" stroke-width="1.2"/>`;
    if (showBase) svg += `<text x="${padL - 11}" y="${top + gy * 0.62}" text-anchor="end" font-size="11" font-family="var(--font-mono)" fill="var(--fg)">${s.base}</text>`;
    if (s.barre) {
      const y = top + (s.barre.fret - s.base + 0.5) * gy;
      svg += `<rect x="${padL + s.barre.from * gx - 7}" y="${y - 7}" width="${(s.barre.to - s.barre.from) * gx + 14}" height="14" rx="7" fill="var(--fg)"/>`;
    }
    s.frets.forEach((f, i) => {
      const x = padL + i * gx;
      if (f < 0) svg += `<text x="${x}" y="${top - 9}" text-anchor="middle" font-size="12" font-weight="700" fill="var(--muted)">×</text>`;
      else if (f === 0) svg += `<circle cx="${x}" cy="${top - 13}" r="4.2" fill="none" stroke="var(--fg)" stroke-width="1.5"/>`;
      else {
        const y = top + (f - s.base + 0.5) * gy;
        const isRoot = mod(T.notes[i] + f, 12) === opts.rootPc;
        const inBarre = s.barre && f === s.barre.fret && i >= s.barre.from && s.fingers[i] === 1;
        if (!inBarre) svg += `<circle cx="${x}" cy="${y}" r="7.5" fill="${isRoot ? 'var(--root)' : 'var(--fg)'}"/>`;
        if (s.fingers[i] && !inBarre) svg += `<text x="${x}" y="${y + 3.6}" text-anchor="middle" font-size="10" font-weight="700" fill="var(--bg)">${s.fingers[i]}</text>`;
      }
    });
    T.names.forEach((n, i) => { svg += `<text x="${padL + i * gx}" y="${H - 4}" text-anchor="middle" font-size="9.5" font-family="var(--font-mono)" fill="var(--muted)">${S.solfege ? E.SOLFEGE[n] : n}</text>`; });
    return svg + '</svg>';
  }

  // ================= files: PDF and download =================
  async function saveFile(name, blob) {
    try {
      const d = window.claude && window.claude.use ? await window.claude.use('downloads') : null;
      if (d) { await d.save({ filename: name, data: blob }); return true; }
    } catch (e) { if (e && e.code === 'declined') return false; }
    try { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 2000); return true; } catch (e) { return false; }
  }
  // draw a chord box straight into a jsPDF document (vector, crisp when printed)
  function pdfDiagram(doc, s, inst, x, y, w, title, rootPc) {
    const T = TUNINGS[inst], ns = T.notes.length, rows = 5, gx = w / (ns - 1), gy = w * 0.24;
    doc.setFont('helvetica', 'bold'); doc.setFontSize(12); doc.setTextColor(20); doc.text(title, x + w / 2, y, { align: 'center' });
    const top = y + 10;
    doc.setDrawColor(90); doc.setLineWidth(0.6);
    for (let r = 0; r <= rows; r++) { doc.setLineWidth(r === 0 && s.base <= 1 ? 2.2 : 0.6); doc.line(x, top + r * gy, x + gx * (ns - 1), top + r * gy); }
    doc.setLineWidth(0.6);
    for (let i = 0; i < ns; i++) doc.line(x + i * gx, top, x + i * gx, top + rows * gy);
    doc.setFontSize(7.5); doc.setFont('helvetica', 'normal');
    if (s.base > 1) doc.text(String(s.base) + 'fr', x - 3, top + gy * 0.7, { align: 'right' });
    if (s.barre) { const yy = top + (s.barre.fret - s.base + 0.5) * gy; doc.setFillColor(20); doc.roundedRect(x + s.barre.from * gx - 3.2, yy - 3.2, (s.barre.to - s.barre.from) * gx + 6.4, 6.4, 3.2, 3.2, 'F'); }
    s.frets.forEach((f, i) => {
      const cx = x + i * gx;
      if (f < 0) { doc.setTextColor(110); doc.text('x', cx, top - 3, { align: 'center' }); }
      else if (f === 0) { doc.setDrawColor(20); doc.circle(cx, top - 4.2, 1.9, 'S'); }
      else {
        const cy = top + (f - s.base + 0.5) * gy;
        const inBarre = s.barre && f === s.barre.fret && i >= s.barre.from && s.fingers[i] === 1;
        if (!inBarre) {
          const isRoot = mod(T.notes[i] + f, 12) === rootPc;
          if (isRoot) doc.setFillColor(216, 52, 74); else doc.setFillColor(20);
          doc.circle(cx, cy, 3.3, 'F');
          doc.setTextColor(255); doc.setFontSize(6.5); doc.text(String(s.fingers[i] || ''), cx, cy + 2.2, { align: 'center' }); doc.setFontSize(7.5);
        }
      }
    });
    doc.setTextColor(110);
    T.names.forEach((n, i) => doc.text(n, x + i * gx, top + rows * gy + 8, { align: 'center' }));
    doc.setTextColor(20);
    return top + rows * gy + 12;
  }
  const pdfName = (s) => s.replace(/♯/g, '#').replace(/♭/g, 'b').replace(/Δ/g, 'maj').replace(/[−]/g, 'm').replace(/[ø]/g, 'm7b5').replace(/[°]/g, 'dim').replace(/𝄫/g, 'bb');
  async function libraryPdf() {
    if (!window.jspdf) { alertMsg(t('pdfMissing')); return; }
    const inst = S.libInst === 'ukulele' ? 'ukulele' : 'guitar';
    const doc = new window.jspdf.jsPDF({ unit: 'pt', format: 'letter' });
    const rootName = pdfName(pcName(S.libRoot, 'maj'));
    doc.setFont('helvetica', 'bold'); doc.setFontSize(22); doc.text(rootName + ' chords · ' + (inst === 'guitar' ? 'Guitar' : 'Ukulele'), 40, 54);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(10); doc.setTextColor(110); doc.text('Acorde chord dictionary · red dot = root · numbers = fingers', 40, 72); doc.setTextColor(20);
    const cols = 5, cw = 64, gapX = (612 - 80 - cols * cw) / (cols - 1);
    let col = 0, y = 110, rowH = 0;
    for (const g of QGROUPS) for (const k of Object.keys(Q).filter((q) => Q[q].g === g)) {
      const shapes = frettedShapes(S.libRoot, Q[k].iv.filter((i) => i < 24), inst, 1); if (!shapes.length) continue;
      const x = 40 + col * (cw + gapX);
      const yEnd = pdfDiagram(doc, shapes[0], inst, x, y, cw, pdfName(chordSym(S.libRoot, k)), S.libRoot);
      rowH = Math.max(rowH, yEnd - y);
      col++; if (col === cols) { col = 0; y += rowH + 18; rowH = 0; if (y > 700) { doc.addPage(); y = 60; } }
    }
    await saveFile('Acorde ' + rootName + ' ' + inst + ' chords.pdf', doc.output('blob'));
  }
  function alertMsg(msg) { const n = $('midiNotice'); n.textContent = msg; n.hidden = false; setTimeout(() => { n.hidden = true; }, 5000); }

  // strum a fretted shape on the piano and through the speaker
  let strumTimers = [];
  function strum(notes) {
    stopProg(); stopLib(); strumTimers.forEach(clearTimeout); strumTimers = [];
    const sorted = [...notes].sort((a, b) => a - b);
    libHeld = sorted.slice();
    sorted.forEach((n, i) => strumTimers.push(setTimeout(() => noteOn(n, 80, 'lib'), i * 45)));
    strumTimers.push(setTimeout(() => { releaseAll(sorted); libHeld = []; }, sorted.length * 45 + 1600));
  }

  // ================= tabs =================
  function applyTab() {
    ['prog', 'lib', 'song', 'hist'].forEach((k) => {
      const tab = document.querySelector('[data-tab="' + k + '"]');
      tab.setAttribute('aria-selected', String(S.tab === k));
      $('panel' + k[0].toUpperCase() + k.slice(1)).hidden = S.tab !== k;
    });
  }
  document.querySelectorAll('[data-tab]').forEach((b) => b.addEventListener('click', () => { S.tab = b.dataset.tab; save(); applyTab(); }));
  document.querySelectorAll('#progStyles button').forEach((b) => b.addEventListener('click', () => { stopProg(); S.progStyle = b.dataset.style; save(); renderProgs(); }));
  (function setupProgControls() {
    const sel = $('progKey');
    const fill = () => { sel.innerHTML = ''; for (let pc = 0; pc < 12; pc++) { const o = document.createElement('option'); o.value = pc; o.textContent = pcName(pc, 'maj'); sel.appendChild(o); } sel.value = S.progKey; };
    fill(); window.__fillProgKey = fill;
    sel.addEventListener('change', () => { stopProg(); S.progKey = +sel.value; save(); renderProgs(); });
    const bpm = $('bpm'); bpm.value = S.bpm; $('bpmVal').textContent = S.bpm;
    bpm.addEventListener('input', () => { S.bpm = +bpm.value; $('bpmVal').textContent = S.bpm; save(); });
    const loop = $('loop'); loop.checked = !!S.loop; loop.addEventListener('change', () => { S.loop = loop.checked; save(); });
  })();

  // ================= song analysis tab =================
  const song = { name: '', res: null, audio: null, url: '', ctx: null, buf: null, src: null, startAt: 0, offset: 0, playing: false, useWA: false,
    beatIdx: -1, chordKey: '', held: [], loopA: -1, loopB: -1, anchor: -1, raf: 0 };
  const SQ = { maj: 'maj', min: 'min', dom7: 'dom7', maj7: 'maj7', m7: 'm7', dim: 'dim', sus4: 'sus4' };
  function keyPrefersSharps(pc, minor) { const maj = minor ? mod(pc + 3, 12) : pc; return [7, 2, 9, 4, 11, 6].includes(maj); }
  function songChordName(c, shift) {
    if (!c || c.root < 0) return 'N.C.';
    const pc = mod(c.root + (shift || 0), 12);
    const k = song.res.key, pref = S.spelling !== 'auto' ? S.spelling : (keyPrefersSharps(mod(k.pc + S.songTrans, 12), k.minor) ? 'sharp' : 'flat');
    return nm(E.rootSpelling(pc, pref, KIND_OF[c.q] || 'dom7')) + qSym(SQ[c.q] || 'maj');
  }
  const keyName = () => { const k = song.res.key, pc = mod(k.pc + S.songTrans, 12); return nm(E.rootSpelling(pc, keyPrefersSharps(pc, k.minor) ? 'sharp' : 'flat', k.minor ? 'min' : 'maj')) + (k.minor ? (S.lang === 'es' ? ' menor' : ' minor') : (S.lang === 'es' ? ' mayor' : ' major')); };
  const fmtTime = (s) => { s = Math.max(0, s || 0); const m = Math.floor(s / 60), r = Math.floor(s % 60); return m + ':' + String(r).padStart(2, '0'); };

  function setSongStatus(text, pct) {
    $('songStatus').hidden = !text; $('songStatusText').textContent = text || '';
    $('songBar').style.width = Math.round((pct || 0) * 100) + '%';
  }
  async function loadSongFile(file) {
    if (!file) return;
    stopSong(); releaseSongChord();
    song.name = file.name.replace(/\.[^.]+$/, '');
    setSongStatus(t('songDecoding'), 0.02);
    $('songResult').hidden = true; $('songDrop').classList.add('busy');
    try {
      const ab = await file.arrayBuffer();
      if (!song.ctx) song.ctx = new (window.AudioContext || window.webkitAudioContext)();
      const buf = await song.ctx.decodeAudioData(ab.slice(0));
      song.buf = buf;
      // mono 22050 Hz for analysis
      const len = Math.ceil(buf.duration * 22050);
      const off = new OfflineAudioContext(1, len, 22050);
      const s = off.createBufferSource(); s.buffer = buf; s.connect(off.destination); s.start();
      const mono = (await off.startRendering()).getChannelData(0);
      setSongStatus(t('songAnalyzing'), 0.05);
      const res = await runAnalyzer(mono, 22050, (p) => setSongStatus(t('songAnalyzing'), p));
      song.res = res; song.loopA = song.loopB = -1;
      // playback through an <audio> element keeps pitch when slowed down; Web Audio is the fallback
      if (song.url) URL.revokeObjectURL(song.url);
      song.url = URL.createObjectURL(file);
      song.audio = new Audio(); song.audio.preload = 'auto';
      try { song.audio.preservesPitch = true; song.audio.mozPreservesPitch = true; song.audio.webkitPreservesPitch = true; } catch (e) {}
      song.useWA = false;
      song.audio.addEventListener('error', () => { song.useWA = true; }, { once: true });
      song.audio.src = song.url;
      song.audio.addEventListener('ended', () => { song.playing = false; updatePlayBtn(); });
      setSongStatus('', 1);
      prepLyricsForSong();
      renderSong();
    } catch (e) {
      setSongStatus(t('songError'), 0);
    } finally { $('songDrop').classList.remove('busy'); }
  }
  function runAnalyzer(x, sr, onProgress) {
    return new Promise((resolve, reject) => {
      const src = document.getElementById('analyzerSrc').textContent;
      let w = null;
      try { w = new Worker(URL.createObjectURL(new Blob([src], { type: 'text/javascript' }))); } catch (e) { w = null; }
      if (!w) {
        try { const fn = new Function(src + '; return acordeAnalyze;')(); setTimeout(() => { try { resolve(fn(x, sr, onProgress)); } catch (err) { reject(err); } }, 30); } catch (e) { reject(e); }
        return;
      }
      w.onmessage = (e) => {
        if (e.data.progress != null) onProgress(0.05 + 0.93 * e.data.progress);
        if (e.data.result) { resolve(e.data.result); w.terminate(); }
        if (e.data.error) { reject(new Error(e.data.error)); w.terminate(); }
      };
      w.onerror = (e) => { reject(e); w.terminate(); };
      w.postMessage({ x, sr });
    });
  }

  // ---------- playback ----------
  function curTime() {
    if (!song.res) return 0;
    if (!song.useWA && song.audio) return song.audio.currentTime;
    return song.playing ? song.offset + (song.ctx.currentTime - song.startAt) * S.songSpeed : song.offset;
  }
  function playSong() {
    if (!song.res) return;
    if (!song.useWA && song.audio) {
      song.audio.playbackRate = S.songSpeed;
      song.audio.play().then(() => { song.playing = true; updatePlayBtn(); tick(); }).catch(() => { song.useWA = true; playSong(); });
      return;
    }
    if (song.ctx.state === 'suspended') song.ctx.resume();
    song.src = song.ctx.createBufferSource(); song.src.buffer = song.buf; song.src.playbackRate.value = S.songSpeed;
    song.src.connect(song.ctx.destination);
    song.startAt = song.ctx.currentTime; song.src.start(0, song.offset);
    song.src.onended = () => { if (song.playing && curTime() >= song.res.duration - 0.05) { song.playing = false; song.offset = 0; updatePlayBtn(); } };
    song.playing = true; updatePlayBtn(); tick();
  }
  function pauseSong() {
    if (!song.res) return;
    if (!song.useWA && song.audio) song.audio.pause();
    else if (song.src) { song.offset = curTime(); try { song.src.onended = null; song.src.stop(); } catch (e) {} song.src = null; }
    song.playing = false; updatePlayBtn(); releaseSongChord();
  }
  function stopSong() { if (song.playing) pauseSong(); cancelAnimationFrame(song.raf); }
  function seekSong(t) {
    if (!song.res) return;
    t = Math.max(0, Math.min(song.res.duration - 0.05, t));
    if (!song.useWA && song.audio) song.audio.currentTime = t;
    else { const was = song.playing; if (was) { try { song.src.onended = null; song.src.stop(); } catch (e) {} } song.offset = t; if (was) { song.playing = false; playSong(); } }
    song.chordKey = ''; updateSongPos(true);
  }
  function updatePlayBtn() { $('songPlay').textContent = song.playing ? t('pause') : t('play'); $('songPlay').setAttribute('aria-pressed', String(song.playing)); }
  function beatAt(time) {
    const b = song.res.beats; let lo = 0, hi = b.length - 1;
    if (time < b[0]) return -1;
    while (lo < hi) { const m = (lo + hi + 1) >> 1; if (b[m] <= time) lo = m; else hi = m - 1; }
    return Math.min(lo, song.res.chords.length - 1);
  }
  function tick() {
    cancelAnimationFrame(song.raf);
    const step = () => {
      if (!song.playing) return;
      const t0 = curTime();
      // loop the selected bars
      if (song.loopA >= 0 && song.loopB >= song.loopA) {
        const endT = song.res.beats[Math.min(song.res.beats.length - 1, song.loopB + 1)], startT = song.res.beats[song.loopA];
        if (S.songLoop && t0 >= endT - 0.02) { seekSong(startT); }
      }
      updateSongPos(false);
      song.raf = requestAnimationFrame(step);
    };
    song.raf = requestAnimationFrame(step);
  }
  // voicing to light the piano: root in the bass, chord tones above middle C
  function songVoicing(c) {
    const pc = mod(c.root + S.songTrans, 12), iv = Q[SQ[c.q] || 'maj'].iv;
    const rh = iv.map((i) => 60 + mod(pc + i - 0, 12)).sort((a, b) => a - b);
    for (let i = 1; i < rh.length; i++) while (rh[i] <= rh[i - 1]) rh[i] += 12;
    return [36 + pc, ...rh];
  }
  function releaseSongChord() { song.held.forEach((n) => noteOff(n)); song.held = []; }
  function updateSongPos(force) {
    if (!song.res) return;
    const time = curTime(), bi = beatAt(time);
    $('songTime').textContent = fmtTime(time) + ' / ' + fmtTime(song.res.duration);
    $('songSeek').value = String(Math.round(1000 * time / song.res.duration));
    if (bi !== song.beatIdx || force) {
      const old = document.querySelector('.beat.now'); if (old) old.classList.remove('now');
      const cell = document.querySelector('.beat[data-b="' + bi + '"]');
      if (cell) {
        cell.classList.add('now');
        const bar = cell.parentElement;
        document.querySelectorAll('.sbar.now').forEach((e) => { if (e !== bar) e.classList.remove('now'); }); bar.classList.add('now');
        if (song.playing && S.songFollow) { const grid = $('songGrid'); const r = bar.getBoundingClientRect(), g = grid.getBoundingClientRect(); if (r.top < g.top || r.bottom > g.bottom) grid.scrollTop += r.top - g.top - 40; }
      }
      song.beatIdx = bi;
      const c = bi >= 0 ? song.res.chords[bi] : null;
      // next different chord
      let nx = null; for (let j = bi + 1; j < song.res.chords.length; j++) { const d = song.res.chords[j]; if (!c || d.root !== c.root || d.q !== c.q) { nx = d; break; } }
      const key = c ? c.root + c.q + S.songTrans : 'none';
      if (key !== song.chordKey) {
        song.chordKey = key;
        $('songNow').textContent = c ? songChordName(c, S.songTrans) : '–';
        $('songNext').textContent = nx ? songChordName(nx, S.songTrans) : '';
        drawSongDiagram(c);
        releaseSongChord();
        if (c && c.root >= 0 && song.playing && S.songPiano) { song.held = songVoicing(c); song.held.forEach((n, i) => noteOn(n, i ? 70 : 85, 'song')); }
      }
    }
  }
  function drawSongDiagram(c) {
    const el = $('songDiagram');
    if (!c || c.root < 0) { el.innerHTML = ''; $('songCapoNote').textContent = ''; return; }
    const shapePc = mod(c.root + S.songTrans - S.songCapo, 12);
    const iv = Q[SQ[c.q] || 'maj'].iv;
    const shapes = frettedShapes(shapePc, iv, 'guitar', 3);
    el.innerHTML = shapes.length ? diagramSVG(shapes[0], 'guitar', { rootPc: shapePc, w: 130, h: 160 }) : '';
    $('songCapoNote').textContent = S.songCapo ? (S.lang === 'es' ? `Cejilla ${S.songCapo}: forma de ` : `Capo ${S.songCapo}: play `) + songChordName({ root: mod(c.root - S.songCapo, 12), q: c.q }, S.songTrans) + (S.lang === 'es' ? '' : ' shape') : '';
  }

  // ---------- chord grid ----------
  function renderSong() {
    const r = song.res; if (!r) { $('songResult').hidden = true; return; }
    $('songResult').hidden = false; $('songDrop').classList.add('compact');
    $('songTitle').textContent = song.name;
    $('songKey').textContent = keyName();
    $('songBpm').textContent = Math.round(r.bpm);
    $('songLen').textContent = fmtTime(r.duration);
    $('songTune').textContent = (r.tuning >= 0 ? '+' : '') + Math.round(r.tuning * 100) + '¢';
    const grid = $('songGrid'); grid.innerHTML = '';
    const nb = r.chords.length;
    let bar = null, barNo = 0, lastKey = '';
    const newBar = (start) => { bar = document.createElement('div'); bar.className = 'sbar'; bar.dataset.start = start; const num = document.createElement('span'); num.className = 'bnum'; num.textContent = ++barNo; bar.appendChild(num); grid.appendChild(bar); };
    for (let i = 0; i < nb; i++) {
      const pos = mod(i - r.phase, 4);
      if (!bar || pos === 0) newBar(i);
      const c = r.chords[i], k = c.root + c.q;
      const cell = document.createElement('button'); cell.type = 'button'; cell.className = 'beat'; cell.dataset.b = i;
      if (k !== lastKey || pos === 0) { cell.textContent = songChordName(c, S.songTrans); cell.classList.add('has'); if (k === lastKey) cell.classList.add('cont'); }
      if (song.loopA >= 0 && i >= song.loopA && i <= song.loopB) cell.classList.add('inloop');
      lastKey = k;
      bar.appendChild(cell);
    }
    // seek bar colors: one band per chord
    $('songSeek').max = '1000';
    song.beatIdx = -2; song.chordKey = ''; updateSongPos(true);
    renderLyrics();
    $('songLoopInfo').textContent = song.loopA >= 0 ? (S.lang === 'es' ? 'Bucle: compases ' : 'Loop: bars ') + barOf(song.loopA) + '–' + barOf(song.loopB) : t('songLoopHint');
    $('songLoop').disabled = song.loopA < 0;
  }
  const barOf = (b) => { const cell = document.querySelector('.beat[data-b="' + b + '"]'); return cell ? cell.parentElement.querySelector('.bnum').textContent : '?'; };
  $('songGrid').addEventListener('click', (e) => {
    const cell = e.target.closest('.beat'); if (!cell || !song.res) return;
    const b = +cell.dataset.b, bar = cell.parentElement, start = +bar.dataset.start, end = start + bar.querySelectorAll('.beat').length - 1;
    if (e.shiftKey && song.anchor >= 0) {
      song.loopA = Math.min(song.anchor, start); song.loopB = Math.max(song.anchor, end);
      const a = document.querySelector('.beat[data-b="' + song.loopA + '"]').parentElement; song.loopA = +a.dataset.start;
      S.songLoop = true; $('songLoop').setAttribute('aria-pressed', 'true');
      renderSong(); return;
    }
    song.anchor = start;
    seekSong(song.res.beats[b]);
  });
  $('songFile').addEventListener('change', (e) => loadSongFile(e.target.files[0]));
  const drop = $('songDrop');
  ['dragenter', 'dragover'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add('over'); }));
  ['dragleave', 'drop'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.remove('over'); }));
  drop.addEventListener('drop', (e) => { const f = e.dataTransfer.files && e.dataTransfer.files[0]; if (f) loadSongFile(f); });
  $('songPlay').addEventListener('click', () => (song.playing ? pauseSong() : playSong()));
  $('songBack').addEventListener('click', () => seekSong(curTime() - 5));
  $('songFwd').addEventListener('click', () => seekSong(curTime() + 5));
  $('songSeek').addEventListener('input', () => { if (song.res) seekSong(+$('songSeek').value / 1000 * song.res.duration); });
  $('songSpeed').value = String(S.songSpeed);
  $('songSpeed').addEventListener('change', () => {
    const t0 = curTime(); S.songSpeed = +$('songSpeed').value; save();
    if (!song.useWA && song.audio) song.audio.playbackRate = S.songSpeed; else if (song.playing) { seekSong(t0); }
  });
  const stepper = (id, key, min, max) => { $(id + 'Down').addEventListener('click', () => { S[key] = Math.max(min, S[key] - 1); save(); applySongNums(); }); $(id + 'Up').addEventListener('click', () => { S[key] = Math.min(max, S[key] + 1); save(); applySongNums(); }); };
  stepper('songTrans', 'songTrans', -6, 6); stepper('songCapo', 'songCapo', 0, 7);
  function applySongNums() {
    $('songTransVal').textContent = (S.songTrans > 0 ? '+' : '') + S.songTrans;
    $('songCapoVal').textContent = S.songCapo;
    if (song.res) { renderSong(); }
  }
  $('songLoop').addEventListener('click', () => { S.songLoop = !S.songLoop; $('songLoop').setAttribute('aria-pressed', String(S.songLoop)); });
  $('songLoopClear').addEventListener('click', () => { song.loopA = song.loopB = -1; S.songLoop = false; $('songLoop').setAttribute('aria-pressed', 'false'); renderSong(); });
  ['songPiano', 'songFollow'].forEach((k) => { const c = $(k); c.checked = !!S[k]; c.addEventListener('change', () => { S[k] = c.checked; save(); if (!c.checked && k === 'songPiano') releaseSongChord(); }); });
  document.addEventListener('keydown', (e) => {
    if (e.code !== 'Space' || $('panelSong').hidden || !song.res) return;
    if (/input|select|textarea|button/i.test(document.activeElement && document.activeElement.tagName)) return;
    e.preventDefault(); song.playing ? pauseSong() : playSong();
  });
  $('songPdf').addEventListener('click', songPdf);
  async function songPdf() {
    if (!song.res) return;
    if (!window.jspdf) { alertMsg(t('pdfMissing')); return; }
    const r = song.res, doc = new window.jspdf.jsPDF({ unit: 'pt', format: 'letter' });
    doc.setFont('helvetica', 'bold'); doc.setFontSize(20); doc.text(pdfName(song.name).slice(0, 60), 40, 52);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(10.5); doc.setTextColor(100);
    doc.text(`Key: ${pdfName(keyName())}   ·   Tempo: ${Math.round(r.bpm)} BPM   ·   4/4   ·   ${fmtTime(r.duration)}` + (S.songTrans ? `   ·   Transposed ${S.songTrans > 0 ? '+' : ''}${S.songTrans}` : '') + (S.songCapo ? `   ·   Capo ${S.songCapo}` : ''), 40, 70);
    doc.setTextColor(20);
    let y = 92;
    const hasLyrics = !!(song.lyrics && song.lyrics.synced);
    if (hasLyrics) { y = pdfLyrics(doc, y); }
    // bars, 4 per line
    const bars = []; let cur = null, lastK = '';
    r.chords.forEach((c, i) => { const pos = mod(i - r.phase, 4); if (!cur || pos === 0) { cur = []; bars.push(cur); } const k = c.root + c.q; if (k !== lastK || pos === 0) cur.push({ pos, name: pdfName(songChordName(c, S.songTrans)) }); lastK = k; });
    const bw = (612 - 80) / 4, bh = 30;
    if (hasLyrics) { doc.addPage(); y = 50; doc.setFont('helvetica', 'bold'); doc.setFontSize(12); doc.text(S.lang === 'es' ? 'Acordes por compás' : 'Bar-by-bar chart', 40, y); y += 16; doc.setFont('helvetica', 'normal'); }
    bars.forEach((b, i) => {
      const col = i % 4; if (col === 0 && i) y += bh; if (y > 560 && col === 0) { doc.addPage(); y = 50; }
      const x = 40 + col * bw;
      doc.setDrawColor(170); doc.setLineWidth(0.6); doc.line(x, y, x, y + bh - 6);
      doc.setFontSize(6.5); doc.setTextColor(150); doc.text(String(i + 1), x + 3, y + 7); doc.setTextColor(20);
      doc.setFont('helvetica', 'bold'); doc.setFontSize(b.length > 2 ? 9 : 11);
      b.forEach((c) => doc.text(c.name, x + 8 + c.pos * (bw - 12) / 4, y + 18));
      doc.setFont('helvetica', 'normal');
    });
    // diagrams of every chord used
    y += bh + 16; if (y > 640) { doc.addPage(); y = 50; }
    doc.setFont('helvetica', 'bold'); doc.setFontSize(12); doc.text(S.songCapo ? `Guitar shapes (capo ${S.songCapo})` : 'Guitar shapes', 40, y); y += 22;
    const seen = new Set(), used = [];
    r.chords.forEach((c) => { if (c.root >= 0) { const k = c.root + c.q; if (!seen.has(k)) { seen.add(k); used.push(c); } } });
    let col = 0, rowH = 0; const cw = 58, gap = (612 - 80 - 6 * cw) / 5;
    used.forEach((c) => {
      const pc = mod(c.root + S.songTrans - S.songCapo, 12), sh = frettedShapes(pc, Q[SQ[c.q] || 'maj'].iv, 'guitar', 1)[0]; if (!sh) return;
      if (y > 680) { doc.addPage(); y = 50; }
      const yEnd = pdfDiagram(doc, sh, 'guitar', 40 + col * (cw + gap), y, cw, pdfName(songChordName(c, S.songTrans)), pc);
      rowH = Math.max(rowH, yEnd - y); col++; if (col === 6) { col = 0; y += rowH + 16; rowH = 0; }
    });
    doc.setFontSize(8); doc.setTextColor(140); doc.text('Made with Acorde · chords detected automatically, check by ear', 40, 770);
    await saveFile((pdfName(song.name) || 'Song') + ' - chords.pdf', doc.output('blob'));
  }

  // ================= lyrics: search, paste, tap-sync, chords over words =================
  song.lyrics = null; // { lines: [{ t: seconds|null, text }], synced: bool, source }
  song.lyrOffset = 0; song.tapIdx = -1;
  function parseLyrics(text) {
    const lines = [];
    let synced = false;
    text.replace(/\r/g, '').split('\n').forEach((raw) => {
      const tags = [...raw.matchAll(/\[(\d{1,2}):(\d{1,2}(?:[.:]\d{1,3})?)\]/g)];
      const body = raw.replace(/\[[^\]]*\]/g, '').trim();
      if (tags.length) { synced = true; tags.forEach((m) => lines.push({ t: (+m[1]) * 60 + parseFloat(m[2].replace(':', '.')), text: body })); }
      else if (/^\[[a-z]+:.*\]$/i.test(raw.trim())) { /* LRC header like [ar:...] */ }
      else lines.push({ t: null, text: body });
    });
    if (synced) lines.sort((a, b) => (a.t == null ? 1e9 : a.t) - (b.t == null ? 1e9 : b.t));
    while (lines.length && !lines[0].text) lines.shift();
    return { lines, synced: synced && lines.every((l) => l.t != null) };
  }
  function lyricsToText(ly) {
    const ts = (t) => { const m = Math.floor(t / 60), s = (t - m * 60).toFixed(2).padStart(5, '0'); return `[${String(m).padStart(2, '0')}:${s}]`; };
    return ly.lines.map((l) => (l.t != null ? ts(l.t) + ' ' : '') + l.text).join('\n');
  }
  function guessArtistTitle(name) {
    const clean = name.replace(/[_]+/g, ' ').replace(/\((official|lyric|audio|video|hd|hq)[^)]*\)/gi, '').replace(/\[[^\]]*\]/g, '').replace(/\s+/g, ' ').trim();
    const m = clean.split(/\s+[-–—]\s+/);
    return m.length >= 2 ? { artist: m[0].trim(), title: m.slice(1).join(' - ').trim() } : { artist: '', title: clean };
  }
  function updateLyrWeb() {
    const q = [$('lyrArtist').value.trim(), $('lyrTitle').value.trim()].filter(Boolean).join(' ');
    $('lyrWeb').href = 'https://www.google.com/search?q=' + encodeURIComponent((q ? q + ' ' : '') + (S.lang === 'es' ? 'letra' : 'lyrics'));
  }
  ['lyrArtist', 'lyrTitle'].forEach((id) => $(id).addEventListener('input', updateLyrWeb));
  $('lyrWeb').addEventListener('focus', updateLyrWeb); $('lyrWeb').addEventListener('pointerdown', updateLyrWeb);
  function setLyrStatus(msg, kind) { const el = $('lyrStatus'); el.textContent = msg || ''; el.dataset.kind = kind || ''; }
  async function findLyrics() {
    if (!song.res) return;
    const artist = $('lyrArtist').value.trim(), title = $('lyrTitle').value.trim();
    if (!title) { setLyrStatus(t('lyrNeedTitle'), 'warn'); return; }
    setLyrStatus(t('lyrSearching'));
    const qs = new URLSearchParams({ track_name: title }); if (artist) qs.set('artist_name', artist);
    let list = null;
    // the free lyrics library is often briefly overloaded (503/429): wait and try again a few times
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    async function get(params) {
      let lastErr = 'net';
      for (let tries = 0; tries < 6; tries++) {
        if (tries) { setLyrStatus(t('lyrRetry') + ' (' + (tries + 1) + '/6)', 'warn'); await wait(1500 * tries); }
        let r;
        try { r = await fetch('https://lrclib.net/api/search?' + params.toString(), { headers: { 'Lrclib-Client': 'Acorde v1.0 (chord reader)' } }); }
        catch (e) { lastErr = 'net'; continue; }
        if (r.status === 429 || r.status >= 500) { lastErr = 'busy'; const ra = +r.headers.get('Retry-After'); if (ra > 0 && ra < 10) await wait(ra * 1000); continue; }
        if (!r.ok) { lastErr = 'net'; break; }
        return await r.json();
      }
      throw new Error(lastErr);
    }
    try {
      list = await get(qs);
      if ((!list || !list.length) && artist) list = await get(new URLSearchParams({ q: artist + ' ' + title }));
    } catch (e) { setLyrStatus(e.message === 'busy' ? t('lyrBusy') : t('lyrOffline'), 'warn'); return; }
    if (!list || !list.length) { setLyrStatus(t('lyrNone'), 'warn'); return; }
    // prefer synced lyrics whose length matches the recording
    const dur = song.res.duration;
    const score = (x) => (x.syncedLyrics ? 0 : 30) + Math.abs((x.duration || dur) - dur) + (x.instrumental ? 100 : 0);
    const best = list.slice().sort((a, b) => score(a) - score(b))[0];
    if (best.instrumental || (!best.syncedLyrics && !best.plainLyrics)) { setLyrStatus(t('lyrInstrumental'), 'warn'); return; }
    song.lyrics = parseLyrics(best.syncedLyrics || best.plainLyrics);
    song.lyrics.source = 'lrclib';
    song.lyrOffset = 0;
    $('lyrText').value = lyricsToText(song.lyrics);
    const off = Math.abs((best.duration || dur) - dur);
    setLyrStatus(`${t('lyrFound')} ${best.artistName} – ${best.trackName}` + (song.lyrics.synced ? (off > 4 ? ' · ' + t('lyrLenDiff') : '') : ' · ' + t('lyrNotSynced')), song.lyrics.synced ? 'ok' : 'warn');
    renderLyrics();
  }
  function applyLyricsText() {
    const txt = $('lyrText').value;
    if (!txt.trim()) { song.lyrics = null; renderLyrics(); return; }
    song.lyrics = parseLyrics(txt); song.lyrics.source = 'paste';
    setLyrStatus(song.lyrics.synced ? t('lyrApplied') : t('lyrNotSynced'), song.lyrics.synced ? 'ok' : 'warn');
    renderLyrics();
  }
  // tap the space bar (or the Tap button) as each line starts
  function startTapSync() {
    if (!song.res || !song.lyrics || !song.lyrics.lines.length) { setLyrStatus(t('lyrPasteFirst'), 'warn'); return; }
    song.lyrics.lines.forEach((l) => { l.t = null; }); song.lyrics.synced = false; song.lyrOffset = 0;
    song.tapIdx = 0; seekSong(0); if (!song.playing) playSong();
    $('lyrTap').hidden = false; $('lyrTapStart').hidden = true;
    setLyrStatus(t('lyrTapping'), 'ok'); renderLyrics();
  }
  function tapLine() {
    if (song.tapIdx < 0 || !song.lyrics) return;
    const L = song.lyrics.lines;
    while (song.tapIdx < L.length && !L[song.tapIdx].text) { L[song.tapIdx].t = curTime(); song.tapIdx++; }
    if (song.tapIdx < L.length) { L[song.tapIdx].t = Math.max(0, curTime() - 0.15); song.tapIdx++; }
    if (song.tapIdx >= L.length) { song.tapIdx = -1; song.lyrics.synced = true; $('lyrTap').hidden = true; $('lyrTapStart').hidden = false; $('lyrText').value = lyricsToText(song.lyrics); setLyrStatus(t('lyrSyncedDone'), 'ok'); }
    renderLyrics();
  }
  // ---------- chords over words ----------
  function chordEvents() {
    const r = song.res, ev = []; let last = '';
    r.chords.forEach((c, i) => { const k = c.root + c.q; if (k !== last) { ev.push({ t: r.beats[i], c }); last = k; } });
    return ev;
  }
  function chordAt(t) { const r = song.res; const b = Math.max(0, beatAt(t)); return r.chords[Math.min(r.chords.length - 1, b)]; }
  // returns sheet rows: { kind: 'line', chords: [{pos, name}], text, t } or { kind: 'inst', label, chords: [names] }
  function buildSheet() {
    const L = song.lyrics, r = song.res; if (!L || !L.synced) return null;
    const ev = chordEvents(), rows = [], beatDur = 60 / r.bpm, off = song.lyrOffset;
    const timed = L.lines.map((l) => ({ t: l.t + off, text: l.text }));
    const name = (c) => songChordName(c, S.songTrans);
    const gapRow = (a, b, label) => {
      const names = []; let lastN = '';
      const first = chordAt(a); if (first && first.root >= 0) { names.push(name(first)); lastN = name(first); }
      ev.forEach((e) => { if (e.t > a + 0.05 && e.t < b - 0.05 && e.c.root >= 0) { const n = name(e.c); if (n !== lastN) { names.push(n); lastN = n; } } });
      if (names.length) rows.push({ kind: 'inst', label, chords: names });
    };
    if (timed.length && timed[0].t > beatDur * 6) gapRow(0, timed[0].t, t('lyrIntro'));
    for (let i = 0; i < timed.length; i++) {
      const ln = timed[i], start = ln.t;
      const nextT = i + 1 < timed.length ? timed[i + 1].t : r.duration;
      if (!ln.text) { rows.push({ kind: 'gap' }); continue; }
      // a line is sung over roughly its first few seconds; the rest of a long gap is an instrumental
      const end = Math.min(nextT, start + Math.max(beatDur * 8, Math.min(9, ln.text.length * 0.16 + 1.2)));
      const text = ln.text;
      const words = []; text.replace(/\S+/g, (w, idx) => { words.push({ idx, len: w.length }); return w; });
      const totalW = words.reduce((s, w) => s + w.len + 1, 0) || 1;
      const timeToPos = (tt) => {
        const frac = Math.max(0, Math.min(1, (tt - start) / Math.max(0.5, end - start)));
        let acc = 0; for (const w of words) { const wPart = (w.len + 1) / totalW; if (frac <= acc + wPart * 0.6) return w.idx; acc += wPart; }
        return words.length ? words[words.length - 1].idx : 0;
      };
      const chords = [];
      const startC = chordAt(start);
      if (startC && startC.root >= 0) chords.push({ pos: 0, name: name(startC) });
      ev.forEach((e) => { if (e.t > start + 0.12 && e.t < end - 0.2 && e.c.root >= 0) chords.push({ pos: timeToPos(e.t), name: name(e.c) }); });
      // drop repeats and keep chords from colliding
      const placed = []; let lastName = '';
      chords.forEach((c) => { if (c.name === lastName) return; lastName = c.name; placed.push({ pos: c.pos, name: c.name }); });
      for (let k = 1; k < placed.length; k++) { const minPos = placed[k - 1].pos + placed[k - 1].name.length + 1; if (placed[k].pos < minPos) placed[k].pos = minPos; }
      rows.push({ kind: 'line', chords: placed, text, t: start });
      if (nextT - end > beatDur * 8) gapRow(end, nextT, i + 1 < timed.length ? t('lyrInstrumentalRow') : t('lyrOutro'));
    }
    return rows;
  }
  const chordLine = (cs) => { let s = ''; cs.forEach((c) => { s = s.padEnd(c.pos, ' ') + c.name; }); return s; };
  function renderLyrics() {
    const view = $('lyrView'); view.innerHTML = '';
    const L = song.lyrics;
    $('lyrOffsetVal').textContent = (song.lyrOffset >= 0 ? '+' : '') + song.lyrOffset.toFixed(1) + 's';
    if (!L || !L.lines.length) { view.hidden = true; return; }
    view.hidden = false;
    if (!L.synced) {
      L.lines.forEach((l, i) => { const d = document.createElement('div'); d.className = 'lyl' + (i === song.tapIdx ? ' next' : '') + (l.t != null ? ' done' : ''); d.textContent = l.text || ' '; view.appendChild(d); });
      return;
    }
    (buildSheet() || []).forEach((row) => {
      const d = document.createElement('div');
      if (row.kind === 'gap') { d.className = 'lygap'; view.appendChild(d); return; }
      if (row.kind === 'inst') { d.className = 'lyinst'; d.innerHTML = '<span></span><b></b>'; d.querySelector('span').textContent = row.label; d.querySelector('b').textContent = row.chords.join('   '); view.appendChild(d); return; }
      d.className = 'lyl'; d.dataset.t = row.t;
      const c = document.createElement('div'); c.className = 'lyc'; c.textContent = chordLine(row.chords) || ' ';
      const tx = document.createElement('div'); tx.className = 'lyt'; tx.textContent = row.text;
      d.append(c, tx); d.addEventListener('click', () => seekSong(row.t));
      view.appendChild(d);
    });
  }
  // highlight the line being sung
  let lastLyr = null;
  function updateLyricLine() {
    if (!song.lyrics || !song.lyrics.synced) return;
    const now = curTime(); let cur = null;
    document.querySelectorAll('#lyrView .lyl[data-t]').forEach((el) => { if (+el.dataset.t <= now + 0.05) cur = el; });
    if (cur !== lastLyr) {
      if (lastLyr) lastLyr.classList.remove('now');
      if (cur) { cur.classList.add('now'); if (song.playing && S.songFollow) { const v = $('lyrView'), r = cur.getBoundingClientRect(), g = v.getBoundingClientRect(); if (r.top < g.top || r.bottom > g.bottom) v.scrollTop += r.top - g.top - 60; } }
      lastLyr = cur;
    }
  }
  setInterval(() => { if (song.playing) updateLyricLine(); }, 120);
  $('lyrFind').addEventListener('click', findLyrics);
  $('lyrApply').addEventListener('click', applyLyricsText);
  $('lyrTapStart').addEventListener('click', () => { applyLyricsText(); startTapSync(); });
  $('lyrTap').addEventListener('click', tapLine);
  $('lyrEarlier').addEventListener('click', () => { song.lyrOffset = Math.round((song.lyrOffset - 0.2) * 10) / 10; renderLyrics(); });
  $('lyrLater').addEventListener('click', () => { song.lyrOffset = Math.round((song.lyrOffset + 0.2) * 10) / 10; renderLyrics(); });
  document.addEventListener('keydown', (e) => {
    if (song.tapIdx < 0 || e.code !== 'Space') return;
    if (/input|textarea/i.test(document.activeElement && document.activeElement.tagName)) return;
    e.preventDefault(); e.stopImmediatePropagation(); tapLine();
  }, true);
  function prepLyricsForSong() {
    song.lyrics = null; song.lyrOffset = 0; song.tapIdx = -1; lastLyr = null;
    const g = guessArtistTitle(song.name); $('lyrArtist').value = g.artist; $('lyrTitle').value = g.title; updateLyrWeb();
    $('lyrText').value = ''; $('lyrTap').hidden = true; $('lyrTapStart').hidden = false;
    setLyrStatus(''); renderLyrics();
  }
  // PDF: lyrics with chords placed above the words (monospaced so they line up)
  function pdfLyrics(doc, y) {
    const rows = buildSheet(); if (!rows) return y;
    const left = 40, lh = 15;
    const need = (h) => { if (y + h > 750) { doc.addPage(); y = 50; } };
    rows.forEach((row) => {
      if (row.kind === 'gap') { y += 8; return; }
      if (row.kind === 'inst') { need(lh + 6); doc.setFont('helvetica', 'italic'); doc.setFontSize(9.5); doc.setTextColor(120); doc.text(row.label, left, y + 9); doc.setFont('courier', 'bold'); doc.setFontSize(10.5); doc.setTextColor(24, 64, 170); doc.text(pdfName(row.chords.join('   ')), left + 84, y + 9); doc.setTextColor(20); y += lh + 6; return; }
      need(lh * 2 + 4);
      doc.setFont('courier', 'bold'); doc.setFontSize(12); doc.setTextColor(24, 64, 170);
      const pc = row.chords.map((c) => ({ pos: c.pos, name: pdfName(c.name) }));
      for (let k = 1; k < pc.length; k++) { const mn = pc[k - 1].pos + pc[k - 1].name.length + 1; if (pc[k].pos < mn) pc[k].pos = mn; }
      doc.text(chordLine(pc), left, y + 9);
      doc.setFont('courier', 'normal'); doc.setFontSize(12); doc.setTextColor(20);
      doc.text(row.text, left, y + 9 + lh);
      y += lh * 2 + 4;
    });
    return y + 6;
  }

  document.querySelectorAll('#libInsts button').forEach((bt) => bt.addEventListener('click', () => { S.libInst = bt.dataset.inst; save(); renderLib(); }));
  $('libPdf').addEventListener('click', libraryPdf);
  applySongNums();

  // ================= key colors and piano style settings =================
  const DEFAULT_COLORS = { colLeft: '#4a7bff', colRight: '#ff9f1c', colRoot: '#ff3d57', colTone: '#4a7bff' };
  function keyColor(n, isRoot) {
    if (S.colorMode === 'tones') return isRoot ? S.colRoot : S.colTone;
    if (S.markRoot && isRoot) return S.colRoot;
    return n < S.split ? S.colLeft : S.colRight;
  }
  function applyColorUI() {
    $('colorMode').value = S.colorMode;
    ['colLeft', 'colRight', 'colRoot', 'colTone'].forEach((k) => { $(k).value = S[k]; });
    $('markRoot').checked = !!S.markRoot;
    document.querySelectorAll('[data-cmode]').forEach((el) => {
      const m = el.dataset.cmode;
      el.hidden = m === 'root' ? !(S.colorMode === 'tones' || S.markRoot) : m !== S.colorMode;
    });
  }
  $('colorMode').addEventListener('change', () => { S.colorMode = $('colorMode').value; save(); applyColorUI(); render(); });
  ['colLeft', 'colRight', 'colRoot', 'colTone'].forEach((k) => $(k).addEventListener('input', () => { S[k] = $(k).value; save(); render(); }));
  $('markRoot').addEventListener('change', () => { S.markRoot = $('markRoot').checked; save(); applyColorUI(); render(); });
  $('resetColors').addEventListener('click', () => { Object.assign(S, DEFAULT_COLORS); save(); applyColorUI(); render(); });


  try {
    if (window.Piano3D) {
      p3d = window.Piano3D.init($('stage3d'), { onKey: keyDown, onKeyUp: keyUp, style: 'stage' });
      if (p3d) { $('stageScroll').hidden = false; $('pianoScroll').hidden = true; }
    }
  } catch (e) { p3d = null; $('stageScroll').hidden = true; $('pianoScroll').hidden = false; }
  applyAll();
  requestAnimationFrame(() => { centerPiano(); const sc = $('stageScroll'); if (sc.scrollWidth > sc.clientWidth) sc.scrollLeft = (sc.scrollWidth - sc.clientWidth) * 0.48; });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { lastNameKey = ''; render(); });
})();
