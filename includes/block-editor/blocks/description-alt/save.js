import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

import Image from '../../../components/Image/Image';

const Save = ( props ) => {
	const blockProps = useBlockProps.save( {
		className: 'description-alt',
	} );

	const { attributes } = props;
	const { title, description, media } = attributes;

	return (
		<div { ...blockProps }>
			<div className="description-alt__column content">
				<h2 className="description-alt__title">{ title }</h2>
				<p className="description-alt__description">{ description }</p>
			</div>
			<div className="description-alt__column">
				<Image
					src={ media.url }
					alt={ media.alt }
					className="description-alt__image"
					width={ media.width }
					height={ media.height }
				/>
			</div>
		</div>
	);
};

export default Save;
