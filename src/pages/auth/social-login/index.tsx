import { SocialButton } from 'components';
import { SocialLoginWrapper } from './social-login.styles';
import googleImg from '../../../assets/google.png';
import spotifyImg from '../../../assets/spotify.png';
import appleImg from '../../../assets/apple.png';

export function SocialLogin() {
  return (
    <SocialLoginWrapper>
      <SocialButton onClick={() => console.log('google-login')}>
        <img src={googleImg} alt='google-image' />
      </SocialButton>
      <SocialButton onClick={() => console.log('spotify-login')}>
        <img src={spotifyImg} alt='spotify-image' />
      </SocialButton>
      <SocialButton onClick={() => console.log('apple-login')}>
        <img src={appleImg} alt='apple-image' />
      </SocialButton>
    </SocialLoginWrapper>
  );
}
