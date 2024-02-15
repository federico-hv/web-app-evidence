import { Meta, StoryObj } from '@storybook/react';
import LiveTag from '../index';

const meta: Meta<typeof LiveTag> = {
  component: LiveTag,
  title: 'Components/LiveTag',
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof LiveTag>;

export const Usage: Story = {
  name: 'Usage',
  render: () => <LiveTag />,
};
