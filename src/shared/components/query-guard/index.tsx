import { DocumentNode, OperationVariables, useQuery } from "@apollo/client";
import { Fragment, ReactElement } from "react";
import { GenericProps } from "@holdr-ui/react";

function QueryGuard<
  T extends { [key: string]: boolean },
  U extends OperationVariables,
>({
    query,
    args,
    name,
    children,
    fallback = <Fragment />,
  }: GenericProps & {
  name: string;
  query: DocumentNode;
  args: U;
  fallback?: ReactElement;
}) {
  const { data, error } = useQuery<T, U>(query, {
    variables: args,
  });

  if (error) {
    console.error(error);
    return fallback;
  }

  return <Fragment>{data && data[name] && <>{children}</>}</Fragment>;
}