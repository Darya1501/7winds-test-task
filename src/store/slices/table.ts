import { createSlice } from "@reduxjs/toolkit"
import { EmptyRow, RowData } from "../../utils/types"


type TTableState = {
  storedRows: RowData[]
  newRows: EmptyRow[]
}

const initialState: TTableState = {
  storedRows: [
    {
      title: 'string', // Наименование работ
      unit: 'string', // Ед. изм.
      quantity: 5, // Количество
      unitPrice: 5 ,// Цена за ед.
      price: 25, // Стоимость
    
      parent: null, // id уровня, в котором находится (либо null для первого уровня)
      type: 'level',

      id: 1
    },
    {
      title: 'string', // Наименование работ
      unit: 'string', // Ед. изм.
      quantity: 5, // Количество
      unitPrice: 5 ,// Цена за ед.
      price: 25, // Стоимость
    
      parent: 1, // id уровня, в котором находится (либо null для первого уровня)
      type: 'level',

      id: 2
    },
  ],
  newRows: []
}

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    hello() {
      console.log('Reducer works');
    } 
  }
})

export const { hello } = tableSlice.actions;
export default tableSlice.reducer;