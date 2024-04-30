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
import LinkControl from '../../../../components/Controls/LinkControl';
import MediaControl from '../../../../components/Controls/MediaControl';

const Controls = ( { data, setAttributes, ...props } ) => {
	const SLIDE_TEMPLATE = {
		media: {},
		tag: '',
		title: '',
		description: '',
		cta: '',
		link: {},
	};

	const { unlockPostSaving } = useDispatch( editorStore );

	const renderedSlidesControls = data.length
		? data.map( ( slide, index ) => {
				const { media, tag, title, description, cta, link } = slide;

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
							title={ __( `Slide: ${ title }`, 'atb' ) }
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
									controlName={ 'Tag' }
									value={ tag }
									onChange={ ( content ) =>
										handleEdit( {
											data,
											content,
											index,
											attr: 'tag',
											setAttributes,
										} )
									}
									required
								/>
								<TextControl
									controlName={ 'CTA' }
									value={ cta }
									onChange={ ( content ) =>
										handleEdit( {
											data,
											content,
											index,
											attr: 'cta',
											setAttributes,
										} )
									}
									required
								/>
								<LinkControl
									controlName={ 'Link' }
									value={ link }
									key={ `link-control-${
										link && link.url && link.url
									}` }
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
									callback={ ( content ) =>
										handleEdit( {
											data,
											content,
											index,
											attr: 'media',
											setAttributes,
										} )
									}
									allowedTypes={ [ 'image', 'video' ] }
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
			{ renderedSlidesControls ? (
				<PanelBody title={ __( 'All slides', 'atb' ) }>
					{ renderedSlidesControls }
				</PanelBody>
			) : (
				<PanelBody>{ __( 'Add your first slide', 'atb' ) }</PanelBody>
			) }
			<PanelBody>
				<Button
					variant="primary"
					onClick={ () =>
						handleAddSlide( {
							data,
							template: SLIDE_TEMPLATE,
							setAttributes,
						} )
					}
				>
					{ __( 'Add slide', 'atb' ) }
				</Button>
			</PanelBody>
		</InspectorControls>
	);
};

export default Controls;
