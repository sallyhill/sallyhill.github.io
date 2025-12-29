import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.css'

import Header from './components/Header.jsx'
import About from './components/About.jsx'
import Work from './components/Work.jsx'
import TumblrVisuals from './components/TumblrVisuals.jsx'
import AudioSection from './components/AudioSection.jsx'
import VideosSection from './components/VideosSection.jsx'
import WritingSection from './components/WritingSection.jsx'
import Footer from './components/Footer.jsx'

const App = () => {
  React.useEffect(() => {
    document.body.style.cursor = 'url("assets/nat1056.cur"), auto'
  }, [])

  return (
    <>
      <Header />
      <About />
      <Work />
      <section className="embeds">
        <TumblrVisuals />
        <AudioSection />
        <VideosSection />
        <WritingSection />
      </section>
      <Footer />
    </>
  )
}

const root = createRoot(document.getElementById('app'))
root.render(<App />)
