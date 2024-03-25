export const getFormikError = (formik, key) => {
  if (formik.errors[key] && formik.touched[key]) {
    return formik.errors[key];
  }

  return null;
};
