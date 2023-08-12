import { ArticleModel, FeedModel } from '../shared';
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@holdr-ui/react';
import {
  DateUtility,
  Menu,
  prefix,
  StringNumeric,
  TextGroup,
} from '../../../shared';
import { Link } from 'react-router-dom';

function MoreButton({}: { id: StringNumeric }) {
  return (
    <Menu>
      <Menu.Trigger>
        <IconButton
          colorTheme='darkTint400'
          blur='xl'
          icon='more-fill'
          boxShadow='none'
          ariaLabel='view options'
        />
      </Menu.Trigger>
      <Menu.Header />
      <Menu.Content>
        <Menu.Item icon='article-read-outline' label='Read article' />
        <Menu.Item icon='remove-outline' label='Block ""' />
        <Menu.Item icon='emotion-unhappy-outline' label='Not interested' />
        <Menu.Item icon='eye-hide' label='Hide article' />
        <Menu.Item
          icon='report-outline'
          label='Report article'
          dangerous
        />
      </Menu.Content>
    </Menu>
  );
}

// `https://logo.clearbit.com/${domainUrl}` logo finder

function ArticleCard({ data }: { data: FeedModel }) {
  const node = data.node as ArticleModel;

  return (
    <VStack gap={3}>
      <Card bgImageUrl={node.imageUrl} h='600px'>
        <Card.Header p={4} direction='horizontal' justify='space-between'>
          <Link to={prefix('/', data.owner.username)}>
            <Avatar
              size='xl'
              variant='squircle'
              src={data.owner.avatar}
              name={node.source.name}
            />
          </Link>
          <MoreButton id={data.id} />
        </Card.Header>
        <Card.Footer
          p={4}
          gap={4}
          divider={<Box borderBottom={1} borderColor='base500' />}
          bgColor='darkTint400'
          position='absolute'
          b={0}
          w='100%'
          css={{
            blur: '12px',
            borderBottomRadius: '$4',
          }}
        >
          <VStack gap={3}>
            <TextGroup>
              <TextGroup.Subheading size={1} weight={500} color='base200'>
                {DateUtility.fromNow(data.createdAt)}
              </TextGroup.Subheading>
              <TextGroup.Heading
                size={{ '@bp1': 3, '@bp3': 4 }}
                color='primary400'
                as='h2'
                noOfLines={2}
              >
                {node.title}
              </TextGroup.Heading>
            </TextGroup>
          </VStack>
          <VStack gap={5}>
            <Text
              size={{ '@bp1': 2, '@bp3': 3 }}
              noOfLines={2}
              color='base100'
            >
              {node.description}
            </Text>
            <HStack justify='space-between' items='center'>
              <ButtonGroup
                variant='ghost'
                colorTheme='primary400'
                size='lg'
                flex={1}
              >
                <IconButton
                  ariaLabel='save article'
                  icon='bookmark-outline'
                />
                <IconButton ariaLabel='add reaction' icon='reaction-add' />
              </ButtonGroup>
              <Link to={node.url} target='_blank'>
                <Button colorTheme='primary400'>Read</Button>
              </Link>
            </HStack>
          </VStack>
        </Card.Footer>
      </Card>
      <Link to={`https://${node.source.url}`} target='_blank'>
        <HStack gap={2} justify='flex-end'>
          from <Text weight={500}>{node.source.name}</Text>
        </HStack>
      </Link>
    </VStack>
  );
}
ArticleCard.displayName = 'ArticleCard';

export default ArticleCard;
