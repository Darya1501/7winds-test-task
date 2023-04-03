import React from 'react'
import { useSelector } from '../../hooks/store-hooks'
import { isFilled } from '../../utils/types'
import { TableHeader } from './table-header'
import { TableRow } from './table-row'
import styles from './table.module.sass'


export const Table = () => {
  const { displayRows } = useSelector(store => store.table)

  return (
    <div className={styles.table}>
      <TableHeader />
      { displayRows.map((data, index) => <TableRow key={isFilled(data) ? data.id : data.list_id} row={data} index={index} />) }
    </div>
  )
}
