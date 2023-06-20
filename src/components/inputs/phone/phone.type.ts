import { ChangeEvent } from 'react';

export interface PhoneInputProps {
  onChange: (e: string | ChangeEvent<any>) => void;
  phone: string;
  prefix?: string;
}
