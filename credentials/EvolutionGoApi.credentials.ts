import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class EvolutionGoApi implements ICredentialType {
	name = 'evolutionGoApi';

	displayName = 'Evolution GO API';

	documentationUrl = 'https://github.com/NathanAshford/evolution-go-custom';

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'http://172.16.210.58:4000',
			placeholder: 'https://evolutiongo.gruponew.com',
			description: 'URL base da API Evolution GO, sem barra no final',
			required: true,
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description:
				'Token da instância (para envio de mensagens/grupos) ou API Key Global (para operações de instância)',
			required: true,
		},
		{
			displayName: 'Ignorar Erros de Certificado TLS',
			name: 'allowUnauthorizedCerts',
			type: 'boolean',
			default: false,
			description: 'Whether to ignore TLS certificate errors (self-signed / wildcard mismatch)',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				apikey: '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/manager',
			method: 'GET',
			skipSslCertificateValidation: '={{$credentials.allowUnauthorizedCerts}}' as unknown as boolean,
		},
	};
}
