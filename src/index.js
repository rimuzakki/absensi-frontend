import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:1337/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const token = localStorage.getItem('jwtToken');
if (token !== null) {
  axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
}

WebFont.load({
  google: {
    families: ['Montserrat:wght@300;400;500;700', 'Lato:wght@300;400;700', 'sans-serif']
  }
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
