import {
  Button,
  Center,
  Circle,
  HStack,
  Icon,
  Spotlight,
  Text,
  Box,
} from '@holdr-ui/react';
import { useState } from 'react';
import { prefix } from '../../../utilities';
import { Paths } from '../../../shared';
import { useNavigate } from 'react-router-dom';

type Item = { item: string; index: number };

const filterFn = (value: string, data: string[]) => {
  return data.filter((item) => {
    if (!value.length) return false;
    return !!item.match(value);
  });
};

function GlobalSearch() {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);

  const handleOnValueChange = (newValue: string) => {
    setValue(newValue);
    setResults(filterFn(newValue, []));
  };
  const renderItem = ({ item }: Item) => (
    <HStack gap={3} items='center' px={2} py={3}>
      <Circle size={30} bgColor='base800' color='primary400'>
        <Icon name='search-outline' />
      </Circle>
      <Text>{item}</Text>
    </HStack>
  );
  const renderHistoryItem = ({ item }: Item) => (
    <HStack gap={3} items='center' px={2} py={3}>
      <Circle size={30} bgColor='base800' color='primary400'>
        <Icon name='search-outline' />
      </Circle>
      <Text css={{ flex: 1 }}>{item}</Text>
      <Center>
        <Icon name='close' size='lg' />
      </Center>
    </HStack>
  );
  const keyExtractor = ({ item }: Item) => `${item}`;
  const onClickItem = ({ item }: Item) => {
    setHistory((prev) => {
      const idx = prev.findIndex((current) => current === item);
      if (idx < 0) return [item, ...prev];
      return prev;
    });
  };
  const onClickSearchItem = (searchText: string) => {
    navigate(prefix('/', `${Paths.discover}?q=${searchText}`));
  };

  return (
    <Box
      w='full'
      css={{
        '& label': {
          boxSizing: 'border-box',
        },
      }}
    >
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
          <Spotlight.List
            data={results.length > 0 ? results : history}
            onClickItem={onClickItem}
            onClickSearchItem={onClickSearchItem}
            renderItem={
              results.length > 0 ? renderItem : renderHistoryItem
            }
            keyExtractor={keyExtractor}
          />
        </Spotlight.Content>
      </Spotlight>
    </Box>
  );
}
GlobalSearch.displayName = 'GlobalSearch';

export default GlobalSearch;
