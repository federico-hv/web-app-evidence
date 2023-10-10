type locations =
  | 'home'
  | 'discover'
  | 'settings'
  | 'support'
  | 'releases'
  | 'channels'
  | 'bookmarks'
  | 'back'
  | 'notifications'
  | 'messages'
  | 'profile';

interface UseMenuNavigateReturnType {
  goto: Record<locations, VoidFunction>;
}

export type UseMenuNavigate = () => UseMenuNavigateReturnType;
