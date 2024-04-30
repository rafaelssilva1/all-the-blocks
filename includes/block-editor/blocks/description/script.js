import handleAccordion from '../../../utils/handleAccordion';

document.addEventListener( 'DOMContentLoaded', () => {
	const accordion = document.querySelector( '.description__accordion' );

	accordion && handleAccordion( { accordion } );
} );
