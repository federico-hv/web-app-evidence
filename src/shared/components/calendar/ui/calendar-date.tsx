import { Center, Square } from '@holdr-ui/react';
import { DateProps } from '../types';
import { DateUtility } from '../../../../shared';

function Date({ date, currentDate, onClick, disabled }: DateProps) {
  let props = {};

  const disabledProps = {
    css: {
      color: '$base300',
      cursor: 'default',
    },
  };

  const selectedProps = {
    css: {
      backgroundColor: '$base800',
      color: '$base100',
    },
    _hover: {
      backgroundColor: '$base500',
    },
  };

  const baseProps = {
    _hover: {
      backgroundColor: '$base200',
    },
  };

  props = disabled
    ? { ...props, ...disabledProps }
    : { ...props, ...baseProps };

  if (DateUtility.fromBreakdown(date) === currentDate)
    props = { ...props, ...selectedProps };

  return (
    <Center>
      <Square
        minHeight='35px'
        {...props}
        onClick={onClick}
        size={4}
        radius={3}
      >
        {date.day}
      </Square>
    </Center>
  );
}

Date.displayName = 'Date';

export default Date;
