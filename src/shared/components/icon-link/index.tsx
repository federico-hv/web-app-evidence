import {
  IconName,
  ResponsiveValue,
} from '@holdr-ui/react/dist/shared/types';
import { Center, FontSize, Icon, StringNumeric } from '@holdr-ui/react';
import { LinkOverlay } from '../../styles';

interface IconLinkProps {
  iconName: IconName;
  isExternal?: boolean;
  fontSize?: ResponsiveValue<FontSize | StringNumeric>;
  to?: string;
}

function IconLink({
  fontSize = 8,
  iconName = 'spotify-fill',
  to,
  isExternal = true,
}: IconLinkProps) {
  return (
    <Center
      fontSize={fontSize}
      position='relative'
      css={{ '& span': { height: 'fit-content' } }}
    >
      <LinkOverlay to={to} target={isExternal ? '_blank' : '_self'} />
      <Icon color='white600' name={iconName} />
    </Center>
  );
}
IconLink.displayName = 'IconLink';

export default IconLink;
