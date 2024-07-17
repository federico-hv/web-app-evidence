import { StripeCardElementInfo } from '../types';

/**
 * A useful class with utilities that are useful
 * when working with stripe elements.
 */
export class StripeCardUtility {
  /**
   * Check whether a card element item (Expiry/Number) has an error.
   *
   * @param cardInfo
   */
  static validate(cardInfo: StripeCardElementInfo): boolean {
    if (
      !cardInfo.cardExpiry ||
      !cardInfo.cardNumber ||
      !cardInfo.cardCvc
    ) {
      return false;
    }

    return (
      !(cardInfo.cardExpiry.error || cardInfo.cardNumber.error) &&
      !(
        cardInfo.cardExpiry.empty ||
        cardInfo.cardNumber.empty ||
        cardInfo.cardCvc.empty
      )
    );
  }

  /**
   * Get the error message when a card element item (Expiry/Number) has an error.
   *
   * @param cardInfo
   */
  static retrieveErrorMessage(cardInfo: StripeCardElementInfo): string {
    if (cardInfo.cardExpiry && cardInfo.cardExpiry.error) {
      return cardInfo.cardExpiry.error.message;
    }

    if (cardInfo.cardNumber && cardInfo.cardNumber.error) {
      return cardInfo.cardNumber.error.message;
    }

    return '';
  }
}
