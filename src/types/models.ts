import { CountryCodeOptions, GenderOptions, StateOptions } from 'constants/selectOptions';
import { GetDisputeResponse } from 'services/api/types/queries';

export type Agency = 'equifax' | 'experian' | 'illion';

export interface SubscriptionPlan {
  uuid: string;
  name: 'Basic Resolve' | 'Advanced Resolve' | 'Premium Resolve' | 'test name';
  description: string | null;
  price: number;
  discount: number;
  interval: 'Month' | 'Year';
  duration: number;
  isAvailable: boolean;
  disputesQt: number;
}

export interface Address {
  propertyName: string;
  unitNumber: string | null;
  streetNumber: string | null;
  streetName: string;
  streetSuffix: string;
  suburb: string;
  state: StateOptions[number]['value'];
  postcode: string;
  countryCode: CountryCodeOptions[number]['value'];
}

export interface AccountData {
  phoneNumber: string;
  uuid: string;
  firstName: string | null;
  middleName: string | null;
  surname: string | null;
  birthDate: string | null;
  email: string | null;
  gender: GenderOptions[number]['value'];
  fullName: string;
  residentialAddress: Address | null;
  previousAddress: Address | null;
  isNew: boolean;
}

export interface Subscription {
  status: string | null;
  cardInfo: string | null;
  endDate: string | null;
  subscriptionPlan: SubscriptionPlan | null;
}

export interface DraftAddress {
  streetNumber: string;
  streetName: string;
  suburb: string;
  state: string;
  postcode: string;
  countryCode: string;
}

export type CreateDisputeData = Record<
  string,
  | {
      type: 'text';
      value: string;
    }
  | {
      type: 'file-upload';
      value: File | null;
    }
>;

export type DisputeAction = '' | 'close' | 'refine' | 'further' | 'escalate';

export type TakenAction = Omit<GetDisputeResponse['stages'][number], 'name'> & {
  name: 'Dispute closed' | 'Dispute updated' | 'Dispute further' | 'Dispute escalated';
};

export interface AskedQuestion {
  id: number;
  question: string;
  text: string;
}

export interface AgencyIssue {
  uuid: string;
  name: string;
  description: string;
}

export type AgencyIssueCategory =
  | 'Identity issues'
  | 'Credit enquires'
  | 'Adverse on file'
  | 'Defaults'
  | 'Insolvencies & Actions';
