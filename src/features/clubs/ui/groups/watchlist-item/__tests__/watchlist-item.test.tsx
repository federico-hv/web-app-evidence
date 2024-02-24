import WatchlistItem from '../index';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, describe, it, expect } from 'vitest';
import { dummyAuctionMembershipData, dummySecondarySaleMembershipData } from './dummyData';

type ImageConstructor = new (
  width?: number | undefined,
  height?: number | undefined
) => HTMLImageElement;

describe('WatchlistItem tests', () => {

  global.Image = (class {
    onload: () => void;

    constructor() {
      this.onload = vi.fn();
      setTimeout(() => {
        this.onload();
      }, 50);
    }
  } as unknown) as ImageConstructor;

  it('should render live watchlist item', async () => {
    render(<WatchlistItem data={dummyAuctionMembershipData} />);

    await waitFor(() => {
      const avatarElement = screen.getByRole('img');
      expect(avatarElement).toBeInTheDocument();
    });

    const nameElement = screen.getByLabelText('watchlist-item name');
    expect(nameElement).toBeInTheDocument();
    expect(nameElement).toHaveTextContent(dummyAuctionMembershipData.name);

    const liveBlinkerElement = screen.getByRole('live-blinker');
    expect(liveBlinkerElement).toBeInTheDocument();
    expect(liveBlinkerElement).toHaveTextContent(/Live/i);

    const priceTitleElement = screen.getByLabelText('watchlist-item price title');
    expect(priceTitleElement).toBeInTheDocument();
    expect(priceTitleElement).toHaveTextContent(/Entry price/i);

    const priceElement = screen.getByLabelText('watchlist-item price'); 
    expect(priceElement).toBeInTheDocument();
    expect(priceElement).toHaveTextContent(`$${dummyAuctionMembershipData.price} USD`);

    expect(screen.getByLabelText('watchlist-item timeleft title')).toBeInTheDocument();
    const countdownElement = screen.getByRole('timer');
    expect(countdownElement).toBeInTheDocument();
  });

  it('should render secondary watchlist item', async () => {
    render(<WatchlistItem data={dummySecondarySaleMembershipData} />);

    await waitFor(() => {
      const avatarElement = screen.getByRole('img');
      expect(avatarElement).toBeInTheDocument();
    });

    const nameElement = screen.getByLabelText('watchlist-item name');
    expect(nameElement).toBeInTheDocument();
    expect(nameElement).toHaveTextContent(dummySecondarySaleMembershipData.name);

    const liveBlinkerElement = screen.queryByRole('live-blinker');
    expect(liveBlinkerElement).not.toBeInTheDocument();

    const priceTitleElement = screen.getByLabelText('watchlist-item price title');
    expect(priceTitleElement).toBeInTheDocument();
    expect(priceTitleElement).toHaveTextContent(/Buy now/i);

    const priceElement = screen.getByLabelText('watchlist-item price'); 
    expect(priceElement).toBeInTheDocument();
    expect(priceElement).toHaveTextContent(`$${dummySecondarySaleMembershipData.price} USD`);

    expect(screen.queryByLabelText('watchlist-item timeleft title')).not.toBeInTheDocument();
    const countdownElement = screen.queryByRole('timer');
    expect(countdownElement).not.toBeInTheDocument();
  });
});

export {};
