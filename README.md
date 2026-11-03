# Acorde: chord reader

Play a chord and Acorde names it. Acorde works with a MIDI keyboard, your computer keyboard or the mouse. It shows the chord on a grand staff, a 3D piano and a guitar or bass fretboard. Everything is in English and Spanish.

**Try it:** https://efixwa.github.io/acorde/. You can also download `index.html` and open it in Chrome or Edge.

## Features

- **Chord naming.** Names triads, sevenths, extended and altered chords, slash chords and inversions. Also shows the Roman numeral in your key and other names for the same notes.
- **MIDI input.** Includes sustain pedal support. Tested with a Yamaha MODX.
- **3D stage piano.** Keys light up and give off sparks as you play. Colors for the left and right hand are adjustable.
- **Guitar and bass fretboard.** Shows the exact voicing you played as one playable shape. Acoustic, electric and simple looks.
- **Progressions.** Classical, jazz, pop and salsa progressions in any key, with playback.
- **Chord dictionary.** Guitar, ukulele and piano shapes, with a PDF chord chart.
- **Song analysis.** Drop in an audio file. Acorde finds the tempo, key and chords, then plays them back with a bar grid, loop, speed, transpose and capo.
- **Lyrics.** Finds synced lyrics from [LRCLIB](https://lrclib.net), or you can paste them. Exports a chord sheet PDF with the chords placed over the words.

## Using it

Open `index.html` in Chrome or Edge. Firefox has no Web MIDI support. Click **Connect keyboard** to use a MIDI keyboard. For a USB keyboard such as the MODX, set its MIDI In/Out to **USB**. Close other music programs, because on Windows only one program can use the keyboard at a time.

## Editing

`index.html` is one self-contained file. It is built from the parts in `src/`:

| File | What it does |
|---|---|
| `src/engine.js` | chord identification engine |
| `src/app.js` | user interface, sound, progressions, dictionary, song analysis UI, lyrics |
| `src/piano3d.js` | 3D piano (three.js) |
| `src/analyzer.js` | audio analysis (beats, key, chords), runs in a Web Worker |
| `src/head.html`, `src/body.html` | styles and page markup |

After editing, rebuild with:

```
cd src
python build.py
```

The page loads three.js, GSAP and jsPDF from public CDNs.

## License

MIT. Use it, change it and share it however you like.

---

# Acorde: lector de acordes (español)

Toca un acorde y Acorde te dice su nombre. Funciona con un teclado MIDI, el teclado de la computadora o el mouse. Muestra el acorde en el pentagrama, en un piano 3D y en el diapasón de guitarra o bajo. Incluye progresiones, diccionario de acordes, análisis de canciones y letras sincronizadas. Para usarlo, abre `index.html` en Chrome o Edge. Licencia MIT: úsalo y modifícalo como quieras.
