import { Circle, HStack, Icon, Text, useSwitch } from '@holdr-ui/react';
import { FilterProps } from './types';
import { useUpdateFilter } from '../../shared';

function Filter({ label, active, name }: FilterProps) {
  const { switchState: isActive, toggle } = useSwitch(active);
  const updateFilter = useUpdateFilter();

  return (
    <HStack
      p={2}
      gap={2}
      onClick={() => {
        updateFilter(isActive, name);
        toggle();
      }}
      items='center'
      radius={2}
      cursor='pointer'
      _hover={
        isActive
          ? { backgroundColor: 'rgba(152, 152, 255, 0.75)' }
          : { backgroundColor: 'rgba(152, 152, 255, 0.50)' }
      }
      css={{
        transition: 'all 0.25s ease',
        border: '1px solid rgba(152, 152, 255, 0.50)',
        backgroundColor: isActive ? 'rgba(152, 152, 255, 0.50)' : '',
      }}
      fontSize={2}
    >
      {isActive && (
        <Circle size='14px' bgColor='white500'>
          <Icon size='xs' color='purple400' name='check' />
        </Circle>
      )}
      <Text size={1}>{label}</Text>
    </HStack>
  );
}
Filter.displayName = 'Filter';

export default Filter;
