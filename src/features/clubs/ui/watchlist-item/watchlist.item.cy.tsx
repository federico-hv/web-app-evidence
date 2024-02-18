import React from 'react'
import WatchlistItem from './watchlist.item'

describe('<WatchlistItem />', () => {
  let mockAuctionMembershipData: any;
  let mockSecondaryMembershipData: any;


  before(() => {
    cy.fixture('mockMembershipData.json').then((mockData) => {
      mockAuctionMembershipData = mockData.auctionMembershipData;
      mockSecondaryMembershipData = mockData.secondarySaleMembershipData;
    })
  })

  it('renders', () => {
    cy.mount(<WatchlistItem data={mockAuctionMembershipData} />);

  })
})