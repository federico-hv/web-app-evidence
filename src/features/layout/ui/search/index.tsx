import { Fragment, useState } from 'react';
import {
  Button,
  Center,
  Circle,
  HStack,
  Icon,
  Spotlight,
  Text,
  Box,
  Avatar,
  Heading,
  CloseButton,
} from '@holdr-ui/react';

import {
  prefix,
  IUser,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  Loader,
  SwitchConditional,
  SwitchConditionalCase,
  LinkOverlay,
  IReturnMany,
  Paths,
} from '../../../../shared';
import { Item } from './type';
import {
  useRemoveSearchHistoryItem,
  useRemoveSearchHistoryItems,
  useSaveSearchHistory,
  useSearch,
  useSearchHistory,
} from '../../../search';
import { useNavigate } from 'react-router-dom';

function ResultItem({ data }: { data: IUser; display?: string[] }) {
  return (
    <HStack gap={3} items='center' py={3} px={2}>
      <LinkOverlay to={prefix('/', data.username)} />
      {data.avatar ? (
        <Avatar src={data.avatar} name={data.displayName} />
      ) : (
        <Circle size={40} bgColor='base800' color='primary400'>
          <Icon name='search-outline' />
        </Circle>
      )}
      <TextGroup gap={0}>
        <TextGroupHeading as='h5' size={3}>
          {data.displayName}
        </TextGroupHeading>
        <TextGroupSubheading size={2} color='base400'>
          @{data.username}
        </TextGroupSubheading>
      </TextGroup>
    </HStack>
  );
}

function HistoryItem({ data }: { data: IUser }) {
  const { remove } = useRemoveSearchHistoryItem<IUser>();

  return (
    <HStack
      position='relative'
      items='center'
      justify='space-between'
      px={2}
    >
      <LinkOverlay to={prefix('/', data.username)} />
      <HStack gap={3} items='center' py={3}>
        {data.avatar ? (
          <Avatar src={data.avatar} name={data.displayName} />
        ) : (
          <Circle size={40} bgColor='base800' color='primary400'>
            <Icon name='search-outline' />
          </Circle>
        )}
        <TextGroup gap={0}>
          <TextGroupHeading as='h5' size={3}>
            {data.displayName}
          </TextGroupHeading>
          <TextGroupSubheading size={2} color='base400'>
            @{data.username}
          </TextGroupSubheading>
        </TextGroup>
      </HStack>
      <Box position='relative' zIndex={10}>
        <CloseButton
          variant='ghost'
          onClick={async () => await remove(data.id)}
        />
      </Box>
    </HStack>
  );
}

function SpotlightHistoryHeader({
  history,
}: {
  history: IReturnMany<IUser>;
}) {
  const { removeAll } = useRemoveSearchHistoryItems();

  return (
    <Fragment>
      {history.count === 0 && (
        <Center py={4}>
          <Text size={2} color='base400'>
            No recent searches
          </Text>
        </Center>
      )}
      {history.count > 0 && (
        <HStack
          items='center'
          justify='space-between'
          px={2}
          pt={2}
          pb={4}
        >
          <Heading as='h3' size={4}>
            Recent
          </Heading>
          <Button
            onClick={() => removeAll()}
            size='sm'
            variant='ghost'
            label='Clear'
          />
        </HStack>
      )}
    </Fragment>
  );
}

function Search() {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  // get search history
  const { history, loading: historyLoading } = useSearchHistory<IUser>();

  const { save } = useSaveSearchHistory();

  // using a lazy query we can call whenever.
  const [search, { results, loading, error }] = useSearch<IUser>();
  const handleValueChange = async (newValue: string) => {
    setValue(newValue);

    search(newValue);
  };

  const keyExtractor = ({ item }: Item) => item.id;

  const onClickHistoryItem = ({ item }: Item) => {
    navigate(prefix('/', item.username));
  };

  const onClickResultItem = (
    { item }: Item,
    clearValue?: VoidFunction,
  ) => {
    setValue('');

    clearValue && clearValue();

    // might make this
    save(item.id, 'account').then(() =>
      navigate(prefix('/', item.username)),
    );
  };

  const onClickSearchItem = (searchText: string) => {
    navigate(prefix('/', `${Paths.discover}?q=${searchText}`));
  };

  return (
    <Box w='full'>
      <Spotlight>
        <Spotlight.Input onValueChange={handleValueChange} />
        <Spotlight.Content isLoading={loading}>
          <Spotlight.Header>
            <Loader loading={historyLoading}>
              {history && <SpotlightHistoryHeader history={history} />}
            </Loader>
          </Spotlight.Header>
          <SwitchConditional>
            <SwitchConditionalCase
              on={value.length > 0 && !error && !loading}
            >
              <Spotlight.List
                data={results}
                onClickItem={onClickResultItem}
                onClickSearchItem={onClickSearchItem}
                renderItem={({ item }: Item) => <ResultItem data={item} />}
                keyExtractor={keyExtractor}
              />
            </SwitchConditionalCase>
            <SwitchConditionalCase on={value.length === 0}>
              <Spotlight.List
                data={history.data}
                onClickItem={onClickHistoryItem}
                renderItem={({ item }: Item) => (
                  <HistoryItem data={item} />
                )}
                keyExtractor={keyExtractor}
              />
            </SwitchConditionalCase>
          </SwitchConditional>
        </Spotlight.Content>
      </Spotlight>
    </Box>
  );
}
Search.displayName = 'Search';

export default Search;
