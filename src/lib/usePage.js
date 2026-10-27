import { useEffect } from 'react'
import site from '../data/site.json'
import { setMeta } from './seo.js'

// متای هر صفحه را از داده‌ی واحد سایت می‌خواند و در ناوبری سمت کلاینت ست می‌کند
export function usePage(id, overrides = {}) {
  useEffect(() => {
    const p = site.pages.find(x => x.id === id)
    if (!p) return
    setMeta({ title: overrides.title || p.title, description: overrides.description || p.description, path: overrides.path || p.path, robots: overrides.robots })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
}

export const pageData = id => site.pages.find(x => x.id === id)
