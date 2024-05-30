import { useNavigate } from 'react-router-dom';
import { Button, HStack, useRecordState, VStack } from '@holdr-ui/react';
import {
  GeneralContextProvider,
  GQLRenderer,
  makePath,
  Paths,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  usePreviousLocation,
} from '../../../../shared';
import { Fragment } from 'react';
import {
  ISpotifySearchResult,
  useCurrentArtist,
  useUpdateSocialLinks,
} from '../../../../features';
import {
  ISocialLink,
  ISocialMediaAccountsViewContext,
  PlatformInfo,
  SocialURLName,
} from './shared';
import { SearchSpotifyArtist, SocialLinksForm } from './ui';
export type Item = { item: ISpotifySearchResult; index: number };

function SocialMediaAccountsView() {
  const artist = useCurrentArtist();

  const previousLocation = usePreviousLocation('/');

  const { updateSocialLink, loading, error } = useUpdateSocialLinks();

  const [state, update] = useRecordState<ISocialMediaAccountsViewContext>({
    isDisabled: false,
    links: {},
    externalAccount: undefined,
  });
  const navigate = useNavigate();

  return (
    <GeneralContextProvider value={{ state, update }}>
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

          <SearchSpotifyArtist />
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
          <GQLRenderer ErrorFallback={() => <Fragment />}>
            <SocialLinksForm />
          </GQLRenderer>
        </VStack>
        <HStack
          justify='flex-end'
          position='absolute'
          b={0}
          r={0}
          w='fit-content'
          bgColor='#30304B'
          gap={3}
        >
          <Button
            type='button'
            onClick={() =>
              navigate(
                makePath([
                  Paths.setupProfile,
                  Paths.artist,
                  Paths.setupArtist.aboutMeAndPerks,
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
            isLoading={loading}
            loadingText='Continue'
            disabled={state.isDisabled || !!error}
            type='submit'
            radius={1}
            colorTheme='purple500'
            css={{ px: '28px' }}
            onClick={async () => {
              const keys = Object.keys(state.links) as SocialURLName[];

              const links = keys
                .map(
                  (key): ISocialLink => ({
                    provider: PlatformInfo[key].name,
                    url: state.links[key] ?? '',
                  }),
                )
                .filter((item) => item.url !== 'none');

              // [OPTIMIZATION]: Check if the links have even changed before trying to update

              await updateSocialLink(artist?.id || '', links).then(() =>
                navigate(
                  makePath([
                    Paths.setupProfile,
                    Paths.artist,
                    Paths.setupArtist.customURL,
                  ]),
                  {
                    state: {
                      previousLocation,
                    },
                  },
                ),
              );
            }}
          >
            Continue
          </Button>
        </HStack>
      </VStack>
    </GeneralContextProvider>
  );
}
SocialMediaAccountsView.displayName = 'SocialMediaAccountsView';

export default SocialMediaAccountsView;
