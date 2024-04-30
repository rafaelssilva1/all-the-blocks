import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

import RecentJobs from '../../../components/Portfolio/RecentJobs.js';

const Save = ( props ) => {
	const blockProps = useBlockProps.save( {
		className: 'works max-width',
	} );

	const { attributes, clientId } = props;
	const { data, hideBtn } = attributes;

	return (
		<div { ...blockProps }>
			<RecentJobs
				data={ data }
				clientId={ clientId }
				type={ 'works' }
				showMoreBtn
				hideBtn={ hideBtn }
			/>
		</div>
	);
};

export default Save;
