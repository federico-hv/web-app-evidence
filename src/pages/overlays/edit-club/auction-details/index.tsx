import { Box, HStack, Text, VStack } from '@holdr-ui/react';
import {
  InformationTooltip,
  InputTextField,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../../shared';
import { ChangeClubImage } from '../../setup-artist-profile/upload-photos/ui';
import { useClubContext, usePerksContext } from '../../../../features';
import { SelectPredefinedPerks } from '../../setup-artist-profile/bio-and-perks/ui';
import { useState } from 'react';

function EditArtistClubAuctionDetailsPage() {
  const club = useClubContext();
  const { clubPerks } = usePerksContext();

  const [selectedPerks, setSelectedPerks] = useState<number[]>(
    clubPerks.map(({ id }) => id),
  );

  return (
    <VStack
      as='form'
      gap={8}
      h='100%'
      overflowY='auto'
      pr={4}
      className='thin-scrollbar'
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
            <InformationTooltip
              side='right'
              align='start'
              container={
                document.getElementById('page-dialog-container') ||
                document.body
              }
              description='Something useful.'
            />
          </HStack>
          {/** ⚠️ Disable when live auction is running*/}
          <ChangeClubImage placeholder={club.coverImage} />
        </VStack>

        <InputTextField
          name='url'
          tooltip='Something useful'
          label='Custom URL'
          placeholder='Enter custom URL'
        />
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

        <Box bgColor='rgba(152, 152, 255, 0.20)' h='1px' my={4} />

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
  );
}
EditArtistClubAuctionDetailsPage.displayName =
  'EditArtistClubAuctionDetailsPage';

export default EditArtistClubAuctionDetailsPage;
