import {
  makeButtonLarger,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  usePreviousLocation,
} from '../../../../shared';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Input,
  Switch,
  useRecordState,
  VStack,
} from '@holdr-ui/react';
import {
  ICreateBookmarkGroup,
  useCreateBookmarkGroup,
} from '../../../../features';

function CreateBookmarkGroup() {
  const previousLocation = usePreviousLocation('/');
  const navigate = useNavigate();

  const [state, update] = useRecordState<ICreateBookmarkGroup>({
    name: '',
    isPrivate: false,
  });

  const { loading, createBookmarkGroup } = useCreateBookmarkGroup();

  return (
    <VStack>
      <Box borderBottom={1} borderColor='rgba(152, 152, 255, 0.10)' p={4}>
        <Heading color='white500' weight={400} size={4} as='h2'>
          Create Bookmark Group
        </Heading>
      </Box>
      <VStack as='form' px={4} pb={4} gap={5} h='100%'>
        <Box>
          <FormControl>
            <Input
              autoFocus
              onChange={(e) => update({ name: e.target.value })}
              name={state.name}
              value={state.name}
              color='white500'
              focusColor='purple500'
              type='text'
              maxLength={60}
              variant='flushed'
              placeholder='Group Name'
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
              Public
            </TextGroupHeading>
            <TextGroupSubheading
              color='white700'
              size={{ '@bp1': 1, '@bp3': 2 }}
            >
              Anyone will be able to view this bookmark group on your
              profile
            </TextGroupSubheading>
          </TextGroup>
          <Switch
            colorTheme='purple500'
            size={{ '@bp1': 'sm', '@bp3': 'base' }}
            name='isPrivate'
            onChange={(e) => {
              update({ isPrivate: !!e.target.value });
            }}
            defaultChecked={false}
            value={`${state.isPrivate}`}
            checked={state.isPrivate}
          />
        </HStack>
        <Button
          type='submit'
          disabled={state.name.length === 0}
          isLoading={loading}
          loadingText='Create Group'
          onClick={async () => {
            await createBookmarkGroup(state.name, state.isPrivate).then(
              () => navigate(previousLocation),
            );
          }}
          colorTheme='purple500'
          fullWidth
          radius={2}
          className={makeButtonLarger('2.5rem', '15px')}
        >
          Create Group
        </Button>
      </VStack>
    </VStack>
  );
}
CreateBookmarkGroup.displayName = 'CreateBookmarkGroup';

export default CreateBookmarkGroup;
