import React from 'react'

import arrow from '../../../images/arrow.svg'

import styles from './navbar.module.sass'
import { NavLink } from './navigation/nav-link'

export const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.header}>
        <div className={styles.text}>
          <span className={styles.param}>Название проекта</span>
          <span className={styles.value}>Аббревиатура</span>
        </div>
        <img src={arrow} alt="" />
      </div>

      <ol className={styles.list}>
        <NavLink>По проекту</NavLink>
        <NavLink>Объекты</NavLink>
        <NavLink>РД</NavLink>
        <NavLink>МТО</NavLink>
        <NavLink isActive>СМР</NavLink>
        <NavLink>График</NavLink>
        <NavLink>МиМ</NavLink>
        <NavLink>Рабочие</NavLink>
        <NavLink>Капвложения</NavLink>
        <NavLink>Бюджет</NavLink>
        <NavLink>Финансирование</NavLink>
        <NavLink>Панорамы</NavLink>
        <NavLink>Камеры</NavLink>
        <NavLink>Поручения</NavLink>
        <NavLink>Контрагенты</NavLink>
      </ol>
    </div>
  )
}
