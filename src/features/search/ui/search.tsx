import { useRef, useState } from 'react';
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
  const ref = useRef<HTMLDivElement>();

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
    navigate(
      prefix(item.role === 'artist' ? '/clubs/' : '/', item.username),
    );
  };

  const onClickResultItem = (
    { item }: Item,
    clearValue?: VoidFunction,
  ) => {
    setValue('');

    clearValue && clearValue();

    if (ref && ref.current) ref.current.focus();

    // might make this
    save(item.id, 'account').then(() =>
      navigate(
        prefix(item.role === 'artist' ? '/clubs/' : '/', item.username),
      ),
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
      innerRef={ref}
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
      <Spotlight
        px={3}
        border={0}
        bgColor='black400'
        color='white800'
        radius='full'
        css={{ opacity: 0.5 }}
        _active={{
          opacity: 1,
          backgroundColor: 'transparent',
          borderWidth: '1px',
          borderColor: '$black400',
          color: '$white500',
        }}
      >
        <Spotlight.Input
          onValueChange={handleValueChange}
          clearButtonStyles={{ colorTheme: 'white500' }}
        />
        <Spotlight.Content
          p={results.length || history.data.length > 0 ? 2 : 0}
          isLoading={loading}
          bgColor='rgba(49, 49, 73, 0.75)'
          blur='xl'
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
