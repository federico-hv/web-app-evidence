import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  HStack,
  Image,
  Text,
  useSwitch,
  VStack,
} from '@holdr-ui/react';
import {
  CommonDialog,
  CommonDialogActionButton,
  CommonDialogContent,
  CommonDialogHeader,
  SwitchConditional,
  SwitchConditionalCase,
  useDialogTabContext,
  useRecordState,
} from '../../../../../shared';
import { useCurrentUser } from '../../../../auth';
import {
  CreatePostInput,
  DIALOG_CONTENT_HEIGHT,
  PollSchema,
  PostSchema,
} from '../../../shared';
import { useState } from 'react';
import AddPoll from '../../groups/add-poll';
import AddMedia from '../../groups/add-media';
import MediaIcon from '../../../../../assets/images/media.png';
import PollIcon from '../../../../../assets/images/poll.png';
import { omit } from 'lodash';
import { useCreatePost } from '../../../shared';
import { CreatePostEditor } from './ui';

function CreatePostDialog() {
  const currentUser = useCurrentUser();
  const { createPost, loading } = useCreatePost();
  const { isOpen, onOpen, onClose, option } = useDialogTabContext();
  const { switchState, turnOn, turnOff } = useSwitch(!!option);
  const [state, update, set] = useRecordState<CreatePostInput>({
    description: '',
  });

  const [contentHeight, setContentHeight] = useState(
    option ? DIALOG_CONTENT_HEIGHT[option as 'media' | 'poll'] : 450,
  );

  const removeResponses = () =>
    set(({ responses, ...rest }) => ({
      ...rest,
    }));

  const removeMedia = () => set((prev) => omit(prev, 'media'));

  const increaseHeight = (amount: number) =>
    setContentHeight((prev) => prev + amount);

  const resetHeight = () => setContentHeight(450);

  const checkIsDisabled = () => {
    try {
      PostSchema.validateSync(state);
      if (state.responses) {
        PollSchema.validateSync(state);
      }
      return false;
    } catch (e) {
      return true;
    }
  };

  return (
    <>
      {currentUser && (
        <CommonDialog
          minHeight={contentHeight}
          ariaDescribedBy='create-post-dialog__title'
          isOpen={isOpen}
          onOpen={() => onOpen(option)}
          onClose={onClose}
        >
          <CommonDialogHeader label='Create Post' />
          <CommonDialogContent
            h={{
              '@bp1': 'calc(100% - 10px)',
              '@bp3': 'calc(100% - 100px)',
            }}
          >
            <VStack
              py={4}
              gap={4}
              h={{
                '@bp1':
                  option === 'media'
                    ? 'calc(100% - 76px)'
                    : 'calc(100% - 92px)',
                '@bp3': '100%',
              }}
            >
              <HStack gap={1}>
                <Avatar
                  size={{ '@bp1': 'base', '@bp3': 'lg' }}
                  variant='squircle'
                  src={currentUser.avatar}
                />
                <VStack gap={1}>
                  <Box pl={3}>
                    <Text size={{ '@bp1': 2, '@bp3': 3 }} weight={500}>
                      {currentUser.displayName}
                    </Text>
                  </Box>
                  <Button
                    size='sm'
                    leftIcon='global-outline'
                    variant='ghost'
                  >
                    Everyone
                  </Button>
                </VStack>
              </HStack>

              <VStack
                className='needtoknow'
                h='100%'
                overflowY='auto'
                pb={4}
                gap={4}
              >
                <Box
                  as='label'
                  h={option === '' ? '100%' : 'auto'}
                  minHeight={{ '@bp1': 75, '@bp3': 75 }}
                >
                  <CreatePostEditor update={update} />
                </Box>
                <SwitchConditional>
                  <SwitchConditionalCase
                    on={switchState && option === 'media'}
                  >
                    <AddMedia
                      update={update}
                      remove={() => {
                        turnOff();
                        removeMedia();
                      }}
                      reset={resetHeight}
                    />
                  </SwitchConditionalCase>
                  <SwitchConditionalCase
                    on={switchState && option === 'poll'}
                  >
                    <AddPoll
                      update={update}
                      remove={() => {
                        turnOff();
                        removeResponses();
                      }}
                      reset={resetHeight}
                      increaseHeight={increaseHeight}
                    />
                  </SwitchConditionalCase>
                </SwitchConditional>
              </VStack>
            </VStack>
            <VStack // Footer
              position='fixed'
              b={81}
              w='100%'
              l={0}
              gap={4}
              px={0}
              css={{
                backgroundColor: '#FFF',
              }}
            >
              <HStack
                items='center'
                justify='space-between'
                py={3}
                px={5}
                gap={4}
                borderTop={1}
                borderBottom={1}
                borderColor='base200'
                divider={
                  <Box h={16} borderRight={1} borderColor='base200' />
                }
              >
                <HStack items='center' justify='space-between' flex={1}>
                  <Text weight={500} size={{ '@bp1': 2, '@bp3': 3 }}>
                    Add to your post
                  </Text>
                  <HStack gap={4}>
                    <Box
                      onClick={() => {
                        turnOn();
                        setContentHeight(DIALOG_CONTENT_HEIGHT['media']);
                        onOpen('media');
                      }}
                    >
                      <Image
                        size={{ '@bp1': 18, '@bp3': 30 }}
                        src={MediaIcon}
                        alt=''
                      />
                    </Box>
                    <Box
                      onClick={() => {
                        turnOn();
                        setContentHeight(DIALOG_CONTENT_HEIGHT['poll']);
                        onOpen('poll');
                      }}
                    >
                      <Image
                        size={{ '@bp1': 18, '@bp3': 30 }}
                        src={PollIcon}
                        alt=''
                      />
                    </Box>
                  </HStack>
                </HStack>
                <CircularProgress
                  size={{ '@bp1': 18, '@bp3': 30 }}
                  // should use state.length
                  value={Math.ceil((state.description.length / 150) * 100)}
                />
              </HStack>
            </VStack>
          </CommonDialogContent>
          <CommonDialogActionButton
            loading={loading}
            loadingText={loading ? '' : 'Posting'}
            disabled={checkIsDisabled()}
            onClick={async () => {
              const data = await createPost(state);
              if (data) {
                onClose();
              }
            }}
            label='Post'
          />
        </CommonDialog>
      )}
    </>
  );
}
CreatePostDialog.displayName = 'CreatePostDialog';

export default CreatePostDialog;
