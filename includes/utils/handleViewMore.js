import apiFetch from '@wordpress/api-fetch';

import handleModal from './handleModal';
import getMonthString from './getMonthString';
import { MAX_WORKS_TO_DISPLAY } from '../block-editor/blocks/works/edit';

import cardToRender from './components/card';

const handleViewMore = ( { showMoreBtn, handleModalArgs, data } ) => {
	let count = 12;

	const btn = data.querySelector( '.works__button' );
	const loader = data.querySelector( '.works__loader' );

	const category = data.hasAttribute( 'data-cat' )
		? data.getAttribute( 'data-cat' )
		: '';

	let posts = [];

	showMoreBtn.addEventListener( 'click', async () => {
		const worksWrapper = data.querySelector( '.works__items' );
		const currentItems = worksWrapper.querySelectorAll(
			'.works__items--item'
		);

		btn.classList.add( 'hide' );
		loader.classList.remove( 'hide' );

		! posts.length &&
			( await apiFetch( {
				path: `/wp/v2/portfolio?acf_format=standard${
					category && '&portfolio_types=' + category
				}`,
			} ).then( ( data ) => {
				posts = data;
			} ) );

		const newPostsToAdd = [ ...posts ].splice(
			currentItems.length,
			MAX_WORKS_TO_DISPLAY
		);

		count += newPostsToAdd.length;

		newPostsToAdd &&
			newPostsToAdd.forEach( ( card ) => {
				const { acf, title } = card;
				const {
					image_1,
					image_2,
					image_3,
					image_4,
					image_5,
					work_date,
					description,
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
				worksWrapper.innerHTML += cardToRender( {
					images,
					title,
					description,
					month,
					year,
				} );

				if ( count >= posts.length ) showMoreBtn.style.display = 'none';

				btn.classList.remove( 'hide' );
				loader.classList.add( 'hide' );

				handleModal( handleModalArgs );
			} );
	} );
};

export default handleViewMore;
