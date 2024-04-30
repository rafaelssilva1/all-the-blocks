import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';

import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';

import Pin from '../../../icons/pin';
import Email from '../../../icons/email';
import Phone from '../../../icons/phone';
import Whatsapp from '../../../icons/whatsapp';
import Facebook from '../../../icons/facebook';
import Instagram from '../../../icons/instagram';
import Linkedin from '../../../icons/linkedin';

const Edit = ( props ) => {
	const blockProps = useBlockProps( {
		className: 'contacts-block',
	} );

	const [ loading, setLoading ] = useState( true );

	const { attributes, setAttributes } = props;
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

	const apiRequest = async () => {
		const res = await apiFetch( { path: '/atb/v1/options' } );
		const { company_info, social } = res;

		setAttributes( {
			address: {
				street: `${ company_info.address }, `,
				city: `${ company_info.postal_code } ${ company_info.city }`,
			},
			schedule: company_info.schedule,
			email: company_info.email,
			phone: company_info.phone,
			whatsapp: social.whatsapp,
			facebook: social.facebook,
			instagram: social.instagram,
			linkedin: social.linkedin,
		} );
		setLoading( false );
		return;
	};

	useEffect( () => {
		apiRequest();
	}, [] );

	console.log( attributes.schedule );

	return (
		<div { ...blockProps }>
			{ loading ? (
				<Spinner />
			) : (
				<>
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
						<p>{ schedule }</p>
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
								{ __(
									'Chamada para rede fixa nacional',
									'atb'
								) }
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
				</>
			) }
		</div>
	);
};

export default Edit;
