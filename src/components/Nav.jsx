import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import site from '../data/site.json'

const links = [
  { to: '/', label: 'خانه', end: true },
  { to: '/about', label: 'درباره' },
  { to: '/services', label: 'خدمات' },
  { to: '/skills', label: 'مهارت‌ها' },
  { to: '/projects', label: 'نمونه‌کارها' },
  { to: '/blog', label: 'یادداشت‌ها' },
  { to: '/faq', label: 'سوال‌ها' },
  { to: '/contact', label: 'تماس' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="nav">
      <Link to="/" className="brand" aria-label="صفحه‌ی اصلی">
        <span className="brand-mark" aria-hidden="true" />
        <span>{site.profile.brand}</span>
      </Link>
      <button className="menu-btn" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(o => !o)}>
        {open ? 'بستن' : 'منو'}
      </button>
      <nav id="menu" className={open ? 'menu open' : 'menu'} aria-label="ناوبری اصلی">
        {links.map(l => <NavLink key={l.to} to={l.to} end={!!l.end}>{l.label}</NavLink>)}
      </nav>
    </header>
  )
}
