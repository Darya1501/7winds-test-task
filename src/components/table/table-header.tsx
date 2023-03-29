import React from 'react'
import styles from './table.module.sass'


export const TableHeader = () => {
  return (
    <div className={styles.header}>
    <span className={styles.attribute}>Уровень</span>
    <span className={styles.attribute}>Наименование работ</span>
    <span className={styles.attribute}>Ед. изм.</span>
    <span className={styles.attribute}>Количество</span>
    <span className={styles.attribute}>Цена за ед.</span>
    <span className={styles.attribute}>Стоимость</span>
  </div>
  )
}
