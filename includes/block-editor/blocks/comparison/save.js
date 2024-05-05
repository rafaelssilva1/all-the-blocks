import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

import Image from '../../../components/Image/Image';

const Save = ( props ) => {
	const blockProps = useBlockProps.save( {
		className: 'comparison max-width',
	} );

	const { attributes } = props;
	const { title, before, after } = attributes;

	return (
		<div { ...blockProps }>
			<h2 className="comparison__title">{ title }</h2>
			<div className="comparison__images">
				<div
					className="comparison__images--img before"
					style={ { backgroundImage: `url(${ before.url })` } }
				></div>
				<div
					className="comparison__images--img after"
					style={ { backgroundImage: `url(${ after.url })` } }
				></div>
				<div className="comparison__slider">
					<div className="comparison__slider--thumb"></div>
				</div>
			</div>
		</div>
	);
};

export default Save;
