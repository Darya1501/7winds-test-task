import { isFilled, RowData } from './../../utils/types';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { EmptyRow } from "../../utils/types"

type TTableState = {
  displayRows: Array<RowData | EmptyRow>
}

const initialState: TTableState = {
  displayRows: [
    {
      listId: 1,
      parentId: null,

      rowName: "",
      salary: 0,
      equipmentCosts: 0,
      overheads: 0,
      estimatedProfit: 0,

      machineOperatorSalary: 0,
      mainCosts: 0,
      materials: 0,
      mimExploitation: 0,
      supportCosts: 0,
    }
  ]
}

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    fillTable(state, action: PayloadAction<RowData[]>) {
      if (action.payload.length) state.displayRows = action.payload
    },

    updateExistingRows(state, action: PayloadAction<{ changed: RowData[], current: RowData }>) {
      function updateArray(array: Array<RowData | EmptyRow>) {
        return array.map((elem) => {
          if ('listId' in elem) return elem
          if (elem.id === action.payload.current.id) elem = { ...elem, ...action.payload.current }
          const changedObj = action.payload.changed.find((v) => v.id === (elem as RowData).id)
          if (changedObj) elem = { ...elem, ...changedObj }
          if (elem.child && elem.child.length) elem.child = updateArray(elem.child)

          return elem
        })
      }
      state.displayRows = updateArray(state.displayRows)
    },

    fillEmptyRow(state, action: PayloadAction<{ changed: RowData[], current: RowData, listId: number }>) {
      function updateArray(array: Array<RowData | EmptyRow>) {
        return array.map((elem) => {
          if ('listId' in elem) {
            if (elem.listId === action.payload.listId) return { ...action.payload.current, child: [] }
          } else {
            const changedObj = action.payload.changed.find((v) => v.id === (elem as RowData).id)
            if (changedObj) elem = { ...elem, ...changedObj }
            if (elem.child && elem.child.length) elem.child = updateArray(elem.child)
          }
          return elem
        })
      }
      state.displayRows = updateArray(state.displayRows)
    },

    deleteExistingRow(state, action: PayloadAction<{ changed: RowData[], current: RowData }>) {
      function updateArray(array: Array<RowData | EmptyRow>) {
        return array.reduce((acc: Array<RowData | EmptyRow>, curr) => {
          if (isFilled(curr)) {
            if (curr.id === action.payload.current.id) return acc
            const changedObj = action.payload.changed.find((v) => v.id === (curr as RowData).id)
            if (changedObj) curr = { ...curr, ...changedObj }
            if (curr.child.length) curr.child = updateArray(curr.child)
          }

          acc.push(curr)
          return acc
        }, [])
      }
      state.displayRows = updateArray(state.displayRows)
    },

    addEmptyRow(state, action: PayloadAction<{ parent: RowData }>) {
      const newRow: EmptyRow = {
        listId: Date.now(),
        parentId: action.payload.parent.id,

        rowName: '',
        salary: 0,
        equipmentCosts: 0,
        overheads: 0,
        estimatedProfit: 0,

        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        supportCosts: 0,
      }

      function addChild(array: Array<RowData | EmptyRow>) {
        return array.map((row) => {
          if (!isFilled(row)) return row
          if (row.id === action.payload.parent.id) {
            row.child.push(newRow)
          } else addChild(row.child)
          return row
        })
      }

      state.displayRows = addChild(state.displayRows)
    },
  }
})

export const { fillTable, addEmptyRow, fillEmptyRow, updateExistingRows, deleteExistingRow } = tableSlice.actions;
export default tableSlice.reducer;