import { Box, Button, HStack, Text, VStack } from '@holdr-ui/react';
import {
  makePath,
  Paths,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  useNavigateWithPreviousLocation,
  usePreviousLocation,
} from '../../../../shared';
import { ChangeClubImage } from '../../setup-artist-profile/upload-photos/ui';
import {
  useClubContext,
  usePerksContext,
  useSuspenseGetArtist,
  useUpdatePerks,
} from '../../../../features';
import { SelectPredefinedPerks } from '../../setup-artist-profile/bio-and-perks/ui';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function AuctionDetailsPage() {
  const { slug } = useParams();

  const club = useClubContext();

  const { clubPerks } = usePerksContext();

  const { data: artistData } = useSuspenseGetArtist({ slug });

  const { updatePerks, loading } = useUpdatePerks();

  const previousLocation = usePreviousLocation(
    makePath([Paths.clubs, slug || '']),
  );

  const navigate = useNavigateWithPreviousLocation(previousLocation);

  const goBack = () => navigate(previousLocation);

  const [selectedPerks, setSelectedPerks] = useState<number[]>(
    clubPerks.map(({ id }) => id),
  );

  return (
    <VStack
      as='form'
      h='100%'
      onSubmit={async (e) => {
        e.preventDefault();

        await updatePerks(club.id, { perks: selectedPerks }).then(() =>
          navigate(
            makePath([
              Paths.clubs,
              slug || '',
              Paths.auction,
              Paths.create,
              Paths.reviewAuctionInfo,
            ]),
          ),
        );
      }}
    >
      <VStack
        overflowY='auto'
        pr={4}
        className='thin-scrollbar'
        gap={4}
        flex={1}
      >
        <VStack gap={4}>
          <TextGroup gap={0}>
            <TextGroupHeading as='h2' size={3} weight={500}>
              Live Bids
            </TextGroupHeading>
            <TextGroupSubheading size={1} color='white700'>
              Enter the information that will be displayed on your auction
              page
            </TextGroupSubheading>
          </TextGroup>

          <VStack gap={4}>
            <HStack color='white700' gap={1} items='center'>
              <Text weight={500} size={2} as='label'>
                Auction Card
              </Text>
            </HStack>
            <ChangeClubImage
              artistName={artistData.artist.name}
              placeholder={club.coverImage}
            />
          </VStack>
        </VStack>
        <VStack>
          <TextGroup gap={0} mb={4}>
            <TextGroupHeading as='h2' size={3} weight={500}>
              Membership Perks
            </TextGroupHeading>
            <TextGroupSubheading size={1} color='white700'>
              Select the perks that you will be offered to your fans
            </TextGroupSubheading>
          </TextGroup>

          {/** ⚠️ Disable when live auction is running*/}
          {selectedPerks.length < 3 && (
            <Box mb={4}>
              <Text size={1} color='danger200' weight={300}>
                Please select at least 3 perks
              </Text>
            </Box>
          )}

          <SelectPredefinedPerks
            values={selectedPerks}
            onChange={(next: number[]) => setSelectedPerks(next)}
          />

          {/** ⚠️ Disable when live auction is running*/}
          {/*<CustomMembershipPerks/>*/}
          {/*<HStack color='white700' gap={2} items='center'>*/}
          {/*  <Text weight={500} size={2} as='label'>*/}
          {/*    Custom Perks*/}
          {/*  </Text>*/}
          {/*  <InformationTooltip*/}
          {/*    side='right'*/}
          {/*    align='start'*/}
          {/*    container={*/}
          {/*      document.getElementById('page-dialog-container') ||*/}
          {/*      document.body*/}
          {/*    }*/}
          {/*    description='Info.'*/}
          {/*  />*/}
          {/*</HStack>*/}
        </VStack>
      </VStack>
      <HStack
        bgColor='#30304b'
        position='sticky'
        b={0}
        gap={2}
        justify='flex-end'
        py={4}
        pr='10px'
      >
        <Button
          disabled={loading}
          type='button'
          variant='ghost'
          radius={1}
          colorTheme='purple200'
          css={{ px: '28px' }}
          onClick={goBack}
        >
          Cancel
        </Button>
        <Button
          isLoading={loading}
          disabled={selectedPerks.length < 3 || !club.coverImage}
          type='submit'
          loadingText='Continue'
          radius={1}
          colorTheme='purple500'
          css={{ px: '28px' }}
        >
          Continue
        </Button>
      </HStack>
    </VStack>
  );
}
AuctionDetailsPage.displayName = 'AuctionDetailsPage';

export default AuctionDetailsPage;
