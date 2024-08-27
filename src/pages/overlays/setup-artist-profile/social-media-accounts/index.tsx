import { useNavigate } from 'react-router-dom';
import {
  Button,
  HStack,
  useRecordState,
  VStack,
  GeneralContextProvider,
} from '@holdr-ui/react';
import { Fragment } from 'react';
import {
  GQLRenderer,
  makePath,
  Paths,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  usePreviousLocation,
} from '../../../../shared';
import {
  ISpotifySearchResult,
  useCurrentArtist,
  useUpdateSocialLinks,
} from '../../../../features';
import {
  ISocialLink,
  ISocialMediaAccountsViewContext,
  SocialPlatformInfo,
  SocialURLName,
} from './shared';
import { SearchSpotifyArtist, SocialLinksForm } from './ui';
import { SectionHeader } from '../ui';
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

  console.log({ external: state.externalAccount });

  return (
    <GeneralContextProvider value={{ state, update }}>
      <VStack gap={9} pl={2} h='100%' overflow='auto'>
        <VStack gap={4}>
          <SectionHeader
            required
            title='Find Spotify account'
            subtitle='Search for the Spotify account that is yours'
          />
          <SearchSpotifyArtist />
        </VStack>
        <VStack gap={4}>
          <SectionHeader
            required
            title='Add Your Social Links'
            subtitle='Share your social links for your fans'
          />
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
          pl={56}
          pr={56}
          pb={56}
          pt='14px'
        >
          <Button
            type='button'
            onClick={() =>
              navigate(
                makePath([
                  Paths.setupArtists,
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
            disabled={
              state.isDisabled ||
              !!error ||
              state.externalAccount === undefined
            }
            type='submit'
            radius={1}
            colorTheme='purple500'
            css={{ px: '28px' }}
            onClick={async () => {
              const keys = Object.keys(state.links) as SocialURLName[];

              const links = keys
                .map(
                  (key): ISocialLink => ({
                    provider: SocialPlatformInfo[key].name,
                    url: state.links[key] ?? '',
                  }),
                )
                .filter((item) => item.url !== 'none');

              // [OPTIMIZATION]: Check if the links have even changed before trying to update

              await updateSocialLink(artist?.id || '', links).then(() =>
                navigate(
                  makePath([
                    Paths.setupArtists,
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
