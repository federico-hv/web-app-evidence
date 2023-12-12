import { Button, VStack } from '@holdr-ui/react';
import { ArticleSchema } from '../../shared';
import { Formik } from 'formik';
import { FormEvent } from 'react';
import {
  CustomCommonDialogButtonWrapper,
  FormInput,
  extraBtnPadding,
  isInputDisabled,
  useGeneralContext,
  useStepperContext,
} from 'shared';

function CreateArticleForm() {
  const { increment } = useStepperContext();
  const { update } = useGeneralContext();

  return (
    <Formik
      initialValues={{
        title: '',
        url: '',
        image: '',
        description: '',
      }}
      validationSchema={ArticleSchema}
      onSubmit={(data, { resetForm }) => {
        update({
          data: {
            ...data,
            ...{
              images: [{ url: data.image }],
              site: {
                logo: `https://www.google.com/s2/favicons?domain=${data.url}&sz=256`,
                name: new URL(data.url).host.replace('www.', ''),
              },
            },
          },
        });
        resetForm();
        increment();
      }}
    >
      {({ values, errors, handleSubmit }) => (
        <VStack
          as='form'
          pt={4}
          gap={3}
          h='fit-content'
          justify='space-between'
          onSubmit={(e) => handleSubmit(e as FormEvent<HTMLFormElement>)}
          overflow='scroll'
        >
          <FormInput label='Title' name='title' type='text' autoFocus />
          <FormInput label='Website URL' name='url' type='text' />
          <FormInput label='Image URL' name='image' type='text' />
          <FormInput
            label='Description'
            name='description'
            type='textarea'
          />
          <CustomCommonDialogButtonWrapper>
            <Button
              type='submit'
              className={extraBtnPadding()}
              disabled={isInputDisabled(values, errors, [
                'title',
                'url',
                'image',
                'description',
              ])}
              fullWidth
            >
              Submit
            </Button>
          </CustomCommonDialogButtonWrapper>
        </VStack>
      )}
    </Formik>
  );
}

CreateArticleForm.displayName = 'CreateArticleForm';
export default CreateArticleForm;
