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
    const state: any = {};

    editorState.read(() => {
      if (!onChange) return;
      editorState._nodeMap.forEach((value) => {
        const key = value.__type + 's';
        if (
          !(key === 'texts' || key === 'roots' || key === 'paragraphs')
        ) {
          state[key] = [...state[key], value.__text];
        }
      });

      state.message = $getRoot().__cachedText || '';

      state.mentions?.forEach((user: string, idx: number) => {
        state.message = state.message.replace(user, '$' + idx);
        state.mentions[idx] = user.slice(1);
      });

      onChange(state);
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
