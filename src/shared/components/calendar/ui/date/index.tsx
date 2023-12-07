import { Text, Square } from '@holdr-ui/react';
import { DateProps } from '../../types';
import { DateUtility } from '../../../..';

function Date({ date, active, onClick, disabled }: DateProps) {
  return (
    <Square
      bgColor={active ? 'base800' : 'transparent'}
      size={30}
      radius={3}
      onClick={onClick}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      _hover={
        disabled || active ? undefined : { backgroundColor: '$base100' }
      }
    >
      {active ? (
        <Text color={'primary100'} size={2}>
          {DateUtility.get(date, 'day')}
        </Text>
      ) : (
        <Text color={disabled ? 'base300' : 'base800'} size={2}>
          {DateUtility.get(date, 'day')}
        </Text>
      )}
    </Square>
  );
}

Date.displayName = 'Date';

export default Date;
