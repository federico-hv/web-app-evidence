import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Text } from 'components';

describe('Text', () => {
  it('renders the children prop', () => {
    const { getByText } = render(<Text>hello world</Text>);
    expect(getByText('hello world')).toBeInTheDocument();
  });

  it('applies the className prop', () => {
    const { container } = render(
      <Text className='test-class'>hello world</Text>,
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies the size prop', () => {
    const { container } = render(<Text size='h1'>hello world</Text>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies the uppercase prop', () => {
    const { container } = render(<Text uppercase>hello world</Text>);
    expect(container.firstChild).toBeInTheDocument();
  });
});
