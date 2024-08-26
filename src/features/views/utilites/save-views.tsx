import { DocumentNode, useMutation } from '@apollo/client';
import { useEffect, useRef } from 'react';

function SaveViews<T = any, U = any>({
  mutation,
  args,
}: {
  mutation: DocumentNode;
  query?: DocumentNode;
  name: string;
  args: U;
}) {
  const hasSaved = useRef(false);
  const [mutate] = useMutation<T, U>(mutation);

  const save = async () => {
    return await mutate({
      variables: args,
    });
  };

  useEffect(() => {
    // TODO: Use set timeout to figure out how long
    //   a user has been on a page before saving
    //   a page view.

    if (!hasSaved.current) {
      save();
      hasSaved.current = true;
    }
  }, []);

  return null;
}

export default SaveViews;
