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

/**
 * Returns an array containing all the child nodes excluding the ones
 * that have the display names in the exclusion list.
 * @param children
 * @param exclusionList
 */
export function getSubComponentExcluding<T>(
  children: ReactNode,
  exclusionList: T[],
) {
  return React.Children.map(children, (child: any) => {
    if (!child) return null;
    if (child.type === undefined || !child.type || !child.type.displayName)
      return child;

    return !exclusionList.includes(child.type.displayName)
      ? (child as ReactElement)
      : null;
  });
}
