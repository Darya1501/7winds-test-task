import { AppDispatch } from "..";
import { NewRowData, RowData } from "../../utils/types";
import { fetchRowList, fetchCreateRow, fetchUpdateRow } from "../http/table";
import { fillTable, fillEmptyRow, updateExistingRows } from "../slices/table";

export function getRowList() {
  return (dispatch: AppDispatch) => {
    fetchRowList()
      .then(res => dispatch(fillTable(res)));
  };
}

export function createRow(row: NewRowData, list_id: number) {
  return (dispatch: AppDispatch) => {
    fetchCreateRow(row)
      .then((res: {changed: RowData[], current: RowData}) => {
        if (res.current) dispatch(fillEmptyRow({...res, list_id}))
      })
  }
}

export function updateRow(row: RowData) {
  return (dispatch: AppDispatch) => {
    fetchUpdateRow(row)
      .then((res: {changed: RowData[], current: RowData}) => {
        if (res.current) dispatch(updateExistingRows({...res}))
      })
  }
}

export {}