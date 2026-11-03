// Acorde 3D piano — WebGL piano in four styles (stage, grand, upright, Rhodes-style electric)
// with physical key motion, studio lighting, per-key colors and spark bursts.
(function () {
  function init(host, opts) {
    const THREE = window.THREE;
    if (!THREE) return null;
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' }); } catch (e) { return null; }
    if (!renderer || !renderer.getContext()) return null;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(11, 2.9, 20, 4000);

    // ---------- studio environment for reflections ----------
    (function env() {
      const s = new THREE.Scene();
      const room = new THREE.Mesh(new THREE.BoxGeometry(60, 30, 60), new THREE.MeshBasicMaterial({ color: 0x121418, side: THREE.BackSide }));
      room.position.y = 10; s.add(room);
      const panel = (w, h, c, k, pos, rot) => {
        const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide }));
        m.position.set(pos[0], pos[1], pos[2]); m.rotation.set(rot[0], rot[1], rot[2]); s.add(m);
      };
      panel(34, 10, 0xffffff, 6, [0, 24.9, -2], [Math.PI / 2, 0, 0]);
      panel(3, 22, 0xdbe6ff, 4, [-29.9, 12, 0], [0, Math.PI / 2, 0]);
      panel(3, 22, 0xffe4c8, 3, [29.9, 12, 0], [0, -Math.PI / 2, 0]);
      panel(46, 4, 0xffffff, 1.8, [0, 8, 29.9], [0, Math.PI, 0]);
      const pm = new THREE.PMREMGenerator(renderer);
      const A = window.ACORDE_ASSETS;
      let done = false;
      if (false && A && A.hdr) {
        try {
          const bin = atob(A.hdr); const buf = new Uint8Array(bin.length);
          for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
          const tex = new THREE.DataTexture(new Uint16Array(buf.buffer), 512, 256, THREE.RGBAFormat, THREE.HalfFloatType);
          tex.mapping = THREE.EquirectangularReflectionMapping; tex.colorSpace = THREE.LinearSRGBColorSpace;
          tex.magFilter = THREE.LinearFilter; tex.minFilter = THREE.LinearFilter; tex.generateMipmaps = false; tex.needsUpdate = true;
          scene.environment = pm.fromEquirectangular(tex).texture; done = true;
        } catch (e) { done = false; }
      }
      if (!done) scene.environment = pm.fromScene(s, 0.035).texture;
      pm.dispose();
    })();

    // ---------- textures ----------
    function canvasTex(w, h, draw, srgb = true) {
      const c = document.createElement('canvas'); c.width = w; c.height = h;
      draw(c.getContext('2d'), w, h);
      const t = new THREE.CanvasTexture(c); if (srgb) t.colorSpace = THREE.SRGBColorSpace; return t;
    }
    const glowTex = canvasTex(128, 128, (g, w, h) => {
      const r = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
      r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(0.25, 'rgba(255,255,255,.55)'); r.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = r; g.fillRect(0, 0, w, h);
    });
    const aoTex = canvasTex(256, 128, (g, w, h) => {
      g.filter = 'blur(14px)'; g.fillStyle = 'rgba(0,0,0,.9)';
      g.beginPath(); g.roundRect ? g.roundRect(24, 22, w - 48, h - 44, 20) : g.rect(24, 22, w - 48, h - 44); g.fill();
    });
    const woodTex = canvasTex(1024, 256, (g, w, h) => {
      g.fillStyle = '#5a321b'; g.fillRect(0, 0, w, h);
      for (let i = 0; i < 260; i++) {
        const y = Math.random() * h, a = 0.04 + Math.random() * 0.12, dark = Math.random() < 0.6;
        g.strokeStyle = dark ? `rgba(30,14,6,${a})` : `rgba(160,96,52,${a})`; g.lineWidth = 0.6 + Math.random() * 2.2;
        g.beginPath(); g.moveTo(0, y);
        for (let x = 0; x <= w; x += 32) g.lineTo(x, y + Math.sin(x * 0.008 + i) * 4 + Math.sin(x * 0.03 + i * 2) * 1.5);
        g.stroke();
      }
    });
    woodTex.wrapS = woodTex.wrapT = THREE.RepeatWrapping;
    const tolexTex = canvasTex(256, 256, (g, w, h) => {
      const img = g.createImageData(w, h);
      for (let i = 0; i < img.data.length; i += 4) { const v = 110 + Math.random() * 120; img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255; }
      g.putImageData(img, 0, 0); g.filter = 'blur(1px)'; g.drawImage(g.canvas, 0, 0);
    }, false);
    tolexTex.wrapS = tolexTex.wrapT = THREE.RepeatWrapping; tolexTex.repeat.set(8, 8);
    function textTex(lines, w, h) {
      return canvasTex(w, h, (g) => { lines.forEach((l) => { g.font = l.font; g.fillStyle = l.color; g.textBaseline = 'middle'; g.textAlign = l.align || 'left'; if (l.ls) g.letterSpacing = l.ls; g.fillText(l.text, l.x, l.y); }); });
    }

    const TL = new THREE.TextureLoader();
    function imgTex(key, rep, srgb) {
      const A = window.ACORDE_ASSETS; if (!A || !A[key]) return null;
      const t = TL.load(A[key]); t.wrapS = t.wrapT = THREE.RepeatWrapping; if (rep) t.repeat.set(rep[0], rep[1]);
      if (srgb) t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
    }
    const floorMap = imgTex('floor', [9, 6], true), floorN = imgTex('floorN', [9, 6]);

    // ---------- materials ----------
    const M = {
      white: new THREE.MeshPhysicalMaterial({ color: 0xf6f5f0, roughness: 0.3, clearcoat: 0.35, clearcoatRoughness: 0.22, envMapIntensity: 0.9 }),
      black: new THREE.MeshPhysicalMaterial({ color: 0x0b0b0d, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.1, envMapIntensity: 1.1 }),
      gloss: new THREE.MeshPhysicalMaterial({ color: 0x0c0d10, roughness: 0.42, clearcoat: 1, clearcoatRoughness: 0.12, envMapIntensity: 1.2 }),
      gunmetal: new THREE.MeshPhysicalMaterial({ color: 0x3a3d43, metalness: 1, roughness: 0.32, clearcoat: 0.6, clearcoatRoughness: 0.15, envMapIntensity: 1.2 }),
      panel: new THREE.MeshStandardMaterial({ color: 0x1b1d21, metalness: 0.9, roughness: 0.45, envMapIntensity: 1.0 }),
      knob: new THREE.MeshStandardMaterial({ color: 0xd7dade, metalness: 1, roughness: 0.28, envMapIntensity: 1.3 }),
      knobTop: new THREE.MeshPhysicalMaterial({ color: 0x0c0d0f, roughness: 0.3, clearcoat: 1 }),
      bezel: new THREE.MeshPhysicalMaterial({ color: 0x020203, roughness: 0.08, clearcoat: 1, clearcoatRoughness: 0.02, envMapIntensity: 1.5 }),
      felt: new THREE.MeshStandardMaterial({ color: 0x5a1520, roughness: 0.95 })
    };

    // ---------- key geometry (cm) ----------
    const WW = 2.35, WL = 15, WH = 1.6, BW = 1.3, BL = 9.5;
    const isBlack = (n) => [1, 3, 6, 8, 10].includes(n % 12);
    function extrude(shape, width, bevel) {
      const depth = width - 2 * bevel;
      const g = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 3, steps: 1, curveSegments: 8 });
      g.rotateY(Math.PI / 2); g.translate(-depth / 2, 0, 0); return g;
    }
    const ws = new THREE.Shape();
    ws.moveTo(0, -WH); ws.lineTo(0, -0.32); ws.quadraticCurveTo(0, -0.04, 0.28, -0.04); ws.lineTo(WL, -0.04); ws.lineTo(WL, -WH); ws.closePath();
    const whiteGeo = extrude(ws, WW - 0.14, 0.045);
    const bs = new THREE.Shape();
    bs.moveTo(0, -0.7); bs.lineTo(0.5, 1.02); bs.quadraticCurveTo(0.6, 1.2, 0.86, 1.2); bs.lineTo(BL, 1.2); bs.lineTo(BL, -0.7); bs.closePath();
    const blackGeo = extrude(bs, BW, 0.08);
    const SHIFT = { 1: -0.12, 3: 0.12, 6: -0.14, 8: 0, 10: 0.14 };

    // ---------- helpers ----------
    function slab(x0, x1, z0, z1, y0, y1, r, b = 0.22) {
      const s = new THREE.Shape(); const w = x1 - x0, d = z1 - z0, yy = -z1;
      r = Math.min(r, w / 2 - 0.01, d / 2 - 0.01);
      s.moveTo(x0 + r, yy); s.lineTo(x0 + w - r, yy); s.quadraticCurveTo(x0 + w, yy, x0 + w, yy + r);
      s.lineTo(x0 + w, yy + d - r); s.quadraticCurveTo(x0 + w, yy + d, x0 + w - r, yy + d);
      s.lineTo(x0 + r, yy + d); s.quadraticCurveTo(x0, yy + d, x0, yy + d - r); s.lineTo(x0, yy + r); s.quadraticCurveTo(x0, yy, x0 + r, yy);
      const g = new THREE.ExtrudeGeometry(s, { depth: Math.max(0.05, y1 - y0 - 2 * b), bevelEnabled: true, bevelThickness: b, bevelSize: b, bevelSegments: 5, curveSegments: 14 });
      g.rotateX(-Math.PI / 2); g.translate(0, y0 + b, 0); return g;
    }
    const mesh = (g, m, parent, cast = true) => { const o = new THREE.Mesh(g, m); o.castShadow = cast; o.receiveShadow = true; parent.add(o); return o; };
    const box = (w, h, d, m, x, y, z, parent) => { const o = mesh(new THREE.BoxGeometry(w, h, d), m, parent); o.position.set(x, y, z); return o; };
    function rod(a, b, r, m, parent) {
      const dir = new THREE.Vector3().subVectors(b, a); const len = dir.length();
      const o = mesh(new THREE.CylinderGeometry(r, r, len, 20), m, parent);
      o.position.copy(a).addScaledVector(dir, 0.5); o.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize()); return o;
    }
    function label(tex, w, h, parent, pos, rotX = -Math.PI / 2) {
      const o = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false }));
      o.rotation.x = rotX; o.position.copy(pos); parent.add(o); return o;
    }

    // ---------- floor ----------
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(1200, 800), new THREE.ShadowMaterial({ opacity: 0.38 }));
    floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
    const ao = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: aoTex, transparent: true, depthWrite: false, opacity: 0.8 }));
    ao.rotation.x = -Math.PI / 2; scene.add(ao);

    // ---------- lights ----------
    scene.add(new THREE.HemisphereLight(0xdfe7ff, 0x0a0a0c, 0.35));
    const sun = new THREE.DirectionalLight(0xffffff, 2.3);
    scene.add(sun, sun.target);
    sun.castShadow = true; sun.shadow.mapSize.set(4096, 2048); sun.shadow.bias = -0.0005; sun.shadow.normalBias = 0.04; sun.shadow.radius = 3;
    const rim = new THREE.DirectionalLight(0xbfd2ff, 0.8); rim.position.set(30, 25, -60); scene.add(rim);

    // ---------- state ----------
    let keys = new Map(), keyMeshes = [], X0 = 0, root = null, ledGlow = null;
    let displayTex = null, displayCanvas = null, displayText = 'ACORDE', displaySub = 'PLAY A CHORD';
    function drawDisplay() {
      if (!displayCanvas) return;
      const g = displayCanvas.getContext('2d'), w = displayCanvas.width, h = displayCanvas.height;
      g.fillStyle = '#02060a'; g.fillRect(0, 0, w, h);
      g.fillStyle = 'rgba(120,200,255,.045)'; for (let y = 0; y < h; y += 4) g.fillRect(0, y, w, 1);
      g.textBaseline = 'middle'; g.textAlign = 'center';
      g.shadowColor = 'rgba(120,210,255,.85)'; g.shadowBlur = 16;
      g.fillStyle = '#dcf4ff'; g.font = '600 96px "Schibsted Grotesk", "Segoe UI", sans-serif'; g.fillText(displayText, w / 2, h * 0.42);
      g.shadowBlur = 6; g.fillStyle = 'rgba(150,215,255,.7)'; g.font = '500 30px "JetBrains Mono", monospace'; g.fillText(displaySub, w / 2, h * 0.84);
      if (displayTex) displayTex.needsUpdate = true;
    }
    function setDisplay(text, sub) { text = text || 'ACORDE'; sub = sub || ''; if (text === displayText && sub === displaySub) return; displayText = text; displaySub = sub; drawDisplay(); }
    const fitBox = new THREE.Box3();
    let view = null;
    let floorY = -5.2, elev = 33 * Math.PI / 180;
    const lastLit = new Map();

    function buildKeys(lo, hi, parent) {
      keys = new Map(); keyMeshes = [];
      const whites = []; for (let n = lo; n <= hi; n++) if (!isBlack(n)) whites.push(n);
      const TW = whites.length * WW; X0 = -TW / 2;
      for (let n = lo; n <= hi; n++) {
        const black = isBlack(n);
        const x = !black ? X0 + (whites.indexOf(n) + 0.5) * WW : X0 + (whites.indexOf(n - 1) + 1) * WW + SHIFT[n % 12] * BW;
        const L = black ? BL : WL;
        const pivot = new THREE.Group(); pivot.position.set(x, 0, -WL);
        const mat = (black ? M.black : M.white).clone();
        const m = new THREE.Mesh(black ? blackGeo : whiteGeo, mat);
        m.position.z = L; m.castShadow = true; m.receiveShadow = true; m.userData.n = n;
        pivot.add(m); parent.add(pivot); keyMeshes.push(m);
        const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: 0x4a7bff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
        glow.position.set(0, black ? 0.6 : -0.6, L + (black ? 0.2 : 0.4)); glow.scale.set(black ? 3.2 : 4.2, black ? 2.6 : 3, 1);
        pivot.add(glow);
        keys.set(n, { n, black, x, L, pivot, mesh: m, mat, glow, base: (black ? M.black : M.white).color.clone(),
          lit: 0, litT: 0, col: new THREE.Color(0x4a7bff), press: 0, pressT: 0, hover: 0, hoverT: 0, label: null, labelText: '' });
      }
      const felt = new THREE.Mesh(new THREE.BoxGeometry(TW + 0.4, 0.35, 0.5), M.felt);
      felt.position.set(0, -0.05, -WL - 0.1); parent.add(felt);
      return { whites, TW };
    }

    // ---------- piano bodies ----------
    const BUILDERS = {
      stage(g) {
        buildKeys(21, 108, g);
        const SIDE = 3.4, XL = X0 - SIDE, XR = -X0 + SIDE, BACK = -25.5, FRONT = 1.8, F = -5.2;
        mesh(slab(XL, XR, BACK, FRONT, F, -1.75, 2.2), M.gloss, g);
        mesh(slab(XL, XR, BACK, -WL - 0.35, F, 2.4, 1.6), M.gloss, g);
        mesh(slab(XL, X0 - 0.2, BACK, FRONT, F, 0.9, 1.6), M.gloss, g);
        mesh(slab(-X0 + 0.2, XR, BACK, FRONT, F, 0.9, 1.6), M.gloss, g);
        label(textTex([{ text: 'ACORDE', x: 8, y: 64, font: '600 54px "Schibsted Grotesk", sans-serif', color: 'rgba(205,210,220,.78)', ls: '18px' },
          { text: '88 · CHORD READER', x: 330, y: 66, font: '500 30px "JetBrains Mono", monospace', color: 'rgba(205,210,220,.4)' }], 1024, 128), 26, 3.25, g, new THREE.Vector3(X0 + 15, 2.42, -20.6));
        const led = new THREE.Mesh(new THREE.CircleGeometry(0.22, 20), new THREE.MeshBasicMaterial({ color: 0x47ff9a }));
        led.rotation.x = -Math.PI / 2; led.position.set(-X0 - 4, 2.43, -20.6); g.add(led);
        ledGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: 0x47ff9a, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false }));
        ledGlow.position.copy(led.position).add(new THREE.Vector3(0, 0.1, 0)); ledGlow.scale.set(2.2, 2.2, 1); g.add(ledGlow);
        return { floor: F, elev: 33, box: [XL, F, BACK, XR, 12, FRONT], ao: [XR - XL + 16, FRONT - BACK + 12, (BACK + FRONT) / 2] };
      }
    };

    // ---------- camera ----------
    const target = new THREE.Vector3();
    let dist = 400;
    function placeCamera(y, el) {
      camera.position.set(target.x + Math.sin(y) * Math.cos(el) * dist, target.y + Math.sin(el) * dist, target.z + Math.cos(y) * Math.cos(el) * dist);
      camera.lookAt(target);
    }

    // ---------- sparks (declared before first build so the camera fit can size them) ----------
    const MAXP = 2000;
    const pPos = new Float32Array(MAXP * 3), pCol = new Float32Array(MAXP * 3), pVel = new Float32Array(MAXP * 3), pLife = new Float32Array(MAXP), pMax = new Float32Array(MAXP), pBase = new Float32Array(MAXP * 3), pAlpha = new Float32Array(MAXP);
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3)); pGeo.setAttribute('pcolor', new THREE.BufferAttribute(pCol, 3)); pGeo.setAttribute('palpha', new THREE.BufferAttribute(pAlpha, 1));
    const sparkVS = `attribute vec3 pcolor; attribute float palpha; uniform float uSize; uniform float uScale; varying vec3 vC; varying float vA;
      void main(){ vC = pcolor; vA = palpha; vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_PointSize = palpha > 0.0 ? uSize * uScale / -mv.z : 0.0; gl_Position = projectionMatrix * mv; }`;
    const sparkFS = `uniform float uCore; varying vec3 vC; varying float vA;
      void main(){ float r = length(gl_PointCoord - 0.5) * 2.0; if (r > 1.0) discard;
        float a = uCore > 0.5 ? smoothstep(1.0, 0.45, r) : pow(1.0 - r, 2.2);
        gl_FragColor = vec4(vC * (uCore > 0.5 ? 1.0 : 1.4), vA * a); }`;
    const sparkMat = (size, core) => new THREE.ShaderMaterial({ uniforms: { uSize: { value: size }, uScale: { value: 600 }, uCore: { value: core ? 1 : 0 } },
      vertexShader: sparkVS, fragmentShader: sparkFS, transparent: true, depthWrite: false, blending: core ? THREE.NormalBlending : THREE.AdditiveBlending });
    const sparkGlowMat = sparkMat(1.15, false), sparkCoreMat = sparkMat(0.32, true);
    const glowPts = new THREE.Points(pGeo, sparkGlowMat), corePts = new THREE.Points(pGeo, sparkCoreMat);
    glowPts.frustumCulled = corePts.frustumCulled = false; corePts.renderOrder = 2; glowPts.renderOrder = 3;
    scene.add(corePts, glowPts);
    let pNext = 0;
    for (let i = 0; i < MAXP; i++) pPos[i * 3 + 1] = -999;
    function burst(x, y, z, col, count, o) {
      for (let c = 0; c < count; c++) {
        const i = pNext; pNext = (pNext + 1) % MAXP;
        pPos[i * 3] = x + (Math.random() - 0.5) * o.width; pPos[i * 3 + 1] = y; pPos[i * 3 + 2] = z + (Math.random() - 0.5) * o.depth;
        const a = Math.random() * Math.PI * 2, s = Math.random() * o.spread;
        pVel[i * 3] = Math.cos(a) * s; pVel[i * 3 + 1] = o.up[0] + Math.random() * (o.up[1] - o.up[0]); pVel[i * 3 + 2] = Math.sin(a) * s * 0.5 + o.toward * Math.random();
        pMax[i] = pLife[i] = o.life * (0.45 + Math.random() * 0.75);
        pBase[i * 3] = col.r; pBase[i * 3 + 1] = col.g; pBase[i * 3 + 2] = col.b;
      }
    }
    const sparkGold = new THREE.Color(0xff8a1f);
    const white = new THREE.Color(0xffffff), tmp = new THREE.Color();
    let moodColor = new THREE.Color(0x4a7bff);
    const flashes = [];
    function keySparks(k, vel) {
      const v = Math.max(0.25, (vel || 90) / 127);
      const col = sparkGold.clone().lerp(moodColor, 0.25);
      const y = k.black ? 1.35 : 0.12, z = k.black ? -WL + BL - 1.2 : -1.8;
      burst(k.x, y, z, col, Math.round(18 + v * 46), { spread: 4 + v * 7, up: [5 + v * 6, 12 + v * 16], toward: 4 + v * 6, width: k.black ? 0.9 : 1.6, depth: 1.6, life: 0.75 + v * 0.5 });
      const f = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: col.clone().lerp(white, 0.5), transparent: true, opacity: 1, blending: THREE.AdditiveBlending, depthWrite: false }));
      f.position.set(k.x, y + 0.3, z); f.scale.set(0.1, 0.1, 1); scene.add(f);
      flashes.push({ f, t: 0, size: 5 + v * 7 });
    }


    function fitCamera() {
      const w = host.clientWidth, h = host.clientHeight; if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
      if (view) {
        target.set(view.target[0], view.target[1], view.target[2]);
        const hf = Math.atan(Math.tan((camera.fov / 2) * Math.PI / 180) * camera.aspect);
        dist = view.halfW / Math.tan(hf) + view.halfW * 0.05;
        const sc0 = (h * renderer.getPixelRatio() / 2) / Math.tan((camera.fov / 2) * Math.PI / 180);
        sparkGlowMat.uniforms.uScale.value = sc0; sparkCoreMat.uniforms.uScale.value = sc0;
        return;
      }
      fitBox.getCenter(target);
      const a = fitBox.min, b = fitBox.max, corners = [];
      for (const x of [a.x, b.x]) for (const y of [a.y, b.y]) for (const z of [a.z, b.z]) corners.push(new THREE.Vector3(x, y, z));
      dist = 600;
      for (let it = 0; it < 10; it++) {
        placeCamera(0, elev); camera.updateMatrixWorld(true);
        let m = 0;
        for (const p of corners) { const v = p.clone().project(camera); m = Math.max(m, Math.abs(v.x) / 0.95, Math.abs(v.y) / 0.88); }
        dist *= 0.35 + 0.65 * m;
      }
      const sc = (h * renderer.getPixelRatio() / 2) / Math.tan((camera.fov / 2) * Math.PI / 180);
      sparkGlowMat.uniforms.uScale.value = sc; sparkCoreMat.uniforms.uScale.value = sc;
    }

    function build(st) {
      if (!BUILDERS[st]) st = 'stage';
      if (root) { scene.remove(root); root.traverse((o) => { if (o.geometry && o.geometry !== whiteGeo && o.geometry !== blackGeo) o.geometry.dispose(); }); }
      root = new THREE.Group(); scene.add(root); ledGlow = null;
      const info = BUILDERS[st](root);
      floorY = info.floor; elev = info.elev * Math.PI / 180; view = info.view || null;
      floor.position.y = floorY - 0.01;
      ao.scale.set(info.ao[0], info.ao[1], 1); ao.position.set(0, floorY + 0.01, info.ao[2]);
      const [x0, y0, z0, x1, y1, z1] = info.box; fitBox.set(new THREE.Vector3(x0, y0, z0), new THREE.Vector3(x1, y1, z1));
      const span = Math.max(x1 - x0, z1 - z0, y1 - floorY) * 0.75;
      sun.position.set(-40, 170, 80); sun.target.position.set(0, 0, (z0 + z1) / 2);
      Object.assign(sun.shadow.camera, { left: -span, right: span, top: span * 0.75, bottom: -span * 0.75, near: 10, far: 600 });
      sun.shadow.camera.updateProjectionMatrix();
      fitCamera();
      if (lastLit.size) setLit([...lastLit.values()]);
      intro();
    }

    // ---------- labels on keys ----------
    const labelCache = new Map();
    function labelTex(text, dark) {
      const key = text + (dark ? 'd' : 'l');
      if (labelCache.has(key)) return labelCache.get(key);
      const t = canvasTex(128, 64, (g, w, h) => {
        g.font = '800 62px "Schibsted Grotesk", "Segoe UI", sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
        g.fillStyle = dark ? 'rgba(10,14,30,1)' : 'rgba(255,255,255,1)'; g.fillText(text, w / 2, h / 2 + 2);
      });
      t.anisotropy = 4; labelCache.set(key, t); return t;
    }
    function setLabel(k, text) {
      if (!text) { if (k.label) k.label.visible = false; k.labelText = ''; return; }
      if (!k.label) {
        k.label = new THREE.Mesh(new THREE.PlaneGeometry(k.black ? 1.3 : 2.3, k.black ? 0.65 : 1.15), new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false }));
        k.label.rotation.x = -Math.PI / 2;
        k.label.position.set(0, k.black ? 1.32 : 0.06, k.black ? k.L - 1.3 : k.L - 1.6);
        k.pivot.add(k.label);
      }
      if (k.labelText !== text) { k.label.material.map = labelTex(text, !k.black); k.label.material.needsUpdate = true; k.labelText = text; }
      k.label.visible = true;
    }

    // ---------- public setters ----------
    function setLit(list) {
      lastLit.clear(); list.forEach((x) => lastLit.set(x.n, x));
      keys.forEach((k, n) => {
        const x = lastLit.get(n);
        k.litT = x ? 1 : 0;
        if (x) k.col.set(x.color || '#4a7bff');
        setLabel(k, x ? x.label : '');
      });
    }
    let pressedSet = new Set();
    function setPressed(set) { pressedSet = new Set(set); keys.forEach((k, n) => { k.pressT = set.has(n) ? 1 : 0; }); }
    function trailOn(n, vel) { const k = keys.get(n); if (k) keySparks(k, vel); }
    function trailOff() {}
    function tap(n) { trailOn(n, 90); }
    function setMood(hue) { moodColor = new THREE.Color().setHSL(hue / 360, 0.85, 0.58); }
    const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    function intro() {
      if (reduce) return;
      const list = [...keys.values()].filter((k) => !k.black);
      list.forEach((k, i) => setTimeout(() => { if (k.pressT) return; k.pressT = 0.55; setTimeout(() => { if (k.pressT === 0.55) k.pressT = pressedSet.has(k.n) ? 1 : 0; }, 120); }, 200 + i * 14));
    }

    // ---------- interaction ----------
    const ray = new THREE.Raycaster(); const ndc = new THREE.Vector2();
    function pick(e) {
      const r = renderer.domElement.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      const hit = ray.intersectObjects(keyMeshes, false)[0];
      return hit ? hit.object.userData.n : null;
    }
    let hovered = null, parX = 0, parY = 0, parXT = 0, parYT = 0, downN = null;
    const release = () => { if (downN != null) { const n = downN; downN = null; opts.onKeyUp && opts.onKeyUp(n); } };
    renderer.domElement.addEventListener('pointerdown', (e) => {
      const n = pick(e); if (n == null) return;
      e.preventDefault(); release(); downN = n;
      try { renderer.domElement.setPointerCapture(e.pointerId); } catch (err) {}
      opts.onKey && opts.onKey(n);
    });
    renderer.domElement.addEventListener('pointerup', release);
    renderer.domElement.addEventListener('pointercancel', release);
    window.addEventListener('blur', release);
    renderer.domElement.addEventListener('pointermove', (e) => {
      const r = renderer.domElement.getBoundingClientRect();
      parXT = ((e.clientX - r.left) / r.width - 0.5); parYT = ((e.clientY - r.top) / r.height - 0.5);
      const n = pick(e);
      if (n !== hovered) { const h = keys.get(hovered); if (h) h.hoverT = 0; hovered = n; const k = keys.get(n); if (k) k.hoverT = 1; renderer.domElement.style.cursor = n != null ? 'pointer' : 'default'; }
    });
    renderer.domElement.addEventListener('pointerleave', () => { const h = keys.get(hovered); if (h) h.hoverT = 0; hovered = null; parXT = 0; parYT = 0; });

    new ResizeObserver(fitCamera).observe(host);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawDisplay);
    build(opts.style || 'stage');

    // ---------- loop ----------
    const clock = new THREE.Clock(); let visible = true;
    new IntersectionObserver((en) => { visible = en[0].isIntersecting; }).observe(host);
    function frame() {
      requestAnimationFrame(frame);
      const dt = Math.min(clock.getDelta(), 0.05);
      if (!visible || document.hidden) return;
      const t = clock.elapsedTime;
      parX += (parXT - parX) * Math.min(1, dt * 3); parY += (parYT - parY) * Math.min(1, dt * 3);
      const yaw = reduce ? 0 : parX * 0.07 + Math.sin(t * 0.15) * 0.008;
      placeCamera(yaw, elev + (reduce ? 0 : parY * 0.04));
      keys.forEach((k) => {
        const pr = k.pressT > k.press ? 30 : 16;
        k.press += (k.pressT - k.press) * Math.min(1, dt * pr);
        k.pivot.rotation.x = k.press * (k.black ? 0.085 : 0.062);
        if (k.litT === 0) k.lit = 0; else k.lit += (k.litT - k.lit) * Math.min(1, dt * 14);
        k.hover += (k.hoverT - k.hover) * Math.min(1, dt * 12);
        if (k.lit > 0.002 || k.hover > 0.002) {
          if (k.black) { k.mat.color.copy(k.base).lerp(k.col, k.lit * 0.55); k.mat.emissive.copy(k.col).multiplyScalar(k.lit * 0.75).add(tmp.copy(white).multiplyScalar(k.hover * 0.05)); }
          else { k.mat.color.copy(k.base).lerp(tmp.copy(k.col).lerp(white, 0.22), k.lit * 0.9); k.mat.emissive.copy(k.col).multiplyScalar(k.lit * 0.38).add(tmp.copy(white).multiplyScalar(k.hover * 0.02)); }
          k.glow.material.color.copy(k.col); k.glow.material.opacity = k.lit * (k.black ? 0.75 : 0.6);
        } else if (k.mat.emissive.r || k.mat.emissive.g || k.mat.emissive.b || k.glow.material.opacity) { k.mat.color.copy(k.base); k.mat.emissive.setRGB(0, 0, 0); k.glow.material.opacity = 0; }
      });
      const drag = Math.exp(-dt * 1.6);
      for (let i = 0; i < MAXP; i++) {
        if (pLife[i] <= 0) continue;
        pLife[i] -= dt;
        pVel[i * 3 + 1] -= 26 * dt; pVel[i * 3] *= drag; pVel[i * 3 + 2] *= drag;
        pPos[i * 3] += pVel[i * 3] * dt; pPos[i * 3 + 1] += pVel[i * 3 + 1] * dt; pPos[i * 3 + 2] += pVel[i * 3 + 2] * dt;
        if (pPos[i * 3 + 1] < 0.1 && pVel[i * 3 + 1] < 0 && pPos[i * 3 + 2] > -WL && pPos[i * 3 + 2] < 0.4 && Math.abs(pPos[i * 3]) < -X0) {
          pPos[i * 3 + 1] = 0.1; pVel[i * 3 + 1] *= -0.38; pVel[i * 3] *= 0.7; pVel[i * 3 + 2] *= 0.7;
        }
        const r = Math.max(0, pLife[i] / pMax[i]);
        const heat = r * r * r, flick = 0.75 + Math.random() * 0.5;
        pCol[i * 3] = pBase[i * 3] + (1 - pBase[i * 3]) * heat * 0.7;
        pCol[i * 3 + 1] = pBase[i * 3 + 1] + (1 - pBase[i * 3 + 1]) * heat * 0.7;
        pCol[i * 3 + 2] = pBase[i * 3 + 2] + (1 - pBase[i * 3 + 2]) * heat * 0.7;
        pAlpha[i] = Math.min(1, Math.min(1, r * 1.6) * flick);
        if (pLife[i] <= 0) { pPos[i * 3 + 1] = -999; pAlpha[i] = 0; }
      }
      pGeo.attributes.position.needsUpdate = true; pGeo.attributes.pcolor.needsUpdate = true; pGeo.attributes.palpha.needsUpdate = true;
      for (let i = flashes.length - 1; i >= 0; i--) {
        const fl = flashes[i]; fl.t += dt;
        const q = fl.t / 0.28;
        if (q >= 1) { scene.remove(fl.f); fl.f.material.dispose(); flashes.splice(i, 1); continue; }
        const s = fl.size * (0.3 + 0.7 * Math.sqrt(q));
        fl.f.scale.set(s, s * 0.7, 1); fl.f.material.opacity = (1 - q) * (1 - q);
      }
      if (ledGlow) ledGlow.material.opacity = 0.45 + Math.sin(t * 2) * 0.08;
      renderer.render(scene, camera);
    }
    frame();

    return { setLit, setPressed, trailOn, trailOff, tap, setMood, setStyle: build, setDisplay, canvas: renderer.domElement };
  }
  window.Piano3D = { init };
})();
