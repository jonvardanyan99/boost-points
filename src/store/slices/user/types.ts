import { Card } from '@stripe/stripe-js';

import { AccountData, Subscription } from '~/types/models';

export interface UserState {
  tokens: {
    access: string;
    refresh: string;
  } | null;
  account: {
    data: AccountData;
    isConsentFormSigned: boolean;
    subscription: Subscription | null;
  } | null;
}

export interface TokensPayload {
  accessToken: string;
  refreshToken: string;
}

export interface AccountPayload {
  data: AccountData;
  isConsentFormSigned: boolean;
}

export type DataPayload = AccountData;

export type SubscriptionPayload = Subscription;

export interface CardInfoPayload {
  brand: Card['brand'];
  lastCardNumbers: Card['last4'];
}
