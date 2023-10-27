import {
  Box,
  ButtonGroup,
  Card,
  Container,
  Grid,
  HStack,
  IconButton,
  Text,
} from '@holdr-ui/react';
import { DateUtility } from '../../../shared/utilities';
import {
  getDays,
  getNextMonth,
  getPreviousMonth,
  getWeekdays,
} from './utilities';
import Date from './ui/calendar-date';
import { CalendarProps, CalendarState } from './types';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { IDate } from '../../../shared';

function Calendar({ startingDate, onDayClick }: CalendarProps) {
  const initialDate = { ...startingDate };
  initialDate.month = (
    DateUtility.parseToIntMonth(startingDate.month) + 1
  ).toString();

  const [isInitialDate, setIsInitialDate] = useState<boolean>(true);
  const [calendarDate, setCalendarDate] = useState<CalendarState>(
    _.omit(initialDate, 'day'),
  );

  useEffect(() => {
    setIsInitialDate(_.isEqual(calendarDate, _.omit(initialDate, 'day')));
  }, [calendarDate]);

  const incrementDate = () => {
    setCalendarDate(getNextMonth(calendarDate));
  };

  const decrementDate = () => {
    if (isInitialDate) return;

    setCalendarDate(getPreviousMonth(calendarDate));
  };

  return (
    <Card boxShadow='false'>
      <Card.Header
        direction='horizontal'
        justify='space-between'
        css={{ padding: '$3 0' }}
      >
        <Container>
          <Text weight={500} css={{ userSelect: 'none' }}>
            {`${
              DateUtility.allMonths()[parseInt(calendarDate.month) - 1]
            } ${calendarDate.year}`}
          </Text>
        </Container>
        <ButtonGroup variant='ghost' style={{ padding: 0 }}>
          <IconButton
            icon='caret-left-outline'
            ariaLabel='decrementMonth'
            disabled={isInitialDate}
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
        <Grid templateColumns='repeat(7, 1fr)' pb={'$3'}>
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
          {getDays(calendarDate.month, calendarDate.year).map(
            (el, idx) => {
              const date: IDate = {
                ...calendarDate,
                day: el.day.toString(),
              };
              return (
                <Grid.Item key={idx}>
                  <Date
                    date={date}
                    disabled={el.disabled}
                    initialDate={initialDate}
                    onClick={() => onDayClick(date)}
                  />
                </Grid.Item>
              );
            },
          )}
        </Grid>
      </Card.Body>
    </Card>
  );
}

Calendar.displayName = 'Calendar';
export default Calendar;
