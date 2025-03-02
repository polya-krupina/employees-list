import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/reset.css'
import './styles/common.css'
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/Header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <div className="App">
                <Header />
                <div className='page-content'>
                    <App /> 
                </div>
            </div>
        </BrowserRouter>
    </Provider>
);