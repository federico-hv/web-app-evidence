import { Fragment } from 'react';
import {
  darkInputStyles,
  extraBtnPadding,
  InputTextField,
  LoadWithoutPreviousLocation,
  usePreviousLocation,
} from '../../../../shared';
import {
  Box,
  Button,
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
  VStack,
} from '@holdr-ui/react';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  // useStripe,
} from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

const StripeCardElementStyles = {
  style: {
    base: {
      fontSmoothing: 'antialiased',
      fontFamily: 'inherit',
      '::placeholder': {
        color: hexToRGB(THEME_COLOR.base400, 1),
      },
      color: '#FCFDF7',
    },
  },
};

function AddPaymentMethodPage() {
  // const [state, update] = useState({
  //   email: '',
  //   name: '',
  //   country: '',
  //   address: '',
  //   city: '',
  //   state: '',
  //   postal_zip: '',
  // });

  const disclosure = useDisclosure(true);
  const navigate = useNavigate();
  const previousLocation = usePreviousLocation('/');

  const elements = useElements();

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
                onClick={() => navigate(previousLocation)}
                variant='ghost'
                colorTheme='white500'
              />
            </Dialog.Header>
            <DialogBody overflowY='hidden' px={0} py={0}>
              <VStack className='thin-scrollbar' overflowY='auto'>
                <VStack>
                  <Heading mb={8} size={6} weight={500}>
                    Payment Method
                  </Heading>
                  <VStack gap={4}>
                    <InputTextField
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
                      </VStack>
                    </VStack>
                    <InputTextField
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
                      <InputTextField
                        name='country'
                        placeholder='Country'
                        className={darkInputStyles()}
                        labelProps={{
                          color: 'white50',
                          weight: 500,
                        }}
                      />
                    </VStack>
                    <InputTextField
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
                          State
                        </Text>
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
                      </VStack>
                      <Box flex={1} css={{ alignSelf: 'flex-end' }}>
                        <InputTextField
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
                  disabled
                  fullWidth
                  radius={2}
                  className={extraBtnPadding()}
                  colorTheme='purple500'
                >
                  Continue
                </Button>
              </Box>
            </DialogBody>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </Fragment>
  );
}
AddPaymentMethodPage.displayName = 'AddPaymentMethodPage';

export default AddPaymentMethodPage;
