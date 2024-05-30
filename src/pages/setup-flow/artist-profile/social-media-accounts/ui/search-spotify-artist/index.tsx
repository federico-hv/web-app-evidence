import {
  ISpotifySearchResult,
  useAddExternalAccount,
  useSpotifyArtistSearch,
  useSuspenseExternalAccount,
} from '../../../../../../features';
import {
  Box,
  CircularProgress,
  hexToRGB,
  Spotlight,
  useGeneralContext,
} from '@holdr-ui/react';
import { useEffect, useState } from 'react';
import { IOffsetPage } from '../../../../../../shared';
import { Item } from '../../index';
import { ISocialMediaAccountsViewContext } from '../../shared';
import SpotifyItem from '../spotify-item';
import ResultItem from './result-item';

function SearchSpotifyArtist() {
  const { data } = useSuspenseExternalAccount('Spotify');
  const { addExternalAccount } = useAddExternalAccount();

  const { update, state } =
    useGeneralContext<ISocialMediaAccountsViewContext>();

  const [value, setValue] = useState('');

  const [search, { result, loading, error }] =
    useSpotifyArtistSearch<IOffsetPage<ISpotifySearchResult>>();

  const handleValueChange = async (value: string) => {
    setValue(value);

    search(value);
  };

  const keyExtractor = ({ item }: Item) => item.id;

  const saveItem = async (item: ISpotifySearchResult) => {
    await addExternalAccount({
      externalId: item.id,
      provider: 'Spotify',
      url: item.url,
      username: item.name,
      avatar: item.images[0].url,
    }).then(() =>
      update({
        externalAccount: {
          id: -1,
          externalId: item.id,
          avatar: item.images[0].url,
          username: item.name,
          provider: 'Spotify',
          url: item.url,
        },
      }),
    );
  };

  useEffect(() => {
    if (data.externalAccount) {
      console.log('Updating external account');
      update({ externalAccount: data.externalAccount });
    }
  }, [data, update]);

  return (
    <Box zIndex={25}>
      {data.externalAccount ? (
        <SpotifyItem data={data.externalAccount} />
      ) : (
        <Spotlight
          showSearchIcon={false}
          pt={0}
          pb={0}
          border={1}
          borderColor='rgba(152, 152, 255, 0.35)'
          bgColor='rgba(152, 152, 255, 0.15)'
          radius={1}
          _active={{
            border: '1px solid rgba(152, 152, 255, 1)',
          }}
        >
          <Spotlight.Input
            node={
              document.getElementById('profile-setup-content') ||
              document.body
            }
            css={{ px: '.25rem' }}
            value={value}
            placeholderText='Search for Spotify account'
            onValueChange={handleValueChange}
            showClearButton={false}
            Loader={
              <CircularProgress
                bgColor='base400'
                colorTheme='white500'
                thickness={2}
                isIndeterminate
                size={20}
              />
            }
            isLoading={loading}
          />
          {result && (
            <Spotlight.Content
              border={result.data.length > 0 ? 1 : 0}
              borderColor={hexToRGB('#9898FF', 0.35)}
              bgColor='#404066'
              radius={1}
              maxHeight={300}
              overflowY='scroll'
              css={{
                boxShadow: '0px 4px 25px 0px #26263B',
              }}
            >
              {value.length > 0 && !error && !loading && (
                <Spotlight.List
                  data={result.data}
                  onClickItem={async ({ item }) => {
                    await saveItem(item);
                  }}
                  renderItem={({ item }: Item, isSelected) => (
                    <ResultItem isSelected={isSelected} data={item} />
                  )}
                  keyExtractor={keyExtractor}
                />
              )}
            </Spotlight.Content>
          )}
        </Spotlight>
      )}
    </Box>
  );
}
SearchSpotifyArtist.displayName = 'SearchSpotifyArtist';

export default SearchSpotifyArtist;
