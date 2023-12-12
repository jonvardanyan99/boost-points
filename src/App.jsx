import './App.scss';

import { Login } from 'pages/Login';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <BrowserRouter basename="/boost-points">
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
