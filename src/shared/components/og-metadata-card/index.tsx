import { Box, Image, Text, Stack, VStack } from '@holdr-ui/react';
import { LinkOverlay } from '../../styles';
import {
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../index';
import { OgMetadata } from '../../interfaces';
import { Asset } from '../../constants';

function OgMetadataCard({ data }: { data: OgMetadata }) {
  console.log(data);
  return (
    <Stack
      direction={{
        '@bp1': 'vertical',
        '@bp3': 'horizontal',
      }}
      position='relative'
      radius={1}
      h='100%'
      css={{
        backgroundColor: '#1A1A29',
      }}
    >
      <LinkOverlay target='_blank' to={data.url} />

      <Box p={3} w={{ '@bp1': '100%', '@bp3': 'fit-content' }}>
        <Image
          w={{ '@bp1': '100%', '@bp3': '100px' }}
          h={{ '@bp1': '250px', '@bp3': '100px' }}
          src={data.images[0].url}
          alt={data.title}
          fallbackSrc={Asset.Image.DarkPlaceholder}
        />
      </Box>

      <VStack h='100%' w='100%' py={3} pr={3} justify='space-between'>
        <TextGroup>
          <TextGroupHeading
            noOfLines={1}
            title={data.title}
            size={5}
            color='white500'
            weight={500}
          >
            {data.title}
          </TextGroupHeading>
          <TextGroupSubheading
            color='white500'
            weight={300}
            size={2}
            noOfLines={2}
          >
            {data.description}
          </TextGroupSubheading>
        </TextGroup>
        <Text
          size={1}
          weight={500}
          casing='capitalize'
          color='white500'
          css={{ marginTop: '$2' }}
        >
          {data.site.name}
        </Text>
      </VStack>
    </Stack>
  );
}
OgMetadataCard.displayName = 'OgMetadataCard';

export default OgMetadataCard;
