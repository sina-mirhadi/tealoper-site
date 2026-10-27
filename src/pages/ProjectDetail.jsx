import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Reveal from '../components/Reveal.jsx'
import NotFound from './NotFound.jsx'
import site from '../data/site.json'
import { setMeta } from '../lib/seo.js'

export default function ProjectDetail() {
  const { id } = useParams()
  const p = site.projects.find(x => x.id === id)

  useEffect(() => {
    if (p) setMeta({ title: `${p.title} | نمونه‌کار سینا میرهادی`, description: p.summary, path: `/projects/${p.id}` })
  }, [p])

  if (!p) return <NotFound />
  return (
    <>
      <section className="station page-head" data-station data-scene="orb">
        <Reveal><Link className="text-link" to="/projects">← همه‌ی نمونه‌کارها</Link></Reveal>
        <Reveal delay={0.1}><h1 className="display-md">{p.title}</h1></Reveal>
        <Reveal delay={0.2}><p className="lead">{p.summary}</p></Reveal>
      </section>
      <section className="station panel" data-station data-scene="discs">
        <div className="glass prose">
          <Reveal><p>{p.body}</p></Reveal>
          <Reveal delay={0.1}><div className="tags">{p.tags.map(t => <span key={t} className="chip">{t}</span>)}</div></Reveal>
          <Reveal delay={0.2}>
            <div className="actions">
              {p.demo && <a className="btn primary" href={p.demo} target="_blank" rel="noopener noreferrer">مایکت ↗</a>}
              {p.repo && <a className="btn" href={p.repo} target="_blank" rel="noopener noreferrer">کد ↗</a>}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
