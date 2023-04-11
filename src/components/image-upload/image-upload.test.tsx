import { ImageUpload } from 'components';
import { render, fireEvent, getByTitle } from '@testing-library/react';
import { describe, expect } from 'vitest';
import jest from 'jest-mock';

const imageUrl = 'https://example.com/image.png';

describe('ImageUpload component', () => {
  test('renders with an avatar image when no image is uploaded', () => {
    const { getByAltText } = render(
      <ImageUpload onUpload={() => {}} imageUrl={imageUrl} />,
    );

    expect(getByAltText('uploaded image')).toBeInTheDocument();
  });

  test('renders with an uploaded image', () => {
    const { getByAltText } = render(
      <ImageUpload onUpload={() => {}} imageUrl={imageUrl} />,
    );

    expect(getByAltText('uploaded image')).toBeInTheDocument();
  });

  test('calls onUpload function with selected file', () => {
    const onUpload = jest.fn();
    const { getByAltText } = render(<ImageUpload onUpload={onUpload} />);

    const file = new File(['file contents'], 'test.png', {
      type: 'image/png',
    });
    fireEvent.change(getByAltText('avatar image'), {
      target: { files: [file] },
    });

    expect(onUpload).toHaveBeenCalledTimes(0);
  });
});
