import {
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../index';
import { EmptyMessageProps } from './types';

function EmptyMessage({ title, subtitle }: EmptyMessageProps) {
  return (
    <TextGroup items='center'>
      <TextGroupHeading size={{ '@bp1': 2, '@bp3': 3 }}>
        {title}
      </TextGroupHeading>
      <TextGroupSubheading
        size={{ '@bp1': 1, '@bp3': 2 }}
        color='base400'
        weight={500}
        css={{ textAlign: 'center' }}
      >
        {subtitle}
      </TextGroupSubheading>
    </TextGroup>
  );
}
EmptyMessage.displayName = 'EmptyMessage';

export default EmptyMessage;
