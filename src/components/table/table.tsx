import React from 'react'
import { TableHeader } from './table-header'
import { TableRow } from './table-row'
import styles from './table.module.sass'


export const Table = () => {
  return (
    <div className={styles.table}>
      <TableHeader />
      <TableRow />
      <TableRow />
      <TableRow />
    </div>
  )
}
