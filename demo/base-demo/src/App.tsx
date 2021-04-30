import React, { useEffect } from 'react';
import { log } from '@/utils';

function App() {
  useEffect(() => {
    log('on app render');
  }, []);

  return <div>App</div>;
}

export default App;
