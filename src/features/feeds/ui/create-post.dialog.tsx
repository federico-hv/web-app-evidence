import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  Heading,
  HStack,
  Image,
  Text,
  useSwitch,
  VStack,
} from '@holdr-ui/react';
import {
  extraBtnPadding,
  SwitchConditional,
  SwitchConditionalCase,
  useDialogTabContext,
  useRecordState,
} from '../../../shared';
import { useCurrentUser } from '../../auth';
import {
  CreatePostInput,
  DIALOG_CONTENT_HEIGHT,
  PollSchema,
  PostSchema,
  StyledTextarea,
} from '../shared';
import { ChangeEvent, useState } from 'react';
import AddPoll from './add-poll';
import AddMedia from './add-media';
import MediaIcon from '../../../assets/images/media.png';
import PollIcon from '../../../assets/images/poll.png';
import { omit } from 'lodash';
import { useCreatePost } from '../shared';

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

  const removeResponses = () => set((prev) => omit(prev, 'responses'));

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
        <Dialog isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content maxHeight='90vh' h={contentHeight}>
              <Dialog.Header
                position='fixed'
                t={0}
                borderBottom={1}
                borderColor='base100'
              >
                <Box p='relative'>
                  <HStack
                    position='absolute'
                    l={0}
                    r={0}
                    t={0}
                    b={0}
                    flex={1}
                    items='center'
                    justify='center'
                    css={{ zIndex: -1 }}
                  >
                    <Heading
                      as='h2'
                      size={4}
                      css={{ textAlign: 'center' }}
                    >
                      Create Post
                    </Heading>
                  </HStack>
                </Box>
              </Dialog.Header>
              <Dialog.Body>
                <VStack py={4} gap={4} h='calc(100% - 128px)'>
                  <HStack gap={3}>
                    <Avatar
                      size='lg'
                      variant='squircle'
                      src={currentUser.avatar}
                    />
                    <VStack gap={1}>
                      <Text weight={500}>{currentUser.displayName}</Text>
                      <Button
                        leftIcon='global-outline'
                        size='sm'
                        variant='ghost'
                      >
                        Everyone
                      </Button>
                    </VStack>
                  </HStack>
                  <VStack
                    h='100%'
                    justify='space-between'
                    overflowY='scroll'
                  >
                    <Box flex={1} as='label'>
                      <StyledTextarea
                        autoFocus
                        css={{ padding: 0 }}
                        value={state.description}
                        onChange={(
                          e: ChangeEvent<HTMLTextAreaElement>,
                        ) => {
                          update({ description: e.target.value });
                        }}
                        fontSize={switchState ? 'sm' : 'lg'}
                        minLines={1}
                        maxLines={3}
                        maxLength={150}
                        variant='unstyled'
                        placeholder={
                          option === 'poll'
                            ? 'What do you want to find out from your fans?'
                            : 'What do you want your fans to know?'
                        }
                      />
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
              </Dialog.Body>
              <Dialog.Footer
                position='fixed'
                b={0}
                bgColor='primary400'
                direction='vertical'
                gap={4}
                px={0}
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
                    <Text weight={500}>Add to your post</Text>
                    <HStack gap={4}>
                      <Box
                        onClick={() => {
                          turnOn();
                          setContentHeight(DIALOG_CONTENT_HEIGHT['media']);
                          onOpen('media');
                        }}
                      >
                        <Image size={30} src={MediaIcon} alt='' />
                      </Box>
                      <Box
                        onClick={() => {
                          turnOn();
                          setContentHeight(DIALOG_CONTENT_HEIGHT['poll']);
                          onOpen('poll');
                        }}
                      >
                        <Image size={30} src={PollIcon} alt='' />
                      </Box>
                    </HStack>
                  </HStack>
                  <CircularProgress
                    value={Math.ceil(
                      (state.description.length / 150) * 100,
                    )}
                  />
                </HStack>
                <Box px={4}>
                  <Button
                    isLoading={loading}
                    loadingText={loading ? '' : 'Posting'}
                    disabled={checkIsDisabled()}
                    fullWidth
                    onClick={async () => {
                      const data = await createPost(state);
                      if (data) {
                        onClose();
                      }
                    }}
                    className={extraBtnPadding()}
                  >
                    Post
                  </Button>
                </Box>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>
      )}
    </>
  );
}
CreatePostDialog.displayName = 'CreatePostDialog';

export default CreatePostDialog;
