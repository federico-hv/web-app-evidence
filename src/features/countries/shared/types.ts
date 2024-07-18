export interface ICountryISO {
  name: string;
  Iso2: string;
  Iso3: string;
}

export interface ICountryState {
  name: string;
  state_code: string;
}

export interface ICountriesResponseData<T> {
  error: boolean;
  msg: string;
  data: T;
}
