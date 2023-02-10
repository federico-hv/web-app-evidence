import { StyledIncrementer } from './incrementer.style';
import { useCounter } from 'hooks';

export function Incrementer() {
  const { count, increment, decrement } = useCounter();
  return (
    <StyledIncrementer role='group'>
      <button type='button' className='button' onClick={decrement}>
        -
      </button>
      <span role='textbox' className='label'>
        {count}
      </span>
      <button type='button' className='button' onClick={increment}>
        +
      </button>
    </StyledIncrementer>
  );
}
