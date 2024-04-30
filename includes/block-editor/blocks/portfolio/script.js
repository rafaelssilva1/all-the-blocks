import handleModal from '../../../utils/handleModal';

document.addEventListener( 'DOMContentLoaded', () => {
	const portfolio = document.querySelector( '.portfolio' );
	portfolio &&
		handleModal( {
			data: portfolio,
			open: '.portfolio__items--item',
			type: 'portfolio',
		} );
} );
