import { ROUTES } from 'constants/routes';
import { ConsentForm } from 'pages/ConsentForm';
import { CreateAccount } from 'pages/CreateAccount';
import { Identification } from 'pages/Identification';
import { Login } from 'pages/Login';
import { Verification } from 'pages/Verification';
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { selectAccount, selectIsAuthenticated } from 'store/reducers/user/selectors';

export const Router = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const account = useSelector(selectAccount);

  const isNew = account?.isNew;
  const hasAccountCreated = isNew && !!account.firstName;

  return (
    <BrowserRouter basename="/boost-points">
      <Routes>
        <Route element={isAuthenticated ? <Navigate to={ROUTES.CREATE_ACCOUNT} /> : undefined}>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.VERIFICATION} element={<Verification />} />
        </Route>
        <Route element={isAuthenticated ? undefined : <Navigate to={ROUTES.LOGIN} />}>
          <Route element={isNew ? undefined : <Navigate to={ROUTES.CONSENT_FORM} />}>
            <Route
              path={ROUTES.CREATE_ACCOUNT}
              element={
                hasAccountCreated ? <Navigate to={ROUTES.IDENTIFICATION} /> : <CreateAccount />
              }
            />
            <Route
              path={ROUTES.IDENTIFICATION}
              element={
                hasAccountCreated ? <Identification /> : <Navigate to={ROUTES.CREATE_ACCOUNT} />
              }
            />
          </Route>
          <Route
            path={ROUTES.CONSENT_FORM}
            element={isNew ? <Navigate to={ROUTES.CREATE_ACCOUNT} /> : <ConsentForm />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
