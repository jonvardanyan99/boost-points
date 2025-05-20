import { Page } from 'components/Page';
import { ROUTES } from 'constants/routes';
import { useQuery } from 'hooks/useQuery';
import { Account } from 'pages/Account';
import { ConsentForm } from 'pages/ConsentForm';
import { CreateAccount } from 'pages/CreateAccount';
import { Dashboard } from 'pages/Dashboard';
import { Dispute } from 'pages/Dispute';
import { DisputeDetails } from 'pages/DisputeDetails';
import { DisputeFurther } from 'pages/DisputeFurther';
import { Disputes } from 'pages/Disputes';
import { EscalateDispute } from 'pages/EscalateDispute';
import { FAQ } from 'pages/FAQ';
import { Identification } from 'pages/Identification';
import { Login } from 'pages/Login';
import { PaymentMethod } from 'pages/PaymentMethod';
import { Report } from 'pages/Report';
import { SubscriptionPlans } from 'pages/SubscriptionPlans';
import { UpdateDispute } from 'pages/UpdateDispute';
import { Verification } from 'pages/Verification';
import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { API } from 'services/api';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setData, setSubscription } from 'store/slices/user';
import { selectAccount, selectIsAuthenticated } from 'store/slices/user/selectors';

export const Router: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const account = useAppSelector(selectAccount);
  const dispatch = useAppDispatch();

  const isNew = account?.data.isNew;
  const isAccountCreated = isNew && !!account.data.firstName;
  const isConsentFormSigned = !!account?.isConsentFormSigned;

  const { data: accountData } = useQuery({ requestFn: API.getAccount, skip: !isAuthenticated });

  const { data: subscriptionData } = useQuery({
    requestFn: API.getSubscription,
    skip: !isAuthenticated,
  });

  useEffect(() => {
    if (accountData) {
      dispatch(setData(accountData));
    }
  }, [accountData, dispatch]);

  useEffect(() => {
    if (subscriptionData) {
      dispatch(setSubscription(subscriptionData));
    }
  }, [subscriptionData, dispatch]);

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
                <Route path={ROUTES.SUBSCRIPTION_PLANS} element={<SubscriptionPlans />} />
                <Route path={ROUTES.DISPUTE} element={<Dispute />} />
                <Route path={ROUTES.DISPUTES} element={<Disputes />} />
                <Route path={ROUTES.DISPUTE_DETAILS} element={<DisputeDetails />} />
                <Route path={ROUTES.UPDATE_DISPUTE} element={<UpdateDispute />} />
                <Route path={ROUTES.DISPUTE_FURTHER} element={<DisputeFurther />} />
                <Route path={ROUTES.ESCALATE_DISPUTE} element={<EscalateDispute />} />
                <Route path={ROUTES.FAQ} element={<FAQ />} />
                <Route path={ROUTES.ACCOUNT} element={<Account />} />
                <Route path={ROUTES.PAYMENT_METHOD} element={<PaymentMethod />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Page>
    </BrowserRouter>
  );
};
