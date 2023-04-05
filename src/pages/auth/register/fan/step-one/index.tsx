import { Formik, Form, Field, ErrorMessage, FormikValues } from 'formik';
import { Input } from 'components';
import { Button } from 'components';
import { StepProps } from 'shared';
import emailIcon from '../../../../assets/email.png';

export function StepOne({ values, errors, setPage }: StepProps) {
  return (
    <>
      <Input
        value={values.email}
        error={errors.email}
        name='email'
        placeholder='Email'
        icon={<img src={emailIcon} />}
      />
      <Button
        class={values.email && !errors.email ? 'primary' : 'disabled'}
        type='button'
        onClick={() => setPage(1)}
      >
        Next
      </Button>
    </>
  );
}
