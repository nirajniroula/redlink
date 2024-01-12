const bloodGroupsList = [
  {
    label: 'A+',
    value: 'A+',
  },
  {
    label: 'A-',
    value: 'A-',
  },
  {
    label: 'B+',
    value: 'B+',
  },
  {
    label: 'B-',
    value: 'B-',
  },
  {
    label: 'AB+',
    value: 'AB+',
  },
  {
    label: 'AB-',
    value: 'AB-',
  },
  {
    label: 'O+',
    value: 'O+',
  },
  {
    label: 'O-',
    value: 'O-',
  },
];

const iso3166 = require('iso-3166-1-alpha-2');
const countryEmoji = require('country-emoji');

const allCountries = iso3166.getCodes().map((code: string) => {
  const countryName = iso3166.getCountry(code);
  const flag = countryEmoji.flag(code);
  return { label: `${flag} ${countryName}`, value: code };
});

export { bloodGroupsList, allCountries };
