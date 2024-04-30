import { __ } from '@wordpress/i18n';
import { useDispatch } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { useEffect } from '@wordpress/element';

import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';

import Controls from './controls';
import Image from '../../../components/Image/Image';

const Edit = ( props ) => {
	const blockProps = useBlockProps( {
		className: 'hero',
	} );

	const { attributes, setAttributes } = props;
	const { title, subtitle, discount, media } = attributes;

	const { lockPostSaving, unlockPostSaving } = useDispatch( editorStore );

	useEffect( () => {
		if ( ! title || ! subtitle || ! media ) {
			lockPostSaving();
		} else {
			unlockPostSaving();
		}
	}, [ title, subtitle, media ] );

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
					{ !! subtitle ? (
						<h2 className="hero__subtitle">{ subtitle }</h2>
					) : null }
					{ !! discount ? (
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
		<>
			<Controls
				attributes={ attributes }
				setAttributes={ setAttributes }
				isVideo={ isVideo }
			/>
			<div { ...blockProps }>{ hero }</div>
		</>
	);
};

export default Edit;
