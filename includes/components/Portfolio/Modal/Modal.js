import Close from '../../../icons/close';
import SlideshowLeft from '../../../icons/slideshow-left';
import SlideshowRight from '../../../icons/slideshow-right';
import Image from '../../Image/Image';

const Modal = ( { title, description, images, ...props } ) => {
	return (
		<div className="modal" { ...props }>
			<div className="modal__overlay"></div>
			<div className="modal__wrapper">
				<Close className="modal__close" />
				<h2 className="modal__title">{ title ?? '' }</h2>
				<div className="modal__slideshow">
					<div className="modal__slideshow--images">
						{ images?.map( ( image, index ) => {
							return (
								<Image
									key={ `slideshow-modal-${ index }` }
									src={ image.src }
									alt={ image.alt }
									width={ media.width }
									height={ media.height }
								/>
							);
						} ) }
					</div>
					<div className="modal__slideshow--controls">
						<SlideshowLeft />
						<SlideshowRight />
					</div>
				</div>
				<span className="modal__description">
					{ description ?? '' }
				</span>
			</div>
		</div>
	);
};

export default Modal;
