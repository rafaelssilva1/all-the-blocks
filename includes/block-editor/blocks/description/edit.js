import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';

import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';
import Toggle from '../../../icons/toggle';

import Controls from './controls';
import Image from '../../../components/Image/Image';

export const MAX_ACCORDION_ITEMS = 5;

const Edit = ( props ) => {
	const blockProps = useBlockProps( {
		className: 'description',
	} );

	const { attributes, setAttributes, clientId } = props;
	const { data, title, description, open, media } = attributes;

	const postTitle = useSelect( ( select ) => {
		return select( 'core/editor' ).getEditedPostAttribute( 'title' );
	}, [] );
	useMemo( () => {
		title !== postTitle && setAttributes( { title: postTitle } );
	}, [] );

	const accordionToRender = useMemo(
		() =>
			data &&
			data.map( ( { question, answer }, index ) => {
				const isOpen = open === index + 1;

				return (
					<div
						className="description__accordion--item"
						key={ `description-${ clientId }-${ index }` }
					>
						<h3 className="description__accordion--item-question">
							{ question }
							<Toggle hide={ isOpen } />
						</h3>
						<p
							className={ `description__accordion--item-answer ${
								isOpen ? 'show' : ''
							}` }
						>
							{ answer }
						</p>
					</div>
				);
			} ),
		[ data ]
	);

	return (
		<>
			<Controls
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			<div { ...blockProps }>
				<div className="description__column">
					<h2 className="description__title">{ title }</h2>
					<p className="description__description">{ description }</p>
					<div className="description__accordion">
						{ accordionToRender }
					</div>
				</div>
				<div className="description__column">
					<Image
						src={ media.url }
						alt={ media.alt }
						className="description__image"
						width={ media.width }
						height={ media.height }
					/>
				</div>
			</div>
		</>
	);
};

export default Edit;
