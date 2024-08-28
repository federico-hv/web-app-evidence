import { useCreateFeedContext } from '../../shared';
import { HStack, IconButton } from '@holdr-ui/react';
import { SelectAudience } from '../index';

function ChooseFeedType() {
  const { toggleType, type, onGoodLink } = useCreateFeedContext();
  return (
    <HStack justify='space-between' items='center'>
      <SelectAudience />
      <HStack gap={1} zIndex={10}>
        <IconButton
          size='lg'
          variant='ghost'
          colorTheme='white500'
          onClick={() => {
            toggleType('with-image');
            onGoodLink();
          }}
          icon={type === 'with-image' ? 'image-fill' : 'image-outline'}
          ariaLabel='add an image'
        />

        <IconButton
          size='lg'
          variant='ghost'
          colorTheme='white500'
          onClick={() => {
            toggleType('as-article');
            onGoodLink();
          }}
          icon={
            type === 'as-article'
              ? 'article-read-fill'
              : 'article-read-outline'
          }
          ariaLabel='add an article'
        />
        <IconButton
          size='lg'
          variant='ghost'
          colorTheme='white500'
          onClick={() => {
            toggleType('with-poll');
            onGoodLink();
          }}
          icon={type === 'with-poll' ? 'poll-fill' : 'poll-outline'}
          ariaLabel='add a poll'
        />
      </HStack>
    </HStack>
  );
}

export default ChooseFeedType;
