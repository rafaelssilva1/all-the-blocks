import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';

import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';

import Controls from './controls';
import Image from '../../../components/Image/Image';

export const MAX_ICONS_ITEMS = 5;

const Edit = ( props ) => {
	const blockProps = useBlockProps( {
		className: 'icons-list',
	} );

	const { attributes, setAttributes, clientId } = props;
	const { data, title } = attributes;

	const itemsToRender = useMemo(
		() =>
			data &&
			data.map( ( { icon, title, description }, index ) => {
				return (
					<div
						className="icons-list__items--item"
						key={ `description-${ clientId }-${ index }` }
					>
						<Image
							className="icons-list__items--item-icon"
							src={ icon.url }
							alt={ icon.alt }
							width={ icon.width }
							height={ icon.height }
						/>
						<h3 className="icons-list__items--item-title">
							{ title }
						</h3>
						<p className="icons-list__items--item-description">
							{ description }
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
				<div className="max-width">
					<h2 className="icons-list__title">{ title }</h2>
					<div className="icons-list__items">{ itemsToRender }</div>
				</div>
			</div>
		</>
	);
};

export default Edit;
