export const formatPhoneNumber = phoneNumber => {
  return `+61${phoneNumber.slice(1)}`;
};

export const backFormatPhoneNumber = phoneNumber => {
  return `0${phoneNumber.slice(3)}`;
};

export const formatAddressTitle = address => {
  let formattedTitle = '';

  if (address) {
    const propertyName = address.propertyName;
    const streetNumber = address.streetNumber || null;
    const streetName = address.streetName;
    const streetSuffix = !streetName.includes(address.streetSuffix) ? address.streetSuffix : null;
    const suburb = address.suburb;
    const state = address.state?.label || address.state;
    const postcode = address.postcode;
    const countryCode = address.countryCode.label || address.countryCode;

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

export const formatToCurrency = (price, discountPercent) => {
  if (discountPercent) {
    const discount = Math.round((price * discountPercent) / 100);
    price -= discount;
  }

  const dollars = Math.floor(price / 100);
  const cents = (price % 100).toString().padStart(2, '0');

  return `$${dollars}.${cents}`;
};
