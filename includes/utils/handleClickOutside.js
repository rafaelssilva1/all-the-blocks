const handleClickOutside = ( {
	ref,
	open,
	close,
	handleClose,
	handleOpen,
} ) => {
	document.addEventListener( 'click', ( e ) => {
		e.stopPropagation();
		if ( ! ref.contains( e.target ) ) {
			if ( e.target.closest( open ) ) {
				handleOpen();
			} else {
				handleClose();
			}
		}
	} );
};

export default handleClickOutside;
