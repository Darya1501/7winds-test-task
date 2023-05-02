import React, { FC, ReactNode, SyntheticEvent } from 'react'
import styles from './tabs.module.sass'

interface ITabProps {
  head: string
  content: ReactNode
}
type ITabsProps = {
  body: Array<ITabProps>
}

export const Tabs: FC<ITabsProps> = ({ body }) => {
  const [ active, setActive ] = React.useState(0);
  const openTab = (event: SyntheticEvent<HTMLButtonElement>) => {
    if (event.currentTarget.dataset.index) setActive(+event.currentTarget.dataset.index)
  };

  return (
    <>
      <div className={styles.headers}>
        {
          body.map((item, index) => (
            <button
              key={index}
              className={styles.head}
              data-index={index}
              onClick={openTab}
            >
              {item.head}
            </button>
          ))
        }
      </div>
      <div className={styles.content}>
        { body[active] && <div>{body[active].content}</div> }
      </div>
    </>
  )
}
