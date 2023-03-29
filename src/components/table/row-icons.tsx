import React, { FC, useState } from 'react'

import iconFirstLevel from '../../images/icon-first-level.svg'
import iconSecondLevel from '../../images/icon-second-level.svg'
import iconCalculation from '../../images/icon-calculation.svg'

import styles from './table.module.sass'

interface IRowIconsProps {
  isEdit: boolean
}

export const RowIcons: FC<IRowIconsProps> = ({ isEdit }) => {
  const [ isSecondIconsVisiable, setIsSecondIconsVisiable ] = useState(false)

  return (
    <span className={styles.cell}>
      <div
        className={styles.icons}
        onMouseEnter={() => setIsSecondIconsVisiable(true)}
        onMouseLeave={() => setIsSecondIconsVisiable(false)}
      >
        <img
          src={iconFirstLevel}
          alt=""
        />
        {
          isSecondIconsVisiable &&
          (
            <>
              <img src={iconSecondLevel} alt="" />
              <img src={iconCalculation} alt="" />
            </>
          )
        }
      </div>
    </span>
  )
}
