import React from 'react'

const BlueGuyRunner = ({ count = 10, inverted = false, className = '' }) => {
  const items = Array.from({ length: count }, (_, i) => i)
  return (
    <div className={`runner${inverted ? ' inverted' : ''}${className ? ` ${className}` : ''}`} aria-hidden="true">
      <div className="track">
        {items.map((i) => (
          <img key={`a-${i}`} src="/assets/blue_guy.gif" alt="" />
        ))}
        {items.map((i) => (
          <img key={`b-${i}`} src="/assets/blue_guy.gif" alt="" />
        ))}
      </div>
    </div>
  )
}

export default BlueGuyRunner
