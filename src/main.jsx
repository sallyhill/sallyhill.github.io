import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.css'
import cursorCur from './assets/nat1056.cur'

import Header from './components/Header.jsx'
import BlueGuyRunner from './components/BlueGuyRunner.jsx'
import About from './components/About.jsx'
import Work from './components/Work.jsx'
import TumblrVisuals from './components/TumblrVisuals.jsx'
import AudioSection from './components/AudioSection.jsx'
import VideosSection from './components/VideosSection.jsx'
import WritingSection from './components/WritingSection.jsx'
import Footer from './components/Footer.jsx'
import Embeds from './components/ui/Embeds.jsx'

const App = () => {
  React.useEffect(() => {
    document.body.style.cursor = `url("${cursorCur}"), auto`
  }, [])

  return (
    <>
      <BlueGuyRunner inverted top />
      <Header />
      <About />
      <Work />
      <Embeds>
        <TumblrVisuals />
        <AudioSection />
        <VideosSection />
        <WritingSection />
      </Embeds>
      <Footer />
    </>
  )
}

const root = createRoot(document.getElementById('app'))
root.render(<App />)
