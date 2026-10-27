import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import { usePage, pageData } from '../lib/usePage.js'
import site from '../data/site.json'

export default function Projects() {
  usePage('projects')
  const page = pageData('projects')
  return (
    <>
      <section className="station page-head" data-station data-scene="orb">
        <Reveal><p className="eyebrow">نمونه‌کارها</p></Reveal>
        <Reveal delay={0.1}><h1 className="display-md">{page.h1}</h1></Reveal>
        <Reveal delay={0.2}><p className="lead">{page.paragraphs[0]}</p></Reveal>
      </section>
      {site.projects.map((p, i) => (
        <section key={p.id} className="station panel" data-station data-scene={i % 2 ? 'discs' : 'rings'}>
          <div className="glass">
            <Reveal><h2 className="big">{p.title}</h2></Reveal>
            <Reveal delay={0.1}><p>{p.summary}</p></Reveal>
            <Reveal delay={0.2}>
              <div className="tags">{p.tags.map(t => <span key={t} className="chip">{t}</span>)}</div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="actions">
                <Link className="btn primary" to={`/projects/${p.id}`}>جزئیات پروژه</Link>
                {p.demo && <a className="btn" href={p.demo} target="_blank" rel="noopener noreferrer">دانلود ↗</a>}
              </div>
            </Reveal>
          </div>
        </section>
      ))}
    </>
  )
}
