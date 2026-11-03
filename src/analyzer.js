// Acorde song analyzer — runs inside a Web Worker. Input: mono Float32Array at 22050 Hz.
// Output: tempo, beats, downbeat phase, beat-synchronous chords, key, tuning.
// Methods: spectral-flux onsets, autocorrelation tempo, dynamic-programming beat tracking (Ellis 2007),
// tuned chroma, template matching with an HMM/Viterbi, Krumhansl-Schmuckler key finding.
function acordeAnalyze(x, sr, progress) {
  const P = (v, msg) => progress && progress(v, msg);

  // ---------- FFT ----------
  function makeFFT(N) {
    const lev = Math.log2(N) | 0, rev = new Uint32Array(N), cos = new Float64Array(N / 2), sin = new Float64Array(N / 2);
    for (let i = 0; i < N; i++) { let r = 0; for (let b = 0; b < lev; b++) r = (r << 1) | ((i >> b) & 1); rev[i] = r; }
    for (let i = 0; i < N / 2; i++) { cos[i] = Math.cos(2 * Math.PI * i / N); sin[i] = Math.sin(2 * Math.PI * i / N); }
    const re = new Float64Array(N), im = new Float64Array(N);
    return function mag(frame, out) {
      for (let i = 0; i < N; i++) { re[rev[i]] = frame[i]; im[rev[i]] = 0; }
      for (let size = 2; size <= N; size <<= 1) {
        const half = size >> 1, step = N / size;
        for (let i = 0; i < N; i += size) for (let j = 0, k = 0; j < half; j++, k += step) {
          const a = i + j, b = a + half;
          const tr = re[b] * cos[k] + im[b] * sin[k], ti = -re[b] * sin[k] + im[b] * cos[k];
          re[b] = re[a] - tr; im[b] = im[a] - ti; re[a] += tr; im[a] += ti;
        }
      }
      for (let i = 0; i <= N / 2; i++) out[i] = Math.hypot(re[i], im[i]);
    };
  }
  const hann = (N) => { const w = new Float64Array(N); for (let i = 0; i < N; i++) w[i] = 0.5 - 0.5 * Math.cos(2 * Math.PI * i / (N - 1)); return w; };

  // ---------- onset envelope ----------
  const N1 = 1024, H1 = 512, fps = sr / H1;
  const nF1 = Math.max(1, Math.floor((x.length - N1) / H1) + 1);
  const fft1 = makeFFT(N1), w1 = hann(N1), fr1 = new Float64Array(N1), m1 = new Float64Array(N1 / 2 + 1);
  let prev = new Float64Array(N1 / 2 + 1);
  const onset = new Float64Array(nF1), low = new Float64Array(nF1);
  const kLow1 = Math.max(2, Math.floor(180 / (sr / N1)));
  const kMax1 = Math.floor(8000 / (sr / N1));
  for (let f = 0; f < nF1; f++) {
    const o = f * H1;
    for (let i = 0; i < N1; i++) fr1[i] = (x[o + i] || 0) * w1[i];
    fft1(fr1, m1);
    let s = 0;
    let sl = 0;
    for (let k = 1; k < kMax1; k++) { const v = Math.log(1 + 1000 * m1[k]); const d = v - prev[k]; if (d > 0) { s += d; if (k <= kLow1) sl += d; } prev[k] = v; }
    onset[f] = s; low[f] = sl;
    if (f % 2000 === 0) P(0.05 + 0.25 * f / nF1, 'onsets');
  }
  // remove slow trend and normalize
  const win = Math.round(fps * 0.5), env = new Float64Array(nF1);
  let acc = 0; const q = [];
  for (let i = 0; i < nF1; i++) { acc += onset[i]; q.push(onset[i]); if (q.length > 2 * win) acc -= q.shift(); env[i] = Math.max(0, onset[i] - acc / q.length); }
  let sd = 0; for (let i = 0; i < nF1; i++) sd += env[i] * env[i]; sd = Math.sqrt(sd / nF1) || 1;
  for (let i = 0; i < nF1; i++) env[i] /= sd;

  // ---------- tempo ----------
  const minLag = Math.round(fps * 60 / 200), maxLag = Math.round(fps * 60 / 55);
  let bestLag = Math.round(fps * 60 / 110), bestScore = -1;
  const ac = new Float64Array(maxLag + 2);
  for (let lag = minLag; lag <= maxLag + 1; lag++) { let s = 0; for (let i = lag; i < nF1; i++) s += env[i] * env[i - lag]; ac[lag] = s / (nF1 - lag); }
  for (let lag = minLag; lag <= maxLag; lag++) {
    const bpm = 60 * fps / lag;
    const prior = Math.exp(-0.5 * Math.pow(Math.log2(bpm / 115) / 0.9, 2));
    const s = (ac[lag] + 0.5 * (ac[2 * lag] || 0) + 0.25 * (ac[Math.round(lag / 2)] || 0)) * prior;
    if (s > bestScore) { bestScore = s; bestLag = lag; }
  }
  // parabolic refinement
  const y0 = ac[bestLag - 1] || 0, y1 = ac[bestLag], y2 = ac[bestLag + 1] || 0;
  const den = y0 - 2 * y1 + y2, shift = den ? 0.5 * (y0 - y2) / den : 0;
  const period = bestLag + Math.max(-0.5, Math.min(0.5, shift));
  const bpm = 60 * fps / period;
  P(0.35, 'beats');

  // ---------- beat tracking (dynamic programming) ----------
  const alpha = 400, score = new Float64Array(nF1), back = new Int32Array(nF1).fill(-1);
  for (let t = 0; t < nF1; t++) {
    let best = 0, arg = -1;
    const lo = Math.max(0, Math.round(t - 2 * period)), hi = Math.round(t - period / 2);
    for (let tau = lo; tau <= hi; tau++) {
      const c = score[tau] - alpha * Math.pow(Math.log((t - tau) / period), 2);
      if (arg < 0 || c > best) { best = c; arg = tau; }
    }
    score[t] = env[t] + (arg >= 0 ? best : 0); back[t] = arg;
  }
  let end = nF1 - 1, bs = -Infinity;
  for (let t = Math.max(0, nF1 - Math.round(period)); t < nF1; t++) if (score[t] > bs) { bs = score[t]; end = t; }
  const beatFrames = [];
  for (let t = end; t >= 0; t = back[t]) { beatFrames.push(t); if (back[t] < 0) break; }
  beatFrames.reverse();
  // the tracker can lock onto off-beats (hi-hats); the kick and bass usually land on the beat
  if (beatFrames.length > 4) {
    const hp = Math.round(period / 2); let on = 0, offb = 0;
    for (const f of beatFrames) { on += low[f] + (low[f + 1] || 0); offb += (low[f + hp] || 0) + (low[f + hp + 1] || 0); }
    if (offb > on * 1.15) for (let i = 0; i < beatFrames.length; i++) beatFrames[i] += hp;
  }
  let beats = beatFrames.map((f) => (f * H1 + N1 / 2) / sr);
  // extend to cover the whole file
  const dur = x.length / sr, pSec = period / fps;
  while (beats.length && beats[0] - pSec > 0.05) beats.unshift(beats[0] - pSec);
  while (beats.length && beats[beats.length - 1] + pSec < dur) beats.push(beats[beats.length - 1] + pSec);
  if (beats.length < 2) beats = [0, dur];

  // ---------- tuning + chroma ----------
  const N2 = 8192, H2 = 2048;
  const nF2 = Math.max(1, Math.floor((x.length - N2) / H2) + 1);
  const fft2 = makeFFT(N2), w2 = hann(N2), fr2 = new Float64Array(N2), m2 = new Float64Array(N2 / 2 + 1);
  const binHz = sr / N2, kLo = Math.ceil(55 / binHz), kHi = Math.floor(2000 / binHz), kBassHi = Math.floor(220 / binHz);
  const mags = [];
  // tuning: circular mean of peak deviations from the nearest semitone
  let tc = 0, ts = 0;
  for (let f = 0; f < nF2; f++) {
    const o = f * H2;
    for (let i = 0; i < N2; i++) fr2[i] = (x[o + i] || 0) * w2[i];
    fft2(fr2, m2);
    const frame = new Float32Array(kHi + 2);
    for (let k = kLo - 1; k <= kHi + 1; k++) frame[k] = m2[k];
    mags.push(frame);
    if (f % 3 === 0) for (let k = kLo; k <= kHi; k++) {
      if (m2[k] > m2[k - 1] && m2[k] >= m2[k + 1] && m2[k] > 1e-3) {
        const a = m2[k - 1], b = m2[k], c = m2[k + 1], d = 0.5 * (a - c) / (a - 2 * b + c || 1);
        const midi = 69 + 12 * Math.log2(((k + d) * binHz) / 440);
        const dev = midi - Math.round(midi), wgt = Math.log(1 + 100 * b);
        tc += wgt * Math.cos(2 * Math.PI * dev); ts += wgt * Math.sin(2 * Math.PI * dev);
      }
    }
    if (f % 200 === 0) P(0.4 + 0.3 * f / nF2, 'chroma');
  }
  const tuning = Math.atan2(ts, tc) / (2 * Math.PI); // in semitones, -0.5..0.5
  // map spectrum bins to semitones (MIDI 33..96), tuned to the recording
  const M0 = 33, M1 = 96, binMidi = new Int16Array(kHi + 2).fill(-1), binW = new Float32Array(kHi + 2);
  for (let k = kLo; k <= kHi; k++) {
    const midi = 69 + 12 * Math.log2((k * binHz) / 440) - tuning;
    const r = Math.round(midi), d = Math.abs(midi - r);
    if (d < 0.4 && r >= M0 && r <= M1) { binMidi[k] = r; binW[k] = 1 - d * 1.5; }
  }
  const chroma = [], bass = [], energy = [];
  const lm = new Float64Array(kHi + 2), cum = new Float64Array(kHi + 3);
  const sp = new Float64Array(M1 + 1), sal = new Float64Array(M1 + 1);
  for (const fr of mags) {
    // spectral whitening: log magnitude minus its local average, so noise and drums don't flatten the chroma
    for (let k = kLo - 1; k <= kHi + 1; k++) lm[k] = Math.log(1 + 100 * fr[k]);
    cum[kLo - 1] = 0; for (let k = kLo - 1; k <= kHi + 1; k++) cum[k + 1] = cum[k] + lm[k];
    sp.fill(0);
    for (let k = kLo; k <= kHi; k++) {
      const m = binMidi[k]; if (m < 0) continue;
      const half = Math.max(6, Math.round(k * 0.12)), a = Math.max(kLo - 1, k - half), b = Math.min(kHi + 1, k + half);
      const base = (cum[b + 1] - cum[a]) / (b - a + 1);
      const v = Math.max(0, lm[k] - base - 0.25) * binW[k];
      if (v > sp[m]) sp[m] = v;
    }
    // remove overtones: the 2nd, 3rd, 4th and 5th harmonics of lower notes fake extra chord tones
    let e = 0;
    for (let m = M0; m <= M1; m++) {
      let v = sp[m];
      if (m - 12 >= M0) v -= 0.55 * sal[m - 12];
      if (m - 19 >= M0) v -= 0.45 * sal[m - 19];
      if (m - 24 >= M0) v -= 0.3 * sal[m - 24];
      if (m - 28 >= M0) v -= 0.22 * sal[m - 28];
      sal[m] = Math.max(0, v);
    }
    const c = new Float64Array(12), bsx = new Float64Array(12);
    for (let m = M0; m <= M1; m++) { const v = sal[m]; if (!v) continue; const pc = m % 12; c[pc] += v; e += v; if (m <= 55) bsx[pc] += v; }
    chroma.push(c); bass.push(bsx); energy.push(e);
  }
  P(0.75, 'chords');

  // ---------- beat-synchronous features ----------
  const tFrame = (f) => (f * H2 + N2 / 2) / sr;
  const nb = beats.length - 1;
  const bc = [], bb = [], be = [];
  let fIdx = 0;
  for (let i = 0; i < nb; i++) {
    const c = new Float64Array(12), b = new Float64Array(12); let e = 0, n = 0;
    while (fIdx < chroma.length && tFrame(fIdx) < beats[i]) fIdx++;
    let j = fIdx;
    while (j < chroma.length && tFrame(j) < beats[i + 1]) { for (let p = 0; p < 12; p++) { c[p] += chroma[j][p]; b[p] += bass[j][p]; } e += energy[j]; n++; j++; }
    if (!n && chroma.length) { const k = Math.min(chroma.length - 1, Math.max(0, Math.round((beats[i] * sr - N2 / 2) / H2))); for (let p = 0; p < 12; p++) { c[p] = chroma[k][p]; b[p] = bass[k][p]; } e = energy[k]; n = 1; }
    bc.push(c); bb.push(b); be.push(n ? e / n : 0);
  }
  const maxE = Math.max(1e-9, ...be);

  // ---------- chord templates ----------
  const QUAL = [['maj', [0, 4, 7], 0], ['min', [0, 3, 7], 0], ['dom7', [0, 4, 7, 10], 0.07], ['maj7', [0, 4, 7, 11], 0.1], ['m7', [0, 3, 7, 10], 0.07], ['dim', [0, 3, 6], 0.08], ['sus4', [0, 5, 7], 0.08]];
  const states = [];
  QUAL.forEach(([q, iv, pen]) => { for (let r = 0; r < 12; r++) { const t = new Float64Array(12); iv.forEach((i, j) => { t[(r + i) % 12] = j === 0 ? 1 : j === 1 ? 1 : j === 2 ? 0.85 : 0.75; }); states.push({ root: r, q, t, pen }); } });
  states.push({ root: -1, q: 'N', t: null, pen: 0 });
  const norm = (v) => { let s = 0; for (let i = 0; i < 12; i++) s += v[i] * v[i]; return Math.sqrt(s) || 1; };
  states.forEach((s) => { if (s.t) { const n = norm(s.t); for (let i = 0; i < 12; i++) s.t[i] /= n; } });
  const S = states.length;
  const emis = [];
  for (let i = 0; i < nb; i++) {
    const c = bc[i], cmin = Math.min(...c), cc = new Float64Array(12);
    for (let p = 0; p < 12; p++) cc[p] = c[p] - cmin * 0.6;
    const n = norm(cc), b = bb[i], bmax = Math.max(1e-9, ...b);
    const row = new Float64Array(S);
    for (let s = 0; s < S; s++) {
      const st = states[s];
      if (!st.t) { row[s] = be[i] / maxE < 0.08 ? 0.9 : 0.35; continue; }
      let dot = 0; for (let p = 0; p < 12; p++) dot += st.t[p] * cc[p];
      row[s] = dot / n + 0.07 * (b[st.root] / bmax) - st.pen;
    }
    emis.push(row);
  }
  function viterbi(phase) {
    const K = 14, dp = new Float64Array(S), bp = [];
    for (let s = 0; s < S; s++) dp[s] = K * emis[0][s];
    for (let i = 1; i < nb; i++) {
      const pos = phase < 0 ? -1 : ((i - phase) % 4 + 4) % 4;
      const change = pos < 0 ? 4.6 : pos === 0 ? 2.6 : pos === 2 ? 4.4 : 6.0;
      let bestPrev = 0, bestVal = -Infinity;
      for (let s = 0; s < S; s++) if (dp[s] > bestVal) { bestVal = dp[s]; bestPrev = s; }
      const back = new Int16Array(S), nd = new Float64Array(S);
      for (let s = 0; s < S; s++) {
        const stay = dp[s], sw = bestVal - change;
        if (stay >= sw) { nd[s] = stay; back[s] = s; } else { nd[s] = sw; back[s] = bestPrev; }
        nd[s] += K * emis[i][s];
      }
      dp.set(nd); bp.push(back);
    }
    let s = 0; for (let k = 1; k < S; k++) if (dp[k] > dp[s]) s = k;
    const path = new Int16Array(nb); path[nb - 1] = s;
    for (let i = nb - 1; i > 0; i--) { s = bp[i - 1][s]; path[i - 1] = s; }
    return path;
  }
  let path = nb > 1 ? viterbi(-1) : new Int16Array(nb);
  // downbeat phase: where chord changes and bass onsets line up best
  let phase = 0, bestPh = -1;
  for (let ph = 0; ph < 4; ph++) {
    let s = 0;
    for (let i = 1; i < nb; i++) if (((i - ph) % 4 + 4) % 4 === 0) { if (path[i] !== path[i - 1]) s += 2; s += 0.3 * norm(bb[i]) / (norm(bb[i - 1]) + 1e-9); }
    if (s > bestPh) { bestPh = s; phase = ph; }
  }
  if (nb > 1) path = viterbi(phase);
  P(0.92, 'key');

  // ---------- key ----------
  const MAJ = [6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88], MIN = [6.33, 2.68, 3.52, 5.38, 2.6, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17];
  const tot = new Float64Array(12);
  for (let i = 0; i < nb; i++) { const st = states[path[i]]; if (st.t) for (let p = 0; p < 12; p++) tot[p] += st.t[p]; }
  const corr = (a, b) => { const ma = a.reduce((s, v) => s + v, 0) / 12, mb = b.reduce((s, v) => s + v, 0) / 12; let n = 0, da = 0, db = 0; for (let i = 0; i < 12; i++) { n += (a[i] - ma) * (b[i] - mb); da += (a[i] - ma) ** 2; db += (b[i] - mb) ** 2; } return n / Math.sqrt(da * db || 1); };
  let key = { pc: 0, minor: false, conf: -2 };
  for (let r = 0; r < 12; r++) {
    const rot = (prof) => { const o = new Array(12); for (let i = 0; i < 12; i++) o[(i + r) % 12] = prof[i]; return o; };
    const cM = corr(tot, rot(MAJ)), cm = corr(tot, rot(MIN));
    if (cM > key.conf) key = { pc: r, minor: false, conf: cM };
    if (cm > key.conf) key = { pc: r, minor: true, conf: cm };
  }
  const chords = Array.from(path, (s) => ({ root: states[s].root, q: states[s].q }));
  P(1, 'done');
  return { bpm: Math.round(bpm * 10) / 10, beats, phase, chords, key, tuning, duration: dur };
}
if (typeof self !== 'undefined' && typeof window === 'undefined') {
  self.onmessage = (e) => {
    try {
      const r = acordeAnalyze(e.data.x, e.data.sr, (v, m) => self.postMessage({ progress: v, stage: m }));
      self.postMessage({ result: r });
    } catch (err) { self.postMessage({ error: String(err && err.message || err) }); }
  };
}
if (typeof module !== 'undefined') module.exports = { acordeAnalyze };
