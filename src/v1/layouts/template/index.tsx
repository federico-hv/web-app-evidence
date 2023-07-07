import React from 'react';
import { ComponentType } from './component.type';
import { StyledComponent } from './component.style';

export function Component(props: ComponentType) {
  return <StyledComponent role='textbox'>{props.text}</StyledComponent>;
}
