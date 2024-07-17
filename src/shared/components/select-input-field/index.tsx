import {
  Box,
  Select,
  SelectContent,
  SelectItem,
  SelectItemList,
  SelectTrigger,
} from '@holdr-ui/react';
import { Fragment } from 'react';
import { SelectInputFieldProps } from './types';

function SelectInputField<T>({
  value,
  placeholder,
  onValueChange,
  keySelector,
  labelSelector,
  valueSelector,
  options,
  triggerCSS,
  _active = { color: '$purple200' },
  _hover = { background: 'rgba(14, 14, 27, 0.50)' },
  _highlighted = { background: 'rgba(14, 14, 27, 0.50)' },
}: SelectInputFieldProps<T>) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        css={{
          height: '2.75rem !important',
          ...triggerCSS,
        }}
        placeholder={placeholder}
      />
      <SelectContent zIndex={25} position='item-aligned'>
        <SelectItemList
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
          css={{
            backgroundColor: 'rgb(44,44,61)',
          }}
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
  );
}
SelectInputField.displayName = 'CustomSelect';

export default SelectInputField;
