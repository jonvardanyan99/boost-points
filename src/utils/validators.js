import { z } from 'zod';

const FIELD_REQUIRED = 'This field is required';
const INVALID_PHONE_NUMBER = 'Invalid phone number';
const INVALID_OTP = 'Invalid OTP';
const INVALID_EMAIL = 'Invalid email';
const INVALID_DATE = 'Invalid date';
const INVALID_LICENCE_NO = 'Invalid licence no';

export const loginFormSchema = z.object({
  phoneNumber: z
    .string({ required_error: FIELD_REQUIRED })
    .length(10, INVALID_PHONE_NUMBER)
    .regex(/^[0-9]+$/, INVALID_PHONE_NUMBER),
});

export const verificationFormSchema = z.object({
  otp: z
    .string({ required_error: FIELD_REQUIRED })
    .length(4, INVALID_OTP)
    .regex(/^[0-9]+$/, INVALID_OTP),
});

export const confirmAddressFormSchema = z.object({
  propertyName: z.string({ required_error: FIELD_REQUIRED }),
  unitNumber: z.string().optional(),
  streetNumber: z.string().optional(),
  streetName: z.string({ required_error: FIELD_REQUIRED }),
  streetSuffix: z.string({ required_error: FIELD_REQUIRED }),
  suburb: z.string({ required_error: FIELD_REQUIRED }),
  state: z
    .object({ label: z.string(), value: z.string() })
    .nullable()
    .refine(item => item !== null, {
      message: FIELD_REQUIRED,
    }),
  postcode: z.number({ required_error: FIELD_REQUIRED }),
  countryCode: z
    .object({ label: z.string(), value: z.string() })
    .nullable()
    .refine(item => item !== null, {
      message: FIELD_REQUIRED,
    }),
});

export const createAccountFormSchema = z.object({
  firstName: z.string({ required_error: FIELD_REQUIRED }),
  middleName: z.string().optional(),
  surname: z.string({ required_error: FIELD_REQUIRED }),
  birthDate: z
    .date()
    .nullable()
    .superRefine((item, ctx) => {
      if (item === null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: FIELD_REQUIRED,
        });
      }

      const currentDate = new Date();

      if (item >= currentDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_date,
          message: INVALID_DATE,
        });
      }
    }),
  gender: z
    .object({ label: z.string(), value: z.string() })
    .nullable()
    .refine(item => item !== null, {
      message: FIELD_REQUIRED,
    }),
  email: z.string({ required_error: FIELD_REQUIRED }).email(INVALID_EMAIL),
  residentialAddress: confirmAddressFormSchema.nullable(),
  // residentialAddress: confirmAddressFormSchema.nullable().refine(item => item !== null, {
  //   message: FIELD_REQUIRED,
  // }),
  previousAddress: confirmAddressFormSchema.nullable(),
});

export const identificationFormSchema = z.object({
  documentType: z
    .object({ label: z.string(), value: z.string() })
    .nullable()
    .refine(item => item !== null, {
      message: FIELD_REQUIRED,
    }),
  state: z
    .object({ label: z.string(), value: z.string() })
    .nullable()
    .refine(item => item !== null, {
      message: FIELD_REQUIRED,
    }),
  number: z
    .string({ required_error: FIELD_REQUIRED })
    .min(4, INVALID_LICENCE_NO)
    .max(9, INVALID_LICENCE_NO)
    .regex(/^\d+$/, INVALID_LICENCE_NO),
});
