import { useSuspenseQuery } from '@apollo/client';
import {
  GET_TWO_FA_CHANNEL,
  SettingItem,
  useDisableTwoFA,
} from '../../../../../features';
import {
  Box,
  Checkbox,
  Heading,
  HStack,
  useDisclosure,
  VStack,
} from '@holdr-ui/react';
import {
  DialogContextProvider,
  Paths,
  prefix,
  TextGroup,
  useAlertDialog,
} from '../../../../../shared';
import { Fragment } from 'react';
import { RootSettingsPath } from '../../root';
import TwoFAAppSetupDialog from './two-fa-app-setup-dialog';

function TwoFAAuthAppCheckbox() {
  const { data } = useSuspenseQuery<{
    twoFAChannel: string;
  }>(GET_TWO_FA_CHANNEL);

  const ctx = useDisclosure();

  const { disableTwoFA } = useDisableTwoFA();

  const { openWith } = useAlertDialog();

  return (
    <Fragment>
      <HStack cursor='pointer' as='label' px={4} gap={4} items='center'>
        <TextGroup gap={1}>
          <TextGroup gap={1}>
            <TextGroup.Heading id='heading__2fa-app' size={3}>
              Authentication app
            </TextGroup.Heading>
            <TextGroup.Subheading
              size={2}
              color='base400'
              css={{ userSelect: 'none' }}
            >
              Logging into Holdr will prompt an authentication code to be
              sent to a mobile authentication app.
            </TextGroup.Subheading>
          </TextGroup>
        </TextGroup>
        {data.twoFAChannel === 'app' ? (
          <Checkbox
            checked={true}
            value={`${true}`}
            labelledBy={`heading__2fa-app`}
            onClick={() =>
              openWith({
                title: 'Disable Two Factor authentication',
                description:
                  'Removing this feature, will remove an extra layer of security for your account. Are you sure you want to disable it?',

                actionText: 'Turn off',
                onAction: () => disableTwoFA('app'),
              })
            }
          />
        ) : (
          <Checkbox
            colorTheme='white500'
            onClick={ctx.onOpen}
            checked={false}
            value={`${false}`}
            labelledBy={`heading__2fa-app`}
          />
        )}
      </HStack>
      {data.twoFAChannel && (
        <VStack
          borderTop={2}
          borderColor='base100'
          gap={3}
          pb={2}
          mt={4}
          pt={4}
        >
          <Box px={4}>
            <Heading size={4} weight={500} css={{ fontSize: 'large' }}>
              Additional information
            </Heading>
          </Box>
          <SettingItem
            path={prefix(RootSettingsPath, Paths.setting.backup_code)}
            heading='Back up codes'
            subheading='Get access code that you can use when do not have access for your two factor authentication options.'
          />
        </VStack>
      )}
      <DialogContextProvider value={ctx}>
        <TwoFAAppSetupDialog />
      </DialogContextProvider>
    </Fragment>
  );
}

TwoFAAuthAppCheckbox.displayName = 'TwoFAAuthAppCheckbox';

export default TwoFAAuthAppCheckbox;
