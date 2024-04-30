import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';

import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';

import Controls from './controls';

export const MAX_TESTIMONIALS_ITEMS = 4;

const Edit = ( props ) => {
	const blockProps = useBlockProps( {
		className: 'testimonials',
	} );

	const { attributes, setAttributes, clientId } = props;
	const { data } = attributes;

	const testimonialsToRender = useMemo(
		() =>
			data &&
			data.map( ( { title, description, name }, index ) => {
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
			} ),
		[ data ]
	);

	return (
		<>
			<Controls
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			<div { ...blockProps }>
				<div className="max-width">
					<div className="testimonials__items">
						{ testimonialsToRender }
					</div>
				</div>
			</div>
		</>
	);
};

export default Edit;
