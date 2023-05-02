export const isFilled = (object: any): object is RowData => {
  return 'id' in object
}

export interface UnusedData {
  machineOperatorSalary: 0,
  mainCosts: 0,
  materials: 0,
  mimExploitation: 0,
  supportCosts: 0
}

interface RowBasic extends UnusedData {
  rowName: string, // Наименование работ
  salary: number, // Основная зп
  equipmentCosts: number, // Оборудование
  overheads: number, // Накладные расходы
  estimatedProfit: number, // Сметная прибыль
}

export interface NewRowData extends RowBasic {
  parentId: number | null,
}

export interface EmptyRow extends NewRowData {
  listId: number
}

export interface RowData extends RowBasic {
  id: number,
  total: number,
  child: Array<RowData | EmptyRow>,
}