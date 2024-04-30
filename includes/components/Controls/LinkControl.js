import { __ } from '@wordpress/i18n';
import { useDispatch } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { useMemo } from '@wordpress/element';

import { __experimentalLinkControl as WPLinkControl } from '@wordpress/block-editor';

import Required from './utils/Required';
import ErrorMessage from './utils/ErrorMessage';

const LinkControl = ( {
	controlName,
	value,
	callback,
	key,
	required = false,
	...props
} ) => {
	const { lockPostSaving, unlockPostSaving } = useDispatch( editorStore );

	const error = required && ! value.url;

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
			<WPLinkControl
				value={ value }
				onChange={ callback }
				key={ key }
				className={ error ? 'mandatory-field-error' : '' } // currently not working
				{ ...props }
			/>
			<ErrorMessage error={ error } />
		</div>
	);
};

export default LinkControl;
