import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { capitalize } from '~/utils/helpers';

import {
  AccountPayload,
  CardInfoPayload,
  DataPayload,
  SubscriptionPayload,
  TokensPayload,
  UserState,
} from './types';

const initialState: UserState = {
  tokens: null,
  account: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTokens(state, action: PayloadAction<TokensPayload>) {
      state.tokens = {
        access: action.payload.accessToken,
        refresh: action.payload.refreshToken,
      };
    },
    setAccount(state, action: PayloadAction<AccountPayload>) {
      state.account = {
        data: action.payload.data,
        isConsentFormSigned: action.payload.isConsentFormSigned,
        subscription: null,
      };
    },
    setData(state, action: PayloadAction<DataPayload>) {
      if (state.account) {
        state.account.data = action.payload;
      }
    },
    unsetNew(state) {
      if (state.account) {
        state.account.data.isNew = false;
      }
    },
    setConsentFormSigned(state) {
      if (state.account) {
        state.account.isConsentFormSigned = true;
      }
    },
    setSubscription(state, action: PayloadAction<SubscriptionPayload>) {
      if (state.account) {
        state.account.subscription = action.payload;
      }
    },
    updateCardInfo(state, action: PayloadAction<CardInfoPayload>) {
      const brand = capitalize(action.payload.brand);
      const lastCardNumbers = action.payload.lastCardNumbers;

      if (state.account?.subscription) {
        state.account.subscription.cardInfo = `${brand} **${lastCardNumbers}`;
      }
    },
  },
});

export const {
  setTokens,
  setAccount,
  setData,
  unsetNew,
  setConsentFormSigned,
  setSubscription,
  updateCardInfo,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
