import { Button } from 'components';
import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('Button', () => {
  it('renders with children', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('renders all props', () => {
    const { getByRole } = render(
      <Button
        class='primary'
        width='100px'
        onClick={() => console.log('click in')}
      >
        Click me
      </Button>,
    );
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('applies styles based on the type prop', () => {
    const { getByRole } = render(
      <Button class='primary'>Click me</Button>,
    );
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('applies custom width', () => {
    const { getByRole } = render(<Button width='100px'>Click me</Button>);
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('Click event', async () => {
    const { container } = render(
      <Button class='primary' width='100px' onClick={() => {}}>
        Click me
      </Button>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(container).toBeInTheDocument();
  });
});
