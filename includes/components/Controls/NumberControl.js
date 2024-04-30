import { __ } from '@wordpress/i18n';
import { useDispatch } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { useMemo } from '@wordpress/element';

import { __experimentalNumberControl as WPNumberControl } from '@wordpress/components';

import Required from './utils/Required';
import ErrorMessage from './utils/ErrorMessage';

const NumberControl = ( {
	controlName,
	value,
	callback,
	required = false,
	...props
} ) => {
	const { lockPostSaving, unlockPostSaving } = useDispatch( editorStore );

	const error = required && ! value;

	useMemo( () => ( error ? lockPostSaving() : unlockPostSaving() ), [
		value,
	] );

	return (
		<div>
			{ controlName ? (
				<b className="settings__title">
					{ __( `${ controlName }`, 'atb' ) }
					<Required required={ required } />:
				</b>
			) : null }
			<WPNumberControl
				value={ value }
				onChange={ callback }
				className={ error ? 'mandatory-field-error' : '' }
				{ ...props }
			/>
			<ErrorMessage error={ error } />
		</div>
	);
};

export default NumberControl;
