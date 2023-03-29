import React, { useState } from 'react'
import iconFirstLevel from '../../images/icon-first-level.svg'
import iconSecondLevel from '../../images/icon-second-level.svg'
import iconCalculation from '../../images/icon-calculation.svg'
import styles from './table.module.sass'

// TODO: Вынести иконки в отдельный компонент
export const TableRow = () => {
  const [isSecondIconsVisiable, setIsSecondIconsVisiable] = useState(false)

  return (
    <div className={styles.row}>
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
      <span className={styles.cell}>Название</span>
      <span className={styles.cell}></span>
      <span className={styles.cell}></span>
      <span className={styles.cell}></span>
      <span className={styles.cell}>1 209 122,5</span>
    </div>
  )
}
