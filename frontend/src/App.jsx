import React, { useState } from 'react'
import {MainPage} from './pages/MainPage';
import styles from './App.module.css'

const App = () => {
  return (
    <div className={styles.appContainer}>
      <div className={`${styles.mainContent}`}>
        <MainPage />
      </div>
    </div>
  );
};

export default App;
