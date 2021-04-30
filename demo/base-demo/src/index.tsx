import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

const container = document.getElementById('root');

if (!container) {
  document.body.innerHTML += '<div id="root"></div>'
}

ReactDOM.render(<App />, document.getElementById('root'));
