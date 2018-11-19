import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Box from './App'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Box />, document.getElementById('root'));
registerServiceWorker();
