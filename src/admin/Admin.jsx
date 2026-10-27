import { useEffect, useState } from 'react'
import { setMeta } from '../lib/seo.js'
import { copyText } from '../lib/ui.js'
import site from '../data/site.json'

// پنل ساده‌ی ویرایش پروژه‌ها: خروجی JSON می‌دهد که در src/data/site.json جایگزین می‌شود.
// توجه: این صفحه امنیت سرور ندارد؛ برای استفاده‌ی واقعی، آن را با Cloudflare Access یا رمز سرور محافظت کن.
export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [pass, setPass] = useState('')
  const [projects, setProjects] = useState(site.projects)
  const [draft, setDraft] = useState({ id: '', title: '', summary: '', body: '', tags: '', demo: '' })

  useEffect(() => { setMeta({ title: 'ادمین', description: '', path: '/admin', robots: 'noindex, nofollow' }) }, [])

  if (!authed) {
    return (
      <section className="station page-head">
        <h1 className="display-md">ورود</h1>
        <form className="form" onSubmit={e => { e.preventDefault(); if (pass && pass === import.meta.env.VITE_ADMIN_PASSWORD) setAuthed(true); else alert('رمز اشتباه است') }}>
          <label>رمز<input type="password" value={pass} onChange={e => setPass(e.target.value)} /></label>
          <button className="btn primary" type="submit">ورود</button>
        </form>
      </section>
    )
  }

  const add = e => {
    e.preventDefault()
    const item = { ...draft, id: draft.id || `p-${Date.now()}`, tags: draft.tags.split(',').map(t => t.trim()).filter(Boolean), color: '#5fd4bf', repo: '' }
    setProjects([...projects, item])
    setDraft({ id: '', title: '', summary: '', body: '', tags: '', demo: '' })
  }

  const json = JSON.stringify(projects, null, 2)

  return (
    <section className="station panel">
      <div className="glass">
        <h1 className="display-md">پروژه‌ها</h1>
        <ul className="admin-list">{projects.map(p => <li key={p.id}>{p.title} <button onClick={() => setProjects(projects.filter(x => x.id !== p.id))}>حذف</button></li>)}</ul>
        <form className="form" onSubmit={add}>
          {['title', 'summary', 'body', 'tags', 'demo', 'id'].map(k => (
            <label key={k}>{k}<input value={draft[k]} onChange={e => setDraft({ ...draft, [k]: e.target.value })} required={k === 'title'} /></label>
          ))}
          <button className="btn primary" type="submit">افزودن</button>
        </form>
        <p className="muted">آرایه‌ی زیر را در بخش projects فایل src/data/site.json جایگزین کن و دوباره دیپلوی بزن.</p>
        <textarea className="json" readOnly value={json} rows="10" />
        <button className="btn" onClick={() => copyText(json, 'JSON کپی شد')}>کپی JSON</button>
      </div>
    </section>
  )
}
