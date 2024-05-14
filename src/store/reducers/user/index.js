import { SET_ACCOUNT, SET_TOKENS, UNSET_NEW } from './actions';

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
        account: action.payload,
      };
    case UNSET_NEW:
      return {
        ...state,
        account: { ...state.account, isNew: false },
      };
    default:
      return state;
  }
};
