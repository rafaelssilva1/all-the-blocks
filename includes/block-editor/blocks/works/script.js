import handleModal from '../../../utils/handleModal';
import handleViewMore from '../../../utils/handleViewMore';

document.addEventListener( 'DOMContentLoaded', () => {
	const works = document.querySelector( '.works' );
	const showMoreBtn = works.querySelector( '.works__button' );

	const handleModalArgs = {
		data: works,
		open: '.works__items--item',
		type: 'works',
	};

	works && handleModal( handleModalArgs );
	works &&
		showMoreBtn &&
		handleViewMore( { showMoreBtn, handleModalArgs, data: works } );
} );
