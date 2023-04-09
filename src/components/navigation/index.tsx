import { Link } from 'react-router-dom';
import {
  NavigationWrapper,
  NavigationContainer,
  NavigationLogo,
} from './navigation.style';
import { Button } from 'components';
import { Link as NavigationLinkProps } from 'shared';
import logo from './../../assets/Logo.png';

export function Navigation(props: NavigationLinkProps) {
  const { text, link } = props;
  return (
    <NavigationWrapper>
      <NavigationContainer>
        <Link to='/'>
          <NavigationLogo src={logo} alt='logo' />
        </Link>
        <Button class='tertiary' onClick={link}>
          {text}
        </Button>
      </NavigationContainer>
    </NavigationWrapper>
  );
}
