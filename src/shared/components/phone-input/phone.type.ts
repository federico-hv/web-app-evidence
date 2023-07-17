import { ChangeEvent } from 'react';

export interface PhoneInputProps {
  onChange: (e: string | ChangeEvent<any>) => void;
  phone: string;
  prefix?: string;
}

export interface Phone {
  code: string;
  digits: string;
}
