import { useNavigate } from 'react-router-dom';
import { Button, HStack, Input, VStack } from '@holdr-ui/react';
import {
  customInputStyles,
  makePath,
  Paths,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../shared';

function CustomURLView() {
  const navigate = useNavigate();

  return (
    <VStack gap={9} pl={2} h='100%' overflow='auto'>
      <VStack gap={4}>
        <TextGroup gap={0}>
          <TextGroupHeading size={4}>Custom URL</TextGroupHeading>
          <TextGroupSubheading size={1} color='white700'>
            Create your own custom URL to easily share with your fans
          </TextGroupSubheading>
        </TextGroup>
        <Input
          className={customInputStyles()}
          color='white500'
          placeholder='www.holdrclub.com/clubs/'
        />
      </VStack>
      <HStack
        justify='flex-end'
        position='absolute'
        b='1.5rem'
        l='3rem'
        r='3rem'
        bgColor='#30304B'
        gap={3}
      >
        <Button
          onClick={() =>
            navigate(
              makePath([
                Paths.setupProfile,
                Paths.artist,
                Paths.setupArtist.socialMediaAccounts,
              ]),
            )
          }
          variant='outline'
          radius={1}
          colorTheme='purple200'
          css={{ px: '40px' }}
        >
          Go back
        </Button>
        <Button
          onClick={() =>
            navigate(
              makePath([
                Paths.setupProfile,
                Paths.artist,
                Paths.setupArtist.connectOnboarding,
              ]),
            )
          }
          radius={1}
          colorTheme='purple500'
          css={{ px: '28px' }}
        >
          Continue
        </Button>
      </HStack>
    </VStack>
  );
}
CustomURLView.displayName = 'CustomURLView';

export default CustomURLView;
