import { StyledButton } from './button.style';
import { ButtonProps } from './button.type';

export function Button(props: ButtonProps) {
  const { children } = props;
  return <StyledButton {...props}>{children}</StyledButton>;
}
