// مدیریت تایتل و متای صفحه در ناوبری سمت کلاینت (نسخه‌ی اولیه‌ی هر صفحه از پیش‌رندر می‌آید)
export function setMeta({ title, description, path, robots = 'index, follow' }) {
  document.title = title
  const set = (sel, attr, key, value) => {
    let el = document.head.querySelector(sel)
    if (!el) {
      el = document.createElement(attr === 'rel' ? 'link' : 'meta')
      if (attr === 'rel') el.rel = key
      else el.setAttribute(attr, key)
      document.head.appendChild(el)
    }
    if (attr === 'rel') el.href = value
    else el.setAttribute('content', value)
  }
  const base = window.location.origin
  set('meta[name="description"]', 'name', 'description', description)
  set('meta[name="robots"]', 'name', 'robots', robots)
  set('link[rel="canonical"]', 'rel', 'canonical', base + path)
  set('meta[property="og:title"]', 'property', 'og:title', title)
  set('meta[property="og:description"]', 'property', 'og:description', description)
  set('meta[property="og:url"]', 'property', 'og:url', base + path)
}
