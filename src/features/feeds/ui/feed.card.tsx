import {
  FeedModel,
  IMAGE_GRID,
  ImageSizes,
  PostModel,
  IPostMedia,
  IPoll,
} from '../shared';
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  Center,
  Circle,
  Grid,
  HStack,
  Icon,
  Text,
  VStack,
} from '@holdr-ui/react';
import {
  DateUtility,
  extraBtnPadding,
  LinkOverlay,
  MediaItem,
  Menu,
  prefix,
  StringNumeric,
  SwitchConditional,
  SwitchConditionalCase,
  TextGroup,
} from '../../../shared';
import { theme } from '../../../configs';

function PollContent({ items }: { items: IPoll[] }) {
  return (
    <VStack gap={4} mt={6}>
      {items.map(({ id, text }) => (
        <Center
          key={`response_${id}`}
          cursor='pointer'
          role='button'
          p={3}
          border={1}
          radius='full'
          borderColor='base200'
          position='relative'
          overflow='hidden'
          _hover={{
            backgroundColor: '$base100',
          }}
          css={{
            userSelect: 'none',
            '&:active': {
              scale: 0.95,
              transition: `all ${theme.transitions['duration-normal']} linear`,
            },
          }}
        >
          <SwitchConditional>
            <SwitchConditionalCase>
              {/** 👇🏾 Vote checkmark */}
              <Circle
                position='absolute'
                l={6}
                size={30}
                css={{ zIndex: 10 }}
                bgColor='secondary400'
              >
                <Icon name='check' color='primary400' />
              </Circle>
              {/** 👇🏾 Progress */}
              <Center
                position='absolute'
                l={0}
                t={0}
                bgColor='base100'
                aria-valuenow={70}
                aria-valuemin={0}
                aria-valuemax={100}
                w='70%'
                h='100%'
                zIndex={1}
              />
            </SwitchConditionalCase>
          </SwitchConditional>
          {/** 👇🏾 Label */}
          <Text weight={500} noOfLines={1} css={{ zIndex: 10 }}>
            {text}
          </Text>
        </Center>
      ))}
    </VStack>
  );
}

function Media({ items }: { items: IPostMedia[] }) {
  return (
    <>
      {items.length > 0 && (
        <Box h={350} mt={6}>
          <Grid
            gap={3}
            h='100%'
            templateRows='repeat(2, 1fr)'
            templateColumns='repeat(2, 1fr)'
          >
            {items.length <= 4 &&
              IMAGE_GRID[items.length as ImageSizes].map(
                ({ rowSpan, colSpan }, index) => (
                  <Grid.Item
                    rowSpan={rowSpan}
                    colSpan={colSpan}
                    key={`image-grid-${index}`}
                  >
                    <Box radius={2} h='100%' w='100%' overflow='hidden'>
                      <MediaItem
                        url={items[index].url}
                        type={items[index].type}
                      />
                    </Box>
                  </Grid.Item>
                ),
              )}
          </Grid>
        </Box>
      )}
    </>
  );
}

function MoreButton({}: { id: StringNumeric }) {
  return (
    <Menu>
      <Menu.Trigger />
      <Menu.Header />
      <Menu.Content>
        <Menu.Item icon='user-unfollow-outline' label='Unfollow @' />
        <Menu.Item icon='mute-outline' label='Mute @' />
        <Menu.Item icon='eye-hide' label='Hide post' />
        <Menu.Item icon='report-outline' label='Report post' dangerous />
      </Menu.Content>
    </Menu>
  );
}

function FeedCard({ data }: { data: FeedModel }) {
  const node = data.node as PostModel;

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
        <MoreButton id={data.id} />
      </Card.Header>
      <Card.Body px={4} py={6}>
        <Text>{node.description}</Text>
        {node.media && <Media items={node.media} />}
        {node.polls && <PollContent items={node.polls} />}
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
