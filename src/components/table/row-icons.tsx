import React, {CSSProperties, FC} from "react";

import iconCalculation from "../../images/icon-calculation.svg";
import iconTrash from "../../images/icon-trash.svg";

import styles from "./table.module.sass";
import { useDispatch } from "../../hooks/store-hooks";
import { addEmptyRow } from "../../store/slices/table";
import { EmptyRow, isFilled, RowData } from "../../utils/types";
import { deleteRow } from "../../store/queries/table";
import clsx from "clsx";

interface IRowIconsProps {
  depth: number,
  isEdit: boolean,
  row: RowData | EmptyRow;
  index: number;
}

export const RowIcons: FC<IRowIconsProps> = ({ depth, isEdit, row, index }) => {
  const dispatch = useDispatch()

  const createRow = () => {
    if (!isFilled(row) || isEdit) return
    dispatch(addEmptyRow({ parent: row }))
  }

  const deleteCurrentRow = () => {
    if (!isFilled(row)) return
    dispatch(deleteRow(row))
  }

  return (
    <div
      className={clsx(styles.cell, { [styles.depth]: depth !==0 })}
      style={{ "--line-left": `${5 + (20 * depth)}px`, "--index": index } as CSSProperties }
    >
      <div
        className={`${styles.icons} ${!isEdit ? styles.icons_hovered : ''}`}
        style={{ marginLeft: depth * 20 }}
      >
        <img onClick={createRow} src={iconCalculation} alt='' />
        { depth !== 0 && (!isEdit) && (<img onClick={deleteCurrentRow} className={styles.secondIcon} src={iconTrash} alt='' />) }
      </div>
    </div>
  )
};
