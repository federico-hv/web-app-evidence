import { useSearchParams } from 'react-router-dom';
import { Circle, HStack, Icon, useSwitch } from '@holdr-ui/react';
import { FilterProps } from './types';

function Filter({ label, active, name }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = String(searchParams.get('filters')).split(',');

  const { switchState, toggle } = useSwitch(active);

  return (
    <HStack
      px={3}
      py={3}
      gap={3}
      onClick={() => {
        if (switchState) {
          setSearchParams((prev) => ({
            ...prev,
            filters: filters.filter((item) => item === name).join(','),
          }));
        } else {
          setSearchParams((prev) => ({
            ...prev,
            filters: [...filters, name].join(','),
          }));
        }
        toggle();
      }}
      items='center'
      radius={3}
      cursor='pointer'
      _hover={
        switchState
          ? { backgroundColor: 'rgba(152, 152, 255, 0.75)' }
          : { backgroundColor: 'rgba(152, 152, 255, 0.50)' }
      }
      css={{
        transition: 'all 0.25s ease',
        border: '1px solid rgba(152, 152, 255, 0.50)',
        backgroundColor: switchState ? 'rgba(152, 152, 255, 0.50)' : '',
      }}
      fontSize={2}
    >
      {switchState && (
        <Circle
          size='14px'
          bgColor='white500'
          // css={{ border: '1px solid rgba(152, 152, 255)' }}
        >
          <Icon color='purple400' name='check' />
        </Circle>
      )}
      {label}
    </HStack>
  );
}
Filter.displayName = 'Filter';

export default Filter;
