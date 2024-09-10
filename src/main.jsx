import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from './components/Redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store = {store}>
    <App />
    <Toaster position='top-center'/>
    </Provider>
  </React.StrictMode>,
)
