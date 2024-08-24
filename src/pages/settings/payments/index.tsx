import {
  Box,
  Button,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from '@holdr-ui/react';
import {
  GQLRenderer,
  Head,
  LinkText,
  makePath,
  Paths,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  useAlertDialog,
} from '../../../shared';
import {
  getPaymentMethodLogo,
  IPaymentMethod,
  IPaymentTransaction,
  useAddPaymentMethod,
  useDeletePaymentMethodMutation,
  useHasPaymentMethodSuspenseQuery,
  usePastTransactionsSuspenseQuery,
  usePaymentMethodsSuspenseQuery,
} from '../../../features';
import { FlatList } from '../../../tmp/flat-list';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(LocalizedFormat);

function CardDots() {
  return (
    <HStack fontSize='5px' items='center'>
      <Icon name='middle-dot-fill' />
      <Icon name='middle-dot-fill' />
      <Icon name='middle-dot-fill' />
      <Icon name='middle-dot-fill' />
    </HStack>
  );
}

function PaymentMethodItem({ data }: { data: IPaymentMethod }) {
  const { openWith } = useAlertDialog();

  const { deletePaymentMethod, loading } =
    useDeletePaymentMethodMutation();

  return (
    <HStack items='center' justify='space-between'>
      <HStack gap={3} items='center'>
        <Image
          key={data.card.displayBrand}
          fit='contain'
          src={getPaymentMethodLogo(data.card.displayBrand)}
          radius={1}
          h={50}
          w={70}
          css={{ backgroundColor: 'white' }}
        />
        <VStack>
          <HStack gap={1} items='center'>
            <Text weight={500} casing='capitalize'>
              {data.card.brand}
            </Text>
            <HStack items='center'>
              <CardDots />
              <Text weight={500}>{data.card.last4}</Text>
            </HStack>
          </HStack>
          <Text color='white700' size={2}>
            Expires {data.card.expires}
          </Text>
        </VStack>
      </HStack>
      <Button
        variant='ghost'
        onClick={() =>
          openWith({
            title: 'Delete card',
            description:
              'After deleting your card, you will need to add a card again to bid in auctions, Are you sure you want to delete this card?',
            actionText: 'Yes, delete card',
            cancelText: 'Cancel',
            isLoading: loading,
            loadingText: 'Deleting',
            onAction: async () => deletePaymentMethod(data.id),
          })
        }
        radius={1}
        colorTheme='danger200'
      >
        Delete
      </Button>
    </HStack>
  );
}

function PaymentMethodsList() {
  const { data: paymentMethodsData } = usePaymentMethodsSuspenseQuery();

  return (
    <FlatList
      direction='vertical'
      data={[paymentMethodsData.paymentMethods]}
      renderItem={(item) => <PaymentMethodItem data={item} />}
      keyExtractor={(item) => item.id}
    />
  );
}

function PaymentTransaction({ data }: { data: IPaymentTransaction }) {
  return (
    <VStack py={4} px={3} gap={4}>
      <VStack gap={2}>
        <HStack justify='space-between'>
          <Text color='white700' size={2} weight={600}>
            {dayjs(data.createdAt).format('lll')}
          </Text>
          <Text color='white500' size={2} weight={600}>
            ${data.amount} USD
          </Text>
        </HStack>
        {data.card && (
          <HStack gap={2}>
            <Image
              key={data.card.displayBrand}
              fit='contain'
              src={getPaymentMethodLogo(data.card.displayBrand)}
              h={25}
              w={35}
              css={{
                backgroundColor: 'white',
                borderRadius: '2px',
              }}
            />
            <HStack items='center'>
              <CardDots />
              <Text>{data.card.last4}</Text>
            </HStack>
          </HStack>
        )}
      </VStack>
      <Text>
        Purchased a{' '}
        <LinkText
          color='purple200'
          to={makePath([Paths.clubs, data.club.url || ''])}
          css={{ textDecoration: 'none' }}
        >
          {data.club.name}
        </LinkText>{' '}
        club membership
      </Text>
    </VStack>
  );
}

function PaymentsSection() {
  const { data } = usePastTransactionsSuspenseQuery();

  console.log(data);

  return (
    <Box as='section'>
      <TextGroup>
        <TextGroupHeading size={3} weight={400}>
          Past transactions
        </TextGroupHeading>
        <TextGroupSubheading size={2} weight={300} color='white700'>
          Review all the transactions that you have previously made
        </TextGroupSubheading>
      </TextGroup>
      <Box
        border={1}
        borderColor='rgba(152, 152, 255, 0.1)'
        bgColor='rgba(48, 48, 75, 0.6)'
        py={5}
        px={4}
        radius={3}
        mt={4}
      >
        {data.pastTransactions.total === 0 ? (
          <Text color='white700'>
            You currently have not made any payments
          </Text>
        ) : (
          <FlatList
            direction='vertical'
            divider={
              <Box h='1px' w='full' bgColor='rgba(152, 152, 255, 0.05)' />
            }
            data={data.pastTransactions.edges}
            renderItem={(item) => <PaymentTransaction data={item.node} />}
            keyExtractor={(item) => item.node.id}
          />
        )}
      </Box>
    </Box>
  );
}

function CardsSection() {
  const { data: hasPaymentMethodData } =
    useHasPaymentMethodSuspenseQuery();

  const addPaymentMethod = useAddPaymentMethod();

  return (
    <Box as='section'>
      <TextGroup>
        <TextGroupHeading size={3} weight={400}>
          Cards
        </TextGroupHeading>
        <TextGroupSubheading size={2} weight={300} color='white700'>
          Manage the card that you use to make payments
        </TextGroupSubheading>
      </TextGroup>
      <VStack
        border={1}
        borderColor='rgba(152, 152, 255, 0.1)'
        bgColor='rgba(48, 48, 75, 0.6)'
        py={5}
        px={4}
        radius={3}
        mt={4}
      >
        {!hasPaymentMethodData.hasPaymentMethod ? (
          <HStack items='center'>
            <TextGroup gap={1}>
              <TextGroupHeading size={3} weight={500}>
                Payment Method
              </TextGroupHeading>
              <TextGroupSubheading size={2} weight={300} color='white700'>
                Add a payment method to purchase memberships
              </TextGroupSubheading>
            </TextGroup>
            <Button
              onClick={addPaymentMethod}
              radius={1}
              colorTheme='purple500'
              css={{ px: '$6' }}
            >
              Add card
            </Button>
          </HStack>
        ) : (
          <PaymentMethodsList />
        )}
      </VStack>
    </Box>
  );
}

function SettingsPaymentsPage() {
  return (
    <GQLRenderer>
      <Head
        prefix='Settings - '
        title='Privacy and Safety'
        description='Configure your Holdr privacy settings to allow you to control who can view your account and what you can see from other users..'
      />
      <VStack gap={8}>
        <CardsSection />
        <PaymentsSection />
      </VStack>
    </GQLRenderer>
  );
}

export default SettingsPaymentsPage;
