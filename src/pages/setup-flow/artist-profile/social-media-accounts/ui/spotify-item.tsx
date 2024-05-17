import {
  Avatar,
  Box,
  CloseButton,
  HStack,
  Text,
  useGeneralContext,
} from '@holdr-ui/react';
import { useRemoveExternalAccount } from '../../../../../features';
import { Fragment } from 'react';
import { ISocialMediaAccountsViewContext } from '../shared';

function SpotifyItem() {
  const { update, state } =
    useGeneralContext<ISocialMediaAccountsViewContext>();
  const { removeExternalAccount } = useRemoveExternalAccount();

  if (!state.externalAccount) {
    return <Fragment />;
  }

  return (
    <HStack
      p={2}
      gap={4}
      justify='space-between'
      radius={2}
      w='fit-content'
      minWidth='125px'
      maxWidth='250px'
      items='center'
      bgColor='rgba(152, 152, 255, 0.15)'
    >
      <HStack items='center' gap={2}>
        <Avatar
          src={state.externalAccount.avatar}
          variant='squircle'
          css={{
            size: '40px',
          }}
        />
        <Text weight={500} noOfLines={2} whiteSpace='pre-wrap'>
          {state.externalAccount.username}
        </Text>
      </HStack>
      <Box>
        <CloseButton
          onClick={async () => {
            if (state.externalAccount) {
              await removeExternalAccount(state.externalAccount.id).then(
                () => update({ externalAccount: undefined }),
              );
            }
          }}
          size='sm'
          colorTheme='white500'
        />
      </Box>
    </HStack>
  );
}
SpotifyItem.displayName = 'SpotifyItem';

export default SpotifyItem;
