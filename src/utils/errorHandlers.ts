import { FormikProps } from 'formik';

export const getFormikError = <T>(
  formik: FormikProps<T>,
  key: keyof T,
  nestedKey?: T[keyof T] extends object ? keyof T[keyof T] : never,
) => {
  if (formik.errors[key] && formik.touched[key]) {
    if (typeof formik.errors[key] === 'string') {
      return formik.errors[key];
    }

    if (nestedKey && !Array.isArray(formik.errors[key])) {
      // @ts-expect-error nestedKey is valid for the type of formik.errors[key]
      return formik.errors[key][nestedKey];
    }
  }

  return null;
};
