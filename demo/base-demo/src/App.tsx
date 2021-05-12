import React, { useEffect } from 'react';
import { Button, Space } from 'antd';

import { log } from '@/utils';
import styles from './app.module.scss';
import bgImg from '@/assets/images/bg.jpg';
import { XyImgupload } from 'cloud-xinyi';

import DemoCom from '@/components/demo-component';

function App() {
  useEffect(() => {
    log(`mode is ${process.env.mode}`);
    console.log('process.env:', process.env);
  }, []);

  return (
    <Space direction="vertical" size={20}>
      <div className={styles.colorTxt}>App</div>
      <Button type="primary">antd 按钮</Button>
      <img src={bgImg} style={{ width: 160 }} alt="" />
      <DemoCom />
      <XyImgupload
        cropper={{
          custom: true,
          round: true,
        }}
      />
    </Space>
  );
}

export default App;
