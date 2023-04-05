import React from 'react'
import { useSelector } from '../../hooks/store-hooks'
import { TableHeader } from './table-header'
import { TableRow } from './table-row'
import styles from './table.module.sass'


export const Table = () => {
  const { displayRows } = useSelector(store => store.table)

  return (
    <div className={styles.table}>
      <TableHeader />
      <ul className={styles.ul}>
        { displayRows.map((data, index) => <TableRow key={('id' in data) ? data.id : 123} row={data} index={index} depth={0} />) }
      </ul>
    </div>
  )
}
