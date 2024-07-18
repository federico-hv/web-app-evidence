import { useQuery } from '../../../shared';
import {
  CountriesBaseURL,
  CountriesEndpoint,
  ICountriesResponseData,
  ICountryISO,
  ICountryState,
} from '../shared';

/**
 * Get a list of all states in a country.
 *
 * @param country the name of the country.
 */
export function useCountryStates(country = '') {
  // TODO: Use local fallback data if there is an error loading the data.

  return useQuery<
    ICountriesResponseData<ICountryISO & { states: ICountryState[] }>
  >(
    CountriesBaseURL,
    CountriesEndpoint.CountriesStates,
    JSON.stringify({ country: country }),
  );
}
