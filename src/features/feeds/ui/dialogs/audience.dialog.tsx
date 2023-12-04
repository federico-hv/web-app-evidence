import {
  FeedAudienceName,
  useChangeAudience,
  useFeedContext,
} from '../../shared';
import { useQuery } from '@apollo/client';
import { GET_FEED_AUDIENCE } from '../../queries';
import {
  CommonDialog,
  CommonDialogContent,
  CommonDialogHeader,
  Error,
  extraBtnPadding,
  Loader,
  RadioWrapper,
  useDialogContext,
} from '../../../../shared';
import {
  Box,
  Button,
  Center,
  Drawer,
  Heading,
  Radio,
  Skeleton,
  Text,
  useWindowSize,
  VStack,
} from '@holdr-ui/react';
import { Fragment } from 'react';

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
        <CommonDialog
          ariaDescribedBy='change-audience-dialog__title'
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          minHeight={300}
        >
          <CommonDialogHeader label='Audience' />
          <CommonDialogContent>
            <Box mt={4}>
              <Options />
            </Box>
          </CommonDialogContent>
        </CommonDialog>
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

export default AudienceDialog;
