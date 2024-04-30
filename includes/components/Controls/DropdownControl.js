import { __ } from '@wordpress/i18n';
import { useDispatch } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { useMemo } from '@wordpress/element';

import { Button, Dropdown as WPDropdown } from '@wordpress/components';

import Required from './utils/Required';
import ErrorMessage from './utils/ErrorMessage';

const DropdownControl = ( {
	onChangeCallback,
	value,
	defaultText,
	renderContentCallback,
	controlName,
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
				<p>
					<b className="settings__title">
						{ __( `${ controlName }`, 'atb' ) }
						<Required required={ required } />:
					</b>
				</p>
			) : null }
			<WPDropdown
				contentClassName="dropwdown__content"
				renderToggle={ ( { isOpen, onToggle } ) => (
					<Button
						variant="secondary"
						onClick={ onToggle }
						aria-expanded={ isOpen }
						value={ value }
						onChange={ onChangeCallback }
					>
						{ value
							? value
							: `${ __( `${ defaultText }`, 'atb' ) }` }
					</Button>
				) }
				renderContent={ renderContentCallback }
				style={ { marginBottom: '0.8rem' } }
				{ ...props }
			/>
			<ErrorMessage error={ error } />
		</div>
	);
};

export default DropdownControl;
