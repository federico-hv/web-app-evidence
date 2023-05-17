import { Box } from '@holdr-ui/react';
import { GenericItem, StringNumeric } from 'shared';
import AsideCard from '../../cards/aside';

type Artist = { id: string; displayName: string };

function RecommendedArtists() {
  const artists: Artist[] = [];
  const keyExtractor = (item: GenericItem) => item.id;
  const renderItem = (item: Artist, id: StringNumeric) => (
    <Box>{item.displayName}</Box>
  );

  return (
    <AsideCard
      title='Recommended Artists'
      data={artists}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      path='/artists'
    />
  );
}
RecommendedArtists.displayName = 'RecommendedArtists';

export default RecommendedArtists;
