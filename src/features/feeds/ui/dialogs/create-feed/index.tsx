import { useState } from 'react';
import { useCurrentUser } from '../../../../auth';
import { CreateArticleInput, CreatePostInput } from '../../../shared';
import {
  makeButtonLarger,
  StepperContextProvider,
  useDialogContext,
  useRecordState,
} from '../../../../../shared';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  HStack,
  Stack,
  THEME_COLOR,
  Text,
  useCounter,
  useInputChange,
  useSwitch,
} from '@holdr-ui/react';
import {
  CreateArticle,
  CreateArticleButton,
  CreatePost,
  CreatePostButton,
} from './ui';
import {
  CreateFeedContextProvider,
  defaultArticleState,
  defaultPostState,
} from './shared';
import { PostType } from './shared';

function CreateFeedDialog() {
  const currentUser = useCurrentUser();
  const { isOpen, onOpen, onClose } = useDialogContext();
  const {
    value: websiteUrl,
    handleOnChange: handleOnWebsiteChange,
    resetValue: resetWebsiteUrl,
  } = useInputChange('');
  const [articleState, updateArticleState] =
    useRecordState<CreateArticleInput>(defaultArticleState);
  const [postState, updatePostState, setPostState] =
    useRecordState<CreatePostInput>(defaultPostState);
  const [type, setType] = useState<PostType | undefined>();
  const { current, increment, decrement, reset } = useCounter();
  const {
    switchState: badLink,
    turnOn: onBadLink,
    turnOff: onGoodLink,
  } = useSwitch();

  const toggleType = (next: PostType) => {
    if (type === next) {
      // remove the type
      setType(undefined);
      if (next === 'with-poll') {
        setPostState(({ responses, ...rest }) => ({ ...rest }));
      }
    } else {
      setType(next);
    }
  };

  const close = () => {
    onClose();
    setType(undefined);
    updateArticleState(defaultArticleState);
    updatePostState(defaultPostState);
    reset();
    onGoodLink();
  };

  const cancelButtonSize = makeButtonLarger('3.0rem', '16px');

  return (
    <CreateFeedContextProvider
      value={{
        close,
        websiteUrl,
        handleOnWebsiteChange,
        resetWebsiteUrl,
        badLink,
        onBadLink,
        onGoodLink,
        articleState,
        updateArticleState,
        postState,
        updatePostState,
        type,
        toggleType,
      }}
    >
      {currentUser && (
        <Dialog
          ariaDescribedBy=''
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={close}
        >
          <DialogPortal>
            <DialogOverlay bgColor='darkTint500' zIndex={10} />
            <DialogContent
              zIndex={10}
              radius={2}
              w={608}
              css={{
                backgroundColor: '#30304b',
                transition: 'all 0.35s ease-in-out',
              }}
              py={3}
              px={4}
            >
              <DialogHeader gap={0} css={{ backgroundColor: '#30304b' }}>
                <DialogClose />
                <HStack items='center' gap={4}>
                  <Avatar variant='squircle' size='base' src='' name='' />
                  <Text color='white500' size={6}>
                    {currentUser.displayName}
                  </Text>
                </HStack>
              </DialogHeader>
              <DialogBody>
                {type !== 'as-article' && <CreatePost />}
                {type === 'as-article' && (
                  <StepperContextProvider
                    value={{
                      currentStep: current,
                      increment,
                      decrement,
                      reset,
                    }}
                  >
                    <CreateArticle />
                  </StepperContextProvider>
                )}
              </DialogBody>
              <DialogFooter
                b={0}
                direction='vertical'
                gap={4}
                zIndex={10}
                css={{ backgroundColor: '#30304b' }}
              >
                <Box
                  h='1px'
                  w='100%'
                  css={{ backgroundColor: 'rgba(204, 204, 204, 0.10)' }}
                />
                <Stack direction='vertical' gap={3}>
                  <Button
                    onClick={close}
                    className={cancelButtonSize}
                    colorTheme='white500'
                    variant='ghost'
                    fullWidth
                    style={{
                      border: `0.75px solid ${THEME_COLOR.white700}`,
                    }}
                  >
                    Cancel
                  </Button>
                  {type === 'as-article' && (
                    <StepperContextProvider
                      value={{
                        currentStep: current,
                        increment,
                        decrement,
                        reset,
                      }}
                    >
                      <CreateArticleButton />
                    </StepperContextProvider>
                  )}
                  {type !== 'as-article' && <CreatePostButton />}
                </Stack>
              </DialogFooter>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      )}
    </CreateFeedContextProvider>
  );
}
CreateFeedDialog.displayName = 'CreateFeedDialog';

export default CreateFeedDialog;
