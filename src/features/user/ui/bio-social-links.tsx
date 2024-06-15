import { IconName } from '@holdr-ui/react/dist/shared/types';
import { HStack } from '@holdr-ui/react';
import { orderBy } from 'lodash';
import { IconLink, ISocialLink, SocialProvider } from '../../../shared';

function BioSocialLinks({ links }: { links: ISocialLink[] }) {
  const toIcon: Record<SocialProvider, IconName> = {
    Instagram: 'instagram',
    X: 'x-twitter',
    TikTok: 'tiktok',
  };

  return (
    <HStack gap={4}>
      {orderBy(links, ['provider'], 'asc').map((link) => (
        <IconLink
          key={link.provider}
          to={link.url}
          iconName={toIcon[link.provider]}
        />
      ))}
    </HStack>
  );
}
BioSocialLinks.displayName = 'BioSocialLinks';

export default BioSocialLinks;
