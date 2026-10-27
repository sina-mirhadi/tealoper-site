import Reveal from '../components/Reveal.jsx'
import { usePage } from '../lib/usePage.js'
import site from '../data/site.json'

export default function Resume() {
  usePage('resume')
  const { profile, skills, experience, projects } = site
  return (
    <>
      <section className="station page-head" data-station data-scene="orb">
        <Reveal><h1 className="display-md">{profile.name}</h1></Reveal>
        <Reveal delay={0.1}><p className="lead">{profile.role} · {profile.location}</p></Reveal>
        <Reveal delay={0.2}><button className="btn primary" onClick={() => window.print()}>چاپ یا ذخیره به PDF</button></Reveal>
      </section>
      <section className="station panel resume" data-station data-scene="cards">
        <div className="glass prose">
          <h2>خلاصه</h2>
          <p>{profile.tagline} {site.pages[0].paragraphs[0]}</p>
          <h2>مهارت‌ها</h2>
          <p>{skills.map(s => s.name).join('، ')}</p>
          <h2>سوابق</h2>
          {experience.map((e, i) => <p key={i}><strong>{e.role}</strong> ({e.year}) — {e.text}</p>)}
          <h2>پروژه‌ها</h2>
          {projects.map(p => <p key={p.id}><strong>{p.title}</strong> — {p.summary}</p>)}
          <h2>تماس</h2>
          <p>تلگرام: @{profile.telegram} · {profile.github}</p>
        </div>
      </section>
    </>
  )
}
