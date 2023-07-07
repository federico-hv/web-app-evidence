import { Fragment } from 'react';
import { getSubComponent } from '../../../utilities';
import {
  SwitchConditionalCaseProps,
  SwitchConditionalProps,
} from './types';

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
