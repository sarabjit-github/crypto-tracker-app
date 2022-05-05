import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from "react-redux";
import * as ReactDOMClient from 'react-dom/client';

import { store } from './app/store';

const root = ReactDOMClient.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Provider store={store}>
    <App />
    </Provider>
  </Router>
);