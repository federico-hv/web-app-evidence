import { Meta, StoryObj } from '@storybook/react';
import MembershipAuctionCard from '../index';
import { OnSaleMembershipModel } from '../../../../shared';

let anHrLater = new Date();
anHrLater.setHours(anHrLater.getHours() + 1);

const auctionData: OnSaleMembershipModel = {
  endDate: anHrLater,
  isOnWatchlist: false,
  price: 100.11,
  name: 'Name',
  artist: {
    id: '1',
    avatar: '',
    displayName: 'Artist Name',
    username: 'artist username',
  },
};

const meta: Meta<typeof MembershipAuctionCard> = {
  component: MembershipAuctionCard,
  title: 'Clubs/MembershipAuctionCard',
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof MembershipAuctionCard>;

export const Usage: Story = {
  name: 'Usage',
  render: () => <MembershipAuctionCard data={auctionData} />,
};
