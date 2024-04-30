import { __ } from '@wordpress/i18n';

const ErrorMessage = ( { error, addMargin = true } ) => {
	return error ? (
		<p
			className="required"
			style={ { marginBlock: addMargin ? '-0.8rem 0.8rem' : '' } }
		>
			{ __( 'Mandatory field!', 'atb' ) }
		</p>
	) : null;
};

export default ErrorMessage;
