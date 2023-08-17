import { TextGroup, TextGroupSubheading } from '../../../shared';
import millify from 'millify';

function Statistic({ value, label }: { value: number; label: string }) {
  return (
    <TextGroup
      direction='horizontal'
      gap={{ '@bp1': 1, '@bp3': 2 }}
      flex={0}
      items='flex-end'
    >
      <TextGroupSubheading size={{ '@bp1': 2, '@bp3': 3 }} weight={500}>
        {millify(value)}
      </TextGroupSubheading>
      <TextGroupSubheading size={{ '@bp1': 2, '@bp3': 3 }} color='base400'>
        {label}
      </TextGroupSubheading>
    </TextGroup>
  );
}
Statistic.displayName = 'Statistic';

export default Statistic;
