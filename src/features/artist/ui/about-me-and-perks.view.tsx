import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  HStack,
  mergeStyles,
  Text,
  Textarea,
  VStack,
} from '@holdr-ui/react';
import {
  customInputStyles,
  makePath,
  Paths,
  textAreaClassName,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../shared';
import { useGetAvailablePerks } from '../../clubs';

function AboutMeAndPerksView() {
  const perks = useGetAvailablePerks();

  const navigate = useNavigate();

  function PerkOption({ label, name }: { label: string; name: string }) {
    return (
      <Text
        as='label'
        htmlFor={name}
        css={{
          cursor: 'pointer',
          '& input:checked ~ .perk-option': {
            color: '#30304B',
            backgroundColor: '$purple100',
          },
        }}
      >
        <input id={name} name={name} type='checkbox' hidden />
        <Box
          className='perk-option'
          fontSize={1}
          px={2}
          py={1}
          color='purple100'
          borderColor='purple100'
          border={1}
          radius='full'
        >
          {label}
        </Box>
      </Text>
    );
  }

  return (
    <VStack gap={9} pl={2} h='100%' overflow='auto'>
      <VStack gap={4}>
        <TextGroup gap={0}>
          <TextGroupHeading size={4}>About Me</TextGroupHeading>
          <TextGroupSubheading size={1} color='white700'>
            Introduce yourself to your fans and share your music journey,
            and what inspires your artistry
          </TextGroupSubheading>
        </TextGroup>
        <Textarea
          className={mergeStyles([
            textAreaClassName(),
            customInputStyles(),
          ])}
          radius={2}
          maxLines={5}
          colorTheme='white700' // extend with string
          placeholder='Share your story with your fans'
          /*_placeholder={{}}*/
          /*css={{}}*/
        />
      </VStack>
      <VStack gap={4}>
        <TextGroup gap={0}>
          <TextGroupHeading size={4}>Perks</TextGroupHeading>
          <TextGroupSubheading size={1} color='white700'>
            Choose what perks you would like to offer to your fans
          </TextGroupSubheading>
        </TextGroup>
        <HStack gap={2} wrap='wrap'>
          {perks.map(({ id, label }) => (
            <PerkOption key={id} name={id} label={label} />
          ))}
        </HStack>
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
          onClick={() =>
            navigate(
              makePath([
                Paths.setupProfile,
                Paths.artist,
                Paths.setupArtist.uploadPhoto,
              ]),
            )
          }
          variant='outline'
          radius={1}
          colorTheme='purple200'
          css={{ px: '40px' }}
        >
          Go back
        </Button>
        <Button
          onClick={() =>
            navigate(
              makePath([
                Paths.setupProfile,
                Paths.artist,
                Paths.setupArtist.socialMediaAccounts,
              ]),
            )
          }
          radius={1}
          colorTheme='purple500'
          css={{ px: '28px' }}
        >
          Continue
        </Button>
      </HStack>
    </VStack>
  );
}
AboutMeAndPerksView.displayName = 'AboutMeAndPerksView';

export default AboutMeAndPerksView;
