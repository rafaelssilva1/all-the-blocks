import { __ } from '@wordpress/i18n';

import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

import TextControl from '../../../../components/Controls/TextControl';
import MediaControl from '../../../../components/Controls/MediaControl';

const Controls = ( { attributes, setAttributes, ...props } ) => {
	const { title, before, after } = attributes;

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
				<MediaControl
					controlName={ 'BEFORE' }
					previewText={ 'Media preview' }
					selectText={ 'Select an image' }
					value={ before }
					callback={ ( content ) =>
						setAttributes( { before: content } )
					}
					allowedTypes={ [ 'image' ] }
					required
				/>
				<MediaControl
					controlName={ 'AFTER' }
					previewText={ 'Media preview' }
					selectText={ 'Select an image' }
					value={ after }
					callback={ ( content ) =>
						setAttributes( { after: content } )
					}
					allowedTypes={ [ 'image' ] }
					required
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Controls;
