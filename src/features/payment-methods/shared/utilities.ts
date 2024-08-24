import { Asset } from '../../../shared';

export function getPaymentMethodLogo(brand: string) {
  switch (brand) {
    case 'american_express':
      return Asset.Icon.Amex;
    case 'visa':
      return Asset.Icon.Visa;
    case 'mastercard':
      return Asset.Icon.Mastercard;
    default:
      return '';
  }
}
