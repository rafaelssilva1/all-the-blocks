import { __ } from '@wordpress/i18n';

import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button, Dropdown } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';

import { Icon, arrowDown, arrowUp } from '@wordpress/icons';
import {
	handleAddSlide,
	handleDeleteSlide,
	handleEdit,
	handleReorder,
} from '../../../../utils/controls';

import TextControl from '../../../../components/Controls/TextControl';
import MediaControl from '../../../../components/Controls/MediaControl';

import { MAX_PRODUCTS_TO_DISPLAY } from '../edit';

const Controls = ( {
	data,
	setAttributes,
	attributes,
	services,
	...props
} ) => {
	const { title } = attributes;

	const { unlockPostSaving } = useDispatch( editorStore );

	const renderedSlidesControls = data.length
		? data.map( ( product, index ) => {
				const { media, name, link } = product;

				return (
					<div className="settings__slider--wrapper">
						<div className="settings__slider--arrows">
							{ index > 0 ? (
								<Icon
									size={ 20 }
									icon={ arrowUp }
									onClick={ () =>
										handleReorder( {
											data,
											index,
											action: 'up',
											setAttributes,
										} )
									}
								/>
							) : null }
							{ data.length - 1 !== index ? (
								<Icon
									size={ 20 }
									icon={ arrowDown }
									onClick={ () =>
										handleReorder( {
											data,
											index,
											action: 'down',
											setAttributes,
										} )
									}
								/>
							) : null }
						</div>
						<PanelBody
							title={ __( `Slide: ${ name }`, 'atb' ) }
							initialOpen={ false }
							key={ index }
						>
							<div className="settings__wrapper">
								<TextControl
									controlName={ 'Name' }
									value={ name }
									onChange={ ( content ) =>
										handleEdit( {
											data,
											content,
											index,
											attr: 'name',
											setAttributes,
										} )
									}
									required
								/>
								<TextControl
									controlName={ 'Link' }
									value={ link }
									onChange={ ( content ) =>
										handleEdit( {
											data,
											content,
											index,
											attr: 'link',
											setAttributes,
										} )
									}
									required
								/>
								<MediaControl
									previewText={ 'Media preview' }
									selectText={ 'Select an image' }
									value={ media }
									callback={ ( content ) => {
										handleEdit( {
											data,
											content: {
												url: content.url,
												alt: content.alt,
												filename: content.filename,
											},
											index,
											attr: 'media',
											setAttributes,
										} );
									} }
									allowedTypes={ [ 'image' ] }
									required
								/>
							</div>
							<Button
								isDestructive
								icon={ 'trash' }
								onClick={ () => {
									handleDeleteSlide( {
										data,
										index,
										setAttributes,
									} );
									unlockPostSaving();
								} }
							>
								{ __( 'Delete', 'atb' ) }
							</Button>
						</PanelBody>
					</div>
				);
		  } )
		: null;

	return (
		<InspectorControls { ...props }>
			<PanelBody title={ __( 'Title', 'atb' ) }>
				<TextControl
					value={ title }
					onChange={ ( content ) =>
						setAttributes( { title: content } )
					}
					required
				/>
			</PanelBody>

			{ renderedSlidesControls ? (
				<PanelBody title={ __( 'Products to display', 'atb' ) }>
					{ renderedSlidesControls }
				</PanelBody>
			) : (
				<PanelBody>{ __( 'Add your first product', 'atb' ) }</PanelBody>
			) }
			{ data.length < MAX_PRODUCTS_TO_DISPLAY ? (
				<PanelBody>
					<Dropdown
						contentClassName="dropwdown__content"
						renderToggle={ ( { isOpen, onToggle } ) => (
							<Button
								variant="primary"
								onClick={ onToggle }
								aria-expanded={ isOpen }
							>
								{ `${ __( 'Select a product', 'atb' ) }*` }
							</Button>
						) }
						renderContent={ ( { onClose } ) =>
							services.map(
								( { title, link, _embedded }, index ) => (
									<span
										key={ `services-${ index }` }
										onClick={ () => {
											handleAddSlide( {
												data,
												template: {
													name: title.rendered,
													link,
													media: {
														url: _embedded
															? _embedded[
																	'wp:featuredmedia'
															  ][ 0 ].source_url
															: null,
														alt: _embedded
															? _embedded[
																	'wp:featuredmedia'
															  ][ 0 ].alt_text
															: null,
														filename: _embedded
															? _embedded[
																	'wp:featuredmedia'
															  ][ 0 ].slug
															: null,
													},
												},
												setAttributes,
											} );
											onClose();
										} }
									>
										{ title.rendered }
									</span>
								)
							)
						}
					/>
				</PanelBody>
			) : null }
		</InspectorControls>
	);
};

export default Controls;
