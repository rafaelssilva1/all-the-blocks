import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

import Image from '../../../components/Image/Image';
import Download from '../../../icons/download';

const Save = ( props ) => {
	const blockProps = useBlockProps.save( {
		className: 'catalogue max-width',
	} );

	const { attributes, clientId } = props;
	const { data, title, description } = attributes;

	return (
		<div { ...blockProps }>
			<h2 className="catalogue__title">{ title }</h2>
			<h3 className="catalogue__description">{ description }</h3>
			<div className="catalogue__items">
				{ data.map( ( { media, file, name }, index ) => {
					return (
						<a
							href={ file.url }
							target="_blank"
							className="catalogue__items--item"
							key={ `catalogue-${ clientId }-${ index }` }
						>
							<Image
								className="catalogue__items--item-image"
								src={ media.url }
								alt={ media.alt }
								width={ media.width }
								height={ media.height }
							/>
							<span className="catalogue__items--item-name">
								{ name }
							</span>
							<span className="catalogue__items--item-download">
								{ __( 'Download', 'atb' ) }
								<Download />
							</span>
						</a>
					);
				} ) }
			</div>
		</div>
	);
};

export default Save;
