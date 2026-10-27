import { useEffect, useState } from 'react'

export default function ReadingProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const on = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight || 1
      setP(Math.min(1, window.scrollY / max))
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return <div className="reading-progress" style={{ transform: `scaleX(${p})` }} aria-hidden="true" />
}
