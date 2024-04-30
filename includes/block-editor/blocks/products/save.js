import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

import ArrowAlt from '../../../icons/arrow-alt';
import Image from '../../../components/Image/Image';

const Save = ( props ) => {
	const blockProps = useBlockProps.save( {
		className: 'products max-width',
	} );

	const { attributes, clientId } = props;
	const { data, title } = attributes;

	return (
		<div { ...blockProps }>
			<h2 className="products__title">{ title }</h2>
			<div className="products__items">
				{ data.map( ( { media, name, link }, index ) => {
					return media && name ? (
						<a
							href={ link }
							className="products__items--item"
							key={ `products-${ clientId }-${ index }` }
						>
							<div className="products__items--item-overlay"></div>
							<Image
								className="products__items--item-image"
								src={ media.url }
								alt={ media.alt }
								width={ media.width }
								height={ media.height }
							/>
							<h3 className="products__items--item-title">
								{ name }
							</h3>
						</a>
					) : null;
				} ) }
			</div>
			<ArrowAlt className="products__arrow" />
		</div>
	);
};

export default Save;
