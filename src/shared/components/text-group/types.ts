import { StackProps } from '@holdr-ui/react/dist/components/stack/src/stack.types';
import { HeadingProps } from '@holdr-ui/react/dist/components/heading/src/heading.types';
import { TextProps } from '@holdr-ui/react/dist/components/text/src/text.types';

export type TextGroupSCNames = 'TextGroupSubheading' | 'TextGroupHeading';

export interface TextGroupProps extends StackProps {
  dummy?: string;
}
export interface TextGroupHeadingProps extends HeadingProps {
  dummy?: string;
}
export interface TextGroupSubheadingProps extends TextProps {
  dummy?: string;
}
