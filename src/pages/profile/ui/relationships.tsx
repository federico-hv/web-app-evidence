import { Responsive, ResponsiveItem } from '../../../shared';
import { RelationshipsCard } from './index';
import { Box, Container } from '@holdr-ui/react';

function Relationships() {
  return (
    <Responsive>
      <ResponsiveItem mobile='show'>
        <Box borderBottom={1} borderColor='base100' />
        <Container w='100%' maxWidth={{ '@bp1': '100%', '@bp3': 600 }}>
          <RelationshipsCard />
        </Container>
      </ResponsiveItem>
    </Responsive>
  );
}
Relationships.displayName = 'Relationships';

export default Relationships;
