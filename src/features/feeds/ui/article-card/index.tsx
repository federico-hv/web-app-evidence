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
import { Link } from 'react-router-dom';
import { capitalize } from 'lodash';
import MoreButton from './more.button';
import { DateUtility, prefix, TextGroup } from '../../../../shared';
import ReactionPopover from '../reaction-popover';
import { ArticleModel, Reaction, useFeedContext } from '../../shared';

// `https://logo.clearbit.com/${domainUrl}` logo finder

function ArticleCard({ data }: { data: ArticleModel }) {
  const { owner, createdAt, reaction } = useFeedContext();
  return (
    <VStack gap={3}>
      <Card
        bgImageUrl={data.imageUrl}
        h={{ '@bp1': '450px', '@bp3': '550px' }}
      >
        <Card.Header p={4} direction='horizontal' justify='space-between'>
          <Link to={prefix('/', owner.username)}>
            <Avatar
              size='xl'
              variant='squircle'
              src={owner.avatar}
              name={data.source.name}
            />
          </Link>
          <MoreButton />
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
                {capitalize(DateUtility.fromNow(createdAt))} ago
              </TextGroup.Subheading>
              <TextGroup.Heading
                size={{ '@bp1': 3, '@bp3': 4 }}
                color='primary400'
                as='h2'
                noOfLines={2}
              >
                {data.title}
              </TextGroup.Heading>
            </TextGroup>
          </VStack>
          <VStack gap={5}>
            <Text
              size={{ '@bp1': 2, '@bp3': 3 }}
              noOfLines={2}
              color='base100'
            >
              {data.description}
            </Text>
            <HStack justify='space-between' items='center'>
              <ButtonGroup
                variant='ghost'
                colorTheme='primary400'
                items='center'
              >
                <IconButton
                  ariaLabel='save article'
                  icon='bookmark-outline'
                  size='lg'
                />

                <Box>
                  <ReactionPopover
                    alignOffset={-6}
                    sideOffset={10}
                    position='right'
                  >
                    <IconButton
                      variant='ghost'
                      colorTheme='primary400'
                      ariaLabel={
                        reaction && reaction.name
                          ? reaction.name
                          : 'add reaction'
                      }
                      icon={
                        reaction && reaction.name
                          ? Reaction[reaction.name].icon
                          : 'reaction-add'
                      }
                      size='lg'
                    />
                  </ReactionPopover>
                </Box>
              </ButtonGroup>
              <Link to={data.url} target='_blank'>
                <Button colorTheme='primary400'>Read</Button>
              </Link>
            </HStack>
          </VStack>
        </Card.Footer>
      </Card>
      <Link to={`https://${data.source.url}`} target='_blank'>
        <HStack gap={2} justify='flex-end'>
          from <Text weight={500}>{data.source.name}</Text>
        </HStack>
      </Link>
    </VStack>
  );
}
ArticleCard.displayName = 'ArticleCard';

export default ArticleCard;
