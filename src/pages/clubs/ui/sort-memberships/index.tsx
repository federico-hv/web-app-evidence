import {
  Box,
  Select,
  SelectContent,
  SelectItem,
  SelectItemList,
  SelectTrigger,
  useOnValueChange,
} from '@holdr-ui/react';
import { useSearchParams } from 'react-router-dom';

function SortMemberships() {
  const { handleOnValueChange, value } = useOnValueChange('');
  const [, setSearchParams] = useSearchParams();

  const update = (value: string) => {
    handleOnValueChange(value);
    setSearchParams((prev) => {
      prev.delete('sortBy');
      prev.append('sortBy', value);
      return prev;
    });
  };

  return (
    <Box w={190}>
      <Select value={value} onValueChange={update}>
        <SelectTrigger
          placeholder='Sort By'
          css={{
            border: '1px solid rgba(152, 152, 255, 0.10)',
            backgroundColor: 'rgba(49, 49, 73, 0.85)',
          }}
        />
        <SelectContent sticky='always'>
          <SelectItemList
            w={190}
            divider={
              <Box
                h='1px'
                w='100%'
                css={{
                  backgroundColor: 'rgba(152, 152, 255, 0.10)',
                }}
              />
            }
            position='relative'
            css={{
              boxShadow: '0px 0px 100px 0px rgba(14, 14, 27, 0.35)',
              backgroundColor: 'rgba(49, 49, 73, 0.85)',
              backdropFilter: 'blur(50px)',
              borderBottomLeftRadius: '$3',
              borderBottomRightRadius: '$3',
            }}
          >
            <SelectItem
              py={3}
              _hover={{ background: 'rgba(14, 14, 27, 0.50)' }}
              value='newest'
              label='Newest'
            />
            <SelectItem
              py={3}
              _hover={{ background: 'rgba(14, 14, 27, 0.50)' }}
              value='oldest'
              label='Oldest'
            />
            <SelectItem
              py={3}
              _hover={{ background: 'rgba(14, 14, 27, 0.50)' }}
              value='price:high-to-low'
              label='Price: High to low'
            />
            <SelectItem
              py={3}
              _hover={{ background: 'rgba(14, 14, 27, 0.50)' }}
              value='price:low-to-high'
              label='Price: Low to high'
            />
          </SelectItemList>
        </SelectContent>
      </Select>
    </Box>
  );
}
SortMemberships.displayName = 'SortMemberships';

export default SortMemberships;
