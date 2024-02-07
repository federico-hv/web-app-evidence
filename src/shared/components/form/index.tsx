import { Formik, FormikValues, useFormikContext } from 'formik';
import { FormInputProps } from '../form-input/form-input.types';
import { GenericProps } from '../../interfaces';
import { FormEvent } from 'react';
import { Button, ButtonProps, VStack } from '@holdr-ui/react';
import { FormProps } from './types';
import { isInputDisabled } from '../../utilities';

/**
 * Work in progress
 */

function Form<T extends FormikValues>({
  initialValues,
  onSubmit,
  validationSchema,
  children,
}: FormProps<T>) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <InnerForm>{children}</InnerForm>
    </Formik>
  );
}
Form.displayName = 'Form';

function InnerForm({ children }: GenericProps) {
  const { handleSubmit } = useFormikContext();

  return (
    <VStack
      as='form'
      py={4}
      gap={4}
      h='full'
      justify='space-between'
      onSubmit={(e) => handleSubmit(e as FormEvent<HTMLFormElement>)}
    >
      {children}
    </VStack>
  );
}
InnerForm.displayName = 'Form_InnerForm';

function FormInput(props: FormInputProps) {
  return <FormInput {...props} />;
}
FormInput.displayName = 'Form_FormInput';

type FormButtonProps = ButtonProps & {
  keys: string[];
};

function FormButton({ keys, ...props }: FormButtonProps) {
  const { values, errors } = useFormikContext();

  return (
    <Button
      disabled={isInputDisabled(values as Record<any, any>, errors, keys)}
      {...props}
    />
  );
}
FormButton.displayName = 'Form_FormButton';

Form.Input = FormInput;
Form.Button = FormButton;

export { FormInput, FormButton };
export default Form;
