import { FeedModel, PollModel, PollResponse, PostModel } from '../shared';
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  Center,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@holdr-ui/react';
import {
  DateUtility,
  extraBtnPadding,
  LinkOverlay,
  prefix,
  SwitchConditional,
  SwitchConditionalCase,
  TextGroup,
} from '../../../shared';

function PollContent({ data }: { data: PollResponse[] }) {
  return (
    <VStack gap={4} mt={6}>
      {data.map(({ id, text }) => (
        <Center
          key={`response_${id}`}
          cursor='pointer'
          p={3}
          border={1}
          radius='full'
          borderColor='base200'
          _hover={{
            backgroundColor: '$base100',
          }}
        >
          <Text weight={500} noOfLines={1}>
            {text}
          </Text>
        </Center>
      ))}
    </VStack>
  );
}

function FeedCard({ data }: { data: FeedModel }) {
  const node = data.node as PostModel | PollModel;

  return (
    <Card bgColor='primary400'>
      <Card.Header
        borderBottom={1}
        borderColor='base100'
        p={4}
        direction='horizontal'
        justify='space-between'
      >
        <HStack gap={4} position='relative'>
          <LinkOverlay to={prefix('/', data.owner.username)} />
          <Avatar size='xl' variant='squircle' src={data.owner.avatar} />
          <TextGroup gap={1}>
            <TextGroup.Heading size={3}>
              {data.owner.displayName}
            </TextGroup.Heading>
            <TextGroup.Subheading color='base400' size={1} weight={500}>
              {DateUtility.fromNow(data.createdAt)} ago
            </TextGroup.Subheading>
          </TextGroup>
        </HStack>
        <Box>
          <IconButton
            variant='ghost'
            icon='more-fill'
            ariaLabel='view options'
          />
        </Box>
      </Card.Header>
      <Card.Body px={4} py={6}>
        <Text>{node.description}</Text>
        <SwitchConditional>
          <SwitchConditionalCase
            on={node.__typename === 'PostModel'}
          ></SwitchConditionalCase>
          <SwitchConditionalCase on={data.node.__typename === 'PollModel'}>
            {node.responses && <PollContent data={node.responses} />}
          </SwitchConditionalCase>
        </SwitchConditional>
      </Card.Body>
      <Card.Footer px={4} py={3} borderTop={1} borderColor='base100'>
        <ButtonGroup
          justify='space-between'
          variant='ghost'
          colorTheme='base600'
        >
          <Button
            fullWidth
            leftIcon='reaction-add'
            className={extraBtnPadding()}
          >
            React
          </Button>
          <Button
            fullWidth
            leftIcon='bookmark-outline'
            className={extraBtnPadding()}
          >
            Bookmark
          </Button>
          <Button
            fullWidth
            leftIcon='share-outline'
            className={extraBtnPadding()}
          >
            Share
          </Button>
        </ButtonGroup>
      </Card.Footer>
    </Card>
  );
}
FeedCard.displayName = 'FeedCard';

export default FeedCard;
