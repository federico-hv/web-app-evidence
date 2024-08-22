import { ChangeEvent, Fragment, useEffect } from 'react';
import {
  darkInputStyles,
  darkInputStylesNoFocus,
  darkSelectCSS,
  extraBtnPadding,
  InputTextField,
  LoadWithoutPreviousLocation,
  missingField,
  SelectInputField,
  usePreviousLocation,
} from '../../../../shared';
import {
  Alert,
  AlertAction,
  AlertActions,
  AlertContent,
  AlertDescription,
  AlertTitle,
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
  HStack,
  Text,
  useDisclosure,
  useRecordState,
  VStack,
} from '@holdr-ui/react';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import {
  useAccountInfoQuery,
  useCountries,
  useCountryStates,
} from '../../../../features';

import {
  DefaultSaveCardData,
  SaveCardDataType,
  StripeCardElementStyles,
  StripeCardUtility,
  useStripeCardInfo,
  useStripeElementFocused,
  useSaveCard,
  dummyBillingInfo,
} from './shared';

/**
 * Notes: [For future state]
 *
 * - Use TomTom for autocompleted addresses: https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
 * - Use RecaptchaV3 to decrease the fraud incident count: https://developers.google.com/recaptcha/docs/v3
 */

function AddPaymentMethodPage() {
  const [billingInfo, updateBillingInfo] =
    useRecordState<SaveCardDataType>(DefaultSaveCardData);

  const { data, loading } = useAccountInfoQuery();
  const { data: countriesData } = useCountries();

  const countryItem = countriesData?.data.find(
    (item) => item.Iso2 === billingInfo.country,
  );

  const { data: statesData } = useCountryStates(countryItem?.name);

  const disclosure = useDisclosure(true);

  const navigate = useNavigate();

  const previousLocation = usePreviousLocation('/');

  const { saveCard, loading: loadingSaveCard } = useSaveCard();

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
  }, [data]);

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
            minWidth={600}
            maxHeight='90vh'
            bgColor='#30304B'
            overflow='hidden'
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
                if (saveCard)
                  await saveCard(billingInfo).then(() => {
                    goBack();
                  });
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
                      {import.meta.env.VITE_ENVIRONMENT ===
                        'development' && (
                        <Box mb={5}>
                          <Alert status='info'>
                            <AlertContent>
                              <AlertTitle>Testing notice</AlertTitle>
                              <AlertDescription color='black500'>
                                Use <strong>4242 4242 4242 4242</strong>{' '}
                                for the card number. Any CVC number works.
                              </AlertDescription>
                            </AlertContent>
                            <AlertActions>
                              <AlertAction
                                type='button'
                                onClick={() =>
                                  updateBillingInfo({
                                    ...billingInfo,
                                    ...dummyBillingInfo,
                                  })
                                }
                                css={{ fontSize: '12px !important' }}
                              >
                                Autocomplete
                              </AlertAction>
                            </AlertActions>
                          </Alert>
                        </Box>
                      )}
                      <VStack gap={4}>
                        <InputTextField
                          readOnly
                          value={billingInfo.email}
                          name='email'
                          label='Email'
                          placeholder='Your emal address'
                          className={darkInputStylesNoFocus()}
                          css={{
                            opacity: 0.5,
                            cursor: 'not-allowed',
                          }}
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
                          autoComplete='given-name'
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
                              name='country'
                              triggerCSS={darkSelectCSS}
                              placeholder='Country'
                              value={billingInfo.country}
                              listCSS={{
                                borderTopWidth: '1px',
                                borderTopRightRadius: '$2',
                                borderTopLeftRadius: '$2',
                              }}
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
                          autoComplete='address-line1'
                          value={billingInfo.line1}
                          onChange={handleOnChange}
                          name='line1'
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
                                name='state'
                                placeholder='State'
                                value={billingInfo.province}
                                onValueChange={(province) =>
                                  updateBillingInfo({ province })
                                }
                                listCSS={{
                                  borderTopWidth: '1px',
                                  borderTopRightRadius: '$2',
                                  borderTopLeftRadius: '$2',
                                }}
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
                      isLoading={loadingSaveCard}
                      loadingText={'Continue'}
                      type='submit'
                      disabled={
                        loadingSaveCard ||
                        missingField<SaveCardDataType>(billingInfo, [
                          'province',
                        ]) ||
                        !StripeCardUtility.validate(stripeCardInfo)
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
