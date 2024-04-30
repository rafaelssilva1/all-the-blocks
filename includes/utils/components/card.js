const cardToRender = ( { images, title, description, month, year } ) => {
	return `
		<div class="works__items--item" data-images=${ JSON.stringify(
			images
		) } data-title="${
		title.rendered
	}" data-description="${ description }">
			<img class='portfolio__image' loading="lazy" src="${ images[ 0 ].url }" alt="${
		images[ 0 ].alt
	}" />
			<div class='portfolio__overlay'></div>
			<div class='portfolio__items--item-wrapper'>
				<span class='portfolio__items--item-date'>${ month.toLowerCase() } ${ year }</span>
				<span class='portfolio__items--item-title'>${ title.rendered }</span>
			</div>
			<span class='portfolio__items--item-cta'>
				ver detalhes
				<svg
					width="17"
					height="8"
					viewBox="0 0 17 8"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M1.35028 3.5C1.07414 3.5 0.850281 3.72386 0.850281 4C0.850281 4.27614 1.07414 4.5 1.35028 4.5V3.5ZM16.0637 4.35355C16.259 4.15829 16.259 3.84171 16.0637 3.64645L12.8818 0.464466C12.6865 0.269204 12.3699 0.269204 12.1747 0.464466C11.9794 0.659728 11.9794 0.976311 12.1747 1.17157L15.0031 4L12.1747 6.82843C11.9794 7.02369 11.9794 7.34027 12.1747 7.53553C12.3699 7.7308 12.6865 7.7308 12.8818 7.53553L16.0637 4.35355ZM1.35028 4.5H15.7102V3.5H1.35028V4.5Z"
						fill="currentColor"
					/>
				</svg>
			</span>
		</div>
	`;
};

export default cardToRender;
