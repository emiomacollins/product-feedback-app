import { UseQueryResult } from 'react-query';
import Spinner from './styled-components/Spinner';

interface Props<T> {
	query: UseQueryResult<T>;
	children: (data: T) => JSX.Element;
	ErrorComponent?: JSX.Element;
}

export default function LoadQuery<T>({ query, children, ErrorComponent }: Props<T>) {
	const { isLoading, data, error } = query;

	if (isLoading) return <Spinner />;

	if (error instanceof Error) return ErrorComponent || <p>{error.message}</p>;

	return children(data as T);
}
