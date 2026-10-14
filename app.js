// Descobre o instalador do Mac da versão mais nova (o nome muda a cada versão).
// Se não der (sem internet, limite da API), o botão leva à página de versões.
fetch('https://api.github.com/repos/ANAKA80/estudio-pdf-releases/releases/latest', { headers: { Accept: 'application/vnd.github+json' } })
  .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
  .then((rel) => {
    const dmg = (rel.assets || []).find((a) => /\.dmg$/i.test(a.name))
    const prefix = 'https://github.com/ANAKA80/estudio-pdf-releases/releases/download/'
    if (dmg && typeof dmg.browser_download_url === 'string' && dmg.browser_download_url.startsWith(prefix)) {
      document.getElementById('mac').href = dmg.browser_download_url
    }
    const tag = typeof rel.tag_name === 'string' ? rel.tag_name.replace(/^v/, '') : ''
    if (/^\d+\.\d+\.\d+$/.test(tag)) document.getElementById('version').textContent = `Versão ${tag} — sempre a mais nova.`
  })
  .catch(() => undefined)
