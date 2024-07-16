import { ChangeEvent, Fragment, useEffect } from 'react';
import {
  darkInputStyles,
  darkSelectCSS,
  extraBtnPadding,
  InputTextField,
  LoadWithoutPreviousLocation,
  SelectInputField,
  usePreviousLocation,
} from '../../../../shared';
import {
  Box,
  Button,
  Center,
  CircularProgress,
  CloseButton,
  Dialog,
  DialogBody,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  Heading,
  hexToRGB,
  HStack,
  Text,
  THEME_COLOR,
  useDisclosure,
  useRecordState,
  VStack,
} from '@holdr-ui/react';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import {
  useAccountInfoQuery,
  useCountries,
  useCountryStates,
} from '../../../../features';
import { StripeCardNumberElementChangeEvent } from '@stripe/stripe-js/dist/stripe-js/elements/card-number';
import {
  StripeCardCvcElementChangeEvent,
  StripeCardExpiryElementChangeEvent,
} from '@stripe/stripe-js';

/**
 * Notes: [For future state]
 *
 * - Use TomTom for autocompleted addresses: https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
 * - Use RecaptchaV3 to decrease the fraud incident count: https://developers.google.com/recaptcha/docs/v3
 */

const DefaultSaveCardData = {
  email: '',
  name: '',
  address: '',
  city: '',
  postal: '', // also zip
  country: '',
  province: '', // also state
};

type SaveCardDataType = {
  email: string;
  name: string;
  address: string;
  city: string;
  postal: string; // also zip
  country: string;
  province: string; // also state
};

const StripeCardElementStyles = {
  style: {
    base: {
      fontSmoothing: 'antialiased',
      fontFamily: 'Matter, sans-serif',
      '::placeholder': {
        color: hexToRGB(THEME_COLOR.base400, 1),
      },
      color: '#FCFDF7',
    },
  },
};

/**
 * Returns a method that sets up a setup intent on Stripe
 * and links a user's customer account to a card on Stripe.
 */
function useSaveCard() {
  const stripe = useStripe();

  const elements = useElements();

  if (!stripe || !elements) {
    return;
  }

  /**
   * A method that sets up a setup intent and links a customer account
   * to a card on Stripe.
   *
   * @param billingInfo The customer billing information
   */
  return async (billingInfo: SaveCardDataType) => {
    // create a stripe intent
    console.log('creating a stripe intent');
    // link card to the customer account
    console.log('linking card to customer account');
  };
}

/**
 * Check whether fields are missing from a form's data.
 *
 * @param data The form data to check.
 * @param omit The fields to omit from being checked.
 *
 * @returns true if the data has any field that is empty.
 */
function missingField<T extends Record<string, string>>(
  data: T,
  omit: string[],
) {
  const keys = Object.keys(data);

  for (const key of keys) {
    if (omit.includes(key)) {
      continue;
    }
    if (data[key].length === 0) {
      return true;
    }
  }

  return false;
}

interface StripeCardElementInfo {
  cardNumber: StripeCardNumberElementChangeEvent | null;
  cardExpiry: StripeCardExpiryElementChangeEvent | null;
  cardCvc: StripeCardCvcElementChangeEvent | null;
}

class StripeCardUtility {
  /**
   * Check whether a card element item (Expiry/Number) has an error.
   *
   * @param cardInfo
   */
  static validate(cardInfo: StripeCardElementInfo): boolean {
    if (
      !cardInfo.cardExpiry ||
      !cardInfo.cardNumber ||
      !cardInfo.cardCvc
    ) {
      return false;
    }

    return (
      !(cardInfo.cardExpiry.error || cardInfo.cardNumber.error) &&
      !(
        cardInfo.cardExpiry.empty ||
        cardInfo.cardNumber.empty ||
        cardInfo.cardCvc.empty
      )
    );
  }

  /**
   * Get the error message when a card element item (Expiry/Number) has an error.
   *
   * @param cardInfo
   */
  static retrieveErrorMessage(cardInfo: StripeCardElementInfo): string {
    if (cardInfo.cardExpiry && cardInfo.cardExpiry.error) {
      return cardInfo.cardExpiry.error.message;
    }

    if (cardInfo.cardNumber && cardInfo.cardNumber.error) {
      return cardInfo.cardNumber.error.message;
    }

    return '';
  }
}

/**
 * A hook that returns an object containing the focus
 * states of the Stripe card elements, namely, CardNumberElement,
 * CardCvcElement and CardExpiryElement.
 *
 */
function useStripeElementFocused() {
  const [state, update] = useRecordState({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false,
  });

  const elements = useElements();

  useEffect(() => {
    if (!elements) return;

    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement)
      return;

    cardNumberElement.on('focus', () => update({ cardNumber: true }));
    cardNumberElement.on('blur', () => update({ cardNumber: false }));
    cardExpiryElement.on('focus', () => update({ cardExpiry: true }));
    cardExpiryElement.on('blur', () => update({ cardExpiry: false }));
    cardCvcElement.on('focus', () => update({ cardCvc: true }));
    cardCvcElement.on('blur', () => update({ cardCvc: false }));

    return () => {
      cardNumberElement.on('focus', () => null);
      cardNumberElement.on('blur', () => null);
      cardExpiryElement.on('focus', () => null);
      cardExpiryElement.on('blur', () => null);
      cardCvcElement.on('focus', () => null);
      cardCvcElement.on('blur', () => null);
    };
  }, [elements, update]);

  return state;
}

