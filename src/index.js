import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import store from './Redux/store';
import Routes from './Routes';

ReactDOM.render(
   
                <Provider  store={store}>
                   <Routes/>
                </Provider>,
                 document.getElementById('root'));

serviceWorker.unregister();
