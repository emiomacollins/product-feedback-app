import { Color } from '../../../types/colors';

interface Props {
	color?: Color;
}

export default function CheckIcon({ color, ...props }: Props) {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' width='13' height='11' {...props}>
			<path
				fill='none'
				stroke={`var(--${color || 'purple'})`}
				strokeWidth='2'
				d='M1 5.233L4.522 9 12 1'
			/>
		</svg>
	);
}
