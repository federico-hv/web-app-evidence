import { Box, IconButton, Popover, VStack } from '@holdr-ui/react';
import { MenuItem } from '../following';
import { useContext } from 'react';
import { RelationshipStatusContext } from '../../../contexts';
import { useCopyToClipboard } from '../../../hooks';

function ProfileOptionsButton() {
  const { isFollower } = useContext(RelationshipStatusContext);
  const copyToClipboard = useCopyToClipboard();
  return (
    <Popover>
      <Popover.Trigger>
        <IconButton
          variant='ghost'
          colorTheme='primary400'
          icon='more-fill'
          ariaLabel='open profile options'
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          minWidth={275}
          side='bottom'
          align='end'
          sideOffset={5}
        >
          <VStack divider={<Box borderBottom={1} borderColor='base100' />}>
            <MenuItem dangerous label='Block' icon='remove-outline' />
            <MenuItem dangerous label='Report' icon='report-outline' />
            {isFollower && (
              <MenuItem
                label='Remove follower'
                icon='user-unfollow-outline'
              />
            )}
            <MenuItem
              label='Copy profile URL'
              icon='collections-outline'
              onClick={() => copyToClipboard(window.location.href)}
            />
            <MenuItem
              label='About this account'
              icon='information-outline'
            />
          </VStack>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
}
ProfileOptionsButton.displayName = 'ProfileOptionsButton';

export default ProfileOptionsButton;
