const Image = ( { src, alt, width, height, loading = 'lazy', ...props } ) => {
	if ( ! src ) return null;

	return (
		<img
			src={ src }
			alt={ alt }
			width={ width }
			height={ height }
			loading={ loading }
			{ ...props }
		/>
	);
};

export default Image;
