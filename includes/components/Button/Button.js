const CustomButton = ( {
	isButton = true,
	href,
	content,
	variant,
	className,
	...props
} ) => {
	return isButton ? (
		<button
			className={ `${ className } custom-button custom-button-${ variant }` }
			{ ...props }
		>
			{ content }
		</button>
	) : (
		<a
			className={ `custom-button custom-button-${ variant }` }
			href={ href }
			{ ...props }
		>
			{ content }
		</a>
	);
};

export default CustomButton;
