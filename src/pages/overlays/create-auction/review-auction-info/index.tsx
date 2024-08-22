import {
  Box,
  Button,
  HStack,
  Text,
  VStack,
  hexToRGB,
} from '@holdr-ui/react';
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
  IPerk,
  useClubContext,
  useGetAuctionSuspenseQuery,
  useSuspenseGetArtist,
  useSuspenseGetClubPerks,
} from '../../../../features';
import { FlatList } from '../../../../tmp/flat-list';
import { Navigate, useParams } from 'react-router-dom';

function AuctionPerkItem({
  order,
  data,
}: {
  data: IPerk & { additionalInfo?: string };
  order: number;
}) {
  return (
    <VStack
      bg={'purpleTint400'}
      radius={1}
      border={1}
      borderColor={hexToRGB('#9898FF', 0.35)}
    >
      <HStack p={1} gap={2} items={'center'}>
        <Text size={'14px'} weight={500} color='white600'>
          {`${order}.`}
        </Text>
        <Text size={2} weight={500} color='white50'>
          {data.label}
        </Text>
        <Text size={2} weight={300} color='white600'>
          {data.additionalInfo}
        </Text>
      </HStack>
      <Box bg='purpleTint400' h='1px' />
      <VStack p={2}>
        <Text
          size={'14px'}
          weight={400}
          color='white700'
          css={{ lineHeight: '115%' }}
        >
          {data.description}
        </Text>
      </VStack>
    </VStack>
  );
}

function CreateAuctionReviewAuctionInfoPage() {
  const { slug } = useParams();

  const club = useClubContext();

  const previousLocation = usePreviousLocation(
    makePath([Paths.clubs, slug || '']),
  );

  const navigate = useNavigateWithPreviousLocation(previousLocation);

  const { data: artistData } = useSuspenseGetArtist({ slug });

  const { data: auctionData } = useGetAuctionSuspenseQuery(club.id);

  const { data: perksData } = useSuspenseGetClubPerks(club.id);

  if (auctionData && auctionData.auction) {
    return (
      <Navigate
        to={makePath([
          Paths.clubs,
          slug || '',
          Paths.auction,
          Paths.create,
          Paths.auctionDetails,
        ])}
        replace
      />
    );
  }

  return (
    <VStack
      as='form'
      h='100%'
      onSubmit={async (e) => {
        e.preventDefault();

        navigate(
          makePath([
            Paths.clubs,
            slug || '',
            Paths.auction,
            Paths.create,
            Paths.confirmAuction,
          ]),
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
              Review information
            </TextGroupHeading>
            <TextGroupSubheading size={1} color='white700'>
              Review your auction details before initiating it
            </TextGroupSubheading>
          </TextGroup>

          <VStack gap={4}>
            <HStack color='white700' gap={1} items='center'>
              <Text weight={500} size={2} as='label'>
                Auction Card
              </Text>
            </HStack>
            <ChangeClubImage
              disabled
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

          <FlatList
            gap={2}
            direction='vertical'
            data={perksData.clubPerks.perks}
            renderItem={(item, index) => (
              <AuctionPerkItem order={index + 1} data={item} />
            )}
            keyExtractor={(item) => item.id}
          />
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
          onClick={() => {
            navigate(
              makePath([
                Paths.clubs,
                slug || '',
                Paths.auction,
                Paths.create,
                Paths.auctionDetails,
              ]),
            );
          }}
          type='button'
          variant='ghost'
          radius={1}
          colorTheme='purple200'
          css={{ px: '28px' }}
        >
          Back
        </Button>
        <Button
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
CreateAuctionReviewAuctionInfoPage.displayName =
  'CreateAuctionReviewAuctionInfoPage';

export default CreateAuctionReviewAuctionInfoPage;
