import { Card, CardBody, CardFooter, CardHeader } from '@holdr-ui/react';
import { MembershipCardProps } from './types';

function MembershipCard({}: MembershipCardProps) {
  return (
    <Card minWidth='288px' h='288px'>
      <CardHeader></CardHeader>
      <CardBody flex={1} bgColor='white200'></CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
}
MembershipCard.displayName = 'MembershipCard';

export default MembershipCard;
