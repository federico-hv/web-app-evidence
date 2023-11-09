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

export interface EditorTheme {
  [key: string]: string;
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

export interface GenericOption {
  name: string;
}

export class MentionOption<T extends GenericOption> extends MenuOption {
  data: T;

  constructor(data: T, keyExtractor: (data: T) => string) {
    super(keyExtractor(data));
    this.data = data;
  }
}

export interface MentionsProps<T extends GenericOption> {
  dataFetcher: (mentionString: string | null) => T[];
  renderItem: (data: T) => ReactElement;
  keyExtractor: (data: T) => string;
}
