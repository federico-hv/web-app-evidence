import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  CloseButton,
  GeneralContextProvider,
  hexToRGB,
  HStack,
  Icon,
  Input,
  Spotlight,
  Text,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  useGeneralContext,
  useRecordState,
  VStack,
} from '@holdr-ui/react';
import {
  customInputStyles,
  GQLRenderer,
  IOffsetPage,
  makePath,
  matchesPattern,
  Paths,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../../shared';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import {
  IExternalAccount,
  ISpotifySearchResult,
  SocialProvider,
  useAddExternalAccount,
  useRemoveExternalAccount,
  useSpotifyArtistSearch,
  useSuspenseExternalAccount,
  useSuspenseSocialLinks,
  useUpdateSocialLinks,
} from '../../../../features';
export type Item = { item: ISpotifySearchResult; index: number };

interface ISocialMediaAccountsViewContext {
  isDisabled: boolean;
  links: ISocialAccounts;
  externalAccount?: IExternalAccount;
}

function SpotifyItem() {
  const { update, state } =
    useGeneralContext<ISocialMediaAccountsViewContext>();
  const { removeExternalAccount } = useRemoveExternalAccount();

  if (!state.externalAccount) {
    return <Fragment />;
  }

  return (
    <HStack
      p={2}
      gap={4}
      justify='space-between'
      radius={2}
      w='fit-content'
      minWidth='125px'
      maxWidth='250px'
      items='center'
      bgColor='rgba(152, 152, 255, 0.15)'
    >
      <HStack items='center' gap={2}>
        <Avatar
          src={state.externalAccount.avatar}
          variant='squircle'
          css={{
            size: '40px',
          }}
        />
        <Text weight={500} noOfLines={2} whiteSpace='pre-wrap'>
          {state.externalAccount.username}
        </Text>
      </HStack>
      <Box>
        <CloseButton
          onClick={async () => {
            if (state.externalAccount) {
              await removeExternalAccount(state.externalAccount.id).then(
                () => update({ externalAccount: undefined }),
              );
            }
          }}
          size='sm'
          colorTheme='white500'
        />
      </Box>
    </HStack>
  );
}

function ResultItem({
  data,
  isSelected,
  onClick,
}: {
  data: ISpotifySearchResult;
  isSelected?: boolean;
  onClick?: VoidFunction;
}) {
  return (
    <HStack
      onClick={onClick}
      items='center'
      radius={1}
      gap={2}
      p={3}
      bgColor={isSelected ? hexToRGB('#1A1A29', 0.5) : 'transparent'}
      _hover={{
        backgroundColor: hexToRGB('#1A1A29', 0.5),
      }}
    >
      <Avatar
        src={data.images.length > 1 ? data.images[0].url : undefined}
        name={data.name}
        variant='squircle'
        css={{ size: '28px' }}
      />
      <Text>{data.name}</Text>
    </HStack>
  );
}

function SearchSpotifyArtist() {
  const { data } = useSuspenseExternalAccount('Spotify');
  const { addExternalAccount } = useAddExternalAccount();

  const { update, state } =
    useGeneralContext<ISocialMediaAccountsViewContext>();

  const [value, setValue] = useState('');

  const [search, { result, loading, error }] =
    useSpotifyArtistSearch<IOffsetPage<ISpotifySearchResult>>();

  const handleValueChange = async (value: string) => {
    setValue(value);

    search(value);
  };

  useEffect(() => {
    if (data.externalAccount) {
      update({ externalAccount: data.externalAccount });
    }
  }, [data.externalAccount]);

  const keyExtractor = ({ item }: Item) => item.id;

  const saveItem = async (item: ISpotifySearchResult) => {
    await addExternalAccount({
      externalId: item.id,
      provider: 'Spotify',
      url: item.url,
      username: item.name,
      avatar: item.images[0].url,
    }).then(() =>
      update({
        externalAccount: {
          id: -1,
          externalId: item.id,
          avatar: item.images[0].url,
          username: item.name,
          provider: 'Spotify',
          url: item.url,
        },
      }),
    );
  };

  return (
    <Box zIndex={25}>
      {state.externalAccount ? (
        <SpotifyItem />
      ) : (
        <Spotlight
          showSearchIcon={false}
          pt={0}
          pb={0}
          border={1}
          borderColor='rgba(152, 152, 255, 0.35)'
          bgColor='rgba(152, 152, 255, 0.15)'
          radius={1}
          _active={{
            border: '1px solid rgba(152, 152, 255, 1)',
          }}
        >
          <Spotlight.Input
            node={
              document.getElementById('profile-setup-content') ||
              document.body
            }
            css={{ px: '.25rem' }}
            value={value}
            placeholderText='Search for Spotify account'
            onValueChange={handleValueChange}
            showClearButton={false}
            Loader={
              <CircularProgress
                bgColor='base400'
                colorTheme='white500'
                thickness={2}
                isIndeterminate
                size={20}
              />
            }
            isLoading={loading}
          />
          {result && (
            <Spotlight.Content
              border={result.data.length > 0 ? 1 : 0}
              borderColor={hexToRGB('#9898FF', 0.35)}
              bgColor='#404066'
              radius={1}
              maxHeight={300}
              overflowY='scroll'
              css={{
                boxShadow: '0px 4px 25px 0px #26263B',
              }}
            >
              {value.length > 0 && !error && !loading && (
                <Spotlight.List
                  data={result.data}
                  onClickItem={async ({ item }) => {
                    await saveItem(item);
                  }}
                  renderItem={({ item }: Item, isSelected) => (
                    <ResultItem isSelected={isSelected} data={item} />
                  )}
                  keyExtractor={keyExtractor}
                />
              )}
            </Spotlight.Content>
          )}
        </Spotlight>
      )}
    </Box>
  );
}

