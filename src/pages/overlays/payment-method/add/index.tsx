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
  HStack,
  Text,
  useDisclosure,
  VStack,
} from '@holdr-ui/react';
import { useNavigate } from 'react-router-dom';

function AddPaymentMethodPage() {
  const disclosure = useDisclosure(true);
  const navigate = useNavigate();
  const previousLocation = usePreviousLocation('/');

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
                      <VStack>
                        <InputTextField
                          name='card-number'
                          placeholder='1234 1234 1234 1234'
                          className={darkInputStyles()}
                          labelProps={{
                            color: 'white50',
                            weight: 500,
                          }}
                          css={{
                            borderBottomLeftRadius: '$0 !important',
                            borderBottomRightRadius: '$0 !important',
                          }}
                        />
                        <HStack>
                          <InputTextField
                            name='card-number'
                            placeholder='MM/YY'
                            className={darkInputStyles()}
                            labelProps={{
                              color: 'white50',
                              weight: 500,
                            }}
                            css={{
                              borderTopLeftRadius: '$0 !important',
                              borderTopRightRadius: '$0 !important',
                              borderBottomRightRadius: '$0 !important',
                            }}
                          />
                          <InputTextField
                            name='card-number'
                            placeholder='CVV'
                            className={darkInputStyles()}
                            labelProps={{
                              color: 'white50',
                              weight: 500,
                            }}
                            css={{
                              borderBottomLeftRadius: '$0 !important',
                              borderTopLeftRadius: '$0 !important',
                              borderTopRightRadius: '$0 !important',
                            }}
                          />
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
                    <VStack gap={2}>
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
                        />
                      </Box>
                    </HStack>
                  </VStack>
                </VStack>
              </VStack>
              <Box py={3} position='sticky' b={0} bgColor='#30304B'>
                <Button
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
