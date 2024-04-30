import { __ } from '@wordpress/i18n';

import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

import TextControl from '../../../../components/Controls/TextControl';
import LinkControl from '../../../../components/Controls/LinkControl';
import NumberControl from '../../../../components/Controls/NumberControl';
import MediaControl from '../../../../components/Controls/MediaControl';

const Controls = ( { attributes, setAttributes, isVideo, ...props } ) => {
	const { title, subtitle, discount, media, link } = attributes;

	return (
		<InspectorControls { ...props }>
			<PanelBody title={ __( 'Hero', 'atb' ) }>
				<div className="settings__wrapper">
					<TextControl
						controlName={ 'Title' }
						value={ title }
						onChange={ ( content ) =>
							setAttributes( { title: content } )
						}
						required
					/>
					<TextControl
						controlName={ 'Subtitle' }
						value={ subtitle }
						onChange={ ( content ) =>
							setAttributes( { subtitle: content } )
						}
					/>
					<NumberControl
						controlName={ 'Discount' }
						value={ discount }
						onChange={ ( content ) =>
							setAttributes( { discount: content } )
						}
						min={ 0 }
						max={ 99 }
						style={ { marginBottom: '8px' } }
					/>
					<MediaControl
						previewText={ 'Media preview' }
						selectText={ 'Select an image' }
						value={ media }
						callback={ ( content ) =>
							setAttributes( { media: content } )
						}
						allowedTypes={ [ 'image', 'video' ] }
						required
					/>
					<LinkControl
						controlName={ 'Link' }
						value={ link }
						key={ `link-control-${ link.url }` }
						onChange={ ( content ) =>
							setAttributes( { link: content } )
						}
					/>
				</div>
			</PanelBody>
		</InspectorControls>
	);
};

export default Controls;
