import { createSlice } from '@reduxjs/toolkit';
import { capitalize } from 'utils/helpers';

const initialState = {
  tokens: null,
  account: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTokens(state, action) {
      state.tokens = {
        access: action.payload.accessToken,
        refresh: action.payload.refreshToken,
      };
    },
    setAccount(state, action) {
      state.account = {
        data: action.payload.data,
        isConsentFormSigned: action.payload.isConsentFormSigned,
        subscription: null,
      };
    },
    setData(state, action) {
      state.account.data = action.payload;
    },
    unsetNew(state) {
      state.account.data.isNew = false;
    },
    setConsentFormSigned(state) {
      state.account.isConsentFormSigned = true;
    },
    setSubscription(state, action) {
      state.account.subscription = action.payload;
    },
    updateCardInfo(state, action) {
      const brand = capitalize(action.payload.brand);
      const lastCardNumbers = action.payload.lastCardNumbers;

      state.account.subscription.cardInfo = `${brand} **${lastCardNumbers}`;
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
