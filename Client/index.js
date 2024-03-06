import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store.js'

// render app from App.jsx file on the html element with id of app in the index.html page
render(<Provider store={store}><App /></Provider>, document.getElementById('app'));
