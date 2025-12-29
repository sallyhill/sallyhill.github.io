import React from 'react'
import BlueGuyRunner from './BlueGuyRunner.jsx'

const Footer = () => {
  const y = new Date().getFullYear()
  return (
    <footer aria-label="Site footer with animated blue guy">
      <BlueGuyRunner />
      <div>© <span>{y}</span> Sally Hill used chat gpt 5. All rights reserved.</div>
    </footer>
  )
}

export default Footer;