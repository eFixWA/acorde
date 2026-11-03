// Acorde chord engine — identifies chords from MIDI notes, spells notes correctly.
(function (root) {
  const LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const LETTER_PC = [0, 2, 4, 5, 7, 9, 11];
  const SOLFEGE = { C: 'Do', D: 'Re', E: 'Mi', F: 'Fa', G: 'Sol', A: 'La', B: 'Si' };
  // default root spellings [letterIndex, accidental]
  const ROOT_FLAT = [[0,0],[1,-1],[1,0],[2,-1],[2,0],[3,0],[3,1],[4,0],[5,-1],[5,0],[6,-1],[6,0]];
  const ROOT_SHARP = [[0,0],[0,1],[1,0],[1,1],[2,0],[3,0],[3,1],[4,0],[4,1],[5,0],[5,1],[6,0]];
  // interval label -> letter steps above root
  const STEPS = { R:0, b9:1, '9':1, '#9':1, b3:2, '3':2, '11':3, '#11':3, b5:4, '5':4, '#5':4, b13:5, '13':5, '6':5, bb7:6, b7:6, '7':6, '4':3, '2':1, b6:5 };

  const mod = (n, m) => ((n % m) + m) % m;

  function accStr(a, uni = true) {
    if (a === 0) return '';
    if (uni) return a === 1 ? '♯' : a === -1 ? '♭' : a === 2 ? '𝄪' : a === -2 ? '𝄫' : '';
    return a > 0 ? '#'.repeat(a) : 'b'.repeat(-a);
  }
  function noteName(sp, opts = {}) {
    const L = LETTERS[sp.letter];
    const base = opts.solfege ? SOLFEGE[L] : L;
    return base + accStr(sp.acc, opts.unicode !== false);
  }
  // spell an arbitrary pitch class with no context
  function plainSpell(pc, pref = 'flat') {
    const t = (pref === 'sharp' ? ROOT_SHARP : ROOT_FLAT)[mod(pc, 12)];
    return { letter: t[0], acc: t[1] };
  }

  // Analyse a set of intervals (semitones above root, 0 excluded) into chord parts
  function analyse(ivs) {
    const has = (i) => ivs.has(i);
    const p = { third: null, fifth: null, seventh: null, ext: [], labels: {}, penalty: 0, sus: null };
    const lab = (i, l) => { p.labels[i] = l; };
    // third
    if (has(4)) { p.third = 'M'; lab(4, '3'); }
    else if (has(3)) { p.third = 'm'; lab(3, 'b3'); }
    // fifth
    if (has(7)) { p.fifth = 'P'; lab(7, '5'); }
    // seventh
    if (has(11)) { p.seventh = 'M7'; lab(11, '7'); }
    if (has(10)) { if (p.seventh) { lab(10, '#9?'); } else { p.seventh = 'b7'; lab(10, 'b7'); } }
    // sus
    if (!p.third) {
      if (has(5)) { p.sus = '4'; lab(5, '4'); }
      else if (has(2)) { p.sus = '2'; lab(2, '2'); }
    }
    // diminished / augmented fifths
    if (!p.fifth) {
      if (has(6) && (p.third === 'm' || (!p.third && !p.sus)) ) { p.fifth = 'd'; lab(6, 'b5'); }
      else if (has(8) && (p.third === 'M' || (!p.third && !p.sus)) && !has(9)) { p.fifth = 'A'; lab(8, '#5'); }
      else if (has(6) && p.third === 'M' && !has(5)) { p.fifth = 'd'; lab(6, 'b5'); }
    }
    // dim7
    if (p.fifth === 'd' && p.third === 'm' && !p.seventh && has(9)) { p.seventh = 'd7'; lab(9, 'bb7'); }
    // remaining tones = tensions
    for (const i of [1, 2, 3, 5, 6, 8, 9, 10, 11]) {
      if (!has(i) || p.labels[i] && !String(p.labels[i]).endsWith('?')) continue;
      let l;
      switch (i) {
        case 1: l = 'b9'; break;
        case 2: l = '9'; break;
        case 3: l = '#9'; break; // only reaches here when major third present
        case 5: l = '11'; break;
        case 6: l = '#11'; break;
        case 8: l = 'b13'; break;
        case 9: l = p.seventh ? '13' : '6'; break;
        case 10: l = '#9x'; break; // b7 duplicate as aug9? treat as conflict
        default: l = null;
      }
      if (l === '#9x') { p.penalty += 6; continue; }
      if (l) { lab(i, l); p.ext.push(l); }
    }
    return p;
  }

  const SUP = (s) => s; // placeholder for formatting

  // Build a chord symbol from analysis; returns {quality, text parts}
  function buildName(p, style) {
    const jazz = style === 'jazz';
    const ext = new Set(p.ext);
    const alts = [];
    let q = '';
    let main = '';
    let penalty = p.penalty;
    const t = p.third, f = p.fifth, s = p.seventh;

    // pick top natural extension (for 7th chords)
    const takeExt = () => {
      if (!s || s === 'd7') return null;
      if (ext.has('13')) { ext.delete('13'); ext.delete('9'); if (t === 'm' || p.sus) ext.delete('11'); return '13'; }
      if (ext.has('11') && (t === 'm' || p.sus === '4' || !t)) { ext.delete('11'); ext.delete('9'); return '11'; }
      if (ext.has('9')) { ext.delete('9'); return '9'; }
      return null;
    };

    if (!t && !p.sus && !f && !s) {
      // only tensions / root
      if (ext.size === 0) return { q: '', main: '', alts: [], penalty: 0, kind: 'single' };
    }
    const top = takeExt();
    const n = top || '7';
    let kind = '';

    if (t === 'M' || (!t && !p.sus)) {
      if (f === 'A' && !s) { q = jazz ? '+' : 'aug'; kind = 'aug'; }
      else if (f === 'A' && s === 'M7') { q = (jazz ? 'Δ' : 'maj') + n + '♯5'; kind = 'augmaj7'; }
      else if (f === 'A' && s === 'b7') { q = (top ? n : '7') + '♯5'; kind = 'aug7'; }
      else if (f === 'd' && t === 'M') { q = (s === 'M7' ? (jazz ? 'Δ' : 'maj') + n : s === 'b7' ? n : '') + '♭5'; if (!s) q = '(♭5)'; kind = 'b5'; penalty += 1; }
      else if (f === 'd' && !t) { q = s === 'b7' ? (jazz ? 'ø' : 'm7♭5') : 'dim'; penalty += 3; kind = 'dim'; }
      else if (s === 'M7') { q = (jazz ? 'Δ' : 'maj') + n; kind = 'maj7'; }
      else if (s === 'b7') { q = n; kind = 'dom7'; }
      else { // triad or 6 chord
        if (ext.has('6') && ext.has('9')) { q = '6/9'; ext.delete('6'); ext.delete('9'); }
        else if (ext.has('6')) { q = '6'; ext.delete('6'); }
        kind = 'maj';
      }
      if (!t) penalty += f === 'P' && !s && ext.size === 0 ? 1 : 5;
      if (!t && f === 'P' && !s && ext.size === 0) { q = '5'; kind = 'power'; }
    } else if (t === 'm') {
      if (f === 'd' && s === 'd7') { q = jazz ? '°7' : 'dim7'; kind = 'dim7'; }
      else if (f === 'd' && s === 'b7') { q = jazz ? 'ø' + (top ? top : '7') : 'm' + (top || '7') + '♭5'; kind = 'hdim'; }
      else if (f === 'd' && s === 'M7') { q = (jazz ? '°Δ7' : 'dim(maj7)'); kind = 'dimmaj7'; }
      else if (f === 'd') { q = jazz ? '°' : 'dim'; kind = 'dim'; }
      else if (s === 'M7') { q = (jazz ? '−Δ' : 'm(maj') + n + (jazz ? '' : ')'); kind = 'mmaj7'; }
      else if (s === 'b7') { q = (jazz ? '−' : 'm') + n; kind = 'm7'; }
      else {
        if (ext.has('6') && ext.has('9')) { q = (jazz ? '−' : 'm') + '6/9'; ext.delete('6'); ext.delete('9'); }
        else if (ext.has('6')) { q = (jazz ? '−' : 'm') + '6'; ext.delete('6'); }
        else q = jazz ? '−' : 'm';
        kind = 'min';
      }
      if (f === 'A') penalty += 6;
    } else if (p.sus) {
      const susTxt = 'sus' + p.sus;
      if (s === 'M7') { q = (jazz ? 'Δ' : 'maj') + n + susTxt; }
      else if (s === 'b7') { q = (top === '11' ? '11' : n + susTxt); if (top === '11') { /* 11 implies sus */ } }
      else { q = susTxt; if (p.sus === '4' && ext.has('9')) { ext.delete('9'); q = 'sus4(add9)'; } }
      if (p.sus === '2' && ext.has('11')) { ext.delete('11'); q = q.replace('sus2', 'sus2(add11)'); }
      penalty += 2;
      if (f === 'd') { q += '♭5'; penalty += 2; }
      if (f === 'A') { q += '♯5'; penalty += 2; }
      kind = 'sus';
    }

    // leftover tensions
    const order = ['b9', '9', '#9', '11', '#11', 'b13', '13', '6'];
    for (const e of order) {
      if (!ext.has(e)) continue;
      const pretty = e.replace('#', '♯').replace('b', '♭');
      if (!s && (e === '9' || e === '11')) alts.push('add' + pretty);
      else if (!s && e === '#11') alts.push('add' + pretty);
      else alts.push(pretty);
      penalty += (e.length > 1 && /[#b]/.test(e)) ? 2 : 1;
      if (!s && /[#b]/.test(e)) penalty += 1.5;
    }
    if (alts.length && ['dim', 'aug', 'b5'].includes(kind)) penalty += 2;
    if (top) penalty += 0.3 * (['9', '11', '13'].indexOf(top) + 1);
    if (!f) penalty += 0.4;
    return { q, alts, penalty, kind };
  }

  const INTERVAL_NAMES = {
    en: ['Unison', 'Minor 2nd', 'Major 2nd', 'Minor 3rd', 'Major 3rd', 'Perfect 4th', 'Tritone', 'Perfect 5th', 'Minor 6th', 'Major 6th', 'Minor 7th', 'Major 7th', 'Octave'],
    es: ['Unísono', '2ª menor', '2ª mayor', '3ª menor', '3ª mayor', '4ª justa', 'Tritono', '5ª justa', '6ª menor', '6ª mayor', '7ª menor', '7ª mayor', 'Octava']
  };

  function spellFromRoot(rootSp, rootPc, interval, label) {
    const steps = STEPS[label] != null ? STEPS[label] : null;
    if (steps == null) return plainSpell(rootPc + interval);
    const letter = mod(rootSp.letter + steps, 7);
    const natural = LETTER_PC[letter];
    const target = mod(rootPc + interval, 12);
    let acc = mod(target - natural + 6, 12) - 6;
    return { letter, acc };
  }

  function rootSpelling(pc, pref, kind) {
    if (pref === 'sharp') return { letter: ROOT_SHARP[pc][0], acc: ROOT_SHARP[pc][1] };
    if (pref === 'flat') return { letter: ROOT_FLAT[pc][0], acc: ROOT_FLAT[pc][1] };
    // auto: common practice — F# major, C# minor-family, G# minor-family; otherwise flats
    const minorish = ['min', 'm7', 'mmaj7', 'dim', 'dim7', 'hdim'].includes(kind);
    if (pc === 6) return { letter: 3, acc: 1 };
    if (minorish && (pc === 1 || pc === 8)) return { letter: ROOT_SHARP[pc][0], acc: 1 };
    if (minorish && pc === 3 && kind !== 'min') return { letter: 2, acc: -1 };
    return { letter: ROOT_FLAT[pc][0], acc: ROOT_FLAT[pc][1] };
  }

  // Main: identify(midiNotes, opts) -> {candidates:[...], notes:[spelled], ...}
  function identify(midi, opts = {}) {
    const notes = [...new Set(midi)].sort((a, b) => a - b);
    if (!notes.length) return null;
    const bass = notes[0];
    const bassPc = mod(bass, 12);
    const pcs = [...new Set(notes.map((n) => mod(n, 12)))];
    const style = opts.style || 'standard';
    const pref = opts.spelling || 'auto';

    if (pcs.length === 1) {
      const sp = rootSpelling(pcs[0], pref, 'maj');
      return { type: 'note', root: sp, rootPc: pcs[0], candidates: [], notes: notes.map((n) => ({ midi: n, sp })), bassPc };
    }
    if (pcs.length === 2 && !opts.forceChord) {
      const iv = mod(pcs.find((p) => p !== bassPc) - bassPc, 12);
      const lo = rootSpelling(bassPc, pref, 'maj');
      const LBL = { 1: 'b9', 2: '9', 3: 'b3', 4: '3', 5: '11', 6: '#11', 7: '5', 8: 'b13', 9: '13', 10: 'b7', 11: '7' };
      const spOf = (n) => n % 12 === bassPc ? lo : spellFromRoot(lo, bassPc, mod(n - bass, 12), LBL[mod(n - bass, 12)]);
      const res = { type: 'interval', interval: iv, root: lo, rootPc: bassPc, candidates: [], notes: notes.map((n) => ({ midi: n, sp: spOf(n) })), bassPc };
      if (iv === 7) res.power = true;
      return res;
    }

    const cands = [];
    for (const r of pcs) {
      const ivs = new Set(pcs.filter((p) => p !== r).map((p) => mod(p - r, 12)));
      const a = analyse(ivs);
      const b = buildName(a, style);
      let pen = b.penalty;
      if (r !== bassPc) pen += 1.2;
      // prefer recognising inversions of simple 7th chords over exotic 6 readings
      if (a.ext.includes('6') && !a.seventh && pcs.length === 4 && r === bassPc) pen += 0.5;
      const rootSp = rootSpelling(r, pref, b.kind);
      const labels = { 0: 'R', ...a.labels };
      const tones = {};
      for (const p of pcs) {
        const iv = mod(p - r, 12);
        let l = labels[iv] || 'b9';
        l = String(l).replace('?', '').replace('#9x', '#9');
        tones[p] = { label: l, sp: iv === 0 ? rootSp : spellFromRoot(rootSp, r, iv, l) };
      }
      const bassSp = tones[bassPc].sp;
      cands.push({ rootPc: r, root: rootSp, quality: b.q, alts: b.alts, penalty: pen, kind: b.kind, tones, bassSp, slash: r !== bassPc, analysis: a });
    }
    cands.sort((x, y) => x.penalty - y.penalty);
    const best = cands[0];
    // inversion label
    let inversion = 0;
    if (best.slash) {
      const bl = best.tones[bassPc].label;
      if (/3/.test(bl) && !/13/.test(bl)) inversion = 1;
      else if (/5/.test(bl)) inversion = 2;
      else if (/7/.test(bl) || bl === '6') inversion = 3;
      else inversion = -1;
    }
    return {
      type: 'chord',
      candidates: cands.slice(0, 4),
      best, inversion,
      notes: notes.map((n) => ({ midi: n, sp: best.tones[mod(n, 12)].sp, label: best.tones[mod(n, 12)].label })),
      bassPc
    };
  }

  function symbol(c, opts = {}) {
    if (!c) return '';
    const root = noteName(c.root, opts);
    const alts = c.alts.length ? '(' + c.alts.join(',') + ')' : '';
    const slash = c.slash ? '/' + noteName(c.bassSp, opts) : '';
    return root + c.quality + alts + slash;
  }

  // Roman numeral relative to key
  function roman(c, keyPc, keyMinor) {
    const iv = mod(c.rootPc - keyPc, 12);
    const majorScale = [0, 2, 4, 5, 7, 9, 11];
    const minorScale = [0, 2, 3, 5, 7, 8, 10];
    const scale = keyMinor ? minorScale : majorScale;
    const R = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
    let deg = scale.indexOf(iv), pre = '';
    if (deg < 0) {
      // chromatic: try flat of next degree, else sharp of lower
      const up = scale.indexOf(mod(iv + 1, 12));
      if (up >= 0) { deg = up; pre = '♭'; } else { deg = scale.indexOf(mod(iv - 1, 12)); pre = '♯'; }
    }
    let num = R[deg];
    const k = c.kind;
    const lower = ['min', 'm7', 'mmaj7', 'dim', 'dim7', 'hdim', 'dimmaj7'].includes(k);
    if (lower) num = num.toLowerCase();
    let suf = '';
    if (k === 'dim') suf = '°'; else if (k === 'dim7') suf = '°7'; else if (k === 'hdim') suf = 'ø7';
    else if (k === 'aug') suf = '+';
    else if (/7|9|11|13/.test(c.quality)) suf = k === 'maj7' ? 'Δ7' : k === 'mmaj7' ? 'Δ7' : '7';
    else if (/sus/.test(c.quality)) suf = 'sus';
    return pre + num + suf;
  }

  const api = { identify, symbol, noteName, roman, plainSpell, INTERVAL_NAMES, LETTERS, LETTER_PC, SOLFEGE, accStr, mod, rootSpelling };
  if (typeof module !== 'undefined') module.exports = api; else root.AcordeEngine = api;
})(typeof window !== 'undefined' ? window : globalThis);
