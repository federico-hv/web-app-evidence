import {
  Alert,
  Box,
  Button,
  Dialog,
  Heading,
  HStack,
  VStack,
} from '@holdr-ui/react';
import {
  extraBtnPadding,
  FormInput,
  GeneralContextProvider,
  isInputDisabled,
  OgMetadata,
  OgMetadataCard,
  Stepper,
  useDialogTabContext,
  useRecordState,
  useStepperContext,
} from '../../../shared';
import { Formik } from 'formik';
import { useGeneralContext } from '../../../shared';
import { useCreateArticle, useCreateOgMetadata } from '../shared';
import { URLSchema } from '../shared';
import { FormEvent } from 'react';

function ConvertUrlForm() {
  const { error, createOgMetadata, loading } = useCreateOgMetadata();
  const { update } = useGeneralContext();
  const { increment } = useStepperContext();

  return (
    <>
      {error && (
        <Alert status='danger' variant='subtle'>
          <Alert.Content>
            <Alert.Description>
              Oops. Something went wrong, maybe try again later.
            </Alert.Description>
          </Alert.Content>
        </Alert>
      )}
      <Formik
        initialValues={{ url: '' }}
        validationSchema={URLSchema}
        onSubmit={async ({ url }, { resetForm }) => {
          const data = await createOgMetadata(url);

          if (!error && data) {
            resetForm();
            update({ data });
            increment();
          }
        }}
      >
        {({ values, errors, handleSubmit }) => (
          <VStack
            as='form'
            py={4}
            gap={4}
            h='full'
            justify='space-between'
            onSubmit={(e) => handleSubmit(e as FormEvent<HTMLFormElement>)}
          >
            <FormInput
              label='Website URL'
              leftIcon='global-outline'
              name='url'
              type='text'
              autoFocus
            />
            <Button
              type='submit'
              isLoading={loading}
              loadingText={loading ? '' : 'Generating'}
              disabled={isInputDisabled(values, errors, ['url'])}
              className={extraBtnPadding()}
              fullWidth
            >
              Generate
            </Button>
          </VStack>
        )}
      </Formik>
    </>
  );
}

function Preview() {
  const { state }: { state: { data: OgMetadata } } = useGeneralContext();
  const { onClose } = useDialogTabContext();
  const { createArticle, loading, error } = useCreateArticle();

  return (
    <VStack py={4} h='full' justify='space-between'>
      <OgMetadataCard data={state.data} />
      <Button
        isLoading={loading}
        loadingText={loading ? '' : 'Posting'}
        onClick={async () => {
          await createArticle({
            title: state.data.title,
            description: state.data.description,
            imageUrl: state.data.images[0].url,
            url: state.data.url,
            site: {
              name: state.data.site.name,
              logo: state.data.site.logo,
            },
          });

          if (!error) {
            onClose();
          }
        }}
        className={extraBtnPadding()}
        fullWidth
      >
        Post
      </Button>
    </VStack>
  );
}

function AddArticleDialog() {
  const { isOpen, onOpen, onClose, option } = useDialogTabContext();
  const [state, update] = useRecordState({});

  return (
    <Dialog
      ariaDescribedBy='create-article-dialog__title'
      isOpen={isOpen}
      onOpen={() => onOpen(option)}
      onClose={onClose}
    >
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content
          position='relative'
          t={{ '@bp1': 69, '@bp3': '50%' }}
          h={{ '@bp1': '100vh', '@bp3': '37.5vh' }}
          maxHeight={{ '@bp1': '100vh', '@bp3': '85vh' }}
          radius={{ '@bp1': 0, '@bp3': 3 }}
          w={{ '@bp1': '100vw', '@bp3': '90vw' }}
        >
          <Dialog.Header borderBottom={1} borderColor='base100'>
            <Box w='calc(100% - 32px)' p='relative'>
              <HStack
                flex={1}
                items='center'
                ml={{ '@bp1': 0, '@bp3': -32 }}
                justify={{ '@bp1': 'flex-start', '@bp3': 'center' }}
                css={{ zIndex: -1 }}
              >
                <Heading
                  id='create-article-dialog__title'
                  as='h2'
                  size={{ '@bp1': 3, '@bp3': 4 }}
                  css={{ textAlign: 'center' }}
                >
                  Add Article
                </Heading>
              </HStack>
            </Box>
          </Dialog.Header>
          <Dialog.Body>
            <GeneralContextProvider
              value={{
                state: state,
                update: update,
              }}
            >
              <Stepper>
                <Stepper.Step step={0}>
                  <ConvertUrlForm />
                </Stepper.Step>
                <Stepper.Step step={1}>
                  <Preview />
                </Stepper.Step>
              </Stepper>
            </GeneralContextProvider>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

export default AddArticleDialog;
