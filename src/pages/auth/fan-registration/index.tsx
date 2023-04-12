import { useNavigate } from 'react-router-dom';
import { Navigation } from 'components';
import { Text } from 'components';
import { Layout } from 'components';
import { Paragraph } from './register.style';
import { StepperForm } from './fan';

export function FanRegisterPage() {
  const navigate = useNavigate();
  return (
    <>
      <Navigation text='Log In' link={() => navigate('/login')} />
      <Layout>
        <Text size='h2'>Fan Registration</Text>
        <StepperForm />
        <Paragraph>
          By continuing, you agree to the <span>Terms of Use</span> and{' '}
          <span>Privacy Policy</span>
        </Paragraph>
      </Layout>
    </>
  );
}
