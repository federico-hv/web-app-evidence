import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Component } from '.';

export default {
  title: 'Component',
  component: Component,
} as ComponentMeta<typeof Component>;

export const Primary: ComponentStory<typeof Component> = () => (
  <Component text='This is a template' />
);
Primary.storyName = 'Base Usage';
