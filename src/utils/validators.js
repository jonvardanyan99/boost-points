import { z } from 'zod';

const FIELD_REQUIRED = 'This field is required';
const INVALID_PHONE_NUMBER = 'Invalid phone number';
const INVALID_OTP = 'Invalid OTP';

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
