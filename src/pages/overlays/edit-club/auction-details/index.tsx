import { Box, HStack, Text, VStack } from '@holdr-ui/react';
import {
  InformationTooltip,
  InputTextField,
  MaxFieldLength,
  TextareaField,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../../shared';
import { ChangeClubImage } from '../../setup-artist-profile/upload-photos/ui';

function EditArtistClubAuctionDetailsPage() {
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
          <ChangeClubImage />
        </VStack>

        <InputTextField
          name='url'
          tooltip='Something useful'
          label='Custom URL'
          placeholder='Enter custom URL'
        />
      </VStack>
      <VStack gap={2}>
        <TextGroup gap={0}>
          <TextGroupHeading as='h2' size={3} weight={500}>
            Membership Perks
          </TextGroupHeading>
          <TextGroupSubheading size={1} color='white700'>
            Select the perks that you will be offered to your fans
          </TextGroupSubheading>
        </TextGroup>

        {/** ⚠️ Disable when live auction is running*/}
        {/*<SelectPredefinedMembershipPerks />*/}

        {/** ⚠️ Disable when live auction is running*/}
        {/*<CustomMembershipPerks/>*/}
      </VStack>
    </VStack>
  );
}
EditArtistClubAuctionDetailsPage.displayName =
  'EditArtistClubAuctionDetailsPage';

export default EditArtistClubAuctionDetailsPage;
