import Image from 'next/image';
import { ButtonHTMLAttributes, useState } from 'react';
import styled, { css } from 'styled-components';
import ArrowDownIcon from '../assets/svgs/custom/ArrowDownIcon';
import checkIconPath from '../assets/svgs/icon-check.svg';
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
	initialValue?: DropdownOption;
	setValue?: (value: any) => any;
}

export default function Dropdown(props: DropdownProps) {
	const { label, options, setValue, initialValue, ...restProps } = props;
	const { ref, expanded, toggle, setExpanded } = useToggleWithClickAway();
	const [selected, setSelected] = useState(initialValue || options[0]);

	function handleSetOption(option: DropdownOption) {
		const { value } = option;
		setValue?.(value);
		setSelected(option);
		setExpanded(false);
	}

	return (
		<Container ref={ref}>
			<Toggle onClick={toggle} expanded={expanded} {...restProps}>
				<p>
					{label ? `${label}:` : ''} <Bold>{selected.label}</Bold>
				</p>
				<StyledArrowIcon expanded={expanded} />
			</Toggle>

			<Options expanded={expanded}>
				{options.map((option) => {
					const { label, value } = option;
					return (
						<Option
							key={label}
							onClick={() => handleSetOption(option)}
							type='button'
							// make un-focusable when dropdown is not expanded
							{...(expanded ? {} : { tabIndex: -1 })}
						>
							{label}
							<CheckIcon visible={value === selected.value}>
								<Image src={checkIconPath} alt='' />
							</CheckIcon>
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
	padding: 1.2rem 2rem;
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
	visible: boolean;
}

const CheckIcon = styled.div<CheckIconProps>`
	transition: all 0.2s;
	opacity: ${(p) => (p.visible ? 1 : 0)};
`;
