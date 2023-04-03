import { NewRowData } from './../../utils/types';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { editRow, saveRow } from "../../utils/functions"
import { EmptyRow, RowData } from "../../utils/types"

type TTableState = {
  displayRows: Array<RowData | EmptyRow>
}

const initialState: TTableState = {
  displayRows: [
    { list_id: Date.now(), parent: null, type: 'level' },
  ]
}

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    edit(state, action: PayloadAction<RowData>) {
      const { current } = editRow(action.payload, state.displayRows.filter(row => 'id' in row) as RowData[])
      state.displayRows[state.displayRows.findIndex(row => ('id' in row) && row.id === current.id)] = current
    },

    addNew(state, action: PayloadAction<{ data: NewRowData, list_id: number }>) {
      const { current, changed } = saveRow(action.payload.data, state.displayRows.filter(row => 'id' in row) as RowData[])
      state.displayRows[state.displayRows.findIndex(row => ('list_id' in row) && row.list_id === action.payload.list_id)] = current
      console.log('current, changed: ', current, changed);
    },

    addEmptyRow(state, action: PayloadAction<{ parent: number | null, type: 'row' | 'level', iconIndex: number }>) {
      const newRow: EmptyRow = {
        list_id: Date.now(),
        parent: action.payload.parent,
        type: action.payload.type,
      }

      let index = state.displayRows.length;
      if (action.payload.parent) {
        index = state.displayRows.findIndex((row) => ('id' in row) && row.id === action.payload.parent) + 1;
      }
      state.displayRows.splice(index, 0, newRow)
    },
  }
})

export const { edit, addNew, addEmptyRow } = tableSlice.actions;
export default tableSlice.reducer;