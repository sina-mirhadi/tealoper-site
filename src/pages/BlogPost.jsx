import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Reveal from '../components/Reveal.jsx'
import NotFound from './NotFound.jsx'
import site from '../data/site.json'
import { setMeta } from '../lib/seo.js'

export default function BlogPost() {
  const { slug } = useParams()
  const post = site.posts.find(p => p.slug === slug)

  useEffect(() => {
    if (post) setMeta({ title: `${post.title} | سینا میرهادی`, description: post.description, path: `/blog/${post.slug}` })
  }, [post])

  if (!post) return <NotFound />
  return (
    <>
      <section className="station page-head" data-station data-scene="orb">
        <Reveal><Link className="text-link" to="/blog">← یادداشت‌ها</Link></Reveal>
        <Reveal delay={0.1}><h1 className="display-md">{post.title}</h1></Reveal>
        <Reveal delay={0.2}><p className="lead">{post.description}</p></Reveal>
      </section>
      <section className="station panel" data-station data-scene="knot">
        <article className="glass prose">
          {post.body.map((p, i) => <Reveal key={i}><p>{p}</p></Reveal>)}
        </article>
      </section>
    </>
  )
}
