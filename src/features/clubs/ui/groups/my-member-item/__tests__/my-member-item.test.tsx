import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, describe, it, expect } from 'vitest';
import MyMemberItem from '../index';
import { dummyMember } from './dummyData';

type ImageConstructor = new (
  width?: number | undefined,
  height?: number | undefined,
) => HTMLImageElement;

describe('MyMemberItem tests', () => {
  global.Image = class {
    onload: () => void;

    constructor() {
      this.onload = vi.fn();
      setTimeout(() => {
        this.onload();
      }, 50);
    }
  } as unknown as ImageConstructor;

  it('should render online member and indicate online status', async () => {
    render(<MyMemberItem data={dummyMember} isOnline={true} />);

    await waitFor(() => {
      const avatarElement = screen.getByRole('img');
      expect(avatarElement).toBeInTheDocument();
    });

    const onlineStatusElement = screen.getByRole('status');
    expect(onlineStatusElement).toBeInTheDocument();

    const displayNameElement = screen.getByLabelText(
      'members-item displayName',
    );
    expect(displayNameElement).toBeInTheDocument();
    expect(displayNameElement).toHaveTextContent(dummyMember.displayName);

    const usernameElement = screen.getByLabelText('members-item username');
    expect(usernameElement).toBeInTheDocument();
    expect(usernameElement).toHaveTextContent(`@${dummyMember.username}`);
  });

  it('should render offline member and have no online status', async () => {
    render(<MyMemberItem data={dummyMember} isOnline={false} />);


    await waitFor(() => {
      const avatarElement = screen.getByRole('img');
      expect(avatarElement).toBeInTheDocument();
    });

    const onlineStatusElement = screen.queryByRole('status');
    expect(onlineStatusElement).not.toBeInTheDocument();

    const displayNameElement = screen.getByLabelText(
      'members-item displayName',
    );
    expect(displayNameElement).toBeInTheDocument();
    expect(displayNameElement).toHaveTextContent(dummyMember.displayName);

    const usernameElement = screen.getByLabelText('members-item username');
    expect(usernameElement).toBeInTheDocument();
    expect(usernameElement).toHaveTextContent(`@${dummyMember.username}`);
  });
});
