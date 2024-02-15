import { FeedFilterValue } from '../../shared';
import {
  Box,
  HStack,
  Icon,
  IconButton,
  Select,
  SelectContent,
  SelectItem,
  SelectItemList,
  SelectTrigger,
  Text,
} from '@holdr-ui/react';
import { ButtonWrapper } from '../../../../layout/navigation/ui';
import { FeedFilterProps } from './types';

function FeedFilter({ current, onClick }: FeedFilterProps) {
  const Label = ({
    value,
    checked,
  }: {
    value: string;
    checked: boolean;
  }) => (
    <HStack items='center' gap={3}>
      {checked && <Icon name='check' color='purple400' />}
      <Text casing='capitalize' color={checked ? 'purple400' : 'initial'}>
        {value}
      </Text>
    </HStack>
  );

  return (
    <Select
      value={current}
      onValueChange={(value) => onClick(value as FeedFilterValue)}
    >
      <SelectTrigger
        as={
          <ButtonWrapper>
            <IconButton
              variant='ghost'
              size='lg'
              icon='filter-outline'
              colorTheme='white50'
              ariaLabel='filter feeds'
            />
          </ButtonWrapper>
        }
      />

      <SelectContent
        align='end'
        side='bottom'
        sideOffset={10}
        zIndex={10}
        sticky='always'
      >
        <SelectItemList
          w={200}
          _active={{ color: '$purple400' }}
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
            backgroundColor: 'rgba(49, 49, 73, 0.75)',
            backdropFilter: 'blur(50px)',
            borderRadius: '$3',
          }}
        >
          <SelectItem
            py={3}
            radius={2}
            _hover={{ background: 'rgba(14, 14, 27, 0.50)' }}
            css={{ fontSize: '$2' }}
            value='all'
            label='All'
          />
          <SelectItem
            py={3}
            radius={2}
            _hover={{ background: 'rgba(14, 14, 27, 0.50)' }}
            css={{ fontSize: '$2' }}
            value='article'
            label='News'
          />
          <SelectItem
            py={3}
            radius={2}
            _hover={{ background: 'rgba(14, 14, 27, 0.50)' }}
            css={{ fontSize: '$2' }}
            value='poll'
            label='Polls'
          />
          <SelectItem
            py={3}
            radius={2}
            css={{ fontSize: '$2' }}
            _hover={{ background: 'rgba(14, 14, 27, 0.50)' }}
            value='music'
            label='Music'
          />
        </SelectItemList>
      </SelectContent>
    </Select>
  );
}
FeedFilter.displayName = 'FeedFilter';

export default FeedFilter;
