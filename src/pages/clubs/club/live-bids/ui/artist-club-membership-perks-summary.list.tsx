import { Fragment } from 'react';
import {
  Heading,
  HStack,
  List,
  Stack,
  Text,
  UnorderedList,
  VStack,
} from '@holdr-ui/react';
import { IPerk, useGetClubPerks } from '../../../../../features';
import { InformationTooltip, Loader } from '../../../../../shared';

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
        <VStack radius={2} p={4} bgColor='#30304B' maxHeight={'235px'}>
          <HStack flex={1}>
            <Stack flex={10}>
              <Heading size={'18px'} weight={500} color='white500'>
                Membership Perks
              </Heading>
            </Stack>
            <Stack w={'24px'} h='24px' justify={'center'}>
              <InformationTooltip
                sideOffset={0}
                description='Perks are subject to change.'
              />
            </Stack>
          </HStack>
          <VStack flex={2} pt={4}>
            <UnorderedList>
              {data.clubPerks.map((perk: IPerk) => (
                <List.Item key={perk.id}>
                  <Text size={'16px'} weight={400} color={'white600'}>
                    {perk.label}
                  </Text>
                </List.Item>
              ))}
            </UnorderedList>
          </VStack>
        </VStack>
      )}
    </Loader>
  );
}

export default ArtistClubMembershipPerksSummaryList;
