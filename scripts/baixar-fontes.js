#!/usr/bin/env node
/* Baixa as fontes do Google Fonts (Roboto Condensed e JetBrains Mono) para a pasta do site,
   deixando o InverterLab 100% offline.  Uso:  node scripts/baixar-fontes.js <pasta-do-index.html>
   Precisa de internet apenas nesta etapa.  Se falhar, o sistema continua funcionando com fontes do sistema. */
const https = require('https'), fs = require('fs'), path = require('path');
const CSS_URL = 'https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;700&display=swap';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': UA } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) return resolve(get(res.headers.location));
      if (res.statusCode !== 200) return reject(new Error(url + ' -> HTTP ' + res.statusCode));
      const parts = []; res.on('data', d => parts.push(d)); res.on('end', () => resolve(Buffer.concat(parts)));
    }).on('error', reject);
  });
}
// mantém só os subconjuntos latin e latin-ext (cobrem português) e troca as URLs por arquivos locais
function processCss(css) {
  const blocks = css.split(/(?=\/\* [a-z-]+ \*\/)/).filter(b => /^\/\* (latin|latin-ext) \*\//.test(b));
  const files = []; let out = '';
  blocks.forEach(b => {
    b = b.replace(/url\((https:[^)]+)\)/g, (_, u) => { let i = files.indexOf(u); if (i < 0) { files.push(u); i = files.length - 1; } return 'url(font-' + (i + 1) + '.woff2)'; });
    out += b.trim() + '\n';
  });
  return { css: out, files };
}
function patchHtml(html) {
  return html.replace(/<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">\s*<link href="https:\/\/fonts\.googleapis\.com\/css2[^"]*" rel="stylesheet">/,
    '<link rel="stylesheet" href="fonts/fonts.css">');
}
async function main() {
  const root = path.resolve(process.argv[2] || '.');
  const htmlPath = path.join(root, 'index.html');
  if (!fs.existsSync(htmlPath)) throw new Error('index.html não encontrado em ' + root);
  const dir = path.join(root, 'fonts'); fs.mkdirSync(dir, { recursive: true });
  const { css, files } = processCss((await get(CSS_URL)).toString());
  if (!files.length) throw new Error('Nenhuma fonte encontrada na resposta do Google Fonts.');
  for (let i = 0; i < files.length; i++) fs.writeFileSync(path.join(dir, 'font-' + (i + 1) + '.woff2'), await get(files[i]));
  fs.writeFileSync(path.join(dir, 'fonts.css'), css);
  const html = fs.readFileSync(htmlPath, 'utf8'), patched = patchHtml(html);
  if (patched !== html) fs.writeFileSync(htmlPath, patched);
  console.log('Fontes locais prontas: ' + files.length + ' arquivos em ' + dir + (patched !== html ? ' (index.html atualizado)' : ' (index.html já estava atualizado)'));
}
if (require.main === module) main().catch(e => { console.warn('Aviso: não foi possível baixar as fontes (' + e.message + '). O sistema usará fontes do sistema.'); });
module.exports = { processCss, patchHtml };
