export interface EmptyRow {
  list_id: number,
  parent: number | null,
  type: 'level' | 'row'
}

export const isFilled = (object: any): object is RowData => {
  return 'id' in object
}

export interface NewRowData {
  title: string // Наименование работ
  unit: string // Ед. изм.
  quantity: number // Количество
  unitPrice: number // Цена за ед.
  price: number // Стоимость

  parent: number | null // id уровня, в котором находится (либо null для первого уровня)
  type: 'level' | 'row'
}

export interface RowData extends NewRowData {
  id: number
}