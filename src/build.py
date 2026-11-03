# Builds ../index.html from the parts in this folder:  python build.py
h=open('head.html').read(); b=open('body.html').read(); eng=open('engine.js').read(); a=open('app.js').read(); p=open('piano3d.js').read()
html=h+b+'\n<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js"></script>\n<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>\n<script type="text/plain" id="analyzerSrc">\n'+open('analyzer.js').read().replace('</script','<\\/script')+'\n</script>\n<script>\n'+eng+'\n</script>\n<script>\n'+p+'\n</script>\n<script>\n'+a+'\n</script>\n'
open('../index.html','w').write('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"></head><body>'+html+'</body></html>')
print(len(html))
