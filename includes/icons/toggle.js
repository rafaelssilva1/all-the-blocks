const Toggle = ( { hide, ...props } ) => {
	return (
		<svg
			width="12"
			height="12"
			viewBox="0 0 12 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="toggle"
			{ ...props }
		>
			<path d="M1 6L11 6" stroke="currentColor" stroke-linecap="round" />
			<path
				className={ `toggle__path ${ hide ? 'hide' : '' }` }
				d="M6 11L6 1"
				stroke="currentColor"
				stroke-linecap="round"
			/>
		</svg>
	);
};

export default Toggle;
