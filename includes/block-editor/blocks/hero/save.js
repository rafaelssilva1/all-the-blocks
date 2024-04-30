import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import Image from '../../../components/Image/Image';

const Save = ( props ) => {
	const blockProps = useBlockProps.save( {
		className: 'hero',
	} );

	const { attributes } = props;
	const { title, subtitle, discount, media, link } = attributes;

	const isVideo = media.type === 'video' ? true : false;

	const mediaToRender = isVideo ? (
		<video
			width={ media.width }
			height={ media.height }
			muted
			autoPlay
			loop
		>
			<source src={ media.url } type="video/mp4" />
		</video>
	) : (
		<Image
			src={ media.url }
			alt={ media.alt }
			width={ media.width }
			height={ media.height }
		/>
	);

	const hero = (
		<>
			<div className="hero__overlay"></div>
			{ media.url ? (
				<div className="hero__media">{ mediaToRender }</div>
			) : null }
			<div className="hero__content max-width">
				<div class="hero__content--wrapper">
					{ title ? (
						<h1
							className={ `hero__title ${
								! discount && ! subtitle ? 'center' : ''
							}` }
						>
							{ title }
						</h1>
					) : null }
					{ subtitle ? (
						<h2 className="hero__subtitle">{ subtitle }</h2>
					) : null }
					{ discount ? (
						<div className="hero__discount">
							<p className="hero__discount--value">
								{ discount }%
							</p>
							<p className="hero__discount--label">
								{ __( 'desconto', 'atb' ) }
							</p>
						</div>
					) : null }
				</div>
			</div>
		</>
	);

	return (
		<div { ...blockProps }>
			{ link.url ? <a href={ link.url }>{ hero }</a> : hero }
		</div>
	);
};

export default Save;
