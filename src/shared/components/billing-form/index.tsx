import {
  Box,
  Checkbox,
  Heading,
  Text,
  HStack,
  VStack,
  InputGroup,
  Input,
  Button,
} from '@holdr-ui/react';
import CountryPicker from '../country-picker';

export default function BillingForm({
  onContinue,
}: {
  onContinue: () => void;
}) {
  return (
    <VStack>
      <Box>
        <Heading
          color='white500'
          size={'24px'}
          weight={500}
          css={{ lineHeight: '115%' }}
        >
          Billing Form
        </Heading>
      </Box>
      <Box pt={'20px'} pb={'40px'}>
        <VStack gap={2} as='fieldset'>
          <Text size={1} as='label' htmlFor='email' color='white50'>
            Email
          </Text>
          <Box radius={2} bgColor={'rgba(152, 152, 255, 0.15)'} css={{}}>
            <InputGroup>
              <Input
                type='Full name'
                placeholder='First and last name'
                height={'34px'}
                color='white500'
                css={{}}
              />
            </InputGroup>
          </Box>

          {/* <Text
                size={1}
                css={{
                  color: '$danger200',
                }}
              >
                Field Error
              </Text> */}
          <Box h='16px' />
        </VStack>
        <VStack gap={2} as='fieldset'>
          <Text size={1} as='label' htmlFor='email' color='white50'>
            Country or region
          </Text>
          <Box radius={2} bgColor={'rgba(152, 152, 255, 0.15)'} css={{}}>
            <InputGroup>
              <Input
                type='email'
                placeholder='Enter your email'
                height={'34px'}
                color='white500'
                css={{}}
              />
            </InputGroup>
          </Box>

          {/* <Text
                size={1}
                css={{
                  color: '$danger200',
                }}
              >
                Field Error
              </Text> */}
          <Box h='16px' />
        </VStack>
        <VStack gap={2} as='fieldset'>
          <Text size={1} as='label' htmlFor='email' color='white50'>
            Address
          </Text>
          <Box radius={2} bgColor={'rgba(152, 152, 255, 0.15)'} css={{}}>
            <InputGroup>
              <Input
                type='text'
                placeholder='Street address'
                height={'34px'}
                color='white500'
                css={{}}
              />
            </InputGroup>
          </Box>

          {/* <Text
                size={1}
                css={{
                  color: '$danger200',
                }}
              >
                Field Error
              </Text> */}
          <Box h='16px' />
        </VStack>
        <VStack gap={2} as='fieldset'>
          <Text size={1} as='label' htmlFor='email' color='white50'>
            City
          </Text>
          <Box radius={2} bgColor={'rgba(152, 152, 255, 0.15)'} css={{}}>
            <InputGroup>
              <Input
                type='text'
                placeholder='City'
                height={'34px'}
                color='white500'
                css={{}}
              />
            </InputGroup>
          </Box>

          {/* <Text
                size={1}
                css={{
                  color: '$danger200',
                }}
              >
                Field Error
              </Text> */}
          <Box h='16px' />
        </VStack>
        <HStack gap={2} as='fieldset'>
          <VStack>
            <>
              <Text size={1} as='label' htmlFor='email' color='white50'>
                State
              </Text>
              <Box
                radius={2}
                bgColor={'rgba(152, 152, 255, 0.15)'}
                css={{}}
              >
                <InputGroup>
                  <Input
                    type='text'
                    placeholder='City'
                    height={'34px'}
                    color='white500'
                    css={{}}
                  />
                </InputGroup>
              </Box>
            </>
          </VStack>
          <VStack>
            <>
              <Text size={1} as='label' htmlFor='email' color='white50'>
                Zip
              </Text>
              <Box
                radius={2}
                bgColor={'rgba(152, 152, 255, 0.15)'}
                css={{}}
              >
                <InputGroup>
                  <Input
                    type='text'
                    placeholder='Zip Code'
                    height={'34px'}
                    color='white500'
                    css={{}}
                  />
                </InputGroup>
              </Box>
            </>
          </VStack>
          {/* <Text
                size={1}
                css={{
                  color: '$danger200',
                }}
              >
                Field Error
              </Text> */}
          <Box h='16px' />
        </HStack>
        <VStack justify='center' mt={'40px'}>
          <Button
            radius={2}
            colorTheme='purple500'
            disabled={false}
            fullWidth
            css={{
              height: '48px',
              fontSize: '24px',
            }}
            onClick={onContinue}
          >
            <Text size={'16px'} weight={500}>
              Continue
            </Text>
          </Button>
        </VStack>
      </Box>
    </VStack>
  );
}
