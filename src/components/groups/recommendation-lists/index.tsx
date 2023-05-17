import { StackDivider, VStack } from '@holdr-ui/react';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts';
import RecommendedArtists from '../recommended-artists';
import RecommendedChannels from '../recommended-channels';

function RecommendationListsGroup() {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      {currentUser && (
        <VStack divider={<StackDivider />} gap={4}>
          <RecommendedArtists />
          <RecommendedChannels />
        </VStack>
      )}
    </>
  );
}
RecommendationListsGroup.displayName = 'RecommendationListsGroup';

export default RecommendationListsGroup;
