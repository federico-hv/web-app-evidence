import { SaveCardDataType } from '../types';

export const DefaultSaveCardData: SaveCardDataType = {
  email: '',
  name: '',
  line1: '',
  city: '',
  postal: '', // also zip
  country: '',
  province: '', // also state
};

export const dummyBillingInfo: Omit<SaveCardDataType, 'email'> = {
  name: 'Fake user',
  line1: '123 Main Street',
  city: 'Vancouver',
  postal: 'V1V1V1', // also zip
  country: 'CA',
  province: 'BC', // also state
};
