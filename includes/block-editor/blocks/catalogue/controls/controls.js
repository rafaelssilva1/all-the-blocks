import { __ } from '@wordpress/i18n';

import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';

import { Icon, arrowDown, arrowUp } from '@wordpress/icons';
import {
	handleAddSlide,
	handleDeleteSlide,
	handleEdit,
	handleReorder,
} from '../../../../utils/controls';

import { MAX_CATALOGUES_TO_DISPLAY } from '../edit';

import TextControl from '../../../../components/Controls/TextControl';
import MediaControl from '../../../../components/Controls/MediaControl';

const Controls = ( { data, setAttributes, attributes, ...props } ) => {
	const { title, description } = attributes;

	const { unlockPostSaving } = useDispatch( editorStore );

	const renderedSlidesControls = data.length
		? data.map( ( catalogue, index ) => {
				const { media, file, name } = catalogue;

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
							title={ __( `Catalogue: ${ name }`, 'atb' ) }
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
								<MediaControl
									previewText={ 'Media preview' }
									selectText={ 'Select an image' }
									value={ media }
									callback={ ( content ) => {
										handleEdit( {
											data,
											content,
											index,
											attr: 'media',
											setAttributes,
										} );
									} }
									allowedTypes={ [ 'image' ] }
									required
								/>
								<MediaControl
									previewText={ 'File preview' }
									selectText={ 'Select a file' }
									value={ file }
									callback={ ( content ) => {
										handleEdit( {
											data,
											content,
											index,
											attr: 'file',
											setAttributes,
										} );
									} }
									allowedTypes={ [ 'application/pdf' ] }
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
			<div className="settings__slider--wrapper">
				<PanelBody title={ __( 'Settings', 'atb' ) }>
					<TextControl
						controlName={ 'Title' }
						value={ title }
						onChange={ ( content ) =>
							setAttributes( { title: content } )
						}
						required
					/>
					<TextControl
						controlName={ 'Description' }
						value={ description }
						onChange={ ( content ) =>
							setAttributes( { description: content } )
						}
						required
					/>
				</PanelBody>
			</div>

			{ renderedSlidesControls ? (
				<PanelBody title={ __( 'Catalogues to display', 'atb' ) }>
					{ renderedSlidesControls }
				</PanelBody>
			) : (
				<PanelBody>
					{ __( 'Add your first catalogue', 'atb' ) }
				</PanelBody>
			) }
			{ data.length < MAX_CATALOGUES_TO_DISPLAY ? (
				<PanelBody>
					<Button
						variant="primary"
						onClick={ () =>
							handleAddSlide( {
								data,
								template: {
									media: {},
									file: {},
									name: '',
								},
								setAttributes,
							} )
						}
					>
						{ __( 'Add catalogue', 'atb' ) }
					</Button>
				</PanelBody>
			) : null }
		</InspectorControls>
	);
};

export default Controls;
