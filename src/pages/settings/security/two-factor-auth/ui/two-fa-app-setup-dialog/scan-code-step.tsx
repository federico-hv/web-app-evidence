import { Fragment, useState } from 'react';
import {
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  useCopyToClipboard,
  useGeneralContext,
} from '../../../../../../shared';
import {
  Button,
  VStack,
  Image,
  Text,
  Skeleton,
  AlertDialog,
  HStack,
  Icon,
  Box,
} from '@holdr-ui/react';
import { TwoFAAppRegistrationModel } from '../../../../../../features';

function ScanCodeStep() {
  const { state: data } = useGeneralContext<TwoFAAppRegistrationModel>();
  const copy = useCopyToClipboard();
  const [view, setView] = useState<'QRCode' | 'Code'>('QRCode');

  if (!data) {
    return (
      <AlertDialog>
        <AlertDialog.Content>
          We could not retrieve the QR Code. Please try again later.
        </AlertDialog.Content>
      </AlertDialog>
    );
  }

  return (
    <Fragment>
      <TextGroup gap={{ '@bp1': 0, '@bp3': 2 }}>
        <TextGroupHeading
          size={{ '@bp1': 3, '@bp3': 4 }}
          casing='capitalize'
        >
          Scan code with App
        </TextGroupHeading>
        <TextGroupSubheading size={2}>
          {view === 'QRCode' &&
            'Scan the QR Code using an authentication app. If you do not have one, you will need to download one.'}
          {view === 'Code' &&
            "If you're having trouble scanning the QRCode the you can enter the code below to your authentication app."}
        </TextGroupSubheading>
      </TextGroup>
      <VStack items='center' my={5} gap={5}>
        {view === 'QRCode' && (
          <Fragment>
            <Image
              size='150px'
              src={data.qrCodeUrl}
              alt='Two-factor auth QR code'
              fallback={<Skeleton h='250px' w='250px' />}
            />
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setView('Code')}
            >
              {"Can't scan QR Code"}
            </Button>
          </Fragment>
        )}
        {view === 'Code' && (
          <Fragment>
            <HStack
              items='center'
              justify='space-between'
              onClick={() => copy(data.code)}
              w='full'
              bgColor='base100'
              p={4}
            >
              <Box />
              <Text size={4} weight={500}>
                {data.code}
              </Text>
              <Icon name='collections-outline' />
            </HStack>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setView('QRCode')}
            >
              Try to scan QR Code
            </Button>
          </Fragment>
        )}
      </VStack>
    </Fragment>
  );
}
ScanCodeStep.displayName = 'ScanCodeStep';

export default ScanCodeStep;
