import {
  FeedAudienceName,
  useChangeAudience,
  useFeedContext,
  usePinFeed,
  useUnpinFeed,
} from '../shared';
import { useRelationshipStatusInfo } from '../../relationships';
import {
  DialogContextProvider,
  Error,
  extraBtnPadding,
  Loader,
  Menu,
  RadioWrapper,
  useAlertDialog,
  useDialogContext,
} from '../../../shared';
import {
  Box,
  Button,
  Center,
  Dialog,
  Drawer,
  Heading,
  IconButton,
  Image,
  Radio,
  Skeleton,
  Text,
  useDisclosure,
  useWindowSize,
  VStack,
} from '@holdr-ui/react';
import { Fragment } from 'react';
import { useQuery } from '@apollo/client';
import { GET_FEED_AUDIENCE } from '../queries';

import stats from '../../../assets/images/stats.png';
import pinOutlined from '../../../assets/images/pin-outlined.png';
import pinFilled from '../../../assets/images/pin-filled.png';
import { useDeleteFeed } from '../shared/hooks/use-delete-feed';

function AudienceDialog() {
  const { feedId } = useFeedContext();

  const { loading, data, error } = useQuery<
    { feedAudience: FeedAudienceName },
    { id: string }
  >(GET_FEED_AUDIENCE, {
    variables: { id: feedId },
  });

  const { changeAudience } = useChangeAudience();

  const { isOpen, onClose, onOpen } = useDialogContext();

  const { width } = useWindowSize();

  const Options = () => (
    <Error hasError={!!error} errorMessage={error?.message}>
      <Loader
        loading={loading}
        h={90}
        as={
          <VStack gap={4} p={4} w='100%'>
            <Skeleton h='1.5rem' w='100%' />
            <Skeleton h='1.5rem' w='100%' />
          </VStack>
        }
      >
        {data && (
          <VStack as='fieldset' gap={4} p={4}>
            <RadioWrapper>
              <Text id='audience:everyone'>Everyone</Text>
              <Radio
                checked={data.feedAudience === 'everyone'}
                labelledBy='audience:everyone'
                name='audience'
                value='everyone'
                onChange={async () => changeAudience(feedId, 'everyone')}
              />
            </RadioWrapper>
            <RadioWrapper>
              <Text id='audience:member'>Holdrs</Text>
              <Radio
                checked={data.feedAudience === 'members'}
                labelledBy='audience:member'
                name='audience'
                value='members'
                onChange={async () => changeAudience(feedId, 'members')}
              />
            </RadioWrapper>
          </VStack>
        )}
      </Loader>
    </Error>
  );

  return (
    <Fragment>
      {width && width > 540 ? (
        <Dialog
          ariaDescribedBy='change-audience-dialog__title'
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
        >
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content w={400} h={300}>
              <Dialog.Body css={{ padding: 0 }}>
                <Center p={5} borderBottom={1} borderColor='base100'>
                  <Heading
                    as='h2'
                    size={{ '@bp1': 3, '@bp3': 4 }}
                    css={{ textAlign: 'center' }}
                    casing='uppercase'
                    weight={500}
                  >
                    Audience
                  </Heading>
                </Center>
                <Options />
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>
      ) : (
        <Drawer isOpen={isOpen} onClose={onClose}>
          <Drawer.Portal>
            <Drawer.Overlay />
            <Drawer.Content>
              <VStack
                radius={3}
                bgColor='primary400'
                w='full'
                h='380px'
                divider={<Box borderBottom={1} borderColor='base100' />}
              >
                <Center p={5} borderBottom={1} borderColor='base100'>
                  <Heading
                    as='h2'
                    size={{ '@bp1': 3, '@bp3': 4 }}
                    css={{ textAlign: 'center' }}
                    casing='uppercase'
                    weight={500}
                  >
                    Audience
                  </Heading>
                </Center>
                <Options />
                <VStack flex={1} px={4} justify='center'>
                  <Button
                    className={extraBtnPadding()}
                    fullWidth
                    onClick={onClose}
                  >
                    Close
                  </Button>
                </VStack>
              </VStack>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer>
      )}
    </Fragment>
  );
}

function OwnerMoreButton({ ghost }: { ghost?: boolean }) {
  const { openWith } = useAlertDialog();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { owner, isPinned, feedId } = useFeedContext();

  const { loading, data } = useRelationshipStatusInfo(owner.username);

  const { pin } = usePinFeed();
  const { unpin } = useUnpinFeed();
  const { deleteFeed } = useDeleteFeed();

  return (
    <Loader loading={loading}>
      <DialogContextProvider value={{ isOpen, onOpen, onClose }}>
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
              <Menu.Item
                icon='eye-show'
                label='Change audience'
                action={onOpen}
              />
              <Menu.Item
                icon={<Image size={24} src={stats} />}
                label='View analytics'
              />
              <Menu.Item
                dangerous
                icon='remove-outline'
                label='Delete'
                action={() =>
                  openWith({
                    actionText: 'Yes, delete',
                    onAction: async () => await deleteFeed(feedId),
                    title: 'Delete feed',
                    description:
                      'If you delete this feed, you will you will lose all the data associated with this feed.' +
                      ' Are you sure you want to delete it?',
                  })
                }
              />
            </Menu.Content>
          </Menu>
        )}
        <AudienceDialog />
      </DialogContextProvider>
    </Loader>
  );
}
OwnerMoreButton.displayName = 'OwnerMoreButton';

export default OwnerMoreButton;
