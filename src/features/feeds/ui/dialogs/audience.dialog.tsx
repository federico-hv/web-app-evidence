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
  Loader,
  RadioWrapper,
  useDialogContext,
} from '../../../../shared';
import { Box, Radio, Skeleton, Text, VStack } from '@holdr-ui/react';

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
  );
}

export default AudienceDialog;
