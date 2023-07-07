export interface IChangeContactInfoContext {
  name: 'phone' | 'email';
  update: (value: string) => void;
  phone?: string;
  email?: string;
  close: VoidFunction;
}
