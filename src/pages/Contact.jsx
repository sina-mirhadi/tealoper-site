import { useState } from 'react'
import Reveal from '../components/Reveal.jsx'
import { usePage, pageData } from '../lib/usePage.js'
import { copyText, toast } from '../lib/ui.js'
import site from '../data/site.json'

export default function Contact() {
  usePage('contact')
  const page = pageData('contact')
  const { profile } = site
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT || site.contactEndpoint
  const [status, setStatus] = useState('idle')

  const onSubmit = async e => {
    e.preventDefault()
    const f = e.target
    const payload = { name: f.name.value.trim(), message: f.message.value.trim() }
    if (!payload.name || !payload.message) return
    setStatus('sending')
    try {
      if (!endpoint) throw new Error('no endpoint')
      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) throw new Error('bad status')
      f.reset()
      setStatus('sent')
      toast('پیامت ارسال شد')
    } catch {
      setStatus('fallback')
      window.open(`${profile.telegramUrl}?text=${encodeURIComponent(`${payload.name}: ${payload.message}`)}`, '_blank', 'noopener')
    }
  }

  const labels = { idle: 'ارسال', sending: 'در حال ارسال…', sent: 'ارسال شد', fallback: 'باز شد در تلگرام' }

  return (
    <>
      <section className="station page-head" data-station data-scene="orb">
        <Reveal><p className="eyebrow">تماس</p></Reveal>
        <Reveal delay={0.1}><h1 className="display-md">{page.h1}</h1></Reveal>
        <Reveal delay={0.2}><p className="lead">{page.paragraphs[0]}</p></Reveal>
      </section>
      <section className="station panel" data-station data-scene="rings">
        <div className="glass">
          <Reveal>
            <p>
              <button className="copy-chip" onClick={() => copyText(`@${profile.telegram}`, 'آیدی کپی شد')}>@{profile.telegram} ⧉</button>
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <form className="form" onSubmit={onSubmit}>
              <label>نام<input name="name" required autoComplete="name" /></label>
              <label>پیام<textarea name="message" rows="5" required /></label>
              <button className="btn primary" type="submit" disabled={status === 'sending'}>{labels[status]}</button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  )
}
