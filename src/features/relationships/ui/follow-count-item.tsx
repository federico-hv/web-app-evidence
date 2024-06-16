import { Box } from '@holdr-ui/react';
import millify from 'millify';
import { TextGroup, TextGroupSubheading } from '../../../shared';

interface FollowCountItemProps {
  onClick?: VoidFunction;
  count: number;
  label: string;
}

function FollowCountItem({ count, label, onClick }: FollowCountItemProps) {
  return (
    <Box onClick={onClick}>
      <TextGroup direction='horizontal' fontSize={4} gap={1}>
        <TextGroupSubheading weight={500}>
          {millify(count, { precision: 2 })}
        </TextGroupSubheading>
        <TextGroupSubheading weight={300} color='white700'>
          {label}
        </TextGroupSubheading>
      </TextGroup>
    </Box>
  );
}
FollowCountItem.dipslayName = 'FollowCountItem';

export default FollowCountItem;
