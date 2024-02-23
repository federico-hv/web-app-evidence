export interface SelectTimeProps {
  startFrom: number;
  name: string;
  value: string;
  onValueChange: (e: string) => void;
  numberOfOptions: number;
}
