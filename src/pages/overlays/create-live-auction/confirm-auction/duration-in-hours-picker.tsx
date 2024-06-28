import {
  Box,
  Select,
  SelectContent,
  SelectItem,
  SelectItemList,
  SelectTrigger,
} from '@holdr-ui/react';
import { useState } from 'react';

interface Duration {
  name: string;
  value: string;
}

const defaultDurations: Duration[] = [
  {
    name: '1 hour',
    value: '1',
  },
  {
    name: '2 hour',
    value: '2',
  },
  {
    name: '3 hour',
    value: '3',
  },
];

function DurationInHoursPicker({ onChange, name, value }: any) {
  //   const [countryField, , countryFieldHelpers] = useField('country');
  const [color, setColor] = useState('$white900');

  return (
    <Box radius={2} overflow='hidden'>
      <Select
        name={name}
        onValueChange={(value) => {
          const event = new Event('input', { bubbles: true });
          Object.defineProperty(event, 'target', {
            writable: false,
            value: { value, name },
          });
          onChange(event);
          setColor('white');
        }}
        value={value}
      >
        <SelectTrigger
          css={{
            border: '2px solid rgba(152, 152, 255, 0.35)',
            background: 'rgba(152, 152, 255, 0.15)',
            height: '2.25rem',
            fontWeight: 400,
            color,
          }}
          _open={{ borderRadius: '8px' }}
          placeholder='Select the duration'
        />
        <SelectContent position='item-aligned' zIndex={20}>
          <SelectItemList
            w='130px'
            css={{
              background: 'rgba(152, 152, 255, 0.15)',
              blur: '50px',
            }}
          >
            {defaultDurations.map((duration: Duration) => (
              <SelectItem
                color='white100'
                _highlighted={{ backgroundColor: '$purple400' }}
                value={duration.value}
                label={duration.name}
                key={duration.name}
              />
            ))}
          </SelectItemList>
        </SelectContent>
      </Select>
    </Box>
  );
}

export default DurationInHoursPicker;
