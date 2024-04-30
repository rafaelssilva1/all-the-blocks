import { __ } from '@wordpress/i18n';

import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

import TextControl from '../../../../components/Controls/TextControl';
import LinkControl from '../../../../components/Controls/LinkControl';

const Controls = ( { attributes, setAttributes, ...props } ) => {
	const { title, link } = attributes;

	return (
		<InspectorControls { ...props }>
			<PanelBody title={ __( 'Portfolio', 'atb' ) }>
				<div className="settings__wrapper">
					<TextControl
						controlName={ 'Title' }
						value={ title }
						onChange={ ( content ) =>
							setAttributes( { title: content } )
						}
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
