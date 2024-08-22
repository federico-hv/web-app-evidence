// Password strength checker https://www.npmjs.com/package/check-password-strength

import { PasswordErrors } from '../../types';
import { hasAllBooleanKeys, passwordValidation } from '../../utilities';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import AppearingContent from '../appearing-content';
import { Grid, GridItem } from '@holdr-ui/react';
import ErrorItem from '../error-item';
import { FieldLengths } from '../../constants';

function PasswordErrorChecker({
  value,
  update,
}: {
  value: string;
  update?: (errors: PasswordErrors) => void;
}) {
  const errors = passwordValidation(value);

  useEffect(() => {
    if (update) update(errors);
  }, [value]);

  return (
    <AnimatePresence>
      {hasAllBooleanKeys(errors, true) && (
        <AppearingContent>
          <Grid mt={2} gap={4} templateColumns='repeat(2, 1fr)'>
            <GridItem>
              <ErrorItem
                hasError={value.length > 0 ? errors.capital : undefined}
                text='One capital letter'
              />
              <ErrorItem
                hasError={value.length > 0 ? errors.special : undefined}
                text='One special character'
              />
              <ErrorItem
                hasError={value.length > 0 ? errors.length : undefined}
                text={`${FieldLengths.password.min} characters long`}
              />
            </GridItem>
            <GridItem>
              <ErrorItem
                hasError={value.length > 0 ? errors.lowercase : undefined}
                text='One lower case letter'
              />
              <ErrorItem
                hasError={value.length > 0 ? errors.number : undefined}
                text='One digit'
              />
            </GridItem>
          </Grid>
        </AppearingContent>
      )}
    </AnimatePresence>
  );
}

export default PasswordErrorChecker;
