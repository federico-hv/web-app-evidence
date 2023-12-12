import { URLSchema, useCreateOgMetadata } from '../../shared';
import {
  CustomCommonDialogButtonWrapper,
  extraBtnPadding,
  FormInput,
  isInputDisabled,
  useGeneralContext,
  useStepperContext,
} from '../../../../shared';
import { Alert, Button, VStack } from '@holdr-ui/react';
import { Formik } from 'formik';
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
      <VStack>
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
              pt={4}
              gap={1}
              h='fit-content'
              justify='space-between'
              onSubmit={(e) =>
                handleSubmit(e as FormEvent<HTMLFormElement>)
              }
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
      </VStack>
    </>
  );
}
ConvertUrlForm.displayName = 'ConvertUrlForm';

export default ConvertUrlForm;
