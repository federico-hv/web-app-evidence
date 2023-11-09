import { MenuOption } from "@lexical/react/LexicalTypeaheadMenuPlugin";
import { ReactElement } from "react";


export interface GenericOption {
  name: string
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
