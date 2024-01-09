import { z } from 'zod';

const FIELD_REQUIRED = 'This field is required';
const INVALID_PHONE_NUMBER = 'Invalid phone number';
const INVALID_OTP = 'Invalid OTP';

export const phoneNumberSchema = z
  .string()
  .min(1, FIELD_REQUIRED)
  .length(10, INVALID_PHONE_NUMBER)
  .regex(/^[0-9]+$/, INVALID_PHONE_NUMBER);

export const otpSchema = z
  .string()
  .min(1, FIELD_REQUIRED)
  .length(4, INVALID_OTP)
  .regex(/^[0-9]+$/, INVALID_OTP);
