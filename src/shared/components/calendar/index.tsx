import {
  Box,
  ButtonGroup,
  Card,
  Center,
  Grid,
  IconButton,
  Square,
  Text,
} from '@holdr-ui/react';
import { DateUtility } from '../../../shared/utilities';
import { getDays, getWeekdays } from './utilities';
import Date from './ui/calendar-date';
import { CalendarProps } from './types';
import { useState } from 'react';
import { isEqual, omit } from 'lodash';
import { IDate } from '../../../shared';
import { disabledTheme, selectedTheme, baseTheme } from './date.styles';
import dayjs from 'dayjs';

function Calendar({ onDayClick }: CalendarProps) {
  const currentDate = dayjs().format('YYYY-MM-DD');

  const [calendarDate, setCalendarDate] = useState<string>(
    dayjs().startOf('month').format('YYYY-MM-DD'),
  );

  const isCurrentDate = isEqual(
    omit(DateUtility.breakdown(calendarDate), 'day'),
    omit(DateUtility.breakdown(currentDate), 'day'),
  );

  const incrementDate = () => {
    setCalendarDate(
      dayjs(calendarDate).add(1, 'month').format('YYYY-MM-DD'),
    );
  };

  const decrementDate = () => {
    if (isCurrentDate) return;

    setCalendarDate(
      dayjs(calendarDate).subtract(1, 'month').format('YYYY-MM-DD'),
    );
  };

  const { year: calendarYear, month: calendarMonth } =
    DateUtility.breakdown(calendarDate);

  const calendarDays = getDays(calendarDate).map((date) => {
    return {
      month: calendarMonth,
      year: calendarYear,
      day: date.day.toString(),
      disabled: date.disabled,
    };
  });

  const getDateTheme = (date: IDate & { disabled: boolean }) => {
    if (date.disabled) return { ...disabledTheme };
    if (DateUtility.fromBreakdown(date as IDate) === currentDate)
      return { ...selectedTheme, ...selectedTheme };
    return baseTheme;
  };

  return (
    <Card boxShadow='none'>
      <Card.Header direction='horizontal' justify='space-between' pb={1}>
        <Center>
          <Text weight={500} css={{ userSelect: 'none' }}>
            {`${calendarMonth} ${calendarYear} `}
          </Text>
        </Center>
        <ButtonGroup variant='ghost' w='100' gap={0}>
          <IconButton
            icon='caret-left-outline'
            ariaLabel='decrementMonth'
            disabled={isCurrentDate}
            onClick={decrementDate}
          />
          <IconButton
            icon='caret-right-outline'
            ariaLabel='incrementMonth'
            onClick={incrementDate}
          />
        </ButtonGroup>
      </Card.Header>
      <Card.Body>
        <Grid
          templateColumns='repeat(7, 1fr)'
          pb={'$3'}
          cursor={'default'}
        >
          {getWeekdays().map((weekday, idx) => (
            <Grid.Item key={idx}>
              <Square size={4}>
                <Text weight={500}>{weekday}</Text>
              </Square>
            </Grid.Item>
          ))}
        </Grid>
        <Grid
          templateColumns='repeat(7, 1fr)'
          rowGap={3}
          templateRows='repeat(6, 1fr)'
        >
          {calendarDays.map((date, idx) => {
            return (
              <Grid.Item key={idx}>
                <Date
                  date={date as IDate}
                  theme={getDateTheme(date)}
                  onClick={() => onDayClick(omit(date, 'disabled'))}
                />
              </Grid.Item>
            );
          })}
        </Grid>
      </Card.Body>
    </Card>
  );
}

Calendar.displayName = 'Calendar';
export default Calendar;
