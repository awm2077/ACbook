import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from '@/router';
import { RouterProvider} from 'react-router-dom';
import '@/theam.css'
import {Provider} from 'react-redux'
import store from '@/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <RouterProvider router={Router} />
    </Provider>
    
);

