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

function SelectMembershipsSort() {
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
    <Box w={180} fontSize={1}>
      <Select value={value} onValueChange={update}>
        <SelectTrigger
          radius={2}
          placeholder='Sort By'
          css={{
            border: '1px solid rgba(152, 152, 255, 0.10)',
            background: 'rgba(152, 152, 255, 0.1)',
          }}
        />
        <SelectContent sticky='always'>
          <SelectItemList
            _active={{ color: '$purple200' }}
            w={180}
            divider={
              <Box
                h='1px'
                w='100%'
                css={{
                  background: 'rgba(152, 152, 255, 0.1)',
                }}
              />
            }
            position='relative'
            css={{
              boxShadow: '0px 4px 12px 0px rgba(14, 14, 27, 0.08)',
              backgroundColor: 'rgba(49, 49, 73, 0.85)',
              backdropFilter: 'blur(40px)',
              borderBottomLeftRadius: '$2',
              borderBottomRightRadius: '$2',
              border: '1px solid rgba(152, 152, 255, 0.1)',
              borderTop: 'none',
            }}
          >
            <SelectItem
              py={2}
              radius={1}
              _hover={{ background: 'rgba(14, 14, 27, 0.50)' }}
              css={{ fontSize: '$2' }}
              value='oldest'
              label='Oldest to newest'
            />
            <SelectItem
              py={2}
              radius={1}
              _hover={{ background: 'rgba(14, 14, 27, 0.50)' }}
              css={{ fontSize: '$2' }}
              value='newest'
              label='Newest to oldest'
            />
            <SelectItem
              py={2}
              radius={1}
              _hover={{ background: 'rgba(14, 14, 27, 0.50)' }}
              css={{ fontSize: '$2' }}
              value='price:high-to-low'
              label='Price: High to low'
            />
            <SelectItem
              py={2}
              radius={1}
              css={{ fontSize: '$2' }}
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
SelectMembershipsSort.displayName = 'SelectMembershipsSort';

export default SelectMembershipsSort;
