import { useToast } from '../use-toast';

/**
 * Returns a function that can be used to copy text to the clipboard.
 *
 * @param description The text to show in the toast message
 */
export function useCopyToClipboard(description?: string) {
  const { openWith } = useToast();

  return (text: string) =>
    navigator.clipboard.writeText(text).then(() => {
      openWith({
        description: description || 'Copied to clipboard',
        status: 'success',
      });
    });
}
