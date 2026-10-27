// ابزارهای کمکی مشترک
export function toast(msg) {
  window.dispatchEvent(new CustomEvent('toast', { detail: msg }))
}
export async function copyText(text, msg = 'کپی شد') {
  try {
    await navigator.clipboard.writeText(text)
    toast(msg)
  } catch {
    toast('کپی نشد؛ دستی کپی کن')
  }
}
export const isLite = () =>
  typeof window !== 'undefined' && (window.innerWidth < 800 || (navigator.hardwareConcurrency || 8) <= 4)
