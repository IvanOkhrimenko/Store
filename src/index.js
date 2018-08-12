import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store/store';
import './styles/style.scss';



const Routes = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

const main = document.getElementById('root');
render(
    <Provider store={store}>
        {Routes}
    </Provider>,
    main,
);