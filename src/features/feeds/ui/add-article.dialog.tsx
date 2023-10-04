import { Alert, Box, Button, IconButton, VStack } from '@holdr-ui/react';
import {
  CommonDialog,
  CommonDialogContent,
  CommonDialogHeader,
  extraBtnPadding,
  FormInput,
  GeneralContextProvider,
  GenericProps,
  isInputDisabled,
  OgMetadata,
  OgMetadataCard,
  Stepper,
  useCounter,
  useDialogTabContext,
  useRecordState,
  useStepperContext,
} from '../../../shared';
import { Formik } from 'formik';
import { useGeneralContext } from '../../../shared';
import { useCreateArticle, useCreateOgMetadata } from '../shared';
import { URLSchema } from '../shared';
import { FormEvent } from 'react';

function CustomCommonDialogButtonWrapper({ children }: GenericProps) {
  return (
    <Box
      w='100%'
      borderTop={1}
      borderColor='base100'
      position='fixed'
      p={4}
      l={0}
      b={0}
      zIndex={10}
      css={{ backgroundColor: '#FFF' }}
    >
      {children}
    </Box>
  );
}

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
            <CustomCommonDialogButtonWrapper>
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
            </CustomCommonDialogButtonWrapper>
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
      <CustomCommonDialogButtonWrapper>
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
      </CustomCommonDialogButtonWrapper>
    </VStack>
  );
}

function BackButton() {
  const { decrement } = useStepperContext();

  return (
    <Box
      zIndex={100}
      t='1rem'
      l={{ '@bp1': '0.25rem', '@bp3': '1rem' }}
      position='fixed'
      css={{ backgroundColor: '#FFF' }}
    >
      <IconButton
        onClick={decrement}
        variant='ghost'
        icon='arrow-left-outline'
        ariaLabel='go back'
      />
    </Box>
  );
}

function AddArticleDialog() {
  const { isOpen, onOpen, onClose, option } = useDialogTabContext();
  const { increment, decrement, count: step } = useCounter();
  const [state, update] = useRecordState({});

  console.log(step);

  return (
    <CommonDialog
      ariaDescribedBy='add-article-dialog__title'
      isOpen={isOpen}
      onOpen={() => onOpen(option)}
      onClose={onClose}
    >
      <CommonDialogHeader label='Add Article' />
      <CommonDialogContent>
        <GeneralContextProvider
          value={{
            state: state,
            update: update,
          }}
        >
          <Stepper increment={increment} decrement={decrement} step={step}>
            <Stepper.Step step={0}>
              <ConvertUrlForm />
            </Stepper.Step>
            <Stepper.Step step={1}>
              <BackButton />
              <Preview />
            </Stepper.Step>
          </Stepper>
        </GeneralContextProvider>
      </CommonDialogContent>
    </CommonDialog>
  );
}

export default AddArticleDialog;
