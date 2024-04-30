import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

const Save = ( props ) => {
	const blockProps = useBlockProps.save( {
		className: 'filters',
	} );

	const { attributes, clientId } = props;
	const { data } = attributes;

	return (
		<div { ...blockProps }>
			<a className="filters__link active" href="/trabalhos">
				{ __( 'All', 'atb' ) }
			</a>
			{ data.map( ( { link, name }, index ) => {
				return (
					<a
						className="filters__link"
						href={ link }
						key={ `filters-${ clientId }-${ index }` }
					>
						{ name }
					</a>
				);
			} ) }
		</div>
	);
};

export default Save;
