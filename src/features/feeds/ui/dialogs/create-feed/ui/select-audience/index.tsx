import {
  Box,
  HStack,
  Icon,
  Select,
  SelectContent,
  SelectItem,
  SelectItemList,
  SelectTrigger,
} from '@holdr-ui/react';
import { Fragment } from 'react';
import { IconName } from '@holdr-ui/react/dist/shared/types';
import { FeedAudienceEnum } from '../../../../../shared';
import { useCreateFeedContext } from '../../shared';

interface CustomSelectOptionPair {
  label: string;
  icon: IconName;
}

function SelectAudience() {
  const options: Record<FeedAudienceEnum, CustomSelectOptionPair> = {
    [FeedAudienceEnum.Everyone]: {
      label: 'Public',
      icon: 'global-outline',
    },
    [FeedAudienceEnum.Members]: {
      label: 'Members',
      icon: 'user-square-outline',
    },
    [FeedAudienceEnum.Followers]: {
      label: 'Followers',
      icon: 'user-group-outline',
    },
  };

  const { audience, setAudience } = useCreateFeedContext();

  return (
    <Box w='150px'>
      <Select
        value={audience}
        onValueChange={(value) => setAudience(value as FeedAudienceEnum)}
      >
        <SelectTrigger
          css={{
            backgroundColor: 'rgba(26, 26, 41, 0.75)',
            paddingLeft: '15px',
            margin: '0',
          }}
        >
          <HStack gap={2} items='center'>
            <Icon name={options[audience].icon} />
            {options[audience].label}
          </HStack>
        </SelectTrigger>
        <SelectContent zIndex={100} sticky='always'>
          <SelectItemList
            _active={{ color: '$white500' }}
            divider={<Fragment />}
            _hover={{ background: 'rgba(14, 14, 27, 0.70)' }}
            _highlighted={{ background: 'rgba(14, 14, 27, 0.70)' }}
            css={{
              borderBottomLeftRadius: '$2',
              borderBottomRightRadius: '$2',
              backgroundColor: 'rgba(26, 26, 41)',
              boxShadow: `0px 0px 50px 0px rgba(0, 0, 0, 0.25)`,
            }}
          >
            <SelectItem
              value={FeedAudienceEnum.Everyone}
              _hover={{ background: 'rgba(48, 48, 75, 0.50)' }}
              icon={options[FeedAudienceEnum.Everyone].icon}
              label={options[FeedAudienceEnum.Everyone].label}
              m={0}
              px={4}
              radius={0}
            />
            <SelectItem
              value={FeedAudienceEnum.Followers}
              _hover={{ background: 'rgba(48, 48, 75, 0.50)' }}
              label={options[FeedAudienceEnum.Followers].label}
              icon={options[FeedAudienceEnum.Followers].icon}
              m={0}
              px={4}
              radius={0}
            >
              Followers
            </SelectItem>
            <SelectItem
              value={FeedAudienceEnum.Members}
              _hover={{
                background: 'rgba(48, 48, 75, 0.50)',
              }}
              label={options[FeedAudienceEnum.Members].label}
              icon={options[FeedAudienceEnum.Members].icon}
              m={0}
              px={4}
              radius={0}
            >
              Members
            </SelectItem>
          </SelectItemList>
        </SelectContent>
      </Select>
    </Box>
  );
}
SelectAudience.displayName = 'SelectAudience';

export default SelectAudience;
