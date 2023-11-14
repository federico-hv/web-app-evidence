import { HStack, Image } from '@holdr-ui/react';
import { TextGroup, TextGroupSubheading } from '../index';
import { InfoItemProps } from './types';

function InfoItem({
  title,
  description,
  imageSrc,
  imageAltText,
}: InfoItemProps) {
  return (
    <HStack gap={{ '@bp1': 3, '@bp3': 4 }}>
      <Image
        size={{ '@bp1': 20, '@bp3': 30 }}
        src={imageSrc}
        alt={imageAltText}
      />
      <TextGroup gap={0}>
        <TextGroupSubheading
          css={{ userSelect: 'none' }}
          weight={500}
          size={{ '@bp1': 2, '@bp3': 3 }}
        >
          {title}
        </TextGroupSubheading>
        <TextGroupSubheading
          css={{ userSelect: 'none' }}
          color='base400'
          size={{ '@bp1': 1, '@bp3': 2 }}
        >
          {description}
        </TextGroupSubheading>
      </TextGroup>
    </HStack>
  );
}
InfoItem.displayName = 'InfoItem';

export default InfoItem;
