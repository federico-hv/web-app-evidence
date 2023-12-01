import { Tabs } from '@holdr-ui/react';
import { IPoll } from 'features/feeds/shared';
import {
  CommonDialog,
  CommonDialogContent,
  CommonDialogHeader,
  EmptyMessage,
  useDialogContext,
} from 'shared';

function PollVotesDialog({ items }: { items: IPoll[] }) {
  const { isOpen, onOpen, onClose } = useDialogContext();

  return (
    <CommonDialog isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <CommonDialogHeader label='Poll Votes' />
      <CommonDialogContent>
        <Tabs defaultValue={items[0].text}>
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
            {items.map((data) => (
              <Tabs.Trigger
                value={data.text}
                key={`${data.text}-tab-trigger`}
              >
                {data.text}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {items.map((data) => (
            <Tabs.Content
              key={`${data.text}-tab-content`}
              value={data.text}
            >
              <PollUserList />
            </Tabs.Content>
          ))}
        </Tabs>
      </CommonDialogContent>
    </CommonDialog>
  );
}

// TODO: integrate gql query
function PollUserList() {
  return (
    <EmptyMessage
      title={'No Votes Yet.'}
      subtitle={`Nobody has voted for this result yet.`}
    />
  );
}

export default PollVotesDialog;
