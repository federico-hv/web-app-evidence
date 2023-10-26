import {
  Box,
  Button,
  Container,
  Grid,
  HStack,
  Text,
} from '@holdr-ui/react';
import { DateUtility } from '../../../shared/utilities';
import { getDays, getWeekdays } from './utilities';
import dayjs from 'dayjs';
import Date from './ui/calendar-date';
import { useDate } from './hooks/useDate';
import { CalendarDate } from './types/calendar-types';

function Calendar() {
  const currentDate = DateUtility.breakdown(dayjs().format('MM-DD-YYYY'));
  currentDate.month = (
    DateUtility.parseToIntMonth(currentDate.month) + 1
  ).toString();

  const { calendarDate, isCurrentDate, incrementDate, decrementDate } =
    useDate(currentDate);

  // TODO: replace with onClick functionality
  function onClick(date: CalendarDate) {
    console.log(date);
  }

  return (
    <Box>
      <HStack justify='space-between' css={{ padding: '$3 0' }}>
        <Container>
          <Text weight={500}>
            {`${
              DateUtility.allMonths()[parseInt(calendarDate.month) - 1]
            } ${calendarDate.year}`}
          </Text>
        </Container>
        <HStack>
          <Button
            variant='ghost'
            rightIcon='caret-left-outline'
            onClick={decrementDate}
            style={{ padding: 0 }}
          />
          <Button
            variant='ghost'
            rightIcon='caret-right-outline'
            onClick={incrementDate}
            disabled={isCurrentDate}
            style={{ padding: 0 }}
          />
        </HStack>
      </HStack>

      <Grid
        templateColumns='repeat(7, 1fr)'
        rowGap={4}
        templateRows='repeat(6, 1fr)'
      >
        {getWeekdays(calendarDate).map((weekday, idx) => (
          <Grid.Item key={idx}>
            <Container centerContent>
              <Text weight={500}>{weekday}</Text>
            </Container>
          </Grid.Item>
        ))}

        {getDays(calendarDate.month, calendarDate.year).map((day, idx) => {
          const date: CalendarDate = {
            ...calendarDate,
            day: day.toString(),
          };
          return (
            <Grid.Item key={idx}>
              <Date
                date={date}
                disabled={day != idx + 1}
                currentDate={currentDate}
                onClick={() => onClick(date)}
              />
            </Grid.Item>
          );
        })}
      </Grid>
    </Box>
  );
}

Calendar.displayName = 'Calendar';
export default Calendar;
