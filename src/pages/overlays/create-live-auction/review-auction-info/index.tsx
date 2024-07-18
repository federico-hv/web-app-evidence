import { Box, HStack, Text, VStack, hexToRGB } from '@holdr-ui/react';
import {
  InformationTooltip,
  InputTextField,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../../shared';
import { ChangeClubImage } from '../../setup-artist-profile/upload-photos/ui';
import {
  IPerk,
  useClubContext,
  usePerksContext,
} from '../../../../features';
import { SelectPredefinedPerks } from '../../setup-artist-profile/bio-and-perks/ui';
import { useState } from 'react';
import { FlatList } from '../../../../tmp/flat-list';
import { perksData } from '../../../clubs/[slug]/membership-perks';
import {
  NewAuctionButtonContainer,
  OutletContext,
} from '../ui/create-live-auction-dialog';
import { useOutletContext } from 'react-router-dom';

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
      <HStack p={'8px'} gap={2} items={'center'}>
        <Text size={'14px'} weight={500} color='white600'>
          {`${order}.`}
        </Text>
        <Text size={'14px'} weight={500} color='white50'>
          {data.label}
        </Text>
        <Text size={'12px'} weight={300} color='white600'>
          {data.additionalInfo}
        </Text>
      </HStack>
      <Box bg='purpleTint400' h='1px' />
      <VStack p='12px' minHeight={'76px'}>
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

function ReviewAuctionInfo() {
  const { onDialogClose, onNextStep, acceptButtonText } =
    useOutletContext<OutletContext>();
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
      position='relative'
    >
      <VStack gap={4}>
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
      </VStack>
      {/* <VStack>
        <HStack color='white700' gap={1} items='center'>
          <Text weight={500} size={2} as='label'>
            Custom URL
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
        <VStack py={2}>
          <Text>holdrsclub.com/clubs/jadelightning</Text>
        </VStack>
      </VStack> */}
      <VStack>
        <TextGroup gap={0} mb={4}>
          <TextGroupHeading as='h2' size={3} weight={500}>
            Membership Perks
          </TextGroupHeading>
          {/* <TextGroupSubheading size={1} color='white700'>
            Select the perks that you will be offered to your fans
          </TextGroupSubheading> */}
        </TextGroup>

        <VStack>
          <FlatList
            gap={2}
            direction='vertical'
            data={perksData}
            renderItem={(item, index) => (
              <AuctionPerkItem order={index + 1} data={item} />
            )}
            keyExtractor={(item) => item.id}
          />
        </VStack>

        {/** ⚠️ Disable when live auction is running*/}
        {/* {selectedPerks.length < 3 && (
          <Box mb={4}>
            <Text size={1} color='danger200' weight={300}>
              Please select at least 3 perks
            </Text>
          </Box>
        )} */}

        {/* <SelectPredefinedPerks
          values={selectedPerks}
          onChange={(next: number[]) => setSelectedPerks(next)}
        /> */}

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
      <HStack
        bgColor='#30304b'
        position='sticky'
        b='50px'
        gap={2}
        justify='flex-end'
        py={4}
        pr='10px'
      >
        <NewAuctionButtonContainer
          onDialogClose={onDialogClose}
          onNextStep={onNextStep}
          acceptButtonDisabled={false}
          acceptButtonText={acceptButtonText}
        />
      </HStack>
    </VStack>
  );
}
ReviewAuctionInfo.displayName = 'ReviewAuctionInfo';

export default ReviewAuctionInfo;
