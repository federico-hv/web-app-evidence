import {
  feedAudience,
  FeedAudienceEnum,
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
  CustomSkeleton,
  Error,
  Loader,
  RadioWrapper,
  useDialogContext,
} from '../../../../shared';
import {
  arrayFrom,
  Box,
  Center,
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  Heading,
  HStack,
  Icon,
  Radio,
  Skeleton,
  Text,
  VStack,
} from '@holdr-ui/react';
import { FlatList } from '../../../../tmp/flat-list';
import { IconName } from '@holdr-ui/react/dist/shared/types';

function AudienceDialog() {
  const { feedId } = useFeedContext();

  const { loading, data, error } = useQuery<
    { feedAudience: FeedAudienceEnum },
    { id: string }
  >(GET_FEED_AUDIENCE, {
    variables: { id: feedId },
  });

  const options: Array<{
    icon: IconName;
    label: string;
    value: FeedAudienceEnum;
  }> = [
    {
      icon: 'global-outline',
      label: 'Public',
      value: FeedAudienceEnum.Everyone,
    },
    {
      icon: 'user-group-outline',
      label: 'Followers',
      value: FeedAudienceEnum.Followers,
    },
    {
      icon: 'user-square-outline',
      label: 'Members',
      value: FeedAudienceEnum.Members,
    },
  ];

  const { loading: loadingChangeAudience, changeAudience } =
    useChangeAudience();

  const dialogContext = useDialogContext();

  return (
    <Dialog {...dialogContext}>
      <DialogPortal>
        <DialogOverlay zIndex={20} />
        <DialogContent
          zIndex={20}
          className='setup-account'
          w={375}
          minHeight='275px'
          overflowY='hidden'
          maxHeight='90vh'
          bgColor='#30304B'
          css={{
            userSelect: 'none',
          }}
        >
          <DialogHeader
            py={4}
            borderBottom={1}
            borderColor='rgba(152, 152, 255, 0.10)'
          >
            <Heading casing='capitalize' weight={500} size={5}>
              Change audience
            </Heading>
          </DialogHeader>
          <DialogBody py={0} px={4}>
            <Error hasError={!!error} errorMessage={error?.message}>
              <Loader
                loading={loading || loadingChangeAudience}
                h='100%'
                as={
                  <VStack gap={4} p={4} w='100%'>
                    {arrayFrom(3).map((idx) => (
                      <CustomSkeleton
                        key={`AudienceLoader-${idx}`}
                        h='2.5rem'
                        w='100%'
                        radius={2}
                      />
                    ))}
                  </VStack>
                }
              >
                {data && (
                  <FlatList
                    as='fieldset'
                    direction='vertical'
                    data={options}
                    keyExtractor={({ value }) => value}
                    renderItem={(item) => (
                      <HStack
                        items='center'
                        justify='space-between'
                        _hover={{ bgColor: 'rgba(152, 152, 255, 0.15)' }}
                        px={2}
                        py={4}
                        radius={2}
                        cursor={
                          loadingChangeAudience ? 'not-allowed' : 'pointer'
                        }
                        onClick={
                          loadingChangeAudience
                            ? undefined
                            : () => changeAudience(feedId, item.value)
                        }
                      >
                        <HStack items='center' gap={3}>
                          <Center fontSize={5}>
                            <Icon name={item.icon} />
                          </Center>
                          <Text>{item.label}</Text>
                        </HStack>
                        {data.feedAudience === item.value && (
                          <Icon size='xl' name='circle-check-fill' />
                        )}
                      </HStack>
                    )}
                  />
                )}
              </Loader>
            </Error>
          </DialogBody>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

export default AudienceDialog;
