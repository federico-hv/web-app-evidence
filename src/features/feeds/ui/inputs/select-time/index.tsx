import { arrayFrom, hexToRGB } from '../../../../../shared';
import {
  Box,
  FormControl,
  Select,
  SelectContent,
  SelectItem,
  SelectItemList,
  SelectTrigger,
} from '@holdr-ui/react';
import { SelectTimeProps } from './types';

function SelectTime({
  name,
  startFrom,
  value,
  onValueChange,
  numberOfOptions,
}: SelectTimeProps) {
  const options = arrayFrom(numberOfOptions).filter(
    (num) => num >= startFrom,
  );

  return (
    <FormControl>
      <FormControl.Label color='white500' casing='capitalize'>
        {name}
      </FormControl.Label>
      <Select value={String(value)} onValueChange={onValueChange}>
        <SelectTrigger
          radius={2}
          _open={{ borderRadius: '$2' }}
          css={{
            bgColor: 'rgba(26, 26, 41, 0.75)',
          }}
          placeholder='Select your role'
        />

        <SelectContent
          zIndex={100}
          position='item-aligned'
          alignOffset={0}
        >
          <SelectItemList
            bgColor='rgba(56, 56, 140, 0.25)'
            divider={
              <Box
                h='1px'
                w='100%'
                css={{ backgroundColor: 'rgba(204, 204, 204, 0.10)' }}
              />
            }
            _highlighted={{
              backgroundColor: 'rgba(152, 152, 255, 0.5)',
            }}
            radius={1}
            border={1}
            borderColor='rgba(152, 152, 255, 0.10)'
            blur='lg'
          >
            {options.map((value) => (
              <SelectItem
                key={value}
                _hover={{
                  borderRadius: '$2',
                  backgroundColor: hexToRGB('#0E0E1B', 0.5),
                }}
                value={String(value)}
                label={String(value)}
              />
            ))}
          </SelectItemList>
        </SelectContent>
      </Select>
    </FormControl>
  );
}
SelectTime.displayName = 'SelectTime';

export default SelectTime;
