import { Box, Button, Container, Text } from '@holdr-ui/react';
import { DateProps } from '../types';
import _ from 'lodash';
import { css } from 'configs';

const baseStyle = css({
  alignContent: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '35px',
  width: '31px',
  fontWeight: '$400',
  margin: 'auto',
  fontSize: '50px',
});

function Date({ date, initialDate, onClick, disabled }: DateProps) {
  let props = {};

  const disabledProps = {
    css: {
      color: 'gray',
      cursor: 'default'
    },
  };

  const selectedProps = {
    css: {
      backgroundColor: '$base800',
      color: '$base100',
    },
    _hover: {
      backgroundColor: '$base500',
    },
  };

  const baseProps = {
    _hover: {
      backgroundColor: '$base200',
    },
  };

  props = disabled
    ? { ...props, ...disabledProps }
    : { ...props, ...baseProps };

  if (_.isEqual(date, initialDate)) props = { ...props, ...selectedProps };

  return (
    <Box {...props} onClick={onClick} radius={3} className={baseStyle()}>
      {date.day}
    </Box>
  );
}

Date.displayName = 'Date';

export default Date;
