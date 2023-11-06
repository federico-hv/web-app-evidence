import { Stack, Text, Heading } from '@holdr-ui/react';
import {
  TextGroupHeadingProps,
  TextGroupProps,
  TextGroupSubheadingProps,
} from './types';

function TextGroup({
  children,
  direction = 'vertical',
  ...props
}: TextGroupProps) {
  return (
    <Stack direction={direction} gap={2} w='100%' {...props}>
      {children}
    </Stack>
  );
}
TextGroup.displayName = 'TextGroup';

const TextGroupHeading = ({
  children,
  ...props
}: TextGroupHeadingProps) => {
  return (
    <Heading as='h1' weight={500} size={4} {...props}>
      {children}
    </Heading>
  );
};
TextGroupHeading.displayName = 'TextGroupHeading';

const TextGroupSubheading = ({
  children,
  ...props
}: TextGroupSubheadingProps) => {
  return <Text {...props}>{children}</Text>;
};
TextGroupSubheading.displayName = 'TextGroupSubheading';

TextGroup.Heading = TextGroupHeading;
TextGroup.Subheading = TextGroupSubheading;

export { TextGroupHeading, TextGroupSubheading };

export default TextGroup;
