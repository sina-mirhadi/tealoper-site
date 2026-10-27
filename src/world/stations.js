// نقاط توقف دوربین: هر بخش با data-station، یک ایستگاه در مسیر سه‌بعدی است
export function computeStops() {
  const els = [...document.querySelectorAll('[data-station]')]
  const offset = window.innerHeight * 0.35
  return els.map(el => el.getBoundingClientRect().top + window.scrollY - offset)
}

// y فعلی اسکرول را به یک عدد پیوسته‌ی ایستگاه (۰ تا n-1) تبدیل می‌کند
export function stationAt(y, stops) {
  const n = stops.length
  if (n <= 1 || y <= stops[0]) return 0
  if (y >= stops[n - 1]) return n - 1
  for (let i = 0; i < n - 1; i++) {
    if (y >= stops[i] && y < stops[i + 1]) {
      return i + (y - stops[i]) / (stops[i + 1] - stops[i])
    }
  }
  return n - 1
}
