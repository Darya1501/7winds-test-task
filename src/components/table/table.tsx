import React from 'react'
import { useSelector } from '../../hooks/store-hooks'
import { TableHeader } from './table-header'
import { TableRow } from './table-row'
import styles from './table.module.sass'


export const Table = () => {
  const { storedRows } = useSelector(store => store.table)

  return (
    <div className={styles.table}>
      <TableHeader />
      { storedRows.map(data => <TableRow key={data.id} data={data} />) }
      <TableRow />
    </div>
  )
}
