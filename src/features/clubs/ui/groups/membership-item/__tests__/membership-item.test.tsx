import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, describe, it, expect } from 'vitest';
import MembershipItem from '../membership-item';
import {
  dummyOwnedMembershipData,
  dummyOwnedMembershipData2,
} from './dummyData';

type ImageConstructor = new (
  width?: number | undefined,
  height?: number | undefined,
) => HTMLImageElement;

describe('MembershipItem tests', () => {
  global.Image = class {
    onload: () => void;

    constructor() {
      this.onload = vi.fn();
      setTimeout(() => {
        this.onload();
      }, 50);
    }
  } as unknown as ImageConstructor;

  it('should render membership item with rising price', async () => {
    render(<MembershipItem data={dummyOwnedMembershipData} />);

    await waitFor(() => {
      const avatarElement = screen.getByRole('img');
      expect(avatarElement).toBeInTheDocument();
    });

    const nameElement = screen.getByLabelText('membership-item name');
    expect(nameElement).toBeInTheDocument();
    expect(nameElement).toHaveTextContent(dummyOwnedMembershipData.name);

    const numberElement = screen.getByLabelText('membership-item number');
    expect(numberElement).toBeInTheDocument();
    expect(numberElement).toHaveTextContent(
      `Membership #${dummyOwnedMembershipData.membershipNum}`,
    );

    const increaseIconElement = screen.getByLabelText('increase in value');
    expect(increaseIconElement).toBeInTheDocument();
    const decreaseIconElement = screen.queryByLabelText('decrease in value');
    expect(decreaseIconElement).not.toBeInTheDocument();

    const priceChangeElement = screen.getByLabelText(
      'membership-item price change',
    );
    expect(priceChangeElement).toBeInTheDocument();
    expect(priceChangeElement).toHaveTextContent(
      `$${dummyOwnedMembershipData.priceChange.toFixed(2)} USD`,
    );
  });

  it('should render membership item with falling price', async () => {
    render(<MembershipItem data={dummyOwnedMembershipData2} />);

    await waitFor(() => {
      const avatarElement = screen.getByRole('img');
      expect(avatarElement).toBeInTheDocument();
    });

    const nameElement = screen.getByLabelText('membership-item name');
    expect(nameElement).toBeInTheDocument();
    expect(nameElement).toHaveTextContent(dummyOwnedMembershipData2.name);

    const numberElement = screen.getByLabelText('membership-item number');
    expect(numberElement).toBeInTheDocument();
    expect(numberElement).toHaveTextContent(
      `Membership #${dummyOwnedMembershipData2.membershipNum}`,
    );

    const decreaseIconElement = screen.getByLabelText('decrease in value');
    expect(decreaseIconElement).toBeInTheDocument();
    const increaseIconElement = screen.queryByLabelText('increase in value');
    expect(increaseIconElement).not.toBeInTheDocument();

    const priceChangeElement = screen.getByLabelText(
      'membership-item price change',
    );
    expect(priceChangeElement).toBeInTheDocument();
    expect(priceChangeElement).toHaveTextContent(
      `$${dummyOwnedMembershipData.priceChange.toFixed(2)} USD`,
    );
  });
});
