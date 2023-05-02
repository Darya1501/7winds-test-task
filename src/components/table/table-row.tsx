import React, {CSSProperties, FC, FormEvent, useState} from 'react'

import { useDispatch } from '../../hooks/store-hooks'
import { createRow, updateRow } from '../../store/queries/table'
import { RowData, EmptyRow, isFilled } from '../../utils/types'

import { RowIcons } from './row-icons'
import { TableCell } from './table-cell'

import styles from './table.module.sass'

interface ITableRowProps {
  row: RowData | EmptyRow,
  index: number,
  parentIndex: number,
  depth: number
}

export const TableRow: FC<ITableRowProps> = ({ row, index, parentIndex, depth }) => {
  const [ isEdit, setIsEdit ] = useState(!('id' in row))
  const dispatch = useDispatch()

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isEdit) return

    const target = event.target as typeof event.target & {
      rowName: { value: string };
      salary?: { value: number };
      equipmentCosts?: { value: number };
      overheads?: { value: number };
      estimatedProfit?: { value: number };
    };

    const data: EmptyRow | RowData = {
      ...row,
      rowName: target.rowName.value,
      salary: target.salary?.value || 0,
      equipmentCosts: target.equipmentCosts?.value || 0,
      overheads: target.overheads?.value || 0,
      estimatedProfit: target.estimatedProfit?.value || 0,
    }

    if (!isFilled(data)) {
      dispatch(createRow(data, data.listId))
    } else {
      dispatch(updateRow(data))
    }

    setIsEdit(false)
  }

  return (
    <div className={styles.group}>
      <form className={styles.row} onSubmit={onSubmit} style={{'--depth': `depth-${depth}`} as CSSProperties}>
        <RowIcons depth={depth} index={index - parentIndex} isEdit={isEdit} row={row} />

        <TableCell
          name='rowName'
          placeholder='Введите наименование'
          data={isFilled(row) ? row?.rowName : ''}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
        <TableCell
          name='salary'
          placeholder='38200'
          data={isFilled(row) ? row?.salary : ''}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
        <TableCell
          name='equipmentCosts'
          placeholder='1200'
          data={isFilled(row) ? row?.equipmentCosts : ''}
          type='number'
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
        <TableCell
          name='overheads'
          placeholder='850'
          data={isFilled(row) ? row?.overheads : ''}
          type='number'
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
        <TableCell
          name='estimatedProfit'
          placeholder='1020000'
          data={isFilled(row) ? row?.estimatedProfit : ''}
          type='number'
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />

        <input type="submit" value="" hidden />
      </form>

      {('id' in row) && row.child.map((child, i) =>
        <TableRow
          key={isFilled(child) ? child.id : child.listId}
          row={child}
          parentIndex={index}
          index={i + index + 1}
          depth={depth + 1}
        />
      )}
    </div>
  )
}
