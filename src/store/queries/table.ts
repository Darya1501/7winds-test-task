import axios from "axios";
import { AppDispatch } from "..";
import { API_URL, EID } from "../../utils/constants";
import { NewRowData, RowData } from "../../utils/types";
import { fillTable, fillEmptyRow, updateExistingRows, deleteExistingRow } from "../slices/table";

export function getRowList() {
  return async (dispatch: AppDispatch) => {
    const response = await axios.get<RowData[]>(`${API_URL}/v1/outlay-rows/entity/${EID}/row/list`)

    if (response.status === 200)
      dispatch(fillTable(response.data))
  };
}

export type TPostResponse = {
  changed: RowData[]
  current: RowData
}

export function createRow(row: NewRowData, listId: number) {
  return async (dispatch: AppDispatch) => {
    const response = await axios.post<TPostResponse>(`${API_URL}/v1/outlay-rows/entity/${EID}/row/create`, row)

    if (response.status === 200)
      dispatch(fillEmptyRow({ ...response.data, listId }))
  }
}

export function updateRow(row: RowData) {
  return async (dispatch: AppDispatch) => {
    const response = await axios.post<TPostResponse>(`${API_URL}/v1/outlay-rows/entity/${EID}/row/${row.id}/update`, row)

    if (response.status === 200)
      dispatch(updateExistingRows({ ...response.data }))
  }
}

export type TDeleteResponse = {
  changed: RowData[]
  current: null
}
export function deleteRow(row: RowData) {
  return async (dispatch: AppDispatch) => {
    const response = await axios.delete<TDeleteResponse>(`${API_URL}/v1/outlay-rows/entity/${EID}/row/${row.id}/delete`)

    if (response.status === 200)
      dispatch(deleteExistingRow({ ...response.data, current: row }))
  }
}

export {}