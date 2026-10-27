import Reveal from '../components/Reveal.jsx'
import { usePage, pageData } from '../lib/usePage.js'
import site from '../data/site.json'
import { motion } from 'framer-motion'

function Bars({ items }) {
  return (
    <ul className="bars">
      {items.map(s => (
        <li key={s.name}>
          <span>{s.name}</span>
          <span className="bar"><motion.span initial={{ width: 0 }} whileInView={{ width: `${s.level}%` }} viewport={{ once: true }} transition={{ duration: 1.1 }} /></span>
        </li>
      ))}
    </ul>
  )
}

export default function Skills() {
  usePage('skills')
  const page = pageData('skills')
  return (
    <>
      <section className="station page-head" data-station data-scene="bars">
        <Reveal><p className="eyebrow">مهارت‌ها</p></Reveal>
        <Reveal delay={0.1}><h1 className="display-md">{page.h1}</h1></Reveal>
        <Reveal delay={0.2}><p className="lead">{page.paragraphs[0]}</p></Reveal>
      </section>
      <section className="station panel" data-station data-scene="bars">
        <div className="glass"><Reveal><h2>امروز</h2></Reveal><Bars items={site.skills} /></div>
      </section>
      <section className="station panel" data-station data-scene="rings">
        <div className="glass"><Reveal><h2>در حال یادگیری</h2></Reveal><Bars items={site.learning} /></div>
      </section>
      <section className="station panel" data-station data-scene="cards">
        <div className="glass">
          <Reveal><h2>ابزارها</h2></Reveal>
          <div className="chips">{site.stack.map(t => <span key={t} className="chip">{t}</span>)}</div>
        </div>
      </section>
    </>
  )
}
