import { __ } from '@wordpress/i18n';

import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

import TextControl from '../../../../components/Controls/TextControl';
import TextareaControl from '../../../../components/Controls/TextareaControl';
import MediaControl from '../../../../components/Controls/MediaControl';

const Controls = ( { attributes, setAttributes, ...props } ) => {
	const { title, description, media } = attributes;

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
					value={ media }
					callback={ ( content ) =>
						setAttributes( { media: content } )
					}
					allowedTypes={ [ 'image' ] }
					required
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Controls;
