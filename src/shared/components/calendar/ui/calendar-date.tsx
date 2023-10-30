import { Square } from '@holdr-ui/react';
import { DateProps } from '../types';
import { disabledTheme, selectedTheme, baseTheme } from '../date.styles';
import { IDate, DateUtility } from '../../../../shared';

function Date({ date, onClick, currentDate, disabled }: DateProps) {
  const getDateTheme = () => {
    if (disabled) return { ...disabledTheme };
    if (DateUtility.fromBreakdown(date as IDate) === currentDate)
      return { ...selectedTheme, ...selectedTheme };
    return baseTheme;
  };

  return (
    <Square
      minHeight='35px'
      maxWidth='30px'
      onClick={onClick}
      size={4}
      radius={3}
      {...getDateTheme()}
    >
      {date.day}
    </Square>
  );
}

Date.displayName = 'Date';

export default Date;
