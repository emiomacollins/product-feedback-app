import { Color } from '../../../types/colors';

interface Props {
	color?: Color;
	className?: string;
}

export default function ArrowDownIcon({ color = 'white', className }: Props) {
	return (
		<svg
			width='10'
			height='7'
			xmlns='http://www.w3.org/2000/svg'
			className={className}
			style={{
				minWidth: 'max-content',
			}}
		>
			<path
				d='M1 1l4 4 4-4'
				stroke={`var(--${color})`}
				strokeWidth='2'
				fill='none'
				fillRule='evenodd'
			/>
		</svg>
	);
}
