import { StyledButton } from './button.style';
import { ButtonProps } from 'shared';

export function Button({ children, onClick, type }: ButtonProps) {
  return (
    <StyledButton onClick={onClick} type={type}>
      {children}
    </StyledButton>
  );
}
