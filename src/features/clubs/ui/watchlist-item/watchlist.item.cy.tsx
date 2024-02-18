import React from 'react';
import WatchlistItem from './watchlist.item';

describe('<WatchlistItem />', () => {
  let mockAuctionMembershipData: any;
  let mockSecondaryMembershipData: any;

  before(() => {
    cy.fixture('watchlist-item.fixture.json').then((mockData) => {
      mockAuctionMembershipData = mockData.auctionMembershipData;
      mockSecondaryMembershipData = mockData.secondarySaleMembershipData;
    });
  });

  it('should render live auction watchlist item', () => {
    cy.mount(<WatchlistItem data={mockAuctionMembershipData} />);
    cy.checkTestIdsExistAndVisible([
      'watchlist-item-name',
      'watchlist-item-livetag',
      'watchlist-item-price-title',
      'watchlist-item-price',
      'watchlist-item-timeleft-title',
      'watchlist-item-countdown',
      'watchlist-item-avatar',
    ]);
    cy.checkByTestIdHasText(
      'watchlist-item-price-title',
      `${/entry price/i}`,
    );
    cy.checkByTestIdHasText(
      'watchlist-item-timeleft-title',
      `${/time left/i}`,
    );
    cy.checkByTestIdHasText(
      'watchlist-item-price',
      `$${mockAuctionMembershipData.price} USD`,
    );
  });

  it('should render secondary auction watchlist item', () => {
    cy.mount(<WatchlistItem data={mockSecondaryMembershipData} />);
    cy.checkTestIdsExistAndVisible([
      'watchlist-item-name',
      'watchlist-item-price-title',
      'watchlist-item-price',
      'watchlist-item-avatar',
    ]);
    cy.checkTestIdsNotExist([
      'watchlist-item-countdown',
      'watchlist-item-timeleft-title',
      'watchlist-item-livetag',
    ]);
    cy.checkByTestIdHasText('watchlist-item-price-title', `${/buy now/i}`);
    cy.checkByTestIdHasText(
      'watchlist-item-price',
      `$${mockAuctionMembershipData.price} USD`,
    );
  });
});
