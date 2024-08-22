import { useState } from 'react';
import { Box, CSSTheme, HStack, Text, VStack } from '@holdr-ui/react';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import { DatePickerProps } from './types';
import Label from '../label';
import { arrayFrom, DateUtility } from '../../utilities';
import { IDate } from '../../interfaces';
import { SelectInputField } from '../index';
import { lightSelectCSS } from '../../styles';
import { TextProps } from '@holdr-ui/react/dist/components/text/src/text.types';

dayjs.extend(localeData);

function DatePicker({
  label,
  name,
  errorText,
  tooltip,
  date,
  onChange,
  labelProps,
  required,
  triggerCSS = lightSelectCSS,
  listCSS,
  max = dayjs().toString(),
  min = dayjs().subtract(100, 'years').toString(),
}: DatePickerProps & {
  required?: boolean;
  triggerCSS?: CSSTheme;
  listCSS?: CSSTheme;
  labelProps?: TextProps;
}) {
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
      {label && (
        <Label
          name={name}
          tooltip={tooltip}
          text={label}
          required={required}
          {...labelProps}
        />
      )}
      <HStack gap={2} data-cy='date-picker'>
        <Box w='135px' flex={2}>
          <SelectInputField
            listCSS={{
              borderTopWidth: '1px',
              borderTopRightRadius: '$2',
              borderTopLeftRadius: '$2',
              ...listCSS,
            }}
            value={state.month}
            onValueChange={(value) => update({ month: value })}
            name='month'
            triggerCSS={triggerCSS}
            options={monthNames}
            keySelector={(name) => name}
            labelSelector={(name) => name}
            valueSelector={(name) => name}
          />
        </Box>

        <Box w='78px' flex={1}>
          <SelectInputField
            listCSS={{
              borderTopWidth: '1px',
              borderTopRightRadius: '$2',
              borderTopLeftRadius: '$2',
              ...listCSS,
            }}
            value={state.day}
            onValueChange={(value) => update({ day: value })}
            name='day'
            triggerCSS={triggerCSS}
            options={days}
            keySelector={(day) => (day + 1).toString()}
            labelSelector={(day) => (day + 1).toString()}
            valueSelector={(day) => (day + 1).toString()}
          />
        </Box>

        <Box w='102px' flex={1.5}>
          <SelectInputField
            listCSS={{
              borderTopWidth: '1px',
              borderTopRightRadius: '$2',
              borderTopLeftRadius: '$2',
              ...listCSS,
            }}
            value={state.year}
            onValueChange={(value) => update({ year: value })}
            name='year'
            triggerCSS={triggerCSS}
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
