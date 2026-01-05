import React from 'react'
import styles from './Embeds.module.css'

const Embeds = ({ as: As = 'section', className = '', children, ...rest }) => (
  <As className={`${styles.embeds} ${className}`.trim()} {...rest}>
    {children}
  </As>
)

export default Embeds
