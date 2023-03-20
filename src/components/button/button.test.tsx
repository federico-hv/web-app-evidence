import { Button } from 'components';
import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

describe('Button', () => {
  it('renders with children', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('renders all props', () => {
    const { getByRole } = render(
      <Button
        type='primary'
        width='100px'
        onClick={() => console.log('click in')}
      >
        Click me
      </Button>,
    );
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('applies styles based on the type prop', () => {
    const { getByRole } = render(<Button type='primary'>Click me</Button>);
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('applies custom width', () => {
    const { getByRole } = render(<Button width='100px'>Click me</Button>);
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('Click event', async () => {
    const mockOnClick = jest.fn();
    render(
      <Button type='primary' width='100px' onClick={mockOnClick}>
        Click me
      </Button>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
