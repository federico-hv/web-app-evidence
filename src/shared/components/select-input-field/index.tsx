import {
  Text,
  Select,
  SelectContent,
  SelectItem,
  SelectItemList,
  SelectTrigger,
  VStack,
  hexToRGB,
} from '@holdr-ui/react';
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
  listCSS,
  required,
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
            required={required}
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
                boxShadow: '0px 4px 12px 0px rgba(14, 14, 27, 0.08)',
                background: 'rgba(152, 152, 255, 0.1)',
                backdropFilter: 'blur(40px)',
                borderRightWidth: '1px',
                borderLeftWidth: '1px',
                borderBottomWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'rgba(152, 152, 255, 0.35) !important',
                borderTopWidth: '0',
                borderTopRightRadius: 0,
                borderTopLeftRadius: 0,
                ...listCSS,
              }}
              _active={_active}
              _hover={_hover}
              _highlighted={_highlighted}
              position='relative'
            >
              {options.map((item) => (
                <SelectItem
                  key={keySelector(item)}
                  value={valueSelector(item)}
                  label={labelSelector(item)}
                />
              ))}
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
