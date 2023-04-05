import React, { FC } from 'react'
import projectIcon from '../../../../images/project-icon.svg'
import styles from './nav-link.module.sass'

interface INavLinkProps {
  children: string,
  isActive?: boolean
}

export const NavLink: FC<INavLinkProps> = ({ children, isActive }) => {
  return (
    <li className={`${styles.link} ${isActive ? styles.active : ''}`}>
      <img src={projectIcon} alt="" />
      <span className={styles.text}>{children}</span>
    </li>
  )
}
