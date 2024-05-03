import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

import RecentJobs from '../../../components/Portfolio/RecentJobs.js';

const Save = ( props ) => {
	const blockProps = useBlockProps.save( {
		className: 'portfolio max-width',
	} );

	const { attributes, clientId } = props;
	const { title, link, worksList } = attributes;

	return (
		<div { ...blockProps }>
			<div className="portfolio__header">
				<h2 className="portfolio__header--title">{ title }</h2>
				{link && link.url ? <a className="portfolio__header--link" href={link.url}>
					{__('Ver todos', 'atb')}
				</a> : null}
			</div>
			<RecentJobs
				data={ worksList }
				clientId={ clientId }
				type={ 'portfolio' }
			/>
		</div>
	);
};

export default Save;
