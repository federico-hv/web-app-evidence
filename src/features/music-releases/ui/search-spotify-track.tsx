import { ISpotifyTrackResponse, useSearchForSpotifyItem } from '../shared';
import { useState } from 'react';
import {
  CircularProgress,
  hexToRGB,
  HStack,
  Image,
  Spotlight,
  Text,
  VStack,
} from '@holdr-ui/react';

function SearchSpotifyArtist({
  onSelect,
}: {
  onSelect: (
    item: ISpotifyTrackResponse,
    clearValue?: VoidFunction,
  ) => void;
}) {
  const [value, setValue] = useState('');

  const [search, { result, loading, error }] =
    useSearchForSpotifyItem('track');

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
        placeholderText='Search for track on Spotify'
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
          maxHeight={360}
          overflowY='scroll'
          css={{
            boxShadow: '0px 4px 25px 0px #26263B',
          }}
        >
          {value.length > 0 && !error && !loading && (
            <Spotlight.List
              data={result.data}
              onClickItem={({ item }, clearValue) =>
                onSelect(item, clearValue)
              }
              renderItem={({ item }, isSelected) => (
                <HStack
                  items='center'
                  radius={isSelected ? 0 : 1}
                  gap={2}
                  p={3}
                  bgColor={
                    isSelected ? hexToRGB('#1A1A29', 0.5) : 'transparent'
                  }
                  _hover={{
                    backgroundColor: hexToRGB('#1A1A29', 0.5),
                    borderRadius: 0,
                  }}
                >
                  <Image
                    radius={1}
                    src={
                      item.images.length > 1
                        ? item.images[0].url
                        : undefined
                    }
                    css={{ size: '30px' }}
                  />
                  <VStack gap={0}>
                    <Text>{item.name}</Text>
                    <Text size={1} color='white700'>
                      {item.artists.join(', ')}
                    </Text>
                  </VStack>
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
