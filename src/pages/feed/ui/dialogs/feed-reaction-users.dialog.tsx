import {
  CommonDialog,
  CommonDialogContent,
  CommonDialogHeader,
  useGeneralContext,
} from '../../../../shared';
import { ReactionUsersList } from '../lists';
import {
  FeedReactionTabOptions,
  ReadableFeedReaction,
} from '../../shared';
import { HStack, Icon, Tabs } from '@holdr-ui/react';
import { FeedReactionName } from '../../../../features';
import { IconName } from '@holdr-ui/react/dist/shared/types';

const ReactionIcon: Record<
  FeedReactionName,
  { active: IconName; inactive: IconName }
> = {
  love: {
    active: 'heart-outline',
    inactive: 'heart-outline',
  },
  sad: {
    active: 'emotion-sad-outline',
    inactive: 'emotion-sad-outline',
  },
  indifferent: {
    active: 'emotion-unhappy-outline',
    inactive: 'emotion-unhappy-outline',
  },
  excited: {
    active: 'emotion-happy-outline',
    inactive: 'emotion-happy-outline',
  },
};

function FeedReactionUsersDialog() {
  const { state, update } = useGeneralContext();

  return (
    <CommonDialog
      minHeight='85vh'
      ariaDescribedBy='create-post-dialog__title'
      isOpen={!!state}
      onOpen={() => update('reactions')}
      onClose={() => update(undefined)}
    >
      <CommonDialogHeader label='Feed reactions' />
      <CommonDialogContent>
        <Tabs defaultValue='all'>
          <Tabs.List
            variant='ghost'
            css={{
              position: 'sticky',
              blur: '12px',
              zIndex: 5,
              py: '$3',

              '@bp1': {
                t: '50px',
                '& button': {
                  height: '$4',
                  fontSize: '$2',
                  minWidth: 'unset',
                  flex: 1,
                },
              },
              '@bp3': {
                t: '0px',
                '& button': {
                  fontSize: '$3',
                  height: '$7',
                  minWidth: 'unset',
                  flex: 1,
                },
              },
            }}
          >
            {FeedReactionTabOptions.map((name) => (
              <Tabs.Trigger key={`${name}-tab-trigger-`} value={name}>
                <HStack gap={3} items='center'>
                  {name !== 'all' && (
                    <Icon name={ReactionIcon[name].inactive} />
                  )}
                  {ReadableFeedReaction[name]}
                </HStack>
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {FeedReactionTabOptions.map((name) => (
            <Tabs.Content key={`${name}-tab-trigger-`} value={name}>
              <ReactionUsersList type={name} />
            </Tabs.Content>
          ))}
        </Tabs>
      </CommonDialogContent>
    </CommonDialog>
  );
}
FeedReactionUsersDialog.displayName = 'FeedReactionUsersDialog';

export default FeedReactionUsersDialog;
