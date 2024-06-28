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

export default function PaymentMethodForm({
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
          Payment Method
        </Heading>
      </Box>
      <Box py={'20px'}>
        <VStack gap={2} as='fieldset'>
          <Text size={1} as='label' htmlFor='email' color='white50'>
            Email
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
          <HStack pr={'20px'}>
            <Text size={1} as='label' htmlFor='email' color='white50'>
              Card Information
            </Text>
            <HStack gap={1} ml={'auto'}>
              <img src='/card1.png' />
              <img src='/card2.png' />
              <img src='/card3.png' />
              <img src='/card4.png' />
            </HStack>
          </HStack>
          <Box radius={2} bgColor={'rgba(152, 152, 255, 0.15)'} css={{}}>
            <InputGroup>
              <Input
                type='text'
                placeholder='**** **** **** ****'
                height={'34px'}
                color='white500'
                css={{}}
              />
            </InputGroup>
            <HStack>
              <InputGroup>
                <Input
                  type='text'
                  placeholder='MM/DD'
                  height={'34px'}
                  color='white500'
                  css={{}}
                />
              </InputGroup>
              <InputGroup>
                <Input
                  type='text'
                  placeholder='CVV'
                  height={'34px'}
                  color='white500'
                  css={{}}
                />
              </InputGroup>
            </HStack>
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
            Cardholder Name
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
          {/* 
            <Text
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
          <CountryPicker />
          {/* <Box radius={2} bgColor={'rgba(152, 152, 255, 0.15)'} css={{}}>
                <InputGroup>
                  <Input
                    type='text'
                    placeholder='Country Selector'
                    height={'34px'}
                    color='white500'
                    css={{}}
                  />
                </InputGroup>
              </Box> */}

          {/* <Text
                size={1}
                css={{
                  color: '$danger200',
                }}
              >
                Field Error
              </Text> */}
          <Box radius={2} bgColor={'rgba(152, 152, 255, 0.15)'} css={{}}>
            <InputGroup>
              <Input
                type='email'
                placeholder='ZIP'
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
        <VStack h='14px' w='530px'>
          <Box
            radius={1}
            h='15px'
            w='15px'
            mt='0.75px'
            position='fixed'
            css={{
              border: '1px solid $white700',
            }}
          />
          <Checkbox
            labelledBy='sp'
            colorTheme='initial'
            style={{ marginLeft: '-12px' }}
            onChange={() => {
              //setConfirmAge(!confirmAge);
            }}
          >
            <Text size={1} color='white50' css={{ height: '16px' }}>
              Save Payment Method
            </Text>
          </Checkbox>
        </VStack>
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
        <HStack
          items='center'
          justify={'space-around'}
          mt={'16px'}
          px={'80px'}
        >
          <HStack>
            <Text size={'16px'} weight={500} color='white700'>
              Powered by
            </Text>
            <VStack ml={'2px'}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='40'
                height='20'
                viewBox='0 0 34 17'
                fill='none'
              >
                <g clip-path='url(#clip0_5034_90035)'>
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M33.1969 8.47982C33.1969 6.16682 32.0769 4.34182 29.9359 4.34182C27.7859 4.34182 26.4849 6.16682 26.4849 8.46182C26.4849 11.1808 28.0199 12.5538 30.2249 12.5538C31.2999 12.5538 32.1129 12.3098 32.7269 11.9668V10.1598C32.1129 10.4668 31.4079 10.6568 30.5139 10.6568C29.6379 10.6568 28.8609 10.3498 28.7609 9.28382H33.1789C33.1789 9.16582 33.1969 8.69582 33.1969 8.47982ZM28.7339 7.62082C28.7339 6.60082 29.3579 6.17582 29.9269 6.17582C30.4769 6.17582 31.0649 6.59982 31.0649 7.62082H28.7339ZM22.9969 4.34182C22.1119 4.34182 21.5429 4.75682 21.2269 5.04582L21.1089 4.48582H19.1209V15.0208L21.3799 14.5408L21.3889 11.9848C21.7139 12.2198 22.1929 12.5548 22.9889 12.5548C24.6049 12.5548 26.0779 11.2528 26.0779 8.38882C26.0679 5.76882 24.5769 4.34182 22.9969 4.34182ZM22.4549 10.5668C21.9219 10.5668 21.6049 10.3768 21.3889 10.1418L21.3799 6.78982C21.6149 6.52782 21.9399 6.34682 22.4549 6.34682C23.2769 6.34682 23.8459 7.26882 23.8459 8.45182C23.8459 9.66282 23.2849 10.5668 22.4549 10.5668ZM18.2809 3.32082V1.48682L16.0129 1.96582V3.80882L18.2809 3.32082ZM16.0129 4.49482H18.2809V12.3998H16.0129V4.49482ZM13.5829 5.16382L13.4389 4.49482H11.4869V12.4008H13.7459V7.04282C14.2789 6.34682 15.1819 6.47282 15.4619 6.57282V4.49482C15.1729 4.38682 14.1159 4.18782 13.5829 5.16382ZM9.06585 2.53482L6.86085 3.00482L6.85185 10.2408C6.85185 11.5778 7.85485 12.5628 9.19185 12.5628C9.93285 12.5628 10.4749 12.4278 10.7729 12.2648V10.4308C10.4839 10.5478 9.05685 10.9638 9.05685 9.62682V6.41982H10.7729V4.49482H9.05685L9.06585 2.53482ZM2.95885 6.78982C2.95885 6.43782 3.24785 6.30182 3.72585 6.30182C4.41285 6.30182 5.27985 6.50982 5.96685 6.87982V4.75682C5.25383 4.47569 4.49326 4.33478 3.72685 4.34182C1.89185 4.34182 0.672852 5.29882 0.672852 6.89882C0.672852 9.39182 4.10585 8.99482 4.10585 10.0688C4.10585 10.4848 3.74485 10.6208 3.23885 10.6208C2.48885 10.6208 1.53085 10.3138 0.771852 9.89782V12.0478C1.61185 12.4098 2.46185 12.5628 3.23885 12.5628C5.11785 12.5628 6.40885 11.6328 6.40885 10.0148C6.40085 7.32282 2.95885 7.80182 2.95885 6.78982Z'
                    fill='#B3B4AF'
                  />
                </g>
                <defs>
                  <clipPath id='clip0_5034_90035'>
                    <rect
                      width='33'
                      height='16'
                      fill='white'
                      transform='translate(0.239258 0.553223)'
                    />
                  </clipPath>
                </defs>
              </svg>
            </VStack>
          </HStack>
          <Box w='1px' h='30px' bg='white700' />

          <Box>
            <Text size={'12px'} weight={400} color='white700'>
              Terms
            </Text>
          </Box>
          <Box>
            <Text size={'12px'} weight={400} color='white700'>
              Privacy
            </Text>
          </Box>
        </HStack>
      </Box>
    </VStack>
  );
}
