import { ChangeEvent } from 'react';

export interface PostMediaUploadProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
