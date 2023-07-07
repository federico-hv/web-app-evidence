import { Box, Center, Text } from '@holdr-ui/react';
import { ContentBoxProps } from './types';

function ContentBox({ children }: ContentBoxProps) {
  return (
    <Box mt={3}>
      <Center bgColor='base100' py={4} radius={2}>
        <Text role='contentinfo' size={2} weight={500} casing='uppercase'>
          {children}
        </Text>
      </Center>
    </Box>
  );
}
ContentBox.displayName = 'ContentBox';

export default ContentBox;
