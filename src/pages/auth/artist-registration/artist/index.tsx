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
import { SocialLogin } from 'pages';
import { ImageUpload } from 'components';

export function StepperForm() {
  const [page, setPage] = useState(0);

  const initialValues: FormValues = {
    email: '',
    name: '',
    birthday: '',
    artistName: '',
    username: '',
    password: '',
    confirmPassword: '',
    image: '',
  };

  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const handleUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
  };

  const handleSubmit = (values: FormValues) => {
    values.image = imageUrl;
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
            {page === 2 && (
              <ImageUpload onUpload={handleUpload} imageUrl={imageUrl} />
            )}
            {page === 0 && (
              <>
                <RegisterParagraph>
                  Sign up with your socials
                </RegisterParagraph>
                <SocialLogin />
              </>
            )}
            <ProgressBar>
              <ProgressBarDiv page={page} />
            </ProgressBar>
            {page === 0 && (
              <>
                <RegisterParagraph>
                  Or continue with your socials
                </RegisterParagraph>
              </>
            )}

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
