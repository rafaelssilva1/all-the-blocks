import { __ } from '@wordpress/i18n';
import { useEntityRecords } from '@wordpress/core-data';
import { useBlockProps } from '@wordpress/block-editor';

import { useDispatch } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { store as noticesStore } from '@wordpress/notices';
import { useEffect, useMemo, useState } from '@wordpress/element';
import { Spinner } from '@wordpress/components';

import Controls from './controls/controls';
import ArrowAlt from '../../../icons/arrow-alt';

import './editor.scss';
import Image from '../../../components/Image/Image';

export const MAX_PRODUCTS_TO_DISPLAY = 2;

const Edit = ( props ) => {
	const blockProps = useBlockProps( {
		className: 'products max-width',
	} );

	const [ slidesError, setSlidesError ] = useState( false );

	const { attributes, setAttributes, clientId } = props;
	const { data, title } = attributes;

	const services = useEntityRecords( 'postType', 'services', {
		per_page: -1,
		acf_format: 'standard',
		_embed: 'true',
	} );
	const { hasResolved, records } = services;

	const { lockPostSaving, unlockPostSaving } = useDispatch( editorStore );
	const { createWarningNotice, removeAllNotices } = useDispatch(
		noticesStore
	);

	useEffect( () => {
		if ( slidesError || ! data ) {
			lockPostSaving();
		} else {
			unlockPostSaving();
		}
	}, [ data, slidesError ] );

	useMemo( () => {
		data &&
			data.forEach( ( { media, name } ) => {
				if ( ! media.url ) {
					createWarningNotice(
						__(
							`The product "${ name }" is missing an image. Please add in the services listing or add one manually.`,
							'atb'
						),
						{
							type: 'snackbar',
							explicitDismiss: true,
						}
					);
				} else {
					setSlidesError( false );
					removeAllNotices( 'snackbar' );
				}
			} );
	}, [ data ] );

	return (
		<>
			<Controls
				data={ data }
				attributes={ attributes }
				setAttributes={ setAttributes }
				services={ records }
			/>
			<div { ...blockProps }>
				{ hasResolved ? (
					<>
						<h2 className="products__title">{ title }</h2>
						<div className="products__items">
							{ data.map( ( { media, name, link }, index ) => {
								return media && name ? (
									<a
										href={ link }
										className="products__items--item"
										key={ `products-${ clientId }-${ index }` }
									>
										<div className="products__items--item-overlay"></div>
										<Image
											className="products__items--item-image"
											src={ media.url }
											alt={ media.alt }
											width={ media.width }
											height={ media.height }
										/>
										<h3 className="products__items--item-title">
											{ name }
										</h3>
									</a>
								) : null;
							} ) }
						</div>
						<ArrowAlt className="products__arrow" />
					</>
				) : (
					<Spinner />
				) }
			</div>
		</>
	);
};

export default Edit;
