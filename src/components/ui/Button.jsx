import React from 'react'
import classNames from 'classnames'
import styles from './Button.module.css'

const Button = ({ children, className = '', size = 'md', block = false, type = 'button', ...rest }) => {
  const classes = classNames(
    styles.button,
    {
      [styles['button--sm']]: size === 'sm',
      [styles['button--block']]: block,
    },
    className
  )
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  )
}

export default Button
