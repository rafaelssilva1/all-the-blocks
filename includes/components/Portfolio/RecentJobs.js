import { __ } from '@wordpress/i18n';

import PortfolioCard from './Card';
import getMonthString from '../../utils/getMonthString';
import Modal from './Modal/Modal';
import CustomButton from '../Button/Button';
import LoadingSpinner from '../../icons/spinner';

const RecentJobs = ( {
	data,
	clientId,
	type,
	showMoreBtn,
	hideBtn,
	...props
} ) => {
	return (
		<>
			<div className={ `${ type }__items` } { ...props }>
				{ data.map( ( work, index ) => {
					const { acf, title: postTitle } = work;
					const {
						work_date,
						description,
						image_1,
						image_2,
						image_3,
						image_4,
						image_5,
					} = acf;

					const images = [
						{ url: image_1.url, alt: image_1.alt },
						{ url: image_2.url, alt: image_2.alt },
						{ url: image_3.url, alt: image_3.alt },
						{ url: image_4.url, alt: image_4.alt },
						{ url: image_5.url, alt: image_5.alt },
					];

					const dateToRender = new Date( work_date );
					const year = dateToRender.getFullYear();
					const month = getMonthString( {
						value: dateToRender.getMonth(),
					} );

					return (
						<PortfolioCard
							key={ `work-highlight-${ clientId }-${ index }` }
							title={ postTitle.rendered }
							description={ description }
							year={ year }
							month={ month }
							images={ images }
							type={ type }
						/>
					);
				} ) }
			</div>
			<Modal />
			{ showMoreBtn && ! hideBtn ? (
				<>
					<CustomButton
						variant={ 'primary' }
						content={ __( 'see more', 'atb' ) }
						className={ `${ type }__button` }
					/>
					<LoadingSpinner className={ `${ type }__loader hide` } />
				</>
			) : null }
		</>
	);
};

export default RecentJobs;
