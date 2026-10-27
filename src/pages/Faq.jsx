import Reveal from '../components/Reveal.jsx'
import Faq from '../components/Faq.jsx'
import { usePage, pageData } from '../lib/usePage.js'
import site from '../data/site.json'

export default function FaqPage() {
  usePage('faq')
  const page = pageData('faq')
  return (
    <>
      <section className="station page-head" data-station data-scene="orb">
        <Reveal><p className="eyebrow">سوال‌های متداول</p></Reveal>
        <Reveal delay={0.1}><h1 className="display-md">{page.h1}</h1></Reveal>
        <Reveal delay={0.2}><p className="lead">{page.paragraphs[0]}</p></Reveal>
      </section>
      <section className="station panel" data-station data-scene="cards">
        <div className="glass"><Faq items={site.faq} /></div>
      </section>
    </>
  )
}
