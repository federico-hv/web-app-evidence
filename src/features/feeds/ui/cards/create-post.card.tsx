import { Avatar, Box, Card, Text, VStack } from '@holdr-ui/react';
import { useCurrentUser } from '../../../auth';
import { Error, useDialogContext } from '../../../../shared';

function CreatePostCard() {
  const currentUser = useCurrentUser();
  const { onOpen } = useDialogContext();

  return (
    <Error hasError={!currentUser} errorEl={<></>}>
      {currentUser && (
        <Box
          radius={4}
          css={{
            border: '1px solid rgba(152, 152, 255, 0.10)',
            background:
              'radial-gradient(50% 100% at 50% 100%, rgba(133, 133, 255, 0.15) 0%, rgba(133, 133, 255, 0.05) 100%)',
            boxShadow: '0px 0px 50px 0px rgba(0, 0, 0, 0.25)',
          }}
        >
          <Card w='full' gap={4} p={2}>
            <Card.Body direction='horizontal' gap={2} items='center'>
              <Avatar
                variant='squircle'
                src={currentUser.avatar}
                css={{ size: '32px' }}
                name={currentUser.displayName}
              />
              <VStack
                as='button'
                items='flex-start'
                justify='center'
                w='full'
                px={{ '@bp1': 3, '@bp3': 4 }}
                radius={1}
                h={{ '@bp1': 24, '@bp3': '32px' }}
                cursor='pointer'
                css={{
                  background: 'rgba(152, 152, 255, 0.15)',
                }}
                onClick={onOpen}
              >
                <Text
                  noOfLines={1}
                  color='base300'
                  size={{ '@bp1': '12px', '@bp3': '14px' }}
                >
                  Share something with your fans
                </Text>
              </VStack>
            </Card.Body>
          </Card>
        </Box>
      )}
    </Error>
  );
}
CreatePostCard.displayName = 'CreatePostCard';

export default CreatePostCard;
