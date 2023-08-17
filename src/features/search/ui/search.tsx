import { useState } from 'react';
import { Spotlight, Box } from '@holdr-ui/react';

import {
  prefix,
  IUser,
  Loader,
  SwitchConditional,
  SwitchConditionalCase,
  Paths,
} from '../../../shared';
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
    navigate({
      pathname: prefix('/', Paths.discover),
      search: `?q=${searchText}`,
    });
  };

  return (
    <Box w='full'>
      <Spotlight>
        <Spotlight.Input onValueChange={handleValueChange} />
        <Spotlight.Content isLoading={loading}>
          <Spotlight.Header>
            <Loader loading={historyLoading}>
              {history && <HistoryHeader history={history} />}
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
