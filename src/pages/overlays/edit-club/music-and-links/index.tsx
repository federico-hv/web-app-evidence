import {
  Box,
  Button,
  CloseButton,
  HStack,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectItemList,
  SelectTrigger,
  Text,
  VStack,
} from '@holdr-ui/react';
import {
  customInputStyles,
  InformationTooltip,
  makeButtonLarger,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  voidFn,
} from '../../../../shared';
import { SearchSpotifyTrack } from '../../../../features';
import { FlatList } from '../../../../tmp/flat-list';
import InputTextField from '../../../../shared/components/text-field';
import { useState } from 'react';

export enum ExternalLinkTypeEnum {
  Other = 'other',
  Event = 'event',
  Merch = 'merch',
}

function TextAndOptionFieldWithClose() {
  return (
    <HStack>
      <Select value={ExternalLinkTypeEnum.Other}>
        <SelectTrigger
          radius={0}
          placeholder='Type'
          css={{
            whiteSpace: 'nowrap',
            border: '1px solid rgba(152, 152, 255, 0.10)',
            background: 'rgba(152, 152, 255, 0.1)',

            borderTopRightRadius: '$0',
            borderBottomRightRadius: '$0',
            borderTopLeftRadius: '$2',
            borderBottomLeftRadius: '$2',
          }}
        />
        <SelectContent zIndex={20} sticky='always'>
          <SelectItemList
            _active={{ color: '$purple200' }}
            _hover={{ background: 'rgba(14, 14, 27, 0.50)' }}
            _highlighted={{ background: 'rgba(14, 14, 27, 0.50)' }}
            // w={180}
            divider={
              <Box
                h='1px'
                w='100%'
                css={{
                  background: 'rgba(152, 152, 255, 0.1)',
                }}
              />
            }
            position='relative'
            css={{
              marginLeft: '1px',
              boxShadow: '0px 4px 12px 0px rgba(14, 14, 27, 0.08)',
              background: 'rgba(152, 152, 255, 0.1)',
              backdropFilter: 'blur(40px)',
              // borderBottomLeftRadius: '$2',
              // borderBottomRightRadius: '$2',
              border: '1px solid rgba(152, 152, 255, 0.1)',
              borderTop: 'none',
            }}
          >
            <SelectItem
              py={2}
              radius={1}
              value={ExternalLinkTypeEnum.Event}
              label='Event'
            />
            <SelectItem
              py={2}
              radius={1}
              value={ExternalLinkTypeEnum.Merch}
              label='Merch'
            />
            <SelectItem
              py={2}
              radius={1}
              value={ExternalLinkTypeEnum.Other}
              label='Other'
            />
          </SelectItemList>
        </SelectContent>
      </Select>
      <HStack position='relative' w='100%' gap={2} items='center'>
        <Input
          color='white500'
          className={customInputStyles()}
          css={{
            paddingInlineEnd: '$10',
            borderTopRightRadius: '$2',
            borderBottomRightRadius: '2',
            borderTopLeftRadius: '$0',
            borderBottomLeftRadius: '$0',
          }}
        />
        <CloseButton
          type='button'
          css={{
            position: 'absolute',
            right: '$3',
            width: '1rem !important',
          }}
          size='sm'
          className={makeButtonLarger('1rem')}
          colorTheme='white700'
        />
      </HStack>
    </HStack>
  );
}

function InputTextFieldWithClose() {
  return (
    <HStack position='relative' w='100%' gap={2} items='center'>
      <InputTextField
        name='dummy'
        placeholder='Add announcement'
        css={{ paddingInlineEnd: '$10' }}
      />
      <CloseButton
        type='button'
        css={{
          position: 'absolute',
          right: '$3',
          width: '1rem !important',
        }}
        size='sm'
        className={makeButtonLarger('1rem')}
        colorTheme='white700'
      />
    </HStack>
  );
}

function EditArtistClubMusicAndLinksPage() {
  const [announcements, setAnnouncements] = useState<
    { id?: number; description: string }[]
  >([{ id: 1, description: '' }]);

  const [externalLinks, setExternalLinks] = useState<
    { id?: number; url: string; type: 'other' | 'event' | 'merch' }[]
  >([{ id: 1, url: '', type: ExternalLinkTypeEnum.Other }]);

  return (
    <VStack
      as='form'
      gap={8}
      h='100%'
      overflowY='auto'
      pr={4}
      className='thin-scrollbar'
    >
      <VStack gap={4}>
        <TextGroup gap={0}>
          <TextGroupHeading as='h2' size={3} weight={500}>
            {"Artist's Picks"}
          </TextGroupHeading>
          <TextGroupSubheading size={1} color='white700'>
            Choose the songs you want to display on your club page
          </TextGroupSubheading>
        </TextGroup>

        <VStack gap={2}>
          <HStack color='white700' gap={1} items='center'>
            <Text weight={500} size={2} as='label'>
              Artist Pick
            </Text>
            <InformationTooltip
              side='right'
              align='start'
              container={
                document.getElementById('page-dialog-container') ||
                document.body
              }
              description='Search for your songs on Spotify that you want to highlight.'
            />
          </HStack>
          <SearchSpotifyTrack onSelect={voidFn} />
        </VStack>
      </VStack>
      <VStack gap={4}>
        <TextGroup gap={0}>
          <TextGroupHeading as='h2' size={3} weight={500}>
            Announcements
          </TextGroupHeading>
          <TextGroupSubheading size={1} color='white700'>
            Enter any announcements you want to make to your fans
          </TextGroupSubheading>
        </TextGroup>
        <FlatList
          gap={4}
          direction='vertical'
          data={announcements}
          renderItem={(item, idx) => <InputTextFieldWithClose />}
          keyExtractor={(item) => `announcement-id-${item}`}
        />
        <Button
          type='button'
          onClick={() =>
            setAnnouncements((prev) => [
              ...prev,
              { id: undefined, description: '' },
            ])
          }
          variant='ghost'
          leftIcon='add'
          size='sm'
          colorTheme='white700'
          radius={1}
          css={{
            fontSize: '$1 !important',
          }}
        >
          Add announcement
        </Button>
      </VStack>

      <VStack gap={4}>
        <TextGroup gap={0}>
          <TextGroupHeading as='h2' size={3} weight={500}>
            Links
          </TextGroupHeading>
          <TextGroupSubheading size={1} color='white700'>
            Enter any links you want to make your fans to have access to
          </TextGroupSubheading>
        </TextGroup>
        <FlatList
          gap={4}
          direction='vertical'
          data={externalLinks}
          renderItem={(item, idx) => <TextAndOptionFieldWithClose />}
          keyExtractor={(item) => `external-link-id-${item}`}
        />
        <Button
          type='button'
          onClick={() =>
            setExternalLinks((prev) => [
              ...prev,
              { id: undefined, url: '', type: ExternalLinkTypeEnum.Other },
            ])
          }
          variant='ghost'
          leftIcon='add'
          size='sm'
          colorTheme='white700'
          radius={1}
          css={{
            fontSize: '$1 !important',
          }}
        >
          Add link
        </Button>
      </VStack>
    </VStack>
  );
}
EditArtistClubMusicAndLinksPage.displayName =
  'EditArtistClubMusicAndLinksPage';

export default EditArtistClubMusicAndLinksPage;
