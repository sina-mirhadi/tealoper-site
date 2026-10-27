import { useEffect } from 'react'
import Lenis from 'lenis'

// اسکرول نرم؛ برای کاربرانی که حرکت کم ترجیح می‌دهند، خاموش است
export default function SmoothScroll({ children }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    window.__lenis = lenis
    let frame
    const raf = time => { lenis.raf(time); frame = requestAnimationFrame(raf) }
    frame = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(frame); lenis.destroy(); delete window.__lenis }
  }, [])
  return children
}
