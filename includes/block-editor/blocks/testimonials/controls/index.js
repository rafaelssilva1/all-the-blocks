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

import { MAX_TESTIMONIALS_ITEMS } from '../edit';

const Controls = ( { attributes, setAttributes, ...props } ) => {
	const { data } = attributes;

	const { unlockPostSaving } = useDispatch( editorStore );

	const renderedTestimonials = data.length
		? data.map( ( item, index ) => {
				const { name, title, description } = item;

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
			{ renderedTestimonials ? (
				<PanelBody title={ __( 'Testimonials', 'atb' ) }>
					{ renderedTestimonials }
				</PanelBody>
			) : (
				<PanelBody>
					{ __( 'Add your first testimonial item', 'atb' ) }
				</PanelBody>
			) }
			{ data.length < MAX_TESTIMONIALS_ITEMS ? (
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
						{ __( 'Add a testimonial', 'atb' ) }
					</Button>
				</PanelBody>
			) : null }
		</InspectorControls>
	);
};

export default Controls;
