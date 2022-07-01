import { UseQueryResult } from 'react-query';
import Spinner from './styled-components/Spinner';

interface Props {
	query: UseQueryResult;
	children: (data: any) => JSX.Element;
	ErrorComponent?: JSX.Element;
}

export default function LoadQuery({ query, children, ErrorComponent }: Props) {
	const { isLoading, data, error } = query as UseQueryResult<unknown, Error>;

	if (isLoading) return <Spinner />;

	if (error) return ErrorComponent || <p>{error.message}</p>;

	return children(data);
}
