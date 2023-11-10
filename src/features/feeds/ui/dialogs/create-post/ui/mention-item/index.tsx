import { Box, Text } from '@holdr-ui/react';
import { UserModel } from 'shared';
import { mentionOption, selectedMentionOption } from '../styles';

export default function MentionItem({
  data,
  selected,
}: {
  data: UserModel;
  selected: boolean;
}) {
  return (
    <Box _hover={{ cursor: 'pointer' }}>
      <Text
        size={3}
        {...(selected && { weight: 600, color: 'secondary400' })}
        className={selected ? selectedMentionOption() : mentionOption()}
      >
        {data.username}
      </Text>
    </Box>
  );
}
