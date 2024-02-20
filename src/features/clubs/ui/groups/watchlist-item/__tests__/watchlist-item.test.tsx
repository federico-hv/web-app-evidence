import WatchlistItem from '../index';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { dummyAuctionMembershipData, dummySecondarySaleMembershipData } from './dummyData';

describe('WatchlistItem tests', () => {
  it('should render live watchlist item', () => {
    render(<WatchlistItem data={dummyAuctionMembershipData} />);

    // screen.debug();

    const avatarElement = screen.getByRole('complementary');
    expect(avatarElement).toBeInTheDocument();

    expect(screen.getByTestId('watchlist-item-name')).toBeInTheDocument();

    const liveBlinkerElement = screen.getByTestId('watchlist-item-live-blinker');
    expect(liveBlinkerElement).toBeInTheDocument();
    expect(liveBlinkerElement).toHaveTextContent(/Live/i);

    const priceTitleElement = screen.getByTestId('watchlist-item-price-title');
    expect(priceTitleElement).toBeInTheDocument();
    expect(priceTitleElement).toHaveTextContent(/Entry price/i);

    const priceElement = screen.getByTestId('watchlist-item-price'); 
    expect(priceElement).toBeInTheDocument();
    expect(priceElement).toHaveTextContent(`$${dummyAuctionMembershipData.price} USD`);

    expect(screen.getByTestId('watchlist-item-timeleft-title')).toBeInTheDocument();
    expect(screen.getByRole('timer')).toBeInTheDocument();
  });

  it('should render secondary watchlist item', () => {
    render(<WatchlistItem data={dummySecondarySaleMembershipData} />);

    // screen.debug();

    const avatarElement = screen.getByRole('complementary');
    expect(avatarElement).toBeInTheDocument();

    expect(screen.getByTestId('watchlist-item-name')).toBeInTheDocument();

    const liveBlinkerElement = screen.queryByTestId('watchlist-item-live-blinker');
    expect(liveBlinkerElement).not.toBeInTheDocument();
    expect(screen.queryByText(/Live/i)).not.toBeInTheDocument();

    const priceTitleElement = screen.getByTestId('watchlist-item-price-title');
    expect(priceTitleElement).toBeInTheDocument();
    expect(priceTitleElement).toHaveTextContent(/Buy now/i);

    const priceElement = screen.getByTestId('watchlist-item-price'); 
    expect(priceElement).toBeInTheDocument();
    expect(priceElement).toHaveTextContent(`$${dummyAuctionMembershipData.price} USD`);

    expect(screen.queryByTestId('watchlist-item-timeleft-title')).not.toBeInTheDocument();
    expect(screen.queryByRole('timer')).not.toBeInTheDocument();
  });
});

export {};
