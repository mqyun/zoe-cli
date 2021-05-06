import React, { useEffect } from 'react';
import { Button } from 'antd';

import { log } from '@/utils';
import styles from '../app.module.scss';

function App() {
  useEffect(() => {
    log('on app render');
  }, []);

  return (
    <>
      <div className={styles.colorTxt} style={{ marginBottom: 20 }}>App</div>
      <Button type="primary">antd 按钮</Button>
    </>
  );
}

export default App;
