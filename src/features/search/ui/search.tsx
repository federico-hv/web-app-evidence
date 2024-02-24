import { useState } from 'react';
import { Spotlight, Box } from '@holdr-ui/react';
import { prefix, UserModel, Loader, Paths } from '../../../shared';
import { Item } from './type';
import {
  useSaveSearchHistory,
  useSearch,
  useSearchHistory,
} from '../index';
import { useNavigate } from 'react-router-dom';
import HistoryItem from './history-item';
import ResultItem from './result-item';
import HistoryHeader from './history-header';

function Search() {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  // get ui history
  const { history, loading: historyLoading } =
    useSearchHistory<UserModel>();

  const { save } = useSaveSearchHistory();

  // using a lazy query we can call whenever.
  const [search, { results, loading, error }] = useSearch<UserModel>();
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
    navigate({
      pathname: prefix('/', Paths.discover),
      search: `?q=${searchText}`,
    });
  };

  return (
    <Box
      w='full'
      css={{
        '@bp1': {
          fontSize: '$2 !important',
          'input, input::placeholder': {
            fontSize: '$2 !important',
          },
          '& #results:last-child': {
            fontSize: '$2 !important',
          },
        },
        '@bp3': {
          fontSize: '$3 !important',
          'input, input::placeholder': {
            fontSize: '$3 !important',
          },
          '& #results:last-child': {
            fontSize: '$3 !important',
          },
        },
      }}
    >
      <Spotlight theme='dark'>
        <Spotlight.Input onValueChange={handleValueChange} />
        <Spotlight.Content
          isLoading={loading}
          css={{
            backgroundColor: 'rgba(49, 49, 73, 0.75)',
            backdropFilter: 'blur(50px)',
          }}
        >
          <Spotlight.Header>
            <Loader loading={historyLoading}>
              {history && <HistoryHeader history={history} />}
            </Loader>
          </Spotlight.Header>
          {value.length > 0 && !error && !loading && (
            <Spotlight.List
              data={results}
              onClickItem={onClickResultItem}
              onClickSearchItem={onClickSearchItem}
              renderItem={({ item }: Item, isSelected) => (
                <ResultItem isSelected={isSelected} data={item} />
              )}
              keyExtractor={keyExtractor}
            />
          )}
          {value.length === 0 && (
            <Spotlight.List
              data={history.data}
              onClickItem={onClickHistoryItem}
              renderItem={({ item }: Item, isSelected) => (
                <HistoryItem isSelected={isSelected} data={item} />
              )}
              keyExtractor={keyExtractor}
            />
          )}
        </Spotlight.Content>
      </Spotlight>
    </Box>
  );
}
Search.displayName = 'Search';

export default Search;
