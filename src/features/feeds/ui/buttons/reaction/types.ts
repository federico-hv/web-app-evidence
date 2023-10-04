import { IconName } from '@holdr-ui/react/dist/shared/types';

export interface ReactionButtonProps {
  onClick: (id: string) => Promise<void>;
  active?: boolean;
  name: string;
  icon: { active: IconName; inactive: IconName };
  colorCode: { hover: string; active: string };
}
