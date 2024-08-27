import {
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../../shared';
import { Box, HStack } from '@holdr-ui/react';

function SectionHeader({
  required,
  title,
  subtitle,
}: {
  required?: boolean;
  title: string;
  subtitle: string;
}) {
  return (
    <TextGroup gap={0}>
      <HStack>
        <TextGroupHeading size={4}>{title}</TextGroupHeading>
        {required && (
          <Box
            color='danger200'
            css={{ fontSize: '$7', lineHeight: '100%' }}
          >
            *
          </Box>
        )}
      </HStack>
      <TextGroupSubheading size={1} color='white700'>
        {subtitle}
      </TextGroupSubheading>
    </TextGroup>
  );
}

export default SectionHeader;
