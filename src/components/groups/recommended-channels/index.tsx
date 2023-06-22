import { Box } from '@holdr-ui/react';
import { GenericItem, StringNumeric } from 'shared';
import AsideCard from '../../card/aside';

type Channel = { id: string; name: string };

function RecommendedChannels() {
  const channels: Channel[] = [];
  const keyExtractor = (item: GenericItem) => item.id;
  const renderItem = (item: Channel, id: StringNumeric) => (
    <Box>{item.name}</Box>
  );

  return (
    <AsideCard
      title='Recommended Channels'
      data={channels}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      path='/channels'
    />
  );
}
RecommendedChannels.displayName = 'RecommendedChannels';

export default RecommendedChannels;
