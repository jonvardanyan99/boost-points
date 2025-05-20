import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App';
import { reportWebVitals } from './reportWebVitals';

const root = ReactDOM.createRoot(global.document.getElementById('root') as HTMLDivElement);

root.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
);

reportWebVitals();
