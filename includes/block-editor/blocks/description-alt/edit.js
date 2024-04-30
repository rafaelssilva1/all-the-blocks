import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';

import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';

import Controls from './controls';
import Image from '../../../components/Image/Image';

export const MAX_ACCORDION_ITEMS = 5;

const Edit = ( props ) => {
	const blockProps = useBlockProps( {
		className: 'description-alt',
	} );

	const { attributes, setAttributes } = props;
	const { title, description, media } = attributes;

	return (
		<>
			<Controls
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			<div { ...blockProps }>
				<div className="description-alt__column content">
					<h2 className="description-alt__title">{ title }</h2>
					<p className="description-alt__description">
						{ description }
					</p>
				</div>
				<div className="description-alt__column">
					<Image
						src={ media.url }
						alt={ media.alt }
						className="description-alt__image"
						width={ media.width }
						height={ media.height }
					/>
				</div>
			</div>
		</>
	);
};

export default Edit;
