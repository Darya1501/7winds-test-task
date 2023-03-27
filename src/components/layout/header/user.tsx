import React from 'react'
import userImage from '../../../images/user.jpg'
import arrow from '../../../images/arrow.svg'
import styles from './header.module.sass'

export const User = () => {
  return (
    <div className={styles.user}>
      <img src={userImage} alt="" className={styles.photo} />
      <span>Антон Петров</span>
      <img src={arrow} alt="" />
    </div>
  )
}
