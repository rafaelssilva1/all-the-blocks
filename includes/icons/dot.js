const Dot = ( { fill, ...props } ) => {
	return (
		<svg
			width="6"
			height="6"
			viewBox="0 0 6 6"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{ ...props }
		>
			<ellipse cx="2.91176" cy="3" rx="2.91176" ry="3" fill={ fill } />
		</svg>
	);
};

export default Dot;
