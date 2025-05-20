import { CountryCodeOptions, StateOptions } from 'constants/selectOptions';
import { format } from 'date-fns/format';

interface FormatAddressModel {
  propertyName: string;
  streetNumber: string | null;
  streetName: string;
  streetSuffix: string;
  suburb: string;
  state: StateOptions[number] | StateOptions[number]['label'];
  postcode: string | number;
  countryCode: CountryCodeOptions[number] | CountryCodeOptions[number]['label'];
}

export const formatPhoneNumber = (phoneNumber: string) => {
  return `+61${phoneNumber.slice(1)}`;
};

export const backFormatPhoneNumber = (phoneNumber: string) => {
  return `0${phoneNumber.slice(3)}`;
};

export const formatAddressTitle = (address: FormatAddressModel | null) => {
  let formattedTitle = '';

  if (address) {
    const propertyName = address.propertyName;
    const streetNumber = address.streetNumber || null;
    const streetName = address.streetName;
    const streetSuffix = !streetName.includes(address.streetSuffix) ? address.streetSuffix : null;
    const suburb = address.suburb;
    const state = typeof address.state === 'string' ? address.state : address.state.label;
    const postcode = address.postcode;
    const countryCode =
      typeof address.countryCode === 'string' ? address.countryCode : address.countryCode.label;

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

export const formatToCurrency = (price: number, discountPercent?: number) => {
  if (discountPercent) {
    const discount = Math.round((price * discountPercent) / 100);
    price -= discount;
  }

  const dollars = Math.floor(price / 100);
  const cents = (price % 100).toString().padStart(2, '0');

  return `$${dollars}.${cents}`;
};

export const formatDate = (date: string) => {
  return format(new Date(date), 'dd MMM y');
};
