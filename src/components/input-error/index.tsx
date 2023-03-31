import { StyledError } from './input-error.styles';
import { ErrorProps } from './input-error.types';

export const Error = ({ error }: ErrorProps) => {
  if (!error) {
    return null;
  }

  return <StyledError>{error}</StyledError>;
};
