import { useState } from 'react';
import { Formik, Form } from 'formik';
import { FormValues } from 'shared';
import { ProgressBar, ProgressBarDiv, StyledForm } from './index.styles';
import { StepThree } from './step-three';
import { StepTwo } from './step-two';
import { StepOne } from './step-one';
import { StepFour } from './step-four';
import { validationSchema } from '../validation';
import { RegisterParagraph } from '../register.style';

export function StepperForm() {
  const [page, setPage] = useState(0);

  const initialValues: FormValues = {
    email: '',
    name: '',
    dateOfBirth: '',
    displayName: '',
    username: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = (values: FormValues) => {
    console.log(values, 'result');
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, values, isSubmitting }) => {
        return (
          <>
            <ProgressBar>
              <ProgressBarDiv page={page} />
            </ProgressBar>
            <RegisterParagraph>
              Or continue with your socials
            </RegisterParagraph>
            <StyledForm>
              <Form>
                {page === 0 && (
                  <StepOne
                    values={values}
                    errors={errors}
                    setPage={setPage}
                  />
                )}
                {page === 1 && (
                  <StepTwo
                    values={values}
                    errors={errors}
                    setPage={setPage}
                  />
                )}
                {page === 2 && (
                  <StepThree
                    values={values}
                    errors={errors}
                    setPage={setPage}
                  />
                )}
                {page === 3 && (
                  <StepFour
                    values={values}
                    errors={errors}
                    setPage={setPage}
                    isSubmitting={isSubmitting}
                  />
                )}
              </Form>
            </StyledForm>
          </>
        );
      }}
    </Formik>
  );
}
