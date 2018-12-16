import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Mindy from './Mindy'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Mindy />, document.getElementById('root'));
registerServiceWorker();
