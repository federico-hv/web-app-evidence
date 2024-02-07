import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  LexicalTypeaheadMenuPlugin,
  useBasicTypeaheadTriggerMatch,
} from '@lexical/react/LexicalTypeaheadMenuPlugin';
import { TextNode } from 'lexical';
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  ReactElement,
} from 'react';
import { $createMentionNode } from '../../../shared';
import { MentionsProps, MentionOption } from '../../../types';
import { checkForAtSignMentions } from '../../../shared';
// import { popoverStyles } from '../../../styles';
// import { createPortal } from 'react-dom';

export default function MentionsPlugin<T>({
  dataFetcher,
  //renderItem,
  keyExtractor,
  results,
}: MentionsProps<T>): ReactElement | null {
  const [editor] = useLexicalComposerContext();

  const [queryString, setQueryString] = useState<string | null>(null);
  const [focused, setFocused] = useState<boolean>(true);

  useEffect(() => {
    dataFetcher(queryString);
  }, [queryString]);

  useEffect(() => {
    const input = document.getElementById('input-field');
    const handleUnfocused = () => setFocused(false);
    const handleFocused = () => setFocused(true);
    input?.addEventListener('blur', handleUnfocused, true);
    input?.addEventListener('focus', handleFocused, true);

    return () => {
      input?.removeEventListener('blur', handleUnfocused);
      input?.removeEventListener('focus', handleFocused);
    };
  }, []);

  const checkForSlashTriggerMatch = useBasicTypeaheadTriggerMatch('/', {
    minLength: 0,
  });

  const options = useMemo(
    () =>
      results?.map((result: T) => new MentionOption(result, keyExtractor)),
    [results, keyExtractor],
  );

  const onSelectOption = useCallback(
    (
      selectedOption: MentionOption<T>,
      nodeToReplace: TextNode | null,
      closeMenu: () => void,
    ) => {
      editor.update(() => {
        const mentionNode = $createMentionNode(
          '@' + keyExtractor(selectedOption.data),
        );
        if (nodeToReplace) {
          nodeToReplace.replace(mentionNode);
        }
        mentionNode.select();
        closeMenu();
      });
    },
    [editor],
  );

  const checkForMentionMatch = useCallback(
    (text: string) => {
      const slashMatch = checkForSlashTriggerMatch(text, editor);
      if (slashMatch !== null) {
        return null;
      }
      return checkForAtSignMentions(text, 1);
    },
    [checkForSlashTriggerMatch, editor],
  );

  return (
    <LexicalTypeaheadMenuPlugin<MentionOption<T>>
      onQueryChange={setQueryString}
      onSelectOption={onSelectOption}
      triggerFn={checkForMentionMatch}
      options={options}
      menuRenderFn={(
        anchorElementRef,
        { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex },
      ) =>
        // anchorElementRef.current && results.length && focused
        //   ? createPortal(
        //       <div className={popoverStyles()}>
        //         <ul style={{ listStyle: 'none' }}>
        //           {options.map((option: MentionOption<T>, i: number) => (
        //             <li
        //               id={
        //                 selectedIndex === i ? 'selected-option' : 'option'
        //               }
        //               // onClick doesnt work, instead using onMouseDown
        //               onMouseDown={() => {
        //                 setHighlightedIndex(i);
        //                 selectOptionAndCleanUp(option);
        //               }}
        //               onMouseEnter={() => {
        //                 setHighlightedIndex(i);
        //               }}
        //               ref={option.setRefElement}
        //               key={keyExtractor(option.data)}
        //             >
        //               {renderItem(option.data, selectedIndex === i)}
        //             </li>
        //           ))}
        //         </ul>
        //       </div>,
        //       anchorElementRef.current,
        //     )
        null
      }
    />
  );
}
