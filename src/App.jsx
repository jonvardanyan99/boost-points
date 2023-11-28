import './App.scss';
import '@fontsource/open-sans';

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Login } from './pages/Login';

export const App = () => {
  return (
    <BrowserRouter basename="/boost-points">
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
