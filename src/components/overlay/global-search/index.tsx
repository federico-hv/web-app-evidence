import { useState } from 'react';
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
  VStack,
} from '@holdr-ui/react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { prefix } from 'utilities';
import { IUser, Paths } from 'shared';
import { FIND_USER } from 'lib';
import { Item } from './global-search.types';

/**
 * TODO:
 * 1. Add debounce
 * 2. Add search history
 * 3. Add mutation to store search values, and search events
 */

function GlobalSearch() {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [results, setResults] = useState<IUser[]>([]);
  const [history, setHistory] = useState<IUser[]>([]);

  const { data, loading, error } = useQuery<{ findUser: IUser[] }>(
    FIND_USER,
    {
      variables: {
        queryString: value,
      },
    },
  );

  if (error) {
    console.error(error);
  }

  const handleOnValueChange = (newValue: string) => {
    setValue(newValue);
    if (!loading && !error && data) {
      setResults(data.findUser);
    }
  };
  const renderItem = ({ item }: Item) => (
    <HStack gap={3} items='center' px={2} py={3}>
      {item.avatar ? (
        <Avatar src={item.avatar} name={item.displayName} />
      ) : (
        <Circle size={40} bgColor='base800' color='primary400'>
          <Icon name='search-outline' />
        </Circle>
      )}
      <VStack>
        <Text weight={500}>{item.displayName}</Text>
        <Text size={2} color='base400'>
          @{item.username}
        </Text>
      </VStack>
    </HStack>
  );
  const renderHistoryItem = ({ item }: Item) => (
    <HStack gap={3} items='center' px={2} py={3}>
      {item.avatar ? (
        <Avatar src={item.avatar} name={item.displayName} />
      ) : (
        <Circle size={40} bgColor='base800' color='primary400'>
          <Icon name='search-outline' />
        </Circle>
      )}
      <Text>{item.username}</Text>
    </HStack>
  );
  const keyExtractor = ({ item }: Item) => item.id;
  const onClickItem = ({ item }: Item, clearValue?: VoidFunction) => {
    // save the search text
    // save the user's event
    navigate(prefix('/', item.username));
    setValue('');
    clearValue && clearValue();
  };
  const onClickSearchItem = (searchText: string) => {
    navigate(prefix('/', `${Paths.discover}?q=${searchText}`));
  };

  return (
    <Box w='full'>
      <Spotlight>
        <Spotlight.Input
          value={value}
          onValueChange={handleOnValueChange}
        />
        <Spotlight.Content>
          <Spotlight.Header>
            {history.length === 0 && (
              <Center py={4}>
                <Text size={2} color='base400'>
                  No recent searches
                </Text>
              </Center>
            )}
            {history.length > 0 && (
              <HStack items='center' justify='space-between' px={2} py={4}>
                <Text>Recent Searches</Text>
                <Button
                  size='sm'
                  variant='ghost'
                  label='Clear All'
                  onClick={() => setHistory([])}
                />
              </HStack>
            )}
          </Spotlight.Header>
          {value.length > 0 && (
            <Spotlight.List
              data={results.length > 0 ? results : history}
              onClickItem={onClickItem}
              onClickSearchItem={onClickSearchItem}
              renderItem={
                results.length > 0 ? renderItem : renderHistoryItem
              }
              keyExtractor={keyExtractor}
            />
          )}
        </Spotlight.Content>
      </Spotlight>
    </Box>
  );
}
GlobalSearch.displayName = 'GlobalSearch';

export default GlobalSearch;
