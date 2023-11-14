import {
  ButtonGroup,
  Card,
  HStack,
  IconButton,
  Square,
  Text,
  VStack,
} from '@holdr-ui/react';
import { DateUtility, groupArray } from '../../utilities';
import { Date } from './ui';
import { CalendarProps } from './types';
import { useState } from 'react';
import dayjs from 'dayjs';

function Calendar({ onDateClick }: CalendarProps) {
  const today = dayjs().toDate();
  const [currentDate, setCurrentDate] = useState(today);

  const year = DateUtility.get(currentDate, 'year');
  const month = DateUtility.get(currentDate, 'month');

  const weekdays = DateUtility.getWeekdays((day) => day.substring(0, 2));

  const firstDateOfMonth = DateUtility.getStartOf(currentDate, 'month');
  const lastDateOfMonth = DateUtility.getEndOf(currentDate, 'month');

  const firstDateInFirstMonthWeek = DateUtility.getStartOf(
    firstDateOfMonth,
    'week',
  );
  const lastDateInLastMonthWeek = DateUtility.getEndOf(
    lastDateOfMonth,
    'week',
  );

  const numberOfDaysInMonth = DateUtility.difference(
    firstDateInFirstMonthWeek,
    lastDateInLastMonthWeek,
    'day',
  );

  const days = DateUtility.generateDays(
    firstDateInFirstMonthWeek,
    numberOfDaysInMonth,
  );

  const weeksOfDates = groupArray(days, 7);

  const addMonthToCurrentDate = () =>
    setCurrentDate(DateUtility.add(currentDate, 1, 'month'));

  const subtractDateFromCurrentDate = () =>
    setCurrentDate(DateUtility.subtract(currentDate, 1, 'month'));

  return (
    <Card boxShadow='none'>
      <Card.Header
        direction='horizontal'
        items='center'
        justify='space-between'
        mb={4}
      >
        <Text weight={500}>{`${month} ${year}`}</Text>
        <ButtonGroup variant='ghost' w='100' gap={0}>
          <IconButton
            icon='caret-left-outline'
            ariaLabel='view previous month'
            disabled={DateUtility.equal(currentDate, today)}
            onClick={subtractDateFromCurrentDate}
          />
          <IconButton
            icon='caret-right-outline'
            ariaLabel='view next month'
            onClick={addMonthToCurrentDate}
          />
        </ButtonGroup>
      </Card.Header>
      <Card.Body>
        <HStack mb={3} justify='space-between'>
          {weekdays.map((day) => (
            <Square size={30} key={day}>
              <Text size={2} weight={500}>
                {day}
              </Text>
            </Square>
          ))}
        </HStack>
        <VStack gap={3}>
          {weeksOfDates.map((week, idx) => (
            <HStack
              justify='space-between'
              key={`${month}-${year} week ${idx + 1}`}
            >
              {week.map((date) => (
                <Date
                  key={date.toString()}
                  date={date}
                  active={DateUtility.equal(date, today)}
                  disabled={
                    DateUtility.lessThan(date, firstDateOfMonth) ||
                    DateUtility.lessThan(date, today) ||
                    DateUtility.greaterThan(date, lastDateOfMonth)
                  }
                  onClick={() => {
                    onDateClick(date);
                  }}
                />
              ))}
            </HStack>
          ))}
        </VStack>
      </Card.Body>
    </Card>
  );
}
Calendar.displayName = 'Calendar';

export default Calendar;
