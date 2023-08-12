import React, { ReactNode, ReactElement } from 'react';

/**
 * Returns an array containing all the nodes
 * that match the display name.
 * @param children the children of the element
 * @param displayName the display name of interest
 */
export function getSubComponent<T>(children: ReactNode, displayName: T) {
  return React.Children.map(children, (child: any) => {
    if (!child) return null;
    if (child.type === undefined) return null;
    if (!child.type && !child.type.displayName) return null;
    return child.type.displayName === displayName
      ? (child as ReactElement)
      : null;
  });
}
