import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Toast() {
  const [msg, setMsg] = useState(null)
  useEffect(() => {
    let t
    const on = e => {
      setMsg(e.detail)
      clearTimeout(t)
      t = setTimeout(() => setMsg(null), 2200)
    }
    window.addEventListener('toast', on)
    return () => { window.removeEventListener('toast', on); clearTimeout(t) }
  }, [])
  return (
    <AnimatePresence>
      {msg && (
        <motion.div className="toast" role="status" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}>
          {msg}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
