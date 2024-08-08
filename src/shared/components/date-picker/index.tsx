import { useState } from 'react';
import { Box, HStack, Text, VStack } from '@holdr-ui/react';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import { DatePickerProps } from './types';
import Label from '../label';
import { arrayFrom, DateUtility } from '../../utilities';
import { IDate } from '../../interfaces';
import { SelectInputField } from '../index';
import { lightSelectCSS } from '../../styles';

dayjs.extend(localeData);

function DatePicker({
  label,
  name,
  errorText,
  tooltip,
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
    days = days.slice(0, parseInt(Maximum.day) - 1);
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
    <VStack>
      {label && <Label name={name} tooltip={tooltip} text={label} />}
      <HStack gap={2} data-cy='date-picker'>
        <Box flex={2}>
          <SelectInputField
            listCSS={{
              borderTopWidth: '1px',
              borderTopRightRadius: '$2',
              borderTopLeftRadius: '$2',
            }}
            value={state.month}
            onValueChange={(value) => update({ month: value })}
            name='month'
            triggerCSS={lightSelectCSS}
            options={monthNames}
            keySelector={(name) => name}
            labelSelector={(name) => name}
            valueSelector={(name) => name}
          />
        </Box>

        <Box flex={1}>
          <SelectInputField
            listCSS={{
              borderTopWidth: '1px',
              borderTopRightRadius: '$2',
              borderTopLeftRadius: '$2',
            }}
            value={state.day}
            onValueChange={(value) => update({ day: value })}
            name='day'
            triggerCSS={lightSelectCSS}
            options={days}
            keySelector={(day) => (day + 1).toString()}
            labelSelector={(day) => (day + 1).toString()}
            valueSelector={(day) => (day + 1).toString()}
          />
        </Box>

        <Box flex={1.5}>
          <SelectInputField
            listCSS={{
              borderTopWidth: '1px',
              borderTopRightRadius: '$2',
              borderTopLeftRadius: '$2',
            }}
            value={state.year}
            onValueChange={(value) => update({ year: value })}
            name='year'
            triggerCSS={lightSelectCSS}
            options={years}
            keySelector={(idx) =>
              (parseInt(Maximum.year) - idx).toString()
            }
            labelSelector={(idx) =>
              (parseInt(Maximum.year) - idx).toString()
            }
            valueSelector={(idx) =>
              (parseInt(Maximum.year) - idx).toString()
            }
          />
        </Box>
      </HStack>
      {errorText && errorText.length && (
        <Text
          weight={500}
          color='danger200'
          size={1}
          css={{ marginTop: '$2' }}
        >
          {errorText}
        </Text>
      )}
    </VStack>
  );
}

export default DatePicker;
