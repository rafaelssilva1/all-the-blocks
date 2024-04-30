import { __ } from '@wordpress/i18n';
import { useDispatch } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { useMemo } from '@wordpress/element';

import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

import Required from './utils/Required';
import ErrorMessage from './utils/ErrorMessage';
import Image from '../Image/Image';

const MediaControl = ( {
	controlName,
	previewText,
	selectText,
	value,
	callback,
	allowedTypes,
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
			{ value.url ? (
				<>
					<b className="settings__title">{ `${ __(
						`${ previewText }`,
						'atb'
					) }:` }</b>
					<Image
						src={ value.url }
						alt={ value.alt }
						className="settings__wrapper"
						width={ value.width }
						height={ value.height }
					/>
					<p>
						<b>{ __( 'Filename', 'atb' ) }</b>
						{ `: ${ value.filename }` }
					</p>
				</>
			) : (
				<b className="settings__title">{ `${ __(
					`${ selectText }`,
					'atb'
				) }:` }</b>
			) }
			<MediaUploadCheck>
				{ controlName ? (
					<b className="settings__title">
						{ __( `${ controlName }`, 'atb' ) }
						<Required required={ required } />:
					</b>
				) : null }
				<MediaUpload
					onSelect={ callback }
					allowedTypes={ allowedTypes }
					value={ value ? value.url : '' }
					render={ ( { open } ) => (
						<Button variant="secondary" onClick={ open }>
							{ __( 'Open Media Library', 'atb' ) }
						</Button>
					) }
					{ ...props }
				/>
			</MediaUploadCheck>
			<ErrorMessage error={ error } addMargin={ false } />
		</div>
	);
};

export default MediaControl;
