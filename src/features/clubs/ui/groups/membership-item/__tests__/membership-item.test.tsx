import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import MembershipItem from '../membership-item';
import { dummyOwnedMembershipData, dummyOwnedMembershipData2 } from './dummyData';

describe("MembershipItem tests", () => {
    it("should render membership item with rising price", () => {
        render(<MembershipItem data={dummyOwnedMembershipData}/>);

        const avatarElement = screen.getByRole('complementary');
        expect(avatarElement).toBeInTheDocument();

        const nameElement = screen.getByTestId('membership-item-name');
        expect(nameElement).toBeInTheDocument();

        const numberElement = screen.getByTestId('membership-item-number');
        expect(numberElement).toBeInTheDocument();
        expect(numberElement).toHaveTextContent(`#${dummyOwnedMembershipData.membershipNum}`);

        // screen.debug();
        
        const iconElement = screen.getByTestId('membership-item-change-icon');
        expect(iconElement).toBeInTheDocument();
        // expect(iconElement).toHaveProperty("name", "arrow-up-outline");
        
        const priceChangeElement = screen.getByTestId('membership-item-priceChange');
        expect(priceChangeElement).toBeInTheDocument();
        expect(priceChangeElement).toHaveTextContent(`$${dummyOwnedMembershipData.priceChange.toFixed(2)} USD`);

    });

    it("should render membership item with falling price", () => {
        render(<MembershipItem data={dummyOwnedMembershipData2}/>);

        const avatarElement = screen.getByRole('complementary');
        expect(avatarElement).toBeInTheDocument();

        const nameElement = screen.getByTestId('membership-item-name');
        expect(nameElement).toBeInTheDocument();

        const numberElement = screen.getByTestId('membership-item-number');
        expect(numberElement).toBeInTheDocument();
        expect(numberElement).toHaveTextContent(`#${dummyOwnedMembershipData2.membershipNum}`);

        const iconElement = screen.getByTestId('membership-item-change-icon');
        expect(iconElement).toBeInTheDocument();
        
        const priceChangeElement = screen.getByTestId('membership-item-priceChange');
        expect(priceChangeElement).toBeInTheDocument();
        expect(priceChangeElement).toHaveTextContent(`$${dummyOwnedMembershipData2.priceChange.toFixed(2)} USD`);

    });
})