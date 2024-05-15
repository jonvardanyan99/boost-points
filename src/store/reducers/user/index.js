import { SET_ACCOUNT, SET_CONSENT_FORM_SIGNED, SET_DATA, SET_TOKENS, UNSET_NEW } from './actions';

const initialState = {
  tokens: null,
  account: null,
};

// eslint-disable-next-line default-param-last
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKENS:
      return {
        ...state,
        tokens: { access: action.payload.accessToken, refresh: action.payload.refreshToken },
      };
    case SET_ACCOUNT:
      return {
        ...state,
        account: {
          data: action.payload.data,
          isConsentFormSigned: action.payload.isConsentFormSigned,
        },
      };
    case SET_DATA:
      return {
        ...state,
        account: {
          ...state.account,
          data: action.payload,
        },
      };
    case UNSET_NEW:
      return {
        ...state,
        account: { ...state.account, data: { ...state.account.data, isNew: false } },
      };
    case SET_CONSENT_FORM_SIGNED:
      return {
        ...state,
        account: { ...state.account, isConsentFormSigned: true },
      };
    default:
      return state;
  }
};
