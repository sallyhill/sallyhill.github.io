import React from 'react'
import classNames from 'classnames'
import styles from './Card.module.css'

const Card = ({ as: As = 'div', alt = false, subtle = false, padding, className = '', style = {}, children, ...rest }) => {
  const classes = classNames(
    styles.card,
    {
      [styles['card--alt']]: alt,
      [styles['card--subtle']]: subtle,
    },
    className
  )
  const mergedStyle = typeof padding === 'number' ? { ...style, padding } : style
  return (
    <As className={classes} style={mergedStyle} {...rest}>
      {children}
    </As>
  )
}

export default Card
