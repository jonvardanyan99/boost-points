import { SET_TOKENS } from './actions';

const initialState = {
  accessToken: null,
  refreshToken: null,
};

// eslint-disable-next-line default-param-last
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKENS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    default:
      return state;
  }
};
