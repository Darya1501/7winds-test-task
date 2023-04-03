import React, { FC, useState } from "react";

import iconFirstLevel from "../../images/icon-first-level.svg";
import iconSecondLevel from "../../images/icon-second-level.svg";
import iconCalculation from "../../images/icon-calculation.svg";

import styles from "./table.module.sass";
import { useDispatch } from "../../hooks/store-hooks";
import { addEmptyRow } from "../../store/slices/table";
import { EmptyRow, RowData } from "../../utils/types";

interface IRowIconsProps {
  parent: number | null;
  type: "level" | "row";
  index: number,
  row: RowData | EmptyRow
}

export const RowIcons: FC<IRowIconsProps> = ({ parent, type, index, row }) => {
  const [isSecondIconsVisiable, setIsSecondIconsVisiable] = useState(false);
  const dispatch = useDispatch()

  const createRow = (type: 'row' | 'level', parent: number | null) => {
    if ('list_id' in row) return
    dispatch(addEmptyRow({ parent: parent, type: type, iconIndex: index }))
  }

  return (
    <div className={styles.cell}>
      <div
        className={`
          ${styles.icons}
          ${type === 'row' ? styles.row_icon : parent ? styles.second_level_icon : null}
          ${!('list_id' in row) && styles.icons_hovered}
        `}
        onMouseEnter={() => setIsSecondIconsVisiable(true && !('list_id' in row))}
        onMouseLeave={() => setIsSecondIconsVisiable(false)}
      >
        {type === "row" ? (
          <img onClick={() => createRow('row', row.parent)} src={iconCalculation} alt='' />
        ) : parent ? (
          <>
            <img onClick={() => createRow('level', row.parent)} src={iconSecondLevel} alt='' />
            {isSecondIconsVisiable && ('id' in row) && (<img onClick={() => createRow('row', row.id)} src={iconCalculation} alt='' />)}
          </>
        ) : (
          <>
            <img onClick={() => createRow('level', null)} src={iconFirstLevel} alt='' />
            {
              isSecondIconsVisiable  && ('id' in row) &&
              (<>
                <img onClick={() => createRow('level', row.id)} src={iconSecondLevel} alt='' />
                <img onClick={() => createRow('row', row.id)} src={iconCalculation} alt='' />
              </>)
            }
          </>
        )}
      </div>
    </div>
  );
};
