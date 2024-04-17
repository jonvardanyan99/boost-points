export const SET_TOKENS = 'user/SET_TOKENS';
export const SET_ACCOUNT = 'user/SET_ACCOUNT';

export const setTokens = data => ({
  type: SET_TOKENS,
  payload: data,
});

export const setAccount = data => ({
  type: SET_ACCOUNT,
  payload: data,
});
