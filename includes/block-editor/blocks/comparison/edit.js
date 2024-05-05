import { __ } from '@wordpress/i18n';

import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';

import Controls from './controls';
import Image from '../../../components/Image/Image';

export const MAX_ICONS_ITEMS = 6;

const Edit = ( props ) => {
	const blockProps = useBlockProps( {
		className: 'comparison max-width',
	} );

	const { attributes, setAttributes } = props;
	const { title, before, after } = attributes;

	return (
		<>
			<Controls
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			<div { ...blockProps }>
				<h2 className="comparison__title">{ title }</h2>
				<div className="comparison__images">
					<div
						className="comparison__images--img before"
						style={ { backgroundImage: `url(${ before.url })` } }
					></div>
					<div
						className="comparison__images--img after"
						style={ { backgroundImage: `url(${ after.url })` } }
					></div>
					<div className="comparison__slider">
						<div className="comparison__slider--thumb"></div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Edit;
