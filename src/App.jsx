import './App.scss';

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Login } from './pages/Login';
import { Verification } from './pages/Verification';
import { store } from './store';

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/boost-points">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/verification" element={<Verification />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
