import React, { FC, FormEvent, useState } from 'react'
import styles from './table.module.sass'

interface ITableCellProps {
  name: string
  data: string | number
  type?: 'text' | 'number'
  placeholder: string
  isEdit: boolean
  setIsEdit: (arg: boolean) => void
}

export const TableCell: FC<ITableCellProps> = ({ name, type = 'text', placeholder, data, isEdit, setIsEdit }) => {
  const [value, setValue] = useState(data)

  return (
    <span
      className={styles.cell}
      onDoubleClick={() => setIsEdit(true)}
    >
      {
        isEdit ? (
          <input
            className={styles.input}
            required
            name={name}
            type={type}
            value={value}
            onChange={(event: FormEvent<HTMLInputElement>) => setValue(event.currentTarget.value)}
            min='0'
            placeholder={placeholder}
            disabled={!isEdit}
          />
        ) : (<span>{data}</span>)}
      
    </span>
  )
}
