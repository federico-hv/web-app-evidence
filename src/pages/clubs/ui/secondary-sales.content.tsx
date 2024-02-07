import { VStack } from '@holdr-ui/react';
import { FlatList } from '../../../tmp/flat-list';
import {
  MembershipSecondarySaleCard,
  OnSaleMembershipModel,
} from '../../../features';
import { shuffle } from 'lodash';
import { arrayFrom } from '../../../shared';
import { dummySecondarySaleMembershipData } from '../shared';

function SecondarySalesContent() {
  return (
    <VStack minHeight={0} w='100%' gap={4}>
      <VStack gap={6}>
        <VStack mt={32}>
          <FlatList<OnSaleMembershipModel>
            gap={4}
            css={{ flexWrap: 'wrap' }}
            data={shuffle(
              arrayFrom(12).map(() => dummySecondarySaleMembershipData),
            )}
            renderItem={(data) => (
              <MembershipSecondarySaleCard data={data} />
            )}
            keyExtractor={(_, idx) => idx}
          />
        </VStack>
      </VStack>
    </VStack>
  );
}
SecondarySalesContent.displayName = 'SecondarySalesContent';

export default SecondarySalesContent;
