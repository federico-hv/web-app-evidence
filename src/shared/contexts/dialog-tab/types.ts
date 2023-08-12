export interface IDialogTabContext {
  option: string;
  isOpen: boolean;
  onOpen: (value: string) => void;
  onClose: VoidFunction;
}
