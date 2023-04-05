import React from 'react'

import menuIcon from '../../../images/menu-icon.svg'
import backIcon from '../../../images/back-icon.svg'

import styles from './header.module.sass'

export const Navigation = () => {
  return (
    <div className={styles.navigation}>
      <div className={styles.buttons}>
        <img src={menuIcon} alt="menu" />
        <img src={backIcon} alt="back" />
      </div>

      <div className={styles.links}>
        <a href="/" className={styles.active}>Просмотр</a>
        <a href="/">Управление</a>
      </div>
    </div>
  )
}
