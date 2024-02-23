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
import { CreateFeedContextProvider } from './context';
import { defaultArticleState, defaultPostState } from './constants';
import { PostType } from './types';

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
  const { switchState: badLink, turnOn: onBadLink, turnOff } = useSwitch();

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
    reset();
    turnOff();
  };

  return (
    <CreateFeedContextProvider
      value={{
        close,
        websiteUrl,
        handleOnWebsiteChange,
        resetWebsiteUrl,
        badLink,
        onBadLink,
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
                backgroundColor: '#1A1A29',
                transition: 'all 0.35s ease-in-out',
              }}
            >
              <DialogHeader gap={0} css={{ backgroundColor: '#1A1A29' }}>
                <DialogClose />
                <HStack items='center' gap={4}>
                  <Avatar variant='squircle' size='lg' src='' name='' />
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
                css={{ backgroundColor: '#1A1A29' }}
              >
                <Box
                  h='1px'
                  w='100%'
                  css={{ backgroundColor: 'rgba(204, 204, 204, 0.10)' }}
                />
                <Stack gap={3}>
                  <Button
                    onClick={close}
                    className={makeButtonLarger('2.5rem', '15px')}
                    colorTheme='white500'
                    variant='ghost'
                    fullWidth
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
