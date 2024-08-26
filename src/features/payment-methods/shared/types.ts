import { ITinyClub } from '../../clubs';

export interface IPaymentMethod {
  id: number;
  card: ICardDetails;
}

export interface ICardDetails {
  brand: 'visa' | 'mastercard' | 'amex' | string;
  displayBrand: 'visa' | 'mastercard' | 'american_express' | string;
  last4: string;
  expires: string;
}

export interface ITinyPaymentTransaction {
  id: number;
  createdAt: Date;
  amount: number;
}

export interface IPaymentTransaction extends ITinyPaymentTransaction {
  card?: ICardDetails;
  club: ITinyClub;
}
