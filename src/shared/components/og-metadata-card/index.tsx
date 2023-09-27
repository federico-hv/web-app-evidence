import { Box, Image, Stack } from '@holdr-ui/react';
import { LinkOverlay } from '../../styles';
import {
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../index';
import { OgMetadata } from '../../interfaces';

function OgMetadataCard({ data }: { data: OgMetadata }) {
  return (
    <Stack
      direction={{
        '@bp1': 'vertical',
        '@bp3': 'horizontal',
      }}
      border={1}
      borderColor='base100'
      position='relative'
      r={2}
      divider={
        <Box borderRight={1} borderColor='base100' position='relative' />
      }
    >
      <LinkOverlay target='_blank' to={data.url} />

      <Box p={3} w={{ '@bp1': '100%', '@bp3': 'fit-content' }}>
        <Image
          w={{ '@bp1': '100%', '@bp3': '100px' }}
          h={{ '@bp1': '250px', '@bp3': '100px' }}
          src={data.images[0].url}
          alt={data.title}
        />
      </Box>

      <TextGroup p={3}>
        <TextGroupHeading
          noOfLines={2}
          title={data.title}
          size={3}
          weight={500}
        >
          {data.title}
        </TextGroupHeading>
        <TextGroupSubheading size={2} noOfLines={2}>
          {data.description}
        </TextGroupSubheading>
        <TextGroupSubheading
          size={2}
          weight={500}
          css={{ marginTop: '$2' }}
        >
          {data.site.name}
        </TextGroupSubheading>
      </TextGroup>
    </Stack>
  );
}
OgMetadataCard.displayName = 'OgMetadataCard';

export default OgMetadataCard;
