import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

import Pin from '../../../icons/pin';
import Email from '../../../icons/email';
import Phone from '../../../icons/phone';
import Whatsapp from '../../../icons/whatsapp';
import Facebook from '../../../icons/facebook';
import Instagram from '../../../icons/instagram';
import Linkedin from '../../../icons/linkedin';

const Save = ( props ) => {
	const blockProps = useBlockProps.save( {
		className: 'contacts-block',
	} );

	const { attributes } = props;
	const {
		address,
		schedule,
		email,
		phone,
		whatsapp,
		facebook,
		instagram,
		linkedin,
	} = attributes;

	return (
		<div { ...blockProps }>
			<div className="contacts-block__wrapper">
				<Pin />
				<div>
					<p>{ address.street }</p>
					<p>{ address.city }</p>
				</div>
			</div>
			<div className="contacts-block__wrapper column white-space">
				<p>
					<b>{ __( 'Horário', 'atb' ) }</b>
				</p>
				{ schedule }
			</div>
			<div className="contacts-block__wrapper">
				<Email />
				<a
					className="contacts-block__link"
					href={ `mailto:${ email }` }
				>
					{ email }
				</a>
			</div>
			<div className="contacts-block__wrapper">
				<Phone />
				<div>
					{ phone }
					<p className="small">
						{ __( 'Chamada para rede fixa nacional', 'atb' ) }
					</p>
				</div>
			</div>
			<div className="contacts-block__wrapper">
				<Whatsapp />
				<a
					className="contacts-block__link"
					href={ `https://api.whatsapp.com/send/?phone=${ whatsapp }&text=${
						__(
							'Olá. Tenho interesse em saber mais sobre os vossos produtos. Página: ',
							'atb'
						) + window.location.origin
					}` }
					target="_blank"
					aria-label="Whatsapp"
				>
					{ __( 'Whatsapp', 'atb' ) }
				</a>
			</div>
			<div className="contacts-block__wrapper flex-end">
				<a
					className="contacts-block__link"
					href={ facebook }
					target="_blank"
					aria-label="Facebook"
				>
					<Facebook />
				</a>
				<a
					className="contacts-block__link"
					href={ instagram }
					target="_blank"
					aria-label="Instagram"
				>
					<Instagram />
				</a>
				<a
					className="contacts-block__link"
					href={ linkedin }
					target="_blank"
					aria-label="Linkedin"
				>
					<Linkedin />
				</a>
			</div>
		</div>
	);
};

export default Save;
