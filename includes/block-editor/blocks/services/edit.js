import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';

import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';
import Controls from './controls';
import Dot from '../../../icons/dot';
import CustomButton from '../../../components/Button/Button';
import Image from '../../../components/Image/Image';

const Edit = ( props ) => {
	const blockProps = useBlockProps( {
		className: 'services-slideshow',
	} );

	const { attributes, setAttributes, clientId } = props;
	const { data } = attributes;

	const dataToRender = useMemo( () => {
		return data.map(
			( { media, tag, title, description, cta, link }, index ) => (
				<div
					className="services-slideshow__container--item"
					key={ `services-${ clientId }-${ index }` }
				>
					<div className="services-slideshow__image">
						<div className="services-slideshow__image--overlay"></div>
						<Image
							src={ media.url }
							alt={ media.alt }
							width={ media.width }
							height={ media.height }
						/>
					</div>
					<div className="services-slideshow__content">
						<span className="services-slideshow__content--tag">
							{ tag }
						</span>
						<h2 className="services-slideshow__content--title">
							{ title }
						</h2>
						<p className="services-slideshow__content--description">
							{ description }
						</p>
						<CustomButton
							variant={ 'primary' }
							href={ link.url }
							content={ cta }
							isButton={ false }
						/>
					</div>
				</div>
			)
		);
	}, [ data ] );

	const dotsToRender = useMemo( () => {
		return data.map( ( _, index ) => (
			<Dot
				key={ `dot-${ clientId }-${ index }` }
				fill={ index === 0 ? '#363636D6' : '#9B9B9B' }
				data-slide={ index }
			/>
		) );
	}, [ data ] );

	return (
		<>
			<Controls data={ data } setAttributes={ setAttributes } />
			<div { ...blockProps }>
				<div className="max-width">
					<div className="services-slideshow__overflow">
						<div className="services-slideshow__container">
							{ dataToRender }
						</div>
					</div>
					<div className="services-slideshow__controls">
						{ dotsToRender }
					</div>
				</div>
			</div>
		</>
	);
};

export default Edit;
