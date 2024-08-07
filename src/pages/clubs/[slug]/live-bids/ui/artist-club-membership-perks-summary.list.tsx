import { Fragment } from 'react';
import { Circle, Heading, HStack, Text, VStack } from '@holdr-ui/react';
import { useGetClubPerks } from '../../../../../features';
import { InformationTooltip, Loader } from '../../../../../shared';
import { FlatList } from '../../../../../tmp/flat-list';

interface ArtistClubMembershipPerksSummaryListProps {
  clubId: string;
}

function ArtistClubMembershipPerksSummaryList({
  clubId,
}: ArtistClubMembershipPerksSummaryListProps) {
  const { loading, data, error } = useGetClubPerks(clubId);

  if (error) {
    return <Fragment />;
  }

  return (
    <Loader loading={loading}>
      {data && (
        <VStack h='100%' radius={1} gap={4} p={4} bgColor='#30304B'>
          <HStack items='center' justify='space-between'>
            <Heading size={4} weight={500} color='white500'>
              Membership Perks
            </Heading>

            <InformationTooltip
              size='lg'
              color='white700'
              sideOffset={0}
              side='bottom'
              align='end'
              description='Perks are subject to change.'
            />
          </HStack>
          <VStack>
            <FlatList
              direction='vertical'
              gap={3}
              data={data.clubPerks.perks.slice(0, 6)}
              renderItem={({ label }) => (
                <HStack items='center' gap={2}>
                  <Circle size='4px' bgColor='white500' />
                  <Text size='16px' weight={400} color='white600'>
                    {label}
                  </Text>
                </HStack>
              )}
              keyExtractor={({ id }, idx) => `perk-${id}-${idx}`}
            />
            {data.clubPerks.perks.length > 6 && (
              <Text color='white800' size={5}>
                ...
              </Text>
            )}
          </VStack>
        </VStack>
      )}
    </Loader>
  );
}

export default ArtistClubMembershipPerksSummaryList;
