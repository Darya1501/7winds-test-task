import { API_URL, EID } from "../../utils/constants"
import { NewRowData, RowData } from "../../utils/types"

export async function fetchRowList() {
  return await fetch(`${API_URL}/v1/outlay-rows/entity/${EID}/row/list`)
    .then(res => res.json())
}

export async function fetchCreateRow(row: NewRowData) {
  return await fetch(`${API_URL}/v1/outlay-rows/entity/${EID}/row/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(row)
  })
    .then(res => res.json())
}

export async function fetchUpdateRow(row: RowData) {
  return await fetch(`${API_URL}/v1/outlay-rows/entity/${EID}/row/${row.id}/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(row)
  })
    .then(res => res.json())
}

export async function fetchDeleteRow(row: RowData) {
  return await fetch(`${API_URL}/v1/outlay-rows/entity/${EID}/row/${row.id}/delete`, {
    method: 'DELETE'
  })
    .then(res => res.json())
}