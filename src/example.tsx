import { Box } from '@holdr-ui/react';
import { useEffect, useState } from 'react';

function Example() {
  const [state, set] = useState('');

  useEffect(() => {
    window.focus();
    set('hi');
  }, []);

  return <Box>example</Box>;
}
