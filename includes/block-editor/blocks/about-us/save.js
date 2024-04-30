import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

import Image from '../../../components/Image/Image';

const Save = ( props ) => {
	const blockProps = useBlockProps.save( {
		className: 'about-us',
	} );

	const { attributes } = props;
	const { description, image_1, image_2 } = attributes;

	return (
		<div { ...blockProps }>
			<Image
				className="about-us__media about-us__media--1"
				src={ image_1.url }
				alt={ image_1.alt }
				width={ image_1.width }
				height={ image_1.height }
			/>
			<Image
				className="about-us__media about-us__media--2"
				src={ image_2.url }
				alt={ image_2.alt }
				width={ image_2.width }
				height={ image_2.height }
			/>
			<p className="about-us__description">{ description }</p>
		</div>
	);
};

export default Save;
