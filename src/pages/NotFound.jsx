import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { setMeta } from '../lib/seo.js'

export default function NotFound() {
  useEffect(() => { setMeta({ title: 'صفحه پیدا نشد | سینا میرهادی', description: 'این صفحه پیدا نشد.', path: '/404', robots: 'noindex' }) }, [])
  return (
    <section className="station page-head" data-station data-scene="orb">
      <h1 className="display-md">۴۰۴</h1>
      <p className="lead">این صفحه پیدا نشد.</p>
      <Link className="btn primary" to="/">بازگشت به خانه</Link>
    </section>
  )
}
