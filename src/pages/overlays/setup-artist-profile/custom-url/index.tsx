import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Center,
  CircularProgress,
  HStack,
  Input,
  Text,
  VStack,
} from '@holdr-ui/react';
import {
  customInputStyles,
  makePath,
  Paths,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  usePreviousLocation,
} from '../../../../shared';
import { ChangeEvent, useState } from 'react';
import { useClubContext, useUpdateClub } from '../../../../features';
import { useDebounceIsUniqueClubUrl } from '../../../../features';
import { AnimatePresence } from 'framer-motion';
import { InputTextFieldProps } from '../../../../shared/components/text-field/types';
import {
  InputGroup,
  InputGroupLeftElement,
  InputGroupRightElement,
} from '../../../../tmp/input-group';

function CustomURLView() {
  const previousLocation = usePreviousLocation('/');

  const [checkIsUnique, { loading, result }] =
    useDebounceIsUniqueClubUrl();

  const { updateClub, loading: loadingMutation } = useUpdateClub();

  const club = useClubContext();

  const [url, setURL] = useState<string | undefined>(club.url);

  const navigate = useNavigate();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\w]/gm, '');

    setURL(value);

    checkIsUnique(value, club.id);
  };

  return (
    <VStack gap={9} pl={2} h='100%' overflow='auto'>
      <VStack gap={4}>
        <TextGroup gap={0}>
          <TextGroupHeading size={4}>Custom URL</TextGroupHeading>
          <TextGroupSubheading size={1} color='white700'>
            Create your own custom URL to easily share with your fans
          </TextGroupSubheading>
        </TextGroup>
        <VStack gap={1}>
          <InputGroup>
            <InputGroupLeftElement>
              <Text color='white900'>https://holdrclub.com/clubs/</Text>
            </InputGroupLeftElement>
            <Input
              variant='unstyled'
              maxLength={25}
              value={url}
              onChange={handleOnChange}
              color='white500'
            />
            <InputGroupRightElement pl={4}>
              <AnimatePresence>
                {loading && (
                  <Center position='absolute' t={0} b={0} r='1rem'>
                    <CircularProgress
                      bgColor='base400'
                      colorTheme='white500'
                      thickness={2}
                      isIndeterminate
                      size={20}
                    />
                  </Center>
                )}
              </AnimatePresence>
            </InputGroupRightElement>
          </InputGroup>
          {!result && (
            <Text size={1} weight={500} color='danger300'>
              That URL is already taken
            </Text>
          )}
        </VStack>
      </VStack>
      <HStack
        justify='flex-end'
        position='absolute'
        b={0}
        r={0}
        w='fit-content'
        bgColor='#30304B'
        gap={3}
        pl={56}
        pr={56}
        pb={56}
        pt='14px'
      >
        <Button
          onClick={() =>
            navigate(
              makePath([
                Paths.setupArtists,
                Paths.setupArtist.socialMediaAccounts,
              ]),
              {
                state: {
                  previousLocation,
                },
              },
            )
          }
          variant='ghost'
          radius={1}
          colorTheme='purple200'
          css={{ px: '40px' }}
        >
          Go back
        </Button>
        <Button
          isLoading={loadingMutation}
          loadingText='Continue'
          disabled={!result}
          onClick={async () => {
            // TODO: Check uniqueness here as well

            await updateClub({
              url: url,
            });

            navigate(
              makePath([
                Paths.setupArtists,
                Paths.setupArtist.connectOnboarding,
              ]),
              {
                state: {
                  previousLocation,
                },
              },
            );
          }}
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
