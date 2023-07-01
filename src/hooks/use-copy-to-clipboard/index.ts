import { useToast } from '../use-toast';

/**
 * Returns a function that can be used to copy text to the clipboard.
 *
 * @param description The text to show in the toast message
 */
export function useCopyToClipboard(description?: string) {
  const { open } = useToast({
    description: description || 'Copied to clipboard',
    status: 'success',
  });

  return (text: string) => navigator.clipboard.writeText(text).then(open);
}
