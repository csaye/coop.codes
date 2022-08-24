type Tld = {
  tld: string,
  width: number,
  country: string,
  worldwide: boolean,
  specialChars: boolean,
  unreserved: boolean
};

export const shortTlds: Tld[] = [
  {
    tld: "li",
    width: 7.375,
    country: "Liechtenstein",
    worldwide: true,
    specialChars: true,
    unreserved: false
  },
  {
    tld: "fj",
    width: 9.109375,
    country: "Fiji",
    worldwide: true,
    specialChars: true,
    unreserved: false
  },
  {
    tld: "fi",
    width: 9.1171875,
    country: "Finland",
    worldwide: true,
    specialChars: false,
    unreserved: true
  },
  {
    tld: "tj",
    width: 9.1328125,
    country: "Tajikistan",
    worldwide: true,
    specialChars: false,
    unreserved: true
  },
  {
    tld: "it",
    width: 9.140625,
    country: "Italy",
    worldwide: false,
    specialChars: true,
    unreserved: false
  },
  {
    tld: "lt",
    width: 9.234375,
    country: "Lithuania",
    worldwide: true,
    specialChars: false,
    unreserved: true
  },
  {
    tld: "tl",
    width: 9.234375,
    country: "East Timor",
    worldwide: true,
    specialChars: false,
    unreserved: true
  },
  {
    tld: "ir",
    width: 9.421875,
    country: "Iran",
    worldwide: false,
    specialChars: false,
    unreserved: false
  },
  {
    tld: "lr",
    width: 9.515625,
    country: "Liberia",
    worldwide: false,
    specialChars: true,
    unreserved: false
  },
  {
    tld: "tf",
    width: 10.9765625,
    country: "F.S.A.L.",
    worldwide: false,
    specialChars: true,
    unreserved: true
  },
  {
    tld: "fr",
    width: 11.2578125,
    country: "France",
    worldwide: false,
    specialChars: true,
    unreserved: true
  },
  {
    tld: "is",
    width: 11.703125,
    country: "Iceland",
    worldwide: true,
    specialChars: true,
    unreserved: true
  }
];
