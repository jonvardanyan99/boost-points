export const SET_TOKENS = 'user/SET_TOKENS';
export const SET_ACCOUNT = 'user/SET_ACCOUNT';
export const SET_DATA = 'user/SET_DATA';
export const UNSET_NEW = 'user/UNSET_NEW';
export const SET_CONSENT_FORM_SIGNED = 'user/SET_CONSENT_FORM_SIGNED';

export const setTokens = data => ({
  type: SET_TOKENS,
  payload: data,
});

export const setAccount = data => ({
  type: SET_ACCOUNT,
  payload: data,
});

export const setData = data => ({
  type: SET_DATA,
  payload: data,
});

export const unsetNew = () => ({
  type: UNSET_NEW,
});

export const setConsentFormSigned = () => ({
  type: SET_CONSENT_FORM_SIGNED,
});
