import {
  Avatar,
  Box,
  Card,
  HStack,
  Image,
  Text,
  VStack,
} from '@holdr-ui/react';
import { useCurrentUser } from '../../auth';
import {
  Error,
  Responsive,
  ResponsiveItem,
  useDialogTabContext,
} from '../../../shared';

import MediaIcon from '../../../assets/images/media.png';
import PollIcon from '../../../assets/images/poll.png';
import NewsIcon from '../../../assets/images/news.png';

function ActionButton({
  logo,
  label,
  onClick,
}: {
  label: string;
  logo: string;
  onClick?: VoidFunction;
}) {
  return (
    <HStack
      items='center'
      radius={3}
      cursor='pointer'
      justify='center'
      gap={4}
      flex={1}
      onClick={onClick}
      h={40}
      _hover={{ backgroundColor: '$base100' }}
    >
      <Image size={20} src={logo} alt='media icon' />
      <Responsive>
        <ResponsiveItem tablet='show' laptop='show' desktop='show'>
          <Text color='base400' weight={500}>
            {label}
          </Text>
        </ResponsiveItem>
      </Responsive>
    </HStack>
  );
}

function CreatePostPlaceholder({
  onClick,
}: {
  onClick: (option: string) => void;
}) {
  return (
    <VStack
      justify='center'
      bgColor='base100'
      w='full'
      px={4}
      radius={4}
      h={{ '@bp1': 32, '@bp3': 40 }}
      border={1}
      borderColor='base200'
      cursor='pointer'
      onClick={() => onClick('')}
    >
      <Text noOfLines={1} color='base400' size={{ '@bp1': 2, '@bp3': 3 }}>
        What do you want your fans to know?
      </Text>
    </VStack>
  );
}

function CreatePostCard() {
  const currentUser = useCurrentUser();
  const { onOpen } = useDialogTabContext();

  return (
    <Error hasError={!currentUser} errorEl={<></>}>
      {currentUser && (
        <Card
          bgColor='primary400'
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
            <CreatePostPlaceholder onClick={onOpen} />
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
            <ActionButton
              onClick={() => onOpen('media')}
              logo={MediaIcon}
              label='Media'
            />
            <ActionButton
              onClick={() => onOpen('poll')}
              logo={PollIcon}
              label='Poll'
            />
            <ActionButton
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
