import { Box, Card, Heading } from '@holdr-ui/react';
import { Link } from 'react-router-dom';
import { AsideCardProps } from './aside-card.types';

function AsideCard({
  title,
  data,
  renderItem,
  path,
  keyExtractor,
}: AsideCardProps) {
  return (
    <Card boxShadow='none' p={1}>
      <Card.Header>
        <Heading as='h1' casing='uppercase' size={3} weight={500}>
          {title}
        </Heading>
      </Card.Header>
      <Card.Body role='list'>
        {data.map((item) => renderItem(item, keyExtractor(item)))}
      </Card.Body>
      <Card.Footer>
        <Link to={path}>
          <Box fontSize={2} color='base400' role='button'>
            View More
          </Box>
        </Link>
      </Card.Footer>
    </Card>
  );
}

AsideCard.displayName = 'AsideCard';

export default AsideCard;
