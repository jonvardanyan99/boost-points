import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectIsAuthenticated = createSelector([selectUser], state => !!state.tokens);

export const selectAccount = createSelector([selectUser], state => state.account);
