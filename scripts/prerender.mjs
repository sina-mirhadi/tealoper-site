// پیش‌رندر سئو: برای هر صفحه یک HTML جدا با تایتل، متا، canonical، Open Graph و JSON-LD و متن واقعی می‌سازد.
// بعد از vite build اجرا می‌شود. کراولرها و هوش‌های مصنوعی محتوای کامل را از همین فایل‌ها می‌خوانند.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const dist = join(root, 'dist')
const site = JSON.parse(readFileSync(join(root, 'src/data/site.json'), 'utf8'))
const template = readFileSync(join(dist, 'index.html'), 'utf8')
const base = site.siteUrl.replace(/\/$/, '')
const today = new Date().toISOString().slice(0, 10)
const { profile } = site

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const person = {
  '@type': 'Person',
  '@id': `${base}/#person`,
  name: profile.name,
  alternateName: profile.alternateNames,
  url: `${base}/`,
  jobTitle: profile.role,
  description: 'توسعه‌دهنده‌ی وب و اپلیکیشن با React، Python و Three.js',
  knowsAbout: site.skills.map(s => s.name),
  sameAs: [profile.telegramUrl, profile.github].filter(Boolean),
  nationality: profile.location,
}
const website = {
  '@type': 'WebSite',
  '@id': `${base}/#website`,
  url: `${base}/`,
  name: profile.brand,
  inLanguage: 'fa',
  publisher: { '@id': `${base}/#person` },
}

const ld = items => `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': items })}</script>`

function crumbs(path, name) {
  if (path === '/') return null
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'خانه', item: `${base}/` },
      { '@type': 'ListItem', position: 2, name, item: `${base}${path}` },
    ],
  }
}

function render({ path, title, description, h1, paragraphs = [], schemas = [], robots = 'index, follow', ogType = 'website', body = '' }) {
  const url = `${base}${path}`
  const graph = [person, website, ...schemas]
  const head = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:type" content="${ogType}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:site_name" content="TeaLoper" />`,
    `<meta property="og:locale" content="fa_IR" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<link rel="alternate" hreflang="fa" href="${esc(url)}" />`,
    ld(graph),
  ].join('\n    ')
  const main = `<main class="prerender"><h1>${esc(h1)}</h1>${paragraphs.map(p => `<p>${esc(p)}</p>`).join('')}${body}</main>`

  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace(/<meta name="description"[^>]*>/, '')
    .replace(/<meta name="robots"[^>]*>/, '')
    .replace('</head>', `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${main}</div>`)
  return html
}

function write(path, html) {
  const dir = path === '/' ? dist : join(dist, path)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
}

const urls = []

// صفحات اصلی
for (const p of site.pages) {
  const schemas = []
  if (p.id === 'home') {
    schemas.push({ '@type': 'ProfilePage', '@id': `${base}/#profile`, url: `${base}/`, mainEntity: { '@id': `${base}/#person` } })
  }
  if (p.id === 'faq') {
    schemas.push({
      '@type': 'FAQPage',
      mainEntity: site.faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    })
  }
  const c = crumbs(p.path, p.h1)
  if (c) schemas.push(c)
  let body = ''
  if (p.id === 'skills') body = `<ul>${site.skills.map(s => `<li>${esc(s.name)}</li>`).join('')}</ul>`
  if (p.id === 'services') body = `<ul>${site.services.map(s => `<li>${esc(s.title)}: ${esc(s.text)}</li>`).join('')}</ul>`
  if (p.id === 'faq') body = site.faq.map(f => `<h2>${esc(f.q)}</h2><p>${esc(f.a)}</p>`).join('')
  if (p.id === 'about') body = `<ul>${site.experience.map(e => `<li>${esc(e.year)}: ${esc(e.role)}، ${esc(e.text)}</li>`).join('')}</ul>`
  const paragraphs = p.id === 'about' ? p.paragraphs : p.paragraphs
  write(p.path, render({ path: p.path, title: p.title, description: p.description, h1: p.h1, paragraphs, schemas, ogType: p.id === 'home' ? 'profile' : 'website', body }))
  urls.push(p.path)
}

// صفحات پروژه
for (const proj of site.projects) {
  const path = `/projects/${proj.id}`
  const title = `${proj.title} | نمونه‌کار سینا میرهادی`
  const schemas = [
    {
      '@type': 'SoftwareApplication',
      name: proj.title,
      description: proj.summary,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Android',
      url: proj.demo || `${base}${path}`,
      author: { '@id': `${base}/#person` },
    },
    crumbs(path, proj.title),
  ]
  write(path, render({ path, title, description: proj.summary, h1: proj.title, paragraphs: [proj.summary, proj.body], schemas }))
  urls.push(path)
}

// نوشته‌ها
for (const post of site.posts) {
  const path = `/blog/${post.slug}`
  const schemas = [
    { '@type': 'BlogPosting', headline: post.title, description: post.description, url: `${base}${path}`, inLanguage: 'fa', author: { '@id': `${base}/#person` }, mainEntityOfPage: `${base}${path}` },
    crumbs(path, post.title),
  ]
  write(path, render({ path, title: `${post.title} | سینا میرهادی`, description: post.description, h1: post.title, paragraphs: post.body, schemas, ogType: 'article' }))
  urls.push(path)
}

// 404 و ادمین (ادمین هرگز ایندکس نمی‌شود)
writeFileSync(join(dist, '404.html'), render({ path: '/404', title: 'صفحه پیدا نشد | سینا میرهادی', description: 'این صفحه پیدا نشد.', h1: '۴۰۴', paragraphs: ['این صفحه پیدا نشد.'], robots: 'noindex, follow' }))
write('/admin', render({ path: '/admin', title: 'ادمین', description: 'ادمین', h1: 'ادمین', robots: 'noindex, nofollow' }))

// sitemap و robots
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${esc(base + u)}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>${u === '/' ? '1.0' : '0.7'}</priority></url>`).join('\n')}
</urlset>
`
writeFileSync(join(dist, 'sitemap.xml'), sitemap)
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${base}/sitemap.xml\n`)
console.log(`prerendered ${urls.length} pages + 404 + admin`)
