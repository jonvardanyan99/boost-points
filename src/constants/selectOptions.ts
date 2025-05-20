export type GenderOptions = typeof GENDER_OPTIONS;
export type StateOptions = typeof STATE_OPTIONS;
export type CountryCodeOptions = typeof COUNTRY_CODE_OPTIONS;
export type DocumentTypeOptions = typeof DOCUMENT_TYPE_OPTIONS;

export const GENDER_OPTIONS = [
  { label: 'Neutral', value: 'Neutral' },
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
];

export const STATE_OPTIONS = [
  { label: 'Australian Capital Territory', value: 'ACT' },
  { label: 'New South Wales', value: 'NSW' },
  { label: 'Northern Territory', value: 'NT' },
  { label: 'New Zealand', value: 'NZ' },
  { label: 'Overseas', value: 'OS' },
  { label: 'Other State or Territory of Australia', value: 'OTH' },
  { label: 'Queensland', value: 'QLD' },
  { label: 'South Australia', value: 'SA' },
  { label: 'Tasmania', value: 'TAS' },
  { label: 'Victoria', value: 'VIC' },
  { label: 'Western Australia', value: 'WA' },
];

export const COUNTRY_CODE_OPTIONS = [
  { label: 'AU', value: 'AU' },
  { label: 'NZ', value: 'NZ' },
];

export const DOCUMENT_TYPE_OPTIONS = [{ label: "Driver's licence", value: 'Driver License' }];
