import React, { FC, FormEvent, useState } from 'react'

import { NewRowData, RowData } from '../../utils/types'
import { RowIcons } from './row-icons'
import { TableCell } from './table-cell'

import styles from './table.module.sass'

interface ITableRowProps {
  data?: RowData
}
// TODO: Вынести иконки в отдельный компонент
export const TableRow: FC<ITableRowProps> = ({ data }) => {
  const [ isEdit, setIsEdit ] = useState(!data)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const target = event.target as typeof event.target & {
      title: { value: string };
      unit: { value: string };
      quantity: { value: string };
      unitPrice: { value: string };
    };

    const data: NewRowData = {
      title: target.title.value,
      unit: target.unit.value,
      quantity: +target.quantity.value,
      unitPrice: +target.unitPrice.value,
      price: +target.quantity.value * +target.unitPrice.value,

      parent: null,
      type: 'level'
    }
    console.log('data: ', data);
    setIsEdit(false)
  }

  return (
    <form className={styles.row} onSubmit={onSubmit}>
      <RowIcons isEdit={isEdit} />
      <TableCell
        name='title'
        placeholder={data?.title ? data.title : 'Введите наименование'}
        isEdit={isEdit}
      />
      <TableCell
        name='unit'
        placeholder={data?.unit ? data.unit : 'л'}
        isEdit={isEdit}
      />
      <TableCell
        name='quantity'
        placeholder={data?.quantity ? String(data.quantity) : '1200'}
        type='number'
        isEdit={isEdit}
      />
      <TableCell
        name='unitPrice'
        placeholder={data?.unitPrice ? String(data.unitPrice) : '850'}
        type='number'
        isEdit={isEdit}
      />
      <span className={styles.cell}>{data ? data.price : 0}</span>
      <input type="submit" value="" hidden />
    </form>
  )
}
