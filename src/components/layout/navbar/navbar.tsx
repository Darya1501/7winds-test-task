import React from 'react'
import styles from './navbar.module.sass'

export const Navbar = () => {
  return (
    <div className={styles.navbar}>
      Navbar
      <ol>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ol>
    </div>
  )
}
