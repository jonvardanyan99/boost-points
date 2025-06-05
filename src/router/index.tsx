import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Page } from '~/components/Page';
import { ROUTES } from '~/constants/routes';
import { useQuery } from '~/hooks/useQuery';
import { Account } from '~/pages/Account';
import { ConsentForm } from '~/pages/ConsentForm';
import { CreateAccount } from '~/pages/CreateAccount';
import { Dashboard } from '~/pages/Dashboard';
import { Dispute } from '~/pages/Dispute';
import { DisputeDetails } from '~/pages/DisputeDetails';
import { DisputeFurther } from '~/pages/DisputeFurther';
import { Disputes } from '~/pages/Disputes';
import { EscalateDispute } from '~/pages/EscalateDispute';
import { FAQ } from '~/pages/FAQ';
import { Identification } from '~/pages/Identification';
import { Login } from '~/pages/Login';
import { PaymentMethod } from '~/pages/PaymentMethod';
import { Report } from '~/pages/Report';
import { SubscriptionPlans } from '~/pages/SubscriptionPlans';
import { UpdateDispute } from '~/pages/UpdateDispute';
import { Verification } from '~/pages/Verification';
import { API } from '~/services/api';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setData, setSubscription } from '~/store/slices/user';
import { selectAccount, selectIsAuthenticated } from '~/store/slices/user/selectors';

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
          <Route element={<Navigate to={ROUTES.LOGIN} />} path={ROUTES.HOME} />
          <Route element={isAuthenticated ? <Navigate to={ROUTES.CREATE_ACCOUNT} /> : undefined}>
            <Route element={<Login />} path={ROUTES.LOGIN} />
            <Route element={<Verification />} path={ROUTES.VERIFICATION} />
          </Route>
          <Route element={isAuthenticated ? undefined : <Navigate to={ROUTES.LOGIN} />}>
            <Route element={isNew ? undefined : <Navigate to={ROUTES.CONSENT_FORM} />}>
              <Route
                element={
                  isAccountCreated ? <Navigate to={ROUTES.IDENTIFICATION} /> : <CreateAccount />
                }
                path={ROUTES.CREATE_ACCOUNT}
              />
              <Route
                element={
                  isAccountCreated ? <Identification /> : <Navigate to={ROUTES.CREATE_ACCOUNT} />
                }
                path={ROUTES.IDENTIFICATION}
              />
            </Route>
            <Route element={isNew ? <Navigate to={ROUTES.CREATE_ACCOUNT} /> : undefined}>
              <Route
                element={isConsentFormSigned ? <Navigate to={ROUTES.DASHBOARD} /> : <ConsentForm />}
                path={ROUTES.CONSENT_FORM}
              />
              <Route
                element={isConsentFormSigned ? undefined : <Navigate to={ROUTES.CONSENT_FORM} />}
              >
                <Route element={<Dashboard />} path={ROUTES.DASHBOARD} />
                <Route element={<Report />} path={ROUTES.REPORT} />
                <Route element={<SubscriptionPlans />} path={ROUTES.SUBSCRIPTION_PLANS} />
                <Route element={<Dispute />} path={ROUTES.DISPUTE} />
                <Route element={<Disputes />} path={ROUTES.DISPUTES} />
                <Route element={<DisputeDetails />} path={ROUTES.DISPUTE_DETAILS} />
                <Route element={<UpdateDispute />} path={ROUTES.UPDATE_DISPUTE} />
                <Route element={<DisputeFurther />} path={ROUTES.DISPUTE_FURTHER} />
                <Route element={<EscalateDispute />} path={ROUTES.ESCALATE_DISPUTE} />
                <Route element={<FAQ />} path={ROUTES.FAQ} />
                <Route element={<Account />} path={ROUTES.ACCOUNT} />
                <Route element={<PaymentMethod />} path={ROUTES.PAYMENT_METHOD} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Page>
    </BrowserRouter>
  );
};
