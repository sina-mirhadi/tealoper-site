import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import SmoothScroll from './components/SmoothScroll.jsx'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import BackToTop from './components/BackToTop.jsx'
import Toast from './components/Toast.jsx'
import ReadingProgress from './components/ReadingProgress.jsx'
import ScrollMotion from './components/ScrollMotion.jsx'
import World from './world/World.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Skills from './pages/Skills.jsx'
import Projects from './pages/Projects.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import Blog from './pages/Blog.jsx'
import BlogPost from './pages/BlogPost.jsx'
import Faq from './pages/Faq.jsx'
import Resume from './pages/Resume.jsx'
import Contact from './pages/Contact.jsx'
import Admin from './admin/Admin.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')

  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname])

  return (
    <SmoothScroll>
      <a className="skip-link" href="#main">رفتن به محتوا</a>
      {!isAdmin && <World />}
      {!isAdmin && <ScrollMotion />}
      {!isAdmin && <Nav />}
      {!isAdmin && <ReadingProgress />}
      <AnimatePresence mode="wait">
        <motion.main
          id="main"
          key={pathname}
          className="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Routes location={{ pathname }}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      {!isAdmin && <Footer />}
      {!isAdmin && <BackToTop />}
      <Toast />
    </SmoothScroll>
  )
}
