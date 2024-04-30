import { useNavigate } from 'react-router-dom';
import {
  Button,
  HStack,
  Icon,
  Input,
  Text,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  VStack,
} from '@holdr-ui/react';
import {
  customInputStyles,
  makePath,
  Paths,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../shared';

function SocialMediaAccountsView() {
  const navigate = useNavigate();

  return (
    <VStack gap={9} pl={2} h='100%' overflow='auto'>
      <VStack gap={4}>
        <TextGroup gap={0}>
          <TextGroupHeading size={4}>
            Find Spotify account
          </TextGroupHeading>
          <TextGroupSubheading size={1} color='white700'>
            Search for the Spotify account that is yours.
          </TextGroupSubheading>
        </TextGroup>
        <Input
          className={customInputStyles()}
          color='white500'
          placeholder='Search for Spotify account'
        />
      </VStack>
      <VStack gap={4}>
        <TextGroup gap={0}>
          <TextGroupHeading size={4}>
            Add Your Social Links
          </TextGroupHeading>
          <TextGroupSubheading size={1} color='white700'>
            Share your social links for your fans
          </TextGroupSubheading>
        </TextGroup>
        <VStack gap={4}>
          <VStack gap={2}>
            <HStack color='white700' gap={1} items='center'>
              <Text size={1} as='label' htmlFor='instagram'>
                Instagram
              </Text>
              <Tooltip>
                <TooltipTrigger
                  display='flex'
                  css={{ alignItems: 'center' }}
                >
                  <Icon name='information-outline' />
                </TooltipTrigger>
                <TooltipContent>
                  Enter your Instagram URL for your fans to connect with
                  you
                </TooltipContent>
              </Tooltip>
            </HStack>
            <Input
              className={customInputStyles()}
              color='white500'
              placeholder='Enter your Instagram link'
            />
          </VStack>
          <VStack gap={2}>
            <HStack color='white700' gap={1} items='center'>
              <Text size={1} as='label' htmlFor='instagram'>
                Instagram
              </Text>
              <Tooltip>
                <TooltipTrigger
                  display='flex'
                  css={{ alignItems: 'center' }}
                >
                  <Icon name='information-outline' />
                </TooltipTrigger>
                <TooltipContent>
                  Enter your TikTok URL for your fans to connect with you
                </TooltipContent>
              </Tooltip>
            </HStack>
            <Input
              className={customInputStyles()}
              color='white500'
              placeholder='Enter your TikTok link'
            />
          </VStack>
          <VStack gap={2}>
            <HStack color='white700' gap={1} items='center'>
              <Text size={1} as='label' htmlFor='instagram'>
                X
              </Text>
              <Tooltip>
                <TooltipTrigger
                  display='flex'
                  css={{ alignItems: 'center' }}
                >
                  <Icon name='information-outline' />
                </TooltipTrigger>
                <TooltipContent>
                  Enter your X URL for your fans to connect with you
                </TooltipContent>
              </Tooltip>
            </HStack>
            <Input
              className={customInputStyles()}
              color='white500'
              placeholder='Enter your X link'
            />
          </VStack>
        </VStack>
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
                Paths.setupArtist.aboutMeAndPerks,
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
                Paths.setupArtist.customURL,
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
SocialMediaAccountsView.displayName = 'SocialMediaAccountsView';

export default SocialMediaAccountsView;
