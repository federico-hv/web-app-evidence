import {
  useCurrentUser,
  useSuspenseSocialLinks,
} from '../../../../../features';
import { VStack } from '@holdr-ui/react';
import { ChangeEvent, useEffect } from 'react';
import {
  isMatchingPattern,
  PatternErrorMessage,
  Patterns,
  SocialProvider,
  InputTextField,
  useGeneralContext,
} from '../../../../../shared';
import {
  ISocialMediaAccountsViewContext,
  SocialPlatformInfo,
} from '../shared';

function SocialLinksForm() {
  const currentUser = useCurrentUser();

  const { data } = useSuspenseSocialLinks(currentUser.id);

  const { update, state } =
    useGeneralContext<ISocialMediaAccountsViewContext>();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    update({
      links: { ...state.links, [name]: value },
      // TODO: Find a better solution
      isDisabled:
        state.isDisabled &&
        !!isMatchingPattern(
          name as SocialProvider,
          SocialPlatformInfo[name as SocialProvider].regExp,
        ),
    });
  };

  useEffect(() => {
    update({
      links: data.socialLinks.reduce(
        (prev, curr) => ({
          ...prev,
          [curr.provider]: curr.url,
        }),
        {},
      ),
    });
  }, []);

  return (
    <VStack gap={4}>
      <VStack gap={2}>
        <InputTextField
          name='Instagram'
          label='Instagram URL'
          value={state.links.Instagram}
          tooltip='Enter your Instagram URL for your fans to connect with you'
          placeholder='Enter your Instagram link'
          onChange={handleOnChange}
          errorText={isMatchingPattern(
            state.links.Instagram,
            Patterns.InstagramURL,
            PatternErrorMessage.invalid('Instagram URL'),
          )}
        />
        <InputTextField
          name='TikTok'
          label='TikTok URL'
          value={state.links.TikTok}
          tooltip='Enter your TikTok URL for your fans to connect with you'
          placeholder='Enter your TikTok link'
          onChange={handleOnChange}
          errorText={isMatchingPattern(
            state.links.TikTok,
            Patterns.TikTokURL,
            PatternErrorMessage.invalid('TikTok URL'),
          )}
        />
        <InputTextField
          name='X'
          label='X URL'
          value={state.links.X}
          tooltip='Enter your X URL for your fans to connect with you'
          placeholder='Enter your X link'
          onChange={handleOnChange}
          errorText={isMatchingPattern(
            state.links.X,
            Patterns.XURL,
            PatternErrorMessage.invalid('X URL'),
          )}
        />
      </VStack>
    </VStack>
  );
}
SocialLinksForm.displayName = 'SocialLinksForm';

export default SocialLinksForm;
