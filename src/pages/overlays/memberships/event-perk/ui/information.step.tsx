import {
  Asset,
  makeButtonLarger,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  useStepperContext,
} from '../../../../../shared';
import { useLocation, useNavigate } from 'react-router-dom';
import { Fragment } from 'react';
import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  VStack,
} from '@holdr-ui/react';

function InformationStep() {
  const { increment } = useStepperContext();

  const navigate = useNavigate();
  const location = useLocation();

  const close = () => navigate(location.state?.previousLocation || '/');

  return (
    <Fragment>
      <Image
        radius={1}
        h='250px'
        w='full'
        src={Asset.Image.DummyMembershipCover}
        alt='Cover image'
      />
      <Heading mt={6} weight={600} size={6}>
        Title
      </Heading>
      <VStack gap={6} divider={<Box h='1px' bgColor='base100' />}>
        <TextGroup gap={0}>
          <TextGroupHeading weight={500} size={5} as='h2'>
            Venue
          </TextGroupHeading>
          <TextGroupSubheading weight={500} color='black200' size={2}>
            {'MMMM, YYYY'} — {'H PM'}
          </TextGroupSubheading>
        </TextGroup>
        <Text size={4} color='black500'>
          Description
        </Text>
      </VStack>
      <VStack gap={2} mt='64px'>
        <Button
          onClick={increment}
          fullWidth
          radius={1}
          colorTheme='purple500'
          className={makeButtonLarger('2.75rem')}
        >
          Claim Perk
        </Button>
        <Button
          tabIndex={999}
          onClick={close}
          variant='ghost'
          fullWidth
          radius={1}
          colorTheme='purple500'
          className={makeButtonLarger('2.75rem')}
        >
          Go back
        </Button>
      </VStack>
    </Fragment>
  );
}

export default InformationStep;
