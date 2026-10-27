import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import { usePage, pageData } from '../lib/usePage.js'
import site from '../data/site.json'

export default function Services() {
  usePage('services')
  const page = pageData('services')
  const scenes = ['cards', 'discs', 'rings', 'knot']
  return (
    <>
      <section className="station page-head" data-station data-scene="orb">
        <Reveal><p className="eyebrow">خدمات</p></Reveal>
        <Reveal delay={0.1}><h1 className="display-md">{page.h1}</h1></Reveal>
        <Reveal delay={0.2}><p className="lead">{page.paragraphs[0]}</p></Reveal>
      </section>
      {site.services.map((s, i) => (
        <section key={s.title} className="station panel" data-station data-scene={scenes[i % scenes.length]}>
          <div className="glass">
            <Reveal><span className="num">0{i + 1}</span></Reveal>
            <Reveal delay={0.1}><h2>{s.title}</h2></Reveal>
            <Reveal delay={0.2}><p>{s.text}</p></Reveal>
            <Reveal delay={0.3}><p className="muted"><strong>مناسب برای:</strong> {s.for}</p></Reveal>
          </div>
        </section>
      ))}
      <section className="station panel cta" data-station data-scene="orb">
        <div className="glass center">
          <Reveal><h2>پروژه‌ات را برایم بنویس.</h2></Reveal>
          <Reveal delay={0.1}><Link className="btn primary" to="/contact">درخواست مشاوره</Link></Reveal>
        </div>
      </section>
    </>
  )
}
