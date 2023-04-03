import React, { FC, FormEvent, useState } from 'react'
import { useDispatch } from '../../hooks/store-hooks'
import { addNew, edit } from '../../store/slices/table'

import { EmptyRow, isFilled, NewRowData, RowData } from '../../utils/types'
import { RowIcons } from './row-icons'
import { TableCell } from './table-cell'

import styles from './table.module.sass'

interface ITableRowProps {
  row: RowData | EmptyRow,
  index: number
}

export const TableRow: FC<ITableRowProps> = ({ row, index }) => {
  const [ isEdit, setIsEdit ] = useState(!isFilled(row))
  const dispatch = useDispatch()

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isEdit) return

    const target = event.target as typeof event.target & {
      title: { value: string };
      unit?: { value: string };
      quantity?: { value: number };
      unitPrice?: { value: number };
    };

    const data: NewRowData & { list_id?: number } | RowData = {
      ...row,
      title: target.title.value,
      unit: target.unit?.value || '',
      quantity: target.quantity?.value || 0,
      unitPrice: target.unitPrice?.value || 0,
      price: target.quantity && target.unitPrice ? target.quantity.value * target.unitPrice.value : 0,
    }

    if ('id' in data) {
      dispatch(edit(data))
    } else {
      if ('list_id' in row) {
        delete data['list_id']
        dispatch(addNew({ data, list_id: row.list_id }))
      }
    }

    setIsEdit(false)
  }

  return (
    <form className={styles.row} onSubmit={onSubmit}>
      <RowIcons
        type={row?.type ? row.type : 'level'}
        parent={row?.parent ? row.parent : null}
        index={index}
        row={row}
      />
      <TableCell
        name='title'
        placeholder='Введите наименование'
        data={isFilled(row) ? row?.title : ''}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
      {
        row.type === 'row' ? (
          <>
            <TableCell
              name='unit'
              placeholder='л'
              data={isFilled(row) ? row?.unit : ''}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
            />
            <TableCell
              name='quantity'
              placeholder='1200'
              data={isFilled(row) ? row?.quantity : ''}
              type='number'
              isEdit={isEdit}
              setIsEdit={setIsEdit}
            />
            <TableCell
              name='unitPrice'
              placeholder='850'
              data={isFilled(row) ? row?.unitPrice : ''}
              type='number'
              isEdit={isEdit}
              setIsEdit={setIsEdit}
            />
          </>
        ) : (<span className={styles.plug_cell}></span>)
      }
      
      <span className={styles.cell}>{isFilled(row) ? row.price : 0}</span>
      <input type="submit" value="" hidden />
    </form>
  )
}
