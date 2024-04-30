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

import TextControl from '../../../../components/Controls/TextControl';
import TextareaControl from '../../../../components/Controls/TextareaControl';
import MediaControl from '../../../../components/Controls/MediaControl';

import { MAX_ICONS_ITEMS } from '../edit';

const Controls = ( { attributes, setAttributes, ...props } ) => {
	const { data, title } = attributes;

	const { unlockPostSaving } = useDispatch( editorStore );

	const renderedIconsItems = data.length
		? data.map( ( item, index ) => {
				const { icon, title, description } = item;

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
							title={ __( `Title: ${ title }`, 'atb' ) }
							initialOpen={ false }
							key={ index }
						>
							<div className="settings__wrapper">
								<TextControl
									controlName={ 'Title' }
									value={ title }
									onChange={ ( content ) =>
										handleEdit( {
											data,
											content,
											index,
											attr: 'title',
											setAttributes,
										} )
									}
									required
								/>
								<TextareaControl
									controlName={ 'Description' }
									value={ description }
									onChange={ ( content ) =>
										handleEdit( {
											data,
											content,
											index,
											attr: 'description',
											setAttributes,
										} )
									}
									required
								/>
								<MediaControl
									previewText={ 'Media preview' }
									selectText={ 'Select an image' }
									value={ icon }
									callback={ ( content ) =>
										handleEdit( {
											data,
											content,
											index,
											attr: 'icon',
											setAttributes,
										} )
									}
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
			<PanelBody title={ __( 'Content', 'atb' ) }>
				<TextControl
					controlName={ 'Title' }
					value={ title }
					onChange={ ( content ) =>
						setAttributes( { title: content } )
					}
					required
				/>
			</PanelBody>
			{ renderedIconsItems ? (
				<PanelBody title={ __( 'Icons', 'atb' ) }>
					{ renderedIconsItems }
				</PanelBody>
			) : (
				<PanelBody>
					{ __( 'Add your first icon item', 'atb' ) }
				</PanelBody>
			) }
			{ data.length < MAX_ICONS_ITEMS ? (
				<PanelBody>
					<Button
						variant="primary"
						onClick={ () =>
							handleAddSlide( {
								data,
								template: {
									icon: {},
									title: '',
									description: '',
								},
								setAttributes,
							} )
						}
					>
						{ __( 'Add an icon item', 'atb' ) }
					</Button>
				</PanelBody>
			) : null }
		</InspectorControls>
	);
};

export default Controls;
