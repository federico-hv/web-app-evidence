import { useFeedContext, usePinFeed, useUnpinFeed } from '../shared';
import { useRelationshipStatusInfo } from '../../relationships';
import { Loader, Menu } from '../../../shared';
import { IconButton, Image } from '@holdr-ui/react';

import stats from '../../../assets/images/stats.png';
import pinOutlined from '../../../assets/images/pin-outlined.png';
import pinFilled from '../../../assets/images/pin-filled.png';

function OwnerMoreButton({ ghost }: { ghost?: boolean }) {
  const { pin } = usePinFeed();
  const { unpin } = useUnpinFeed();
  const { owner, isPinned, feedId } = useFeedContext();

  const { loading, data } = useRelationshipStatusInfo(owner.username);

  return (
    <Loader loading={loading}>
      {data && (
        <Menu>
          {ghost ? (
            <Menu.Trigger>
              <IconButton
                colorTheme='darkTint400'
                blur='xl'
                icon='more-fill'
                boxShadow='none'
                ariaLabel='view options'
              />
            </Menu.Trigger>
          ) : (
            <Menu.Trigger />
          )}
          <Menu.Header />
          <Menu.Content>
            <Menu.Item
              icon={
                <Image
                  size={24}
                  src={isPinned ? pinFilled : pinOutlined}
                />
              }
              action={
                isPinned
                  ? async () => await unpin(feedId)
                  : async () => await pin(feedId)
              }
              label={isPinned ? 'Unpin from profile' : 'Pin to profile'}
            />
            <Menu.Item icon='eye-show' label='Change audience' />
            <Menu.Item
              icon={<Image size={24} src={stats} />}
              label='View analytics'
            />
            <Menu.Item dangerous icon='remove-outline' label='Delete' />
          </Menu.Content>
        </Menu>
      )}
    </Loader>
  );
}
OwnerMoreButton.displayName = 'OwnerMoreButton';

export default OwnerMoreButton;
