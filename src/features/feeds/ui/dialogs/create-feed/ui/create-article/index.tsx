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
  VStack,
} from '@holdr-ui/react';
import { ChangeEvent, Fragment } from 'react';
import ChooseFeedType from '../choose-feed-type';
import {
  darkInputStyles,
  darkTextareaStyles,
  FieldLengths,
  InputTextField,
  OgMetadataCard,
  TextareaField,
  useStepperContext,
} from '../../../../../../../shared';
import { useCreateFeedContext } from '../../shared';

function WebsiteForm() {
  const { websiteUrl, handleOnWebsiteChange, onBadLink } =
    useCreateFeedContext();

  return (
    <VStack w='100%' as='form' pt={0} gap={1} justify='space-between'>
      <VStack as='label' w='100%' gap={1}>
        <Text color='base400' size={2} css={{ pl: '$1' }}>
          Website URL
        </Text>
        <Box
          radius={2}
          css={{ backgroundColor: 'rgba(26, 26, 41, 0.75)' }}
          py={1}
        >
          <InputGroup radius={1} focusColor='transparent'>
            <InputGroupLeftElement>
              <Icon color='white500' name='global-outline' />
            </InputGroupLeftElement>
            <Input
              name='website'
              placeholder='Share an article with your fans'
              value={websiteUrl}
              onChange={handleOnWebsiteChange}
              color='white700'
            />
          </InputGroup>
        </Box>
        <HStack flex={1} justify='flex-end' pb={2}>
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
      {/*DO NOT UNCOMMENT -- Design Team has not had time to update the designs.*/}
      {/*<CreatePostEditor update={updatePostState} />*/}
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
      <Box
        h='1px'
        w='100%'
        css={{ backgroundColor: 'rgba(204, 204, 204, 0.10)' }}
      />
      <InputTextField
        label='Title'
        name='title'
        className={darkInputStyles()}
        value={articleState.title}
        onChange={handleChange}
        maxLength={FieldLengths.article.title.max}
        minLength={FieldLengths.article.title.min}
      />
      <InputTextField
        label='Website URL'
        name='url'
        className={darkInputStyles()}
        value={articleState.url}
        onChange={handleChange}
      />
      <InputTextField
        label='Image URL'
        name='imageUrl'
        className={darkInputStyles()}
        value={articleState.imageUrl}
        onChange={handleChange}
      />
      <TextareaField
        id='description'
        label='Description'
        name='description'
        className={darkTextareaStyles()}
        value={articleState.description}
        onChange={handleChange}
        placeholder='Let people know a bit about the article.'
        maxLength={FieldLengths.article.description.max}
        minLength={FieldLengths.article.description.min}
      />
    </VStack>
  );
}

function PreviewArticleCard() {
  const { articleState, resetWebsiteUrl } = useCreateFeedContext();
  const { decrement } = useStepperContext();

  return (
    <Box
      position='relative'
      p={4}
      radius={1}
      css={{ backgroundColor: hexToRGB('#9898FF', 0.15) }}
    >
      <Box
        css={{ backgroundColor: 'rgba(63, 63, 99)' }}
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
}

function CreateArticle() {
  const { currentStep } = useStepperContext();
  const { badLink } = useCreateFeedContext();

  return (
    <VStack t='1rem' l={0} r={0} overflowY='auto' pb={0} gap={4}>
      {currentStep === 1 && (
        <Fragment>
          {badLink ? <CantFindLinkForm /> : <WebsiteForm />}
        </Fragment>
      )}
      {currentStep === 2 && <PreviewArticleCard />}
      <ChooseFeedType />
    </VStack>
  );
}
CreateArticle.displayName = 'CreateArticle';

export default CreateArticle;
