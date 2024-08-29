import {
  Alert,
  AlertContent,
  AlertDescription,
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  Heading,
  HStack,
  IconButton,
} from '@holdr-ui/react';
import { IDialogContext } from '../../../../shared/contexts/dialog/types';
import { getDialogColors, useFeedContext } from '../../shared';
import { useUsersWhoLikedQuery } from '../../queries';
import { FlatList } from '../../../../tmp/flat-list';
import { FollowItem } from '../../../relationships';
import { Loader } from '../../../../shared';

function LikesDialog({
  theme,
  ...props
}: IDialogContext & { theme?: 'primary' | 'secondary' }) {
  const { feedId } = useFeedContext();

  const { loading, error, data } = useUsersWhoLikedQuery({ feedId });

  const colors = getDialogColors(theme || 'primary');

  return (
    <Dialog {...props}>
      <DialogPortal>
        <DialogOverlay zIndex={20} />
        <DialogContent
          zIndex={20}
          w={375}
          minWidth={500}
          h={600}
          maxHeight='90vh'
          overflowY='hidden'
          color={colors.color}
          bgColor={colors.bgColor}
          css={{
            userSelect: 'none',
            backdropFilter: 'blur(12px)',
          }}
        >
          <DialogHeader
            py={4}
            borderBottom={1}
            borderColor='rgba(152, 152, 255, 0.10)'
          >
            <HStack w='100%' justify='space-between' items='center'>
              <Heading casing='capitalize' weight={500} size={5}>
                Likes
              </Heading>
              <IconButton
                onClick={props.onClose}
                size='sm'
                ariaLabel='close'
                variant='outline'
                icon='close'
                colorTheme={colors.iconButtonColor}
              />
            </HStack>
          </DialogHeader>
          <DialogBody>
            {error ? (
              <Alert status='danger'>
                <AlertContent>
                  <AlertDescription color='danger700'>
                    {error.message}
                  </AlertDescription>
                </AlertContent>
              </Alert>
            ) : (
              <Loader loading={loading}>
                {data && (
                  <FlatList
                    mt={4}
                    h={450}
                    overflowY='auto'
                    className='thin-scrollbar'
                    direction='vertical'
                    gap={4}
                    data={data.usersWhoLiked.edges}
                    renderItem={(data) => (
                      <FollowItem
                        color={
                          theme === 'secondary' ? 'base800' : 'white500'
                        }
                        colorTheme={
                          theme === 'secondary'
                            ? {
                                follow: 'purple500',
                                following: 'purple300',
                              }
                            : undefined
                        }
                        data={data.node}
                      />
                    )}
                    keyExtractor={({ node }) => node.id}
                  />
                )}
              </Loader>
            )}
          </DialogBody>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

export default LikesDialog;
