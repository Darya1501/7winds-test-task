import React, { useEffect } from 'react';
import { Header } from './components/layout/header/header';
import { Navbar } from './components/layout/navbar/navbar';
import { Workspace } from './components/layout/workspace/workspace';

import styles from './app.module.sass'
import { useDispatch } from './hooks/store-hooks';
import { getRowList } from './store/queries/table';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRowList())
  }, [dispatch])
  
  return (
    <div className={styles.app}>
      <Header />
      <Navbar />
      <Workspace />
    </div>
  );
}

export default App;
