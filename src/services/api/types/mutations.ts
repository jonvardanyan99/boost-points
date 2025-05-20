import { DocumentTypeOptions, GenderOptions, StateOptions } from 'constants/selectOptions';
import { AccountData, Address } from 'types/models';
import { AtLeastOne } from 'types/utils';

interface SuccessResponse {
  detail: string;
}

interface UserResponse {
  consumer: AccountData;
  accessToken: string;
  refreshToken: string;
  isConsentFormSigned: boolean;
  isIdAdded: boolean;
}

interface AccountResponse {
  phoneNumber: string;
  uuid: string;
  firstName: string;
  middleName: string | null;
  surname: string;
  birthDate: string;
  email: string;
  gender: GenderOptions[number]['value'];
  fullName: string;
  residentialAddress: Address;
  previousAddress: Address | null;
  isNew: boolean;
}

interface File {
  key: string;
  name: string;
  originalName: string;
}

interface DisputeData {
  data?: Record<string, string> | null;
  files?: File[] | null;
  issueFurtherOptionUuid?: string | null;
}

export interface LoginVariables {
  phoneNumber: string;
}

export type LoginResponse = SuccessResponse;

export interface VerifyPhoneNumberVariables {
  phoneNumber: string;
  otp: string;
}

export type VerifyPhoneNumberResponse = UserResponse;

export interface RefreshTokenVariables {
  credentials: string;
}

export type RefreshTokenResponse = UserResponse;

export interface CreateAccountVariables {
  firstName: string;
  middleName?: string | null;
  surname: string;
  birthDate: string;
  email: string;
  gender: GenderOptions[number]['value'];
  residentialAddress: Address;
  previousAddress?: Address | null;
}

export type CreateAccountResponse = AccountResponse;

export type PatchAccountVariables = AtLeastOne<CreateAccountVariables>;

export type PatchAccountResponse = AccountResponse;

export interface AddIdVariables {
  documentType: DocumentTypeOptions[number]['value'];
  documentData: {
    number: string;
    state: StateOptions[number]['value'];
  };
}

export type AddIdResponse = SuccessResponse;

export interface SignConsentFormVariables {
  text: 'text';
  signKey: string;
}

export type SignConsentFormResponse = SuccessResponse;

export interface SendDisputeActionVariables {
  uuid: string;
  action: 'close' | 'refine' | 'further' | 'escalate';
  data?: AtLeastOne<DisputeData>;
}

export type SendDisputeActionResponse = SuccessResponse;

export interface ActivateSubscriptionVariables {
  subscriptionPlanUuid: string;
}

export type ActivateSubscriptionResponse = SuccessResponse;

export interface CreateDisputeVariables {
  issueUuid: string;
  data: Record<string, string>;
  files: File[];
  isNotApplicable?: boolean | null;
}

export interface CreateDisputeResponse {
  uuid: string;
}

export interface UpdatePaymentMethodVariables {
  paymentMethodId: string;
}

export type UpdatePaymentMethodResponse = SuccessResponse;
