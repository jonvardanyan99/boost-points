const DISPUTE_DETAILS = '/disputes/:uuid';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  VERIFICATION: '/verification',
  CREATE_ACCOUNT: '/create-account',
  IDENTIFICATION: '/identification',
  CONSENT_FORM: '/consent-form',
  DASHBOARD: '/dashboard',
  REPORT: '/report/:agency',
  SUBSCRIPTION_PLANS: '/subscription-plans',
  FAQ: '/faq',
  ACCOUNT: '/account',
  DISPUTE: '/dispute/:uuid',
  DISPUTES: '/disputes',
  DISPUTE_DETAILS,
  UPDATE_DISPUTE: `${DISPUTE_DETAILS}/additional-info`,
  DISPUTE_FURTHER: `${DISPUTE_DETAILS}/further-action`,
  ESCALATE_DISPUTE: `${DISPUTE_DETAILS}/contact-support`,
  PAYMENT_METHOD: '/payment-method',
};

export const SEARCH_PARAMS = {
  TAB: 'tab',
};
