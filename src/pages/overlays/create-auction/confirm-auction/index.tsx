import {
  Box,
  Button,
  HStack,
  useRecordState,
  VStack,
} from '@holdr-ui/react';
import {
  arrayFrom,
  handleFieldError,
  hasAllUndefinedKeyValues,
  InputTextField,
  lightSelectCSS,
  makePath,
  missingField,
  NavigateWithPreviousLocation,
  Paths,
  SelectInputField,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  useNavigateWithPreviousLocation,
  usePreviousLocation,
} from '../../../../shared';
import { useParams } from 'react-router-dom';
import { ChangeEvent } from 'react';
import {
  useCreateAuction,
  usePerksContext,
  useSuspenseGetClub,
} from '../../../../features';

function ConfirmAuction() {
  const { slug } = useParams();

  const { data } = useSuspenseGetClub({ slug });

  const { clubPerks } = usePerksContext();

  const { createAuction, loading } = useCreateAuction();

  const [state, update] = useRecordState({
    entryPrice: undefined,
    duration: '2',
    numberOfMemberships: undefined,
  });

  const previousLocation = usePreviousLocation(
    makePath([Paths.clubs, slug || '']),
  );

  const navigate = useNavigateWithPreviousLocation(previousLocation);

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement>,
    replaceNotMatching?: {
      [Symbol.replace](string: string, replaceValue: string): string;
    },
  ) =>
    update({
      [e.target.name]: replaceNotMatching
        ? e.target.value.replace(replaceNotMatching, '')
        : e.target.value,
    });

  const entryPriceError = handleFieldError(state?.entryPrice, {
    keyName: 'Entry price',
    compare: {
      value: parseInt(state?.entryPrice ?? '0'),
      gt: 9,
      message: {
        gt: 'Your auction must at least have a starting price of USD 10',
      },
    },
  });

  const membershipsError = handleFieldError(state?.numberOfMemberships, {
    keyName: 'Number of memberships',
    compare: {
      value: parseInt(state?.numberOfMemberships ?? '0'),
      gt: 0,
      lt: 16,
      message: {
        lt: 'You can only create a maximum number of 15 memberships.',
        gt: 'You must create at least 1 membership.',
      },
    },
  });

  if (
    clubPerks.length < 3 ||
    !data.club.coverImage ||
    data.club.coverImage.length === 0
  ) {
    return (
      <NavigateWithPreviousLocation
        fallback={previousLocation}
        to={makePath([
          Paths.clubs,
          slug || '',
          Paths.auction,
          Paths.create,
        ])}
      />
    );
  }

  return (
    <VStack
      as='form'
      h='100%'
      onSubmit={async (e) => {
        e.preventDefault();

        if (!state.entryPrice || !state.numberOfMemberships) {
          return;
        }

        await createAuction({
          clubId: data.club.id,
          entryPrice: parseInt(state.entryPrice),
          numberOfMemberships: parseInt(state.numberOfMemberships),
          duration: parseInt(state.duration),
        });
      }}
    >
      <VStack
        overflowY='auto'
        pr={4}
        className='thin-scrollbar'
        gap={4}
        flex={1}
      >
        <TextGroup gap={0}>
          <TextGroupHeading as='h2' size={3} weight={500}>
            Start Auction
          </TextGroupHeading>
          <TextGroupSubheading size={1} color='white700'>
            Enter the following information in complete your auction
          </TextGroupSubheading>
        </TextGroup>

        <VStack gap={4}>
          <InputTextField
            name='entryPrice'
            label='Starting Price'
            value={state.entryPrice}
            onChange={(e) => handleOnChange(e, /[^0-9]+/gm)}
            onFocus={(e) => e.target.select()}
            tooltip='You can only auction off a maximum of 15 memberships at a time.'
            placeholder='0'
            leftElement={
              <Box w={40} fontWeight={600} color='white700'>
                USD
              </Box>
            }
            errorText={entryPriceError}
          />

          <InputTextField
            label='Number of Memberships'
            name='numberOfMemberships'
            value={state.numberOfMemberships}
            onChange={(e) => handleOnChange(e, /[^0-9]+/gm)}
            onFocus={(e) => e.target.select()}
            tooltip='The number of memberships that you want to sell.'
            placeholder='0'
            errorText={membershipsError}
          />

          <SelectInputField
            label='Duration'
            name='duration'
            value={state.duration}
            onValueChange={(duration) => update({ duration })}
            tooltip='The amount of time that the auction will run.'
            triggerCSS={lightSelectCSS}
            position='popper'
            options={arrayFrom(3).map((value) => ({
              label: `${value + 1} hour`,
              value: value + 1,
            }))}
            keySelector={(item) => item.label}
            labelSelector={(item) => item.label}
            valueSelector={(item) => item.value.toString()}
          />
        </VStack>
      </VStack>
      <HStack
        bgColor='#30304b'
        position='sticky'
        b={0}
        gap={2}
        justify='flex-end'
        py={4}
        pr='10px'
      >
        <Button
          onClick={() => {
            navigate(
              makePath([
                Paths.clubs,
                slug || '',
                Paths.auction,
                Paths.create,
                Paths.reviewAuctionInfo,
              ]),
            );
          }}
          type='button'
          variant='ghost'
          radius={1}
          colorTheme='purple200'
          css={{ px: '28px' }}
        >
          Back
        </Button>
        <Button
          disabled={
            loading ||
            missingField(state) ||
            !hasAllUndefinedKeyValues({
              membershipsError,
              entryPriceError,
            })
          }
          isLoading={loading}
          type='submit'
          loadingText='Continue'
          radius={1}
          colorTheme='purple500'
          css={{ px: '28px' }}
        >
          Start Auction
        </Button>
      </HStack>
    </VStack>
  );
}

ConfirmAuction.displayName = 'ConfirmAuction';

export default ConfirmAuction;
