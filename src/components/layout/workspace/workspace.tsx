import React from 'react'
import { Table } from '../../table/table'
import { Tabs } from '../../tabs/tabs'


export const Workspace = () => {
  const content = [
    {
      head: 'Строительно-монтажные работы',
      content: <Table />
    }
  ]
  return (
    <div>
      <Tabs body={content}  />
    </div>
  )
}
