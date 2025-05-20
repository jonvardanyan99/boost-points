import { AxiosPromise } from 'axios';

import {
  ActivateSubscriptionResponse,
  ActivateSubscriptionVariables,
  AddIdResponse,
  AddIdVariables,
  CreateAccountResponse,
  CreateAccountVariables,
  CreateDisputeResponse,
  CreateDisputeVariables,
  LoginResponse,
  LoginVariables,
  PatchAccountResponse,
  PatchAccountVariables,
  RefreshTokenResponse,
  RefreshTokenVariables,
  SendDisputeActionResponse,
  SendDisputeActionVariables,
  SignConsentFormResponse,
  SignConsentFormVariables,
  UpdatePaymentMethodResponse,
  UpdatePaymentMethodVariables,
  VerifyPhoneNumberResponse,
  VerifyPhoneNumberVariables,
} from './mutations';
import {
  GetAccountResponse,
  GetCreditScoresResponse,
  GetDisputeLinkResponse,
  GetDisputeResponse,
  GetDisputesResponse,
  GetDisputeVariables,
  GetIdResponse,
  GetIssueFurtherOptionsResponse,
  GetIssueFurtherOptionsVariables,
  GetIssueResponse,
  GetIssuesResponse,
  GetIssueVariables,
  GetReportResponse,
  GetReportVariables,
  GetSignLinkResponse,
  GetSubscriptionPlansResponse,
  GetSubscriptionResponse,
} from './queries';

export interface Api {
  login: (data: LoginVariables) => AxiosPromise<LoginResponse>;
  verifyPhoneNumber: (data: VerifyPhoneNumberVariables) => AxiosPromise<VerifyPhoneNumberResponse>;
  refreshToken: (data: RefreshTokenVariables) => AxiosPromise<RefreshTokenResponse>;
  getAccount: () => AxiosPromise<GetAccountResponse>;
  createAccount: (data: CreateAccountVariables) => AxiosPromise<CreateAccountResponse>;
  patchAccount: (data: PatchAccountVariables) => AxiosPromise<PatchAccountResponse>;
  getId: () => AxiosPromise<GetIdResponse>;
  addId: (data: AddIdVariables) => AxiosPromise<AddIdResponse>;
  getSignLink: () => AxiosPromise<GetSignLinkResponse>;
  getDisputeLink: () => AxiosPromise<GetDisputeLinkResponse>;
  signConsentForm: (data: SignConsentFormVariables) => AxiosPromise<SignConsentFormResponse>;
  getReport: ({ agency }: GetReportVariables) => AxiosPromise<GetReportResponse>;
  getCreditScores: () => AxiosPromise<GetCreditScoresResponse>;
  getIssue: ({ uuid }: GetIssueVariables) => AxiosPromise<GetIssueResponse>;
  getIssues: () => AxiosPromise<GetIssuesResponse>;
  getIssueFurtherOptions: ({
    uuid,
  }: GetIssueFurtherOptionsVariables) => AxiosPromise<GetIssueFurtherOptionsResponse>;
  getSubscription: () => AxiosPromise<GetSubscriptionResponse>;
  activateSubscription: (
    data: ActivateSubscriptionVariables,
  ) => AxiosPromise<ActivateSubscriptionResponse>;
  getSubscriptionPlans: () => AxiosPromise<GetSubscriptionPlansResponse>;
  getDispute: ({ uuid }: GetDisputeVariables) => AxiosPromise<GetDisputeResponse>;
  createDispute: (data: CreateDisputeVariables) => AxiosPromise<CreateDisputeResponse>;
  getDisputes: () => AxiosPromise<GetDisputesResponse>;
  sendDisputeAction: ({
    uuid,
    action,
    data,
  }: SendDisputeActionVariables) => AxiosPromise<SendDisputeActionResponse>;
  updatePaymentMethod: (
    data: UpdatePaymentMethodVariables,
  ) => AxiosPromise<UpdatePaymentMethodResponse>;
}
