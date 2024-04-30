import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

import Image from '../../../components/Image/Image';

const Save = ( props ) => {
	const blockProps = useBlockProps.save( {
		className: 'icons-list',
	} );

	const { attributes, clientId } = props;
	const { data, title } = attributes;

	const itemsToRender =
		data &&
		data.map( ( { icon, title, description }, index ) => {
			return (
				<div
					className="icons-list__items--item"
					key={ `description-${ clientId }-${ index }` }
				>
					<Image
						className="icons-list__items--item-icon"
						src={ icon.url }
						alt={ icon.alt }
						width={ icon.width }
						height={ icon.height }
					/>
					<h3 className="icons-list__items--item-title">{ title }</h3>
					<p className="icons-list__items--item-description">
						{ description }
					</p>
				</div>
			);
		} );

	return (
		<div { ...blockProps }>
			<div className="max-width">
				<h2 className="icons-list__title">{ title }</h2>
				<div className="icons-list__items">{ itemsToRender }</div>
			</div>
		</div>
	);
};

export default Save;
