import { inspect } from '@xstate/inspect';
import React from 'react';
import { createRoot } from 'react-dom/client';

import SearchListInput from './application/SearchListInput';
import reportWebVitals from './reportWebVitals';

import './index.scss';

// X-State visualiser
if (process.env.NODE_ENV !== 'production') {
  inspect({
    iframe: false,
  });
}

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <SearchListInput />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
