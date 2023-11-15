import { MotionDot } from 'shared';

export function IndicatorDot(
  active: boolean,
  idx: number,
  setCurrent: (curr: number) => void,
) {
  return (
    <MotionDot
      key={idx}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setCurrent(idx)}
      bgColor={active ? 'base100' : 'base200'}
      size='0.65rem'
    />
  );
}
