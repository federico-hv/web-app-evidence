import {
  arrayFrom,
  Asset,
  CommonDialog,
  CommonDialogActionButton,
  CommonDialogContent,
  CommonDialogHeader,
  InfoItem,
  StepperIndicator,
  StepperIndicatorStep,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  useCounter,
} from '../../../shared';
import {
  Circle,
  Image,
  HStack,
  Text,
  useDisclosure,
  VStack,
  Box,
  Avatar,
  Grid,
  Checkbox,
  useSwitch,
} from '@holdr-ui/react';
import {
  ConnectedAccountUtility,
  ConnectorProvider,
} from '../../../features';
import { Fragment } from 'react';

function ConnectButton({ provider }: { provider: ConnectorProvider }) {
  const providerItem = ConnectedAccountUtility.getProviderItem(provider);

  if (!providerItem) {
    return <Fragment />;
  }

  return (
    <HStack
      cursor='pointer'
      px={6}
      h={48}
      items='center'
      justify='space-between'
      border={2}
      borderColor='base100'
      radius='full'
      _hover={{ backgroundColor: '$base100' }}
    >
      <Circle size={20}>
        <Image src={providerItem.image} alt='spotify logo' />
      </Circle>
      <Text weight={500}>Connect {providerItem.name}</Text>
      <Box />
    </HStack>
  );
}

function ConnectionStep() {
  return (
    <VStack gap={7} justify='space-between' h='100%'>
      <TextGroup>
        <TextGroupHeading casing='capitalize'>
          Connect Music Service
        </TextGroupHeading>
        <TextGroupSubheading size={2}>
          Connect the music streaming services that you want to allow Holdr
          access. You can connect multiple streaming services to allow
          Holdr to get a full range of info about your favourite artists.
        </TextGroupSubheading>
      </TextGroup>

      <VStack gap={4} px={5}>
        <ConnectButton provider='spotify' />
        <ConnectButton provider='apple music' />
      </VStack>

      <Box />
    </VStack>
  );
}

function GetStartedStep() {
  return (
    <VStack gap={6}>
      <TextGroup>
        <TextGroupHeading casing='capitalize'>
          Get Started
        </TextGroupHeading>

        <TextGroupSubheading size={2}>
          Unlock the full potential of our releases feature. Check out some
          of the benefits that you get when you connect your music
          streaming service.
        </TextGroupSubheading>
      </TextGroup>
      <VStack gap={5}>
        <InfoItem
          imageSrc={Asset.Icon.SaveToLibrary}
          imageAltText='save to library logo'
          title='Save to library'
          description='Save the releases that you like into your streaming service library directly
          from Holdr.'
        />
        <InfoItem
          imageSrc={Asset.Icon.Notification}
          imageAltText='new artist logo'
          title='New artist notifications'
          description='We will notify you whenever one of your favorite artists from your streaming services joins Holdr.'
        />
        <InfoItem
          imageSrc={Asset.Icon.UserAdd}
          imageAltText='tastemakers logo'
          title='Tastemakers'
          description='Showcase your favourite playlists and connect with other like-minded fans.'
        />
      </VStack>
    </VStack>
  );
}

function ArtistOption() {
  const { switchState, toggle } = useSwitch();

  // TODO: Make checkmark invisible when not checked.
  return (
    <VStack
      as='label'
      position='relative'
      items='center'
      gap={2}
      w='fit-content'
      onClick={toggle}
    >
      <Box
        position='absolute'
        t={0}
        r={0}
        zIndex={10}
        css={{
          opacity: switchState ? 1 : 0,
        }}
      >
        <Checkbox
          size='sm'
          colorTheme='success'
          labelledBy='artist-name'
        />
      </Box>
      <Box position='relative' zIndex={1}>
        <Avatar variant='squircle' />
      </Box>
      <TextGroup items='center' gap={0}>
        <TextGroupSubheading weight={500} size={2}>
          Artist Name
        </TextGroupSubheading>
        <TextGroupSubheading weight={500} size={2} color='base400'>
          @username
        </TextGroupSubheading>
      </TextGroup>
    </VStack>
  );
}

function ArtistSelectionStep() {
  return (
    <VStack gap={4}>
      <TextGroup>
        <TextGroupHeading casing='capitalize'>
          Select Artists
        </TextGroupHeading>
        <TextGroupSubheading size={2}>
          Here are artists that we found in your library you do not follow
          on Holdr.
        </TextGroupSubheading>
      </TextGroup>
      <Grid templateColumns={'repeat(4, 1fr)'}>
        {arrayFrom(4).map((idx) => (
          <Grid.Item key={idx}>
            <ArtistOption />
          </Grid.Item>
        ))}
      </Grid>
    </VStack>
  );
}

function UnconnectedDialog({ isOpen }: { isOpen: boolean }) {
  const { count: step, increment: nextStep } = useCounter(0);
  const disclosure = useDisclosure(isOpen);
  return (
    <CommonDialog minHeight={600} {...disclosure}>
      <CommonDialogHeader label='' />
      <CommonDialogContent>
        <VStack py={4} px={6} h='100%' justify='space-between'>
          {step === 0 && <GetStartedStep />}
          {step === 1 && <ConnectionStep />}
          {step === 2 && <ArtistSelectionStep />}
          <StepperIndicator current={step}>
            {arrayFrom(2).map((idx) => (
              <StepperIndicatorStep key={idx} />
            ))}
          </StepperIndicator>
        </VStack>
      </CommonDialogContent>
      {step < 2 && (
        <CommonDialogActionButton
          // disabled={step === 1}
          label='Continue'
          onClick={nextStep}
        />
      )}
      {step === 2 && (
        <CommonDialogActionButton
          disabled={true}
          label='Finish'
          onClick={disclosure.onClose}
        />
      )}
    </CommonDialog>
  );
}
UnconnectedDialog.displayName = 'UnconnectedDialog';

export default UnconnectedDialog;
