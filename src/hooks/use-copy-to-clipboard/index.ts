/**
 *
 */
export function useCopyToClipboard() {
  return (text: string) => navigator.clipboard.writeText(text);
}
