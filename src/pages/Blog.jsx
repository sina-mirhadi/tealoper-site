import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import { usePage, pageData } from '../lib/usePage.js'
import site from '../data/site.json'

export default function Blog() {
  usePage('blog')
  const page = pageData('blog')
  return (
    <>
      <section className="station page-head" data-station data-scene="orb">
        <Reveal><p className="eyebrow">یادداشت‌ها</p></Reveal>
        <Reveal delay={0.1}><h1 className="display-md">{page.h1}</h1></Reveal>
        <Reveal delay={0.2}><p className="lead">{page.paragraphs[0]}</p></Reveal>
      </section>
      {site.posts.map((post, i) => (
        <section key={post.slug} className="station panel" data-station data-scene={i % 2 ? 'knot' : 'cards'}>
          <Reveal className="glass">
            <h2 className="big"><Link to={`/blog/${post.slug}`}>{post.title}</Link></h2>
            <p>{post.description}</p>
            <Link className="text-link" to={`/blog/${post.slug}`}>ادامه‌ی مطلب ←</Link>
          </Reveal>
        </section>
      ))}
    </>
  )
}
