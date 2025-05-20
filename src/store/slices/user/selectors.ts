import { createSelector, Selector } from 'reselect';
import { AppState } from 'store';

import { UserState } from './types';

const selectUser: Selector<AppState, UserState> = state => state.user;

export const selectIsAuthenticated = createSelector([selectUser], state => !!state.tokens);
export const selectAccount = createSelector([selectUser], state => state.account);
