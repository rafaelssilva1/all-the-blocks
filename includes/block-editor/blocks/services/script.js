import handleSlideshow from './scripts/script';

document.addEventListener( 'DOMContentLoaded', () => {
	const slideshow = document.querySelector( '.services-slideshow' );

	slideshow && handleSlideshow( { slideshow } );
} );
