import { __ } from '@wordpress/i18n';

import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

import TextareaControl from '../../../../components/Controls/TextareaControl';
import MediaControl from '../../../../components/Controls/MediaControl';

const Controls = ( { data, setAttributes, attributes, ...props } ) => {
	const { description, image_1, image_2 } = attributes;

	return (
		<InspectorControls { ...props }>
			<div className="settings__slider--wrapper">
				<PanelBody title={ __( 'Settings', 'atb' ) }>
					<TextareaControl
						controlName={ 'Description' }
						value={ description }
						onChange={ ( content ) =>
							setAttributes( { description: content } )
						}
						required
					/>
					<MediaControl
						previewText={ 'Media preview' }
						selectText={ 'Select an image' }
						value={ image_1 }
						callback={ ( content ) =>
							setAttributes( { image_1: content } )
						}
						allowedTypes={ [ 'image' ] }
						required
					/>
					<MediaControl
						previewText={ 'Media preview' }
						selectText={ 'Select an image' }
						value={ image_2 }
						callback={ ( content ) =>
							setAttributes( { image_2: content } )
						}
						allowedTypes={ [ 'image' ] }
						required
					/>
				</PanelBody>
			</div>
		</InspectorControls>
	);
};

export default Controls;
