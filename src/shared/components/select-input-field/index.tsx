import {
  Box,
  Text,
  Select,
  SelectContent,
  SelectItem,
  SelectItemList,
  SelectTrigger,
  VStack,
  hexToRGB,
} from '@holdr-ui/react';
import { Fragment } from 'react';
import { SelectInputFieldProps } from './types';
import Label from '../label';

function SelectInputField<T>({
  name,
  label,
  errorText,
  tooltip,
  value,
  placeholder,
  onValueChange,
  keySelector,
  labelSelector,
  valueSelector,
  labelProps,
  options,
  triggerCSS,
  _active = { color: '$purple200' },
  _hover = { background: 'rgba(14, 14, 27, 0.50)' },
  _highlighted = { background: 'rgba(14, 14, 27, 0.50)' },
  position = 'item-aligned',
}: SelectInputFieldProps<T>) {
  return (
    <VStack gap={1} flex={1}>
      <VStack as='fieldset'>
        {label && (
          <Label
            text={label}
            name={name}
            tooltip={tooltip}
            {...labelProps}
          />
        )}
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger
            css={{
              '& span': {
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              },

              height: '2.75rem !important',
              ...triggerCSS,
            }}
            placeholder={placeholder}
          />
          <SelectContent zIndex={25} position={position}>
            <SelectItemList
              radius={1}
              bgColor='rgb(56, 53, 89)'
              borderColor={hexToRGB('#9898FF', 0.1)}
              css={{
                border: '1px solid rgba(152, 152, 255, 0.35) !important',
              }}
              _active={_active}
              _hover={_hover}
              _highlighted={_highlighted}
              divider={
                <Box
                  h='1px'
                  w='100%'
                  css={{
                    background: 'rgba(152, 152, 255, 0.1)',
                  }}
                />
              }
            >
              <Fragment>
                {options.map((item) => (
                  <SelectItem
                    key={keySelector(item)}
                    value={valueSelector(item)}
                    label={labelSelector(item)}
                  />
                ))}
              </Fragment>
            </SelectItemList>
          </SelectContent>
        </Select>
      </VStack>
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
SelectInputField.displayName = 'CustomSelect';

export default SelectInputField;
