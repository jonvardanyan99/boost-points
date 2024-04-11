import { ROUTES } from 'constants/routes';
import { CreateAccount } from 'pages/CreateAccount';
import { Identification } from 'pages/Identification';
import { Login } from 'pages/Login';
import { Verification } from 'pages/Verification';
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { selectIsAuthenticated } from 'store/reducers/auth/selectors';

export const Router = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <BrowserRouter basename="/boost-points">
      <Routes>
        <Route element={isAuthenticated ? <Navigate to={ROUTES.CREATE_ACCOUNT} /> : undefined}>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.VERIFICATION} element={<Verification />} />
        </Route>
        <Route element={isAuthenticated ? undefined : <Navigate to={ROUTES.LOGIN} />}>
          <Route path={ROUTES.CREATE_ACCOUNT} element={<CreateAccount />} />
          <Route path={ROUTES.IDENTIFICATION} element={<Identification />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
