export interface FormProps<T> {
  isLoading?: boolean;
  onSubmit: (data: T) => Promise<void>;
  onFinish: (data?: any) => void;
}
