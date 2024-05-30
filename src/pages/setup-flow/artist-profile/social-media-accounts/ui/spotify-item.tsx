import { Avatar, Box, CloseButton, HStack, Text } from '@holdr-ui/react';
import {
  IExternalAccountModel,
  useRemoveExternalAccount,
} from '../../../../../features';

function SpotifyItem({ data }: { data: IExternalAccountModel }) {
  const { removeExternalAccount } = useRemoveExternalAccount();

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
          src={data.avatar}
          variant='squircle'
          css={{
            size: '40px',
          }}
        />
        <Text weight={500} noOfLines={2} whiteSpace='pre-wrap'>
          {data.username}
        </Text>
      </HStack>
      <Box>
        <CloseButton
          onClick={async () => {
            if (data) {
              await removeExternalAccount(data.id);
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
