import { MotionDot } from 'shared';
import { useSliderContext } from '../contexts';

export default function IndicatorDot({ idx }: { idx: number }) {
  const { current, setCurrent, loading } = useSliderContext();
  return (
    <MotionDot
      zIndex={10}
      key={idx}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => {
        if (!loading) setCurrent(idx);
      }}
      bgColor={current === idx ? 'base100' : 'base200'}
      size='0.65rem'
    />
  );
}
