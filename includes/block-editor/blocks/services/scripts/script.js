const handleSlideshow = ( { slideshow } ) => {
	const dots = slideshow
		.querySelector( '.services-slideshow__controls' )
		.querySelectorAll( 'svg' );
	const container = slideshow.querySelector(
		'.services-slideshow__container'
	);

	dots.forEach( ( dot ) => {
		dot.addEventListener( 'click', () => {
			const position = dot.getAttribute( 'data-slide' );
			container.style.transform = `translateX(-${ position * 100 }%)`;
			const ellipse = dot.querySelector( 'ellipse' );
			dots.forEach( ( el ) => {
				el.querySelector( 'ellipse' ).style.fill = '#9B9B9B';
			} );
			ellipse.style.fill = '#363636D6';
		} );
	} );
};

export default handleSlideshow;
