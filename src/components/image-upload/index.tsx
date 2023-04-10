import React, { useState } from 'react';
import Avatar from '../../assets/avatar.png';

type ImageUploadProps = {
  onUpload: (file: File) => void;
  imageUrl?: string;
};

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
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt='uploaded image'
            style={{ maxWidth: '100%' }}
          />
        ) : (
          <img src={Avatar} />
        )}
        <label htmlFor='avatar-input'>
          {imageUrl ? 'Change' : 'Upload'} Avatar
        </label>
        <input
          id='avatar-input'
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};
