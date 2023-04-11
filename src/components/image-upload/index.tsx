import { useState } from 'react';
import Avatar from '../../assets/avatar.png';
import { ImageUploadProps } from './image-upload.type';
import { AvatarImage, ImageWrapper, Image } from './image-upload.style';

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onUpload,
  imageUrl,
}) => {
  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
      onUpload(event.target.files[0]);
    }
  };

  return (
    <>
      <ImageWrapper>
        <label htmlFor='avatar-input'>
          {imageUrl ? (
            <Image src={imageUrl} alt='uploaded image' />
          ) : (
            <AvatarImage src={Avatar} alt='avatar image' />
          )}
        </label>
        <input
          id='avatar-input'
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </ImageWrapper>
    </>
  );
};
