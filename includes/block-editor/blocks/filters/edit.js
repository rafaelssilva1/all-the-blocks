import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import { useEntityRecords } from '@wordpress/core-data';

import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';

const Edit = ( props ) => {
	const blockProps = useBlockProps( {
		className: 'filters',
	} );

	const types = useEntityRecords( 'taxonomy', 'portfolio_types', {
		per_page: -1,
	} );
	const { hasResolved, records } = types;

	useEffect( () => {
		hasResolved && setAttributes( { data: records } );
	}, [ records, hasResolved ] );

	const { attributes, setAttributes, clientId } = props;
	const { data } = attributes;

	return (
		<div { ...blockProps }>
			{ hasResolved ? (
				<>
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
				</>
			) : (
				<Spinner />
			) }
		</div>
	);
};

export default Edit;
