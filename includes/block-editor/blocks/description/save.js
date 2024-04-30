import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

import Toggle from '../../../icons/toggle';

const Save = ( props ) => {
	const blockProps = useBlockProps.save( {
		className: 'description',
	} );

	const { attributes, clientId } = props;
	const { data, title, description, open, media } = attributes;

	const accordionToRender =
		data &&
		data.map( ( { question, answer }, index ) => {
			const isOpen = open === index + 1;

			return (
				<div
					className="description__accordion--item"
					key={ `description-${ clientId }-${ index }` }
				>
					<h3 className="description__accordion--item-question">
						{ question }
						<Toggle hide={ isOpen } />
					</h3>
					<p
						className={ `description__accordion--item-answer ${
							isOpen ? 'show' : ''
						}` }
					>
						{ answer }
					</p>
				</div>
			);
		} );

	return (
		<div { ...blockProps }>
			<div className="description__column">
				<h2 className="description__title">{ title }</h2>
				<p className="description__description">{ description }</p>
				<div className="description__accordion">
					{ accordionToRender }
				</div>
			</div>
			<div className="description__column">
				<img
					src={ media.url }
					alt={ media.alt }
					className="description__image"
				/>
			</div>
		</div>
	);
};

export default Save;
