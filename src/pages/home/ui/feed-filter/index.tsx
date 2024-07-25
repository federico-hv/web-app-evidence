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
        zIndex={10}
        sticky='always'
      >
        <SelectItemList
          w={200}
          _active={{ color: '$purple400' }}
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
            value={FeedFilterTypeEnum.All}
            label='All'
          />
          <SelectItem
            py={3}
            radius={2}
            _hover={{ background: 'rgba(14, 14, 27, 0.50)' }}
            css={{ fontSize: '$2' }}
            value={FeedFilterTypeEnum.Articles}
            label='News'
          />
          <SelectItem
            py={3}
            radius={2}
            _hover={{ background: 'rgba(14, 14, 27, 0.50)' }}
            css={{ fontSize: '$2' }}
            value={FeedFilterTypeEnum.Posts}
            label='Posts'
          />
        </SelectItemList>
      </SelectContent>
    </Select>
  );
}
FeedFilter.displayName = 'FeedFilter';

export default FeedFilter;
