import {
  SocialProvider,
  useCurrentArtist,
  useSuspenseSocialLinks,
} from '../../../../../features';
import { VStack } from '@holdr-ui/react';
import { ChangeEvent, useEffect } from 'react';
import { matchesPattern, useGeneralContext } from '../../../../../shared';
import {
  ISocialMediaAccountsViewContext,
  PlatformInfo,
  SocialURLName,
} from '../shared';
import TextInputField from './text-input-field';

function SocialLinksForm() {
  const artist = useCurrentArtist();

  const { data } = useSuspenseSocialLinks(artist?.id || '');

  const { update, state } =
    useGeneralContext<ISocialMediaAccountsViewContext>();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    update({
      links: { ...state.links, [name]: value },
      isDisabled: state.isDisabled && !!isPlatformURL(name, value),
    });
  };

  const isPlatformURL = (name: string, value?: string) => {
    if (value === undefined || value.length === 0) return undefined;

    const patternRegex = new RegExp(
      PlatformInfo[name as SocialURLName].regExp,
    );

    return matchesPattern(value, patternRegex)
      ? undefined
      : `Enter a valid ${PlatformInfo[name as SocialURLName].name} URL`;
  };

  const providerToURLName: Record<SocialProvider, SocialURLName> = {
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
          label='Instagram URL'
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
SocialLinksForm.displayName = 'SocialLinksForm';

export default SocialLinksForm;
