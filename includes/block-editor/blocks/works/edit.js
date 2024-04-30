import { __ } from '@wordpress/i18n';
import { useEntityRecords } from '@wordpress/core-data';
import { useEffect, useMemo } from '@wordpress/element';
import { Spinner } from '@wordpress/components';

import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';

import RecentJobs from '../../../components/Portfolio/RecentJobs';

export const MAX_WORKS_TO_DISPLAY = 12;

const Edit = ( props ) => {
	const blockProps = useBlockProps( {
		className: 'works max-width',
	} );

	const { attributes, setAttributes, clientId } = props;
	const { data, hideBtn } = attributes;

	const portfolio = useEntityRecords( 'postType', 'portfolio', {
		per_page: -1,
		acf_format: 'standard',
	} );
	const { hasResolved, records } = portfolio;

	const reorderedPortfolio = records
		? [
				...records.sort(
					( a, b ) =>
						b.acf.hightlighted - a.acf.hightlighted ||
						new Date( b.date ) - new Date( a.date )
				),
		  ].splice( 0, MAX_WORKS_TO_DISPLAY )
		: [];

	useEffect( () => {
		if ( hasResolved ) {
			setAttributes( { data: reorderedPortfolio } );
		}
	}, [ reorderedPortfolio.length, hasResolved ] );

	useMemo( () => {
		const count = records ? records.length : 0;

		if ( MAX_WORKS_TO_DISPLAY >= count ) {
			setAttributes( { hideBtn: true } );
		} else {
			setAttributes( { hideBtn: false } );
		}
	}, [ records ] );

	return (
		<div { ...blockProps }>
			{ hasResolved ? (
				<RecentJobs
					data={ data }
					clientId={ clientId }
					type={ 'works' }
					showMoreBtn
					hideBtn={ hideBtn }
				/>
			) : (
				<Spinner />
			) }
		</div>
	);
};

export default Edit;
