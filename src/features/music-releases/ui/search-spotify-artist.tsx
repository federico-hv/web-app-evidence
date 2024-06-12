import { useSearchForSpotifyItem } from '../shared';
import { useState } from 'react';
import {
  Avatar,
  CircularProgress,
  hexToRGB,
  HStack,
  Spotlight,
  Text,
} from '@holdr-ui/react';

function SearchSpotifyArtist<T>() {
  const [value, setValue] = useState('');

  const [search, { result, loading, error }] =
    useSearchForSpotifyItem('artist');

  const handleValueChange = async (value: string) => {
    setValue(value);

    search(value);
  };

  return (
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
          document.getElementById('profile-setup-content') || document.body
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
                // handle clicking item
              }}
              renderItem={({ item }, isSelected) => (
                <HStack
                  items='center'
                  radius={1}
                  gap={2}
                  p={3}
                  bgColor={
                    isSelected ? hexToRGB('#1A1A29', 0.5) : 'transparent'
                  }
                  _hover={{
                    backgroundColor: hexToRGB('#1A1A29', 0.5),
                  }}
                >
                  <Avatar
                    src={
                      item.images.length > 1
                        ? item.images[0].url
                        : undefined
                    }
                    name={item.name}
                    variant='squircle'
                    css={{ size: '28px' }}
                  />
                  <Text>{item.name}</Text>
                </HStack>
              )}
              keyExtractor={({ item }) => item.id}
            />
          )}
        </Spotlight.Content>
      )}
    </Spotlight>
  );
}

export default SearchSpotifyArtist;
