import { ISpotifySearchResult } from '../../../../../../features';
import { Avatar, hexToRGB, HStack, Text } from '@holdr-ui/react';

function ResultItem({
  data,
  isSelected,
  onClick,
}: {
  data: ISpotifySearchResult;
  isSelected?: boolean;
  onClick?: VoidFunction;
}) {
  return (
    <HStack
      onClick={onClick}
      items='center'
      radius={1}
      gap={2}
      p={3}
      bgColor={isSelected ? hexToRGB('#1A1A29', 0.5) : 'transparent'}
      _hover={{
        backgroundColor: hexToRGB('#1A1A29', 0.5),
      }}
    >
      <Avatar
        src={data.images.length > 1 ? data.images[0].url : undefined}
        name={data.name}
        variant='squircle'
        css={{ size: '28px' }}
      />
      <Text>{data.name}</Text>
    </HStack>
  );
}
ResultItem.displayName = 'ResultItem';

export default ResultItem;
