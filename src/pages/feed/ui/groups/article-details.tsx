import { ArticleModel } from '../../../../features';
import {
  Button,
  Card,
  Heading,
  Image,
  Text,
  VStack,
} from '@holdr-ui/react';
import { Link } from 'react-router-dom';

function ArticleDetails({ data }: { data: ArticleModel }) {
  return (
    <Card boxShadow='none' radius={0}>
      <Card.Body>
        <Image
          radius={4}
          alt={data.title}
          src={data.imageUrl}
          w='100%'
          h={{ '@bp1': 250, '@bp3': 400 }}
        />
      </Card.Body>
      <Card.Footer pt={4} pb={2} gap={4}>
        <VStack>
          <Link to={`https://${data.source.url}`} target='_blank'>
            <Heading color='base400' size={{ '@bp1': 2, '@bp3': 3 }}>
              {data.source.name}
            </Heading>
          </Link>
          <Heading as='h2' weight={500} size={{ '@bp1': 3, '@bp3': 4 }}>
            {data.title}
          </Heading>
        </VStack>
        <Text
          size={{ '@bp1': 2, '@bp3': 3 }}
          title={data.description}
          noOfLines={2}
        >
          {data.description}
        </Text>
        <Link to={data.url} target='_blank'>
          <Button>Read More</Button>
        </Link>
      </Card.Footer>
    </Card>
  );
}
ArticleDetails.displayName = 'ArticleDetails';

export default ArticleDetails;
