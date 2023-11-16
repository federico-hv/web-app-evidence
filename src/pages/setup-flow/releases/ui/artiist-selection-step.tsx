import {
  arrayFrom,
  Head,
  hexToRGB,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  useGeneralContext,
} from '../../../../shared';
import {
  Avatar,
  Box,
  Center,
  Checkbox,
  Grid,
  HStack,
  Text,
  VStack,
} from '@holdr-ui/react';
import { IUnconnectedDialogContext } from '../shared';
import { Fragment, useEffect, useState } from 'react';

function ArtistSelectionStep() {
  const { state, update } = useGeneralContext<IUnconnectedDialogContext>();

  const artists = arrayFrom(31);

  return (
    <VStack h='calc(100% - 27px)' position='relative'>
      <VStack
        gap={5}
        pb={1}
        h={state.ids.length > 0 ? 'calc(100% - 51px)' : '100%'}
      >
        <TextGroup mt={3}>
          <TextGroupHeading casing='capitalize'>
            Select Artists
          </TextGroupHeading>
          <TextGroupSubheading size={2}>
            Here are artists that we found in your library you do not
            follow on Holdr.
          </TextGroupSubheading>
        </TextGroup>

        <Box h='100%' overflow='auto'>
          <Grid gap={5} templateColumns={'repeat(3, 1fr)'}>
            {artists.map((idx) => (
              <Grid.Item key={idx} justifySelf='center'>
                <ArtistOption name={`Artist ${idx + 1}`} id={`${idx}`} />
              </Grid.Item>
            ))}
          </Grid>
        </Box>
      </VStack>
      {state.ids.length > 0 && (
        <HStack
          position='absolute'
          b={0}
          l={0}
          w='100%'
          bgColor='transparent'
          css={{ zIndex: 15 }}
        >
          {state.ids.length > 0 && (
            <Center
              py={4}
              radius={3}
              flex={1}
              cursor='pointer'
              _hover={{ backgroundColor: '$base100' }}
              onClick={() => update({ ids: artists.map((id) => '' + id) })}
            >
              <Text weight={500}>Select All</Text>
            </Center>
          )}
          {state.ids.length > 1 && (
            <Center
              radius={3}
              py={4}
              flex={1}
              cursor='pointer'
              _hover={{ backgroundColor: hexToRGB('#d3190b', 0.075) }}
              onClick={() => update({ ids: [] })}
            >
              <Text color='danger' weight={500}>
                Remove All
              </Text>
            </Center>
          )}
        </HStack>
      )}
    </VStack>
  );
}
ArtistSelectionStep.displayName = 'ArtistSelectionStep';

function ArtistOption({
  id,
  name,
}: {
  id: string;

  name: string;
}) {
  const { update, state } = useGeneralContext<IUnconnectedDialogContext>();

  const [visible, setVisible] = useState(
    state.ids.findIndex((_id) => _id === id) >= 0,
  );

  useEffect(() => {
    setVisible(state.ids.findIndex((_id) => _id === id) >= 0);
  }, [id, state]);

  return (
    <Fragment>
      <Head prefix='' title='Artist selection' />
      <VStack
        as='label'
        position='relative'
        items='center'
        justify='center'
        gap={1}
        w='fit-content'
        maxWidth='100px'
        onClick={(e) => {
          setVisible((prev) => {
            if (!prev) {
              update({ ids: [...state.ids, id] });
            } else {
              // remove from list
              update({ ids: state.ids.filter((_id) => _id !== id) });
            }

            return !prev;
          });

          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Box position='absolute' t={0} r='-10px' zIndex={10}>
          {visible && (
            <Checkbox
              readOnly
              value={`${visible}`}
              checked={visible}
              size='sm'
              colorTheme='secondary400'
              labelledBy='artist-name'
            />
          )}
        </Box>
        <Box position='relative' zIndex={1}>
          <Avatar variant='squircle' size='lg' />
        </Box>
        <Text css={{ width: '100%', textAlign: 'center' }} size={2}>
          {name}
        </Text>
      </VStack>
    </Fragment>
  );
}

export default ArtistSelectionStep;
