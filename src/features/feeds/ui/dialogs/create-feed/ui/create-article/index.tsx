import {
  Box,
  CloseButton,
  hexToRGB,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputGroupLeftElement,
  Text,
  Textarea,
  VStack,
} from '@holdr-ui/react';
import { ChangeEvent, Fragment } from 'react';
import ChooseFeedType from '../choose-feed-type';
import {
  OgMetadataCard,
  useStepperContext,
} from '../../../../../../../shared';
import { useCreateFeedContext } from '../../context';

function WebsiteForm({ onBadLink }: { onBadLink?: VoidFunction }) {
  const { websiteUrl, handleOnWebsiteChange } = useCreateFeedContext();

  return (
    <VStack w='100%' as='form' pt={4} gap={1} justify='space-between'>
      <VStack as='label' w='100%' gap={1}>
        <Text color='base400' size={2} css={{ pl: '$1' }}>
          Website URL
        </Text>
        <Box
          radius={2}
          css={{ backgroundColor: hexToRGB('#9898FF', 0.15) }}
        >
          <InputGroup radius={1} focusColor='transparent'>
            <InputGroupLeftElement>
              <Icon color='white500' name='global-outline' />
            </InputGroupLeftElement>
            <Input
              name='website'
              value={websiteUrl}
              onChange={handleOnWebsiteChange}
              color='white500'
            />
          </InputGroup>
        </Box>
        <HStack flex={1} justify='flex-end'>
          <Box
            onClick={onBadLink}
            w='fit-content'
            borderBottom={1}
            borderColor='base300'
            color='base300'
          >
            <Text size={1}>{"Can't use link?"}</Text>
          </Box>
        </HStack>
      </VStack>
    </VStack>
  );
}

function CantFindLinkForm() {
  const { articleState, updateArticleState } = useCreateFeedContext();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    updateArticleState({ [e.target.name]: e.target.value });
  };

  return (
    <VStack w='100%' as='form' gap={4} justify='space-between'>
      <VStack as='label' w='100%' gap={1}>
        <Text color='base400' size={2} css={{ pl: '$1' }}>
          Title
        </Text>
        <Box
          radius={1}
          css={{ backgroundColor: hexToRGB('#9898FF', 0.15) }}
        >
          <Input
            radius={1}
            focusColor='transparent'
            name='title'
            value={articleState.title}
            onChange={handleChange}
            color='white500'
            maxLength={75}
          />
        </Box>
      </VStack>
      <VStack as='label' w='100%' gap={1}>
        <Text color='base400' size={2} css={{ pl: '$1' }}>
          Website URL
        </Text>
        <Box
          radius={1}
          css={{ backgroundColor: hexToRGB('#9898FF', 0.15) }}
        >
          <Input
            radius={1}
            focusColor='transparent'
            name='url'
            value={articleState.url}
            onChange={handleChange}
            color='white500'
          />
        </Box>
      </VStack>
      <VStack as='label' w='100%' gap={1}>
        <Text color='base400' size={2} css={{ pl: '$1' }}>
          Image URL
        </Text>
        <Box
          radius={1}
          css={{ backgroundColor: hexToRGB('#9898FF', 0.15) }}
        >
          <Input
            radius={1}
            focusColor='transparent'
            name='imageUrl'
            value={articleState.imageUrl}
            onChange={handleChange}
            color='white500'
          />
        </Box>
      </VStack>
      <VStack as='label' w='100%' gap={1}>
        <Text color='base400' size={2} css={{ pl: '$1' }}>
          Description
        </Text>
        <Box
          radius={1}
          css={{ backgroundColor: hexToRGB('#9898FF', 0.15) }}
        >
          <Textarea
            radius={1}
            focusColor='transparent'
            name='description'
            value={articleState.description}
            onChange={handleChange}
            colorTheme='white500'
            maxLength={150}
            maxLines={2}
          />
        </Box>
      </VStack>
    </VStack>
  );
}

function CreateArticle() {
  const { currentStep, decrement } = useStepperContext();
  const { badLink, onBadLink, articleState, resetWebsiteUrl } =
    useCreateFeedContext();

  const StepOne = () => {
    return (
      <Fragment>
        {badLink ? (
          <CantFindLinkForm />
        ) : (
          <WebsiteForm onBadLink={onBadLink} />
        )}
      </Fragment>
    );
  };

  const StepTwo = () => (
    <Box
      position='relative'
      p={4}
      radius={1}
      css={{ backgroundColor: hexToRGB('#9898FF', 0.15) }}
    >
      <Box
        css={{ backgroundColor: 'rgba(45, 45, 71)' }}
        position='absolute'
        t='0.5rem'
        r='0.5rem'
        zIndex={5}
        p={1}
        radius='full'
      >
        <CloseButton
          onClick={() => {
            resetWebsiteUrl();
            decrement();
          }}
          variant='outline'
          colorTheme='white500'
        />
      </Box>
      <OgMetadataCard
        data={{
          title: articleState.title,
          url: articleState.url,
          site: articleState.site,
          images: [{ url: articleState.imageUrl, type: 'image' }],
          description: articleState.description,
        }}
      />
    </Box>
  );

  return (
    <VStack t='1rem' l={0} r={0} overflowY='auto' pb={4} gap={4}>
      {currentStep === 1 && <StepOne />}
      {currentStep === 2 && <StepTwo />}
      <ChooseFeedType />
    </VStack>
  );
}
CreateArticle.displayName = 'CreateArticle';

export default CreateArticle;
