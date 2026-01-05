import React from 'react'
import styles from './BlueGuyRunner.module.css'
import blueGuyGif from '../assets/blue_guy.gif'

const BlueGuyRunner = ({ count = 10, inverted = false, top = false }) => {
  const items = Array.from({ length: count }, (_, i) => i)
  const cls = [styles.runner]
  if (inverted) cls.push(styles['runner--inverted'])
  if (top) cls.push(styles['runner--top'])
  return (
    <div className={cls.join(' ')} aria-hidden="true">
      <div className={styles.runner__track}>
        {items.map((i) => (
          <img key={`a-${i}`} src={blueGuyGif} alt="" />
        ))}
        {items.map((i) => (
          <img key={`b-${i}`} src={blueGuyGif} alt="" />
        ))}
      </div>
    </div>
  )
}

export default BlueGuyRunner
