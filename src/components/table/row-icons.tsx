import React, { FC, useState } from "react";

import iconCalculation from "../../images/icon-calculation.svg";
import iconTrash from "../../images/icon-trash.svg";

import styles from "./table.module.sass";
import { useDispatch } from "../../hooks/store-hooks";
import { addEmptyRow } from "../../store/slices/table";
import { EmptyRow, RowData } from "../../utils/types";

interface IRowIconsProps {
  depth: number,
  isEdit: boolean,
  row: RowData | EmptyRow
}

export const RowIcons: FC<IRowIconsProps> = ({ depth, isEdit, row }) => {
  const [ isSecondIconsVisiable, setIsSecondIconsVisiable ] = useState(false);
  const dispatch = useDispatch()

  const createRow = () => {
    if ('list_id' in row) return
    dispatch(addEmptyRow({ parent: row }))
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
        { isSecondIconsVisiable && (!isEdit) && (<img src={iconTrash} alt='' />) }
      </div>
    </div>
  )
};
