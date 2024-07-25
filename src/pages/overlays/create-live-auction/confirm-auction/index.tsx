import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  Text,
  VStack,
} from '@holdr-ui/react';
import {
  InformationTooltip,
  InputTextField,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../../shared';
import { ChangeClubImage } from '../../setup-artist-profile/upload-photos/ui';
import { useClubContext, usePerksContext } from '../../../../features';
import { SelectPredefinedPerks } from '../../setup-artist-profile/bio-and-perks/ui';
import { ChangeEvent, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import DurationInHoursPicker from './duration-in-hours-picker';
import { OutletContext } from '../ui/create-live-auction-dialog';

function ConfirmAuction() {
  const { formik, onDialogClose, onNextStep, acceptButtonText } =
    useOutletContext<OutletContext>();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^\d]/g, '');
    formik.handleChange(e);
  };

  return (
    <VStack
      as='form'
      gap={8}
      h='100%'
      overflowY='auto'
      pr={4}
      className='thin-scrollbar'
      onSubmit={formik.handleSubmit}
    >
      <VStack gap={4}>
        <TextGroup gap={0}>
          <TextGroupHeading as='h2' size={3} weight={500}>
            Initialize Auction
          </TextGroupHeading>
          <TextGroupSubheading size={1} color='white700'>
            Enter the following information in complete your auction
          </TextGroupSubheading>
        </TextGroup>
      </VStack>
      <VStack gap={4}>
        <InputTextField
          name='entryPrice'
          tooltip='Entry price of the auction'
          label='Starting Price'
          placeholder='Enter the starting price of your membership'
          value={formik.values.entryPrice}
          onChange={handleInputChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.entryPrice && formik.errors.entryPrice && (
          <Text
            size={1}
            css={{
              color: '$danger200',
            }}
          >
            {formik.errors.entryPrice}
          </Text>
        )}
      </VStack>
      <VStack gap={4}>
        <InputTextField
          name='numberOfMemberships'
          tooltip='Amount of club memberships'
          label='Number of Memberships'
          placeholder='Enter the number of memberships you are auctioning'
          value={formik.values.numberOfMemberships}
          onChange={handleInputChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.numberOfMemberships &&
          formik.errors.numberOfMemberships && (
            <Text
              size={1}
              css={{
                color: '$danger200',
              }}
            >
              {formik.errors.numberOfMemberships}
            </Text>
          )}
      </VStack>
      <VStack gap={4}>
        <HStack color='white700' gap={1} items='center'>
          <Text weight={500} size={2} as='label'>
            Duration
          </Text>
          <InformationTooltip
            side='right'
            align='start'
            container={
              document.getElementById('page-dialog-container') ||
              document.body
            }
            description='Auction duration (1 - 3 hours)'
          />
        </HStack>
        <DurationInHoursPicker
          name='duration'
          onChange={handleInputChange}
          value={formik.values.duration}
        />
        {formik.touched.duration && formik.errors.duration && (
          <Text
            size={1}
            css={{
              color: '$danger200',
            }}
          >
            {formik.errors.duration}
          </Text>
        )}
      </VStack>
      {/* This is not for MVP
      <VStack gap={2}>
        <HStack color='white700' gap={1} items='center'>
          <Text weight={500} size={2} as='label'>
            Schedule Auction
          </Text>
          <InformationTooltip
            side='right'
            align='start'
            container={
              document.getElementById('page-dialog-container') ||
              document.body
            }
            description='Something useful.'
          />
        </HStack>
        <HStack gap={4}>
          <InputTextField name='url' placeholder='Date' />
          <InputTextField name='url' placeholder='Time' />
        </HStack>
      </VStack> */}
      <VStack>
        <Box bgColor='rgba(152, 152, 255, 0.20)' h='1px' my={4} />
        <Box bgColor='transparent' h='30px' />

        {/** ⚠️ Disable when live auction is running*/}
        {/*<CustomMembershipPerks/>*/}
        {/*<HStack color='white700' gap={2} items='center'>*/}
        {/*  <Text weight={500} size={2} as='label'>*/}
        {/*    Custom Perks*/}
        {/*  </Text>*/}
        {/*  <InformationTooltip*/}
        {/*    side='right'*/}
        {/*    align='start'*/}
        {/*    container={*/}
        {/*      document.getElementById('page-dialog-container') ||*/}
        {/*      document.body*/}
        {/*    }*/}
        {/*    description='Info.'*/}
        {/*  />*/}
        {/*</HStack>*/}
      </VStack>
      <HStack
        bgColor='#30304b'
        position='sticky'
        b={0}
        gap={2}
        justify='flex-end'
        py={4}
      >
        <Box h={'80px'}>
          <HStack items={'center'} justify={'flex-end'}>
            <VStack justify='center' items='center' py='14px' px='28px'>
              <Text
                color='white700'
                size='14px'
                weight={500}
                css={{ textDecoration: 'underline' }}
                onClick={onDialogClose}
              >
                Cancel
              </Text>
            </VStack>
            <Button
              type={'submit'}
              radius={1}
              colorTheme='purple500'
              css={{
                padding: '14px 28px',
              }}
              onClick={onNextStep}
            >
              <Text size='14px' weight={500}>
                {acceptButtonText}
              </Text>
            </Button>
          </HStack>
        </Box>
      </HStack>
    </VStack>
  );
}

ConfirmAuction.displayName = 'ConfirmAuction';

export default ConfirmAuction;
