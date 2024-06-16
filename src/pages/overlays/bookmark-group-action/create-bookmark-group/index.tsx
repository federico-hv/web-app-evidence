import {
  customInputStyles,
  InformationTooltip,
  LoadWithoutPreviousLocation,
  makeButtonLarger,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  usePreviousLocation,
} from '../../../../shared';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Input,
  Switch,
  Text,
  useRecordState,
  VStack,
} from '@holdr-ui/react';
import {
  ICreateBookmarkGroup,
  useCreateBookmarkGroup,
} from '../../../../features';

function CreateBookmarkGroup() {
  const previousLocation = usePreviousLocation('/');

  const node =
    document.getElementById('page-dialog-container') || document.body;

  const { state: pathState } = useLocation();

  const navigate = useNavigate();

  const [state, update] = useRecordState<ICreateBookmarkGroup>({
    name: '',
    isPrivate: false,
  });

  const { loading, createBookmarkGroup } = useCreateBookmarkGroup();

  return (
    <VStack w={450} color='white500'>
      <Box borderBottom={1} borderColor='rgba(152, 152, 255, 0.10)' p={4}>
        <Heading color='white500' weight={500} size={6} as='h2'>
          Create Bookmark Group
        </Heading>
      </Box>
      <VStack as='form' mt={4} px={4} pb={4} gap={5} h='100%'>
        <Box>
          <HStack mb={3} items='center' gap={2}>
            <Text as='label'>Title</Text>
            <Box fontSize={2}>
              <InformationTooltip
                side='right'
                sideOffset={1}
                container={node}
                color='white700'
                description='Waiting for info'
              />
            </Box>
          </HStack>
          <FormControl>
            <Input
              autoFocus
              onChange={(e) => update({ name: e.target.value })}
              name={state.name}
              value={state.name}
              focusColor='purple500'
              type='text'
              maxLength={60}
              radius={1}
              className={customInputStyles()}
              color='white500'
              placeholder='Enter group name'
            />
            <FormControl.HelperText>
              {state.name.length} / 60
            </FormControl.HelperText>
          </FormControl>
        </Box>
        <HStack gap={2}>
          <TextGroup>
            <TextGroupHeading
              color='white500'
              as='h2'
              size={{ '@bp1': 2, '@bp3': 3 }}
            >
              Public Group
            </TextGroupHeading>
            <HStack justify='space-between'>
              <TextGroupSubheading
                as='label'
                htmlFor='visibility_switch'
                color='white700'
                size={1}
                css={{
                  userSelect: 'none',
                }}
              >
                Anyone can view this group on your profile
              </TextGroupSubheading>
              <Switch
                id='visibility_switch'
                colorTheme='base500'
                size={{ '@bp1': 'sm', '@bp3': 'base' }}
                name='isPrivate'
                onChange={(e) => {
                  console.log(e.target.value);

                  update({
                    isPrivate: !(e.target.value === 'true'),
                  });
                }}
                defaultChecked={false}
                value={`${state.isPrivate}`}
                checked={state.isPrivate}
              />
            </HStack>
          </TextGroup>
        </HStack>
        <HStack gap={2} justify='flex-end'>
          <Button
            type='submit'
            onClick={() => navigate(previousLocation)}
            variant='ghost'
            colorTheme='purple300'
            radius={1}
            css={{
              px: '$7',
            }}
          >
            Close
          </Button>
          <Button
            type='submit'
            disabled={state.name.length === 0}
            isLoading={loading}
            loadingText='Create Group'
            onClick={async () => {
              console.log(pathState);
              await createBookmarkGroup(state.name, state.isPrivate).then(
                () =>
                  navigate(
                    pathState.overlayPreviousLocation
                      ? pathState.overlayPreviousLocation
                      : previousLocation,
                  ),
              );
            }}
            colorTheme='purple500'
            radius={1}
            css={{
              px: '$7',
            }}
          >
            Create
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
}
CreateBookmarkGroup.displayName = 'CreateBookmarkGroup';

export default CreateBookmarkGroup;
