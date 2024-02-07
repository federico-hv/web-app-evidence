import { CreatePost } from '../../../features';
import { HStack, Icon, IconButton, Text, VStack } from '@holdr-ui/react';
import CustomTabs, {
  CustomTabsContent,
  CustomTabsHeader,
  CustomTabsList,
  CustomTabsTrigger,
} from '../../../tmp/custom-tabs';
import { ButtonWrapper } from '../../../layout/navigation/ui';
import Feeds from './feeds';
import { Menu, MenuContent, MenuItem, MenuTrigger } from '../../../shared';
import { useState } from 'react';
import { FeedFilterValue } from '../shared';

function FeedFilterMenu({
  current,
  onClick,
}: {
  current: FeedFilterValue;
  onClick: (value: FeedFilterValue) => void;
}) {
  const Label = ({
    value,
    checked,
  }: {
    value: string;
    checked: boolean;
  }) => (
    <HStack items='center' gap={4}>
      {checked && <Icon name='check' color='purple400' />}
      <Text casing='capitalize' color={checked ? 'purple400' : 'initial'}>
        {value}
      </Text>
    </HStack>
  );

  return (
    <Menu minWidth={200} offset={18}>
      <MenuTrigger>
        <ButtonWrapper>
          <IconButton
            variant='ghost'
            icon='filter-outline'
            colorTheme='white50'
            ariaLabel={'settings'}
          />
        </ButtonWrapper>
      </MenuTrigger>
      <MenuContent>
        <MenuItem action={() => onClick('all')}>
          <Label value='all' checked={current === 'all'} />
        </MenuItem>
        <MenuItem action={() => onClick('news')}>
          <Label value='news' checked={current === 'news'} />
        </MenuItem>
        <MenuItem action={() => onClick('music')}>
          <Label value='music' checked={current === 'music'} />
        </MenuItem>
        <MenuItem action={() => onClick('polls')}>
          <Label value='polls' checked={current === 'polls'} />
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}

function FeedTabs() {
  const [filter, setFilter] = useState<FeedFilterValue>('all');

  const updateFilter = (value: FeedFilterValue) => setFilter(value);

  return (
    <CustomTabs
      defaultValue='for-you'
      flex={1}
      css={{
        background:
          'radial-gradient(50% 100% at 50% 100%, rgba(128, 128, 255, 0.15) 0%, rgba(128, 128, 255, 0.05) 100%)',
      }}
    >
      <CustomTabsHeader
        h={64}
        position='sticky'
        t={80}
        zIndex={10}
        css={{
          backgroundColor: '#141317',
        }}
      >
        <HStack
          items='center'
          w='100%'
          css={{
            border: '1px solid rgba(152, 152, 255, 0.10)',
            borderTopLeftRadius: '$4',
            borderTopRightRadius: '$4',
            background:
              'radial-gradient(50% 100% at 50% 100%, rgba(128, 128, 255, 0.15) 0%, rgba(128, 128, 255, 0.05) 100%)',
          }}
        >
          <CustomTabsList>
            <CustomTabsTrigger
              _hover={{ background: '#9898FF26' }}
              css={{ borderTopLeftRadius: '$4' }}
              value='for-you'
            >
              For you
            </CustomTabsTrigger>
            <CustomTabsTrigger
              _hover={{ background: '#9898FF26' }}
              value='following'
            >
              Following
            </CustomTabsTrigger>
          </CustomTabsList>
          <HStack p={4}>
            <FeedFilterMenu current={filter} onClick={updateFilter} />
          </HStack>
        </HStack>
      </CustomTabsHeader>
      <CustomTabsContent
        value='for-you'
        minHeight='calc(100vh - 158px)'
        css={{
          borderRight: '1px solid rgba(152, 152, 255, 0.10)',
          borderLeft: '1px solid rgba(152, 152, 255, 0.10)',
          borderBottom: '1px solid rgba(152, 152, 255, 0.10)',
          borderBottomLeftRadius: '$4',
          borderBottomRightRadius: '$4',
        }}
      >
        <VStack minHeight={0} w='100%' p={3} as='aside' gap={4}>
          <CreatePost />
          <Feeds filter={filter} type='following' />
        </VStack>
      </CustomTabsContent>
      <CustomTabsContent
        value='following'
        minHeight='calc(100vh - 158px)'
        css={{
          borderRight: '1px solid rgba(152, 152, 255, 0.10)',
          borderLeft: '1px solid rgba(152, 152, 255, 0.10)',
          borderBottom: '1px solid rgba(152, 152, 255, 0.10)',
          borderBottomLeftRadius: '$4',
          borderBottomRightRadius: '$4',
        }}
      >
        <VStack w='100%' p={3} gap={4}>
          <CreatePost />
          <Feeds filter={filter} type='recommended' />
        </VStack>
      </CustomTabsContent>
    </CustomTabs>
  );
}
FeedTabs.displayName = 'FeedTabs';

export default FeedTabs;
