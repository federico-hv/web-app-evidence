import { Fragment } from 'react';
import {
  SwitchConditionalCaseProps,
  SwitchConditionalProps,
} from './types';
import { getSubComponent } from '../../index';

//TODO deprecate

/* NOTE: DOES NOT WORK AS INTENDED */

// Supposed to switch between components based on some case. Will redo this (FUCK)
// Might deprecate it, though.

function SwitchConditional({ children }: SwitchConditionalProps) {
  const SwitchConditionalCases = getSubComponent<'SwitchConditionalCase'>(
    children,
    'SwitchConditionalCase',
  );
  return <>{SwitchConditionalCases}</>;
}
SwitchConditional.displayName = 'SwitchConditional';

const SwitchConditionalCase = ({
  children,
  on,
}: SwitchConditionalCaseProps) => {
  return (
    <Fragment>
      {on ? <Fragment>{children}</Fragment> : <Fragment />}
    </Fragment>
  );
};
SwitchConditionalCase.displayName = 'SwitchConditionalCase';

SwitchConditional.Case = SwitchConditionalCase;

export { SwitchConditionalCase };
export default SwitchConditional;
