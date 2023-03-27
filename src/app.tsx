import React from 'react';
import { Header } from './components/layout/header/header';
import { Navbar } from './components/layout/navbar/navbar';
import { Workspace } from './components/layout/workspace/workspace';

import styles from './app.module.sass'

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <Navbar />
      <Workspace />
    </div>
  );
}

export default App;
