import { GraphQLErrors } from '@apollo/client/errors';

// checks if the given errors are an Auth error
// TODO: check if other extension codes could be present in cases
//       where refreshing the token is required (EXPIRED ?)
export function isAuthError(errors: GraphQLErrors | undefined): boolean {
  return (
    errors != undefined &&
    errors.reduce(
      (acc, err) => acc || err.extensions.code === 'UNAUTHENTICATED',
      false,
    )
  );
}
