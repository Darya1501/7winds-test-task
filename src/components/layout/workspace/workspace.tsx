import React from 'react'
import { Table } from '../../table/table'
import { Tabs } from '../../tabs/tabs'
import styles from './workspace.module.sass'

export const Workspace = () => {
  const content = [
    {
      head: 'Строительно-монтажные работы',
      content: <Table />
    }
  ]
  return (
    <div className={styles.content}>
      <Tabs body={content}  />
    </div>
  )
}
