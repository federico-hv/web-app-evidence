import { Square } from '@holdr-ui/react';
import { DateProps } from '../types';

function Date({ date, onClick, theme }: DateProps) {
  return (
    <Square
      minHeight='35px'
      maxWidth='30px'
      onClick={onClick}
      size={4}
      radius={3}
      {...theme}
    >
      {date.day}
    </Square>
  );
}

Date.displayName = 'Date';

export default Date;
