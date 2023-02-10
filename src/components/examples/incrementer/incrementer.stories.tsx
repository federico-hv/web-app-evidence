import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Incrementer } from './index';

export default {
  title: 'Incrementer',
  component: Incrementer,
} as ComponentMeta<typeof Incrementer>;

export const Primary: ComponentStory<typeof Incrementer> = () => (
  <Incrementer />
);
Primary.storyName = 'Base Usage';
