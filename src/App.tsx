import './App.scss';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Router } from '~/router';
import { persistor, store } from '~/store';

const stripePromise = loadStripe(
  'pk_test_51OLiWAAzcYPZFg3zOfSieeqmNcHnBYAtOCI7yoxn9NPVG1fVXnY8VwfUROo4zkAruCh6oBksb3G2KiIJQtCG7h34004IKS9xLV',
);

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Elements stripe={stripePromise}>
          <Router />
        </Elements>
      </PersistGate>
    </Provider>
  );
};
