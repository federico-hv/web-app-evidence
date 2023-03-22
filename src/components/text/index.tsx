import { TextWrapper } from './text.style';
import { TextProps } from './text.type';

export function Text(props: TextProps) {
  const { children } = props;
  return <TextWrapper {...props}>{children}</TextWrapper>;
}
