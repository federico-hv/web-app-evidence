import countries from './data/countries';
import { lightSelectCSS } from '../../styles';
import { SelectInputField } from '../index';

function CountryPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <SelectInputField
      value={value}
      triggerCSS={lightSelectCSS}
      keySelector={({ code }) => code}
      labelSelector={({ name }) => name}
      valueSelector={({ code }) => code}
      onValueChange={onChange}
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
