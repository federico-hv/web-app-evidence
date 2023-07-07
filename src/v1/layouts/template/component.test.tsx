import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Component } from './index';

describe('Component: Template', () => {
  it('should render Hello world', () => {
    // Arrange
    render(<Component text='Hello world' />);
    // Act
    // Expect
    expect(screen.getByRole('textbox')).toHaveTextContent('Hello world');
  });
});
