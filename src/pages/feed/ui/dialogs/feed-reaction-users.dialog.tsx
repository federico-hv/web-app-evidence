import {
  CommonDialog,
  CommonDialogContent,
  CommonDialogHeader,
  useDialogTabContext,
} from '../../../../shared';
import { ReactionUsersList } from '../lists';
import {
  FeedReactionTabOptions,
  ReadableFeedReaction,
} from '../../shared';
import { HStack, Icon, Tabs } from '@holdr-ui/react';
import { ReactionIcon } from '../../../../features';

function FeedReactionUsersDialog() {
  const { isOpen, onOpen, onClose, option } = useDialogTabContext();

  if (option != 'reactions') return null;

  return (
    <CommonDialog
      minHeight='85vh'
      ariaDescribedBy='create-post-dialog__title'
      isOpen={isOpen}
      onOpen={() => onOpen('reactions')}
      onClose={onClose}
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
