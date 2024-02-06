import { Avatar, Box, Card, Text, VStack } from '@holdr-ui/react';
import { useCurrentUser } from '../../../auth';
import { Error, useDialogTabContext } from '../../../../shared';
function CreatePostCard() {
  const currentUser = useCurrentUser();
  const { onOpen } = useDialogTabContext();

  return (
    <Error hasError={!currentUser} errorEl={<></>}>
      {currentUser && (
        <Box
          radius={4}
          css={{
            border: '1px solid rgba(152, 152, 255, 0.10)',
            background:
              'radial-gradient(50% 100% at 50% 100%, rgba(133, 133, 255, 0.15) 0%, rgba(133, 133, 255, 0.05) 100%)',
            //background:
            //'radial-gradient(50% 100% at 50% 100%, rgba(133, 133, 255, 0.15) 0%, rgba(133, 133, 255, 0.05) 100%), linear-gradient(rgba(208, 208, 255, 0.08) 0%, rgba(208, 208, 255, 0.01) 100%)',
            boxShadow: '0px 0px 50px 0px rgba(0, 0, 0, 0.25)',
          }}
        >
          <Card w='full' gap={4} p={3}>
            <Card.Body direction='horizontal' gap={3} items='center'>
              <Avatar
                variant='squircle'
                src={currentUser.avatar}
                css={{ size: '32px' }}
              />
              <VStack
                as='button'
                items='flex-start'
                justify='center'
                w='full'
                px={{ '@bp1': 3, '@bp3': 4 }}
                radius={3}
                h={{ '@bp1': 24, '@bp3': '32px' }}
                cursor='pointer'
                css={{
                  background: 'rgba(152, 152, 255, 0.15)',
                }}
                onClick={() => onOpen('')}
              >
                <Text
                  noOfLines={1}
                  color='base300'
                  size={{ '@bp1': 2, '@bp3': 3 }}
                >
                  What do you want your fans to know?
                </Text>
              </VStack>
            </Card.Body>
            {/*<Card.Footer*/}
            {/*  direction='horizontal'*/}
            {/*  gap={3}*/}
            {/*  px={4}*/}
            {/*  pb={4}*/}
            {/*  css={{*/}
            {/*    justifyContent: 'space-evenly',*/}
            {/*  }}*/}
            {/*>*/}
            {/*  <AddToPostButton*/}
            {/*    onClick={() => onOpen('media')}*/}
            {/*    logo={MediaIcon}*/}
            {/*    label='Media'*/}
            {/*  />*/}
            {/*  <AddToPostButton*/}
            {/*    onClick={() => onOpen('poll')}*/}
            {/*    logo={PollIcon}*/}
            {/*    label='Poll'*/}
            {/*  />*/}
            {/*  <AddToPostButton*/}
            {/*    onClick={() => onOpen('article')}*/}
            {/*    logo={NewsIcon}*/}
            {/*    label='Article'*/}
            {/*  />*/}
            {/*</Card.Footer>*/}
          </Card>
        </Box>
      )}
    </Error>
  );
}
CreatePostCard.displayName = 'CreatePostCard';

export default CreatePostCard;
