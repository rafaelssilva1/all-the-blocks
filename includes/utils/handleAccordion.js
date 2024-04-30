const handleAccordion = ( { accordion } ) => {
	const items = accordion.querySelectorAll( '.description__accordion--item' );

	items.forEach( ( accordionItem ) => {
		accordionItem.addEventListener( 'click', () => {
			const sign = accordionItem.querySelector( '.toggle .toggle__path' );
			const answer = accordionItem.querySelector(
				'.description__accordion--item-answer'
			);

			const isOpen = [ ...sign.classList ].includes( 'hide' );
			if ( isOpen ) {
				sign.classList.remove( 'hide' );
				answer.classList.remove( 'show' );
			} else {
				items.forEach( ( el ) => {
					const aSign = el.querySelector( '.toggle .toggle__path' );
					const aAnswer = el.querySelector(
						'.description__accordion--item-answer'
					);

					aSign.classList.remove( 'hide' );
					aAnswer.classList.remove( 'show' );
				} );

				sign.classList.add( 'hide' );
				answer.classList.add( 'show' );
			}
		} );
	} );
};

export default handleAccordion;
