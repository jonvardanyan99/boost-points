import { GetIssueFurtherOptionsResponse } from 'services/api/types/queries';
import {
  confirmAddressFormSchema,
  createAccountFormSchema,
  getDisputeFormSchema,
  identificationFormSchema,
  loginFormSchema,
  verificationFormSchema,
} from 'utils/validators';
import { z } from 'zod';

export type LoginFormValues = z.infer<typeof loginFormSchema>;
export type VerificationFormValues = z.infer<typeof verificationFormSchema>;
export type CreateAccountFormValues = z.infer<typeof createAccountFormSchema>;
export type ConfirmAddressModalFormValues = z.infer<typeof confirmAddressFormSchema>;
export type IdentificationFormValues = z.infer<typeof identificationFormSchema>;
export type DisputeFormValues = z.infer<ReturnType<typeof getDisputeFormSchema>>;
export interface UpdateDisputeFormValues {
  files: File[] | null;
  'New details': string;
}
export interface DisputeFurtherFormValues {
  issueData: GetIssueFurtherOptionsResponse['data'][number];
}
export interface EscalateDisputeFormValues {
  description: string;
}
