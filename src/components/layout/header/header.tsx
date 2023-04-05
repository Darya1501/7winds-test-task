import React from 'react'

import { Navigation } from './navigation'
import { User } from './user'

import styles from './header.module.sass'

export const Header = () => {
  return (
    <header className={styles.header}>
      <Navigation />
      <User />
    </header>
  )
}
