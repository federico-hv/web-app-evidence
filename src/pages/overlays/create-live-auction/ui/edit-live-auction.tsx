import { Box, Button, HStack, Text, VStack } from '@holdr-ui/react';
import {
  InformationTooltip,
  InputTextField,
  makePath,
  Paths,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
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
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation, useOutletContext } from 'react-router-dom';
import { OutletContext } from '../../../../pages/overlays/create-live-auction/ui/create-live-auction-dialog';

function EditLiveAuction() {
  const {
    missingItems,
    setMissingItems,
    onDialogClose,
    onNextStep,
    acceptButtonText,
  } = useOutletContext<OutletContext>();
  const club = useClubContext();
  const { slug } = useParams();

  const { clubPerks } = usePerksContext();
  const location = useLocation();
  const isCreateAuctionDetails =
    location.pathname.includes('auction-details');

  const [additionalPerks, setAdditionalPerks] = useState([
    {
      name: '',
      claimLimit: '',
      description: '',
    },
  ]);

  const { data: artistData } = useSuspenseGetArtist({ slug });

  const navigate = useNavigate();

  const { updatePerks, loading } = useUpdatePerks();

  const previousLocation = usePreviousLocation(
    makePath([Paths.clubs, slug || '']),
  );

  const goBack = () => navigate(previousLocation);

  const [selectedPerks, setSelectedPerks] = useState<number[]>(
    clubPerks.map(({ id }) => id),
  );

  const addPerk = () => {
    const newPerk = {
      name: '',
      claimLimit: '',
      description: '',
    };

    setAdditionalPerks([...additionalPerks, newPerk]);
  };

  useEffect(() => {
    if (
      club.coverImage !== null &&
      club.coverImage !== '' &&
      selectedPerks.length >= 3
    ) {
      setMissingItems(false);
    } else {
      setMissingItems(true);
    }
  }, [club.coverImage, selectedPerks]);

  return (
    <VStack
      as='form'
      h='100%'
      onSubmit={async (e) => {
        e.preventDefault();

        console.log(selectedPerks);

        await updatePerks(club.id, { perks: selectedPerks }).then(() =>
          goBack(),
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
          {!isCreateAuctionDetails && (
            <InputTextField
              name='url'
              tooltip='Something useful'
              label='Custom URL'
              placeholder='Enter custom URL'
            />
          )}
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
          <Box bgColor='transparent' h='30px' my={4} />

          {isCreateAuctionDetails && (
            <HStack
              bgColor='#30304b'
              position='sticky'
              b='50px'
              gap={2}
              justify='flex-end'
              py={4}
              pr='10px'
            >
              <Box h={'80px'}>
                <HStack items={'center'} justify={'flex-end'}>
                  <VStack
                    justify='center'
                    items='center'
                    py='14px'
                    px='28px'
                  >
                    <Text
                      color='white700'
                      size='14px'
                      weight={500}
                      css={{ textDecoration: 'underline' }}
                      onClick={onDialogClose}
                    >
                      Cancel
                    </Text>
                  </VStack>
                  <Button
                    disabled={missingItems}
                    radius={1}
                    colorTheme='purple500'
                    css={{
                      padding: '14px 28px',
                    }}
                    onClick={onNextStep}
                  >
                    <Text size='14px' weight={500}>
                      {acceptButtonText}
                    </Text>
                  </Button>
                </HStack>
              </Box>
            </HStack>
          )}
        </VStack>
      </VStack>
    </VStack>
  );
}
EditLiveAuction.displayName = 'EditLiveAuction';

export default EditLiveAuction;
