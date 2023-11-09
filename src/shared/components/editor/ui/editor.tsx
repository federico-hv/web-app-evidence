import {
  InitialConfigType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { $getRoot, EditorState as LexicalEditorState } from 'lexical';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

import { EditorProps } from '../shared/types';
import { ReactElement } from 'react';

const defaultConfig: InitialConfigType = {
  namespace: 'editor',
  onError: (error) => console.error(error),
};

export default function Editor({
  Placeholder = <div>Write...</div>,
  plugins = [],
  config = defaultConfig,
  onChange,
}: EditorProps): ReactElement {
  function updateState(editorState: LexicalEditorState) {
    const object: any = {};

    editorState.read(() => {
      if (!onChange) return;
      editorState._nodeMap.forEach((value) => {
        const key = value.__type + 's';
        if (
          !(key === 'texts' || key === 'roots' || key === 'paragraphs')
        ) {
          if (Object.keys(object).includes(key)) {
            object[key].push(value.__text);
          } else {
            object[key] = [value.__text];
          }
        }
      });

      object.message = $getRoot().__cachedText || '';

      object.mentions?.forEach((user: string, idx: number) => {
        object.message = object.message.replace(user, '$' + idx);
        object.mentions[idx] = user.slice(1);
      });

      onChange(object);
    });
  }

  return (
    <LexicalComposer initialConfig={config}>
      <div className='editor-container' id='input-field' data-cy='editor'>
        <PlainTextPlugin
          contentEditable={<ContentEditable className='editor-input' />}
          placeholder={
            <div className='editor-placeholder'>{Placeholder}</div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={updateState} />
        <HistoryPlugin />
        {plugins}
      </div>
    </LexicalComposer>
  );
}
