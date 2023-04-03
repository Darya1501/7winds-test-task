import React, { FC, useEffect, useState } from "react";

import iconFirstLevel from "../../images/icon-first-level.svg";
import iconSecondLevel from "../../images/icon-second-level.svg";
import iconCalculation from "../../images/icon-calculation.svg";

import styles from "./table.module.sass";
import { useDispatch, useSelector } from "../../hooks/store-hooks";
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

  const [leftLineLength, setLeftLineLength] = useState(0)
  const [leftLinePosition, setLeftLinePosition] = useState(0)
  const [bottomLineLength, setBottomLineLength] = useState(0)

  const dispatch = useDispatch()

  const { displayRows } = useSelector(store => store.table)

  useEffect(() => {
    if (parent) {
      if (displayRows.find(v => ('id' in v) && v.id === parent)?.parent) {
        // Если родитель - строка второго уровня
        setLeftLineLength(24)
        setLeftLinePosition(46)
      } else {
        // Если родитель - строка первого уровня
        if (type === 'row') {
          setLeftLineLength(44)
        } else setLeftLineLength(14)
        setLeftLinePosition(26)
      }
    }
  }, [displayRows, parent, type])

  useEffect(() => {
    if (type === 'level' && ('id' in row)) {
      let lastChildIndex = 0
      for (let i = displayRows.length - 1; i >= 0; i--) {
        if (displayRows[i].parent === row.id) {
          lastChildIndex = i;
          break
        }
      }
      setBottomLineLength((lastChildIndex - index - 1) * 61 + 54)
    }
  }, [displayRows, index, row, type])

  const createRow = (type: 'row' | 'level', parent: number | null) => {
    if ('list_id' in row) return
    dispatch(addEmptyRow({ parent: parent, type: type, iconIndex: index }))
  }

  return (
    <div className={styles.cell}>
      <div
        className={styles.horisontal_line}
        style={{
          width: leftLineLength,
          left: leftLinePosition
        }}
      ></div>
      <div
        className={
          `${styles.icons} ` +
          `${type === 'row' ? styles.row_icon : parent ? styles.second_level_icon : ''} ` +
          `${!('list_id' in row) ? styles.icons_hovered : ''}`
        }
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
      <div
        className={styles.vertical_line}
        style={{
          height: bottomLineLength,
          left: parent ? 46 : 26
        }}
      ></div>
    </div>
  );
};
