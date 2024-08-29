import {
  arrayFrom,
  Avatar,
  Box,
  Button,
  Circle,
  HStack,
  Icon,
  IconButton,
  Text,
  useOnValueChange,
  VStack,
} from '@holdr-ui/react';
import {
  AppearingContent,
  getRandomNumberInRange,
  lightTextareaStyles,
  Loader,
  makeButtonLarger,
  TextAreaField,
  UserModel,
} from '../../../../../shared';
import { useCurrentUser } from '../../../../auth';
import { AnimatePresence } from 'framer-motion';
import millify from 'millify';
import { UserRoleEnum } from '../../../../user';
import { FlatList } from '../../../../../tmp/flat-list';
import { Fragment, useRef, useState } from 'react';
import dayjs from 'dayjs';

interface IFeedComment {
  id: number;
  createdAt: Date;
  description: string;
  isLiked: boolean;
  numOfLikes: number;
  user: UserModel;
}

function UserFeedComment({
  onReply,
  data,
}: {
  data: IFeedComment;
  onReply: (reply: IFeedComment) => void;
}) {
  return (
    <HStack
      gap={2}
      css={{
        '&:hover .feedComment-optionButton': {
          display: 'flex',
        },
      }}
    >
      <Avatar
        key={data.user.displayName}
        src='https://i.pravatar.cc/50'
        //src={data.user.avatar}
        variant='squircle'
        size='sm'
        name={data.user.displayName}
      />
      <VStack gap={1}>
        <HStack gap={2}>
          <HStack items='center' gap={1}>
            <Text size={2} weight={500}>
              {data.user.displayName}
            </Text>
            <Icon name='verified-fill' color='purple500' />
            <Text size={2} color='white700'>
              2d
            </Text>
          </HStack>
          <Text size={2}>{data.description}</Text>
        </HStack>
        <HStack items='center' gap={4}>
          <HStack items='center' gap={4}>
            <HStack items='center' gap={1}>
              <IconButton
                size='sm'
                variant='ghost'
                colorTheme='white500'
                ariaLabel='like comment'
                icon='heart-outline'
              />
              <Text size={2} weight={500} color='white700'>
                {millify(data.numOfLikes)}
              </Text>
            </HStack>
            <Box
              onClick={() => onReply(data)}
              as='button'
              fontSize={2}
              radius={1}
              color='white700'
            >
              Reply
            </Box>
          </HStack>
          <Box
            className='feedComment-optionButton'
            css={{
              display: 'none',
            }}
          >
            <IconButton
              size='sm'
              variant='ghost'
              colorTheme='white500'
              ariaLabel='view options'
              icon='more-outline'
            />
          </Box>
        </HStack>
      </VStack>
    </HStack>
  );
}

const replies = arrayFrom(getRandomNumberInRange(0, 15)).map((idx) => ({
  id: idx,
  createdAt: dayjs().subtract(getRandomNumberInRange(0, 200)).toDate(),
  description: `Some random text from ${idx}`,
  isLiked: false,
  numOfLikes: getRandomNumberInRange(0, 100),
  user: {
    id: `user-${idx}`,
    displayName: `Test User ${idx}`,
    username: `username${idx}`,
    role: UserRoleEnum.GeneralUser,
    avatar: `https://i.pravatar.cc/50`,
  },
}));

function UserFeedCommentGroup({
  data,
  onReply,
}: {
  data: IFeedComment;
  onReply: (reply: IFeedComment) => void;
}) {
  const [numOfReplies, setNumOfReplies] = useState(0);

  const remainingReplies = replies.length - numOfReplies;

  return (
    <VStack gap={3}>
      <UserFeedComment onReply={onReply} data={data} />
      <VStack pl={10} gap={3}>
        {replies.length > 0 && (
          <Fragment>
            {remainingReplies > 0 ? (
              <Box
                onClick={() => setNumOfReplies((prev) => prev + 3)}
                fontSize={2}
                color='white700'
              >
                View {remainingReplies}{' '}
                {remainingReplies > 1 ? 'replies' : 'reply'}
              </Box>
            ) : (
              <Box
                color='white700'
                onClick={() => setNumOfReplies(0)}
                fontSize={2}
              >
                Hide replies
              </Box>
            )}
          </Fragment>
        )}
        <FlatList
          gap={6}
          direction='vertical'
          data={comments.slice(0, numOfReplies)}
          renderItem={(data) => (
            <UserFeedComment onReply={onReply} data={data} />
          )}
          keyExtractor={(data) => data.id}
        />
      </VStack>
    </VStack>
  );
}

const comments = arrayFrom(getRandomNumberInRange(0, 15)).map((idx) => ({
  id: idx,
  createdAt: dayjs().subtract(getRandomNumberInRange(0, 200)).toDate(),
  description: `Some random text from ${idx}`,
  isLiked: false,
  numOfLikes: getRandomNumberInRange(0, 100),
  user: {
    id: `user-${idx}`,
    displayName: `Test User ${idx}`,
    username: `username${idx}`,
    role: UserRoleEnum.GeneralUser,
    avatar: '',
  },
}));

function FeedComments() {
  const ref = useRef<HTMLTextAreaElement>();

  const { value, handleOnValueChange } = useOnValueChange('');

  const [numOfComments, setNumOfComments] = useState(3);

  const currentUser = useCurrentUser();

  const remainingComments = comments.length - numOfComments;

  return (
    <Box w='100%' px={4} pb={4}>
      <Box
        mb={{ '@bp1': 3, '@bp3': 4 }}
        h='1px'
        w='100%'
        css={{
          backgroundColor: 'rgba(152, 152, 255, 0.10)',
        }}
      />
      <Loader loading={false}>
        <Box>
          <FlatList
            gap={4}
            direction='vertical'
            data={comments.slice(0, numOfComments)}
            renderItem={(data) => (
              <UserFeedCommentGroup
                onReply={(data) => {
                  handleOnValueChange(`@${data.user.username} `);

                  const node = document.getElementById('user-comment');

                  if (node) {
                    node.focus();
                  }
                }}
                data={data}
              />
            )}
            keyExtractor={(data) => data.id}
          />
        </Box>
        {remainingComments > 0 && (
          <Box
            cursor='pointer'
            fontSize={2}
            fontWeight={400}
            color='white700'
            mt={3}
            onClick={() => setNumOfComments((prev) => prev + 3)}
          >
            View {remainingComments}{' '}
            {remainingComments > 1 ? 'comments' : 'comment'}
          </Box>
        )}

        <HStack w='100%' gap={3} mt={4}>
          <Avatar
            variant='squircle'
            src={currentUser.avatar}
            name={currentUser.displayName}
          />
          <HStack flex={1} gap={2} items='flex-start'>
            <Box flex={1}>
              <TextAreaField
                hideCounter
                id='user-comment'
                value={value}
                onChange={(e) => handleOnValueChange(e.target.value)}
                placeholder='Leave a comment'
                className={lightTextareaStyles()}
                minLines={1}
                maxLines={3}
                name='comment'
                maxLength={250}
              />
            </Box>
            {value.length > 0 && (
              <AnimatePresence>
                <Box>
                  <AppearingContent>
                    <Button
                      variant='ghost'
                      className={makeButtonLarger('50px')}
                      colorTheme='purple100'
                      css={{
                        px: '28px',
                      }}
                      radius={1}
                    >
                      Post
                    </Button>
                  </AppearingContent>
                </Box>
              </AnimatePresence>
            )}
          </HStack>
        </HStack>
      </Loader>
    </Box>
  );
}

export default FeedComments;
