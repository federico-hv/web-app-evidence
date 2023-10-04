import { Avatar, Box, Card, Text, VStack } from '@holdr-ui/react';
import { useCurrentUser } from '../../../auth';
import { Error, useDialogTabContext } from '../../../../shared';
import { AddToPostButton } from '../buttons';

import MediaIcon from '../../../../assets/images/media.png';
import PollIcon from '../../../../assets/images/poll.png';
import NewsIcon from '../../../../assets/images/news.png';

function CreatePostCard() {
  const currentUser = useCurrentUser();
  const { onOpen } = useDialogTabContext();

  return (
    <Error hasError={!currentUser} errorEl={<></>}>
      {currentUser && (
        <Card
          css={{ backgroundColor: '#fbfaf2' }}
          minHeight={100}
          w='full'
          gap={4}
          divider={<Box borderBottom={1} borderColor='base100' />}
        >
          <Card.Body
            direction='horizontal'
            px={4}
            pt={4}
            gap={3}
            items='center'
          >
            <Avatar
              size={{ '@bp1': 'sm', '@bp3': 'base' }}
              variant='squircle'
              src={currentUser.avatar}
            />
            <VStack
              as='button'
              items='flex-start'
              justify='center'
              bgColor='base100'
              w='full'
              px={4}
              radius={4}
              h={{ '@bp1': 32, '@bp3': 40 }}
              border={1}
              borderColor='base200'
              cursor='pointer'
              onClick={() => onOpen('')}
            >
              <Text
                noOfLines={1}
                color='base400'
                size={{ '@bp1': 2, '@bp3': 3 }}
              >
                What do you want your fans to know?
              </Text>
            </VStack>
          </Card.Body>
          <Card.Footer
            direction='horizontal'
            gap={3}
            px={4}
            pb={4}
            css={{
              justifyContent: 'space-evenly',
            }}
          >
            <AddToPostButton
              onClick={() => onOpen('media')}
              logo={MediaIcon}
              label='Media'
            />
            <AddToPostButton
              onClick={() => onOpen('poll')}
              logo={PollIcon}
              label='Poll'
            />
            <AddToPostButton
              onClick={() => onOpen('article')}
              logo={NewsIcon}
              label='Article'
            />
          </Card.Footer>
        </Card>
      )}
    </Error>
  );
}
CreatePostCard.displayName = 'CreatePostCard';

export default CreatePostCard;
