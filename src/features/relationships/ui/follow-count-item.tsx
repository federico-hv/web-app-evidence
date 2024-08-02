import { Box } from '@holdr-ui/react';
import millify from 'millify';
import { TextGroup, TextGroupSubheading } from '../../../shared';
import { TextProps } from '@holdr-ui/react/dist/components/text/src/text.types';

interface FollowCountItemProps {
  onClick?: VoidFunction;
  count: number;
  label: string;
  labelOneSize?: string;
  labelTwoSize?: string;
}

function FollowCountItem({
  count,
  label,
  onClick,
  countProps,
  labelProps,
}: FollowCountItemProps & {
  labelProps?: TextProps;
  countProps?: TextProps;
}) {
  return (
    <Box onClick={onClick}>
      <TextGroup direction='horizontal' fontSize={4} gap={1}>
        <TextGroupSubheading weight={500} {...countProps}>
          {millify(count, { precision: 2 })}
        </TextGroupSubheading>
        <TextGroupSubheading weight={300} color='white700' {...labelProps}>
          {label}
        </TextGroupSubheading>
      </TextGroup>
    </Box>
  );
}
FollowCountItem.dipslayName = 'FollowCountItem';

export default FollowCountItem;
