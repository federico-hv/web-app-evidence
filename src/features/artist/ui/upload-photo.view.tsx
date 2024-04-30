import { useCurrentUser } from '../../auth';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LiveTag,
  makePath,
  Paths,
  prefix,
  Squircle,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../shared';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
} from '@holdr-ui/react';

function UploadPhotoView() {
  const user = useCurrentUser();

  const navigate = useNavigate();

  const location = useLocation();

  const onClose = () => {
    const previousLocation = location.state?.previousLocation;

    navigate(previousLocation || prefix('/', user ? user.username : ''));
  };

  return (
    <VStack gap={9} pl={2} h='100%'>
      <VStack gap={4}>
        <TextGroup gap={0}>
          <TextGroupHeading size={4}>Profile</TextGroupHeading>
          <TextGroupSubheading size={1} color='white700'>
            Add an image for your profile photo
          </TextGroupSubheading>
        </TextGroup>
        <Box w='fit-content' h='fit-content' position='relative'>
          <Squircle size={75} />
          <Center position='absolute' t={0} l={0} w='100%' h='100%'>
            <Center p={1} bgColor='purple900' radius='full'>
              <Icon color='white500' name='add' />
            </Center>
          </Center>
        </Box>
      </VStack>
      <VStack gap={4}>
        <TextGroup gap={0}>
          <TextGroupHeading size={4}>Auction Card</TextGroupHeading>
          <TextGroupSubheading size={1} color='white700'>
            Add an image that will be visible for your fans on the Clubs
            page
          </TextGroupSubheading>
        </TextGroup>
        <Card
          radius={2}
          w={205}
          css={{ border: '1px solid rgba(152, 152, 255, 0.15)' }}
        >
          <CardBody
            position='relative'
            p={2}
            h={182}
            bgColor='rgba(152, 152, 255, 0.15)'
          >
            <HStack items='center' justify='space-between'>
              <LiveTag />
              <IconButton
                size='sm'
                colorTheme='darkTint500'
                icon='eye-show'
                ariaLabel='add to watchlist'
              />
              <Center position='absolute' t={0} l={0} w='100%' h='100%'>
                <Center p={1} bgColor='purple900' radius='full'>
                  <Icon color='white500' name='add' />
                </Center>
              </Center>
            </HStack>
          </CardBody>
          <CardFooter p={3} gap={2}>
            <Text>Artist name</Text>
            <TextGroup gap={0}>
              <TextGroupSubheading casing='uppercase' size={1}>
                Entry price
              </TextGroupSubheading>
              <TextGroupSubheading size={3} weight={500}>
                $0.00 USD
              </TextGroupSubheading>
            </TextGroup>
          </CardFooter>
        </Card>
      </VStack>
      <VStack gap={4}>
        <TextGroup gap={0}>
          <TextGroupHeading size={4}>Banner</TextGroupHeading>
          <TextGroupSubheading size={1} color='white700'>
            Add a banner image that willy be displayed on your member’s
            page
          </TextGroupSubheading>
        </TextGroup>
        <Box w='full' h={32}>
          <Center
            px={112}
            py={64}
            position='relative'
            radius={2}
            bgColor='rgba(152, 152, 255, 0.15)'
            css={{ border: '1px solid rgba(152, 152, 255, 0.15)' }}
          >
            <Center position='absolute' t={0} l={0} w='100%' h='100%'>
              <Center p={1} bgColor='purple900' radius='full'>
                <Icon color='white500' name='add' />
              </Center>
            </Center>
          </Center>
        </Box>
      </VStack>
      <HStack
        justify='flex-end'
        position='absolute'
        b='1.5rem'
        l='3rem'
        r='3rem'
        bgColor='#30304B'
        gap={3}
      >
        <Button
          onClick={onClose}
          variant='outline'
          radius={1}
          colorTheme='purple200'
          css={{ px: '40px' }}
        >
          Cancel
        </Button>
        <Button
          onClick={() =>
            navigate(
              makePath([
                Paths.setupProfile,
                Paths.artist,
                Paths.setupArtist.aboutMeAndPerks,
              ]),
            )
          }
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
UploadPhotoView.displayName = 'UploadPhotoView';

export default UploadPhotoView;
