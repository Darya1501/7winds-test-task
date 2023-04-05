import React from 'react'
import styles from './table.module.sass'


export const TableHeader = () => {
  return (
    <div className={styles.header}>
    <span className={styles.attribute}>Уровень</span>
    <span className={styles.attribute}>Наименование работ</span>
    <span className={styles.attribute}>Основная з/п</span>
    <span className={styles.attribute}>Оборудование</span>
    <span className={styles.attribute}>Накладные расходы</span>
    <span className={styles.attribute}>Сметная прибыль</span>
  </div>
  )
}
