import { combineReducers, createStore } from 'redux';

import { authReducer } from './reducers/auth';

const rootReducer = combineReducers({
  auth: authReducer,
});

export const store = createStore(
  rootReducer,
  // eslint-disable-next-line no-underscore-dangle, no-undef
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
