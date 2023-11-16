import {
  arrayFrom,
  Asset,
  CommonDialog,
  CommonDialogActionButton,
  CommonDialogContent,
  CommonDialogHeader,
  GeneralContextProvider,
  hexToRGB,
  InfoItem,
  StepperIndicator,
  StepperIndicatorStep,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  useCounter,
  useGeneralContext,
  useRecordState,
} from '../../../shared';
import {
  HStack,
  Text,
  VStack,
  Box,
  Avatar,
  Grid,
  Checkbox,
  Center,
} from '@holdr-ui/react';
import { DialogProps } from '@holdr-ui/react/dist/compositions/dialog/src/dialog.types';
import { useEffect, useState } from 'react';
import ConnectButton from './connect.button';
import { SpotifyUtility } from '../shared/utility/spotify.utility';

function SpotifyButton() {
  return (
    <ConnectButton
      provider='spotify'
      onClick={SpotifyUtility.requestCode}
    />
  );
}

function AppleMusicButton() {
  return (
    <ConnectButton
      provider='apple music'
      onClick={() => console.log('apple music')}
    />
  );
}

function ConnectionStep() {
  const connected = [''];

  const isConnected = (name: string) =>
    connected.findIndex(
      (_name) => _name.toLowerCase() === name.toLowerCase(),
    ) > -1;

  return (
    <VStack gap={7} justify='space-between' h='100%'>
      <TextGroup mt={3}>
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
        {!isConnected('spotify') && <SpotifyButton />}
        {!isConnected('apple music') && <AppleMusicButton />}
      </VStack>

      <Box />
    </VStack>
  );
}

function GetStartedStep() {
  return (
    <VStack gap={6}>
      <TextGroup mt={3}>
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

function ArtistOption({
  id,
  name,
}: {
  id: string;

  name: string;
}) {
  const { update, state } = useGeneralContext<IUnconnectedDialogContext>();

  const [visible, setVisible] = useState(
    state.ids.findIndex((_id) => _id === id) >= 0,
  );

  useEffect(() => {
    setVisible(state.ids.findIndex((_id) => _id === id) >= 0);
  }, [id, state]);

  return (
    <VStack
      as='label'
      position='relative'
      items='center'
      justify='center'
      gap={1}
      w='fit-content'
      maxWidth='100px'
      onClick={(e) => {
        setVisible((prev) => {
          if (!prev) {
            update({ ids: [...state.ids, id] });
          } else {
            // remove from list
            update({ ids: state.ids.filter((_id) => _id !== id) });
          }

          return !prev;
        });

        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Box position='absolute' t={0} r='-10px' zIndex={10}>
        {visible && (
          <Checkbox
            readOnly
            value={`${visible}`}
            checked={visible}
            size='sm'
            colorTheme='secondary400'
            labelledBy='artist-name'
          />
        )}
      </Box>
      <Box position='relative' zIndex={1}>
        <Avatar variant='squircle' size='lg' />
      </Box>
      <Text css={{ width: '100%', textAlign: 'center' }} size={2}>
        {name}
      </Text>
    </VStack>
  );
}

function ArtistSelectionStep() {
  const { state, update } = useGeneralContext<IUnconnectedDialogContext>();

  const artists = arrayFrom(31);

  return (
    <VStack h='calc(100% - 27px)' position='relative'>
      <VStack
        gap={5}
        pb={1}
        h={state.ids.length > 0 ? 'calc(100% - 51px)' : '100%'}
      >
        <TextGroup mt={3}>
          <TextGroupHeading casing='capitalize'>
            Select Artists
          </TextGroupHeading>
          <TextGroupSubheading size={2}>
            Here are artists that we found in your library you do not
            follow on Holdr.
          </TextGroupSubheading>
        </TextGroup>

        <Box h='100%' overflow='auto'>
          <Grid gap={5} templateColumns={'repeat(3, 1fr)'}>
            {artists.map((idx) => (
              <Grid.Item key={idx} justifySelf='center'>
                <ArtistOption name={`Artist ${idx + 1}`} id={`${idx}`} />
              </Grid.Item>
            ))}
          </Grid>
        </Box>
      </VStack>
      {state.ids.length > 0 && (
        <HStack
          position='absolute'
          b={0}
          l={0}
          w='100%'
          bgColor='transparent'
          css={{ zIndex: 15 }}
        >
          {state.ids.length > 0 && (
            <Center
              py={4}
              radius={3}
              flex={1}
              cursor='pointer'
              _hover={{ backgroundColor: '$base100' }}
              onClick={() => update({ ids: artists.map((id) => '' + id) })}
            >
              <Text weight={500}>Select All</Text>
            </Center>
          )}
          {state.ids.length > 1 && (
            <Center
              radius={3}
              py={4}
              flex={1}
              cursor='pointer'
              _hover={{ backgroundColor: hexToRGB('#d3190b', 0.075) }}
              onClick={() => update({ ids: [] })}
            >
              <Text color='danger' weight={500}>
                Remove All
              </Text>
            </Center>
          )}
        </HStack>
      )}
    </VStack>
  );
}

interface IUnconnectedDialogContext {
  ids: string[];
}

function UnconnectedDialog({
  currentStep,
  ...props
}: DialogProps & { currentStep: number }) {
  const [width, setWidth] = useState('550px');

  const [state, update] = useRecordState<IUnconnectedDialogContext>({
    ids: [],
  });

  const {
    count: step,
    increment: nextStep,
    reset,
  } = useCounter(currentStep);

  const resetDialog = () => {
    props.onClose();
    update({ ids: [] });
    setWidth('550px');
    reset();
  };

  return (
    <GeneralContextProvider value={{ state, update }}>
      <CommonDialog minHeight={width} {...props} onClose={resetDialog}>
        <CommonDialogHeader label='' />
        <CommonDialogContent>
          <VStack px={6} h='100%' justify='space-between'>
            {step === 0 && <GetStartedStep />}
            {step === 1 && <ConnectionStep />}
            {step === 2 && <ArtistSelectionStep />}
            <Box
              position='sticky'
              b={0}
              pt={3}
              pb={4}
              zIndex={10}
              css={{ backgroundColor: '#fff' }}
            >
              <StepperIndicator current={step}>
                {arrayFrom(2).map((idx) => (
                  <StepperIndicatorStep key={idx} />
                ))}
              </StepperIndicator>
            </Box>
          </VStack>
        </CommonDialogContent>
        {step < 2 && (
          <CommonDialogActionButton
            // disabled={step === 1}
            label='Continue'
            onClick={() => {
              if (step === 1) {
                setWidth('675px');
              }
              nextStep();
            }}
          />
        )}
        {step === 2 && (
          <CommonDialogActionButton
            label={
              state.ids.length > 0
                ? `Follow (${state.ids.length})`
                : 'Skip'
            }
            onClick={resetDialog}
          />
        )}
      </CommonDialog>
    </GeneralContextProvider>
  );
}
UnconnectedDialog.displayName = 'UnconnectedDialog';

export default UnconnectedDialog;
