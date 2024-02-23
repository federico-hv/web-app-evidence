import { useCreateFeedContext } from '../../context';
import { ButtonGroup, HStack, IconButton } from '@holdr-ui/react';
import { SelectAudience } from '../index';

function ChooseFeedType() {
  const { toggleType, type } = useCreateFeedContext();
  return (
    <HStack justify='space-between' items='center'>
      <SelectAudience />
      <ButtonGroup size='lg' variant='ghost' colorTheme='white500' gap={1}>
        <IconButton
          onClick={() => toggleType('with-image')}
          icon={type === 'with-image' ? 'image-fill' : 'image-outline'}
          ariaLabel='add an image'
        />
        <IconButton
          onClick={() => toggleType('as-article')}
          icon={
            type === 'as-article'
              ? 'article-read-fill'
              : 'article-read-outline'
          }
          ariaLabel='add and article'
        />
        <IconButton
          onClick={() => {
            toggleType('with-poll');
          }}
          icon={type === 'with-poll' ? 'poll-fill' : 'poll-outline'}
          ariaLabel=''
        />
      </ButtonGroup>
    </HStack>
  );
}

export default ChooseFeedType;
