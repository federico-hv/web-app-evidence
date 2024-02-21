import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import MyMemberItem from '../index';
import { dummyMember } from './dummyData';

describe('MyMemberItem tests', () => {
  it('should render online member and indicate online status', () => {
    render(<MyMemberItem data={dummyMember} isOnline={true} />);

    const avatarElement = screen.getByRole('complementary');
    expect(avatarElement).toBeInTheDocument();

    const onlineStatusElement = screen.getByTestId(
      'members-item-online-status',
    );
    expect(onlineStatusElement).toBeInTheDocument();

    const displayNameElement = screen.getByTestId(
      'members-item-displayName',
    );
    expect(displayNameElement).toBeInTheDocument();
    expect(displayNameElement).toHaveTextContent(dummyMember.displayName);

    const usernameElement = screen.getByTestId('members-item-username');
    expect(usernameElement).toBeInTheDocument();
    expect(usernameElement).toHaveTextContent(`@${dummyMember.username}`);
  });

  it('should render offline member and have no online status', () => {
    render(<MyMemberItem data={dummyMember} isOnline={false} />);

    const avatarElement = screen.getByRole('complementary');
    expect(avatarElement).toBeInTheDocument();

    const onlineStatusElement = screen.queryByTestId(
      'members-item-online-status',
    );
    expect(onlineStatusElement).not.toBeInTheDocument();

    const displayNameElement = screen.getByTestId(
      'members-item-displayName',
    );
    expect(displayNameElement).toBeInTheDocument();
    expect(displayNameElement).toHaveTextContent(dummyMember.displayName);

    const usernameElement = screen.getByTestId('members-item-username');
    expect(usernameElement).toBeInTheDocument();
    expect(usernameElement).toHaveTextContent(`@${dummyMember.username}`);
  });
});
