import { useNavigate } from 'react-router-dom';
import { Navigation } from 'components';
import { SocialLogin } from 'pages';
import { LoginParagraph } from './login.style';
import { Text } from 'components';
import { LoginForm } from './login-form';
import { Paragraph, Line } from './login.style';
import { Layout } from 'components';

export function LoginPage() {
  const navigate = useNavigate();
  return (
    <>
      <Navigation text='Sign in' link={() => navigate('/')} />
      <Layout>
        <Text size='h2'>Log In</Text>
        <LoginParagraph>Continue with your socials</LoginParagraph>
        <SocialLogin />
        <Line />
        <LoginForm />
        <Paragraph>
          By continuing, you agree to the <span>Terms of Use</span> and{' '}
          <span>Privacy Policy</span>
        </Paragraph>
      </Layout>
    </>
  );
}
