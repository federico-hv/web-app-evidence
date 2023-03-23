import {
  NavigationWrapper,
  NavigationContainer,
  NavigationLogo,
} from './navigation.style';
import { Button } from 'components';
import logo from './../../assets/Logo.png';

export function Navigation() {
  return (
    <NavigationWrapper>
      <NavigationContainer>
        <NavigationLogo src={logo} alt='logo' />
        <Button class='tertiary'>Log In</Button>
      </NavigationContainer>
    </NavigationWrapper>
  );
}
