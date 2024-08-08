import countries, { Country } from './data/countries';
import { lightSelectCSS } from '../../styles';
import { SelectInputField } from '../index';
function CountryPicker({ onChange }: any) {
  //   const [countryField, countryFieldHelpers] = useField('country');

  return (
    <SelectInputField
      triggerCSS={lightSelectCSS}
      keySelector={({ code }) => code}
      labelSelector={({ name }) => name}
      valueSelector={({ name }) => name}
      name='country'
      label='Country of Residence'
      options={countries}
      listCSS={{
        borderTopWidth: '1px',
        borderTopRightRadius: '$2',
        borderTopLeftRadius: '$2',
      }}
    />
  );
}

export default CountryPicker;
