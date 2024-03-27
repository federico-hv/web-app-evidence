import {
  Box,
  HStack,
  Icon,
  Select,
  SelectContent,
  SelectItem,
  SelectItemList,
  SelectTrigger,
  useOnValueChange,
} from '@holdr-ui/react';
import { Fragment } from 'react';
import { IconName } from '@holdr-ui/react/dist/shared/types';

export interface CustomSelectOptionPair {
  label: string;
  icon: IconName;
}

type Options = 'public' | 'members' | 'followers';

function SelectAudience() {
  const options: Record<Options, CustomSelectOptionPair> = {
    public: { label: 'Public', icon: 'global-outline' },
    members: { label: 'Members', icon: 'user-square-outline' },
    followers: { label: 'Followers', icon: 'user-group-outline' },
  };

  const { value, handleOnValueChange } = useOnValueChange('public');

  return (
    <Box w='150px'>
      <Select value={value} onValueChange={handleOnValueChange}>
        <SelectTrigger css={{ backgroundColor: 'rgba(26, 26, 41, 0.75)' }}>
          <HStack gap={3} items='center'>
            <Icon name={options[value as Options].icon} />
            {options[value as Options].label}
          </HStack>
        </SelectTrigger>
        <SelectContent zIndex={100} sticky='always'>
          <SelectItemList
            _active={{ color: '$white500' }}
            divider={<Fragment />}
            css={{
              borderBottomLeftRadius: '$2',
              borderBottomRightRadius: '$2',
              backgroundColor: 'rgba(26, 26, 41, 0.75)',
            }}
          >
            <SelectItem
              value='public'
              _hover={{ background: 'rgba(48, 48, 75, 0.50)' }}
              label={options.public.label}
              icon={options.public.icon}
            />
            <SelectItem
              value='followers'
              _hover={{ background: 'rgba(48, 48, 75, 0.50)' }}
              label={options.followers.label}
              icon={options.followers.icon}
            />
            <SelectItem
              value='members'
              _hover={{
                background: 'rgba(14, 14, 27, 0.50)',
              }}
              label={options.members.label}
              icon={options.members.icon}
            />
          </SelectItemList>
        </SelectContent>
      </Select>
    </Box>
  );
}
SelectAudience.displayName = 'SelectAudience';

export default SelectAudience;
