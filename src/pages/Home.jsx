import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal.jsx'
import { usePage } from '../lib/usePage.js'
import site from '../data/site.json'

// بخش‌های خانه کوتاه‌اند؛ هر بخش یک ایستگاه سه‌بعدی است
function Hero() {
  return (
    <section className="station hero" data-station data-scene="orb" aria-labelledby="hero-title">
      <div className="hero-inner">
        <Reveal><p className="eyebrow">{site.profile.role}</p></Reveal>
        <Reveal delay={0.1}><h1 id="hero-title" className="display">{site.profile.name}</h1></Reveal>
        <Reveal delay={0.2}><p className="lead">{site.profile.tagline}</p></Reveal>
        <Reveal delay={0.3}>
          <div className="actions">
            <Link className="btn primary" to="/projects">نمونه‌کارها</Link>
            <Link className="btn" to="/contact">شروع همکاری</Link>
          </div>
        </Reveal>
      </div>
      <p className="scroll-cue" aria-hidden="true">پایین بکشید</p>
    </section>
  )
}

export default function Home() {
  usePage('home')
  const { values, process, skills, stats } = site
  const featured = site.projects[0]
  return (
    <>
      <Hero />

      <section className="station band" data-station data-scene="rings">
        <Reveal><p className="statement">کاربردی. مفید. تمیز.</p></Reveal>
      </section>

      <section className="station panel" data-station data-scene="knot">
        <div className="glass">
          <Reveal><h2>درباره‌ی من</h2></Reveal>
          <Reveal delay={0.1}><p>از ۱۴۰۴ با وب شروع کردم و الان روی بک‌اند کار می‌کنم.</p></Reveal>
          <Reveal delay={0.2}><Link className="text-link" to="/about">ادامه‌ی داستان</Link></Reveal>
        </div>
      </section>

      <section className="station panel" data-station data-scene="cards">
        <div className="glass">
          <Reveal><h2>اصول کاری</h2></Reveal>
          <div className="grid3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1} className="value">
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="station panel" data-station data-scene="orb">
        <div className="glass">
          <Reveal><p className="eyebrow">پروژه‌ی اصلی</p></Reveal>
          <Reveal delay={0.1}><h2 className="big">{featured.title}</h2></Reveal>
          <Reveal delay={0.2}><p>{featured.summary}</p></Reveal>
          <Reveal delay={0.3}>
            <div className="actions">
              <Link className="btn" to={`/projects/${featured.id}`}>جزئیات</Link>
              <a className="btn primary" href={featured.demo} target="_blank" rel="noopener noreferrer">مایکت ↗</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="station panel" data-station data-scene="discs">
        <div className="glass">
          <Reveal><h2>فرایند همکاری</h2></Reveal>
          <ol className="steps">
            {process.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.1}>
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="station panel" data-station data-scene="bars">
        <div className="glass">
          <Reveal><h2>مهارت‌ها</h2></Reveal>
          <ul className="bars">
            {skills.map(s => (
              <li key={s.name}>
                <span>{s.name}</span>
                <span className="bar"><motion.span initial={{ width: 0 }} whileInView={{ width: `${s.level}%` }} viewport={{ once: true }} transition={{ duration: 1.1 }} /></span>
              </li>
            ))}
          </ul>
          <div className="stats">
            {stats.map(s => (
              <div key={s.label}><strong className="num-big">{s.value}</strong><span>{s.label}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="station panel cta" data-station data-scene="orb">
        <div className="glass center">
          <Reveal><h2>کار بعدیت را بسازیم.</h2></Reveal>
          <Reveal delay={0.1}>
            <div className="actions">
              <Link className="btn primary" to="/contact">شروع همکاری</Link>
              <Link className="btn" to="/faq">سوال‌های متداول</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
