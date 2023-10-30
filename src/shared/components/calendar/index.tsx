import {
  ButtonGroup,
  Card,
  Container,
  Grid,
  IconButton,
  Text,
} from '@holdr-ui/react';
import { DateUtility } from '../../../shared/utilities';
import { getDays, getWeekdays } from './utilities';
import Date from './ui/calendar-date';
import { CalendarProps } from './types';
import { useState } from 'react';
import { isEqual, omit } from 'lodash';
import { IDate } from '../../../shared';
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

  return (
    <Card boxShadow='none'>
      <Card.Header direction='horizontal' justify='space-between' pb={4}>
        <Container css={{ paddingInline: 0 }}>
          <Text weight={500} css={{ userSelect: 'none' }}>
            {`${calendarMonth} ${calendarYear} `}
          </Text>
        </Container>
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
              <Container centerContent>
                <Text weight={500}>{weekday}</Text>
              </Container>
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
                  disabled={date.disabled}
                  currentDate={currentDate}
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
