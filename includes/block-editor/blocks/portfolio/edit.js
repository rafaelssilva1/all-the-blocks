import { __ } from '@wordpress/i18n';
import { useDispatch } from '@wordpress/data';
import { useEntityRecords } from '@wordpress/core-data';
import { store as editorStore } from '@wordpress/editor';
import { useEffect } from '@wordpress/element';
import { Spinner } from '@wordpress/components';

import { useBlockProps } from '@wordpress/block-editor';

import Controls from './controls';

import RecentJobs from '../../../components/Portfolio/RecentJobs';
import './editor.scss';

const Edit = ( props ) => {
	const blockProps = useBlockProps( {
		className: 'portfolio max-width',
	} );

	const { attributes, setAttributes, clientId } = props;
	const { title, link } = attributes;

	const { lockPostSaving, unlockPostSaving } = useDispatch( editorStore );

	useEffect( () => {
		if ( ! title || ! link ) {
			lockPostSaving();
		} else {
			unlockPostSaving();
		}
	}, [ title, link ] );

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
		  ].splice( 0, 4 )
		: [];

	useEffect( () => {
		hasResolved && setAttributes( { worksList: reorderedPortfolio } );
	}, [ reorderedPortfolio.length, hasResolved ] );

	return (
		<>
			<Controls
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			<div { ...blockProps }>
				<div className="portfolio__header">
					<h2 className="portfolio__header--title">{ title }</h2>
					{link && link.url ? <a className="portfolio__header--link" href={link.url}>
						{__('Ver todos', 'atb')}
					</a> : null}
				</div>
				{ hasResolved ? (
					<RecentJobs
						data={ reorderedPortfolio }
						clientId={ clientId }
						type={ 'portfolio' }
					/>
				) : (
					<Spinner />
				) }
			</div>
		</>
	);
};

export default Edit;
