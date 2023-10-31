import { Center } from '@holdr-ui/react';
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
    <Center
      minHeight='35px'
      maxWidth='30px'
      onClick={onClick}
      radius={3}
      {...getDateTheme()}
    >
      {date.day}
    </Center>
  );
}

Date.displayName = 'Date';

export default Date;
