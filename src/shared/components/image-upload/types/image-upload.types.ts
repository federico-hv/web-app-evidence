import { Dispatch, ReactElement, SetStateAction } from 'react';

export interface ImageUploadProps {
  value?: string;
  disabled?: boolean;
  onChange?: (image: File) => void;
  aspect?: number;
  name: string;
  title: string;
  placeholder?: string;
  children?: ReactElement;
}

export interface CropperFooterProps {
  zoom: number;
  setZoom: Dispatch<SetStateAction<number>>;
}

export interface CropperHeaderProps {
  saveImage: VoidFunction;
  title?: string;
}

export interface CropperBodyProps {
  aspect?: number;
  chosenImage: string;
  zoom: number;
  setZoom: Dispatch<SetStateAction<number>>;
  setCroppedAreaPixels: Dispatch<SetStateAction<any>>;
}
