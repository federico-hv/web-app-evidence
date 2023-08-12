import { FormControl, Input, Select, VStack } from '@holdr-ui/react';
import phoneCodes from '../../../assets/json/phone.code.json';
import { PhoneInputProps, Phone } from './phone.type';
import { useRecordState } from '../../index';

function PhoneInput({ phone, onChange, prefix }: PhoneInputProps) {
  const [state, update] = useRecordState<Phone>({
    code: prefix || '',
    digits: phone,
  });

  const handleChange = (next: Partial<Phone>) => {
    update(next);
    const newState = { ...state, ...next };
    onChange(`${newState.code}${newState.digits}`);
  };

  const current = phoneCodes.find(
    ({ dial_code }) => dial_code === state.code,
  );

  return (
    <VStack gap={3}>
      <FormControl>
        <FormControl.Label>Country Code</FormControl.Label>
        <Select
          value={`${current?.dial_code} ${current?.name}`}
          onChange={(e) => {
            const code = e.target.value.split(' ')[0];
            handleChange({ code });
          }}
        >
          {phoneCodes.map((phone) => (
            <option key={phone.code}>
              {phone.dial_code} {phone.name}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormControl.Label>Phone</FormControl.Label>
        <Input
          value={state.digits}
          onChange={(e) => handleChange({ digits: e.target.value })}
          css={{
            'user-select': 'none',
          }}
        />
      </FormControl>
    </VStack>
  );
}
PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;
