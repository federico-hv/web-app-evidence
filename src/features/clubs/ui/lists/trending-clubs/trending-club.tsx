import { Avatar, HStack, Text, VStack } from '@holdr-ui/react';
import {
  Asset,
  LinkOverlay,
  makePath,
  Paths,
} from '../../../../../shared';
import { TrendingClubProps } from './types';

function TrendingClub({ id, name, tags }: TrendingClubProps) {
  return (
    <HStack gap={3} position='relative'>
      <LinkOverlay to={makePath([Paths.clubs, id])} />
      <Avatar
        name={name}
        src={Asset.Image.DarkPlaceholder}
        size='lg'
        variant='squircle'
      />
      <VStack mt={2} gap={2}>
        <Text casing='capitalize' size='14px' weight={500}>
          {name}
        </Text>
        {tags && (
          <HStack>
            {tags.map((tag) => (
              <Text noOfLines={1} key={tag} size='12px' color='info400'>
                #{tag}
              </Text>
            ))}
          </HStack>
        )}
      </VStack>
    </HStack>
  );
}
TrendingClub.displayName = 'TrendingClub';

export default TrendingClub;
