import { Button, Container, Text } from '@holdr-ui/react';
import { DateProps } from '../types';
import _ from 'lodash';

function Date({ date, initialDate, onClick, disabled }: DateProps) {
  return (
    <Container centerContent style={{ padding: 0 }}>
      <Button
        size='sm'
        onClick={onClick}
        radius={3}
        style={{ padding: '16px 4px', width: '28px' }}
        {...(!_.isEqual(initialDate, date) && {
          disabled: disabled,
          variant: 'ghost',
        })}
      >
        <Text weight={400}>{date.day}</Text>
      </Button>
    </Container>
  );
}

Date.displayName = 'Date';

export default Date;
