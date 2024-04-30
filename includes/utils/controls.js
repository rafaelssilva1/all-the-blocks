export const handleAddSlide = ( { data, template, setAttributes } ) => {
	const availableSlides = [ ...data ];
	availableSlides.push( template );

	setAttributes( { data: availableSlides } );
};

export const handleDeleteSlide = ( { data, index, setAttributes } ) => {
	const availableSlides = [ ...data ];
	availableSlides.splice( index, 1 );

	setAttributes( { data: availableSlides } );
};

export const handleEdit = ( { data, content, index, attr, setAttributes } ) => {
	const availableSlides = [ ...data ];
	const currentSlide = availableSlides[ index ];

	currentSlide[ attr ] = content;

	setAttributes( { data: availableSlides } );
};

export const handleReorder = ( { data, index, action, setAttributes } ) => {
	const availableSlides = [ ...data ];
	const slideToReorder = availableSlides[ index ];

	availableSlides.splice( index, 1 );
	if ( action === 'up' ) {
		availableSlides.splice( index - 1, 0, slideToReorder );
	}
	if ( action === 'down' ) {
		availableSlides.splice( index + 1, 0, slideToReorder );
	}

	setAttributes( { data: availableSlides } );
};
