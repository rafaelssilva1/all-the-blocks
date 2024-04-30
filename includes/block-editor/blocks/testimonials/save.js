import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

const Save = ( props ) => {
	const blockProps = useBlockProps.save( {
		className: 'testimonials',
	} );

	const { attributes, clientId } = props;
	const { data, title } = attributes;

	const testimonialsToRender =
		data &&
		data.map( ( { name, title, description }, index ) => {
			return (
				<div
					className="testimonials__items--item"
					key={ `description-${ clientId }-${ index }` }
				>
					<div>
						<h3 className="testimonials__items--item-title">
							{ title }
						</h3>
						<div className="testimonials__items--item-wrapper">
							<span className="testimonials__items--item-quote">
								"
							</span>
							<h3 className="testimonials__items--item-description">
								{ description }
							</h3>
						</div>
					</div>
					<h3 className="testimonials__items--item-name">
						- { name }
					</h3>
				</div>
			);
		} );

	return (
		<div { ...blockProps }>
			<div className="max-width">
				<h2 className="testimonials__title">{ title }</h2>
				<div className="testimonials__items">
					{ testimonialsToRender }
				</div>
			</div>
		</div>
	);
};

export default Save;
