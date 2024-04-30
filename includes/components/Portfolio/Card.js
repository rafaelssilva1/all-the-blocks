import { __ } from '@wordpress/i18n';

import Arrow from '../../icons/arrow';
import Image from '../Image/Image';

const PortfolioCard = ( {
	title,
	year,
	month,
	images,
	description,
	type,
	...props
} ) => {
	return (
		<div
			{ ...props }
			className={ `${ type }__items--item` }
			data-images={ JSON.stringify( images ) }
			data-title={ title }
			data-description={ description }
		>
			<Image
				className="portfolio__image"
				src={ images[ 0 ].url }
				alt={ images[ 0 ].alt }
				width={ images[ 0 ].width }
				height={ images[ 0 ].height }
			/>
			<div className="portfolio__overlay"></div>
			<div className="portfolio__items--item-wrapper">
				<span className="portfolio__items--item-date">{ `${ month.toLowerCase() } ${ year }` }</span>
				<span className="portfolio__items--item-title">{ title }</span>
			</div>
			<span className="portfolio__items--item-cta">
				{ __( 'Ver detalhes', 'atb' ).toLowerCase() }
				<Arrow />
			</span>
		</div>
	);
};

export default PortfolioCard;
