import React, { FC, useState } from "react";

import iconCalculation from "../../images/icon-calculation.svg";
import iconTrash from "../../images/icon-trash.svg";

import styles from "./table.module.sass";
import { useDispatch } from "../../hooks/store-hooks";
import { addEmptyRow } from "../../store/slices/table";
import { EmptyRow, isFilled, RowData } from "../../utils/types";
import { deleteRow } from "../../store/queries/table";

interface IRowIconsProps {
  depth: number,
  isEdit: boolean,
  row: RowData | EmptyRow
}

export const RowIcons: FC<IRowIconsProps> = ({ depth, isEdit, row }) => {
  const [ isSecondIconsVisiable, setIsSecondIconsVisiable ] = useState(false);
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
    <div className={styles.cell}>
      <div
        className={`${styles.icons} ${!isEdit ? styles.icons_hovered : ''}`}
        style={{ marginLeft: depth * 20 }}
        onMouseEnter={() => setIsSecondIconsVisiable(true)}
        onMouseLeave={() => setIsSecondIconsVisiable(false)}
      >
        <img onClick={createRow} src={iconCalculation} alt='' />
        { isSecondIconsVisiable && depth !== 0 && (!isEdit) && (<img onClick={deleteCurrentRow} src={iconTrash} alt='' />) }
      </div>
    </div>
  )
};
