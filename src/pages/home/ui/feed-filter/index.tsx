import {
  Box,
  IconButton,
  Select,
  SelectContent,
  SelectItem,
  SelectItemList,
  SelectTrigger,
} from '@holdr-ui/react';
import { FeedFilterProps } from './types';
import { customBgColor } from '../../../../shared';
import { FeedFilterTypeEnum } from '../../../../features';

function FeedFilter({ current, onClick }: FeedFilterProps) {
  return (
    <Select
      value={current}
      onValueChange={(value) => onClick(value as FeedFilterTypeEnum)}
    >
      <SelectTrigger asChild>
        <IconButton
          className={customBgColor()}
          variant='ghost'
          size='lg'
          icon='filter-outline'
          colorTheme='white50'
          ariaLabel='filter feeds'
        />
      </SelectTrigger>

      <SelectContent
        align='end'
        side='bottom'
        sideOffset={10}
        zIndex={5}
        sticky='always'
      >
        <SelectItemList
          w={200}
          bgColor='rgba(56, 56, 140, 0.25)'
          _active={{ color: '$purple400', fontWeight: 600 }}
          _hover={{ background: 'rgba(14, 14, 27, 0.50)' }}
          _highlighted={{ background: 'rgba(14, 14, 27, 0.50)' }}
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
          blur='xl'
          radius='$3'
          css={{
            boxShadow: '0px 0px 100px 0px rgba(14, 14, 27, 0.35)',
          }}
        >
          <SelectItem
            py={3}
            radius={2}
            _hover={{ background: 'rgba(14, 14, 27, 0.50)' }}
            css={{ fontSize: '$2', fontWeight: 500 }}
            value={FeedFilterTypeEnum.All}
            label='All'
          />
          <SelectItem
            py={3}
            radius={2}
            _hover={{ background: 'rgba(14, 14, 27, 0.50)' }}
            css={{ fontSize: '$2', fontWeight: 500 }}
            value={FeedFilterTypeEnum.Articles}
            label='News'
          />
          <SelectItem
            py={3}
            radius={2}
            _hover={{ background: 'rgba(14, 14, 27, 0.50)' }}
            css={{ fontSize: '$2', fontWeight: 500 }}
            value={FeedFilterTypeEnum.Polls}
            label='Polls'
          />
        </SelectItemList>
      </SelectContent>
    </Select>
  );
}
FeedFilter.displayName = 'FeedFilter';

export default FeedFilter;
