import { Page } from 'components/Page';
import { ROUTES } from 'constants/routes';
import { ConsentForm } from 'pages/ConsentForm';
import { CreateAccount } from 'pages/CreateAccount';
import { Dashboard } from 'pages/Dashboard';
import { Identification } from 'pages/Identification';
import { Login } from 'pages/Login';
import { Report } from 'pages/Report';
import { Verification } from 'pages/Verification';
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { selectAccount, selectIsAuthenticated } from 'store/reducers/user/selectors';

export const Router = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const account = useSelector(selectAccount);

  const isNew = account?.data.isNew;
  const isAccountCreated = isNew && !!account.data.firstName;
  const isConsentFormSigned = !!account?.isConsentFormSigned;

  return (
    <BrowserRouter basename="/boost-points">
      <Page>
        <Routes>
          <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.LOGIN} />} />
          <Route element={isAuthenticated ? <Navigate to={ROUTES.CREATE_ACCOUNT} /> : undefined}>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.VERIFICATION} element={<Verification />} />
          </Route>
          <Route element={isAuthenticated ? undefined : <Navigate to={ROUTES.LOGIN} />}>
            <Route element={isNew ? undefined : <Navigate to={ROUTES.CONSENT_FORM} />}>
              <Route
                path={ROUTES.CREATE_ACCOUNT}
                element={
                  isAccountCreated ? <Navigate to={ROUTES.IDENTIFICATION} /> : <CreateAccount />
                }
              />
              <Route
                path={ROUTES.IDENTIFICATION}
                element={
                  isAccountCreated ? <Identification /> : <Navigate to={ROUTES.CREATE_ACCOUNT} />
                }
              />
            </Route>
            <Route element={isNew ? <Navigate to={ROUTES.CREATE_ACCOUNT} /> : undefined}>
              <Route
                path={ROUTES.CONSENT_FORM}
                element={isConsentFormSigned ? <Navigate to={ROUTES.DASHBOARD} /> : <ConsentForm />}
              />
              <Route
                element={isConsentFormSigned ? undefined : <Navigate to={ROUTES.CONSENT_FORM} />}
              >
                <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                <Route path={ROUTES.REPORT} element={<Report />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Page>
    </BrowserRouter>
  );
};
