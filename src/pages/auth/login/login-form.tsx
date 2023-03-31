import { Formik, Form, FormikHelpers } from 'formik';
import { Button } from 'components';
import { Input } from 'components';
import { Link, StyledLoginForm } from './login.style';
import emailIcon from '../../../assets/email.png';
import passwordIcon from '../../../assets/password.png';
import { validationSchema } from './validations';

interface Values {
  email: string;
  password: string;
}

export function LoginForm() {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
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

        console.log(props);

        return (
          <StyledLoginForm>
            <Form onSubmit={handleSubmit}>
              <Input
                value={values.email}
                placeholder='Email'
                onChange={handleChange}
                name='email'
                error={errors.email}
                icon={<img src={emailIcon} />}
              />
              <Input
                value={values.password}
                placeholder='Password'
                name='password'
                isPassword
                onChange={handleChange}
                error={errors.password}
                icon={<img src={passwordIcon} />}
              />
              <Link href=''>Forgot Password</Link>
              <Button
                type='submit'
                class={
                  (values.email && values.password) || isSubmitting
                    ? 'primary'
                    : 'disabled'
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
