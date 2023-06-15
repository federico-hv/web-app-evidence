import { useState } from 'react';
import { Box, FormControl, HStack, Input, Select } from '@holdr-ui/react';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import { DatePickerProps } from './date-picker.type';
import { IDate } from 'shared';
import { DateUtility } from 'utilities';

dayjs.extend(localeData);

function DatePicker({ name, date, onChange }: DatePickerProps) {
  const [state, set] = useState(DateUtility.breakdown(date));

  const handleChange = onChange(name);

  const update = (next: Partial<IDate>) => {
    set((prev) => {
      const newState = { ...prev, ...next };
      handleChange(DateUtility.fromBreakdown(newState));
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
            {dayjs
              .localeData()
              .months()
              .map((month) => (
                <option value={month} key={month}>
                  {month}
                </option>
              ))}
          </Select>
        </FormControl>
      </Box>
      <Box w={75}>
        <FormControl>
          <FormControl.Label color='base400'>Day</FormControl.Label>
          <Input
            value={state.day}
            onChange={(e) => update({ day: e.target.value })}
          />
        </FormControl>
      </Box>
      <Box w={75}>
        <FormControl>
          <FormControl.Label color='base400'>Year</FormControl.Label>
          <Input
            value={state.year}
            onChange={(e) => update({ year: e.target.value })}
          />
        </FormControl>
      </Box>
    </HStack>
  );
}

export default DatePicker;
