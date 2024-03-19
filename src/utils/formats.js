export const formatPhoneNumber = phoneNumber => {
  return `+61${phoneNumber.slice(1)}`;
};

export const formatAddressTitle = (formik, key) => {
  let formattedTitle = '';

  if (formik.values[key]) {
    const propertyName = formik.values[key].propertyName;
    const streetNumber = formik.values[key].streetNumber || null;
    const streetName = formik.values[key].streetName;
    const streetSuffix = !streetName.includes(formik.values[key].streetSuffix)
      ? formik.values[key].streetSuffix
      : null;
    const suburb = formik.values[key].suburb;
    const state = formik.values[key].state.label;
    const postcode = formik.values[key].postcode;
    const countryCode = formik.values[key].countryCode.label;

    formattedTitle = `${propertyName},`;

    if (streetNumber) {
      formattedTitle += ` ${streetNumber}`;
    }

    if (streetSuffix) {
      formattedTitle += ` ${streetName} ${streetSuffix},`;
    } else {
      formattedTitle += ` ${streetName},`;
    }

    formattedTitle += ` ${suburb} ${state} ${postcode}, ${countryCode}`;
  }

  return formattedTitle;
};
