import { Link } from 'react-router-dom'
import site from '../data/site.json'

export default function Footer() {
  const { profile } = site
  return (
    <footer className="footer">
      <div>
        <p className="footer-name">{profile.name} <span className="muted">· {profile.brand}</span></p>
        <p className="muted">{profile.role}</p>
      </div>
      <div className="footer-links">
        <a href={profile.telegramUrl} target="_blank" rel="noopener noreferrer">تلگرام</a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer">گیت‌هاب</a>
        <Link to="/resume">رزومه</Link>
        <Link to="/faq">سوال‌ها</Link>
      </div>
      <p className="muted small">© {new Date().getFullYear()} {profile.name}</p>
    </footer>
  )
}
