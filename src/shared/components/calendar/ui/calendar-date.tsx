import { Button, Container } from '@holdr-ui/react';
import { DateProps } from '../types/useDate-types';
import _ from 'lodash';

function Date({ date, currentDate, onClick, disabled }: DateProps) {
  return (
    <Container centerContent style={{ padding: 0 }}>
      {_.isEqual(currentDate, date) ? (
        <Button size='sm' onClick={onClick}>
          {date.day}
        </Button>
      ) : (
        <Button
          variant='ghost'
          size='sm'
          onClick={onClick}
          disabled={disabled}
        >
          {date.day}
        </Button>
      )}
    </Container>
  );
}

Date.displayName = 'Date';

export default Date;
