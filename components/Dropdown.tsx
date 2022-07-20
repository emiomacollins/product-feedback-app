import { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import ArrowDownIcon from '../assets/svgs/custom/ArrowDownIcon';
import CheckIcon from '../assets/svgs/custom/CheckIcon';
import useToggleWithClickAway from '../hooks/useToggleWithClickAway';
import { Bold } from './styled-components/Bold';
import { flexStyles } from './styled-components/Flex';

export interface DropdownOption {
	label: string;
	value: unknown;
}

export interface DropdownProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	label?: string;
	options: DropdownOption[];
	selected: DropdownOption;
	setValue: (value: any) => any;
}

export default function Dropdown(props: DropdownProps) {
	const { label, options, setValue, selected, ...restProps } = props;
	const { ref, expanded, toggle, setExpanded } = useToggleWithClickAway();
	const canFocus = expanded ? {} : { tabIndex: -1 };

	function handleSetValue(value: any) {
		setValue?.(value);
		setExpanded(false);
	}

	return (
		<Container ref={ref}>
			<Toggle onClick={toggle} expanded={expanded} {...restProps}>
				{label ? (
					<p>
						<span>{label}: </span>
						<Bold>{selected.label}</Bold>
					</p>
				) : (
					<p>{selected.label}</p>
				)}
				<StyledArrowIcon expanded={expanded} />
			</Toggle>

			<Options expanded={expanded}>
				{options.map((option) => {
					const { label, value } = option;
					return (
						<Option
							key={label}
							onClick={() => handleSetValue(value)}
							type='button'
							{...canFocus}
						>
							{label}
							<StyledCheckIcon $visible={value === selected.value} />
						</Option>
					);
				})}
			</Options>
		</Container>
	);
}

interface ExpandedProps {
	expanded: boolean;
}

const Container = styled.div`
	position: relative;
	display: grid;
`;

const Toggle = styled.button<ExpandedProps>`
	${flexStyles}
	color: var(--white);
	padding-block: 1rem;
	justify-content: space-between;

	${(p) =>
		p.expanded &&
		css`
			opacity: 0.8;
		`}
`;

const StyledArrowIcon = styled(ArrowDownIcon)<ExpandedProps>`
	transform: rotate(${(p) => (p.expanded ? 180 : 0)}deg);
	transition: all 0.2s;
`;

const Options = styled.div<ExpandedProps>`
	display: grid;
	box-shadow: var(--shadow-400);
	background: var(--white);
	position: absolute;
	top: calc(100% + 2rem);
	left: 0;
	min-width: 100%;
	overflow: hidden;
	border-radius: var(--radius-400);
	transform: scale(0);
	pointer-events: none;
	opacity: 0;
	transition: transform 0.2s, opacity 0.1s;
	z-index: 99;

	${(p) =>
		p.expanded &&
		css`
			transform: scale(1);
			opacity: 1;
			pointer-events: visible;
		`}
`;

const Option = styled.button`
	${flexStyles}
	gap: 4rem;
	justify-content: space-between;
	padding: 1.3rem 2.5rem;
	color: var(--gray);
	text-align: left;
	min-width: max-content;
	transition: all 0.1s;

	&:hover,
	&:focus {
		color: var(--purple);
		outline: 0;
	}

	:not(:last-child) {
		border-bottom: 1px solid var(--black-transparent-100);
	}
`;

interface CheckIconProps {
	$visible: boolean;
}

const StyledCheckIcon = styled(CheckIcon)<CheckIconProps>`
	transition: all 0.2s;
	opacity: ${(p) => (p.$visible ? 1 : 0)};
`;
