export interface PollAnswerInputProps {
  title: string;
  value: string;
  update: (value: string) => void;
  remove: VoidFunction;
}
