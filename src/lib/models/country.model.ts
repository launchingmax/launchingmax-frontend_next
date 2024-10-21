interface ITimezone {
  zoneName: string;

  gmtOffset: number;

  gmtOffsetName: string;

  abbreviation: string;

  tzName: string;
}

export interface ICountry {
  name: string;

  cities?: string[];

  iso3?: string;

  iso2?: string;

  numeric_code?: string;

  phone_code?: string;

  capital?: string;

  currency?: string;

  currency_name?: string;

  currency_symbol?: string;

  tld?: string;

  native?: string;

  region?: string;

  region_id?: string;

  subregion?: string;

  subregion_id?: string;

  nationality?: string;

  timezones?: ITimezone[];

  translations?: any;

  latitude?: string;

  longitude?: string;

  emoji?: string;

  emojiU?: string;
}
