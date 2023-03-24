import { Button } from 'components';
import { SocialButtonProps } from './social-button.type';

export function SocialButton(props: SocialButtonProps) {
  const { children } = props;
  return <Button {...props}>{children}</Button>;
}
