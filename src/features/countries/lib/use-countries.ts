import { useQuery } from '../../../shared';
import {
  CountriesBaseURL,
  CountriesEndpoint,
  ICountriesResponseData,
  ICountryISO,
} from '../shared';

/**
 * Get a list of all countries with their name and ISO2/ISO3 representation.
 */
export function useCountries() {
  // TODO: Use local fallback data if there is an error loading the data.

  return useQuery<ICountriesResponseData<ICountryISO[]>>(
    CountriesBaseURL,
    CountriesEndpoint.CountriesISO,
  );
}
