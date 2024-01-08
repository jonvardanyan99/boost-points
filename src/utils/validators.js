import { z } from 'zod';

export const phoneNumberSchema = z
  .string()
  .min(1, 'This field is required')
  .length(10, 'Invalid phone number')
  .regex(/^[0-9]+$/, 'Invalid phone number');

export const otpSchema = z
  .string()
  .min(1, 'This field is required')
  .length(4, 'Invalid OTP')
  .regex(/^[0-9]+$/, 'Invalid OTP');
