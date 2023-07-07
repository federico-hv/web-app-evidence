import { Stack, Text, Heading } from '@holdr-ui/react';
// Need to start exporting this properly
import {
  TextGroupHeadingProps,
  TextGroupProps,
  TextGroupSubheadingProps,
  TextGroupSCNames,
} from './types';
import { getSubComponent } from '../../common';

function TextGroup({ children, ...props }: TextGroupProps) {
  const TextGroupHeadings = getSubComponent<TextGroupSCNames>(
    children,
    'TextGroupHeading',
  );
  const TextGroupSubheadings = getSubComponent<TextGroupSCNames>(
    children,
    'TextGroupSubheading',
  );
  return (
    <Stack direction='vertical' gap={2} w='100%' {...props}>
      {TextGroupHeadings}
      {TextGroupSubheadings}
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
