import {
  NavigationWrapper,
  NavigationContainer,
  NavigationLogo,
} from './navigation.style';
import { Button } from 'components';
import { NavigationProps } from './navigation.type';
import logo from './../../assets/Logo.png';

export function Navigation(props: NavigationProps) {
  const { text, link } = props;
  return (
    <NavigationWrapper>
      <NavigationContainer>
        <NavigationLogo src={logo} alt='logo' />
        <Button class='tertiary' onClick={link}>
          {text}
        </Button>
      </NavigationContainer>
    </NavigationWrapper>
  );
}