function useStripeCardInfo() {
  const [state, update] = useRecordState<StripeCardElementInfo>({
    cardNumber: null,
    cardExpiry: null,
    cardCvc: null,
  });

  const elements = useElements();

  useEffect(() => {
    if (!elements) return;

    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement)
      return;

    cardNumberElement.on('change', (e) => update({ cardNumber: e }));
    cardExpiryElement.on('change', (e) => update({ cardExpiry: e }));
    cardCvcElement.on('change', (e) => update({ cardCvc: e }));

    return () => {
      cardNumberElement.on('change', () => null);
      cardExpiryElement.on('change', () => null);
      cardCvcElement.on('change', () => null);
    };
  }, [elements, update]);

  return state;
}

function AddPaymentMethodPage() {
  const [billingInfo, updateBillingInfo] =
    useRecordState<SaveCardDataType>(DefaultSaveCardData);

  const { data, loading, error } = useAccountInfoQuery();
  const { data: countriesData } = useCountries();

  const countryItem = countriesData?.data.find(
    (item) => item.Iso2 === billingInfo.country,
  );

  const { data: statesData } = useCountryStates(countryItem?.name);

  const disclosure = useDisclosure(true);

  const navigate = useNavigate();

  const previousLocation = usePreviousLocation('/');

  // const checkElements = useCheckElements();

  const saveCard = useSaveCard();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) =>
    updateBillingInfo({ [e.target.name]: e.target.value });

  const goBack = () => navigate(previousLocation);

  const stripeElementFocused = useStripeElementFocused();

  const stripeCardInfo = useStripeCardInfo();

  useEffect(() => {
    if (data) {
      updateBillingInfo({
        country: data.accountInfo.country,
        email: data.accountInfo.email,
      });
    }
  }, [data, updateBillingInfo]);

  return (
    <Fragment>
      <LoadWithoutPreviousLocation default='/' />
      <Dialog {...disclosure} onClose={() => navigate(previousLocation)}>
        <DialogPortal>
          <DialogOverlay blur={2} zIndex={20} />
          <DialogContent
            zIndex={20}
            radius={2}
            className='setup-account'
            minWidth={540}
            maxHeight='90vh'
            bgColor='#30304B'
            overflow='auto'
            css={{
              backdropFilter: 'blur(12px)',
            }}
            py='64px'
            pl='64px'
            pr='64px'
          >
            <Dialog.Header
              position='absolute'
              t={12}
              r={0}
              px='12px'
              py={0}
              justify='flex-end'
            >
              <CloseButton
                onClick={goBack}
                variant='ghost'
                colorTheme='white500'
              />
            </Dialog.Header>
            <DialogBody
              overflowY='hidden'
              px={0}
              py={0}
              as='form'
              onSubmit={async (e) => {
                e.preventDefault();
                if (saveCard) await saveCard(billingInfo).then(goBack);
              }}
            >
              {loading ? (
                <Center>
                  <CircularProgress size={30} isIndeterminate />
                </Center>
              ) : (
                <Fragment>
                  <VStack className='thin-scrollbar' overflowY='auto'>
                    <VStack>
                      <Heading mb={8} size={6} weight={500}>
                        Payment Method
                      </Heading>
                      <VStack gap={4}>
                        <InputTextField
                          readOnly
                          value={billingInfo.email}
                          name='email'
                          label='Email'
                          placeholder='Your emal address'
                          className={darkInputStyles()}
                          labelProps={{
                            color: 'white50',
                            weight: 500,
                          }}
                        />
                        <VStack gap={2}>
                          <Text
                            size={2}
                            weight={500}
                            as='label'
                            htmlFor='card-information'
                          >
                            Card information
                          </Text>

                          <VStack css={{ gap: '2px' }}>
                            <Box
                              bgColor='#1A1A29'
                              py={3}
                              px={4}
                              css={{
                                border: stripeElementFocused.cardNumber
                                  ? '1px solid rgba(152, 152, 255, 1) !important'
                                  : 'unset',
                                borderTopLeftRadius: '$2',
                                borderTopRightRadius: '$2',
                              }}
                            >
                              <CardNumberElement
                                options={{
                                  showIcon: true,
                                  iconStyle: 'solid',
                                  ...StripeCardElementStyles,
                                }}
                              />
                            </Box>
                            <HStack css={{ gap: '2px' }}>
                              <Box
                                bgColor='#1A1A29'
                                py={3}
                                px={4}
                                flex={1}
                                css={{
                                  border: stripeElementFocused.cardExpiry
                                    ? '1px solid rgba(152, 152, 255, 1) !important'
                                    : 'unset',
                                  borderBottomLeftRadius: '$2',
                                }}
                              >
                                <CardExpiryElement
                                  options={{
                                    ...StripeCardElementStyles,
                                  }}
                                />
                              </Box>
                              <Box
                                bgColor='#1A1A29'
                                py={3}
                                px={4}
                                flex={1}
                                css={{
                                  border: stripeElementFocused.cardCvc
                                    ? '1px solid rgba(152, 152, 255, 1) !important'
                                    : 'unset',
                                  borderBottomRightRadius: '$2',
                                }}
                              >
                                <CardCvcElement
                                  options={{
                                    ...StripeCardElementStyles,
                                  }}
                                />
                              </Box>
                            </HStack>
                            {!StripeCardUtility.validate(
                              stripeCardInfo,
                            ) && (
                              <Text
                                weight={500}
                                color='danger400'
                                size={1}
                                css={{ marginTop: '$1' }}
                              >
                                {StripeCardUtility.retrieveErrorMessage(
                                  stripeCardInfo,
                                )}
                              </Text>
                            )}
                          </VStack>
                        </VStack>
                        <InputTextField
                          value={billingInfo.name}
                          onChange={handleOnChange}
                          name='name'
                          label="Cardholder's name"
                          placeholder='Full name on card'
                          className={darkInputStyles()}
                          labelProps={{
                            color: 'white50',
                            weight: 500,
                          }}
                        />
                        <VStack gap={2} as='fieldset'>
                          <Text
                            size={2}
                            weight={500}
                            as='label'
                            htmlFor='country'
                          >
                            Country
                          </Text>

                          {countriesData && !countriesData.error && (
                            <SelectInputField
                              triggerCSS={darkSelectCSS}
                              placeholder='Country'
                              value={billingInfo.country}
                              onValueChange={(country) =>
                                updateBillingInfo({ country })
                              }
                              options={countriesData.data}
                              keySelector={(item) => item.Iso2}
                              labelSelector={(item) => item.name}
                              valueSelector={(item) => item.Iso2}
                            />
                          )}
                        </VStack>
                        <InputTextField
                          value={billingInfo.address}
                          onChange={handleOnChange}
                          name='address'
                          label='Address'
                          placeholder='Street address'
                          className={darkInputStyles()}
                          labelProps={{
                            color: 'white50',
                            weight: 500,
                          }}
                        />
                        <InputTextField
                          value={billingInfo.city}
                          onChange={handleOnChange}
                          name='city'
                          label='City'
                          placeholder='City'
                          className={darkInputStyles()}
                          labelProps={{
                            color: 'white50',
                            weight: 500,
                          }}
                        />
                        <HStack>
                          <VStack flex={1} gap={2}>
                            <Text
                              size={2}
                              weight={500}
                              as='label'
                              htmlFor='country'
                            >
                              State / Province
                            </Text>
                            {statesData &&
                            !statesData.error &&
                            statesData.data.states.length > 0 ? (
                              <SelectInputField
                                placeholder='State'
                                value={billingInfo.province}
                                onValueChange={(province) =>
                                  updateBillingInfo({ province })
                                }
                                triggerCSS={{
                                  ...darkSelectCSS,
                                  borderTopRightRadius: '0',
                                  borderBottomRightRadius: '0',
                                }}
                                options={statesData.data.states}
                                keySelector={(item) => item.state_code}
                                labelSelector={(item) => item.name}
                                valueSelector={(item) => item.state_code}
                              />
                            ) : (
                              <InputTextField
                                name='state'
                                placeholder='State'
                                className={darkInputStyles()}
                                labelProps={{
                                  color: 'white50',
                                  weight: 500,
                                }}
                                css={{
                                  borderTopRightRadius: '0',
                                  borderBottomRightRadius: '0',
                                }}
                              />
                            )}
                          </VStack>
                          <Box flex={1} css={{ alignSelf: 'flex-end' }}>
                            <InputTextField
                              value={billingInfo.postal}
                              onChange={handleOnChange}
                              maxLength={9}
                              name='postal'
                              placeholder='Zip / Postal code'
                              className={darkInputStyles()}
                              labelProps={{
                                color: 'white50',
                                weight: 500,
                              }}
                              css={{
                                borderTopLeftRadius: '0',
                                borderBottomLeftRadius: '0',
                              }}
                            />
                          </Box>
                        </HStack>
                      </VStack>
                    </VStack>
                  </VStack>
                  <Box py={3} position='sticky' b={0} bgColor='#30304B'>
                    <Button
                      type='submit'
                      disabled={
                        missingField<SaveCardDataType>(billingInfo, [
                          'province',
                        ]) || !StripeCardUtility.validate(stripeCardInfo)
                      }
                      fullWidth
                      radius={2}
                      className={extraBtnPadding()}
                      colorTheme='purple500'
                    >
                      Continue
                    </Button>
                  </Box>
                </Fragment>
              )}
            </DialogBody>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </Fragment>
  );
}
AddPaymentMethodPage.displayName = 'AddPaymentMethodPage';

export default AddPaymentMethodPage;
