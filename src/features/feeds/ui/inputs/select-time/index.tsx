import { arrayFrom } from '../../../../../shared';
import { FormControl, Select } from '@holdr-ui/react';
import { SelectTimeProps } from './types';

function SelectTime({
  name,
  startFrom,
  value,
  onChange,
  numberOfOptions,
}: SelectTimeProps) {
  return (
    <FormControl>
      <FormControl.Label casing='capitalize'>{name}</FormControl.Label>
      <Select
        size={{ '@bp1': 'sm', '@bp3': 'base' }}
        value={value}
        onChange={onChange}
      >
        {arrayFrom(numberOfOptions)
          .filter((num) => num >= startFrom)
          .map((num) => (
            <option key={`${num} ${name}`} value={num}>
              {num}
            </option>
          ))}
      </Select>
    </FormControl>
  );
}
SelectTime.displayName = 'SelectTime';

export default SelectTime;
