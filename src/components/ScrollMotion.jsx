import { useEffect } from 'react'

// هر بخش هنگام عبور از صفحه، پنل‌هایش به چپ و راست حرکت می‌کنند و کمی می‌چرخند.
// پیشرفت هر بخش در متغیرهای CSS (--p و --dir) ذخیره می‌شود و استایل‌ها از آن استفاده می‌کنند.
export default function ScrollMotion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf
    const tick = () => {
      const vh = window.innerHeight
      const sections = document.querySelectorAll('.station')
      sections.forEach((el, idx) => {
        const target = el.querySelector(':scope > .glass, :scope > .hero-inner')
        if (!target) return
        const r = el.getBoundingClientRect()
        const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)))
        target.style.setProperty('--p', p.toFixed(3))
        target.style.setProperty('--dir', idx % 2 ? '1' : '-1')
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])
  return null
}
