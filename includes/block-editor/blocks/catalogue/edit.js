import { __ } from '@wordpress/i18n';
import { useState, useEffect, useMemo } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';

import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';

import Controls from './controls/controls';
import Image from '../../../components/Image/Image';

import Download from '../../../icons/download';

export const MAX_CATALOGUES_TO_DISPLAY = 4;

const Edit = ( props ) => {
	const blockProps = useBlockProps( {
		className: 'catalogue max-width',
	} );

	const { attributes, setAttributes, clientId } = props;
	const { data, title, description } = attributes;

	const [ slidesError, setSlidesError ] = useState( false );

	const { lockPostSaving, unlockPostSaving } = useDispatch( editorStore );

	useEffect( () => {
		if ( slidesError || ! data ) {
			lockPostSaving();
		} else {
			unlockPostSaving();
		}
	}, [ data, slidesError ] );

	useMemo( () => {
		if ( ! title || ! description ) {
			setSlidesError( true );
			return;
		} else {
			setSlidesError( false );
		}
		data &&
			data.forEach( ( { media, file, name } ) => {
				if ( ! media || ! file || ! name ) {
					setSlidesError( true );
				} else {
					setSlidesError( false );
				}
			} );
	}, [ data ] );

	return (
		<>
			<Controls
				data={ data }
				setAttributes={ setAttributes }
				attributes={ attributes }
			/>
			<div { ...blockProps }>
				<h2 className="catalogue__title">{ title }</h2>
				<h3 className="catalogue__description">{ description }</h3>
				<div className="catalogue__items">
					{ data.map( ( { media, file, name }, index ) => {
						return (
							<a
								href={ file.url }
								target="_blank"
								className="catalogue__items--item"
								key={ `catalogue-${ clientId }-${ index }` }
							>
								<Image
									className="catalogue__items--item-image"
									src={ media.url }
									alt={ media.alt }
									width={ media.width }
									height={ media.height }
								/>
								<span className="catalogue__items--item-name">
									{ name }
								</span>
								<span className="catalogue__items--item-download">
									{ __( 'Download', 'atb' ) }
									<Download />
								</span>
							</a>
						);
					} ) }
				</div>
			</div>
		</>
	);
};

export default Edit;
