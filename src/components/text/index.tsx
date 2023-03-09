import { TextWrapper } from './text.style';
import { TextProps } from 'shared';

export function Text({ children, className, size, uppercase }: TextProps) {
  return (
    <TextWrapper size={size} className={className} uppercase={uppercase}>
      {children}
    </TextWrapper>
  );
}
