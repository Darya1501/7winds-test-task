import React, { FC } from 'react'
import styles from './table.module.sass'

interface ITableCellProps {
  name: string
  type?: 'text' | 'number'
  placeholder: string
  isEdit: boolean
}

export const TableCell: FC<ITableCellProps> = ({ name, type = 'text', placeholder, isEdit }) => {
  return (
    <span className={styles.cell}>
      {
        isEdit ? (
          <input
            className={styles.input}
            required
            name={name}
            type={type}
            min='0'
            placeholder={placeholder}
            disabled={!isEdit}
          />
        ) : (<span>{placeholder}</span>)}
      
    </span>
  )
}
