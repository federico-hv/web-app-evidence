import { Formik, Form, FormikHelpers } from 'formik';
import { Button } from 'components';
import { Input } from 'components';
import { Link, StyledLoginForm } from './login.style';

interface Values {
  email: string;
  password: string;
}

interface Errors {
  email?: string;
  password?: string;
}

export function LoginForm() {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={(values) => {
        // move it once API is integrated
        const errors: Errors = {};
        if (!values.password) {
          errors.password = 'Enter your password.';
        }
        if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Enter your email or mobile number.';
        }
        return errors;
      }}
      onSubmit={(
        values: Values,
        { setSubmitting }: FormikHelpers<Values>,
      ) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 500);
      }}
    >
      {(props) => {
        const {
          values,
          handleChange,
          setFieldValue,
          errors,
          touched, // to be used later
          isSubmitting, // to be used later
          handleSubmit,
        } = props;

        return (
          <StyledLoginForm>
            <Form onSubmit={handleSubmit}>
              <Input
                value={values.email}
                placeholder='Email'
                onChange={handleChange}
                name='email'
                error={errors.email}
              />
              <Input
                value={values.password}
                placeholder='Password'
                isPassword
                name='password'
                onChange={handleChange}
                error={errors.password}
              />
              <Link href=''>Forgot Password</Link>
              <Button
                type='submit'
                class={
                  !values.email || !values.password
                    ? 'disabled'
                    : 'primary'
                }
              >
                Log In
              </Button>
            </Form>
          </StyledLoginForm>
        );
      }}
    </Formik>
  );
}
