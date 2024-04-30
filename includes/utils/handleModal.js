import handleClickOutside from '../utils/handleClickOutside';

const handleModal = ( { data, open, type } ) => {
	const modalWrapper = data.querySelector( '.modal__wrapper' );
	const cards = data.querySelectorAll( `.${ type }__items--item` );
	const modal = data.querySelector( '.modal' );
	const images = data.querySelector( '.modal__slideshow--images' );
	const controls = data.querySelector( '.modal__slideshow--controls' );
	const controlLeft = controls.querySelector( '.slideshow-left' );
	const controlRight = controls.querySelector( '.slideshow-right' );
	const html = document.querySelector( 'html' );

	let imageCount = 0;
	let currentImage = 1;

	const handleOpen = () => {
		modal.classList.add( 'show' );
		html.style.overflow = 'hidden';
	};
	const handleClose = () => {
		modal.classList.remove( 'show' );
		html.style.overflow = 'initial';
	};

	const handleReset = () => {
		currentImage = 1;
		imageCount = 0;
		images.style.transform = `translate(0%)`;
	};

	const handleRightClick = () => {
		if ( currentImage === imageCount ) {
			images.style.transform = `translate(0%)`;
			currentImage = 1;
		} else {
			images.style.transform = `translate(-${ currentImage * 100 }%)`;
			currentImage++;
		}
	};

	const handleLeftClick = () => {
		if ( currentImage === 1 ) {
			currentImage = imageCount;
			images.style.transform = `translate(-${
				( imageCount - 1 ) * 100
			}%)`;
		} else {
			currentImage--;
			images.style.transform = `translate(-${
				( currentImage - 1 ) * 100
			}%)`;
		}
	};

	controlRight.addEventListener( 'click', () => {
		handleRightClick();
	} );
	controlLeft.addEventListener( 'click', () => {
		handleLeftClick();
	} );

	cards.forEach( ( card ) => {
		card.addEventListener( 'click', () => {
			handleReset();
			handleOpen();

			const titleEl = modal.querySelector( '.modal__title' );
			const descriptionEl = modal.querySelector( '.modal__description' );
			const imagesEl = modal.querySelector( '.modal__slideshow--images' );

			const titleContent = card.getAttribute( 'data-title' );
			const descriptionContent = card.getAttribute( 'data-description' );
			const imagesContent = JSON.parse(
				card.getAttribute( 'data-images' )
			);

			let imagesToRender = '';
			imagesContent.forEach( ( img ) => {
				if ( img.url ) {
					imagesToRender += `<img src="${ img.url }" alt="${ img.alt }" />`;
					imageCount++;
				}
			} );

			titleEl.textContent = titleContent;
			descriptionEl.textContent = descriptionContent;
			imagesEl.innerHTML = imagesToRender;
			if ( imageCount < 2 ) {
				controls.classList.add( 'hide' );
			} else {
				controls.classList.remove( 'hide' );
			}
		} );
	} );

	const close = data.querySelector( '.modal__close' );
	close.addEventListener( 'click', () => {
		handleClose();
	} );

	handleClickOutside( {
		ref: modalWrapper,
		open,
		close: '.modal__close',
		handleClose,
		handleOpen,
	} );

	document.addEventListener( 'keyup', ( { key } ) => {
		if ( key === 'Escape' ) handleClose();
	} );
};

export default handleModal;
