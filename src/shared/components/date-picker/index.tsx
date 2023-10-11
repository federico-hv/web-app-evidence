import { useState } from 'react';
import { Box, FormControl, HStack, Select, Text } from '@holdr-ui/react';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import { DatePickerProps } from './types';
import { arrayFrom, DateUtility, IDate } from '../../../shared';

dayjs.extend(localeData);

function DatePicker({
  date,
  onChange,
  max = dayjs().toString(),
  min = dayjs().subtract(100, 'years').toString(),
}: DatePickerProps) {
  const [state, set] = useState(DateUtility.breakdown(date));

  // range for months
  // max and min values for days, months and days
  const Minimum: IDate = DateUtility.breakdown(min);
  const Maximum: IDate = DateUtility.breakdown(max);

  // the years allowed
  const years = arrayFrom(
    Math.abs(parseInt(Maximum.year) - parseInt(Minimum.year) + 1),
  );
  // the months allowed
  let monthNames: string[] = dayjs.localeData().months();

  if (state.year === Maximum.year) {
    monthNames = monthNames.slice(
      0,
      DateUtility.parseToIntMonth(Maximum.month) + 1,
    );
  } else if (state.year === Minimum.year) {
    monthNames = monthNames.slice(
      DateUtility.parseToIntMonth(Minimum.month),
      12,
    );
  }
  // the days allowed
  const daysInMonth = DateUtility.daysInMonth(state.month, state.year);
  let days = arrayFrom(daysInMonth);

  if (state.month === Maximum.month && state.year === Maximum.year) {
    days = days.slice(1, parseInt(Maximum.day));
  } else if (
    state.month === Minimum.month &&
    state.year === Minimum.year
  ) {
    days = days.slice(parseInt(Minimum.day));
  }

  const update = (next: Partial<IDate>) => {
    set((prev) => {
      const newState = { ...prev, ...next };
      onChange(DateUtility.fromBreakdown(newState));
      return newState;
    });
  };

  return (
    <HStack gap={{ '@bp1': 3, '@bp3': 4 }}>
      <Box flex={2} minWidth={100}>
        <FormControl>
          <FormControl.Label color='base400'>
            <Text size={2}>Month</Text>
          </FormControl.Label>
          <Select
            size={{ '@bp1': 'sm', '@bp3': 'base' }}
            value={state.month}
            onChange={(e) => update({ month: e.target.value })}
          >
            {monthNames.map((monthName) => (
              <option value={monthName} key={monthName}>
                {monthName}
              </option>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box flex={1} minWidth={80}>
        <FormControl>
          <FormControl.Label color='base400'>
            <Text size={2}>Day</Text>
          </FormControl.Label>
          <Select
            size={{ '@bp1': 'sm', '@bp3': 'base' }}
            value={state.day}
            onChange={(e) => update({ day: e.target.value })}
          >
            {days.map((day) => (
              <option value={day + 1} key={day}>
                {day + 1}
              </option>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box flex={1} minWidth={80}>
        <FormControl>
          <FormControl.Label color='base400'>
            <Text size={2}>Year</Text>
          </FormControl.Label>
          <Select
            size={{ '@bp1': 'sm', '@bp3': 'base' }}
            value={state.year}
            onChange={(e) => update({ year: e.target.value })}
          >
            {years.map((year, idx) => (
              <option value={parseInt(Maximum.year) - idx} key={year}>
                {parseInt(Maximum.year) - idx}
              </option>
            ))}
          </Select>
        </FormControl>
      </Box>
    </HStack>
  );
}

export default DatePicker;
