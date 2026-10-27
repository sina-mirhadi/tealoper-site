import Reveal from '../components/Reveal.jsx'
import { usePage, pageData } from '../lib/usePage.js'
import site from '../data/site.json'

export default function About() {
  usePage('about')
  const page = pageData('about')
  return (
    <>
      <section className="station page-head" data-station data-scene="orb">
        <Reveal><p className="eyebrow">درباره</p></Reveal>
        <Reveal delay={0.1}><h1 className="display-md">{page.h1}</h1></Reveal>
      </section>
      <section className="station panel" data-station data-scene="knot">
        <div className="glass prose">
          {page.paragraphs.map((p, i) => <Reveal key={i}><p>{p}</p></Reveal>)}
        </div>
      </section>
      <section className="station panel" data-station data-scene="cards">
        <div className="glass">
          <Reveal><h2>مسیر من</h2></Reveal>
          <ol className="timeline">
            {site.experience.map((e, i) => (
              <Reveal as="li" key={i} delay={i * 0.1}>
                <span className="eyebrow">{e.year}</span>
                <h3>{e.role}</h3>
                <p>{e.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
