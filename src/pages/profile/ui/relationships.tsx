import { Responsive, ResponsiveItem } from '../../../shared';
import { RelationshipsCard } from './index';

function Relationships() {
  return (
    <Responsive>
      <ResponsiveItem mobile='show'>
        <RelationshipsCard />
      </ResponsiveItem>
    </Responsive>
  );
}
Relationships.displayName = 'Relationships';

export default Relationships;