interface ISocialAccounts {
  instagramURL?: string;
  xURL?: string;
  tiktokURL?: string;
}

interface ISocialLink {
  provider: SocialProvider;
  url: string;
}

interface TextInputFieldProps {
  name: string;
  label: string;
  value?: string;
  tooltip: string;
  placeholder: string;
  errorText?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function TextInputField({
  name,
  errorText,
  label,
  value,
  onChange,
  tooltip,
  placeholder,
}: TextInputFieldProps) {
  // useful for rendering the tooltip in the right container - with correct z-index
  const node =
    document.getElementById('profile-setup-content') || document.body;

  return (
    <VStack gap={1}>
      <VStack gap={2}>
        <HStack color='white700' gap={1} items='center'>
          <Text size={1} as='label' htmlFor={name}>
            {label}
          </Text>
          <Tooltip>
            <TooltipTrigger display='flex' css={{ alignItems: 'center' }}>
              <Icon name='information-outline' />
            </TooltipTrigger>
            <TooltipContent
              arrowWidth={0}
              arrowHeight={0}
              maxWidth={250}
              sideOffset={-16}
              side='right'
              align='start'
              fontSize={1}
              container={node}
              bgColor='#202032'
              border={1}
              borderColor={hexToRGB('#9898FF', 0.25)}
            >
              {tooltip}
            </TooltipContent>
          </Tooltip>
        </HStack>
        <Input
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          radius={1}
          className={customInputStyles()}
          color='white500'
          placeholder={placeholder}
        />
      </VStack>
      {errorText && errorText.length && (
        <Text weight={500} color='danger400' as='sm' size={1}>
          {errorText}
        </Text>
      )}
    </VStack>
  );
}

type SocialURL = 'instagramURL' | 'xURL' | 'tiktokURL';

const PlatformInfo: Record<
  SocialURL,
  { name: SocialProvider; regExp: RegExp }
> = {
  instagramURL: {
    name: 'Instagram',
    regExp: /^https:\/\/(www\.)?instagram.com\/.+/,
  },
  tiktokURL: {
    name: 'TikTok',
    regExp: /^https:\/\/(www\.)?tiktok.com\/.+/,
  },
  xURL: {
    name: 'X',
    regExp: /^https:\/\/(www\.)?twitter.com\/.+/,
  },
};

const isPlatformURL = (name: string, value?: string) => {
  if (value === undefined || value.length === 0) return undefined;

  const patternRegex = new RegExp(PlatformInfo[name as SocialURL].regExp);

  return matchesPattern(value, patternRegex)
    ? undefined
    : `Enter a valid ${PlatformInfo[name as SocialURL].name} URL`;
};

function SocialLinksForm() {
  const { data } = useSuspenseSocialLinks();

  const { update, state } =
    useGeneralContext<ISocialMediaAccountsViewContext>();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    update({
      links: { ...state.links, [name]: value },
      isDisabled: state.isDisabled && !!isPlatformURL(name, value),
    });
  };

  const providerToURLName: Record<SocialProvider, SocialURL> = {
    Instagram: 'instagramURL',
    X: 'xURL',
    TikTok: 'tiktokURL',
  };

  useEffect(() => {
    update({
      links: data.socialLinks.reduce(
        (prev, curr) => ({
          ...prev,
          [providerToURLName[curr.provider]]: curr.url,
        }),
        {},
      ),
    });
  }, []);

  return (
    <VStack gap={4}>
      <VStack gap={2}>
        <TextInputField
          name='instagramURL'
          label='instagram URL'
          value={state.links.instagramURL}
          tooltip='Enter your Instagram URL for your fans to connect with you'
          placeholder='Enter your Instagram link'
          onChange={handleOnChange}
          errorText={isPlatformURL(
            'instagramURL',
            state.links.instagramURL,
          )}
        />
        <TextInputField
          name='tiktokURL'
          label='TikTok URL'
          value={state.links.tiktokURL}
          tooltip='Enter your TikTok URL for your fans to connect with you'
          placeholder='Enter your TikTok link'
          onChange={handleOnChange}
          errorText={isPlatformURL('tiktokURL', state.links.tiktokURL)}
        />
        <TextInputField
          name='xURL'
          label='X URL'
          value={state.links.xURL}
          tooltip='Enter your X URL for your fans to connect with you'
          placeholder='Enter your X link'
          onChange={handleOnChange}
          errorText={isPlatformURL('xURL', state.links.xURL)}
        />
      </VStack>
    </VStack>
  );
}

function SocialMediaAccountsView() {
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
          <GQLRenderer ErrorFallback={() => <Fragment />}>
            <SearchSpotifyArtist />
          </GQLRenderer>
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
          b='1.5rem'
          l='3rem'
          r='3rem'
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
              const keys = Object.keys(state.links) as SocialURL[];

              const links = keys
                .map(
                  (key): ISocialLink => ({
                    provider: PlatformInfo[key].name,
                    url: state.links[key] ?? '',
                  }),
                )
                .filter((item) => item.url !== 'none');

              // [OPTIMIZATION]: Check if the links have even changed before trying to update

              await updateSocialLink(links).then(() =>
                navigate(
                  makePath([
                    Paths.setupProfile,
                    Paths.artist,
                    Paths.setupArtist.customURL,
                  ]),
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
