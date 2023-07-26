import { ArticleModel, FeedModel } from '../shared';
import {
  Avatar,
  AvatarLink,
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
  getUrlDomain,
  prefix,
  StyledLink,
  TextGroup,
} from '../../../shared';
import { Link } from 'react-router-dom';

function ArticleCard({ data }: { data: FeedModel }) {
  const node = data.node as ArticleModel;

  const domainUrl = getUrlDomain(
    node.source.url || new URL(node.url).hostname,
  );

  return (
    <VStack gap={3}>
      <Card bgImageUrl={node.imageUrl} h='600px'>
        <Card.Header p={4} direction='horizontal' justify='space-between'>
          <a
            href={`https://${domainUrl}`}
            title={node.source.name}
            target='_blank'
            rel='noreferrer'
          >
            <Avatar
              size='xl'
              variant='squircle'
              src={`https://logo.clearbit.com/${domainUrl}`}
              name={node.source.name}
            />
          </a>
          <IconButton
            icon='more-fill'
            ariaLabel='view options'
            colorTheme='darkTint400'
            blur='lg'
          />
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
          }}
        >
          <VStack gap={3}>
            <TextGroup>
              <TextGroup.Subheading size={1} weight={500} color='base200'>
                {DateUtility.fromNow(data.createdAt)}
              </TextGroup.Subheading>
              <TextGroup.Heading color='primary400' as='h2' noOfLines={2}>
                {node.title}
              </TextGroup.Heading>
            </TextGroup>

            <AvatarLink
              as={<StyledLink to={prefix('/', data.owner.username)} />}
              color='clear-glass'
              src={data.owner.avatar}
              name={data.owner.displayName}
            />
          </VStack>
          <VStack gap={5}>
            <Text noOfLines={2} color='base100'>
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
      <HStack gap={2} justify='flex-end'>
        from <Text weight={500}>{node.source.name}</Text>
      </HStack>
    </VStack>
  );
}
ArticleCard.displayName = 'ArticleCard';

export default ArticleCard;
