import React from 'react'
import ReactDOM from 'react-dom'
import store from './redux/store';
import { Provider } from 'react-redux';

import App from './components/app/app'

ReactDOM.render(
    // Provider包裹App，目的：让App所有的后代容器组件都能接收到store
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);