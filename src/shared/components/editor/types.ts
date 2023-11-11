import { InitialConfigType } from '@lexical/react/LexicalComposer';
import { MenuOption } from '@lexical/react/LexicalTypeaheadMenuPlugin';
import type { SerializedTextNode, Spread } from 'lexical';
import { ReactElement } from 'react';

export interface EditorProps {
  Placeholder?: ReactElement;
  plugins?: ReactElement[];
  config?: InitialConfigType;
  onChange?: (state: any) => void;
}

export type ErrorBoundaryProps = {
  children: ReactElement;
  onError: (error: Error) => void;
};

export type SerializedMentionNode = Spread<
  {
    mentionName: string;
    type: 'mention';
    version: 1;
  },
  SerializedTextNode
>;

export class MentionOption<T> extends MenuOption {
  data: T;

  constructor(data: T, keyExtractor: (data: T) => string) {
    super(keyExtractor(data));
    this.data = data;
  }
}

export interface MentionsProps<T> {
  dataFetcher: (mentionString: string | null) => void;
  renderItem: (data: T, selected: boolean) => ReactElement;
  keyExtractor: (data: T) => string;
  results: T[];
}
