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
import TextareaControl from '../../../../components/Controls/TextareaControl';
import DropdownControl from '../../../../components/Controls/DropdownControl';
import MediaControl from '../../../../components/Controls/MediaControl';

import { MAX_ACCORDION_ITEMS } from '../edit';

const Controls = ( { attributes, setAttributes, ...props } ) => {
	const { data, title, description, open, media } = attributes;

	const { unlockPostSaving } = useDispatch( editorStore );

	const renderedAccordionControls = data.length
		? data.map( ( item, index ) => {
				const { question, answer } = item;

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
							title={ __( `Question: ${ question }`, 'atb' ) }
							initialOpen={ false }
							key={ index }
						>
							<div className="settings__wrapper">
								<TextControl
									controlName={ 'Question' }
									value={ question }
									onChange={ ( content ) =>
										handleEdit( {
											data,
											content,
											index,
											attr: 'question',
											setAttributes,
										} )
									}
									required
								/>
								<TextareaControl
									controlName={ 'Answer' }
									value={ answer }
									onChange={ ( content ) =>
										handleEdit( {
											data,
											content,
											index,
											attr: 'answer',
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
			<PanelBody title={ __( 'Content', 'atb' ) }>
				<TextControl
					controlName={ 'Title' }
					value={ title }
					onChange={ ( content ) =>
						setAttributes( { title: content } )
					}
					required
					disabled
				/>
				<TextareaControl
					controlName={ 'Description' }
					value={ description }
					onChange={ ( content ) =>
						setAttributes( { description: content } )
					}
					required
				/>
				<DropdownControl
					onChangeCallback={ ( content ) =>
						setAttributes( { open: content } )
					}
					value={ open }
					defaultText={ 'Default opened item' }
					renderContentCallback={ ( { onClose } ) => {
						const optionsToRender = [ {}, ...data ];
						const options = optionsToRender.map( ( _, index ) => (
							<span
								key={ index }
								onClick={ ( e ) => {
									setAttributes( {
										open:
											index === 0
												? 0
												: Number(
														e.target.textContent
												  ),
									} );
									onClose();
								} }
							>
								{ index === 0 ? 'Closed' : index }
							</span>
						) );

						return options;
					} }
					controlName={ 'Default accordion item' }
				/>
				<MediaControl
					previewText={ 'Media preview' }
					selectText={ 'Select an image' }
					value={ media }
					callback={ ( content ) =>
						setAttributes( { media: content } )
					}
					allowedTypes={ [ 'image' ] }
					required
				/>
			</PanelBody>
			{ renderedAccordionControls ? (
				<PanelBody title={ __( 'Accordion', 'atb' ) }>
					{ renderedAccordionControls }
				</PanelBody>
			) : (
				<PanelBody>
					{ __( 'Add your first accordion item', 'atb' ) }
				</PanelBody>
			) }
			{ data.length <= MAX_ACCORDION_ITEMS ? (
				<PanelBody>
					<Button
						variant="primary"
						onClick={ () =>
							handleAddSlide( {
								data,
								template: { question: '', answer: '' },
								setAttributes,
							} )
						}
					>
						{ __( 'Add an accordion item', 'atb' ) }
					</Button>
				</PanelBody>
			) : null }
		</InspectorControls>
	);
};

export default Controls;
