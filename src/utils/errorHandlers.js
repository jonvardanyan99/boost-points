export const getFormikError = (formik, key, nestedKey) => {
  if (formik.errors[key] && formik.touched[key]) {
    if (typeof formik.errors[key] === 'string') {
      return formik.errors[key];
    }

    return formik.errors[key][nestedKey];
  }

  return null;
};
