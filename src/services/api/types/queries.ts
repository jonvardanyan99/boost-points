import { DocumentTypeOptions, StateOptions } from '~/constants/selectOptions';
import {
  AccountData,
  Agency,
  AgencyIssue,
  CreateDisputeData,
  Subscription,
  SubscriptionPlan,
} from '~/types/models';

type Status = 'In progress' | 'Resolved' | 'Not applicable' | 'Escalated to WCS';

type Link = string;

interface GetLinkResponse {
  link: Link;
}

interface ReportAddress {
  country: string;
  postcode: string;
  state: StateOptions[number]['value'];
  streetName: string;
  streetNo: string;
  suburb: string;
  unitNo: string;
}

interface CreditEnquiry {
  accountType: string;
  amount: string;
  creditEnquirerClassification: string;
  creditEnquirerName: string;
  enquiryDate: string;
  enquiryType: string;
  role: string;
}

interface Employment {
  employerName: string;
  occupation: string;
}

interface Repayment {
  period: string;
  status: string;
}

interface Liability {
  accountHolderCount: string;
  accountOpenDate: string;
  amount: string;
  creditProvider: string;
  creditProviderClassification: string;
  defaultAmount: string;
  defaultStatus: string;
  isClosed: boolean;
  isSeriousCreditInfringement: string;
  isUnlimitedCredit: boolean;
  latestUpdateDate: string;
  liabilityCode: string;
  liabilityType: string;
  loanPaymentMethod: string;
  orginalProviderClassification: string;
  orginalProviderName: string;
  paymentMethod: string;
  repaymentHistory: Repayment[];
  role: string;
  securedCredit: string;
  termOfLoan: string;
  termType: string;
}

interface Scores {
  comprehensiveScore: string;
  negativeScore: string;
  onePointOneScore: string;
  oneScore: string;
}

interface SummaryCharacteristics {
  adverseCreditFileCommercial: string;
  adverseCreditFileConsumer: string;
  ageOfOldestFile: number;
  ageOfPrimaryFile: number;
  creditHistory: null;
  hasAdverseInformation: boolean;
  hasDefaults: boolean;
  hasPaidDefaults: boolean;
  hasUnpaidDefaults: boolean;
  hasVehiclePersonalHomeLoans: boolean;
  isBankrupt: boolean;
  isDischargedBankrupt: boolean;
  monthsSinceLastConsumerDefault: string;
  noOfBNPLEnquirySixMonths: boolean;
  noOfBNPLEnquiryThreeMonths: boolean;
  noOfCommercialDefaultsSixMonths: boolean;
  noOfCommercialDefaultsTwelveMonths: boolean;
  noOfCommercialEnquirySixMonths: boolean;
  noOfCommercialEnquiryThreeMonths: boolean;
  noOfConsumerDefaultsSixMonths: boolean;
  noOfConsumerDefaultsTwelveMonths: boolean;
  noOfConsumerEnquirySixMonths: boolean;
  noOfConsumerEnquiryThreeMonths: boolean;
  noOfCreditCardAccounts: boolean;
  noOfMortgageAccounts: boolean;
  noOfPersonalLoanAccounts: boolean;
  noOfTelcoAccounts: boolean;
  noOfUtilityDefaultsSixMonths: boolean;
  noOfUtilityuDefaultsSixMonths: boolean;
  totalAmountOfUnpaidDefaults: boolean;
}

interface IssueFormData {
  questions: {
    questionId: string;
    cellName: string;
    type: CreateDisputeData[string]['type'];
    questionText: string;
  }[];
}

interface IssueData {
  name: string;
  issues: AgencyIssue[];
  qt: number;
}

interface FurtherOption {
  uuid: string;
  reason: string;
  text: string;
}

interface File {
  key: string;
  name: string | null;
  originalName: string | null;
  url: string | null;
}

interface DisputeStage {
  name:
    | 'Response received from Equifax'
    | 'Dispute created'
    | 'Dispute closed'
    | 'Dispute updated'
    | 'Dispute further'
    | 'Dispute escalated';
  date: string;
  type: string | null;
  data: Record<string, string> | null; // todo
  files: File[];
}

interface DisputeData {
  uuid: string;
  name: string;
  lastStage: DisputeStage;
  agency: 'Equifax';
  status: Status;
}

export type GetAccountResponse = AccountData;

export interface GetIdResponse {
  documentType: DocumentTypeOptions[number]['value'];
  documentData: {
    number: string;
    state: StateOptions[number]['value'];
  };
}

export type GetSignLinkResponse = GetLinkResponse;

export type GetDisputeLinkResponse = GetLinkResponse;

export interface GetReportVariables {
  agency: Agency;
}

export interface GetReportResponse {
  address: ReportAddress[];
  banReport: null;
  creditEnquiries: CreditEnquiry[];
  dob: string;
  driversLicenceNumber: string;
  employments: Employment[];
  enquiryId: string;
  firstName: string;
  lastName: string;
  liabilities: Liability[];
  middleName: string;
  scores: Scores;
  summaryCharacteristics: SummaryCharacteristics;
}

export interface GetCreditScoresResponse {
  equifax: number | null;
  experian: number | null;
  illion: number | null;
}

export interface GetIssueVariables {
  uuid: string;
}

export interface GetIssueResponse {
  name: string;
  formData: IssueFormData;
  links: Link[];
}

export interface GetIssuesResponse {
  data: IssueData[] | null;
}

export interface GetIssueFurtherOptionsVariables {
  uuid: string;
}

export interface GetIssueFurtherOptionsResponse {
  data: FurtherOption[];
  qt: number;
}

export type GetSubscriptionResponse = Subscription;

export type GetSubscriptionPlansResponse = SubscriptionPlan[];

export interface GetDisputeVariables {
  uuid: string;
}

export interface GetDisputeResponse {
  name: string;
  agency: 'Equifax';
  status: Status;
  number: string;
  createdAt: string;
  lastStage: DisputeStage | null;
  stages: DisputeStage[];
  possibleActions: 'Start options' | 'Options with help needed' | 'No options' | null;
  issueGroup:
    | 'Identity issues'
    | 'Credit enquires'
    | 'Adverse on file'
    | 'Defaults'
    | 'Insolvencies & Actions';
}

export interface GetDisputesResponse {
  data: DisputeData[];
  active: number;
  total: number;
}
