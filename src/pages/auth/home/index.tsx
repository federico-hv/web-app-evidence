import { Navigation } from 'components';
import { Text } from 'components';
import { HomeBox, HomeParagraph, HomeWrapper } from './home.style';
import { Button } from 'components';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <Navigation text='Log in' link={() => navigate('/login')} />
      <HomeWrapper>
        <Text size='h1' uppercase>
          Bridging music and community{' '}
        </Text>
        <HomeBox>
          <Text size='h2'>Sign Up</Text>
          <Button onClick={() => navigate('/register')} class='primary'>
            Continue as a Fan
          </Button>
          <Button
            onClick={() => navigate('/artist-register')}
            class='secondary'
          >
            Continue as an Artist
          </Button>
          {/* <Button class='neutral'>Continue as a Band</Button> */}
          <HomeParagraph>
            By continuing, you agree to the <span>Terms of Use</span> and{' '}
            <span>Privacy Policy</span>
          </HomeParagraph>
        </HomeBox>
      </HomeWrapper>
    </>
  );
}
