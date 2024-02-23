import {
  Box,
  HStack,
  Icon,
  Select,
  SelectContent,
  SelectItem,
  SelectItemList,
  SelectTrigger,
  Text,
  useOnValueChange,
} from '@holdr-ui/react';
import { Fragment } from 'react';

function SelectAudience() {
  const { value, handleOnValueChange } = useOnValueChange('option-1');
  const Trigger = () => (
    <HStack
      items='center'
      radius={2}
      px={3}
      py={2}
      color='white500'
      justify='space-between'
      css={{
        backgroundColor: 'rgb(45, 45, 71)',
      }}
    >
      <HStack gap={2}>
        <Icon name='global-outline' />
        <Text>Public</Text>
      </HStack>
      <Icon name='caret-down-outline' />
    </HStack>
  );

  return (
    <Box w='150px'>
      <Select value={value} onValueChange={handleOnValueChange}>
        <SelectTrigger as={<Trigger />} />
        <SelectContent zIndex={100} sticky='always'>
          <SelectItemList
            divider={<Fragment />}
            css={{
              borderBottomLeftRadius: '$2',
              borderBottomRightRadius: '$2',
              backgroundColor: 'rgb(45, 45, 71)',
            }}
          >
            <SelectItem asChild value='public'>
              <HStack
                onClick={() => handleOnValueChange('public')}
                gap={2}
                p={3}
              >
                <Icon name='global-outline' />
                <Text>Public</Text>
              </HStack>
            </SelectItem>
            <SelectItem asChild value='followers'>
              <HStack
                onClick={() => handleOnValueChange('followers')}
                gap={2}
                p={3}
              >
                <Icon name='user-group-outline' />
                <Text>Followers</Text>
              </HStack>
            </SelectItem>
            <SelectItem asChild value='members'>
              <HStack
                onClick={() => handleOnValueChange('members')}
                gap={2}
                p={3}
              >
                <Icon name='user-square-outline' />
                <Text>Members</Text>
              </HStack>
            </SelectItem>
          </SelectItemList>
        </SelectContent>
      </Select>
    </Box>
  );
}
SelectAudience.displayName = 'SelectAudience';

export default SelectAudience;
