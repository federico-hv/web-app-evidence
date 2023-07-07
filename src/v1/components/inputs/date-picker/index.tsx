import { useState } from 'react';
import { Box, FormControl, HStack, Select } from '@holdr-ui/react';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import { DatePickerProps } from './date-picker.type';
import { Age, IDate } from '../../../shared';
import { arrayFrom, DateUtility } from '../../../utilities';

dayjs.extend(localeData);

function DatePicker({ date, onChange }: DatePickerProps) {
  const [state, set] = useState(DateUtility.breakdown(date));
  // range for months
  const months = dayjs.localeData().months();
  // ranges for year picker
  const minYear = dayjs().subtract(Age.min, 'year').get('year');
  const years = arrayFrom(75);
  // range for days in month
  const daysInMonth = DateUtility.daysInMonth(state.month, state.year);
  const days = arrayFrom(daysInMonth);

  const update = (next: Partial<IDate>) => {
    set((prev) => {
      const newState = { ...prev, ...next };
      onChange(DateUtility.fromBreakdown(newState));
      return newState;
    });
  };

  return (
    <HStack gap={4}>
      <Box w={125}>
        <FormControl>
          <FormControl.Label color='base400'>Month</FormControl.Label>
          <Select
            value={state.month}
            onChange={(e) => update({ month: e.target.value })}
          >
            {months.map((month) => (
              <option value={month} key={month}>
                {month}
              </option>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box w={80}>
        <FormControl>
          <FormControl.Label color='base400'>Day</FormControl.Label>
          <Select
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

      <Box w={80}>
        <FormControl>
          <FormControl.Label color='base400'>Year</FormControl.Label>
          <Select
            value={state.year}
            onChange={(e) => update({ year: e.target.value })}
          >
            {years.map((year, idx) => (
              <option value={minYear - idx} key={year}>
                {minYear - idx}
              </option>
            ))}
          </Select>
        </FormControl>
      </Box>
    </HStack>
  );
}

export default DatePicker;
